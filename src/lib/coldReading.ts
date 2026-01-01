/**
 * Cold Reading Enhancement Module
 *
 * Classic Cold Reading techniques to make fortunes feel personalized:
 * 1. Rainbow Ruse: "You are X, but sometimes Y" - covers both bases
 * 2. Barnum Statements: Vague but specific-sounding, applies to everyone
 * 3. Hot Reading: Using known info (birthdate, zodiac)
 * 4. Shotgunning: Multiple predictions so some will hit
 */

import { hash32 } from '../utils/engine';

// Rainbow Ruse prefixes (covers both extremes)
const RAINBOW_RUSE = [
  '겉으로는 강해 보이지만, 마음 깊은 곳에는 섬세한 면이 있는 당신.',
  '평소엔 신중하지만, 때로는 과감한 결정을 내리기도 하는 성격.',
  '사람들 앞에선 밝지만, 혼자 있을 때는 깊은 생각에 빠지곤 하죠.',
  '독립적으로 보이지만, 사랑하는 사람들에게는 의지하고 싶은 마음도 있습니다.',
  '계획적인 면이 있으면서도, 즉흥적인 순간을 즐기기도 하는 당신.',
];

// Barnum statements (applies to almost everyone)
const BARNUM_STATEMENTS = [
  '당신은 아직 발휘되지 않은 잠재력을 가지고 있습니다.',
  '가끔 "이게 정말 맞는 길일까?" 하는 생각이 들 때가 있죠.',
  '당신에게 중요한 사람들이 당신의 진가를 알아보지 못할 때 답답함을 느낍니다.',
  '과거에 했던 결정 중, 다시 할 수 있다면 다르게 했을 선택이 있습니다.',
  '겉으로는 자신감 있어 보이지만, 내면에 불안이 있을 때도 있습니다.',
  '당신은 스스로에게 엄격한 편입니다. 다른 사람에게는 관대하면서요.',
  '인정받고 싶은 마음과 자신만의 길을 가고 싶은 마음이 공존합니다.',
  '최근 무언가 마음에 걸리는 일이 있었습니다. 맞죠?',
];

// Birth month insights (Korean zodiac-style)
const MONTH_INSIGHTS: Record<number, string> = {
  1: '새해의 기운을 타고난 당신, 시작의 에너지가 강합니다.',
  2: '겨울 끝자락에 태어난 당신, 인내와 희망을 함께 품고 있습니다.',
  3: '봄의 문턱에서 온 당신, 새로운 시작에 대한 감각이 뛰어납니다.',
  4: '봄꽃과 함께 태어난 당신, 아름다움을 알아보는 눈이 있습니다.',
  5: '따스한 햇살 아래 태어난 당신, 생명력이 넘칩니다.',
  6: '여름의 시작과 함께 온 당신, 열정과 활력이 있습니다.',
  7: '한여름에 태어난 당신, 뜨거운 에너지와 추진력을 가졌습니다.',
  8: '무더위 속에서 태어난 당신, 강한 의지력을 타고났습니다.',
  9: '가을의 문턱에서 온 당신, 성찰과 지혜의 기운이 있습니다.',
  10: '풍요로운 가을에 태어난 당신, 결실의 에너지를 품고 있습니다.',
  11: '가을 끝자락에서 온 당신, 깊은 통찰력을 가졌습니다.',
  12: '겨울의 시작과 함께 태어난 당신, 차분함과 끈기가 있습니다.',
};

// Day-based modifiers
const DAY_MODIFIERS: Record<number, string> = {
  0: '일요일인 오늘, 재충전의 기운이 필요합니다.',
  1: '한 주가 시작되는 월요일, 새로운 흐름이 열립니다.',
  2: '화요일의 불의 기운이 추진력을 더합니다.',
  3: '수요일, 소통의 기운이 강해지는 날입니다.',
  4: '목요일, 성장과 확장의 에너지가 흐릅니다.',
  5: '금요일의 금 기운이 재물과 인연을 끌어당깁니다.',
  6: '토요일, 쉼과 성찰의 시간이 필요합니다.',
};

/**
 * Get a personalized Cold Reading prefix based on user data.
 * Combines multiple techniques for maximum impact.
 */
export function getColdReadingPrefix(
  userKey: string,
  birthDateYYYYMMDD: string,
  targetDateYYYYMMDD: string
): string {
  const h = hash32(`${userKey}|${birthDateYYYYMMDD}|${targetDateYYYYMMDD}|cold`);

  // Extract birth month for hot reading
  const birthMonth = parseInt(birthDateYYYYMMDD.slice(4, 6));
  const monthInsight = MONTH_INSIGHTS[birthMonth] || MONTH_INSIGHTS[1];

  // Get day of week for modifier
  const year = parseInt(targetDateYYYYMMDD.slice(0, 4));
  const month = parseInt(targetDateYYYYMMDD.slice(4, 6)) - 1;
  const day = parseInt(targetDateYYYYMMDD.slice(6, 8));
  const dayOfWeek = new Date(year, month, day).getDay();
  const dayModifier = DAY_MODIFIERS[dayOfWeek];

  // Select technique based on hash
  const technique = h % 10;

  if (technique < 3) {
    // 30%: Rainbow Ruse
    const idx = h % RAINBOW_RUSE.length;
    return RAINBOW_RUSE[idx];
  } else if (technique < 6) {
    // 30%: Barnum Statement
    const idx = h % BARNUM_STATEMENTS.length;
    return BARNUM_STATEMENTS[idx];
  } else if (technique < 8) {
    // 20%: Birth month insight
    return monthInsight;
  } else {
    // 20%: Day modifier
    return dayModifier;
  }
}

/**
 * Enhance a fortune summary with Cold Reading elements.
 */
export function enhanceFortuneSummary(
  summary: string,
  userKey: string,
  birthDateYYYYMMDD: string,
  targetDateYYYYMMDD: string
): string {
  const prefix = getColdReadingPrefix(userKey, birthDateYYYYMMDD, targetDateYYYYMMDD);
  return `${prefix} ${summary}`;
}

/**
 * Get an additional "validation" statement that makes the reading feel accurate.
 * These are statements that make users feel understood.
 */
export function getValidationStatement(
  userKey: string,
  targetDateYYYYMMDD: string
): string {
  const h = hash32(`${userKey}|${targetDateYYYYMMDD}|validation`);

  const validations = [
    '이 메시지를 보는 것 자체가 우연이 아닙니다.',
    '당신이 여기까지 온 데는 이유가 있습니다.',
    '오늘 이 운세를 보게 된 것, 별의 인도입니다.',
    '지금 이 순간 마음에 떠오르는 사람이 있다면, 그것이 답입니다.',
    '오늘의 메시지가 마음에 와닿았다면, 그것은 우연이 아닙니다.',
  ];

  return validations[h % validations.length];
}
