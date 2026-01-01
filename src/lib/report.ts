import { todayKey } from './seed';
import { pickTemplate, dailyScore, chemistryScore, hash32 } from '../utils/engine';
import { getBirthDate, getUserName } from './storage';
import { getDailyFortune, fortuneToLegacyReport, QuestionTag } from './fortune-api';
import { enhanceFortuneSummary, getValidationStatement } from './coldReading';

// Feature flag for new engine (can be disabled via env for rollback)
const USE_NEW_ENGINE = import.meta.env.VITE_USE_NEW_ENGINE !== 'false';

function rankText(score: number) {
  if (score >= 96) return '✨ 축복받은 운명 (상위 1%)';
  if (score >= 92) return '🌟 빛나는 기운 (상위 3%)';
  if (score >= 88) return '💫 강한 흐름 (상위 7%)';
  if (score >= 82) return '🌙 안정된 기운 (상위 15%)';
  return '☁️ 잠재된 기운 (상위 30%)';
}

// Legacy sync report type
export interface TodayReport {
  templateId: string;
  subtitle: string;
  score: number;
  rankText: string;
  oneLiner: string;
  luckyTime?: string;
  helper?: string;
  caution?: string;
  moneyDetail?: string;
  loveDetail?: string;
  conditionDetail?: string;
  theme?: string;
  tomorrowHint?: string;
}

export interface DetailReport {
  templateId: string;
  subtitle: string;
  summary: string;
  money?: string;
  love?: string;
  condition?: string;
}

/**
 * Sync fallback using old local engine
 * Enhanced with Cold Reading techniques for personalization
 */
export function makeTodayReportSync(userKey: string): TodayReport {
  const bd = getBirthDate() ?? '19990101';
  const dk = todayKey();
  const tpl = pickTemplate(userKey, bd, dk);
  const score = dailyScore(userKey, bd, dk);

  // Enhance summary with Cold Reading prefix
  const enhancedSummary = enhanceFortuneSummary(tpl.open.summary, userKey, bd, dk);
  const validation = getValidationStatement(userKey, dk);

  return {
    templateId: tpl.id,
    subtitle: enhancedSummary,
    score,
    rankText: rankText(score),
    oneLiner: tpl.open.oneLiner,
    luckyTime: tpl.locked.luckyTime,
    helper: tpl.locked.helper,
    caution: `${tpl.locked.caution} ${validation}`,
  };
}

/**
 * Sync fallback for detail report
 * Enhanced with Cold Reading techniques
 */
export function makeDetailReportSync(userKey: string): DetailReport {
  const bd = getBirthDate() ?? '19990101';
  const dk = todayKey();
  const tpl = pickTemplate(userKey, bd, dk);
  const score = dailyScore(userKey, bd, dk);

  // Enhance summary with Cold Reading prefix
  const enhancedSummary = enhanceFortuneSummary(tpl.open.summary, userKey, bd, dk);

  return {
    templateId: tpl.id,
    subtitle: `${tpl.open.oneLiner} (총점 ${score}점)`,
    summary: enhancedSummary,
    money: tpl.locked.moneyDetail,
    love: tpl.locked.loveDetail,
    condition: tpl.locked.conditionDetail,
  };
}

/**
 * Async report from new YAML rule engine API
 * Falls back to sync engine on error or if disabled
 */
export async function makeTodayReportAsync(
  userKey: string,
  questionTags?: QuestionTag[]
): Promise<TodayReport> {
  if (!USE_NEW_ENGINE) {
    return makeTodayReportSync(userKey);
  }

  try {
    const bd = getBirthDate() ?? '1999-01-01';
    const name = getUserName() ?? '운명의 별';
    // Convert YYYYMMDD to YYYY-MM-DD if needed
    const birthDate = bd.includes('-') ? bd : `${bd.slice(0, 4)}-${bd.slice(4, 6)}-${bd.slice(6, 8)}`;

    const fortune = await getDailyFortune(userKey, name, birthDate, questionTags);
    const legacy = fortuneToLegacyReport(fortune);

    return {
      templateId: legacy.templateId,
      subtitle: legacy.subtitle,
      score: legacy.score,
      rankText: legacy.rankText,
      oneLiner: legacy.oneLiner,
      luckyTime: legacy.luckyTime,
      helper: legacy.helper,
      caution: legacy.caution,
      moneyDetail: legacy.moneyDetail,
      loveDetail: legacy.loveDetail,
      conditionDetail: legacy.conditionDetail,
      theme: legacy.theme,
      tomorrowHint: legacy.tomorrowHint,
    };
  } catch (err) {
    console.warn('[report] API failed, falling back to sync engine:', err);
    return makeTodayReportSync(userKey);
  }
}

/**
 * Async detail report from new engine
 */
export async function makeDetailReportAsync(userKey: string): Promise<DetailReport> {
  if (!USE_NEW_ENGINE) {
    return makeDetailReportSync(userKey);
  }

  try {
    const report = await makeTodayReportAsync(userKey);
    return {
      templateId: report.templateId,
      subtitle: `${report.oneLiner} (총점 ${report.score}점)`,
      summary: report.subtitle,
      money: report.moneyDetail,
      love: report.loveDetail,
      condition: report.conditionDetail,
    };
  } catch (err) {
    console.warn('[report] Detail API failed, falling back:', err);
    return makeDetailReportSync(userKey);
  }
}

/**
 * Default exports - sync for backward compatibility
 * Components should migrate to async versions for new engine
 */
export function makeTodayReport(userKey: string): TodayReport {
  return makeTodayReportSync(userKey);
}

export function makeDetailReport(userKey: string): DetailReport {
  return makeDetailReportSync(userKey);
}

export function makeChemistryReport(aKey: string, bKey: string) {
  const dk = todayKey();
  const score = chemistryScore(aKey, bKey, dk);

  const h = hash32(`${[aKey, bKey].sort().join('|')}|${dk}|chem_text`);
  const labels = ['🔥 운명적 불꽃', '💫 강렬한 인연', '🌙 안정된 조화', '🌀 미묘한 기류', '⚡ 도전적 관계'];
  const label = labels[h % labels.length];

  const summary = score >= 85
    ? '✨ 두 영혼이 서로를 완성하는 조합입니다. 함께하면 빛이 더 강해집니다.'
    : score >= 70
      ? '💫 서로의 에너지가 부딪히며 불꽃을 만듭니다. 균형을 맞추면 시너지가 폭발합니다.'
      : '🌙 각자의 빛이 강한 두 별입니다. 거리를 두고 빛나면 서로를 비출 수 있습니다.';

  const friction = score >= 85
    ? '⚡ 흐름의 차이: 한쪽은 직감으로, 한쪽은 확인 후 움직입니다.'
    : score >= 70
      ? '🌀 우선순위의 엇갈림: 현실과 감정 사이에서 조율이 필요합니다.'
      : '💨 소통의 파장: 짧은 말이 깊은 오해가 될 수 있습니다. 마음을 먼저 전하세요.';

  const booster = score >= 85
    ? '🌟 직감을 믿되, 중요한 순간은 기록으로 남기세요. 두 에너지가 하나로 모입니다.'
    : score >= 70
      ? '💫 하루 한 번, 핵심만 나누세요. 작은 공유가 큰 이해를 만듭니다.'
      : '🌙 짧지만 자주 연결하세요. 잦은 교류가 파장을 맞춰갑니다.';

  return { score, label, summary, friction, booster };
}

/**
 * Partial chemistry report for preview before pairing
 * Shows score + label only, hiding detailed insights
 */
export interface PartialChemistryReport {
  score: number;
  label: string;
}

export function makePartialChemistryReport(aKey: string, bKey: string): PartialChemistryReport {
  const dk = todayKey();
  const score = chemistryScore(aKey, bKey, dk);

  const h = hash32(`${[aKey, bKey].sort().join('|')}|${dk}|chem_text`);
  const labels = ['🔥 운명적 불꽃', '💫 강렬한 인연', '🌙 안정된 조화', '🌀 미묘한 기류', '⚡ 도전적 관계'];
  const label = labels[h % labels.length];

  return { score, label };
}
