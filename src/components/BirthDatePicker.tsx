import React, { useMemo } from 'react';

interface BirthDatePickerProps {
  value: string; // YYYYMMDD format
  onChange: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export default function BirthDatePicker({ value, onChange, error, errorMessage }: BirthDatePickerProps) {
  const parsed = useMemo(() => {
    if (value.length === 8) {
      return {
        year: parseInt(value.slice(0, 4), 10),
        month: parseInt(value.slice(4, 6), 10),
        day: parseInt(value.slice(6, 8), 10),
      };
    }
    return { year: 0, month: 0, day: 0 };
  }, [value]);

  const days = useMemo(() => {
    if (parsed.year && parsed.month) {
      const daysInMonth = getDaysInMonth(parsed.year, parsed.month);
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }
    return Array.from({ length: 31 }, (_, i) => i + 1);
  }, [parsed.year, parsed.month]);

  const handleChange = (field: 'year' | 'month' | 'day', val: string) => {
    const numVal = parseInt(val, 10) || 0;
    let newYear = parsed.year;
    let newMonth = parsed.month;
    let newDay = parsed.day;

    if (field === 'year') newYear = numVal;
    if (field === 'month') newMonth = numVal;
    if (field === 'day') newDay = numVal;

    // Adjust day if it exceeds the days in the new month
    if (newYear && newMonth) {
      const maxDay = getDaysInMonth(newYear, newMonth);
      if (newDay > maxDay) newDay = maxDay;
    }

    if (newYear && newMonth && newDay) {
      const formatted = `${String(newYear).padStart(4, '0')}${String(newMonth).padStart(2, '0')}${String(newDay).padStart(2, '0')}`;
      onChange(formatted);
    } else {
      // Partial value - keep updating
      const y = newYear ? String(newYear).padStart(4, '0') : '0000';
      const m = newMonth ? String(newMonth).padStart(2, '0') : '00';
      const d = newDay ? String(newDay).padStart(2, '0') : '00';
      onChange(`${y}${m}${d}`);
    }
  };

  const selectStyle: React.CSSProperties = {
    flex: 1,
    padding: '12px 8px',
    fontSize: '16px',
    background: 'rgba(26, 15, 46, 0.9)',
    border: error ? '1px solid #ff6b6b' : '1px solid rgba(147, 112, 219, 0.3)',
    borderRadius: '8px',
    color: 'rgba(255, 255, 255, 0.95)',
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
    textAlign: 'center',
  };

  const errorId = 'birthdate-error';

  return (
    <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
      <legend className="sr-only">생년월일 선택</legend>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="birth-year" className="sr-only">출생 년도</label>
          <select
            id="birth-year"
            style={selectStyle}
            value={parsed.year || ''}
            onChange={(e) => handleChange('year', e.target.value)}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? 'true' : undefined}
          >
            <option value="">년</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}년</option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label htmlFor="birth-month" className="sr-only">출생 월</label>
          <select
            id="birth-month"
            style={selectStyle}
            value={parsed.month || ''}
            onChange={(e) => handleChange('month', e.target.value)}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? 'true' : undefined}
          >
            <option value="">월</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}월</option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label htmlFor="birth-day" className="sr-only">출생 일</label>
          <select
            id="birth-day"
            style={selectStyle}
            value={parsed.day || ''}
            onChange={(e) => handleChange('day', e.target.value)}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? 'true' : undefined}
          >
            <option value="">일</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}일</option>
            ))}
          </select>
        </div>
      </div>
      {error && errorMessage && (
        <div id={errorId} role="alert" style={{ marginTop: 6, fontSize: 12, color: '#ff6b6b' }}>
          {errorMessage}
        </div>
      )}
    </fieldset>
  );
}
