import React from 'react';
import Header from '../components/Header';
import UnlockStatus from '../components/UnlockStatus';
import LockedResultView from '../components/LockedResultView';
import UnlockedResultView from '../components/UnlockedResultView';
import { useUnlockLogic } from '../hooks/useUnlockLogic';
import { track } from '../lib/analytics';
import { setLocal } from '../lib/storage';

export default function ResultPage() {
  React.useEffect(() => {
    track('result_view');
    // Mark that user has seen result page (for faster loading on return visits)
    setLocal('sl_has_seen_result', true);
  }, []);

  const { state, actions, reportData } = useUnlockLogic();
  const { report } = reportData;
  const cp = reportData.copyVariant;

  return (
    <div className="container">
      <Header title="오늘의 운명" subtitle="별들이 당신에게 전하는 메시지" />

      <UnlockStatus
        locked={state.isLocked}
        reason={state.isLocked ? cp.lockReason : cp.unlockedReason}
      />

      <div className="card" style={{ marginBottom: 12 }}>
        <div className="row">
          <div className="h2 glow-text">오늘의 기운</div>
          <div className="score-display">{report.score}</div>
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
