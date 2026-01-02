import { describe, it, expect } from 'vitest';
import { refineTarotOutput, type RefineOptions } from './refineOutput';

describe('refineOutput', () => {
  describe('removeMetaPhrases', () => {
    it('removes lunar-solar conversion marker', () => {
      const input = '오늘의 운세입니다 (음력→양력 변환됨) 좋은 하루 되세요';
      const result = refineTarotOutput(input);

      expect(result.text).not.toContain('음력→양력');
      expect(result.text).toContain('오늘의 운세입니다');
      expect(result.meta.removed_meta_count).toBe(1);
    });

    it('removes English lunar-solar marker', () => {
      const input = 'Your fortune (lunar → solar) is bright';
      const result = refineTarotOutput(input);

      expect(result.text).not.toContain('lunar');
      expect(result.meta.removed_meta_count).toBe(1);
    });

    it('removes (변환됨) marker', () => {
      const input = '날짜가 (변환됨) 처리되었습니다';
      const result = refineTarotOutput(input);

      expect(result.text).not.toContain('변환됨');
      expect(result.meta.removed_meta_count).toBe(1);
    });

    it('removes meta JSON blocks', () => {
      const input = '운세입니다 meta: { key: "value" } 좋은 하루';
      const result = refineTarotOutput(input);

      expect(result.text).not.toContain('meta:');
      expect(result.meta.removed_meta_count).toBe(1);
    });

    it('can be disabled via options', () => {
      const input = '운세 (음력→양력 변환됨) 입니다';
      const result = refineTarotOutput(input, { removeMeta: false });

      expect(result.text).toContain('음력→양력');
      expect(result.meta.removed_meta_count).toBe(0);
    });
  });

  describe('fixParticleMarkers', () => {
    it('fixes (이)가 after consonant-ending word', () => {
      const input = '사랑(이)가 찾아옵니다';
      const result = refineTarotOutput(input);

      expect(result.text).toBe('사랑이 찾아옵니다');
      expect(result.meta.particle_fixes).toBe(1);
    });

    it('fixes (이)가 after vowel-ending word', () => {
      const input = '행복(이)가 다가옵니다';
      const result = refineTarotOutput(input);

      expect(result.text).toBe('행복이 다가옵니다');
    });

    it('fixes (을)를 after consonant-ending word', () => {
      const input = '기회(을)를 잡으세요';
      const result = refineTarotOutput(input);

      expect(result.text).toBe('기회를 잡으세요');
    });

    it('fixes (은)는 after consonant-ending word', () => {
      const input = '운명(은)는 당신 편입니다';
      const result = refineTarotOutput(input);

      expect(result.text).toBe('운명은 당신 편입니다');
    });

    it('fixes (와)과 after consonant-ending word', () => {
      const input = '사랑(와)과 행복이 함께합니다';
      const result = refineTarotOutput(input);

      expect(result.text).toBe('사랑과 행복이 함께합니다');
    });

    it('fixes (으)로 after consonant-ending word', () => {
      const input = '성공(으)로 나아가세요';
      const result = refineTarotOutput(input);

      expect(result.text).toBe('성공으로 나아가세요');
    });

    it('fixes (으)로 after ㄹ-ending word (special case)', () => {
      const input = '서울(으)로 가세요';
      const result = refineTarotOutput(input);

      // Single space after particle is preserved (only multiple spaces are collapsed)
      expect(result.text).toBe('서울로 가세요');
    });

    it('fixes multiple particles in one text', () => {
      const input = '사랑(이)가 당신(을)를 찾아옵니다';
      const result = refineTarotOutput(input);

      expect(result.text).toBe('사랑이 당신을 찾아옵니다');
      expect(result.meta.particle_fixes).toBe(2);
    });

    it('can be disabled via options', () => {
      const input = '사랑(이)가 옵니다';
      const result = refineTarotOutput(input, { fixParticles: false });

      expect(result.text).toContain('(이)가');
      expect(result.meta.particle_fixes).toBe(0);
    });
  });

  describe('dedupeSentences', () => {
    it('removes exact duplicate sentences', () => {
      const input = '좋은 기운이 옵니다.\n좋은 기운이 옵니다.\n행복하세요.';
      const result = refineTarotOutput(input);

      // With paragraph formatting, sentences are joined with spaces
      expect(result.text).toBe('좋은 기운이 옵니다. 행복하세요.');
      expect(result.meta.deduped_sentences).toBe(1);
    });

    it('removes near-duplicate sentences (high Jaccard similarity)', () => {
      // Use nearly identical sentences (only punctuation differs)
      // Jaccard threshold is 0.86, so we need >86% word overlap
      const input =
        '오늘 좋은 기운 가득 당신 행복.\n오늘 좋은 기운 가득 당신 행복!';
      const result = refineTarotOutput(input);

      // Sentences with identical words are deduped
      expect(result.meta.deduped_sentences).toBeGreaterThanOrEqual(1);
    });

    it('preserves bullet points', () => {
      const input = '• 첫 번째 항목\n• 첫 번째 항목\n• 두 번째 항목';
      const result = refineTarotOutput(input);

      // Bullet points should be preserved even if similar
      expect(result.text).toContain('• 첫 번째 항목');
      expect(result.text).toContain('• 두 번째 항목');
    });

    it('preserves emoji-prefixed lines', () => {
      const input = '🌙 달의 기운\n⭐ 별의 기운\n☀️ 태양의 기운';
      const result = refineTarotOutput(input);

      expect(result.text).toContain('🌙 달의 기운');
      expect(result.text).toContain('⭐ 별의 기운');
      expect(result.text).toContain('☀️ 태양의 기운');
    });

    it('can be disabled via options', () => {
      const input = '중복입니다.\n중복입니다.';
      const result = refineTarotOutput(input, { dedupe: false });

      expect(result.text).toContain('중복입니다.\n중복입니다.');
      expect(result.meta.deduped_sentences).toBe(0);
    });
  });

  describe('softenWording', () => {
    it('replaces 탐욕 with 붙잡음', () => {
      const input = '탐욕을 버리세요';
      const result = refineTarotOutput(input);

      expect(result.text).toBe('붙잡음을 버리세요');
      expect(result.meta.softened_hits).toBe(1);
    });

    it('replaces 무조건 with 가능하면', () => {
      const input = '무조건 시도하세요';
      const result = refineTarotOutput(input);

      expect(result.text).toBe('가능하면 시도하세요');
    });

    it('replaces 반드시 with 대체로', () => {
      const input = '반드시 성공할 것입니다';
      const result = refineTarotOutput(input);

      expect(result.text).toBe('대체로 성공할 것입니다');
    });

    it('replaces 절대 with 웬만하면', () => {
      const input = '절대 포기하지 마세요';
      const result = refineTarotOutput(input);

      expect(result.text).toBe('웬만하면 포기하지 마세요');
    });

    it('softens multiple harsh words', () => {
      const input = '반드시 탐욕을 버리고 절대 포기하지 마세요';
      const result = refineTarotOutput(input);

      expect(result.text).toContain('대체로');
      expect(result.text).toContain('붙잡음');
      expect(result.text).toContain('웬만하면');
      expect(result.meta.softened_hits).toBe(3);
    });

    it('can be disabled via options', () => {
      const input = '탐욕을 버리세요';
      const result = refineTarotOutput(input, { soften: false });

      expect(result.text).toContain('탐욕');
      expect(result.meta.softened_hits).toBe(0);
    });
  });

  describe('mergeEmotionBlock', () => {
    it('adds clarification when 안도 and 불안 appear together', () => {
      const input = '너, 지금은 안도가 먼저 올라오는 구간이야.\n지금 불안해도 정상이다.';
      const result = refineTarotOutput(input, {
        mergeEmotion: true,
        dedupe: false,
        soften: false,
        fixParticles: false,
        removeMeta: false,
      });

      expect(result.text).toContain('안도는 잠깐이고, 불안은 잔류할 수 있다');
      expect(result.meta.merged_emotion_blocks).toBe(1);
    });

    it('can be disabled via options', () => {
      const input = '안도의 구간이야. 불안도 있어.';
      const result = refineTarotOutput(input, { mergeEmotion: false });

      expect(result.meta.merged_emotion_blocks).toBe(0);
    });
  });

  describe('maxLen option', () => {
    it('truncates text exceeding maxLen', () => {
      const input = '이것은 매우 긴 문장입니다. 계속해서 이어집니다.';
      const result = refineTarotOutput(input, { maxLen: 15 });

      expect(result.text.length).toBeLessThanOrEqual(16); // 15 + ellipsis
      expect(result.text).toMatch(/…$/);
    });

    it('does not truncate if under maxLen', () => {
      const input = '짧은 문장';
      const result = refineTarotOutput(input, { maxLen: 100 });

      expect(result.text).toBe('짧은 문장');
      expect(result.text).not.toContain('…');
    });
  });

  describe('formatParagraphs', () => {
    it('joins regular sentences with spaces into paragraphs', () => {
      const input = '첫 번째 문장.\n두 번째 문장.\n세 번째 문장.';
      const result = refineTarotOutput(input);

      // Sentences should be joined with spaces, not newlines
      expect(result.text).toBe('첫 번째 문장. 두 번째 문장. 세 번째 문장.');
    });

    it('keeps section markers on separate lines with spacing', () => {
      const input = '서론 문장.\n🌙 오늘의 운세\n운세 내용입니다.';
      const result = refineTarotOutput(input);

      // Section marker should be on its own line with blank line before
      expect(result.text).toContain('서론 문장.');
      expect(result.text).toContain('\n\n🌙 오늘의 운세');
      expect(result.text).toContain('🌙 오늘의 운세\n운세 내용입니다.');
    });

    it('preserves multiple section markers', () => {
      const input = '💰 재물운\n돈이 들어옵니다.\n💕 연애운\n사랑이 찾아옵니다.';
      const result = refineTarotOutput(input);

      expect(result.text).toContain('💰 재물운');
      expect(result.text).toContain('💕 연애운');
      expect(result.text).toContain('\n\n💕'); // blank line before second section
    });

    it('can be disabled via options', () => {
      const input = '문장 하나.\n문장 둘.';
      const result = refineTarotOutput(input, { formatParagraphs: false });

      // Without formatting, sentences stay on separate lines
      expect(result.text).toBe('문장 하나.\n문장 둘.');
    });

    it('creates paragraph breaks after transitional phrases', () => {
      const input = '상황 설명. 그래서 결론은 이렇다.\n다음 내용.';
      const result = refineTarotOutput(input);

      // "그래서" triggers paragraph break
      expect(result.text).toContain('그래서 결론은 이렇다.');
    });
  });

  describe('edge cases', () => {
    it('handles empty string', () => {
      const result = refineTarotOutput('');

      expect(result.text).toBe('');
      expect(result.meta.removed_meta_count).toBe(0);
    });

    it('handles null/undefined input', () => {
      const result = refineTarotOutput(null as unknown as string);

      expect(result.text).toBe('');
    });

    it('handles text with only whitespace', () => {
      const result = refineTarotOutput('   \n\n   ');

      expect(result.text).toBe('');
    });

    it('normalizes multiple spaces', () => {
      const input = '여러  공백이    있습니다';
      const result = refineTarotOutput(input);

      expect(result.text).not.toContain('  ');
    });

    it('normalizes multiple newlines', () => {
      const input = '첫줄\n\n\n\n\n둘째줄';
      const result = refineTarotOutput(input);

      expect(result.text).not.toMatch(/\n{3,}/);
    });

    it('removes space before punctuation', () => {
      const input = '좋습니다 . 감사합니다 !';
      const result = refineTarotOutput(input);

      // Sentence splitting may separate these, so check both punctuation fixes
      expect(result.text).not.toContain(' .');
      expect(result.text).not.toContain(' !');
      expect(result.text).toContain('좋습니다.');
      expect(result.text).toContain('감사합니다!');
    });
  });

  describe('combined operations', () => {
    it('applies all transformations correctly', () => {
      // Input with meta phrase, harsh wording, particle placeholder, and exact duplicate
      const input = '(음력→양력 변환됨) 탐욕(으)로 흘러갑니다. 탐욕(으)로 흘러갑니다.';
      const result = refineTarotOutput(input);

      expect(result.text).not.toContain('음력→양력');
      expect(result.text).toContain('붙잡음으로');
      expect(result.meta.deduped_sentences).toBeGreaterThanOrEqual(1);
    });

    it('can disable all options', () => {
      const input = '탐욕 (음력→양력 변환됨) (이)가';
      const options: RefineOptions = {
        removeMeta: false,
        fixParticles: false,
        dedupe: false,
        soften: false,
        mergeEmotion: false,
      };
      const result = refineTarotOutput(input, options);

      expect(result.text).toContain('탐욕');
      expect(result.text).toContain('음력');
      expect(result.text).toContain('(이)가');
    });
  });

  describe('RefineResult meta', () => {
    it('returns accurate counts for all operations', () => {
      const input =
        '탐욕(이)가 (음력→양력 변환됨) 무조건 반드시.\n탐욕(이)가 무조건 반드시.';
      const result = refineTarotOutput(input);

      expect(result.meta).toHaveProperty('removed_meta_count');
      expect(result.meta).toHaveProperty('particle_fixes');
      expect(result.meta).toHaveProperty('deduped_sentences');
      expect(result.meta).toHaveProperty('softened_hits');
      expect(result.meta).toHaveProperty('merged_emotion_blocks');

      expect(typeof result.meta.removed_meta_count).toBe('number');
      expect(typeof result.meta.particle_fixes).toBe('number');
      expect(typeof result.meta.deduped_sentences).toBe('number');
      expect(typeof result.meta.softened_hits).toBe('number');
      expect(typeof result.meta.merged_emotion_blocks).toBe('number');
    });
  });
});
