import React from 'react';
import Header from '../components/Header';
import { toast } from '../components/Toast';
import { clearEvents, exportEventsPretty, getEvents } from '../lib/analytics';

function fmt(ts: number) {
  const d = new Date(ts);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}

export default function DebugPage() {
  const [events, setEvents] = React.useState(() => getEvents());

  const refresh = () => setEvents(getEvents());

  const counts = React.useMemo(() => {
    const m = new Map<string, number>();
    for (const e of events) m.set(e.name, (m.get(e.name) ?? 0) + 1);
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
  }, [events]);

  const onCopy = async () => {
    const text = exportEventsPretty();
    try {
      await navigator.clipboard.writeText(text);
      toast('이벤트 JSON을 복사했습니다.', 'success');
    } catch {
      toast('복사 실패. 콘솔에서 exportEventsPretty()로 확인하세요.', 'error');
    }
  };

  const onClear = () => {
    if (!confirm('이벤트 로그를 삭제할까요?')) return;
    clearEvents();
    refresh();
  };

  return (
    <div className="page">
      <Header title="디버그: 퍼널 로그" subtitle={`events=${events.length}`} />

      <div className="card" style={{ marginBottom: 12 }}>
        <div className="row">
          <button className="btn btnPrimary" onClick={refresh}>새로고침</button>
          <button className="btn btnGhost" onClick={onCopy} style={{ marginLeft: 8 }}>JSON 복사</button>
          <button className="btn btnGhost" onClick={onClear} style={{ marginLeft: 8 }}>삭제</button>
        </div>
        <div className="small" style={{ marginTop: 10 }}>
          추천 퍼널 이벤트: page_view → loading_start → result_view → ad_show → reward_earned / invite_created → chemistry_paired
        </div>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <div className="h2">Counts</div>
        <div style={{ marginTop: 8 }}>
          {counts.map(([k, v]) => (
            <div key={k} className="row" style={{ justifyContent: 'space-between' }}>
              <div className="p">{k}</div>
              <div className="badge">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="h2">Recent</div>
        <div style={{ marginTop: 8 }}>
          {events.slice(-80).reverse().map((e, idx) => (
            <div key={`${e.ts}-${idx}`} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="small">{fmt(e.ts)} · <b>{e.name}</b></div>
              {e.props ? <div className="small" style={{ opacity: 0.85 }}>{JSON.stringify(e.props)}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
