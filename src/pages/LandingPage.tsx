import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Button, Badge } from '@toss/tds-mobile';
import Header from '../components/Header';
import ViralHookModal from '../components/ViralHookModal';
import StreakBadge, { StreakProgress } from '../components/StreakBadge';
import { hasRequiredAgreement, hasBirthDate, getPublicKey, getUserSeed } from '../lib/storage';
import { getStreak, wasGraceUsed } from '../lib/streak';
import { getStreakLevel, getStreakReward, qualifiesForFreeUnlock } from '../lib/streakBonus';
import { copyFor } from '../lib/copyVariants';
import { getVariant } from '../lib/variant';
import { getAttribution } from '../lib/attribution';
import { track } from '../lib/analytics';
import { claimStreakReward, StreakReward } from '../lib/iap';
import { todayKey } from '../lib/seed';

export default function LandingPage() {
  useEffect(() => {
    track('landing_view');
  }, []);

  const nav = useNavigate();
  const loc = useLocation();

  const seed = getUserSeed() ?? 'anon';
  const myKey = getPublicKey() ?? seed;

  const v = useMemo(() => getVariant(myKey), [myKey]);
  const cp = useMemo(() => copyFor(v), [v]);

  const streak = getStreak();
  const streakLevel = getStreakLevel(streak);
  const streakReward = getStreakReward(streak);
  const hasFreeUnlock = qualifiesForFreeUnlock(streak);
  const graceUsed = wasGraceUsed();
  const attr = getAttribution();

  // 스트릭 복채 보상 상태
  const [streakCreditRewards, setStreakCreditRewards] = useState<StreakReward[]>([]);
  const [showCreditReward, setShowCreditReward] = useState(false);
  const creditRewardTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 스트릭 복채 보상 청구
  const claimStreakCredits = useCallback(async () => {
    if (!myKey || myKey === 'anon' || streak < 1) return;

    try {
      const result = await claimStreakReward(myKey, todayKey(), streak);
      if (result.success && !result.alreadyClaimed && result.rewards.length > 0) {
        setStreakCreditRewards(result.rewards);
        setShowCreditReward(true);
        track('streak_credit_reward', {
          streak,
          totalCredits: result.totalCredits,
          rewardCount: result.rewards.length,
        });
        // 5초 후 자동 숨김
        creditRewardTimerRef.current = setTimeout(() => setShowCreditReward(false), 5000);
      }
    } catch (err) {
      console.error('Failed to claim streak credits:', err);
    }
  }, [myKey, streak]);

  useEffect(() => {
    claimStreakCredits();
  }, [claimStreakCredits]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (creditRewardTimerRef.current) {
        clearTimeout(creditRewardTimerRef.current);
      }
    };
  }, []);

  const referrerInfo = useMemo(() => {
    const sp = new URLSearchParams(loc.search);
    const from = sp.get('from') || sp.get('referrer_id') || attr?.referrerId || '';
    const type = sp.get('type') || attr?.entryType || '';
    if (!from || type !== 'chemistry') return null;
    return { from, search: loc.search };
  }, [loc.search, attr?.referrerId, attr?.entryType]);

  const [showModal, setShowModal] = useState(!!referrerInfo);

  React.useEffect(() => {
    if (referrerInfo) track('entry_chemistry');
  }, [referrerInfo]);

  const onStart = () => {
    track('cta_start', { hasReferrer: !!referrerInfo });
    if (!hasRequiredAgreement() || !hasBirthDate()) {
      track('cta_needs_agreement');
      nav('/agreement');
      return;
    }
    track('cta_to_loading');
    nav('/loading');
  };

  const onGoToChemistry = () => {
    track('viral_modal_accept_landing');
    setShowModal(false);
    if (referrerInfo) {
      nav(`/chemistry${referrerInfo.search}`);
    }
  };

  return (
    <div className="container">
      {/* 바이럴 훅 모달: 초대 링크로 진입 시 */}
      {showModal && referrerInfo && (
        <ViralHookModal
          inviterKey={referrerInfo.from}
          onAccept={onGoToChemistry}
          onClose={() => {
            track('viral_modal_close_landing');
            setShowModal(false);
          }}
        />
      )}

      {/* 스트릭 복채 보상 알림 */}
      {showCreditReward && streakCreditRewards.length > 0 && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.95), rgba(255, 165, 0, 0.95))',
            padding: '16px 24px',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(255, 215, 0, 0.4)',
            animation: 'credit-reward-pop 0.4s ease-out',
            textAlign: 'center',
            maxWidth: '90%',
          }}
          onClick={() => setShowCreditReward(false)}
        >
          <div style={{ fontSize: 28, marginBottom: 4 }}>🎉</div>
          <div style={{ fontWeight: 700, color: '#1a1a2e', fontSize: 16 }}>스트릭 보상 획득!</div>
          {streakCreditRewards.map((r, i) => (
            <div key={i} style={{ color: '#333', fontSize: 14, marginTop: 4 }}>
              {r.name}: <strong>+{r.credits} 복채</strong>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes credit-reward-pop {
          0% { opacity: 0; transform: translateX(-50%) scale(0.8) translateY(-20px); }
          100% { opacity: 1; transform: translateX(-50%) scale(1) translateY(0); }
        }
      `}</style>

      <Header title="SOUL LAB" subtitle="오늘, 당신의 운명이 속삭입니다" />

      {referrerInfo && !showModal ? (
        <div
          className="card"
          style={{ marginBottom: 12, border: '1px solid rgba(147, 112, 219, 0.4)' }}
        >
          <Badge
            size="small"
            color="blue"
            variant="weak"
            style={{ background: 'rgba(147, 112, 219, 0.25)' }}
          >
            ✨ 인연의 실이 연결되었습니다
          </Badge>
          <div className="small" style={{ marginTop: 8 }}>
            둘의 기운이 만나면 운명이 드러납니다.
          </div>
          <div style={{ height: 10 }} />
          <Button
            size="large"
            color="primary"
            variant="fill"
            display="full"
            onClick={onGoToChemistry}
          >
            운명의 인연 확인하기
          </Button>
        </div>
      ) : null}

      <div className="card" style={{ marginBottom: 12 }}>
        <div className="row">
          <div className="h2 glow-text">오늘의 기운</div>
          <StreakBadge streak={streak} level={streakLevel} showMilestone={!!streakReward} />
        </div>

        {/* 다음 레벨까지 진행률 */}
        <StreakProgress streak={streak} level={streakLevel} />

        {/* 그레이스 데이 사용 시 메시지 */}
        {graceUsed && (
          <div
            className="small"
            style={{
              marginTop: 8,
              padding: '8px 12px',
              background: 'rgba(147, 112, 219, 0.15)',
              borderRadius: 8,
              color: '#ffd700',
            }}
          >
            ✨ 다행이에요! 인연의 끈이 유지되었습니다
          </div>
        )}

        {/* 마일스톤 보상 메시지 */}
        {streakReward && (
          <div
            className="small"
            style={{
              marginTop: 8,
              padding: '8px 12px',
              background:
                'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(147, 112, 219, 0.2))',
              borderRadius: 8,
              color: '#ffd700',
              animation: 'milestone-glow 2s ease-in-out infinite',
            }}
          >
            {streakReward}
          </div>
        )}

        {/* 무료 해제 보너스 알림 */}
        {hasFreeUnlock && !streakReward && (
          <div
            className="small"
            style={{
              marginTop: 8,
              padding: '8px 12px',
              background:
                'linear-gradient(135deg, rgba(255, 215, 0, 0.25), rgba(147, 112, 219, 0.15))',
              borderRadius: 8,
              color: '#ffd700',
              border: '1px solid rgba(255, 215, 0, 0.3)',
            }}
          >
            🎁 {streak}일 연속 방문 보너스! 오늘은 무료 해제가 가능합니다
          </div>
        )}

        <div className="small" style={{ marginTop: 8 }}>
          별들이 당신에게 전하는 메시지를 확인하세요.
        </div>

        <style>{`
          @keyframes milestone-glow {
            0%, 100% { box-shadow: 0 0 8px rgba(255, 215, 0, 0.3); }
            50% { box-shadow: 0 0 16px rgba(255, 215, 0, 0.6); }
          }
        `}</style>
      </div>

      <Button size="large" color="primary" variant="fill" display="full" onClick={onStart}>
        ✨ 운명의 문 열기
      </Button>
    </div>
  );
}
