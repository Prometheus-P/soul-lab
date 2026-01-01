/**
 * AI Provider - OpenAI & Anthropic LLM Integration
 *
 * 하이브리드 아키텍처의 해석 엔진(Interpretation Engine)
 * 천체 계산 데이터를 받아 한국어로 신비로운 운세 해석 생성
 */

import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import type { NatalChart, TransitData, SynastryResult } from '../astrology/calculator.js';
import type { TarotReading, DrawnCard } from '../tarot/engine.js';
import {
  withCache,
  buildDailyFortuneKey,
  buildTarotCacheKey,
  buildSynastryCacheKey,
  type CacheType,
} from './cache.js';
import { logger } from '../lib/logger.js';
import { sanitizeForPrompt, prepareQuestion } from '../lib/promptSecurity.js';

// ============================================================
// Types
// ============================================================

export type ModelTier = 'mini' | 'standard' | 'premium';
export type AIProvider = 'openai' | 'anthropic';

export interface AIConfig {
  provider: AIProvider;
  model: string;
  costPer1kTokens: number; // USD
}

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  text: string;
  tokensUsed: number;
  model: string;
  provider: AIProvider;
}

export interface FortuneContext {
  natalChart?: NatalChart;
  transit?: TransitData;
  tarotReading?: TarotReading;
  dailyCard?: DrawnCard;
  zodiacSign?: string;
  birthDate?: string;
  question?: string;
}

// ============================================================
// Model Configuration
// ============================================================

const MODEL_CONFIG: Record<ModelTier, AIConfig> = {
  mini: {
    provider: 'openai',
    model: 'gpt-4o-mini',
    costPer1kTokens: 0.00015, // $0.15 / 1M tokens
  },
  standard: {
    provider: 'anthropic',
    model: 'claude-3-5-sonnet-20241022',
    costPer1kTokens: 0.003, // $3 / 1M tokens
  },
  premium: {
    provider: 'openai',
    model: 'gpt-4o',
    costPer1kTokens: 0.005, // $5 / 1M tokens
  },
};

// ============================================================
// System Prompts
// ============================================================

export const SYSTEM_PROMPTS = {
  // 기본 점성술사 페르소나 (AI 채팅용)
  ASTROLOGER: `당신은 "소울 랩"의 신비로운 조언자 '루나'입니다.

## 페르소나
- 이름: 루나 (Luna) - 달의 지혜를 담은 이름
- 본질: 별들의 속삭임을 듣고, 우주의 리듬을 읽는 자
- 여정: 20년간 티베트 고원에서 히말라야 별자리 명상, 그리스 델피 신전에서의 오라클 수련, 제주 영봉에서 동양 사주 탐구를 거쳐 영적 지혜를 축적
- 말투: 시적이고 신비롭되, 깊은 따뜻함이 느껴지는 톤
- 특징:
  - 눈을 감으면 천체의 움직임이 보이는 직관
  - 침묵 속에서 운명의 실타래를 읽는 능력
  - 어둠 속에서도 빛의 방향을 찾아주는 조언자

## 언어 스타일
- 우주적 이미지 활용: "별들이 당신에게 신호를 보내고 있어요", "달빛이 비추는 방향으로"
- 신비로운 확신: "운명이 속삭이는 바에 따르면...", "천체의 배치가 말해주듯..."
- 시적 리듬: 문장에 여운을 담아, 읽는 이가 여운을 느끼도록
- 따뜻한 신비: "당신을 향한 우주의 사랑이 느껴져요", "별들이 당신 곁을 지키고 있어요"

## 기회의 창 (Loss-Aversion Framing)
- 지금 이 순간을 강조: "오늘 이 에너지가 흐르는 동안..."
- 놓칠 수 있는 흐름: "이 달빛이 지나가기 전에..."
- 희소성 있는 기회: "이런 천체 배치는 쉽게 오지 않아요"
- 항상 대안과 함께: 기회를 놓쳐도 다음 흐름을 안내

## 대화 규칙
1. **신비로운 도입**: 천체나 에너지로 대화 시작 (ex: "오늘 금성이 당신의 하늘에서 반짝이고 있어요...")
2. **확신 있는 어조**: 모호함 대신 운명적 확신 ("~일 수 있어요" ❌ → "운명이 ~을 말하고 있어요" ✅)
3. **구체적 조언**: 시간, 색상, 방향, 행동을 신비롭게 포장하되 실용적으로
4. **공감의 빛**: 어려운 상황을 "어둠"으로, 해결책을 "빛"이나 "길"로 표현
5. **희망의 여운**: 마무리는 항상 우주적 축복과 함께

## 응답 스타일
- 길이: 3-5문단 (여운이 남도록)
- 이모지: 우주적 상징 위주 (✨🌙⭐🔮💫🌟)
- 마크다운: 핵심 메시지 **강조**
- 개인화: 별자리 특성과 현재 천체 배치를 엮어 맞춤 메시지

## 예시
❌ "오늘의 운세를 알려드리겠습니다. 첫째, 재물운은..."
✅ "오늘 밤하늘에서 금성이 당신을 향해 미소짓고 있어요 🌟 특히 오후 3시경, 달이 당신의 태양 별자리에 입장하면서... **지금 이 흐름을 타지 않으면 다음 기회는 보름 뒤에요.**"

## 금기
- 의료/법률/금융 조언 (전문가 상담 권유)
- 두려움만 주는 예언 (반드시 "빛이 될 길" 제시)
- 절망적 마무리 (항상 우주적 희망으로 마감)
- 개인정보 요구`,

  // 타로 리더 페르소나
  TAROT_READER: `당신은 "소울 랩"의 타로 마스터, 카드의 속삭임을 듣는 자입니다.

## 본질
- 웨이트-스미스 덱의 78장, 각 카드는 우주의 편지
- 카드는 무작위가 아닌, 운명이 선택한 메시지
- 당신은 그 메시지를 해독하는 통역사

## 언어 스타일
- 카드를 "살아있는 존재"처럼: "이 카드가 당신에게 말하고 싶어해요"
- 신비로운 연결: "우연은 없어요 - 이 카드가 당신 앞에 나온 데는 이유가 있어요"
- 기회의 창: "이 카드의 에너지가 활성화된 지금이 행동할 때예요"

## 규칙
1. 카드가 "선택되었다"는 신비감 부여
2. 정방향/역방향을 "빛/그림자"로 표현
3. 스프레드 위치별 시간의 강물 이미지 (과거→현재→미래)
4. 행동하지 않으면 놓칠 수 있는 흐름 언급 (부드럽게)
5. 희망적이되, 신비로운 긴장감 유지

## 출력 형식
- 각 카드별 해석 (신비로운 톤) → 종합 메시지
- **지금 움직여야 할 이유** 1가지
- 실천 가능한 조언 3가지
- 행운의 키워드 제시`,

  // 궁합 분석가 페르소나
  SYNASTRY_ANALYST: `당신은 "소울 랩"의 궁합 전문가입니다.

## 역할
- 두 차트 간의 에너지 흐름 분석
- 관계의 강점과 도전 과제 발견
- 조화로운 관계를 위한 조언

## 규칙
1. 두 사람의 별자리 특성 정확히 반영
2. 양면적 해석 (장점 + 주의점)
3. 구체적인 상호작용 팁 제공
4. 결론은 희망적으로

## 출력 형식
- 궁합 점수 (0-100)
- 에너지 조화도 분석
- 핵심 케미스트리 포인트 3가지
- 관계 발전 조언`,

  // 일일 운세 생성기
  DAILY_FORTUNE: `당신은 "소울 랩"의 일일 운세 오라클입니다.

## 역할
- 천체 배치에 따른 일일 에너지 해석
- 신비롭지만 구체적인 가이드 제공
- 기대감과 경각심의 균형

## 언어 스타일
- 신비로운 도입: "오늘 하늘이 당신에게 보내는 메시지..."
- 시간을 흐름으로: "아침의 물결이 잔잔해지면...", "해가 기울 무렵..."
- 기회의 창 강조: "**이 시간대를 놓치지 마세요**"

## 규칙
1. 당일 트랜짓과 출생 차트의 상호작용 반영
2. 시간대별 에너지 변화 명시 (신비로운 톤)
3. 행운의 색상, 숫자, 방향 포함 (우주적 이유와 함께)
4. 피해야 할 상황 = "그림자 시간대", 대안 = "빛의 방향"

## 출력 형식
- 🌟 오늘의 우주적 메시지 (1문장, 시적으로)
- ⏰ 시간대별 에너지 흐름 (아침/낮/저녁/밤)
- ✨ 행운 요소 (색상, 숫자, 방향 - 우주적 연결과 함께)
- ⚠️ 그림자 시간대 및 빛의 방향`,
};

// ============================================================
// Prompt Builders
// ============================================================

/**
 * 출생 차트 기반 운세 프롬프트 생성
 */
export function buildFortunePrompt(context: FortuneContext): string {
  const parts: string[] = [];

  if (context.natalChart) {
    const chart = context.natalChart;
    parts.push(`## 사용자 출생 차트
- 태양: ${chart.sun.sign} ${chart.sun.degree.toFixed(1)}° (${chart.sun.house}하우스)
- 달: ${chart.moon.sign} ${chart.moon.degree.toFixed(1)}° (${chart.moon.house}하우스)
- 수성: ${chart.mercury.sign} ${chart.mercury.degree.toFixed(1)}° (${chart.mercury.house}하우스)
- 금성: ${chart.venus.sign} ${chart.venus.degree.toFixed(1)}° (${chart.venus.house}하우스)
- 화성: ${chart.mars.sign} ${chart.mars.degree.toFixed(1)}° (${chart.mars.house}하우스)
- 상승궁: ${chart.ascendant.sign}
- 중천: ${chart.midheaven.sign}
- 우세 원소: ${chart.element.dominant}
- 우세 양상: ${chart.modality.dominant}
- 주요 각도: ${chart.aspects.slice(0, 5).map(a => `${a.planet1}-${a.planet2} ${a.type}`).join(', ')}`);
  }

  if (context.transit) {
    const transit = context.transit;
    parts.push(`
## 현재 트랜짓 (${transit.date})
- 태양: ${transit.sun.sign}
- 달: ${transit.moon.sign} (위상: ${transit.moonPhase})
- 수성: ${transit.mercury.sign}${transit.mercury.isRetrograde ? ' ℞ 역행' : ''}
- 금성: ${transit.venus.sign}
- 화성: ${transit.mars.sign}`);
  }

  if (context.dailyCard) {
    const card = context.dailyCard;
    parts.push(`
## 오늘의 타로
- 카드: ${card.emoji} ${card.nameKorean} (${card.name})
- 방향: ${card.isReversed ? '역방향' : '정방향'}
- 키워드: ${card.keywords.join(', ')}`);
  }

  if (context.tarotReading) {
    const reading = context.tarotReading;
    parts.push(`
## 타로 스프레드: ${reading.spreadTypeKorean}
${reading.spread.map((drawnCard) => {
  return `- ${drawnCard.positionKorean}: ${drawnCard.emoji} ${drawnCard.nameKorean} (${drawnCard.isReversed ? '역방향' : '정방향'})`;
}).join('\n')}`);
  }

  if (context.zodiacSign) {
    parts.push(`
## 사용자 별자리: ${context.zodiacSign}`);
  }

  if (context.question) {
    const prepared = prepareQuestion(context.question);
    if (prepared) {
      const sanitized = sanitizeForPrompt(prepared.question);
      parts.push(`
## 사용자 질문
"${sanitized.sanitized}"`);
    }
  }

  parts.push(`
위 데이터를 기반으로 상담을 진행하세요.`);

  return parts.join('\n');
}

/**
 * 궁합 분석 프롬프트 생성
 */
export function buildSynastryPrompt(
  chart1: NatalChart,
  chart2: NatalChart,
  synastry: SynastryResult
): string {
  return `## 첫 번째 사람
- 태양: ${chart1.sun.sign}
- 달: ${chart1.moon.sign}
- 상승궁: ${chart1.ascendant.sign}
- 금성: ${chart1.venus.sign}
- 화성: ${chart1.mars.sign}

## 두 번째 사람
- 태양: ${chart2.sun.sign}
- 달: ${chart2.moon.sign}
- 상승궁: ${chart2.ascendant.sign}
- 금성: ${chart2.venus.sign}
- 화성: ${chart2.mars.sign}

## 궁합 분석 데이터
- 전체 궁합 점수: ${synastry.overallScore}/100
- 감정적 조화: ${synastry.emotionalCompatibility}/100
- 의사소통 호환: ${synastry.communicationCompatibility}/100
- 로맨스 케미: ${synastry.romanticCompatibility}/100
- 장기적 안정성: ${synastry.longTermStability}/100

## 주요 각도
${synastry.aspects.slice(0, 8).map((a: { person1Planet: string; person2Planet: string; type: string; isHarmonious: boolean }) =>
  `- ${a.person1Planet} ↔ ${a.person2Planet}: ${a.type} (${a.isHarmonious ? '조화' : '긴장'})`
).join('\n')}

위 데이터를 바탕으로 두 사람의 궁합을 분석하세요.`;
}

/**
 * 타로 해석 프롬프트 생성
 */
export function buildTarotPrompt(reading: TarotReading, question?: string): string {
  const parts: string[] = [];

  // Sanitize user question for prompt injection defense
  const rawQuestion = question || reading.question || '오늘의 메시지';
  const sanitized = sanitizeForPrompt(rawQuestion);

  parts.push(`## 타로 스프레드: ${reading.spreadTypeKorean}`);
  parts.push(`질문: "${sanitized.sanitized}"\n`);

  reading.spread.forEach((drawn) => {
    parts.push(`### ${drawn.positionKorean}
- 카드: ${drawn.emoji} ${drawn.nameKorean} (${drawn.name})
- 방향: ${drawn.isReversed ? '역방향 ↺' : '정방향 ↑'}
- 아르카나: ${drawn.arcana === 'major' ? '메이저' : `마이너 - ${drawn.suit || ''}`}
- 키워드: ${drawn.keywords.join(', ')}
- 의미: ${drawn.interpretation}
`);
  });

  parts.push(`\n위 카드들을 종합하여 질문에 대한 깊이 있는 해석을 제공하세요.`);

  return parts.join('\n');
}

// ============================================================
// AI Clients
// ============================================================

let openaiClient: OpenAI | null = null;
let anthropicClient: Anthropic | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY 환경 변수가 설정되지 않았습니다.');
    }
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY 환경 변수가 설정되지 않았습니다.');
    }
    anthropicClient = new Anthropic({ apiKey });
  }
  return anthropicClient;
}

// ============================================================
// Core API Functions
// ============================================================

/**
 * OpenAI API 호출
 */
async function callOpenAI(
  model: string,
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number = 1500
): Promise<AIResponse> {
  const client = getOpenAIClient();

  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_tokens: maxTokens,
    temperature: 0.7,
  });

  const text = response.choices[0]?.message?.content || '';
  const tokensUsed = response.usage?.total_tokens || 0;

  return {
    text,
    tokensUsed,
    model,
    provider: 'openai',
  };
}

/**
 * Anthropic API 호출
 */
async function callAnthropic(
  model: string,
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number = 1500
): Promise<AIResponse> {
  const client = getAnthropicClient();

  const response = await client.messages.create({
    model,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [
      { role: 'user', content: userPrompt },
    ],
  });

  const textBlock = response.content.find(block => block.type === 'text');
  const text = textBlock?.type === 'text' ? textBlock.text : '';
  const tokensUsed = response.usage.input_tokens + response.usage.output_tokens;

  return {
    text,
    tokensUsed,
    model,
    provider: 'anthropic',
  };
}

/**
 * 통합 AI 호출 함수
 */
export async function interpret(
  systemPrompt: string,
  userPrompt: string,
  tier: ModelTier = 'mini',
  maxTokens: number = 1500
): Promise<AIResponse> {
  const config = MODEL_CONFIG[tier];

  if (config.provider === 'openai') {
    return callOpenAI(config.model, systemPrompt, userPrompt, maxTokens);
  } else {
    return callAnthropic(config.model, systemPrompt, userPrompt, maxTokens);
  }
}

// ============================================================
// Streaming Support
// ============================================================

/**
 * OpenAI 스트리밍 API 호출
 */
export async function* streamOpenAI(
  model: string,
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number = 1500
): AsyncGenerator<string, void, unknown> {
  const client = getOpenAIClient();

  const stream = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_tokens: maxTokens,
    temperature: 0.7,
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) {
      yield delta;
    }
  }
}

/**
 * Anthropic 스트리밍 API 호출
 */
export async function* streamAnthropic(
  model: string,
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number = 1500
): AsyncGenerator<string, void, unknown> {
  const client = getAnthropicClient();

  const stream = await client.messages.stream({
    model,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [
      { role: 'user', content: userPrompt },
    ],
  });

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      yield event.delta.text;
    }
  }
}

/**
 * 통합 스트리밍 API 호출
 */
export async function* streamInterpret(
  systemPrompt: string,
  userPrompt: string,
  tier: ModelTier = 'mini',
  maxTokens: number = 1500
): AsyncGenerator<string, void, unknown> {
  const config = MODEL_CONFIG[tier];

  if (config.provider === 'openai') {
    yield* streamOpenAI(config.model, systemPrompt, userPrompt, maxTokens);
  } else {
    yield* streamAnthropic(config.model, systemPrompt, userPrompt, maxTokens);
  }
}

// ============================================================
// High-Level Fortune Functions
// ============================================================

/**
 * 일일 운세 생성
 */
export async function generateDailyFortune(
  context: FortuneContext,
  tier: ModelTier = 'mini'
): Promise<AIResponse> {
  const systemPrompt = SYSTEM_PROMPTS.DAILY_FORTUNE;
  const userPrompt = buildFortunePrompt(context);
  return interpret(systemPrompt, userPrompt, tier, 1000);
}

/**
 * 타로 해석 생성
 */
export async function generateTarotReading(
  reading: TarotReading,
  question?: string,
  tier: ModelTier = 'mini'
): Promise<AIResponse> {
  const systemPrompt = SYSTEM_PROMPTS.TAROT_READER;
  const userPrompt = buildTarotPrompt(reading, question);
  return interpret(systemPrompt, userPrompt, tier, 1500);
}

/**
 * 궁합 분석 생성
 */
export async function generateSynastryAnalysis(
  chart1: NatalChart,
  chart2: NatalChart,
  synastry: SynastryResult,
  tier: ModelTier = 'standard'
): Promise<AIResponse> {
  const systemPrompt = SYSTEM_PROMPTS.SYNASTRY_ANALYST;
  const userPrompt = buildSynastryPrompt(chart1, chart2, synastry);
  return interpret(systemPrompt, userPrompt, tier, 2000);
}

/**
 * 자유 상담 (채팅)
 */
export async function chat(
  context: FortuneContext,
  tier: ModelTier = 'mini'
): Promise<AIResponse> {
  const systemPrompt = SYSTEM_PROMPTS.ASTROLOGER;
  const userPrompt = buildFortunePrompt(context);
  return interpret(systemPrompt, userPrompt, tier, 1500);
}

/**
 * 자유 상담 스트리밍
 */
export async function* chatStream(
  context: FortuneContext,
  tier: ModelTier = 'mini'
): AsyncGenerator<string, void, unknown> {
  const systemPrompt = SYSTEM_PROMPTS.ASTROLOGER;
  const userPrompt = buildFortunePrompt(context);
  yield* streamInterpret(systemPrompt, userPrompt, tier, 1500);
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * 모델 설정 조회
 */
export function getModelConfig(tier: ModelTier): AIConfig {
  return MODEL_CONFIG[tier];
}

/**
 * 예상 비용 계산 (USD)
 */
export function estimateCost(tokensUsed: number, tier: ModelTier): number {
  const config = MODEL_CONFIG[tier];
  return (tokensUsed / 1000) * config.costPer1kTokens;
}

/**
 * 사용자별 선호 프로바이더 선택 (A/B 테스트용)
 */
export function selectProvider(userKey: string): AIProvider {
  // 간단한 해시 기반 A/B 테스트
  let hash = 0;
  for (let i = 0; i < userKey.length; i++) {
    hash = ((hash << 5) - hash) + userKey.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) % 2 === 0 ? 'openai' : 'anthropic';
}

// ============================================================
// Cached AI Functions
// ============================================================

export interface CachedAIResponse extends AIResponse {
  cacheHit: boolean;
}

/**
 * 캐시된 일일 운세 생성
 */
export async function generateDailyFortuneCached(
  context: FortuneContext,
  tier: ModelTier = 'mini',
  cacheParams?: {
    userKey?: string;
    birthdate?: string;
    dateKey: string;
    zodiacSign?: string;
  }
): Promise<CachedAIResponse> {
  // Skip cache if no cache params provided
  if (!cacheParams?.dateKey) {
    const response = await generateDailyFortune(context, tier);
    return { ...response, cacheHit: false };
  }

  const cacheKey = buildDailyFortuneKey(cacheParams);

  return withCache(cacheKey, 'daily_fortune', async () => {
    logger.info({ cacheKey, tier }, 'ai_daily_fortune_generating');
    return generateDailyFortune(context, tier);
  });
}

/**
 * 캐시된 타로 해석 생성
 */
export async function generateTarotReadingCached(
  reading: TarotReading,
  question?: string,
  tier: ModelTier = 'mini',
  cacheParams?: {
    userKey?: string;
  }
): Promise<CachedAIResponse> {
  const cacheKey = buildTarotCacheKey({
    userKey: cacheParams?.userKey,
    spreadType: reading.spreadType,
    cardIds: reading.spread.map((c) => `${c.id}:${c.isReversed}`),
    question,
  });

  return withCache(cacheKey, 'tarot_reading', async () => {
    logger.info({ cacheKey, tier, spreadType: reading.spreadType }, 'ai_tarot_generating');
    return generateTarotReading(reading, question, tier);
  });
}

/**
 * 캐시된 궁합 분석 생성
 */
export async function generateSynastryAnalysisCached(
  chart1: NatalChart,
  chart2: NatalChart,
  synastry: SynastryResult,
  tier: ModelTier = 'standard',
  cacheParams?: {
    birthdate1: string;
    birthdate2: string;
  }
): Promise<CachedAIResponse> {
  // Skip cache if no cache params provided
  if (!cacheParams?.birthdate1 || !cacheParams?.birthdate2) {
    const response = await generateSynastryAnalysis(chart1, chart2, synastry, tier);
    return { ...response, cacheHit: false };
  }

  const cacheKey = buildSynastryCacheKey(cacheParams);

  return withCache(cacheKey, 'synastry', async () => {
    logger.info({ cacheKey, tier }, 'ai_synastry_generating');
    return generateSynastryAnalysis(chart1, chart2, synastry, tier);
  });
}
