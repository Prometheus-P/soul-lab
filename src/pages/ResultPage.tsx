import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import UnlockStatus from '../components/UnlockStatus';
import LockedResultView from '../components/LockedResultView';
import UnlockedResultView from '../components/UnlockedResultView';
import { useUnlockLogic } from '../hooks/useUnlockLogic';
import { track } from '../lib/analytics';
import { setLocal } from '../lib/storage';

export default function ResultPage() {
  const [sp] = useSearchParams();

  const referrerInfo = useMemo(() => {
    const referrerId = sp.get('referrer_id');
    const type = sp.get('type');
    if (referrerId && type === 'solo') {
      return { referrerId };
    }
    return null;
  }, [sp]);

  React.useEffect(() => {
    track('result_view', { hasReferrer: !!referrerInfo });
    // Mark that user has seen result page (for faster loading on return visits)
    setLocal('sl_has_seen_result', true);
  }, [referrerInfo]);

  const { state, actions, reportData } = useUnlockLogic();
  const { report } = reportData;
  const cp = reportData.copyVariant;

  return (
    <div className="container">
      <Header title="오늘의 운명" subtitle="별들이 당신에게 전하는 메시지" />

      {/* 공유 링크로 진입한 경우 환영 배너 */}
      {referrerInfo && (
        <div
          className="card"
          style={{
            marginBottom: 12,
            background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.2), rgba(255, 215, 0, 0.1))',
            border: '1px solid rgba(147, 112, 219, 0.3)',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: 20 }}>✨</span>
          <div className="small" style={{ marginTop: 4, color: 'rgba(255, 255, 255, 0.9)' }}>
            친구가 공유한 운명의 문을 열었습니다
          </div>
          <div className="small" style={{ marginTop: 4, color: 'rgba(147, 112, 219, 0.8)' }}>
            아래에서 당신의 오늘 운세를 확인하세요
          </div>
        </div>
      )}

      <UnlockStatus
        locked={state.isLocked}
        reason={state.isLocked ? cp.lockReason : cp.unlockedReason}
      />

      <div className="card" style={{ marginBottom: 12 }}>
        <div className="row">
          <h2 className="h2 glow-text">오늘의 기운</h2>
          <div className="score-display" aria-label={`운세 점수 ${report.score}점`}>{report.score}</div>
        </div>
        <div className="small" style={{ color: 'var(--accent)' }}>{report.rankText}</div>
        <div style={{ marginTop: 10 }} className="p">
          {report.oneLiner}
        </div>
      </div>

      {state.isLocked ? (
        <LockedResultView state={state} actions={actions} reportData={reportData} />
      ) : (
        <UnlockedResultView state={state} actions={actions} reportData={reportData} />
      )}
    </div>
  );
}
