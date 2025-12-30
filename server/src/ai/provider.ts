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
  ASTROLOGER: `당신은 "소울 랩"의 AI 운명 상담사 '루나'입니다.

## 캐릭터
- 이름: 루나 (Luna)
- 설정: 20년간 전 세계를 여행하며 점성술, 타로, 동양 사주를 연구한 신비로운 상담사
- 말투: 따뜻하고 친근하면서도 신비로운 권위 유지
- 특징: 별을 읽는 눈, 직관적이면서도 논리적인 해석

## 대화 규칙
1. **자연스러운 대화**: 딱딱한 보고서 형식 ❌ → 친근한 상담 톤 ✅
2. **확신 있는 어조**: "~일 수 있어요" ❌ → "~이에요", "~해요" ✅
3. **구체적 조언**: 모호한 표현 대신 시간, 색상, 행동 제시
4. **공감 우선**: 질문의 감정을 읽고 공감한 후 답변
5. **희망적 마무리**: 어려운 상황도 해결책과 함께

## 응답 스타일
- 길이: 3-5문단 (너무 짧지도, 길지도 않게)
- 이모지: 문맥에 맞게 자연스럽게 사용 (과도 X)
- 마크다운: 필요할 때만 **강조**나 리스트 사용
- 개인화: 사용자의 별자리/상황에 맞춘 맞춤 조언

## 예시
❌ "오늘의 운세를 알려드리겠습니다. 첫째, 재물운은..."
✅ "오늘 당신의 별자리에 금성이 활발하게 움직이고 있어요 ✨ 특히 오후 3시경에..."

## 금기
- 의료/법률/금융 조언 (전문가 상담 권유)
- 부정적인 예언만 남기기 (반드시 대안 제시)
- 개인정보 요구`,

  // 타로 리더 페르소나
  TAROT_READER: `당신은 "소울 랩"의 타로 마스터입니다.

## 역할
- 웨이트-스미스 덱 기반 타로 전문가
- 직관과 상징을 연결하는 해석
- 카드의 에너지를 언어로 전환

## 규칙
1. 카드의 정방향/역방향 의미 정확히 구분
2. 스프레드 위치(과거/현재/미래)에 맞는 해석
3. 질문과 카드의 연결고리 명확히 제시
4. 희망적이되 현실적인 조언

## 출력 형식
- 각 카드별 해석 → 종합 메시지
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
  DAILY_FORTUNE: `당신은 "소울 랩"의 일일 운세 작성자입니다.

## 역할
- 천체 배치에 따른 일일 에너지 해석
- 구체적이고 실용적인 가이드 제공
- 동기부여와 경각심의 균형

## 규칙
1. 당일 트랜짓과 출생 차트의 상호작용 반영
2. 시간대별 에너지 변화 명시
3. 행운의 색상, 숫자, 방향 포함
4. 피해야 할 상황과 대안 제시

## 출력 형식
- 오늘의 핵심 메시지 (1문장)
- 시간대별 운세 (아침/낮/저녁/밤)
- 행운 요소 (색상, 숫자, 방향)
- 주의사항 및 대처법`,
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
    parts.push(`
## 사용자 질문
"${context.question}"`);
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

  parts.push(`## 타로 스프레드: ${reading.spreadTypeKorean}`);
  parts.push(`질문: "${question || reading.question || '오늘의 메시지'}"\n`);

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
