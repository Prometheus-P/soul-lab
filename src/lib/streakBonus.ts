/**
 * 스트릭 레벨 및 보상 시스템
 * - 7/14/21/30일 마일스톤
 * - 레벨별 아이콘, 색상, 이름
 */

export type StreakLevel = {
  level: number;
  name: string;
  icon: string;
  color: string;
};

/**
 * 스트릭 일수에 따른 레벨 반환
 */
export function getStreakLevel(streak: number): StreakLevel {
  if (streak >= 30)
    return { level: 4, name: '운명의 수호자', icon: '💎', color: '#e040fb' };
  if (streak >= 21)
    return { level: 3, name: '별의 인도자', icon: '🌟', color: '#ffd700' };
  if (streak >= 14)
    return { level: 2, name: '기운 수집가', icon: '✨', color: '#c0c0c0' };
  if (streak >= 7)
    return { level: 1, name: '운세 탐험가', icon: '🔮', color: '#cd7f32' };
  return { level: 0, name: '첫 발걸음', icon: '🌙', color: '#9370db' };
}

/**
 * 마일스톤 달성 시 보상 메시지
 * - 해당 일수에 정확히 도달했을 때만 반환
 */
export function getStreakReward(streak: number): string | null {
  if (streak === 7)
    return '🎁 7일 달성! 이번 주 특별 운세가 해금되었습니다';
  if (streak === 14)
    return '🎁 14일 달성! 숨겨진 귀인 정보가 공개됩니다';
  if (streak === 21)
    return '🎁 21일 달성! "별의 인도자" 칭호 획득!';
  if (streak === 30)
    return '🎁 30일 달성! 전설의 "운명의 수호자" 등극!';
  return null;
}

/**
 * 3일 연속 방문 시 무료 해제 보너스 체크
 * - 3, 6, 9, 12... 일마다 무료 해제 자격 부여
 */
export function qualifiesForFreeUnlock(streak: number): boolean {
  return streak >= 3 && streak % 3 === 0;
}

/**
 * 무료 해제 보너스 메시지
 */
export function getFreeUnlockMessage(streak: number): string | null {
  if (!qualifiesForFreeUnlock(streak)) return null;
  return `🎉 ${streak}일 연속 방문! 오늘은 무료로 깊은 운명을 볼 수 있습니다`;
}
