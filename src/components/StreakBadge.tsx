import React from 'react';
import { StreakLevel } from '../lib/streakBonus';

interface StreakBadgeProps {
  streak: number;
  level: StreakLevel;
  showMilestone?: boolean;
}

export default function StreakBadge({ streak, level, showMilestone }: StreakBadgeProps) {
  const isMilestone = [7, 14, 21, 30].includes(streak);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 20,
        background: `linear-gradient(135deg, ${level.color}33, ${level.color}11)`,
        border: `1px solid ${level.color}66`,
        boxShadow: isMilestone && showMilestone ? `0 0 12px ${level.color}88` : undefined,
        animation: isMilestone && showMilestone ? 'milestone-pulse 1.5s ease-in-out infinite' : undefined,
      }}
    >
      {/* Animated flame for active streaks */}
      {streak > 1 && (
        <span
          style={{
            fontSize: 16,
            animation: 'flame-flicker 0.8s ease-in-out infinite alternate',
          }}
        >
          🔥
        </span>
      )}

      {/* Level icon */}
      <span style={{ fontSize: 14 }}>{level.icon}</span>

      {/* Streak count and level name */}
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        {streak > 1 ? (
          <>
            <span style={{ color: level.color, fontWeight: 700 }}>{streak}</span>
            <span style={{ opacity: 0.8 }}>일째</span>
          </>
        ) : (
          <span style={{ opacity: 0.8 }}>첫 만남</span>
        )}
      </span>

      {/* Level badge for higher levels */}
      {level.level > 0 && (
        <span
          style={{
            fontSize: 10,
            padding: '2px 6px',
            borderRadius: 10,
            background: level.color,
            color: '#000',
            fontWeight: 700,
          }}
        >
          Lv.{level.level}
        </span>
      )}

      <style>{`
        @keyframes flame-flicker {
          0% { transform: scale(1) rotate(-3deg); }
          100% { transform: scale(1.1) rotate(3deg); }
        }
        @keyframes milestone-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 12px ${level.color}88;
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 20px ${level.color}aa, 0 0 30px ${level.color}66;
          }
        }
      `}</style>
    </div>
  );
}

// Progress bar showing days until next level
export function StreakProgress({ streak, level }: { streak: number; level: StreakLevel }) {
  const milestones = [7, 14, 21, 30];
  const nextMilestone = milestones.find(m => m > streak) ?? 30;
  const prevMilestone = milestones.filter(m => m <= streak).pop() ?? 0;
  const progress = ((streak - prevMilestone) / (nextMilestone - prevMilestone)) * 100;
  const daysUntilNext = nextMilestone - streak;

  if (streak >= 30) {
    return (
      <div style={{ marginTop: 8 }}>
        <div
          style={{
            fontSize: 11,
            color: '#ffd700',
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          💎 최고 레벨 달성! 운명의 수호자
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 8 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 10,
          color: 'rgba(255, 255, 255, 0.6)',
          marginBottom: 4,
        }}
      >
        <span>{prevMilestone}일</span>
        <span>{daysUntilNext}일 후 다음 레벨</span>
        <span>{nextMilestone}일</span>
      </div>
      <div
        style={{
          height: 4,
          borderRadius: 2,
          background: 'rgba(147, 112, 219, 0.2)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${Math.min(progress, 100)}%`,
            height: '100%',
            borderRadius: 2,
            background: `linear-gradient(90deg, ${level.color}, #ffd700)`,
            transition: 'width 0.5s ease',
          }}
        />
      </div>
    </div>
  );
}
