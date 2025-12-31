import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@toss/tds-mobile';
import Header from '../components/Header';
import { getEffectiveUserKey, getBirthDate } from '../lib/storage';
import { getBalance, useCredits, checkCredits, CREDIT_ACTIONS } from '../lib/iap';
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
        content: '안녕하세요, 소울 랩의 AI 상담사입니다. ✨\n\n별자리, 타로, 사주를 융합한 신비로운 운명 상담을 제공합니다.\n\n무엇이든 물어보세요. 당신의 운명에 대해 깊이 있는 통찰을 드릴게요.',
        timestamp: new Date(),
      },
    ]);
  }, [loadBalance]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // 크레딧 확인
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
      // 크레딧 차감
      const useResult = await useCredits(userKey, CREDIT_ACTIONS.AI_CHAT, `AI 상담: ${content.slice(0, 30)}`);
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
                    msg.id === assistantMessageId ? { ...msg, content: streamedContent } : msg
                  )
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
              : msg
          )
        );
      }

      await loadBalance();
      track('consult_response_received', { streaming: true });
    } catch (e) {
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
    <div className="container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 0 }}>
      {/* Header */}
      <div style={{ padding: '16px 16px 0' }}>
        <Header title="✨ AI 운명 상담" />
      </div>

      {/* Credit Badge */}
      <div style={{ padding: '0 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255, 215, 0, 0.15)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            borderRadius: 20,
            padding: '6px 14px',
          }}
        >
          <span style={{ fontSize: 14 }}>💎</span>
          <span className="small" style={{ color: 'rgba(255, 215, 0, 0.9)', fontWeight: 600 }}>
            {credits} 크레딧
          </span>
        </div>
        <Button size="small" color="dark" variant="weak" onClick={() => navigate('/credits')}>
          충전하기
        </Button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
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
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <div
              style={{
                background: 'rgba(147, 112, 219, 0.2)',
                borderRadius: '16px 16px 16px 4px',
                padding: '12px 16px',
              }}
            >
              <div style={{ display: 'flex', gap: 4 }}>
                <span aria-hidden="true" style={{ animation: 'pulse 1s ease-in-out infinite' }}>✨</span>
                <span aria-hidden="true" style={{ animation: 'pulse 1s ease-in-out infinite', animationDelay: '0.2s' }}>✨</span>
                <span aria-hidden="true" style={{ animation: 'pulse 1s ease-in-out infinite', animationDelay: '0.4s' }}>✨</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(147, 112, 219, 0.2)' }}>
          <div className="small" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
            빠른 질문
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(prompt.text)}
                style={{
                  background: 'rgba(147, 112, 219, 0.15)',
                  border: '1px solid rgba(147, 112, 219, 0.3)',
                  borderRadius: 20,
                  padding: '8px 14px',
                  color: '#fff',
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>{prompt.icon}</span>
                <span>{prompt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: 16,
          borderTop: '1px solid rgba(147, 112, 219, 0.2)',
          background: 'rgba(26, 15, 46, 0.9)',
        }}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          <label htmlFor="chat-input" className="sr-only">운명 상담 질문 입력</label>
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="운명에 대해 물어보세요..."
            aria-label="운명에 대해 물어보세요"
            disabled={isLoading}
            style={{
              flex: 1,
              background: 'rgba(147, 112, 219, 0.1)',
              border: '1px solid rgba(147, 112, 219, 0.3)',
              borderRadius: 24,
              padding: '12px 18px',
              color: '#fff',
              fontSize: 15,
            }}
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
        <div className="small" style={{ color: 'rgba(255,255,255,0.4)', marginTop: 8, textAlign: 'center' }}>
          메시지 1회당 1 크레딧이 소모됩니다
        </div>
      </form>

      {/* Back Button */}
      <div style={{ padding: '0 16px 16px' }}>
        <Button size="medium" color="dark" variant="weak" display="full" onClick={() => navigate('/result')}>
          운세로 돌아가기
        </Button>
      </div>

      {/* Insufficient Credits Modal - WCAG SC 2.4.3 Focus Order, SC 4.1.2 Name Role Value */}
      {showInsufficientModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 20,
          }}
          onClick={() => setShowInsufficientModal(false)}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="insufficient-credits-title"
            aria-describedby="insufficient-credits-desc"
            className="card"
            style={{
              maxWidth: 340,
              textAlign: 'center',
              border: '1px solid rgba(147, 112, 219, 0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }} aria-hidden="true">💎</div>
            <h2 id="insufficient-credits-title" className="h2" style={{ marginBottom: 8 }}>
              크레딧이 부족합니다
            </h2>
            <p id="insufficient-credits-desc" className="p" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 20 }}>
              AI 상담을 이용하려면 크레딧이 필요합니다.
              <br />
              크레딧을 충전하시겠어요?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
                크레딧 충전하기
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
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <span
          className="small"
          style={{
            color: 'rgba(240, 68, 82, 0.8)',
            background: 'rgba(240, 68, 82, 0.1)',
            padding: '6px 14px',
            borderRadius: 12,
          }}
        >
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div
        style={{
          maxWidth: '80%',
          background: isUser
            ? 'linear-gradient(135deg, rgba(147, 112, 219, 0.4) 0%, rgba(75, 0, 130, 0.5) 100%)'
            : 'rgba(147, 112, 219, 0.15)',
          border: isUser ? '1px solid rgba(147, 112, 219, 0.4)' : '1px solid rgba(147, 112, 219, 0.2)',
          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          padding: '12px 16px',
        }}
      >
        {!isUser && (
          <div style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14 }}>🔮</span>
            <span className="small" style={{ color: 'rgba(147, 112, 219, 0.8)', fontWeight: 600 }}>
              AI 상담사
            </span>
          </div>
        )}
        <p
          className="p"
          style={{
            margin: 0,
            whiteSpace: 'pre-wrap',
            lineHeight: 1.6,
          }}
        >
          {message.content}
          {isStreaming && (
            <span
              style={{
                display: 'inline-block',
                width: 2,
                height: '1em',
                background: 'rgba(147, 112, 219, 0.8)',
                marginLeft: 2,
                animation: 'blink 0.8s ease-in-out infinite',
              }}
            />
          )}
        </p>
        {!isStreaming && (
          <div
            className="small"
            style={{
              marginTop: 6,
              color: 'rgba(255,255,255,0.4)',
              fontSize: 11,
              textAlign: isUser ? 'right' : 'left',
            }}
          >
            {message.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>

      {/* 타이핑 커서 애니메이션 */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
