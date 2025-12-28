import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { preloadRewardedAd } from '../lib/toss';
import { hasRequiredAgreement, hasBirthDate, getBirthDate } from '../lib/storage';
import { track } from '../lib/analytics';

const RITUAL_DURATION_MS = 3500;

const ritualPhases = [
  { text: '✨ 별들과 교신 중...', sub: '당신의 영혼 주파수를 찾고 있습니다' },
  { text: '🌙 태어난 날의 기운을 읽는 중...', sub: '운명의 실이 펼쳐집니다' },
  { text: '🔮 과거의 선택들을 비추는 중...', sub: '숨겨진 패턴이 드러납니다' },
  { text: '💫 오늘의 에너지 흐름 감지 중...', sub: '시간의 강이 흐르고 있습니다' },
  { text: '🌟 행운의 좌표를 계산 중...', sub: '별자리가 속삭입니다' },
  { text: '👤 귀인의 기운을 탐색 중...', sub: '인연의 실이 빛납니다' },
  { text: '📜 운명의 두루마리를 펼치는 중...', sub: '당신의 이야기가 드러납니다' },
];

export default function LoadingPage() {
  useEffect(() => { track('loading_start'); }, []);

  const nav = useNavigate();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const birthYear = getBirthDate()?.slice(0, 4) || '????';

  useEffect(() => {
    if (!hasRequiredAgreement() || !hasBirthDate()) {
      nav('/agreement', { replace: true });
      return;
    }

    const adGroupId = (import.meta.env.VITE_REWARDED_AD_GROUP_ID as string) || 'ait-ad-test-rewarded-id';
    preloadRewardedAd(adGroupId);

    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        (navigator as any).vibrate([30, 50, 30, 50, 30]);
      }
    } catch {}

    const phaseInterval = RITUAL_DURATION_MS / ritualPhases.length;
    const progressInterval = 50;
    const progressStep = 100 / (RITUAL_DURATION_MS / progressInterval);

    const t1 = setInterval(() => {
      setPhaseIndex((prev) => Math.min(prev + 1, ritualPhases.length - 1));
    }, phaseInterval);

    const t2 = setInterval(() => {
      setProgress((prev) => Math.min(prev + progressStep, 100));
    }, progressInterval);

    const t3 = setTimeout(() => {
      track('loading_complete');
      nav('/result', { replace: true });
    }, RITUAL_DURATION_MS);

    return () => {
      clearInterval(t1);
      clearInterval(t2);
      clearTimeout(t3);
    };
  }, [nav]);

  const phase = ritualPhases[phaseIndex];

  return (
    <div className="container">
      <Header title="운명을 읽는 중" subtitle={`${birthYear}년생의 별자리가 속삭입니다`} />

      <div className="card" style={{ textAlign: 'center', padding: '32px 16px' }}>
        {/* Mystical Orb */}
        <div style={{
          position: 'relative',
          width: 80,
          height: 80,
          margin: '0 auto 24px',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(255,215,0,0.4), rgba(147,112,219,0.6), rgba(75,0,130,0.8))',
            animation: 'pulse 2s ease-in-out infinite',
            boxShadow: '0 0 40px rgba(147, 112, 219, 0.6), 0 0 80px rgba(255, 215, 0, 0.3)',
          }} />
          <div style={{
            position: 'absolute',
            inset: 4,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.3), transparent 60%)',
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid rgba(255, 215, 0, 0.3)',
            animation: 'spin 8s linear infinite',
          }} />
        </div>

        <div className="h2 glow-text" style={{ marginBottom: 8, fontSize: 16 }}>
          {phase.text}
        </div>

        <div className="small" style={{ marginBottom: 20, minHeight: 18, color: 'rgba(255,255,255,0.7)' }}>
          {phase.sub}
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: 6,
          borderRadius: 3,
          background: 'rgba(147, 112, 219, 0.2)',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            borderRadius: 3,
            background: 'linear-gradient(90deg, #9370db, #ffd700)',
            boxShadow: '0 0 10px rgba(147, 112, 219, 0.6)',
            transition: 'width 0.1s linear',
          }} />
        </div>

        <div className="small" style={{ marginTop: 12, color: 'var(--accent)' }}>
          {Math.round(progress)}% 완료
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
