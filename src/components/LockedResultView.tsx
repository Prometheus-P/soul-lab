import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@toss/tds-mobile';
import LockedBlur from './LockedBlur';
import AdRewardButton from './AdRewardButton';
import { UnlockActions, UnlockState, ReportData } from '../hooks/useUnlockLogic';
import { getStreak } from '../lib/streak';
import { qualifiesForFreeUnlock, getFreeUnlockMessage } from '../lib/streakBonus';
import { getDaysSinceFirstVisit } from '../lib/storage';
import { track } from '../lib/analytics';

// 광고 노출 시작일 (첫 방문 후 N일차부터)
const AD_DELAY_DAYS = 3;

interface LockedResultViewProps {
  state: UnlockState;
  actions: UnlockActions;
  reportData: ReportData;
}

// Extract preview (first N characters) from a string
function getPreview(text: string | undefined, maxLen = 12): string {
  if (!text) return '???';
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen);
}

export default function LockedResultView({ state, actions, reportData }: LockedResultViewProps) {
  const nav = useNavigate();
  const adGroupId = (import.meta.env.VITE_REWARDED_AD_GROUP_ID as string) || 'ait-ad-test-rewarded-id';
  const { report } = reportData;

  const streak = getStreak();
  const hasFreeUnlock = qualifiesForFreeUnlock(streak);
  const freeUnlockMessage = getFreeUnlockMessage(streak);

  // 광고는 3일차부터 노출 (신규 유저 친화적)
  const daysSinceFirstVisit = getDaysSinceFirstVisit();
  const showAds = daysSinceFirstVisit >= AD_DELAY_DAYS;

  const handleFreeUnlock = () => {
    track('streak_free_unlock', { streak });
    actions.unlock();
  };

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

      {/* 3일 연속 방문 무료 해제 보너스 */}
      {hasFreeUnlock && (
        <div style={{ marginTop: 12 }}>
          <div
            className="card"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(147, 112, 219, 0.2))',
              border: '2px solid rgba(255, 215, 0, 0.5)',
              textAlign: 'center',
              animation: 'streak-bonus-glow 2s ease-in-out infinite',
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>🎁</div>
            <div className="h2" style={{ color: '#ffd700', marginBottom: 4 }}>
              연속 방문 보너스!
            </div>
            <div className="small" style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: 12 }}>
              {freeUnlockMessage}
            </div>
            <Button size="large" color="primary" variant="fill" display="full" onClick={handleFreeUnlock}>
              🔓 무료로 봉인 해제하기
            </Button>
          </div>
          <style>{`
            @keyframes streak-bonus-glow {
              0%, 100% { box-shadow: 0 0 10px rgba(255, 215, 0, 0.3); }
              50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
            }
          `}</style>
        </div>
      )}

      {/* 광고는 3일차부터 노출 */}
      {showAds ? (
        <>
          <div style={{ height: 12 }} />
          <AdRewardButton
            adGroupId={adGroupId}
            userKey={state.myKey}
            scope="daily"
            onUnlocked={actions.unlock}
          />
        </>
      ) : (
        <div style={{ height: 12 }}>
          <div
            className="card"
            style={{
              background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.1), rgba(75, 0, 130, 0.2))',
              border: '1px solid rgba(147, 112, 219, 0.3)',
              textAlign: 'center',
            }}
          >
            <div className="small" style={{ color: 'rgba(255,255,255,0.7)' }}>
              🌙 {AD_DELAY_DAYS - daysSinceFirstVisit}일 후 추가 해제 방법이 열립니다
            </div>
          </div>
        </div>
      )}

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
