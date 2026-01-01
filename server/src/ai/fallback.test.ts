/**
 * AI Fallback Tests
 *
 * Tests for AI fallback templates when API calls fail.
 * Issue #37: AI 폴백 테스트 및 모니터링
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getFallbackDailyFortune,
  getFallbackTarotInterpretation,
  getFallbackSynastryAnalysis,
  getFallbackChatResponse,
  getFallbackConsultResponse,
} from './fallback.js';
import type { TarotReading, DrawnCard } from '../tarot/engine.js';

describe('AI Fallback Templates', () => {
  describe('getFallbackDailyFortune', () => {
    it('should return default message when zodiac is undefined', () => {
      const result = getFallbackDailyFortune();
      expect(result).toBe('오늘 하늘의 별들이 당신을 응원하고 있어요. 좋은 하루 보내세요 ✨');
    });

    it('should return default message for unknown zodiac', () => {
      const result = getFallbackDailyFortune('알수없는자리');
      expect(result).toBe('오늘 하늘의 별들이 당신을 응원하고 있어요. 좋은 하루 보내세요 ✨');
    });

    it('should return zodiac-specific message for valid zodiac', () => {
      const result = getFallbackDailyFortune('양자리');
      expect(result).toContain('열정');
    });

    it('should return consistent result for same date', () => {
      // Same date should always return the same message
      const result1 = getFallbackDailyFortune('사자자리');
      const result2 = getFallbackDailyFortune('사자자리');
      expect(result1).toBe(result2);
    });

    it('should have messages for all zodiac signs', () => {
      const zodiacSigns = [
        '양자리', '황소자리', '쌍둥이자리', '게자리',
        '사자자리', '처녀자리', '천칭자리', '전갈자리',
        '사수자리', '염소자리', '물병자리', '물고기자리',
      ];

      for (const sign of zodiacSigns) {
        const result = getFallbackDailyFortune(sign);
        // Should not return default message
        expect(result).not.toBe('오늘 하늘의 별들이 당신을 응원하고 있어요. 좋은 하루 보내세요 ✨');
        expect(result.length).toBeGreaterThan(10);
      }
    });
  });

  describe('getFallbackTarotInterpretation', () => {
    const mockReading: TarotReading = {
      spreadType: 'three',
      drawnAt: Date.now(),
      spread: [
        {
          id: 0,
          emoji: '🃏',
          name: 'The Fool',
          nameKorean: '광대',
          keywords: ['새로운 시작', '모험', '자유'],
          position: 'past',
          positionKorean: '과거',
          isReversed: false,
          meaning: { upright: 'New beginnings', reversed: 'Recklessness' },
          arcana: 'major',
          element: 'air',
        } as DrawnCard,
        {
          id: 1,
          emoji: '🎭',
          name: 'The Magician',
          nameKorean: '마법사',
          keywords: ['능력', '창조', '의지'],
          position: 'present',
          positionKorean: '현재',
          isReversed: true,
          meaning: { upright: 'Willpower', reversed: 'Manipulation' },
          arcana: 'major',
          element: 'air',
        } as DrawnCard,
        {
          id: 2,
          emoji: '👸',
          name: 'The High Priestess',
          nameKorean: '여사제',
          keywords: ['직관', '신비', '지혜'],
          position: 'future',
          positionKorean: '미래',
          isReversed: false,
          meaning: { upright: 'Intuition', reversed: 'Secrets' },
          arcana: 'major',
          element: 'water',
        } as DrawnCard,
      ],
    };

    it('should generate interpretation for tarot reading', () => {
      const result = getFallbackTarotInterpretation(mockReading);

      expect(result).toContain('타로 카드');
      expect(result).toContain('과거');
      expect(result).toContain('현재');
      expect(result).toContain('미래');
    });

    it('should include card names in Korean', () => {
      const result = getFallbackTarotInterpretation(mockReading);

      expect(result).toContain('광대');
      expect(result).toContain('마법사');
      expect(result).toContain('여사제');
    });

    it('should indicate reversed cards', () => {
      const result = getFallbackTarotInterpretation(mockReading);

      expect(result).toContain('역방향');
      expect(result).toContain('정방향');
    });

    it('should include keywords', () => {
      const result = getFallbackTarotInterpretation(mockReading);

      expect(result).toContain('새로운 시작');
      expect(result).toContain('능력');
    });

    it('should include universal wisdom message', () => {
      const result = getFallbackTarotInterpretation(mockReading);

      expect(result).toContain('답은 이미 당신 안에 있습니다');
    });
  });

  describe('getFallbackSynastryAnalysis', () => {
    it('should generate analysis with high compatibility for high scores', () => {
      const result = getFallbackSynastryAnalysis('사자자리', '양자리', 85);

      expect(result).toContain('85점');
      expect(result).toContain('매우 높은 궁합');
      expect(result).toContain('사자자리');
      expect(result).toContain('양자리');
    });

    it('should classify scores correctly', () => {
      const veryHigh = getFallbackSynastryAnalysis('A', 'B', 80);
      expect(veryHigh).toContain('매우 높은 궁합');

      const good = getFallbackSynastryAnalysis('A', 'B', 60);
      expect(good).toContain('좋은 궁합');

      const average = getFallbackSynastryAnalysis('A', 'B', 40);
      expect(average).toContain('보통 궁합');

      const challenging = getFallbackSynastryAnalysis('A', 'B', 30);
      expect(challenging).toContain('도전적인 궁합');
    });

    it('should include encouraging advice', () => {
      const result = getFallbackSynastryAnalysis('게자리', '전갈자리', 75);

      expect(result).toContain('성장의 기회');
      expect(result).toContain('서로를 향한 마음');
    });
  });

  describe('getFallbackChatResponse', () => {
    it('should include the user question', () => {
      const question = '오늘 사랑운은 어떨까요?';
      const result = getFallbackChatResponse(question);

      expect(result).toContain('오늘 사랑운은 어떨까요?');
    });

    it('should truncate long questions', () => {
      const longQuestion = '이것은 매우 긴 질문입니다. '.repeat(10);
      const result = getFallbackChatResponse(longQuestion);

      expect(result).toContain('...');
      expect(result.length).toBeLessThan(longQuestion.length + 500);
    });

    it('should include zodiac when provided', () => {
      const result = getFallbackChatResponse('질문', '처녀자리');

      expect(result).toContain('처녀자리');
    });

    it('should work without zodiac', () => {
      const result = getFallbackChatResponse('질문');

      expect(result).toContain('별들이 전하는 메시지');
      expect(result).not.toContain('undefined');
    });

    it('should include universal wisdom', () => {
      const result = getFallbackChatResponse('미래가 궁금해요');

      expect(result).toContain('직관');
      expect(result).toContain('조언');
    });
  });

  describe('getFallbackConsultResponse', () => {
    it('should handle love type', () => {
      const result = getFallbackConsultResponse('love');

      expect(result).toContain('사랑');
      expect(result).toContain('마음을 열면');
    });

    it('should handle career type', () => {
      const result = getFallbackConsultResponse('career');

      expect(result).toContain('진로');
      expect(result).toContain('열정');
    });

    it('should handle money type', () => {
      const result = getFallbackConsultResponse('money');

      expect(result).toContain('재물운');
      expect(result).toContain('풍요');
    });

    it('should handle health type', () => {
      const result = getFallbackConsultResponse('health');

      expect(result).toContain('건강');
      expect(result).toContain('균형');
    });

    it('should handle unknown type with default message', () => {
      const result = getFallbackConsultResponse('unknown');

      expect(result).toContain('우주의 지혜');
    });

    it('should include zodiac when provided', () => {
      const result = getFallbackConsultResponse('love', '물병자리');

      expect(result).toContain('물병자리');
    });

    it('should include daily card when provided', () => {
      const dailyCard: DrawnCard = {
        id: 0,
        emoji: '⭐',
        name: 'The Star',
        nameKorean: '별',
        keywords: ['희망', '영감'],
        position: 'daily',
        positionKorean: '오늘',
        isReversed: false,
        meaning: { upright: 'Hope', reversed: 'Despair' },
        arcana: 'major',
        element: 'air',
      };

      const result = getFallbackConsultResponse('love', '양자리', dailyCard);

      expect(result).toContain('오늘의 타로');
      expect(result).toContain('⭐');
      expect(result).toContain('별');
    });
  });

  describe('Fallback Response Properties', () => {
    it('all fallback functions should return non-empty strings', () => {
      const mockReading: TarotReading = {
        spreadType: 'one',
        drawnAt: Date.now(),
        spread: [{
          id: 0,
          emoji: '🌟',
          name: 'The Star',
          nameKorean: '별',
          keywords: ['희망'],
          position: 'daily',
          positionKorean: '오늘',
          isReversed: false,
          meaning: { upright: 'Hope', reversed: 'Despair' },
          arcana: 'major',
          element: 'air',
        } as DrawnCard],
      };

      expect(getFallbackDailyFortune()).toBeTruthy();
      expect(getFallbackTarotInterpretation(mockReading)).toBeTruthy();
      expect(getFallbackSynastryAnalysis('A', 'B', 50)).toBeTruthy();
      expect(getFallbackChatResponse('질문')).toBeTruthy();
      expect(getFallbackConsultResponse('default')).toBeTruthy();
    });

    it('fallback responses should not contain error indicators', () => {
      const mockReading: TarotReading = {
        spreadType: 'one',
        drawnAt: Date.now(),
        spread: [{
          id: 0,
          emoji: '🌟',
          name: 'The Star',
          nameKorean: '별',
          keywords: ['희망'],
          position: 'daily',
          positionKorean: '오늘',
          isReversed: false,
          meaning: { upright: 'Hope', reversed: 'Despair' },
          arcana: 'major',
          element: 'air',
        } as DrawnCard],
      };

      const responses = [
        getFallbackDailyFortune('양자리'),
        getFallbackTarotInterpretation(mockReading),
        getFallbackSynastryAnalysis('A', 'B', 50),
        getFallbackChatResponse('질문'),
        getFallbackConsultResponse('love'),
      ];

      for (const response of responses) {
        expect(response.toLowerCase()).not.toContain('error');
        expect(response.toLowerCase()).not.toContain('failed');
        expect(response.toLowerCase()).not.toContain('fallback');
        expect(response).not.toContain('undefined');
        expect(response).not.toContain('null');
      }
    });
  });
});
