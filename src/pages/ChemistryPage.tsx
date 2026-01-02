import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Button } from '@toss/tds-mobile';
import Header from '../components/Header';
import LockedBlur from '../components/LockedBlur';
import AdRewardButton from '../components/AdRewardButton';
import ViralHookModal from '../components/ViralHookModal';
import {
  getEffectiveUserKey,
  getUnlockedDate,
  setUnlockedDate,
  setViralUnlockedDate,
} from '../lib/storage';
import { makeChemistryReport, makePartialChemistryReport } from '../lib/report';
import PartialChemistryCard from '../components/PartialChemistryCard';
import { todayKey } from '../lib/seed';
import { makeShareLink, shareMessage } from '../lib/toss';
import { buildInviteDeepLink, buildResponseDeepLink, parseHandshake } from '../lib/handshake';
import { track } from '../lib/analytics';
import { toast } from '../components/Toast';
import { incrementReferral, getLevelUpMessage } from '../lib/referralLevel';
import { claimReferralReward } from '../lib/iap';

export default function ChemistryPage() {
  React.useEffect(() => {
    track('chemistry_view');
  }, []);

  // Track partial chemistry view when modal is closed and partial report is shown
  const [hasTrackedPartial, setHasTrackedPartial] = React.useState(false);

  const nav = useNavigate();
  const [sp] = useSearchParams();
  const [showModal, setShowModal] = useState(true);

  const myKey = getEffectiveUserKey();
  const dk = todayKey();

  const hs = React.useMemo(() => parseHandshake(sp), [sp]);

  const status = React.useMemo(() => {
    if (!hs.from || !hs.d || !hs.sig)
      return { mode: 'invalid' as const, message: '초대 링크가 유효하지 않습니다.' };
    if (!hs.sigValid) return { mode: 'invalid' as const, message: '링크 서명이 맞지 않습니다.' };
    if (hs.d !== dk)
      return { mode: 'expired' as const, message: '이 초대는 만료되었습니다. (오늘 날짜만 유효)' };

    if (hs.kind === 'invite') {
      if (hs.from === myKey)
        return {
          mode: 'selfInvite' as const,
          message: '내가 만든 초대 링크입니다. 친구에게 보내세요.',
        };
      return { mode: 'needResponse' as const, inviterKey: hs.from, dateKey: hs.d };
    }

    if (hs.kind === 'paired') {
      const from = hs.from!;
      const to = hs.to!;
      if (myKey !== from && myKey !== to)
        return { mode: 'outsider' as const, message: '이 결과는 당사자만 열 수 있습니다.' };
      const partnerKey = myKey === from ? to : from;
      return { mode: 'paired' as const, partnerKey, from, to, dateKey: hs.d };
    }

    return { mode: 'invalid' as const, message: '초대 링크가 유효하지 않습니다.' };
  }, [hs, myKey, dk]);

  const unlocked = getUnlockedDate() === dk;

  const report = React.useMemo(() => {
    if (status.mode !== 'paired') return null;
    return makeChemistryReport(myKey, status.partnerKey);
  }, [status, myKey]);

  // Partial report for preview before pairing is complete
  const partialReport = React.useMemo(() => {
    if (status.mode === 'needResponse') {
      return makePartialChemistryReport(myKey, status.inviterKey);
    }
    return null;
  }, [status, myKey]);

  // Track partial chemistry view when modal is dismissed (needResponse)
  // or when selfInvite shows the energy teaser
  React.useEffect(() => {
    if (!hasTrackedPartial) {
      if (!showModal && partialReport) {
        track('partial_chemistry_view', { mode: 'needResponse', score: partialReport.score });
        setHasTrackedPartial(true);
      } else if (status.mode === 'selfInvite') {
        track('partial_chemistry_view', { mode: 'selfInvite' });
        setHasTrackedPartial(true);
      }
    }
  }, [showModal, partialReport, hasTrackedPartial, status.mode]);

  const [levelUpMsg, setLevelUpMsg] = useState<string | null>(null);
  const [creditRewardMsg, setCreditRewardMsg] = useState<string | null>(null);

  // paired 순간: 바이럴 언락 기록(오늘) + 리퍼럴 보상 청구
  React.useEffect(() => {
    if (status.mode === 'paired') {
      setViralUnlockedDate(dk);
      track('chemistry_paired');

      // 리퍼럴 복채 보상 청구 (초대자, 피초대자 모두)
      const claimReward = async () => {
        const result = await claimReferralReward(status.from, status.to, status.dateKey, myKey);

        if (result.success && !result.alreadyClaimed && result.credits && result.credits > 0) {
          const isInviter = myKey === status.from;
          const rewardType = isInviter ? '친구 초대' : '초대 수락';
          setCreditRewardMsg(`🎁 ${rewardType} 보상으로 ${result.credits} 복채을 받았습니다!`);
          track('referral_reward_claimed', {
            credits: result.credits,
            isInviter,
            newBalance: result.newBalance,
          });
        }
      };
      claimReward().catch((err) => {
        console.error('[ChemistryPage] claimReward failed:', err);
        toast('보상 청구에 실패했습니다', 'error');
      });

      // 초대자(inviter)일 경우, 리퍼럴 카운트 증가 (중복 방지)
      if (status.from === myKey) {
        const pairedKey = `sl_paired_${status.from}_${status.to}_${dk}`;
        if (!localStorage.getItem(pairedKey)) {
          localStorage.setItem(pairedKey, 'true');
          const newCount = incrementReferral();
          const msg = getLevelUpMessage(newCount);
          if (msg) setLevelUpMsg(msg);
          track('referral_increment', { count: newCount });
        }
      }
    }
  }, [status, dk, myKey]);

  const unlockToday = () => setUnlockedDate(dk);

  const onCopyInviteLink = async () => {
    track('chem_invite_copy');
    // inviter selfInvite: 내 초대 링크를 다시 복사/공유
    try {
      const deepLink = buildInviteDeepLink(myKey, dk);
      const shareLink = await makeShareLink(deepLink);
      try {
        await navigator.clipboard.writeText(shareLink);
      } catch (err) {
        console.warn('[Clipboard] Copy failed:', err);
      }
      await shareMessage(`초대 링크를 복사했습니다.
${shareLink}`);
    } catch (e) {
      console.error(e);
      toast('초대 링크 생성 실패', 'error');
    }
  };

  const onMakeResponseLink = async () => {
    track('chem_response_make');
    if (status.mode !== 'needResponse') return;
    try {
      // invitee -> inviter
      const deepLink = buildResponseDeepLink(status.inviterKey, myKey, status.dateKey);
      const shareLink = await makeShareLink(deepLink);

      try {
        await navigator.clipboard.writeText(shareLink);
      } catch (err) {
        console.warn('[Clipboard] Copy failed:', err);
      }

      await shareMessage(`응답 링크를 보냈습니다! (링크는 이미 복사됨)\n${shareLink}`);

      // invitee도 즉시 결과 보기: paired view로 replace
      const qs = deepLink.split('?')[1] ?? '';
      nav(`/chemistry?${qs}`, { replace: true });
    } catch (e) {
      console.error(e);
      toast('응답 링크 생성 실패', 'error');
    }
  };

  const onSharePaired = async () => {
    if (status.mode !== 'paired') return;
    try {
      const deepLink = buildResponseDeepLink(status.from, status.to, status.dateKey);
      const shareLink = await makeShareLink(deepLink);
      try {
        await navigator.clipboard.writeText(shareLink);
      } catch (err) {
        console.warn('[Clipboard] Copy failed:', err);
      }
      await shareMessage(`우리 케미 결과 링크: ${shareLink}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      <Header title="인연의 궁합" subtitle="두 영혼이 만나 운명이 드러납니다" />

      {status.mode === 'invalid' && (
        <div className="card">
          <div className="h2 glow-text">🌙 연결 끊김</div>
          <p className="p" style={{ marginTop: 8 }}>
            {status.message}
          </p>
          <div style={{ marginTop: 12 }}>
            <Button
              size="large"
              color="dark"
              variant="weak"
              display="full"
              onClick={() => nav('/')}
            >
              운명의 문으로
            </Button>
          </div>
        </div>
      )}

      {status.mode === 'expired' && (
        <div className="card">
          <div className="h2 glow-text">⏳ 시간의 흐름</div>
          <p className="p" style={{ marginTop: 8 }}>
            {status.message}
          </p>
          <div style={{ marginTop: 12 }}>
            <Button
              size="large"
              color="dark"
              variant="weak"
              display="full"
              onClick={() => nav('/')}
            >
              운명의 문으로
            </Button>
          </div>
        </div>
      )}

      {status.mode === 'outsider' && (
        <div className="card">
          <div className="h2 glow-text">🔮 봉인된 인연</div>
          <p className="p" style={{ marginTop: 8 }}>
            {status.message}
          </p>
          <div style={{ marginTop: 12 }}>
            <Button
              size="large"
              color="dark"
              variant="weak"
              display="full"
              onClick={() => nav('/')}
            >
              운명의 문으로
            </Button>
          </div>
        </div>
      )}

      {status.mode === 'selfInvite' && (
        <>
          {/* Your energy teaser card */}
          <div className="card" style={{ marginBottom: 12, textAlign: 'center' }}>
            <div className="h2 glow-text">당신의 우주적 기운</div>
            <div
              className="score-display"
              style={{
                opacity: 0.6,
                animation: 'pulse-glow 2s ease-in-out infinite',
                margin: '12px auto',
              }}
            >
              ?
            </div>
            <p className="p" style={{ color: 'rgba(255,255,255,0.6)' }}>
              우주가 당신의 운명을 계산하고 있습니다...
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            {/* Waiting animation */}
            <div
              style={{
                width: 80,
                height: 80,
                margin: '0 auto 16px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '3px solid rgba(147, 112, 219, 0.2)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '3px solid transparent',
                  borderTopColor: '#9370db',
                  animation: 'waiting-spin 1.5s linear infinite',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 15,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(147, 112, 219, 0.4), rgba(75, 0, 130, 0.6))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                }}
              >
                💫
              </div>
            </div>

            <div className="h2 glow-text">인연의 실 대기 중...</div>
            <p className="p" style={{ marginTop: 8 }}>
              친구가 링크를 열면 둘의 궁합이 드러납니다
            </p>

            <div style={{ marginTop: 16 }}>
              <Button
                size="large"
                color="primary"
                variant="fill"
                display="full"
                onClick={onCopyInviteLink}
              >
                📋 초대 링크 다시 보내기
              </Button>
            </div>
            <div style={{ marginTop: 8 }}>
              <Button
                size="large"
                color="dark"
                variant="weak"
                display="full"
                onClick={() => nav('/')}
              >
                운명의 문으로
              </Button>
            </div>

            <style>{`
              @keyframes waiting-spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes pulse-glow {
                0%, 100% { opacity: 0.4; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.05); }
              }
            `}</style>
          </div>
        </>
      )}

      {status.mode === 'needResponse' && (
        <>
          {showModal && (
            <ViralHookModal
              inviterKey={status.inviterKey}
              onAccept={() => {
                track('viral_modal_accept');
                setShowModal(false);
              }}
              onClose={() => {
                track('viral_modal_close');
                setShowModal(false);
              }}
            />
          )}
          {/* Show partial chemistry preview after modal is closed */}
          {!showModal && partialReport && (
            <PartialChemistryCard
              score={partialReport.score}
              label={partialReport.label}
              mode="needResponse"
              onAction={onMakeResponseLink}
            />
          )}
          {/* Fallback CTA if no partial report */}
          {!showModal && !partialReport && (
            <div className="card" style={{ border: '1px solid rgba(147, 112, 219, 0.4)' }}>
              <div className="h2 mystical-title">✨ 인연의 부름</div>
              <p className="p" style={{ marginTop: 8 }}>
                누군가 당신과의 운명을 알고 싶어합니다. 응답하면 둘의 궁합이 드러납니다.
              </p>
              <div style={{ marginTop: 12 }}>
                <Button
                  size="large"
                  color="primary"
                  variant="fill"
                  display="full"
                  onClick={onMakeResponseLink}
                >
                  ✨ 인연에 응답하기
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {status.mode === 'paired' && report && (
        <>
          {/* 복채 보상 메시지 */}
          {creditRewardMsg && (
            <div
              className="card"
              style={{
                marginBottom: 12,
                background:
                  'linear-gradient(135deg, rgba(75, 0, 130, 0.3), rgba(147, 112, 219, 0.3))',
                border: '1px solid rgba(147, 112, 219, 0.5)',
                textAlign: 'center',
              }}
            >
              <div className="h2 glow-text">{creditRewardMsg}</div>
              <div className="small" style={{ marginTop: 8, color: 'rgba(255, 255, 255, 0.7)' }}>
                복채으로 AI 상담을 이용해보세요!
              </div>
            </div>
          )}

          {/* 레벨업 메시지 */}
          {levelUpMsg && (
            <div
              className="card"
              style={{
                marginBottom: 12,
                background:
                  'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(147, 112, 219, 0.2))',
                border: '1px solid rgba(255, 215, 0, 0.4)',
              }}
            >
              <div className="h2" style={{ color: '#ffd700' }}>
                {levelUpMsg}
              </div>
            </div>
          )}

          <div className="card" style={{ marginBottom: 12 }}>
            <div className="row">
              <div className="h2 glow-text">인연의 기운</div>
              <div className="score-display">{report.score}</div>
            </div>
            <div className="small" style={{ color: 'var(--accent)' }}>
              {report.label}
            </div>
          </div>

          <div className="card" style={{ marginBottom: 12 }}>
            <div className="h2 glow-text">🌟 운명의 메시지</div>
            <p className="p" style={{ marginTop: 8 }}>
              {report.summary}
            </p>
          </div>

          <div className="card" style={{ marginBottom: 12 }}>
            <div className="h2 glow-text">🔮 깊은 통찰</div>

            {unlocked ? (
              <div style={{ marginTop: 10 }}>
                <p className="p">
                  <b>💫 요약</b>: {report.summary}
                </p>
                <hr className="hr" />
                <p className="p">
                  <b>⚡ 마찰의 기운</b>: {report.friction}
                </p>
                <hr className="hr" />
                <p className="p">
                  <b>🌈 관계의 부스터</b>: {report.booster}
                </p>
              </div>
            ) : (
              <>
                <LockedBlur
                  title="✨ 깊은 인연의 봉인"
                  subtitle="기운을 모아 둘의 강점, 마찰, 부스터를 열어보세요"
                  onUnlock={unlockToday}
                  sections={[{ label: '강점' }, { label: '마찰' }, { label: '부스터' }]}
                />
                <div style={{ marginTop: 12 }}>
                  <AdRewardButton
                    adGroupId={
                      (import.meta.env.VITE_REWARDED_AD_GROUP_ID as string) ||
                      'ait-ad-test-rewarded-id'
                    }
                    userKey={myKey}
                    scope="chem_detail"
                    onUnlocked={unlockToday}
                  />
                </div>
              </>
            )}

            <div style={{ marginTop: 10 }}>
              <Button
                size="large"
                color="dark"
                variant="weak"
                display="full"
                onClick={onSharePaired}
              >
                인연의 결과 공유하기
              </Button>
            </div>
          </div>

          <div className="card" style={{ border: '1px solid rgba(147, 112, 219, 0.3)' }}>
            <div className="h2 mystical-title">🌙 다음 여정</div>
            <div style={{ marginTop: 12 }}>
              <Button
                size="large"
                color="primary"
                variant="fill"
                display="full"
                onClick={() => nav('/')}
              >
                오늘의 운명으로 돌아가기
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
