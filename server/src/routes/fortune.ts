/**
 * Fortune API Routes
 *
 * 점성술, 타로, AI 상담 API 엔드포인트
 */

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {
  calculateNatalChart,
  calculateTransit,
  calculateSynastry,
  getZodiacSign,
  type NatalChart,
} from '../astrology/calculator.js';
import {
  drawCards,
  getDailyCard,
  getTarotDeck,
  getSpreads,
  type TarotReading,
} from '../tarot/engine.js';
import {
  interpret,
  generateDailyFortune,
  generateTarotReading,
  generateSynastryAnalysis,
  chat,
  chatStream,
  buildFortunePrompt,
  SYSTEM_PROMPTS,
  type ModelTier,
  type FortuneContext,
} from '../ai/provider.js';
import { getSystemPrompt, type ConsultationType } from '../ai/prompts.js';

// ============================================================
// Types
// ============================================================

interface NatalChartRequest {
  birthDate: string; // ISO date string
  birthTime: string; // "HH:mm"
  latitude: number;
  longitude: number;
}

interface TransitRequest {
  targetDate?: string; // ISO date string, defaults to today
}

interface SynastryRequest {
  person1: NatalChartRequest;
  person2: NatalChartRequest;
}

interface TarotDrawRequest {
  userKey: string;
  dateKey: string;
  spreadType: 'single' | 'three' | 'celtic' | 'love' | 'career';
  question?: string;
}

interface TarotInterpretRequest {
  reading: TarotReading;
  question?: string;
  tier?: ModelTier;
}

interface AIConsultRequest {
  birthDate: string;
  birthTime?: string;
  latitude?: number;
  longitude?: number;
  question: string;
  type?: ConsultationType;
  tier?: ModelTier;
  includeTarot?: boolean;
  spreadType?: 'single' | 'three' | 'celtic' | 'love' | 'career';
}

interface DailyFortuneRequest {
  userKey: string;
  birthDate: string;
  birthTime?: string;
  latitude?: number;
  longitude?: number;
  tier?: ModelTier;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIChatRequest {
  userKey: string;
  birthdate?: string;
  messages: ChatMessage[];
  tier?: ModelTier;
}

// ============================================================
// Route Registration
// ============================================================

export async function fortuneRoutes(app: FastifyInstance): Promise<void> {
  // ----------------------------------------------------------
  // Astrology Endpoints
  // ----------------------------------------------------------

  /**
   * POST /api/astrology/natal-chart
   * 출생 차트 계산
   */
  app.post('/api/astrology/natal-chart', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = req.body as NatalChartRequest;

      if (!body.birthDate || !body.birthTime) {
        return reply.code(400).send({ error: 'birthDate and birthTime required' });
      }
      if (typeof body.latitude !== 'number' || typeof body.longitude !== 'number') {
        return reply.code(400).send({ error: 'latitude and longitude required' });
      }

      const birthDate = new Date(body.birthDate);
      if (isNaN(birthDate.getTime())) {
        return reply.code(400).send({ error: 'invalid birthDate format' });
      }

      const chart = calculateNatalChart(
        birthDate,
        body.birthTime,
        body.latitude,
        body.longitude
      );

      return { success: true, chart };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return reply.code(500).send({ error: 'calculation_failed', message });
    }
  });

  /**
   * POST /api/astrology/transit
   * 현재 트랜짓 계산
   */
  app.post('/api/astrology/transit', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = req.body as TransitRequest;

      const targetDate = body.targetDate ? new Date(body.targetDate) : undefined;

      const transit = calculateTransit(targetDate);

      return { success: true, transit };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return reply.code(500).send({ error: 'calculation_failed', message });
    }
  });

  /**
   * POST /api/astrology/synastry
   * 두 차트 간 궁합 계산
   */
  app.post('/api/astrology/synastry', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = req.body as SynastryRequest;

      if (!body.person1 || !body.person2) {
        return reply.code(400).send({ error: 'person1 and person2 required' });
      }

      const chart1 = calculateNatalChart(
        new Date(body.person1.birthDate),
        body.person1.birthTime,
        body.person1.latitude,
        body.person1.longitude
      );

      const chart2 = calculateNatalChart(
        new Date(body.person2.birthDate),
        body.person2.birthTime,
        body.person2.latitude,
        body.person2.longitude
      );

      const synastry = calculateSynastry(chart1, chart2);

      return {
        success: true,
        chart1,
        chart2,
        synastry,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return reply.code(500).send({ error: 'calculation_failed', message });
    }
  });

  /**
   * GET /api/astrology/zodiac?birthDate=YYYY-MM-DD
   * 별자리 조회
   */
  app.get('/api/astrology/zodiac', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const query = req.query as { birthDate?: string };

      if (!query.birthDate) {
        return reply.code(400).send({ error: 'birthDate query param required' });
      }

      const birthDate = new Date(query.birthDate);
      if (isNaN(birthDate.getTime())) {
        return reply.code(400).send({ error: 'invalid birthDate format' });
      }

      const zodiac = getZodiacSign(birthDate);

      return { success: true, zodiac };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return reply.code(500).send({ error: 'lookup_failed', message });
    }
  });

  // ----------------------------------------------------------
  // Tarot Endpoints
  // ----------------------------------------------------------

  /**
   * POST /api/tarot/draw
   * 타로 카드 뽑기
   */
  app.post('/api/tarot/draw', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = req.body as TarotDrawRequest;

      if (!body.userKey || !body.dateKey || !body.spreadType) {
        return reply.code(400).send({ error: 'userKey, dateKey, and spreadType required' });
      }

      const reading = drawCards(
        body.userKey,
        body.dateKey,
        body.spreadType,
        body.question
      );

      return { success: true, reading };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return reply.code(500).send({ error: 'draw_failed', message });
    }
  });

  /**
   * GET /api/tarot/daily?userKey=xxx&dateKey=xxx
   * 오늘의 타로 카드
   */
  app.get('/api/tarot/daily', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const query = req.query as { userKey?: string; dateKey?: string };

      if (!query.userKey || !query.dateKey) {
        return reply.code(400).send({ error: 'userKey and dateKey query params required' });
      }

      const card = getDailyCard(query.userKey, query.dateKey);

      return { success: true, card };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return reply.code(500).send({ error: 'daily_card_failed', message });
    }
  });

  /**
   * GET /api/tarot/deck
   * 전체 타로 덱 조회
   */
  app.get('/api/tarot/deck', async () => {
    return { success: true, deck: getTarotDeck() };
  });

  /**
   * GET /api/tarot/spreads
   * 사용 가능한 스프레드 조회
   */
  app.get('/api/tarot/spreads', async () => {
    return { success: true, spreads: getSpreads() };
  });

  /**
   * POST /api/tarot/interpret
   * 타로 AI 해석
   */
  app.post('/api/tarot/interpret', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = req.body as TarotInterpretRequest;

      if (!body.reading) {
        return reply.code(400).send({ error: 'reading required' });
      }

      const tier = body.tier || 'mini';
      const response = await generateTarotReading(body.reading, body.question, tier);

      return {
        success: true,
        interpretation: response.text,
        tokensUsed: response.tokensUsed,
        model: response.model,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return reply.code(500).send({ error: 'interpret_failed', message });
    }
  });

  // ----------------------------------------------------------
  // AI Consultation Endpoints
  // ----------------------------------------------------------

  /**
   * POST /api/ai/consult
   * AI 상담 (통합 엔드포인트)
   */
  app.post('/api/ai/consult', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = req.body as AIConsultRequest;

      if (!body.birthDate || !body.question) {
        return reply.code(400).send({ error: 'birthDate and question required' });
      }

      const tier = body.tier || 'mini';
      const type = body.type || 'chat';

      // Build context
      const context: FortuneContext = {
        question: body.question,
        zodiacSign: getZodiacSign(new Date(body.birthDate)).signKorean,
        birthDate: body.birthDate,
      };

      // Add natal chart if location provided
      if (body.birthTime && body.latitude !== undefined && body.longitude !== undefined) {
        context.natalChart = calculateNatalChart(
          new Date(body.birthDate),
          body.birthTime,
          body.latitude,
          body.longitude
        );
      }

      // Add transit data
      context.transit = calculateTransit();

      // Add tarot if requested
      if (body.includeTarot) {
        const dateKey = new Date().toISOString().split('T')[0];
        const userKey = body.birthDate; // Use birthDate as userKey for determinism
        const spreadType = body.spreadType || 'three';
        context.tarotReading = drawCards(userKey, dateKey, spreadType, body.question);
      }

      // Get appropriate system prompt
      const systemPrompt = type === 'chat'
        ? SYSTEM_PROMPTS.ASTROLOGER
        : getSystemPrompt(type);

      const userPrompt = buildFortunePrompt(context);

      const response = await interpret(systemPrompt, userPrompt, tier);

      return {
        success: true,
        response: response.text,
        tokensUsed: response.tokensUsed,
        model: response.model,
        provider: response.provider,
        context: {
          zodiacSign: context.zodiacSign,
          hasNatalChart: !!context.natalChart,
          hasTransit: !!context.transit,
          hasTarot: !!context.tarotReading,
        },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('AI consult error:', error);
      return reply.code(500).send({ error: 'consult_failed', message });
    }
  });

  /**
   * POST /api/ai/daily
   * 일일 운세 생성
   */
  app.post('/api/ai/daily', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = req.body as DailyFortuneRequest;

      if (!body.userKey || !body.birthDate) {
        return reply.code(400).send({ error: 'userKey and birthDate required' });
      }

      const tier = body.tier || 'mini';
      const dateKey = new Date().toISOString().split('T')[0];

      // Build context
      const context: FortuneContext = {
        zodiacSign: getZodiacSign(new Date(body.birthDate)).signKorean,
        birthDate: body.birthDate,
        dailyCard: getDailyCard(body.userKey, dateKey),
        transit: calculateTransit(),
      };

      // Add natal chart if location provided
      if (body.birthTime && body.latitude !== undefined && body.longitude !== undefined) {
        context.natalChart = calculateNatalChart(
          new Date(body.birthDate),
          body.birthTime,
          body.latitude,
          body.longitude
        );
      }

      const response = await generateDailyFortune(context, tier);

      return {
        success: true,
        fortune: response.text,
        dailyCard: context.dailyCard,
        tokensUsed: response.tokensUsed,
        model: response.model,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('Daily fortune error:', error);
      return reply.code(500).send({ error: 'daily_failed', message });
    }
  });

  /**
   * POST /api/ai/synastry
   * AI 궁합 분석
   */
  app.post('/api/ai/synastry', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = req.body as SynastryRequest & { tier?: ModelTier };

      if (!body.person1 || !body.person2) {
        return reply.code(400).send({ error: 'person1 and person2 required' });
      }

      const tier = body.tier || 'standard';

      const chart1 = calculateNatalChart(
        new Date(body.person1.birthDate),
        body.person1.birthTime,
        body.person1.latitude,
        body.person1.longitude
      );

      const chart2 = calculateNatalChart(
        new Date(body.person2.birthDate),
        body.person2.birthTime,
        body.person2.latitude,
        body.person2.longitude
      );

      const synastry = calculateSynastry(chart1, chart2);
      const response = await generateSynastryAnalysis(chart1, chart2, synastry, tier);

      return {
        success: true,
        synastry,
        analysis: response.text,
        tokensUsed: response.tokensUsed,
        model: response.model,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('Synastry analysis error:', error);
      return reply.code(500).send({ error: 'synastry_failed', message });
    }
  });

  /**
   * POST /api/ai/chat/stream
   * AI 채팅 스트리밍 (messages 배열 지원)
   */
  app.post('/api/ai/chat/stream', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = req.body as AIChatRequest;

      if (!body.messages || body.messages.length === 0) {
        return reply.code(400).send({ error: 'messages required' });
      }

      const tier = body.tier || 'mini';

      // 마지막 사용자 메시지에서 질문 추출
      const lastUserMessage = [...body.messages].reverse().find(m => m.role === 'user');
      if (!lastUserMessage) {
        return reply.code(400).send({ error: 'at least one user message required' });
      }

      // Build context
      const context: FortuneContext = {
        question: lastUserMessage.content,
      };

      // 생년월일이 있으면 별자리 추가
      if (body.birthdate) {
        // birthdate is YYYYMMDD format
        const year = body.birthdate.slice(0, 4);
        const month = body.birthdate.slice(4, 6);
        const day = body.birthdate.slice(6, 8);
        const birthDate = new Date(`${year}-${month}-${day}`);

        if (!isNaN(birthDate.getTime())) {
          context.zodiacSign = getZodiacSign(birthDate).signKorean;
          context.birthDate = birthDate.toISOString().split('T')[0];
        }
      }

      // Add transit data
      context.transit = calculateTransit();

      // 이전 대화 컨텍스트를 질문에 포함
      const previousContext = body.messages
        .slice(-6, -1) // 최근 5개 메시지만 포함
        .map(m => `${m.role === 'user' ? '사용자' : 'AI'}: ${m.content}`)
        .join('\n');

      if (previousContext) {
        context.question = `이전 대화:\n${previousContext}\n\n현재 질문: ${lastUserMessage.content}`;
      }

      // Set up SSE response
      reply.raw.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      });

      // Stream the response
      for await (const chunk of chatStream(context, tier)) {
        reply.raw.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
      }

      reply.raw.write('data: [DONE]\n\n');
      reply.raw.end();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('Chat stream error:', error);

      if (!reply.raw.headersSent) {
        return reply.code(500).send({ error: 'stream_failed', message });
      }

      reply.raw.write(`data: ${JSON.stringify({ error: message })}\n\n`);
      reply.raw.end();
    }
  });

  /**
   * POST /api/ai/chat
   * AI 채팅 (일반 요청/응답)
   */
  app.post('/api/ai/chat', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = req.body as AIChatRequest;

      if (!body.messages || body.messages.length === 0) {
        return reply.code(400).send({ error: 'messages required' });
      }

      const tier = body.tier || 'mini';

      // 마지막 사용자 메시지에서 질문 추출
      const lastUserMessage = [...body.messages].reverse().find(m => m.role === 'user');
      if (!lastUserMessage) {
        return reply.code(400).send({ error: 'at least one user message required' });
      }

      // Build context
      const context: FortuneContext = {
        question: lastUserMessage.content,
      };

      // 생년월일이 있으면 별자리 추가
      if (body.birthdate) {
        // birthdate is YYYYMMDD format
        const year = body.birthdate.slice(0, 4);
        const month = body.birthdate.slice(4, 6);
        const day = body.birthdate.slice(6, 8);
        const birthDate = new Date(`${year}-${month}-${day}`);

        if (!isNaN(birthDate.getTime())) {
          context.zodiacSign = getZodiacSign(birthDate).signKorean;
          context.birthDate = birthDate.toISOString().split('T')[0];
        }
      }

      // Add transit data
      context.transit = calculateTransit();

      // 이전 대화 컨텍스트를 질문에 포함 (간단한 방식)
      const previousContext = body.messages
        .slice(-6, -1) // 최근 5개 메시지만 포함
        .map(m => `${m.role === 'user' ? '사용자' : 'AI'}: ${m.content}`)
        .join('\n');

      if (previousContext) {
        context.question = `이전 대화:\n${previousContext}\n\n현재 질문: ${lastUserMessage.content}`;
      }

      const response = await chat(context, tier);

      return {
        success: true,
        response: response.text,
        tokensUsed: response.tokensUsed,
        model: response.model,
        provider: response.provider,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('AI chat error:', error);
      return reply.code(500).send({ error: 'chat_failed', message });
    }
  });
}
