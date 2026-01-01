import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@toss/tds-mobile';
import Header from '../components/Header';
import { getPublicKey, getUserSeed, hasThirdPartyConsent, getUnlockedDate, getViralUnlockedDate } from '../lib/storage';
import { makeDetailReport, makeDetailReportAsync, DetailReport } from '../lib/report';
import { todayKey } from '../lib/seed';
import { makeShareLink, runContactsViral, shareMessage } from '../lib/toss';
import { buildInviteDeepLink } from '../lib/handshake';
import { ogImageUrl } from '../lib/og';
import { copyFor } from '../lib/copyVariants';
import { getVariant } from '../lib/variant';
import { track } from '../lib/analytics';
import { toast } from '../components/Toast';

function DetailLoadingPlaceholder() {
  return (
    <>
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="h2 glow-text">오늘의 통찰</div>
        <p className="p" style={{ marginTop: 8, opacity: 0.5 }}>운명의 메시지를 해석하는 중...</p>
      </div>
      <div className="card" style={{ marginBottom: 12, opacity: 0.5 }}>
        <div className="h2 glow-text">재물의 흐름</div>
        <p className="p" style={{ marginTop: 8 }}>불러오는 중...</p>
        <hr className="hr" />
        <div className="h2 glow-text">인연의 기운</div>
        <p className="p" style={{ marginTop: 8 }}>불러오는 중...</p>
        <hr className="hr" />
        <div className="h2 glow-text">오늘의 컨디션</div>
        <p className="p" style={{ marginTop: 8 }}>불러오는 중...</p>
      </div>
    </>
  );
}

export default function DetailPage() {
  React.useEffect(() => { track('detail_view'); }, []);

  const nav = useNavigate();

  const seed = getUserSeed() ?? 'anon';
  const myKey = getPublicKey() ?? seed;
  const moduleId = (import.meta.env.VITE_CONTACTS_MODULE_ID as string) || '';
  const thirdOk = hasThirdPartyConsent();
  const dk = todayKey();

  const unlockedToday = (getUnlockedDate() === dk) || (getViralUnlockedDate() === dk);

  // Async report loading
  const [report, setReport] = useState<DetailReport>(() => makeDetailReport(myKey));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!unlockedToday) return;

    let cancelled = false;
    setIsLoading(true);

    makeDetailReportAsync(myKey)
      .then((asyncReport) => {
        if (!cancelled) {
          setReport(asyncReport);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('[DetailPage] Failed to fetch async report:', err);
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [myKey, unlockedToday]);

  if (!unlockedToday) {
    return (
      <div className="container">
        <Header title="봉인된 운명" subtitle="아직 깊은 메시지가 잠겨 있습니다" />
        <div className="card" style={{ border: '1px solid rgba(147, 112, 219, 0.3)' }}>
          <div className="h2 glow-text">봉인 해제 방법</div>
          <div className="p" style={{ marginTop: 8 }}>깊은 운명은 <b>기운 모으기</b> 또는 <b>인연의 궁합</b>으로 열립니다.</div>
          <div style={{ marginTop: 12 }}>
            <Button size="large" color="primary" variant="fill" display="full" onClick={() => nav('/result')}>
              운명의 문으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const cp = copyFor(getVariant(myKey));


  const makeInviteLink = async () => {
  const deepLink = buildInviteDeepLink(myKey, dk);
  const shareLink = await makeShareLink(deepLink, ogImageUrl('chemistry'));
  const qs = deepLink.split('?')[1] ?? '';
  return { deepLink, shareLink, qs };
};

  const onInviteContacts = async () => {
  if (!thirdOk) {
    toast('친구 초대 기능은 "제3자 정보 제공 동의" 후에만 활성화됩니다.', 'warning');
    nav('/agreement');
    return;
  }

  if (!moduleId.trim()) {
    toast('연락처 모듈 ID가 비어있습니다. 링크 공유로 진행하세요.', 'warning');
    return;
  }

  try {
    const { shareLink, qs } = await makeInviteLink();
    try {
      await navigator.clipboard.writeText(shareLink);
    } catch (err) {
      console.warn('[Clipboard] Copy failed:', err);
    }

    runContactsViral(
      moduleId,
      () => toast('연락처 초대 UI가 열렸습니다. 링크는 이미 복사되었습니다.', 'info'),
      () => {}
    );

    toast('상대가 링크로 접속하면 궁합이 열립니다.', 'success');
    nav(`/chemistry?${qs}`);
  } catch (e) {
    console.error(e);
    toast('초대 생성 실패. 설정/권한을 확인하세요.', 'error');
  }
};

  const onInviteShare = async () => {
  if (!thirdOk) {
    toast('친구 초대 기능은 "제3자 정보 제공 동의" 후에만 활성화됩니다.', 'warning');
    nav('/agreement');
    return;
  }
  try {
    const { shareLink, qs } = await makeInviteLink();
    const ok = await shareMessage(cp.shareChemistry(shareLink));
    if (!ok) {
      try {
        await navigator.clipboard.writeText(shareLink);
      } catch (err) {
        console.warn('[Clipboard] Copy failed:', err);
      }
      toast('공유 실패 → 링크를 복사했습니다.', 'warning');
    }
    toast('상대가 링크로 접속하면 궁합이 열립니다.', 'success');
    nav(`/chemistry?${qs}`);
  } catch (e) {
    console.error(e);
    toast('초대 링크 생성 실패.', 'error');
  }
};

  return (
    <div className="container">
      <Header title="운명의 깊은 메시지" subtitle={isLoading ? '불러오는 중...' : report.subtitle} />

      {isLoading ? (
        <DetailLoadingPlaceholder />
      ) : (
        <>
          <div className="card" style={{ marginBottom: 12 }}>
            <div className="h2 glow-text">오늘의 통찰</div>
            <p className="p" style={{ marginTop: 8 }}>{report.summary}</p>
          </div>

          <div className="card" style={{ marginBottom: 12 }}>
            <div className="h2 glow-text">재물의 흐름</div>
            <p className="p" style={{ marginTop: 8 }}>{report.money}</p>
            <hr className="hr" />
            <div className="h2 glow-text">인연의 기운</div>
            <p className="p" style={{ marginTop: 8 }}>{report.love}</p>
            <hr className="hr" />
            <div className="h2 glow-text">오늘의 컨디션</div>
            <p className="p" style={{ marginTop: 8 }}>{report.condition}</p>
          </div>
        </>
      )}

      <div className="card" style={{ marginBottom: 12, border: '1px solid rgba(147, 112, 219, 0.3)' }}>
        <div className="h2 mystical-title">🔮 인연의 궁합 보기</div>
        {!thirdOk ? (
          <>
            <div className="small">인연을 맺으려면 동의가 필요합니다.</div>
            <div style={{ height: 10 }} />
            <Button size="large" color="primary" variant="fill" display="full" onClick={() => nav('/agreement')}>
              동의하고 인연 맺기
            </Button>
          </>
        ) : (
          <>
            <div className="small">둘의 기운이 만나야 운명이 드러납니다. (오늘만 유효)</div>
            <div style={{ height: 10 }} />
            <Button size="large" color="primary" variant="fill" display="full" onClick={onInviteContacts}>
              ✨ 인연 초대하기
            </Button>
            <div className="action-row" style={{ marginTop: 8 }}>
              <Button size="small" color="dark" variant="weak" onClick={onInviteShare}>
                📋 링크 공유
              </Button>
            </div>
          </>
        )}
      </div>

      {/* 더보기 영역 */}
      <section className="more-section">
        <div className="more-section-header">더보기</div>
        <Button size="small" color="dark" variant="weak" display="full" onClick={() => nav('/result')}>
          ← 오늘의 운명으로
        </Button>
      </section>

      <div className="footer">* 엔터테인먼트 목적의 "연출된 분석"입니다.</div>
    </div>
  );
}
