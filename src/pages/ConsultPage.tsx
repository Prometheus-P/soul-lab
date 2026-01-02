import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@toss/tds-mobile';
import Header from '../components/Header';
import { getEffectiveUserKey, getBirthDate } from '../lib/storage';
import { getBalance, consumeCredits, checkCredits, CREDIT_ACTIONS } from '../lib/iap';
import { track } from '../lib/analytics';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787';

const QUICK_PROMPTS = [
  { icon: '🌟', text: '오늘의 운세 분석' },
  { icon: '💕', text: '연애운이 궁금해요' },
  { icon: '💰', text: '재물운을 알려주세요' },
  { icon: '💼', text: '취업/이직 조언' },
  { icon: '🔮', text: '올해 전체 운세' },
];

export default function ConsultPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [credits, setCredits] = useState(0);
  const [showInsufficientModal, setShowInsufficientModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Focus trap for insufficient credits modal (WCAG SC 2.4.3)
  useFocusTrap(showInsufficientModal, modalRef, {
    onEscape: () => setShowInsufficientModal(false),
  });

  const userKey = getEffectiveUserKey();
  const birthdate = getBirthDate();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const loadBalance = useCallback(async () => {
    try {
      const balance = await getBalance(userKey);
      setCredits(balance?.credits ?? 0);
    } catch (e) {
      console.error('Failed to load balance:', e);
    }
  }, [userKey]);

  useEffect(() => {
    track('consult_page_view');
    loadBalance();

    // 초기 환영 메시지
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content:
          '안녕하세요, 소울 랩의 AI 상담사입니다. ✨\n\n별자리, 타로, 사주를 융합한 신비로운 운명 상담을 제공합니다.\n\n무엇이든 물어보세요. 당신의 운명에 대해 깊이 있는 통찰을 드릴게요.',
        timestamp: new Date(),
      },
    ]);
  }, [loadBalance]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Cleanup: abort streaming request on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Cancel any previous ongoing request
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    // 복채 확인
    const creditCheck = await checkCredits(userKey, CREDIT_ACTIONS.AI_CHAT);
    if (!creditCheck.hasEnough) {
      setShowInsufficientModal(true);
      return;
    }

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    track('consult_message_sent', { messageLength: content.length });

    try {
      // 복채 차감
      const useResult = await consumeCredits(
        userKey,
        CREDIT_ACTIONS.AI_CHAT,
        `AI 상담: ${content.slice(0, 30)}`,
      );
      if (!useResult.success) {
        throw new Error(useResult.error || 'Failed to use credits');
      }

      // 스트리밍 AI 응답 요청
      const assistantMessageId = `assistant_${Date.now()}`;
      let streamedContent = '';

      // 스트리밍 시작
      setIsStreaming(true);
      setStreamingMessageId(assistantMessageId);

      // 먼저 빈 assistant 메시지 추가
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
        },
      ]);

      const response = await fetch(`${API_BASE}/api/ai/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userKey,
          birthdate,
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: abortControllerRef.current?.signal,
      });

      if (!response.ok) {
        throw new Error('AI response failed');
      }

      // SSE 스트리밍 파싱
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Stream not available');
      }

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // SSE 이벤트 파싱 (data: {...}\n\n 형식)
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonStr = line.slice(6);
              if (jsonStr === '[DONE]') continue;

              const data = JSON.parse(jsonStr);
              if (data.text) {
                streamedContent += data.text;

                // 실시간으로 메시지 업데이트
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId ? { ...msg, content: streamedContent } : msg,
                  ),
                );
              }
            } catch {
              // JSON 파싱 실패는 무시 (불완전한 청크)
            }
          }
        }
      }

      // 스트리밍 완료 후 최종 메시지 업데이트
      if (!streamedContent) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: '죄송합니다, 응답을 생성하지 못했습니다.' }
              : msg,
          ),
        );
      }

      await loadBalance();
      track('consult_response_received', { streaming: true });
    } catch (e) {
      // Ignore AbortError (user navigated away or sent new message)
      if (e instanceof Error && e.name === 'AbortError') {
        return;
      }

      console.error('Chat error:', e);

      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        role: 'system',
        content: '응답을 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      setStreamingMessageId(null);
    }
  };

  const handleQuickPrompt = (text: string) => {
    setInput(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="container consult-container">
      {/* Header */}
      <div className="consult-header">
        <Header title="✨ AI 운명 상담" />
      </div>

      {/* Credit Badge */}
      <div className="consult-credit-bar">
        <div className="consult-credit-badge">
          <span className="consult-credit-badge__icon">💎</span>
          <span className="small consult-credit-badge__text">{credits} 복채</span>
        </div>
        <Button size="small" color="dark" variant="weak" onClick={() => navigate('/credits')}>
          충전하기
        </Button>
      </div>

      {/* Messages */}
      <div className="consult-messages">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isStreaming={isStreaming && message.id === streamingMessageId}
          />
        ))}

        {/* 스트리밍 시작 전 로딩 인디케이터 - WCAG SC 4.1.3 */}
        {isLoading && !isStreaming && (
          <div
            role="status"
            aria-live="polite"
            aria-label="AI가 응답을 작성하는 중"
            className="consult-loading-indicator"
          >
            <div className="consult-loading-bubble">
              <div className="consult-loading-dots">
                <span aria-hidden="true" className="consult-loading-dot">
                  ✨
                </span>
                <span aria-hidden="true" className="consult-loading-dot">
                  ✨
                </span>
                <span aria-hidden="true" className="consult-loading-dot">
                  ✨
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="consult-quick-prompts">
          <div className="small consult-quick-prompts__title">빠른 질문</div>
          <div className="consult-quick-prompts__list">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(prompt.text)}
                className="consult-quick-prompt-button"
              >
                <span aria-hidden="true">{prompt.icon}</span>
                <span>{prompt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="consult-input-form">
        <div className="consult-input-row">
          <label htmlFor="chat-input" className="sr-only">
            운명 상담 질문 입력
          </label>
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="운명에 대해 물어보세요..."
            aria-label="운명에 대해 물어보세요"
            disabled={isLoading}
            className="consult-chat-input"
          />
          <Button
            type="submit"
            size="medium"
            color="primary"
            variant="fill"
            disabled={!input.trim() || isLoading}
            style={{ borderRadius: 24, paddingLeft: 20, paddingRight: 20 }}
          >
            전송
          </Button>
        </div>
        <div className="small consult-input-hint">메시지 1회당 1 복채이 소모됩니다</div>
      </form>

      {/* Back Button */}
      <div className="consult-back-button">
        <Button
          size="medium"
          color="dark"
          variant="weak"
          display="full"
          onClick={() => navigate('/result')}
        >
          운세로 돌아가기
        </Button>
      </div>

      {/* Insufficient Credits Modal - WCAG SC 2.4.3 Focus Order, SC 4.1.2 Name Role Value */}
      {showInsufficientModal && (
        <div className="consult-modal-overlay" onClick={() => setShowInsufficientModal(false)}>
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="insufficient-credits-title"
            aria-describedby="insufficient-credits-desc"
            className="card consult-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="consult-modal__icon" aria-hidden="true">
              💎
            </div>
            <h2 id="insufficient-credits-title" className="h2 consult-modal__title">
              복채이 부족합니다
            </h2>
            <p id="insufficient-credits-desc" className="p consult-modal__desc">
              AI 상담을 이용하려면 복채이 필요합니다.
              <br />
              복채을 충전하시겠어요?
            </p>
            <div className="consult-modal__actions">
              <Button
                size="large"
                color="primary"
                variant="fill"
                display="full"
                onClick={() => {
                  setShowInsufficientModal(false);
                  navigate('/credits');
                }}
              >
                복채 충전하기
              </Button>
              <Button
                size="large"
                color="dark"
                variant="weak"
                display="full"
                onClick={() => setShowInsufficientModal(false)}
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface MessageBubbleProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

function MessageBubble({ message, isStreaming = false }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="message-bubble--system">
        <span className="small message-bubble__system-content">{message.content}</span>
      </div>
    );
  }

  return (
    <div
      className={`message-bubble ${isUser ? 'message-bubble--user' : 'message-bubble--assistant'}`}
    >
      <div
        className={`message-bubble__content ${isUser ? 'message-bubble__content--user' : 'message-bubble__content--assistant'}`}
      >
        {!isUser && (
          <div className="message-bubble__header">
            <span className="message-bubble__icon">🔮</span>
            <span className="small message-bubble__name">AI 상담사</span>
          </div>
        )}
        <p className="p message-bubble__text">
          {message.content}
          {isStreaming && <span className="message-bubble__cursor" />}
        </p>
        {!isStreaming && (
          <div
            className={`small message-bubble__timestamp ${isUser ? 'message-bubble__timestamp--user' : 'message-bubble__timestamp--assistant'}`}
          >
            {message.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
}
