import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Button, AgreementV4 } from '@toss/tds-mobile';
import Header from '../components/Header';
import BirthDatePicker from '../components/BirthDatePicker';
import { FormTextarea } from '../components/form';
import { COMPLIANCE_COPY } from '../lib/complianceCopy';
import {
  getAgreement,
  setAgreement,
  getBirthInfo,
  setBirthInfo,
  hasRequiredAgreement,
  hasBirthDate,
  getEffectiveUserKey,
  getPublicKey,
  getUserQuestion,
  setUserQuestion,
  type BirthInfo,
} from '../lib/storage';
import { track } from '../lib/analytics';
import { isYYYYMMDD } from '../lib/seed';
import { syncProfileToServer } from '../lib/profileSync';

export default function AgreementPage() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const forceEdit = searchParams.get('edit') === 'true';

  // Redirect if already agreed (unless explicitly editing)
  useEffect(() => {
    if (!forceEdit && hasRequiredAgreement() && hasBirthDate()) {
      nav('/result', { replace: true });
      return;
    }
    track('agreement_view');
  }, [forceEdit, nav]);

  const saved = useMemo(() => getAgreement(), []);
  const savedBirthInfo = useMemo(
    () => getBirthInfo() ?? { yyyymmdd: '', calendar: 'solar' as const, leapMonth: false },
    []
  );
  const savedQuestion = useMemo(() => getUserQuestion() ?? '', []);

  const [terms, setTerms] = useState(!!saved?.terms);
  const [thirdParty, setThirdParty] = useState(!!saved?.thirdParty);
  const [marketing, setMarketing] = useState(!!saved?.marketing);
  const [birthInfo, setBirthInfoState] = useState<BirthInfo>(savedBirthInfo);
  const [question, setQuestion] = useState(savedQuestion);
  const [err, setErr] = useState<string | null>(null);

  const canGo = terms && isYYYYMMDD(birthInfo.yyyymmdd);

  const onContinue = () => {
    track('agreement_continue', { thirdParty, marketing, calendar: birthInfo.calendar });
    setErr(null);
    if (!isYYYYMMDD(birthInfo.yyyymmdd)) {
      track('agreement_error', { reason: 'birth_invalid' });
      setErr('생년월일을 모두 선택해주세요.');
      return;
    }
    if (!terms) {
      track('agreement_error', { reason: 'terms_required' });
      setErr('약관 동의는 필수입니다.');
      return;
    }

    // Save locally first
    setBirthInfo(birthInfo);
    setAgreement({ terms, thirdParty, marketing });
    if (question.trim()) {
      setUserQuestion(question.trim());
    }
    track('agreement_saved', { thirdParty, marketing, hasQuestion: !!question.trim() });

    // Sync to server (non-blocking, fire-and-forget)
    const userKey = getEffectiveUserKey();
    syncProfileToServer({
      userKey,
      birthdate: birthInfo.yyyymmdd,
      consents: { terms, thirdParty, marketing },
      consentedAt: new Date().toISOString(),
      tossPublicKey: getPublicKey() || undefined,
    }).then((result) => {
      if (result.success) {
        track('profile_synced', { userKey });
      } else {
        track('profile_sync_failed', { error: result.error });
      }
    }).catch(console.error);

    nav('/loading', { replace: true });
  };

  return (
    <div className="container">
      <Header title={COMPLIANCE_COPY.headline} subtitle={COMPLIANCE_COPY.sub} />

      <div className="card" style={{ marginBottom: 12 }}>
        <div className="h2 glow-text">✨ 시작하기 전에</div>
        <ul className="ul">
          {COMPLIANCE_COPY.bullets.map((b) => (
            <li key={b} className="p">{b}</li>
          ))}
        </ul>
        <hr className="hr" />

        <div className="h2 glow-text">🔮 운명을 열기 위한 동의</div>

        <AgreementV4.SingleCheckboxField
          type="medium"
          necessity="mandatory"
          checked={terms}
          onCheckedChange={setTerms}
        >
          {COMPLIANCE_COPY.termsTitle}
        </AgreementV4.SingleCheckboxField>

        <AgreementV4.SingleCheckboxField
          type="medium"
          necessity="optional"
          checked={thirdParty}
          onCheckedChange={setThirdParty}
        >
          {COMPLIANCE_COPY.thirdTitle}
        </AgreementV4.SingleCheckboxField>

        <AgreementV4.Description indent={1}>
          {COMPLIANCE_COPY.thirdExplain.map((t, i) => (
            <div key={i}>• {t}</div>
          ))}
        </AgreementV4.Description>

        <AgreementV4.SingleCheckboxField
          type="medium"
          necessity="optional"
          checked={marketing}
          onCheckedChange={setMarketing}
        >
          {COMPLIANCE_COPY.marketingTitle}
        </AgreementV4.SingleCheckboxField>

        <hr className="hr" />
        <div className="h2 glow-text">{COMPLIANCE_COPY.birthTitle}</div>
        <div className="small" style={{ marginBottom: 8 }}>{COMPLIANCE_COPY.birthHint}</div>

        <BirthDatePicker
          value={birthInfo}
          onChange={setBirthInfoState}
          error={!!err}
          errorMessage={err ?? undefined}
        />

        <hr className="hr" />
        <div className="h2 glow-text">💭 오늘 궁금한 것</div>
        <div className="small" style={{ marginBottom: 8 }}>
          연애, 돈, 커리어... 지금 마음에 걸리는 주제가 있다면 적어보세요 (선택)
        </div>
        <FormTextarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="예: 이직 타이밍이 맞는지 모르겠어요"
          maxLength={200}
          minRows={3}
          aria-label="오늘 궁금한 질문"
          showProgress={true}
        />
      </div>

      <Button
        size="large"
        color="primary"
        variant="fill"
        display="full"
        disabled={!canGo}
        onClick={onContinue}
      >
        ✨ 운명의 문 열기
      </Button>

      <div className="footer">{COMPLIANCE_COPY.privacyFoot}</div>
    </div>
  );
}
