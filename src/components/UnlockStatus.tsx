import React from 'react';
import { Badge } from '@toss/tds-mobile';

export default function UnlockStatus({
  locked,
  reason,
}: {
  locked: boolean;
  reason: string;
}) {
  return (
    <div className="card" style={{
      marginBottom: 12,
      border: locked ? '1px solid rgba(240, 68, 82, 0.2)' : '1px solid rgba(34, 197, 94, 0.3)',
      boxShadow: locked ? '0 0 15px rgba(240, 68, 82, 0.1)' : '0 0 15px rgba(34, 197, 94, 0.15)',
    }}>
      <div className="row">
        <div className="h2" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {locked ? '🔒' : '✨'} 봉인 상태
        </div>
        {locked ? (
          <Badge size="small" color="red" variant="fill">봉인됨</Badge>
        ) : (
          <Badge size="small" color="green" variant="fill">해제됨</Badge>
        )}
      </div>
      <div className="small" style={{ marginTop: 8, color: locked ? 'rgba(255,255,255,0.6)' : 'rgba(34, 197, 94, 0.9)' }}>
        {reason}
      </div>
    </div>
  );
}
