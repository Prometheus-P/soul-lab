import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, AgreementV4 } from '@toss/tds-mobile';
import Header from '../components/Header';
import BirthDatePicker from '../components/BirthDatePicker';
import { COMPLIANCE_COPY } from '../lib/complianceCopy';
import { getAgreement, setAgreement, getBirthDate, setBirthDate, hasRequiredAgreement, hasBirthDate } from '../lib/storage';
import { track } from '../lib/analytics';

function isYYYYMMDD(v: string) {
  return /^\d{8}$/.test(v);
}

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
  const savedBd = useMemo(() => getBirthDate() ?? '', []);

  const [terms, setTerms] = useState(!!saved?.terms);
  const [thirdParty, setThirdParty] = useState(!!saved?.thirdParty);
  const [marketing, setMarketing] = useState(!!saved?.marketing);
  const [birth, setBirth] = useState(savedBd);
  const [err, setErr] = useState<string | null>(null);

  const canGo = terms && isYYYYMMDD(birth);

  const onContinue = () => {
    track('agreement_continue', { thirdParty, marketing });
    setErr(null);
    if (!isYYYYMMDD(birth)) {
      track('agreement_error', { reason: 'birth_invalid' });
      setErr('생년월일을 모두 선택해주세요.');
      return;
    }
    if (!terms) {
      track('agreement_error', { reason: 'terms_required' });
      setErr('약관 동의는 필수입니다.');
      return;
    }
    setBirthDate(birth);
    setAgreement({ terms, thirdParty, marketing });
    track('agreement_saved', { thirdParty, marketing });
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
          value={birth}
          onChange={setBirth}
          error={!!err}
          errorMessage={err ?? undefined}
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
