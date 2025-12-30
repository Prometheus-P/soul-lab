export type OgType = 'daily' | 'chemistry' | 'result' | 'tarot';

/**
 * OG 이미지 URL 생성
 * - 환경변수 VITE_OG_BASE_URL이 있으면 `{base}/{type}.png` 형식
 * - 없으면 VITE_OG_IMAGE_URL 폴백
 */
export function ogImageUrl(t: OgType) {
  const base = (import.meta.env.VITE_OG_BASE_URL as string) || '';
  const fallback = (import.meta.env.VITE_OG_IMAGE_URL as string) || '';
  if (!base.trim()) return fallback;

  const clean = base.replace(/\/$/, '');
  return `${clean}/${t}.png`;
}

/**
 * OG 메타 정보 반환
 */
export function getOgMeta(t: OgType) {
  const titles: Record<OgType, string> = {
    daily: '오늘의 운명이 도착했어요',
    chemistry: '우리의 인연을 확인해볼래?',
    result: '별들이 전하는 오늘의 메시지',
    tarot: '타로 카드가 말하는 운명',
  };

  const descriptions: Record<OgType, string> = {
    daily: '별들이 당신에게 전하는 신비로운 메시지. 오늘의 운세를 확인하세요.',
    chemistry: '둘의 기운이 만나면 운명이 드러납니다. 인연의 궁합을 확인하세요.',
    result: '오늘 나에게 전해진 운명의 메시지. 당신도 확인해보세요.',
    tarot: '78장의 타로 카드가 전하는 신비로운 메시지.',
  };

  return {
    title: titles[t],
    description: descriptions[t],
    image: ogImageUrl(t),
  };
}
