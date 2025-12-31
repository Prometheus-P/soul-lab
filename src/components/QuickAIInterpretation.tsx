import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@toss/tds-mobile';
import { getEffectiveUserKey, getBirthDate } from '../lib/storage';
import { getBalance, useCredits, checkCredits, CREDIT_ACTIONS } from '../lib/iap';
import { track } from '../lib/analytics';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface QuickAIInterpretationProps {
  fortuneData: {
    score: number;
    rankText: string;
    oneLiner: string;
    luckyTime?: string;
    helper?: string;
    caution?: string;
  };
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787';

export default function QuickAIInterpretation({ fortuneData }: QuickAIInterpretationProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap for credits modal (WCAG SC 2.4.3)
  useFocusTrap(showCreditsModal, modalRef, {
    onEscape: () => setShowCreditsModal(false),
  });

  const userKey = getEffectiveUserKey();
  const birthdate = getBirthDate();

  const handleGetInterpretation = useCallback(async () => {
    track('quick_ai_interpretation_click');

    // 크레딧 확인
    const creditCheck = await checkCredits(userKey, CREDIT_ACTIONS.AI_CHAT);
    if (!creditCheck.hasEnough) {
      setShowCreditsModal(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 크레딧 차감
      const useResult = await useCredits(userKey, CREDIT_ACTIONS.AI_CHAT, 'AI 운세 해석');
      if (!useResult.success) {
        throw new Error(useResult.error || 'Failed to use credits');
      }

      // AI 해석 요청
      const prompt = `오늘의 운세 데이터를 바탕으로 더 깊은 해석과 조언을 해주세요:
- 운세 점수: ${fortuneData.score}점 (${fortuneData.rankText})
- 한줄 메시지: ${fortuneData.oneLiner}
${fortuneData.luckyTime ? `- 행운의 시간: ${fortuneData.luckyTime}` : ''}
${fortuneData.helper ? `- 오늘의 귀인: ${fortuneData.helper}` : ''}
${fortuneData.caution ? `- 주의사항: ${fortuneData.caution}` : ''}

이 운세를 바탕으로:
1. 오늘 하루를 어떻게 보내면 좋을지
2. 특히 주의해야 할 시간대와 대처법
3. 오늘의 핵심 메시지

간결하게 3-4문단으로 알려주세요.`;

      const response = await fetch(`${API_BASE}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userKey,
          birthdate,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!response.ok) {
        throw new Error('AI 응답을 가져올 수 없습니다');
      }

      const data = await response.json();
      setInterpretation(data.response);
      track('quick_ai_interpretation_success');
    } catch (e) {
      console.error('Quick AI interpretation error:', e);
      setError('해석을 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.');
      track('quick_ai_interpretation_error');
    } finally {
      setIsLoading(false);
    }
  }, [userKey, birthdate, fortuneData]);

  // 이미 해석을 받은 경우
  if (interpretation) {
    return (
      <div className="card" style={{ marginTop: 12 }}>
        <div className="row" style={{ marginBottom: 12 }}>
          <h2 className="h2 glow-text"><span aria-hidden="true">🔮</span> AI 루나의 해석</h2>
        </div>
        <p
          className="p"
          style={{
            whiteSpace: 'pre-wrap',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          {interpretation}
        </p>
        <div style={{ height: 12 }} />
        <Button
          size="medium"
          color="dark"
          variant="weak"
          display="full"
          onClick={() => navigate('/consult')}
        >
          💬 더 자세히 상담하기
        </Button>
      </div>
    );
  }

  return (
    <>
      <div
        className="card"
        style={{
          marginTop: 12,
          background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.15), rgba(255, 215, 0, 0.08))',
          border: '1px solid rgba(147, 112, 219, 0.3)',
        }}
      >
        <div className="row" style={{ marginBottom: 8 }}>
          <h2 className="h2 glow-text"><span aria-hidden="true">🔮</span> AI 운세 해석</h2>
          <span className="small" style={{ color: 'rgba(255, 215, 0, 0.8)' }}>
            1 크레딧
          </span>
        </div>
        <div className="small" style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: 12 }}>
          AI 상담사 루나가 오늘의 운세를 더 깊이 분석해드려요
        </div>

        {error && (
          <div
            className="small"
            style={{
              color: 'rgba(240, 68, 82, 0.9)',
              background: 'rgba(240, 68, 82, 0.1)',
              padding: '8px 12px',
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            {error}
          </div>
        )}

        <Button
          size="large"
          color="primary"
          variant="fill"
          display="full"
          onClick={handleGetInterpretation}
          disabled={isLoading}
        >
          {isLoading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ animation: 'pulse 1s ease-in-out infinite' }}>✨</span>
              AI가 해석하는 중...
            </span>
          ) : (
            '✨ AI 해석 받기'
          )}
        </Button>
      </div>

      {/* 크레딧 부족 모달 - WCAG SC 2.4.3 Focus Order, SC 4.1.2 Name Role Value */}
      {showCreditsModal && (
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
          onClick={() => setShowCreditsModal(false)}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="credits-modal-title"
            aria-describedby="credits-modal-desc"
            className="card"
            style={{
              maxWidth: 340,
              textAlign: 'center',
              border: '1px solid rgba(147, 112, 219, 0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }} aria-hidden="true">💎</div>
            <h2 id="credits-modal-title" className="h2" style={{ marginBottom: 8 }}>
              크레딧이 부족합니다
            </h2>
            <p id="credits-modal-desc" className="p" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 20 }}>
              AI 해석을 받으려면 1 크레딧이 필요합니다.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Button
                size="large"
                color="primary"
                variant="fill"
                display="full"
                onClick={() => {
                  setShowCreditsModal(false);
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
                onClick={() => setShowCreditsModal(false)}
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
