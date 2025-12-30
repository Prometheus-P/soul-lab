import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@toss/tds-mobile';
import { ReportData, UnlockActions, UnlockState } from '../hooks/useUnlockLogic';
import { ChemistryInviteCard, AIConsultCard } from './LockedResultView';
import QuickAIInterpretation from './QuickAIInterpretation';

interface UnlockedResultViewProps {
  state: UnlockState;
  actions: UnlockActions;
  reportData: ReportData;
}

export default function UnlockedResultView({ state, actions, reportData }: UnlockedResultViewProps) {
  const nav = useNavigate();
  const { report, hint } = reportData;

  return (
    <>
      <div className="card">
        <div className="h2 glow-text">🌟 행운의 시간</div>
        <p className="p" style={{ marginTop: 8 }}>{report.luckyTime}</p>
        <hr className="hr" />
        <div className="h2 glow-text">👤 오늘의 귀인</div>
        <p className="p" style={{ marginTop: 8 }}>{report.helper}</p>
        <hr className="hr" />
        <div className="h2 glow-text">⚠️ 주의할 기운</div>
        <p className="p" style={{ marginTop: 8 }}>{report.caution}</p>
      </div>

      {/* AI 운세 해석 */}
      <QuickAIInterpretation
        fortuneData={{
          score: report.score,
          rankText: report.rankText,
          oneLiner: report.oneLiner,
          luckyTime: report.luckyTime,
          helper: report.helper,
          caution: report.caution,
        }}
      />

      <TomorrowPreview hint={hint} />

      <div style={{ height: 12 }} />
      <Button size="large" color="primary" variant="fill" display="full" onClick={() => nav('/detail')}>
        더 깊은 운명 보기
      </Button>

      <div style={{ height: 12 }} />
      <Button size="large" color="dark" variant="weak" display="full" onClick={actions.onShareResult}>
        오늘의 운명 공유하기
      </Button>

      <div style={{ height: 12 }} />
      <ChemistryInviteCard
        thirdPartyConsent={state.thirdPartyConsent}
        title="✨ 인연의 궁합 보기"
        subtitle="둘의 기운이 만나야 운명이 드러납니다."
        onInviteContacts={actions.onInviteChemistryContacts}
        onInviteLink={actions.onInviteChemistryLink}
      />

      <div style={{ height: 12 }} />
      <AIConsultCard />

      <div style={{ height: 12 }} />
      <Button size="large" color="dark" variant="weak" display="full" onClick={() => nav('/tarot')}>
        🃏 타로 카드 뽑기
      </Button>
    </>
  );
}

interface TomorrowPreviewProps {
  hint: string;
}

function TomorrowPreview({ hint }: TomorrowPreviewProps) {
  return (
    <div
      className="card"
      style={{
        marginTop: 12,
        border: '1px solid rgba(147, 112, 219, 0.2)',
        background: 'linear-gradient(135deg, rgba(20,20,30,0.9), rgba(30,20,40,0.9))',
      }}
    >
      <div className="h2" style={{ color: 'rgba(255,255,255,0.5)' }}>
        🌅 내일의 기운 미리보기
      </div>
      <div
        style={{
          filter: 'blur(6px)',
          color: 'rgba(255,255,255,0.3)',
          userSelect: 'none',
          marginTop: 8,
          fontSize: 14,
        }}
      >
        {hint}
      </div>
      <div className="small" style={{ marginTop: 12, color: '#ffd700' }}>
        ✨ 내일 다시 방문하면 상세 운세가 열립니다
      </div>
    </div>
  );
}

export { TomorrowPreview };
