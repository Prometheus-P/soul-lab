import React from 'react';
import { BottomSheet, Button } from '@toss/tds-mobile';

function maskId(id: string) {
  if (!id) return '???';
  if (id.length <= 6) return id.slice(0, 3) + '**';
  return `${id.slice(0, 4)}***`;
}

export default function ViralHookModal({
  inviterKey,
  onAccept,
  onClose,
}: {
  inviterKey: string;
  onAccept: () => void;
  onClose: () => void;
}) {
  const masked = maskId(inviterKey);

  return (
    <BottomSheet
      open={true}
      onClose={onClose}
      header={<BottomSheet.Header>✨ 인연의 실이 연결되었습니다</BottomSheet.Header>}
      headerDescription={
        <BottomSheet.HeaderDescription>
          <span style={{ color: '#ffd700' }}>{masked}</span>님이 당신과의{' '}
          <span style={{ color: '#9370db' }}>운명적 궁합</span>을 알고 싶어합니다
        </BottomSheet.HeaderDescription>
      }
      cta={
        <BottomSheet.DoubleCTA
          primaryLabel="✨ 인연 확인하기"
          secondaryLabel="다음에 볼게요"
          onPrimaryClick={onAccept}
          onSecondaryClick={onClose}
        />
      }
    >
      {/* 티저 박스 */}
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(147, 112, 219, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)',
          borderRadius: 12,
          padding: 16,
          border: '1px solid rgba(147, 112, 219, 0.3)',
          boxShadow: '0 0 20px rgba(147, 112, 219, 0.1)',
        }}
      >
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
          🔮 응답하면 드러나는 운명
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.8 }}>
          💫 둘의 인연 점수
          <br />
          🌙 숨겨진 강점과 마찰의 기운
          <br />
          🌟 관계를 빛나게 할 비밀
        </div>
      </div>

      {/* 안내 메시지 */}
      <div
        style={{
          fontSize: 12,
          color: '#ffd700',
          marginTop: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <span>🌙</span>
        <span>
          오늘의 인연은 <strong>내일</strong> 새롭게 펼쳐집니다
        </span>
      </div>
    </BottomSheet>
  );
}
