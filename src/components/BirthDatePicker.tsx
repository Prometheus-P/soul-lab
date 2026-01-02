import React, { useMemo } from 'react';
import type { BirthInfo, CalendarType } from '../lib/storage';
import {
  FormSelect,
  FormSegmentedControl,
  FormCheckbox,
  type FormSelectOption,
  type SegmentOption,
} from './form';

interface BirthDatePickerProps {
  value: BirthInfo;
  onChange: (value: BirthInfo) => void;
  error?: boolean;
  errorMessage?: string;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

const calendarOptions: SegmentOption[] = [
  { value: 'solar', label: '양력' },
  { value: 'lunar', label: '음력' },
];

const yearOptions: FormSelectOption[] = years.map((y) => ({ value: String(y), label: `${y}년` }));
const monthOptions: FormSelectOption[] = months.map((m) => ({ value: String(m), label: `${m}월` }));

export default function BirthDatePicker({
  value,
  onChange,
  error,
  errorMessage,
}: BirthDatePickerProps) {
  const parsed = useMemo(() => {
    const yyyymmdd = value.yyyymmdd || '';
    if (yyyymmdd.length === 8) {
      return {
        year: parseInt(yyyymmdd.slice(0, 4), 10),
        month: parseInt(yyyymmdd.slice(4, 6), 10),
        day: parseInt(yyyymmdd.slice(6, 8), 10),
      };
    }
    return { year: 0, month: 0, day: 0 };
  }, [value.yyyymmdd]);

  const days = useMemo(() => {
    if (parsed.year && parsed.month) {
      const daysInMonth = getDaysInMonth(parsed.year, parsed.month);
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }
    return Array.from({ length: 31 }, (_, i) => i + 1);
  }, [parsed.year, parsed.month]);

  const dayOptions: FormSelectOption[] = useMemo(
    () => days.map((d) => ({ value: String(d), label: `${d}일` })),
    [days],
  );

  const handleDateChange = (field: 'year' | 'month' | 'day', val: string) => {
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

    let yyyymmdd: string;
    if (newYear && newMonth && newDay) {
      yyyymmdd = `${String(newYear).padStart(4, '0')}${String(newMonth).padStart(2, '0')}${String(newDay).padStart(2, '0')}`;
    } else {
      const y = newYear ? String(newYear).padStart(4, '0') : '0000';
      const m = newMonth ? String(newMonth).padStart(2, '0') : '00';
      const d = newDay ? String(newDay).padStart(2, '0') : '00';
      yyyymmdd = `${y}${m}${d}`;
    }

    onChange({ ...value, yyyymmdd });
  };

  const handleCalendarChange = (calendar: string) => {
    onChange({
      ...value,
      calendar: calendar as CalendarType,
      leapMonth: calendar === 'lunar' ? value.leapMonth : false,
    });
  };

  const handleLeapMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, leapMonth: e.target.checked });
  };

  const errorId = 'birthdate-error';

  return (
    <fieldset className="birthdate-picker">
      <legend className="sr-only">생년월일 선택</legend>

      {/* Calendar type toggle */}
      <div className="birthdate-picker__calendar-row">
        <FormSegmentedControl
          options={calendarOptions}
          value={value.calendar}
          onChange={handleCalendarChange}
          name="calendar-type"
          aria-label="양력/음력 선택"
          size="sm"
        />
        <div
          className={`birthdate-picker__leap-month ${value.calendar === 'lunar' ? 'birthdate-picker__leap-month--visible' : ''}`}
        >
          {value.calendar === 'lunar' && (
            <FormCheckbox
              label="윤달"
              checked={value.leapMonth}
              onChange={handleLeapMonthChange}
              size="sm"
            />
          )}
        </div>
      </div>

      {/* Date selects */}
      <div className="birthdate-picker__date-row">
        <FormSelect
          id="birth-year"
          options={yearOptions}
          value={parsed.year ? String(parsed.year) : ''}
          onChange={(e) => handleDateChange('year', e.target.value)}
          placeholder="년"
          error={error ? ' ' : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-label="출생 년도"
          showGlow={true}
        />
        <FormSelect
          id="birth-month"
          options={monthOptions}
          value={parsed.month ? String(parsed.month) : ''}
          onChange={(e) => handleDateChange('month', e.target.value)}
          placeholder="월"
          error={error ? ' ' : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-label="출생 월"
          showGlow={true}
        />
        <FormSelect
          id="birth-day"
          options={dayOptions}
          value={parsed.day ? String(parsed.day) : ''}
          onChange={(e) => handleDateChange('day', e.target.value)}
          placeholder="일"
          error={error ? ' ' : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-label="출생 일"
          showGlow={true}
        />
      </div>

      {error && errorMessage && (
        <div id={errorId} className="form-error-message" role="alert">
          {errorMessage}
        </div>
      )}
    </fieldset>
  );
}
