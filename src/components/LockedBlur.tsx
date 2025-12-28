import React from 'react';

const MASKED_PLACEHOLDER = '✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦';

export default function LockedBlur({
  title,
  subtitle,
  onUnlock,
  sections,
}: {
  title: string;
  subtitle: string;
  onUnlock: () => void;
  sections: { label: string }[];
}) {
  return (
    <div className="lockWrap">
      <div className="lockContent">
        <div className="card" style={{ background: 'rgba(26, 15, 46, 0.6)' }}>
          {sections.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <hr className="hr" />}
              <div className="h2" style={{ color: 'rgba(147, 112, 219, 0.5)' }}>{s.label}</div>
              <p className="p" style={{ marginTop: 8, color: 'rgba(147, 112, 219, 0.3)' }}>{MASKED_PLACEHOLDER}</p>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="lockOverlay" style={{
        background: 'radial-gradient(ellipse at center, rgba(147, 112, 219, 0.15) 0%, rgba(10, 6, 18, 0.95) 70%)',
      }}>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <div style={{
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 8,
            background: 'linear-gradient(135deg, #9370db 0%, #ffd700 50%, #9370db 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {title}
          </div>
          <div className="small" style={{ marginBottom: 16, color: 'rgba(255,255,255,0.7)' }}>
            {subtitle}
          </div>
          <button
            onClick={onUnlock}
            style={{
              padding: '12px 24px',
              fontSize: 14,
              fontWeight: 600,
              color: 'white',
              background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.3) 0%, rgba(255, 215, 0, 0.2) 100%)',
              border: '1px solid rgba(147, 112, 219, 0.4)',
              borderRadius: 12,
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(147, 112, 219, 0.3)',
            }}
          >
            🔮 기운을 모아 봉인 해제
          </button>
        </div>
      </div>
    </div>
  );
}
