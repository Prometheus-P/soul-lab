import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@toss/tds-mobile';
import LockedBlur from './LockedBlur';
import AdRewardButton from './AdRewardButton';
import { UnlockActions, UnlockState, ReportData } from '../hooks/useUnlockLogic';

interface LockedResultViewProps {
  state: UnlockState;
  actions: UnlockActions;
  reportData: ReportData;
}

// Extract preview (first N characters) from a string
function getPreview(text: string, maxLen = 12): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen);
}

export default function LockedResultView({ state, actions, reportData }: LockedResultViewProps) {
  const nav = useNavigate();
  const adGroupId = (import.meta.env.VITE_REWARDED_AD_GROUP_ID as string) || 'ait-ad-test-rewarded-id';
  const { report } = reportData;

  return (
    <>
      <LockedBlur
        title="✨ 운명의 봉인"
        subtitle="기운을 모아 행운의 시간, 귀인, 주의점을 열어보세요"
        onUnlock={actions.unlock}
        sections={[
          { label: '🌟 행운의 시간', preview: getPreview(report.luckyTime) },
          { label: '👤 오늘의 귀인', preview: getPreview(report.helper) },
          { label: '⚠️ 주의할 기운', preview: getPreview(report.caution) },
        ]}
      />

      <div style={{ height: 12 }} />
      <AdRewardButton
        adGroupId={adGroupId}
        userKey={state.myKey}
        scope="daily"
        onUnlocked={actions.unlock}
      />

      <div style={{ height: 12 }} />
      <Button size="large" color="dark" variant="weak" display="full" onClick={actions.onShareResult}>
        오늘의 운명 공유하기
      </Button>

      <div style={{ height: 12 }} />
      <ChemistryInviteCard
        thirdPartyConsent={state.thirdPartyConsent}
        title="인연의 실로 봉인 해제"
        subtitle="둘의 기운이 만나면 봉인이 풀립니다."
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

interface ChemistryInviteCardProps {
  thirdPartyConsent: boolean;
  title: string;
  subtitle: string;
  onInviteContacts: () => void;
  onInviteLink: () => void;
}

function ChemistryInviteCard({
  thirdPartyConsent,
  title,
  subtitle,
  onInviteContacts,
  onInviteLink,
}: ChemistryInviteCardProps) {
  const nav = useNavigate();

  return (
    <div className="card" style={{ border: '1px solid rgba(147, 112, 219, 0.3)' }}>
      <div className="h2 mystical-title">{title}</div>
      {!thirdPartyConsent ? (
        <>
          <div className="small">인연을 맺으려면 동의가 필요합니다.</div>
          <div style={{ height: 10 }} />
          <Button size="large" color="primary" variant="fill" display="full" onClick={() => nav('/agreement')}>
            동의하고 인연 맺기
          </Button>
        </>
      ) : (
        <>
          <div className="small">{subtitle}</div>
          <div style={{ height: 10 }} />
          <Button size="large" color="primary" variant="fill" display="full" onClick={onInviteContacts}>
            ✨ 인연 초대하기
          </Button>
          <div style={{ height: 10 }} />
          <Button size="large" color="dark" variant="weak" display="full" onClick={onInviteLink}>
            초대 링크 보내기
          </Button>
        </>
      )}
    </div>
  );
}

function AIConsultCard() {
  const nav = useNavigate();

  return (
    <div
      className="card"
      style={{
        background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.15) 0%, rgba(255, 215, 0, 0.1) 100%)',
        border: '1px solid rgba(255, 215, 0, 0.3)',
      }}
    >
      <div className="h2 glow-text">🔮 AI 운명 상담</div>
      <div className="small" style={{ marginTop: 4, color: 'rgba(255,255,255,0.7)' }}>
        점성술 전문가 AI와 1:1 심층 상담
      </div>
      <div style={{ height: 12 }} />
      <Button size="large" color="primary" variant="fill" display="full" onClick={() => nav('/consult')}>
        ✨ AI 상담 시작하기
      </Button>
      <div style={{ height: 10 }} />
      <Button size="large" color="dark" variant="weak" display="full" onClick={() => nav('/credits')}>
        💎 크레딧 충전하기
      </Button>
    </div>
  );
}

export { ChemistryInviteCard, AIConsultCard };
