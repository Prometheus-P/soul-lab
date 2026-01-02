/* auto-generated empathy parts (1000) - v6 (need-tagged + keyword-density tuned) */

export type EmpathyRole = 'mirror'|'validate'|'reframe'|'action'|'boundary'|'closing';
export type EmpathyTopic = 'love'|'relationship'|'self'|'career'|'money'|'timing'|'universal';
export type EmpathyEmotion = 'anxiety'|'pressure'|'confusion'|'frustration'|'anger'|'fatigue'|'loneliness'|'longing'|'hope'|'relief';
export type EmpathyStyle = 'direct'|'soft';
export type EmpathyNeed = 'reassurance'|'clarity'|'agency'|'boundary'|'closure';

export interface EmpathyPart {
  id: string;
  role: EmpathyRole;
  topic: EmpathyTopic;
  emotion: EmpathyEmotion;
  need: EmpathyNeed;
  intensity: 1|2|3;
  style: EmpathyStyle;
  text: string;
}

export const EMPATHY_PARTS: EmpathyPart[] = [
  {
    "id": "EMP0002",
    "role": "mirror",
    "topic": "love",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0081",
    "role": "mirror",
    "topic": "love",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0175",
    "role": "mirror",
    "topic": "love",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 요즘 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0202",
    "role": "mirror",
    "topic": "love",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정렬해야 한다."
  },
  {
    "id": "EMP0004",
    "role": "mirror",
    "topic": "love",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0196",
    "role": "mirror",
    "topic": "love",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0210",
    "role": "mirror",
    "topic": "love",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0243",
    "role": "mirror",
    "topic": "love",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0017",
    "role": "mirror",
    "topic": "love",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0141",
    "role": "mirror",
    "topic": "love",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0052",
    "role": "mirror",
    "topic": "love",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0089",
    "role": "mirror",
    "topic": "love",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 현재 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0112",
    "role": "mirror",
    "topic": "love",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0021",
    "role": "mirror",
    "topic": "love",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 현재 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0044",
    "role": "mirror",
    "topic": "love",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0038",
    "role": "mirror",
    "topic": "love",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0060",
    "role": "mirror",
    "topic": "love",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0145",
    "role": "mirror",
    "topic": "love",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0180",
    "role": "mirror",
    "topic": "love",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0005",
    "role": "mirror",
    "topic": "love",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0131",
    "role": "mirror",
    "topic": "love",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0166",
    "role": "mirror",
    "topic": "love",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0078",
    "role": "mirror",
    "topic": "love",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 요즘 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0080",
    "role": "mirror",
    "topic": "love",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0015",
    "role": "mirror",
    "topic": "love",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0169",
    "role": "mirror",
    "topic": "love",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0193",
    "role": "mirror",
    "topic": "love",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0028",
    "role": "mirror",
    "topic": "love",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0161",
    "role": "mirror",
    "topic": "love",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0226",
    "role": "mirror",
    "topic": "love",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0097",
    "role": "mirror",
    "topic": "love",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0120",
    "role": "mirror",
    "topic": "love",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0057",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0107",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 현재 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0136",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0150",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0204",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정돈해야 다음 수가 보인다."
  },
  {
    "id": "EMP0240",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0053",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0207",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0214",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정돈해야 한다."
  },
  {
    "id": "EMP0222",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0241",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0134",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0237",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 맞아."
  },
  {
    "id": "EMP0125",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0242",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0105",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0111",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 보여. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0122",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0135",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 요즘 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0137",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 요즘 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0187",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0227",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0026",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0059",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정렬해야 한다."
  },
  {
    "id": "EMP0124",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0155",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0084",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0208",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0244",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 요즘 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0050",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0148",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0019",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 요즘 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0096",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0110",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 맞아."
  },
  {
    "id": "EMP0236",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0025",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0032",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 보여. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0003",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0011",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정돈해야 한다."
  },
  {
    "id": "EMP0101",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0144",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0246",
    "role": "mirror",
    "topic": "relationship",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0029",
    "role": "mirror",
    "topic": "self",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0030",
    "role": "mirror",
    "topic": "self",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0129",
    "role": "mirror",
    "topic": "self",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0143",
    "role": "mirror",
    "topic": "self",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정렬해야 한다."
  },
  {
    "id": "EMP0176",
    "role": "mirror",
    "topic": "self",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0239",
    "role": "mirror",
    "topic": "self",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 현재 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0130",
    "role": "mirror",
    "topic": "self",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0138",
    "role": "mirror",
    "topic": "self",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0217",
    "role": "mirror",
    "topic": "self",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0220",
    "role": "mirror",
    "topic": "self",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 맞다."
  },
  {
    "id": "EMP0099",
    "role": "mirror",
    "topic": "self",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0199",
    "role": "mirror",
    "topic": "self",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0163",
    "role": "mirror",
    "topic": "self",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0209",
    "role": "mirror",
    "topic": "self",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 맞아."
  },
  {
    "id": "EMP0047",
    "role": "mirror",
    "topic": "self",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0095",
    "role": "mirror",
    "topic": "self",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 맞다."
  },
  {
    "id": "EMP0133",
    "role": "mirror",
    "topic": "self",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정렬해야 한다."
  },
  {
    "id": "EMP0216",
    "role": "mirror",
    "topic": "self",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0221",
    "role": "mirror",
    "topic": "self",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0092",
    "role": "mirror",
    "topic": "self",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 요즘 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0162",
    "role": "mirror",
    "topic": "self",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0191",
    "role": "mirror",
    "topic": "self",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0245",
    "role": "mirror",
    "topic": "self",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 맞아."
  },
  {
    "id": "EMP0158",
    "role": "mirror",
    "topic": "self",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0051",
    "role": "mirror",
    "topic": "self",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0016",
    "role": "mirror",
    "topic": "self",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0020",
    "role": "mirror",
    "topic": "self",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0045",
    "role": "mirror",
    "topic": "self",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0046",
    "role": "mirror",
    "topic": "self",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0067",
    "role": "mirror",
    "topic": "self",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0178",
    "role": "mirror",
    "topic": "self",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0211",
    "role": "mirror",
    "topic": "self",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0055",
    "role": "mirror",
    "topic": "self",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0090",
    "role": "mirror",
    "topic": "self",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0156",
    "role": "mirror",
    "topic": "self",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0109",
    "role": "mirror",
    "topic": "career",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 맞아."
  },
  {
    "id": "EMP0164",
    "role": "mirror",
    "topic": "career",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0042",
    "role": "mirror",
    "topic": "career",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0058",
    "role": "mirror",
    "topic": "career",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 맞아."
  },
  {
    "id": "EMP0234",
    "role": "mirror",
    "topic": "career",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 요즘 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0151",
    "role": "mirror",
    "topic": "career",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0061",
    "role": "mirror",
    "topic": "career",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0087",
    "role": "mirror",
    "topic": "career",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 요즘 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0066",
    "role": "mirror",
    "topic": "career",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 맞아."
  },
  {
    "id": "EMP0076",
    "role": "mirror",
    "topic": "career",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0146",
    "role": "mirror",
    "topic": "career",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0154",
    "role": "mirror",
    "topic": "career",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0184",
    "role": "mirror",
    "topic": "career",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0195",
    "role": "mirror",
    "topic": "career",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 맞아."
  },
  {
    "id": "EMP0206",
    "role": "mirror",
    "topic": "career",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 요즘 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0219",
    "role": "mirror",
    "topic": "career",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0142",
    "role": "mirror",
    "topic": "career",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0250",
    "role": "mirror",
    "topic": "career",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0012",
    "role": "mirror",
    "topic": "career",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0065",
    "role": "mirror",
    "topic": "career",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0091",
    "role": "mirror",
    "topic": "career",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0031",
    "role": "mirror",
    "topic": "career",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0189",
    "role": "mirror",
    "topic": "career",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0086",
    "role": "mirror",
    "topic": "career",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 맞아."
  },
  {
    "id": "EMP0167",
    "role": "mirror",
    "topic": "career",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0188",
    "role": "mirror",
    "topic": "career",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0213",
    "role": "mirror",
    "topic": "career",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0083",
    "role": "mirror",
    "topic": "money",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0147",
    "role": "mirror",
    "topic": "money",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0160",
    "role": "mirror",
    "topic": "money",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0149",
    "role": "mirror",
    "topic": "money",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0171",
    "role": "mirror",
    "topic": "money",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0179",
    "role": "mirror",
    "topic": "money",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0007",
    "role": "mirror",
    "topic": "money",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0172",
    "role": "mirror",
    "topic": "money",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0177",
    "role": "mirror",
    "topic": "money",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0200",
    "role": "mirror",
    "topic": "money",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0232",
    "role": "mirror",
    "topic": "money",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 요즘 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 보여. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0033",
    "role": "mirror",
    "topic": "money",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 맞아."
  },
  {
    "id": "EMP0043",
    "role": "mirror",
    "topic": "money",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0094",
    "role": "mirror",
    "topic": "money",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0185",
    "role": "mirror",
    "topic": "money",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0108",
    "role": "mirror",
    "topic": "money",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0159",
    "role": "mirror",
    "topic": "money",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0182",
    "role": "mirror",
    "topic": "money",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 보여. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0014",
    "role": "mirror",
    "topic": "money",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0082",
    "role": "mirror",
    "topic": "money",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴진다. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0093",
    "role": "mirror",
    "topic": "money",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 그게 맞아."
  },
  {
    "id": "EMP0173",
    "role": "mirror",
    "topic": "money",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 보여. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0231",
    "role": "mirror",
    "topic": "money",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0064",
    "role": "mirror",
    "topic": "money",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0190",
    "role": "mirror",
    "topic": "money",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0223",
    "role": "mirror",
    "topic": "money",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0034",
    "role": "mirror",
    "topic": "money",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0079",
    "role": "mirror",
    "topic": "money",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0119",
    "role": "mirror",
    "topic": "money",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0192",
    "role": "mirror",
    "topic": "money",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0035",
    "role": "mirror",
    "topic": "money",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0132",
    "role": "mirror",
    "topic": "money",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0235",
    "role": "mirror",
    "topic": "money",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 요즘 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0085",
    "role": "mirror",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0128",
    "role": "mirror",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴진다. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0123",
    "role": "mirror",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0248",
    "role": "mirror",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 그게 맞아."
  },
  {
    "id": "EMP0008",
    "role": "mirror",
    "topic": "timing",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0068",
    "role": "mirror",
    "topic": "timing",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0102",
    "role": "mirror",
    "topic": "timing",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0201",
    "role": "mirror",
    "topic": "timing",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0233",
    "role": "mirror",
    "topic": "timing",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정렬해야 한다."
  },
  {
    "id": "EMP0006",
    "role": "mirror",
    "topic": "timing",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0001",
    "role": "mirror",
    "topic": "timing",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0098",
    "role": "mirror",
    "topic": "timing",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0225",
    "role": "mirror",
    "topic": "timing",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0018",
    "role": "mirror",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 맞아."
  },
  {
    "id": "EMP0037",
    "role": "mirror",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 현재 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0048",
    "role": "mirror",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0063",
    "role": "mirror",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 요즘 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0116",
    "role": "mirror",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정렬해야 다음 수가 보인다."
  },
  {
    "id": "EMP0121",
    "role": "mirror",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정돈해야 다음 수가 보인다."
  },
  {
    "id": "EMP0010",
    "role": "mirror",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 현재 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0056",
    "role": "mirror",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0228",
    "role": "mirror",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0103",
    "role": "mirror",
    "topic": "timing",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0115",
    "role": "mirror",
    "topic": "timing",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴진다. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0152",
    "role": "mirror",
    "topic": "timing",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0106",
    "role": "mirror",
    "topic": "timing",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0140",
    "role": "mirror",
    "topic": "timing",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "너무 버티느라 감정이 뒤늦게 밀려오는 타입이네. {zodiac}({zodiacTrait}) 쪽 기질이 딱 그래."
  },
  {
    "id": "EMP0229",
    "role": "mirror",
    "topic": "timing",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0071",
    "role": "mirror",
    "topic": "timing",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0077",
    "role": "mirror",
    "topic": "timing",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0009",
    "role": "mirror",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0013",
    "role": "mirror",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0024",
    "role": "mirror",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0036",
    "role": "mirror",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 현재 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0069",
    "role": "mirror",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0039",
    "role": "mirror",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0049",
    "role": "mirror",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0072",
    "role": "mirror",
    "topic": "universal",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0075",
    "role": "mirror",
    "topic": "universal",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0114",
    "role": "mirror",
    "topic": "universal",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 요즘 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정리해야 다음 수가 보인다."
  },
  {
    "id": "EMP0127",
    "role": "mirror",
    "topic": "universal",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0174",
    "role": "mirror",
    "topic": "universal",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0181",
    "role": "mirror",
    "topic": "universal",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 현재 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0194",
    "role": "mirror",
    "topic": "universal",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정돈해야 다음 수가 보인다."
  },
  {
    "id": "EMP0170",
    "role": "mirror",
    "topic": "universal",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0073",
    "role": "mirror",
    "topic": "universal",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0126",
    "role": "mirror",
    "topic": "universal",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 보여. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0224",
    "role": "mirror",
    "topic": "universal",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0139",
    "role": "mirror",
    "topic": "universal",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0168",
    "role": "mirror",
    "topic": "universal",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0062",
    "role": "mirror",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0104",
    "role": "mirror",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0230",
    "role": "mirror",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0022",
    "role": "mirror",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0027",
    "role": "mirror",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상태는 단순해: {emotionWord} → 판단 흐림. 먼저 감정을 정렬해야 다음 수가 보인다."
  },
  {
    "id": "EMP0070",
    "role": "mirror",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0100",
    "role": "mirror",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 현재 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0117",
    "role": "mirror",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 현재 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0023",
    "role": "mirror",
    "topic": "universal",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0041",
    "role": "mirror",
    "topic": "universal",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0218",
    "role": "mirror",
    "topic": "universal",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 지금 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0238",
    "role": "mirror",
    "topic": "universal",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0054",
    "role": "mirror",
    "topic": "universal",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 맞아."
  },
  {
    "id": "EMP0113",
    "role": "mirror",
    "topic": "universal",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0153",
    "role": "mirror",
    "topic": "universal",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 말을 아끼고 있는데도 속에서는 계속 {emotionWord}가 커지고 있지? 오늘은 그걸 무시하지 않는 게 맞아."
  },
  {
    "id": "EMP0183",
    "role": "mirror",
    "topic": "universal",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 핵심은 {emotionWord}야. 감정이 과열된 상태에서 결정을 잡으면 손해 본다."
  },
  {
    "id": "EMP0205",
    "role": "mirror",
    "topic": "universal",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0247",
    "role": "mirror",
    "topic": "universal",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 현재 {name} 마음이 {emotionWord} 쪽으로 자꾸 기우는 게 느껴져. ({card1}에서 그 흔들림이 먼저 보여.)"
  },
  {
    "id": "EMP0249",
    "role": "mirror",
    "topic": "universal",
    "emotion": "loneliness",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}는 현재 {topicNoun} 문제를 ‘정답 찾기’로 바꿔버렸어. 그래서 {emotionWord}가 커진다."
  },
  {
    "id": "EMP0165",
    "role": "mirror",
    "topic": "universal",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. 지금 상황을 한 단어로 말하면 ‘{emotionWord}’. {weather} 같은 분위기가 감정을 더 증폭시키기도 해."
  },
  {
    "id": "EMP0197",
    "role": "mirror",
    "topic": "universal",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {card1}이 말하는 건 ‘감정의 진실’. 인정 안 하면 계속 같은 패턴 반복."
  },
  {
    "id": "EMP0118",
    "role": "mirror",
    "topic": "universal",
    "emotion": "longing",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "일단, {name}가 이렇게 느끼는 건 자연스러워. {name}가 {topicNoun}에서 원하는 건 사실 ‘확신’인데, 당장은 {emotionWord}가 먼저 올라오는 느낌이야."
  },
  {
    "id": "EMP0198",
    "role": "mirror",
    "topic": "money",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0215",
    "role": "mirror",
    "topic": "money",
    "emotion": "longing",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0203",
    "role": "mirror",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "{zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0040",
    "role": "mirror",
    "topic": "timing",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0088",
    "role": "mirror",
    "topic": "timing",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "{zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0157",
    "role": "mirror",
    "topic": "timing",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "{zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0074",
    "role": "mirror",
    "topic": "timing",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0186",
    "role": "mirror",
    "topic": "timing",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0212",
    "role": "mirror",
    "topic": "timing",
    "emotion": "longing",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "{zodiac}({zodiacTrait})라면 더더욱, 감정이 아니라 구조로 정리해야 한다."
  },
  {
    "id": "EMP0266",
    "role": "validate",
    "topic": "love",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0294",
    "role": "validate",
    "topic": "love",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0375",
    "role": "validate",
    "topic": "love",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0414",
    "role": "validate",
    "topic": "love",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0437",
    "role": "validate",
    "topic": "love",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0265",
    "role": "validate",
    "topic": "love",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0280",
    "role": "validate",
    "topic": "love",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 요즘 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0359",
    "role": "validate",
    "topic": "love",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0298",
    "role": "validate",
    "topic": "love",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0338",
    "role": "validate",
    "topic": "love",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0292",
    "role": "validate",
    "topic": "love",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0296",
    "role": "validate",
    "topic": "love",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 그게 맞아."
  },
  {
    "id": "EMP0325",
    "role": "validate",
    "topic": "love",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0440",
    "role": "validate",
    "topic": "love",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0340",
    "role": "validate",
    "topic": "love",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0380",
    "role": "validate",
    "topic": "love",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금은 속도를 늦추는 게 패배가 아니야. {zodiac} 기질은 페이스 조절이 곧 실력이지."
  },
  {
    "id": "EMP0420",
    "role": "validate",
    "topic": "love",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0270",
    "role": "validate",
    "topic": "love",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "그렇게 느끼는 건 당연해. {name}가 약해서가 아니라, 상황이 계속 신호를 섞어 보내고 있거든."
  },
  {
    "id": "EMP0271",
    "role": "validate",
    "topic": "love",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0346",
    "role": "validate",
    "topic": "love",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0447",
    "role": "validate",
    "topic": "love",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0313",
    "role": "validate",
    "topic": "love",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0341",
    "role": "validate",
    "topic": "love",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "그렇게 느끼는 건 당연해. {name}가 약해서가 아니라, 상황이 계속 신호를 섞어 보내고 있거든."
  },
  {
    "id": "EMP0259",
    "role": "validate",
    "topic": "love",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0360",
    "role": "validate",
    "topic": "love",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0372",
    "role": "validate",
    "topic": "love",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0319",
    "role": "validate",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0353",
    "role": "validate",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0361",
    "role": "validate",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "그렇게 느끼는 건 당연해. {name}가 약해서가 아니라, 상황이 계속 신호를 섞어 보내고 있거든."
  },
  {
    "id": "EMP0384",
    "role": "validate",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 요즘 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0398",
    "role": "validate",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0427",
    "role": "validate",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0303",
    "role": "validate",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0364",
    "role": "validate",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0409",
    "role": "validate",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0332",
    "role": "validate",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0431",
    "role": "validate",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0284",
    "role": "validate",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0286",
    "role": "validate",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0320",
    "role": "validate",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0258",
    "role": "validate",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0304",
    "role": "validate",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0388",
    "role": "validate",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "그렇게 느끼는 건 당연해. {name}가 약해서가 아니라, 상황이 계속 신호를 섞어 보내고 있거든."
  },
  {
    "id": "EMP0366",
    "role": "validate",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0269",
    "role": "validate",
    "topic": "relationship",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0383",
    "role": "validate",
    "topic": "relationship",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0444",
    "role": "validate",
    "topic": "relationship",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "그렇게 느끼는 건 당연해. {name}가 약해서가 아니라, 상황이 계속 신호를 섞어 보내고 있거든."
  },
  {
    "id": "EMP0307",
    "role": "validate",
    "topic": "relationship",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0326",
    "role": "validate",
    "topic": "relationship",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0354",
    "role": "validate",
    "topic": "relationship",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0418",
    "role": "validate",
    "topic": "relationship",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0281",
    "role": "validate",
    "topic": "self",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0305",
    "role": "validate",
    "topic": "self",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0330",
    "role": "validate",
    "topic": "self",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금은 속도를 늦추는 게 패배가 아니야. {zodiac} 기질은 페이스 조절이 곧 실력이지."
  },
  {
    "id": "EMP0343",
    "role": "validate",
    "topic": "self",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0274",
    "role": "validate",
    "topic": "self",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0289",
    "role": "validate",
    "topic": "self",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금은 속도를 늦추는 게 패배가 아니야. {zodiac} 기질은 페이스 조절이 곧 실력이지."
  },
  {
    "id": "EMP0315",
    "role": "validate",
    "topic": "self",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0327",
    "role": "validate",
    "topic": "self",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 현재 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0285",
    "role": "validate",
    "topic": "self",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0288",
    "role": "validate",
    "topic": "self",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0316",
    "role": "validate",
    "topic": "self",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0337",
    "role": "validate",
    "topic": "self",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0350",
    "role": "validate",
    "topic": "self",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0309",
    "role": "validate",
    "topic": "self",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0322",
    "role": "validate",
    "topic": "self",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0355",
    "role": "validate",
    "topic": "self",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 요즘 불안해도 정상이다. 다만 그 불안을 근거로 결론 내리지만 마."
  },
  {
    "id": "EMP0395",
    "role": "validate",
    "topic": "self",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금은 속도를 늦추는 게 패배가 아니야. {zodiac} 기질은 페이스 조절이 곧 실력이지."
  },
  {
    "id": "EMP0251",
    "role": "validate",
    "topic": "self",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 그게 맞아."
  },
  {
    "id": "EMP0374",
    "role": "validate",
    "topic": "self",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "그렇게 느끼는 건 당연해. {name}가 약해서가 아니라, 상황이 계속 신호를 섞어 보내고 있거든."
  },
  {
    "id": "EMP0297",
    "role": "validate",
    "topic": "self",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0368",
    "role": "validate",
    "topic": "self",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0371",
    "role": "validate",
    "topic": "self",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0408",
    "role": "validate",
    "topic": "self",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0446",
    "role": "validate",
    "topic": "self",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0287",
    "role": "validate",
    "topic": "self",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0348",
    "role": "validate",
    "topic": "self",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 불안해도 정상이다. 다만 그 불안을 근거로 결론 내리지만 마."
  },
  {
    "id": "EMP0436",
    "role": "validate",
    "topic": "self",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0275",
    "role": "validate",
    "topic": "self",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "그렇게 느끼는 건 당연해. {name}가 약해서가 아니라, 상황이 계속 신호를 섞어 보내고 있거든."
  },
  {
    "id": "EMP0331",
    "role": "validate",
    "topic": "self",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0310",
    "role": "validate",
    "topic": "career",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0428",
    "role": "validate",
    "topic": "career",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0439",
    "role": "validate",
    "topic": "career",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0429",
    "role": "validate",
    "topic": "career",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0268",
    "role": "validate",
    "topic": "career",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금은 속도를 늦추는 게 패배가 아니야. {zodiac} 기질은 페이스 조절이 곧 실력이지."
  },
  {
    "id": "EMP0370",
    "role": "validate",
    "topic": "career",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0261",
    "role": "validate",
    "topic": "career",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0254",
    "role": "validate",
    "topic": "career",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0421",
    "role": "validate",
    "topic": "career",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 현재 불안해도 정상이다. 다만 그 불안을 근거로 결론 내리지만 마."
  },
  {
    "id": "EMP0252",
    "role": "validate",
    "topic": "career",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0256",
    "role": "validate",
    "topic": "career",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0277",
    "role": "validate",
    "topic": "career",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0283",
    "role": "validate",
    "topic": "career",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0392",
    "role": "validate",
    "topic": "career",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0401",
    "role": "validate",
    "topic": "career",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 불안해도 정상이다. 다만 그 불안을 근거로 결론 내리지만 마."
  },
  {
    "id": "EMP0424",
    "role": "validate",
    "topic": "career",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 현재 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0399",
    "role": "validate",
    "topic": "career",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0423",
    "role": "validate",
    "topic": "career",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 그게 맞아."
  },
  {
    "id": "EMP0405",
    "role": "validate",
    "topic": "career",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0293",
    "role": "validate",
    "topic": "career",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0385",
    "role": "validate",
    "topic": "career",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0435",
    "role": "validate",
    "topic": "career",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0445",
    "role": "validate",
    "topic": "career",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "그렇게 느끼는 건 당연해. {name}가 약해서가 아니라, 상황이 계속 신호를 섞어 보내고 있거든."
  },
  {
    "id": "EMP0263",
    "role": "validate",
    "topic": "career",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0267",
    "role": "validate",
    "topic": "money",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0352",
    "role": "validate",
    "topic": "money",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 요즘 불안해도 정상이다. 다만 그 불안을 근거로 결론 내리지만 마."
  },
  {
    "id": "EMP0382",
    "role": "validate",
    "topic": "money",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0344",
    "role": "validate",
    "topic": "money",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0410",
    "role": "validate",
    "topic": "money",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 불안해도 정상이다. 다만 그 불안을 근거로 결론 내리지만 마."
  },
  {
    "id": "EMP0342",
    "role": "validate",
    "topic": "money",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0311",
    "role": "validate",
    "topic": "money",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금은 속도를 늦추는 게 패배가 아니야. {zodiac} 기질은 페이스 조절이 곧 실력이지."
  },
  {
    "id": "EMP0335",
    "role": "validate",
    "topic": "money",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0347",
    "role": "validate",
    "topic": "money",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0358",
    "role": "validate",
    "topic": "money",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 요즘은 속도를 늦추는 게 패배가 아니야. {zodiac} 기질은 페이스 조절이 곧 실력이지."
  },
  {
    "id": "EMP0373",
    "role": "validate",
    "topic": "money",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0279",
    "role": "validate",
    "topic": "money",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0329",
    "role": "validate",
    "topic": "money",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0397",
    "role": "validate",
    "topic": "money",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금은 속도를 늦추는 게 패배가 아니야. {zodiac} 기질은 페이스 조절이 곧 실력이지."
  },
  {
    "id": "EMP0403",
    "role": "validate",
    "topic": "money",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0441",
    "role": "validate",
    "topic": "money",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0369",
    "role": "validate",
    "topic": "money",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "그렇게 느끼는 건 당연해. {name}가 약해서가 아니라, 상황이 계속 신호를 섞어 보내고 있거든."
  },
  {
    "id": "EMP0365",
    "role": "validate",
    "topic": "money",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0255",
    "role": "validate",
    "topic": "money",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "그렇게 느끼는 건 당연해. {name}가 약해서가 아니라, 상황이 계속 신호를 섞어 보내고 있거든."
  },
  {
    "id": "EMP0295",
    "role": "validate",
    "topic": "money",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 그게 맞아."
  },
  {
    "id": "EMP0391",
    "role": "validate",
    "topic": "money",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0400",
    "role": "validate",
    "topic": "money",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0430",
    "role": "validate",
    "topic": "money",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0443",
    "role": "validate",
    "topic": "money",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0306",
    "role": "validate",
    "topic": "money",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0362",
    "role": "validate",
    "topic": "money",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0425",
    "role": "validate",
    "topic": "money",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0376",
    "role": "validate",
    "topic": "money",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 현재 불안해도 정상이다. 다만 그 불안을 근거로 결론 내리지만 마."
  },
  {
    "id": "EMP0389",
    "role": "validate",
    "topic": "money",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 불안해도 정상이다. 다만 그 불안을 근거로 결론 내리지만 마."
  },
  {
    "id": "EMP0379",
    "role": "validate",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0432",
    "role": "validate",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0442",
    "role": "validate",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0415",
    "role": "validate",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0434",
    "role": "validate",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "그렇게 느끼는 건 당연해. {name}가 약해서가 아니라, 상황이 계속 신호를 섞어 보내고 있거든."
  },
  {
    "id": "EMP0299",
    "role": "validate",
    "topic": "timing",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0324",
    "role": "validate",
    "topic": "timing",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0386",
    "role": "validate",
    "topic": "timing",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0402",
    "role": "validate",
    "topic": "timing",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0417",
    "role": "validate",
    "topic": "timing",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0450",
    "role": "validate",
    "topic": "timing",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "그렇게 느끼는 건 당연해. {name}가 약해서가 아니라, 상황이 계속 신호를 섞어 보내고 있거든."
  },
  {
    "id": "EMP0328",
    "role": "validate",
    "topic": "timing",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0433",
    "role": "validate",
    "topic": "timing",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 그게 맞아."
  },
  {
    "id": "EMP0257",
    "role": "validate",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0301",
    "role": "validate",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 불안해도 정상이다. 다만 그 불안을 근거로 결론 내리지만 마."
  },
  {
    "id": "EMP0351",
    "role": "validate",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0367",
    "role": "validate",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0378",
    "role": "validate",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0387",
    "role": "validate",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞다."
  },
  {
    "id": "EMP0406",
    "role": "validate",
    "topic": "timing",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0323",
    "role": "validate",
    "topic": "timing",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "그렇게 느끼는 건 당연해. {name}가 약해서가 아니라, 상황이 계속 신호를 섞어 보내고 있거든."
  },
  {
    "id": "EMP0394",
    "role": "validate",
    "topic": "timing",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0411",
    "role": "validate",
    "topic": "timing",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0419",
    "role": "validate",
    "topic": "timing",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금은 속도를 늦추는 게 패배가 아니야. {zodiac} 기질은 페이스 조절이 곧 실력이지."
  },
  {
    "id": "EMP0438",
    "role": "validate",
    "topic": "timing",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0339",
    "role": "validate",
    "topic": "timing",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0345",
    "role": "validate",
    "topic": "timing",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금은 속도를 늦추는 게 패배가 아니야. {zodiac} 기질은 페이스 조절이 곧 실력이지."
  },
  {
    "id": "EMP0449",
    "role": "validate",
    "topic": "timing",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0356",
    "role": "validate",
    "topic": "timing",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0416",
    "role": "validate",
    "topic": "timing",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0282",
    "role": "validate",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0314",
    "role": "validate",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0336",
    "role": "validate",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0407",
    "role": "validate",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0412",
    "role": "validate",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금은 속도를 늦추는 게 패배가 아니야. {zodiac} 기질은 페이스 조절이 곧 실력이지."
  },
  {
    "id": "EMP0390",
    "role": "validate",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞다."
  },
  {
    "id": "EMP0422",
    "role": "validate",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0260",
    "role": "validate",
    "topic": "universal",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금은 속도를 늦추는 게 패배가 아니야. {zodiac} 기질은 페이스 조절이 곧 실력이지."
  },
  {
    "id": "EMP0363",
    "role": "validate",
    "topic": "universal",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0396",
    "role": "validate",
    "topic": "universal",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0334",
    "role": "validate",
    "topic": "universal",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 불안해도 정상이다. 다만 그 불안을 근거로 결론 내리지만 마."
  },
  {
    "id": "EMP0426",
    "role": "validate",
    "topic": "universal",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금은 속도를 늦추는 게 패배가 아니야. {zodiac} 기질은 페이스 조절이 곧 실력이지."
  },
  {
    "id": "EMP0273",
    "role": "validate",
    "topic": "universal",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0349",
    "role": "validate",
    "topic": "universal",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0404",
    "role": "validate",
    "topic": "universal",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0413",
    "role": "validate",
    "topic": "universal",
    "emotion": "confusion",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 문제는 감정이 아니라, 감정이 의사결정을 납치하는 순간이다."
  },
  {
    "id": "EMP0276",
    "role": "validate",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 이건 ‘자책’으로 풀릴 문제가 아니다. 전략을 바꾸면 된다."
  },
  {
    "id": "EMP0357",
    "role": "validate",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0278",
    "role": "validate",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 불안해도 정상이다. 다만 그 불안을 근거로 결론 내리지만 마."
  },
  {
    "id": "EMP0312",
    "role": "validate",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0321",
    "role": "validate",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 불안해도 정상이다. 다만 그 불안을 근거로 결론 내리지만 마."
  },
  {
    "id": "EMP0393",
    "role": "validate",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0253",
    "role": "validate",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 1,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0291",
    "role": "validate",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0317",
    "role": "validate",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 요즘 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0262",
    "role": "validate",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 네가 느끼는 압박은 현실적인 신호다. 그래서 더더욱 데이터/기준을 세워야 한다."
  },
  {
    "id": "EMP0290",
    "role": "validate",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 요즘 불안해도 정상이다. 다만 그 불안을 근거로 결론 내리지만 마."
  },
  {
    "id": "EMP0300",
    "role": "validate",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0308",
    "role": "validate",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0264",
    "role": "validate",
    "topic": "universal",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "그렇게 느끼는 건 당연해. {name}가 약해서가 아니라, 상황이 계속 신호를 섞어 보내고 있거든."
  },
  {
    "id": "EMP0302",
    "role": "validate",
    "topic": "universal",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 스스로를 몰아붙이지 마. {topicNoun}에서 흔들리는 건 정상이고, 오히려 감각이 살아있다는 뜻이야."
  },
  {
    "id": "EMP0448",
    "role": "validate",
    "topic": "universal",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 1,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금은 속도를 늦추는 게 패배가 아니야. {zodiac} 기질은 페이스 조절이 곧 실력이지."
  },
  {
    "id": "EMP0272",
    "role": "validate",
    "topic": "universal",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 {emotionWord}는 ‘문제’가 아니라 ‘정보’야. 네 마음이 뭘 지키고 싶은지 알려줘."
  },
  {
    "id": "EMP0318",
    "role": "validate",
    "topic": "universal",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 상대/환경이 애매하게 굴면 누구나 흔들린다. 네가 과민한 게 아니다."
  },
  {
    "id": "EMP0333",
    "role": "validate",
    "topic": "universal",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 2,
    "style": "direct",
    "text": "괜찮아. 그 반응, 과한 게 아니야. 지금 불안해도 정상이다. 다만 그 불안을 근거로 결론 내리지만 마."
  },
  {
    "id": "EMP0377",
    "role": "validate",
    "topic": "universal",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "이미 충분히 노력했어. 오늘은 ‘더’ 하기보다 ‘정확히’ 하기 쪽이 맞아."
  },
  {
    "id": "EMP0381",
    "role": "validate",
    "topic": "universal",
    "emotion": "relief",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "그렇게 느끼는 건 당연해. {name}가 약해서가 아니라, 상황이 계속 신호를 섞어 보내고 있거든."
  },
  {
    "id": "EMP0493",
    "role": "reframe",
    "topic": "love",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0502",
    "role": "reframe",
    "topic": "love",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0526",
    "role": "reframe",
    "topic": "love",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0529",
    "role": "reframe",
    "topic": "love",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0572",
    "role": "reframe",
    "topic": "love",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0594",
    "role": "reframe",
    "topic": "love",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 타이밍이 안 좋으면 밀고, 좋으면 당겨라. 네가 통제할 수 있는 변수를 잡아."
  },
  {
    "id": "EMP0517",
    "role": "reframe",
    "topic": "love",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0499",
    "role": "reframe",
    "topic": "love",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0508",
    "role": "reframe",
    "topic": "love",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0528",
    "role": "reframe",
    "topic": "love",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0530",
    "role": "reframe",
    "topic": "love",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0587",
    "role": "reframe",
    "topic": "love",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0636",
    "role": "reframe",
    "topic": "love",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 타이밍이 안 좋으면 밀고, 좋으면 당겨라. 네가 통제할 수 있는 변수를 잡아."
  },
  {
    "id": "EMP0535",
    "role": "reframe",
    "topic": "love",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "포인트는 하나야: 지금 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0585",
    "role": "reframe",
    "topic": "love",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0600",
    "role": "reframe",
    "topic": "love",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "포인트는 하나야: 현재 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0482",
    "role": "reframe",
    "topic": "love",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0646",
    "role": "reframe",
    "topic": "love",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "포인트는 하나야: 지금 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0456",
    "role": "reframe",
    "topic": "love",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 타이밍이 안 좋으면 밀고, 좋으면 당겨라. 네가 통제할 수 있는 변수를 잡아."
  },
  {
    "id": "EMP0490",
    "role": "reframe",
    "topic": "love",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0560",
    "role": "reframe",
    "topic": "love",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0498",
    "role": "reframe",
    "topic": "love",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0534",
    "role": "reframe",
    "topic": "love",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0580",
    "role": "reframe",
    "topic": "love",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0598",
    "role": "reframe",
    "topic": "love",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0603",
    "role": "reframe",
    "topic": "love",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0616",
    "role": "reframe",
    "topic": "love",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0504",
    "role": "reframe",
    "topic": "love",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0608",
    "role": "reframe",
    "topic": "love",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0459",
    "role": "reframe",
    "topic": "love",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0486",
    "role": "reframe",
    "topic": "love",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "포인트는 하나야: 현재 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0537",
    "role": "reframe",
    "topic": "love",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0452",
    "role": "reframe",
    "topic": "love",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0474",
    "role": "reframe",
    "topic": "love",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0484",
    "role": "reframe",
    "topic": "love",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0542",
    "role": "reframe",
    "topic": "love",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0555",
    "role": "reframe",
    "topic": "love",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 타이밍이 안 좋으면 밀고, 좋으면 당겨라. 네가 통제할 수 있는 변수를 잡아."
  },
  {
    "id": "EMP0599",
    "role": "reframe",
    "topic": "love",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0633",
    "role": "reframe",
    "topic": "love",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0639",
    "role": "reframe",
    "topic": "love",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0470",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0473",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0518",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0540",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 현재의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0588",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0643",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0635",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "포인트는 하나야: 지금 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0461",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0491",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0564",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0601",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0617",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0634",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0453",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0527",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 1,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0615",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0488",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 타이밍이 안 좋으면 밀고, 좋으면 당겨라. 네가 통제할 수 있는 변수를 잡아."
  },
  {
    "id": "EMP0573",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 지금 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0590",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0597",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 타이밍이 안 좋으면 밀고, 좋으면 당겨라. 네가 통제할 수 있는 변수를 잡아."
  },
  {
    "id": "EMP0471",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 타이밍이 안 좋으면 밀고, 좋으면 당겨라. 네가 통제할 수 있는 변수를 잡아."
  },
  {
    "id": "EMP0545",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0570",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0577",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0606",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0463",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0565",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 요즘은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0576",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0605",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0505",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "포인트는 하나야: 타이밍이 안 좋으면 밀고, 좋으면 당겨라. 네가 통제할 수 있는 변수를 잡아."
  },
  {
    "id": "EMP0514",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0516",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0497",
    "role": "reframe",
    "topic": "relationship",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0532",
    "role": "reframe",
    "topic": "self",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 타이밍이 안 좋으면 밀고, 좋으면 당겨라. 네가 통제할 수 있는 변수를 잡아."
  },
  {
    "id": "EMP0567",
    "role": "reframe",
    "topic": "self",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 지금 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0583",
    "role": "reframe",
    "topic": "self",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0596",
    "role": "reframe",
    "topic": "self",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 현재 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0623",
    "role": "reframe",
    "topic": "self",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0460",
    "role": "reframe",
    "topic": "self",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0539",
    "role": "reframe",
    "topic": "self",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0584",
    "role": "reframe",
    "topic": "self",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 요즘은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0607",
    "role": "reframe",
    "topic": "self",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0503",
    "role": "reframe",
    "topic": "self",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0506",
    "role": "reframe",
    "topic": "self",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 지금 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0554",
    "role": "reframe",
    "topic": "self",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0614",
    "role": "reframe",
    "topic": "self",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0627",
    "role": "reframe",
    "topic": "self",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0644",
    "role": "reframe",
    "topic": "self",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0524",
    "role": "reframe",
    "topic": "self",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0613",
    "role": "reframe",
    "topic": "self",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0571",
    "role": "reframe",
    "topic": "self",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 1,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0477",
    "role": "reframe",
    "topic": "self",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0513",
    "role": "reframe",
    "topic": "self",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0538",
    "role": "reframe",
    "topic": "self",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0544",
    "role": "reframe",
    "topic": "self",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 타이밍이 안 좋으면 밀고, 좋으면 당겨라. 네가 통제할 수 있는 변수를 잡아."
  },
  {
    "id": "EMP0457",
    "role": "reframe",
    "topic": "self",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0466",
    "role": "reframe",
    "topic": "self",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0525",
    "role": "reframe",
    "topic": "self",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 지금 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0533",
    "role": "reframe",
    "topic": "self",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0553",
    "role": "reframe",
    "topic": "self",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0579",
    "role": "reframe",
    "topic": "self",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 요즘은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0586",
    "role": "reframe",
    "topic": "self",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0640",
    "role": "reframe",
    "topic": "self",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0649",
    "role": "reframe",
    "topic": "self",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "포인트는 하나야: 지금 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0595",
    "role": "reframe",
    "topic": "self",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0509",
    "role": "reframe",
    "topic": "career",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0645",
    "role": "reframe",
    "topic": "career",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0492",
    "role": "reframe",
    "topic": "career",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0495",
    "role": "reframe",
    "topic": "career",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0618",
    "role": "reframe",
    "topic": "career",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 요즘은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0531",
    "role": "reframe",
    "topic": "career",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 1,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0521",
    "role": "reframe",
    "topic": "career",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 지금 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0641",
    "role": "reframe",
    "topic": "career",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0642",
    "role": "reframe",
    "topic": "career",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0468",
    "role": "reframe",
    "topic": "career",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0520",
    "role": "reframe",
    "topic": "career",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0552",
    "role": "reframe",
    "topic": "career",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0574",
    "role": "reframe",
    "topic": "career",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0511",
    "role": "reframe",
    "topic": "career",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0631",
    "role": "reframe",
    "topic": "career",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0541",
    "role": "reframe",
    "topic": "money",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0589",
    "role": "reframe",
    "topic": "money",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0620",
    "role": "reframe",
    "topic": "money",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0625",
    "role": "reframe",
    "topic": "money",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0489",
    "role": "reframe",
    "topic": "money",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0609",
    "role": "reframe",
    "topic": "money",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "포인트는 하나야: 요즘 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0458",
    "role": "reframe",
    "topic": "money",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0487",
    "role": "reframe",
    "topic": "money",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 요즘은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0494",
    "role": "reframe",
    "topic": "money",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0500",
    "role": "reframe",
    "topic": "money",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0581",
    "role": "reframe",
    "topic": "money",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0591",
    "role": "reframe",
    "topic": "money",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0546",
    "role": "reframe",
    "topic": "money",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0563",
    "role": "reframe",
    "topic": "money",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0622",
    "role": "reframe",
    "topic": "money",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0455",
    "role": "reframe",
    "topic": "money",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "포인트는 하나야: 지금 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0578",
    "role": "reframe",
    "topic": "money",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 1,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0612",
    "role": "reframe",
    "topic": "money",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0451",
    "role": "reframe",
    "topic": "money",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0547",
    "role": "reframe",
    "topic": "money",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0551",
    "role": "reframe",
    "topic": "money",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 타이밍이 안 좋으면 밀고, 좋으면 당겨라. 네가 통제할 수 있는 변수를 잡아."
  },
  {
    "id": "EMP0557",
    "role": "reframe",
    "topic": "money",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0638",
    "role": "reframe",
    "topic": "money",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0467",
    "role": "reframe",
    "topic": "money",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0475",
    "role": "reframe",
    "topic": "money",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0507",
    "role": "reframe",
    "topic": "money",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0566",
    "role": "reframe",
    "topic": "money",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0637",
    "role": "reframe",
    "topic": "money",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "포인트는 하나야: 타이밍이 안 좋으면 밀고, 좋으면 당겨라. 네가 통제할 수 있는 변수를 잡아."
  },
  {
    "id": "EMP0592",
    "role": "reframe",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 요즘은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0604",
    "role": "reframe",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0582",
    "role": "reframe",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "포인트는 하나야: 지금 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0462",
    "role": "reframe",
    "topic": "timing",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0512",
    "role": "reframe",
    "topic": "timing",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0556",
    "role": "reframe",
    "topic": "timing",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 타이밍이 안 좋으면 밀고, 좋으면 당겨라. 네가 통제할 수 있는 변수를 잡아."
  },
  {
    "id": "EMP0558",
    "role": "reframe",
    "topic": "timing",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 요즘 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0621",
    "role": "reframe",
    "topic": "timing",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0624",
    "role": "reframe",
    "topic": "timing",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0650",
    "role": "reframe",
    "topic": "timing",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0515",
    "role": "reframe",
    "topic": "timing",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0519",
    "role": "reframe",
    "topic": "timing",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0569",
    "role": "reframe",
    "topic": "timing",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "포인트는 하나야: 요즘 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0593",
    "role": "reframe",
    "topic": "timing",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0647",
    "role": "reframe",
    "topic": "timing",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0559",
    "role": "reframe",
    "topic": "timing",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 1,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0575",
    "role": "reframe",
    "topic": "timing",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0465",
    "role": "reframe",
    "topic": "timing",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0472",
    "role": "reframe",
    "topic": "timing",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0501",
    "role": "reframe",
    "topic": "timing",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0619",
    "role": "reframe",
    "topic": "timing",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 지금 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0478",
    "role": "reframe",
    "topic": "timing",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0479",
    "role": "reframe",
    "topic": "timing",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0522",
    "role": "reframe",
    "topic": "timing",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0628",
    "role": "reframe",
    "topic": "timing",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0561",
    "role": "reframe",
    "topic": "timing",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0568",
    "role": "reframe",
    "topic": "timing",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0632",
    "role": "reframe",
    "topic": "timing",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0496",
    "role": "reframe",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0549",
    "role": "reframe",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "{name}가 원하는 건 완벽한 답이 아니라, ‘덜 후회하는 선택’이잖아. 그 기준을 먼저 세워보자."
  },
  {
    "id": "EMP0562",
    "role": "reframe",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0626",
    "role": "reframe",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0485",
    "role": "reframe",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 3,
    "style": "soft",
    "text": "포인트는 하나야: 오늘은 마음을 달래면서도 현실을 놓치지 않는 균형이 가능해."
  },
  {
    "id": "EMP0454",
    "role": "reframe",
    "topic": "universal",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: {card2}가 말하는 건 ‘관점 전환’이야. 지금은 {topicNoun}을 ‘잃지 않기’보다 ‘쌓기’로 보면 답이 달라져."
  },
  {
    "id": "EMP0469",
    "role": "reframe",
    "topic": "universal",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0476",
    "role": "reframe",
    "topic": "universal",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 타이밍이 안 좋으면 밀고, 좋으면 당겨라. 네가 통제할 수 있는 변수를 잡아."
  },
  {
    "id": "EMP0481",
    "role": "reframe",
    "topic": "universal",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0523",
    "role": "reframe",
    "topic": "universal",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "포인트는 하나야: 지금 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0543",
    "role": "reframe",
    "topic": "universal",
    "emotion": "pressure",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0550",
    "role": "reframe",
    "topic": "universal",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 1,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0611",
    "role": "reframe",
    "topic": "universal",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0480",
    "role": "reframe",
    "topic": "universal",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 타이밍이 안 좋으면 밀고, 좋으면 당겨라. 네가 통제할 수 있는 변수를 잡아."
  },
  {
    "id": "EMP0602",
    "role": "reframe",
    "topic": "universal",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0630",
    "role": "reframe",
    "topic": "universal",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0464",
    "role": "reframe",
    "topic": "universal",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0510",
    "role": "reframe",
    "topic": "universal",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 2,
    "style": "soft",
    "text": "포인트는 하나야: 타이밍이 애매할수록 작은 실험이 유리해. {zodiac}답게 한 번에 끝내려 하지 말고."
  },
  {
    "id": "EMP0536",
    "role": "reframe",
    "topic": "universal",
    "emotion": "frustration",
    "need": "clarity",
    "intensity": 3,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0483",
    "role": "reframe",
    "topic": "universal",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "soft",
    "text": "포인트는 하나야: 지금의 {emotionWord}는 끝이 아니라 방향표야. {card3} 흐름이 ‘선택’으로 이어지는 이유가 있어."
  },
  {
    "id": "EMP0610",
    "role": "reframe",
    "topic": "universal",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "결론: 감정은 인정하되, 결정은 구조로 한다."
  },
  {
    "id": "EMP0648",
    "role": "reframe",
    "topic": "universal",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "포인트는 하나야: 프레임을 바꿔라: 이건 {topicNoun} ‘결말’이 아니라 ‘협상’이다."
  },
  {
    "id": "EMP0548",
    "role": "reframe",
    "topic": "universal",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "포인트는 하나야: 지금 필요한 건 해석이 아니라 선택지 재구성이다. 2개로 줄여라."
  },
  {
    "id": "EMP0629",
    "role": "reframe",
    "topic": "universal",
    "emotion": "hope",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "{card2}는 ‘기준’을 세우라고 한다. 기준 없는 친절은 결국 후회로 돌아온다."
  },
  {
    "id": "EMP0846",
    "role": "action",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0787",
    "role": "action",
    "topic": "timing",
    "emotion": "confusion",
    "need": "clarity",
    "intensity": 1,
    "style": "direct",
    "text": "상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0733",
    "role": "action",
    "topic": "timing",
    "emotion": "fatigue",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0685",
    "role": "action",
    "topic": "love",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0716",
    "role": "action",
    "topic": "love",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘의 실행: 기준 1개 세우고, 그 기준을 어기는 상황은 끊어."
  },
  {
    "id": "EMP0809",
    "role": "action",
    "topic": "love",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0702",
    "role": "action",
    "topic": "love",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0725",
    "role": "action",
    "topic": "love",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0727",
    "role": "action",
    "topic": "love",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0837",
    "role": "action",
    "topic": "love",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0744",
    "role": "action",
    "topic": "love",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 1,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0772",
    "role": "action",
    "topic": "love",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 1,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0796",
    "role": "action",
    "topic": "love",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 1,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0653",
    "role": "action",
    "topic": "love",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0660",
    "role": "action",
    "topic": "love",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0718",
    "role": "action",
    "topic": "love",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0773",
    "role": "action",
    "topic": "love",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정돈/계획 중 하나만 선택."
  },
  {
    "id": "EMP0693",
    "role": "action",
    "topic": "love",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 3,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 돈/일 관련이면 숫자로 적어. 감정으로 계산하면 깨진다."
  },
  {
    "id": "EMP0732",
    "role": "action",
    "topic": "love",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 1,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0748",
    "role": "action",
    "topic": "love",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 1,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0670",
    "role": "action",
    "topic": "love",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0813",
    "role": "action",
    "topic": "love",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0697",
    "role": "action",
    "topic": "love",
    "emotion": "hope",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0698",
    "role": "action",
    "topic": "love",
    "emotion": "hope",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0735",
    "role": "action",
    "topic": "love",
    "emotion": "hope",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0792",
    "role": "action",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0815",
    "role": "action",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0803",
    "role": "action",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0742",
    "role": "action",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘의 실행: 기준 1개 세우고, 그 기준을 어기는 상황은 끊어."
  },
  {
    "id": "EMP0830",
    "role": "action",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0838",
    "role": "action",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0847",
    "role": "action",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 좋아. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0776",
    "role": "action",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 1,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 돈/일 관련이면 숫자로 적어. 감정으로 계산하면 깨진다."
  },
  {
    "id": "EMP0690",
    "role": "action",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0823",
    "role": "action",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0812",
    "role": "action",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 3,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0674",
    "role": "action",
    "topic": "relationship",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 1,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 돈/일 관련이면 숫자로 적어. 감정으로 계산하면 깨진다."
  },
  {
    "id": "EMP0801",
    "role": "action",
    "topic": "relationship",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 1,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정돈/계획 중 하나만 선택."
  },
  {
    "id": "EMP0704",
    "role": "action",
    "topic": "relationship",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0749",
    "role": "action",
    "topic": "relationship",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0806",
    "role": "action",
    "topic": "relationship",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0827",
    "role": "action",
    "topic": "relationship",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0833",
    "role": "action",
    "topic": "relationship",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0655",
    "role": "action",
    "topic": "relationship",
    "emotion": "hope",
    "need": "agency",
    "intensity": 1,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 돈/일 관련이면 숫자로 적어. 감정으로 계산하면 깨진다."
  },
  {
    "id": "EMP0681",
    "role": "action",
    "topic": "relationship",
    "emotion": "hope",
    "need": "agency",
    "intensity": 1,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 돈/일 관련이면 숫자로 적어. 감정으로 계산하면 깨진다."
  },
  {
    "id": "EMP0780",
    "role": "action",
    "topic": "relationship",
    "emotion": "hope",
    "need": "agency",
    "intensity": 1,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0795",
    "role": "action",
    "topic": "relationship",
    "emotion": "hope",
    "need": "agency",
    "intensity": 1,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 괜찮아. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0658",
    "role": "action",
    "topic": "self",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0684",
    "role": "action",
    "topic": "self",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘의 실행: 기준 1개 세우고, 그 기준을 어기는 상황은 끊어."
  },
  {
    "id": "EMP0694",
    "role": "action",
    "topic": "self",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0736",
    "role": "action",
    "topic": "self",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 좋아. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0811",
    "role": "action",
    "topic": "self",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0699",
    "role": "action",
    "topic": "self",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0672",
    "role": "action",
    "topic": "self",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0687",
    "role": "action",
    "topic": "self",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0791",
    "role": "action",
    "topic": "self",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0816",
    "role": "action",
    "topic": "self",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0666",
    "role": "action",
    "topic": "self",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘의 실행: 기준 1개 세우고, 그 기준을 어기는 상황은 끊어."
  },
  {
    "id": "EMP0678",
    "role": "action",
    "topic": "self",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0740",
    "role": "action",
    "topic": "self",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0754",
    "role": "action",
    "topic": "self",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 괜찮아. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0759",
    "role": "action",
    "topic": "self",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0790",
    "role": "action",
    "topic": "self",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0798",
    "role": "action",
    "topic": "self",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0839",
    "role": "action",
    "topic": "self",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0668",
    "role": "action",
    "topic": "self",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 괜찮아. {topicNoun} 관련해서 10분만 정렬해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0758",
    "role": "action",
    "topic": "self",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0775",
    "role": "action",
    "topic": "self",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 돈/일 관련이면 숫자로 적어. 감정으로 계산하면 깨진다."
  },
  {
    "id": "EMP0651",
    "role": "action",
    "topic": "self",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 3,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0724",
    "role": "action",
    "topic": "self",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 1,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0779",
    "role": "action",
    "topic": "self",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 1,
    "style": "direct",
    "text": "오늘의 실행: 기준 1개 세우고, 그 기준을 어기는 상황은 끊어."
  },
  {
    "id": "EMP0696",
    "role": "action",
    "topic": "self",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0804",
    "role": "action",
    "topic": "self",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0821",
    "role": "action",
    "topic": "self",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0822",
    "role": "action",
    "topic": "self",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0676",
    "role": "action",
    "topic": "self",
    "emotion": "hope",
    "need": "agency",
    "intensity": 1,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0825",
    "role": "action",
    "topic": "self",
    "emotion": "hope",
    "need": "agency",
    "intensity": 1,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0703",
    "role": "action",
    "topic": "self",
    "emotion": "hope",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0784",
    "role": "action",
    "topic": "self",
    "emotion": "hope",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘의 실행: 기준 1개 세우고, 그 기준을 어기는 상황은 끊어."
  },
  {
    "id": "EMP0814",
    "role": "action",
    "topic": "self",
    "emotion": "hope",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0652",
    "role": "action",
    "topic": "career",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0710",
    "role": "action",
    "topic": "career",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 돈/일 관련이면 숫자로 적어. 감정으로 계산하면 깨진다."
  },
  {
    "id": "EMP0723",
    "role": "action",
    "topic": "career",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0726",
    "role": "action",
    "topic": "career",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0737",
    "role": "action",
    "topic": "career",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘의 실행: 기준 1개 세우고, 그 기준을 어기는 상황은 끊어."
  },
  {
    "id": "EMP0741",
    "role": "action",
    "topic": "career",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0767",
    "role": "action",
    "topic": "career",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0832",
    "role": "action",
    "topic": "career",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0836",
    "role": "action",
    "topic": "career",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0719",
    "role": "action",
    "topic": "career",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0669",
    "role": "action",
    "topic": "career",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0673",
    "role": "action",
    "topic": "career",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0734",
    "role": "action",
    "topic": "career",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0761",
    "role": "action",
    "topic": "career",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0691",
    "role": "action",
    "topic": "career",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 3,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 돈/일 관련이면 숫자로 적어. 감정으로 계산하면 깨진다."
  },
  {
    "id": "EMP0750",
    "role": "action",
    "topic": "career",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0760",
    "role": "action",
    "topic": "career",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 1,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0826",
    "role": "action",
    "topic": "career",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 1,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0661",
    "role": "action",
    "topic": "career",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0680",
    "role": "action",
    "topic": "career",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0756",
    "role": "action",
    "topic": "career",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정렬/계획 중 하나만 선택."
  },
  {
    "id": "EMP0768",
    "role": "action",
    "topic": "career",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0778",
    "role": "action",
    "topic": "career",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0797",
    "role": "action",
    "topic": "career",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0800",
    "role": "action",
    "topic": "career",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 좋아. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0715",
    "role": "action",
    "topic": "career",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 3,
    "style": "direct",
    "text": "오늘의 실행: 기준 1개 세우고, 그 기준을 어기는 상황은 끊어."
  },
  {
    "id": "EMP0677",
    "role": "action",
    "topic": "career",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0765",
    "role": "action",
    "topic": "career",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0783",
    "role": "action",
    "topic": "career",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0802",
    "role": "action",
    "topic": "career",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0794",
    "role": "action",
    "topic": "career",
    "emotion": "hope",
    "need": "agency",
    "intensity": 1,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0671",
    "role": "action",
    "topic": "career",
    "emotion": "hope",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0683",
    "role": "action",
    "topic": "career",
    "emotion": "hope",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0689",
    "role": "action",
    "topic": "career",
    "emotion": "hope",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 좋아. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0751",
    "role": "action",
    "topic": "career",
    "emotion": "hope",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 돈/일 관련이면 숫자로 적어. 감정으로 계산하면 깨진다."
  },
  {
    "id": "EMP0766",
    "role": "action",
    "topic": "career",
    "emotion": "hope",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0769",
    "role": "action",
    "topic": "money",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0819",
    "role": "action",
    "topic": "money",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0654",
    "role": "action",
    "topic": "money",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0705",
    "role": "action",
    "topic": "money",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0713",
    "role": "action",
    "topic": "money",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 돈/일 관련이면 숫자로 적어. 감정으로 계산하면 깨진다."
  },
  {
    "id": "EMP0755",
    "role": "action",
    "topic": "money",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0807",
    "role": "action",
    "topic": "money",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0843",
    "role": "action",
    "topic": "money",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0707",
    "role": "action",
    "topic": "money",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 1,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 돈/일 관련이면 숫자로 적어. 감정으로 계산하면 깨진다."
  },
  {
    "id": "EMP0675",
    "role": "action",
    "topic": "money",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0757",
    "role": "action",
    "topic": "money",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0745",
    "role": "action",
    "topic": "money",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0785",
    "role": "action",
    "topic": "money",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘의 실행: 기준 1개 세우고, 그 기준을 어기는 상황은 끊어."
  },
  {
    "id": "EMP0663",
    "role": "action",
    "topic": "money",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0667",
    "role": "action",
    "topic": "money",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0692",
    "role": "action",
    "topic": "money",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0762",
    "role": "action",
    "topic": "money",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0786",
    "role": "action",
    "topic": "money",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0808",
    "role": "action",
    "topic": "money",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0818",
    "role": "action",
    "topic": "money",
    "emotion": "hope",
    "need": "agency",
    "intensity": 1,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정돈/계획 중 하나만 선택."
  },
  {
    "id": "EMP0722",
    "role": "action",
    "topic": "money",
    "emotion": "hope",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0700",
    "role": "action",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘의 실행: 기준 1개 세우고, 그 기준을 어기는 상황은 끊어."
  },
  {
    "id": "EMP0706",
    "role": "action",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0711",
    "role": "action",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0739",
    "role": "action",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 괜찮아. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0810",
    "role": "action",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 좋아. {topicNoun} 관련해서 10분만 정돈해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0824",
    "role": "action",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0664",
    "role": "action",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0805",
    "role": "action",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0743",
    "role": "action",
    "topic": "timing",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0747",
    "role": "action",
    "topic": "timing",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0682",
    "role": "action",
    "topic": "timing",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0712",
    "role": "action",
    "topic": "timing",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 좋아. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0720",
    "role": "action",
    "topic": "timing",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 돈/일 관련이면 숫자로 적어. 감정으로 계산하면 깨진다."
  },
  {
    "id": "EMP0731",
    "role": "action",
    "topic": "timing",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0738",
    "role": "action",
    "topic": "timing",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 좋아. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0753",
    "role": "action",
    "topic": "timing",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0817",
    "role": "action",
    "topic": "timing",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0845",
    "role": "action",
    "topic": "timing",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0665",
    "role": "action",
    "topic": "timing",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘의 실행: 기준 1개 세우고, 그 기준을 어기는 상황은 끊어."
  },
  {
    "id": "EMP0770",
    "role": "action",
    "topic": "timing",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 좋아. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0686",
    "role": "action",
    "topic": "timing",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0771",
    "role": "action",
    "topic": "timing",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0777",
    "role": "action",
    "topic": "timing",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0848",
    "role": "action",
    "topic": "timing",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0717",
    "role": "action",
    "topic": "timing",
    "emotion": "hope",
    "need": "agency",
    "intensity": 1,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0841",
    "role": "action",
    "topic": "timing",
    "emotion": "hope",
    "need": "agency",
    "intensity": 1,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 좋아. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0764",
    "role": "action",
    "topic": "timing",
    "emotion": "hope",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0789",
    "role": "action",
    "topic": "timing",
    "emotion": "hope",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 돈/일 관련이면 숫자로 적어. 감정으로 계산하면 깨진다."
  },
  {
    "id": "EMP0656",
    "role": "action",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0662",
    "role": "action",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0709",
    "role": "action",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 좋아. {topicNoun} 관련해서 10분만 정렬해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0782",
    "role": "action",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 유리해. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0788",
    "role": "action",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0659",
    "role": "action",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0728",
    "role": "action",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0835",
    "role": "action",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 좋아. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0844",
    "role": "action",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0708",
    "role": "action",
    "topic": "universal",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0730",
    "role": "action",
    "topic": "universal",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0763",
    "role": "action",
    "topic": "universal",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 좋아. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0828",
    "role": "action",
    "topic": "universal",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0701",
    "role": "action",
    "topic": "universal",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 3,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 돈/일 관련이면 숫자로 적어. 감정으로 계산하면 깨진다."
  },
  {
    "id": "EMP0729",
    "role": "action",
    "topic": "universal",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 괜찮아. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0840",
    "role": "action",
    "topic": "universal",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0842",
    "role": "action",
    "topic": "universal",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0714",
    "role": "action",
    "topic": "universal",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 1,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0820",
    "role": "action",
    "topic": "universal",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 1,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 유리해. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0781",
    "role": "action",
    "topic": "universal",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘의 실행: 기준 1개 세우고, 그 기준을 어기는 상황은 끊어."
  },
  {
    "id": "EMP0834",
    "role": "action",
    "topic": "universal",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "{name}에게 필요한 건 큰 결심이 아니라 작은 행동 1개야: 연락/정리/계획 중 하나만 선택."
  },
  {
    "id": "EMP0849",
    "role": "action",
    "topic": "universal",
    "emotion": "confusion",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0799",
    "role": "action",
    "topic": "universal",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘작게 확인’이 좋아. {topicNoun} 관련해서 10분만 정리해도 마음이 가벼워질 거야."
  },
  {
    "id": "EMP0850",
    "role": "action",
    "topic": "universal",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0695",
    "role": "action",
    "topic": "universal",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0746",
    "role": "action",
    "topic": "universal",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 3,
    "style": "soft",
    "text": "불안을 줄이려면 ‘다음 스텝’이 보여야 해. 오늘은 24시간 안에 할 수 있는 것만 고르자."
  },
  {
    "id": "EMP0829",
    "role": "action",
    "topic": "universal",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 3,
    "style": "direct",
    "text": "오늘 1개만: ‘할 일 리스트’에서 가장 큰 불안 하나를 제거해."
  },
  {
    "id": "EMP0679",
    "role": "action",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 1,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0688",
    "role": "action",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 1,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 돈/일 관련이면 숫자로 적어. 감정으로 계산하면 깨진다."
  },
  {
    "id": "EMP0657",
    "role": "action",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘 딱 한 가지 행동을 고르면, 상대가 애매하면 질문을 명확히 던져라. 답이 없으면 그게 답이다."
  },
  {
    "id": "EMP0721",
    "role": "action",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "오늘의 실행: 기준 1개 세우고, 그 기준을 어기는 상황은 끊어."
  },
  {
    "id": "EMP0774",
    "role": "action",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "너 자신을 지키는 행동을 먼저 해. 그래야 {topicNoun}도 흔들리지 않아."
  },
  {
    "id": "EMP0793",
    "role": "action",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0831",
    "role": "action",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "agency",
    "intensity": 2,
    "style": "soft",
    "text": "오늘 딱 한 가지 행동을 고르면, 가능하면 {dayPeriod}에 한 번, ‘내가 원하는 것 3가지’를 메모해봐. 다음 카드가 그걸 돕는 흐름이야."
  },
  {
    "id": "EMP0752",
    "role": "action",
    "topic": "universal",
    "emotion": "hope",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘연락/결정/보류’ 중 하나를 고르는 게 아니라, 기간을 정해 보류하라(예: 72시간)."
  },
  {
    "id": "EMP0885",
    "role": "boundary",
    "topic": "self",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "{zodiac} 기질은 책임감이 강해서 더 무리하기 쉬워. 그걸 알아챈 것만으로도 반은 성공이야."
  },
  {
    "id": "EMP0865",
    "role": "boundary",
    "topic": "universal",
    "emotion": "pressure",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "{zodiac} 기질은 책임감이 강해서 더 무리하기 쉬워. 그걸 알아챈 것만으로도 반은 성공이야."
  },
  {
    "id": "EMP0890",
    "role": "boundary",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 2,
    "style": "soft",
    "text": "{zodiac} 기질은 책임감이 강해서 더 무리하기 쉬워. 그걸 알아챈 것만으로도 반은 성공이야."
  },
  {
    "id": "EMP0876",
    "role": "boundary",
    "topic": "universal",
    "emotion": "frustration",
    "need": "reassurance",
    "intensity": 3,
    "style": "soft",
    "text": "{zodiac} 기질은 책임감이 강해서 더 무리하기 쉬워. 그걸 알아챈 것만으로도 반은 성공이야."
  },
  {
    "id": "EMP0875",
    "role": "boundary",
    "topic": "career",
    "emotion": "anger",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "너를 깎아먹는 관계/일은 결국 전체를 망친다. 정리해."
  },
  {
    "id": "EMP0878",
    "role": "boundary",
    "topic": "career",
    "emotion": "fatigue",
    "need": "clarity",
    "intensity": 2,
    "style": "direct",
    "text": "너를 깎아먹는 관계/일은 결국 전체를 망친다. 정리해."
  },
  {
    "id": "EMP0915",
    "role": "boundary",
    "topic": "self",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘다 해주기’가 아니라 ‘할 수 있는 만큼만’이다."
  },
  {
    "id": "EMP0893",
    "role": "boundary",
    "topic": "career",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘다 해주기’가 아니라 ‘할 수 있는 만큼만’이다."
  },
  {
    "id": "EMP0912",
    "role": "boundary",
    "topic": "money",
    "emotion": "anxiety",
    "need": "agency",
    "intensity": 2,
    "style": "direct",
    "text": "지금은 ‘다 해주기’가 아니라 ‘할 수 있는 만큼만’이다."
  },
  {
    "id": "EMP0880",
    "role": "boundary",
    "topic": "money",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 3,
    "style": "direct",
    "text": "지금은 ‘다 해주기’가 아니라 ‘할 수 있는 만큼만’이다."
  },
  {
    "id": "EMP0896",
    "role": "boundary",
    "topic": "timing",
    "emotion": "frustration",
    "need": "agency",
    "intensity": 3,
    "style": "direct",
    "text": "지금은 ‘다 해주기’가 아니라 ‘할 수 있는 만큼만’이다."
  },
  {
    "id": "EMP0921",
    "role": "boundary",
    "topic": "universal",
    "emotion": "pressure",
    "need": "agency",
    "intensity": 3,
    "style": "direct",
    "text": "지금은 ‘다 해주기’가 아니라 ‘할 수 있는 만큼만’이다."
  },
  {
    "id": "EMP0895",
    "role": "boundary",
    "topic": "universal",
    "emotion": "anger",
    "need": "agency",
    "intensity": 3,
    "style": "direct",
    "text": "지금은 ‘다 해주기’가 아니라 ‘할 수 있는 만큼만’이다."
  },
  {
    "id": "EMP0868",
    "role": "boundary",
    "topic": "love",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "너의 속도와 리듬을 지켜. 그래야 운의 흐름도 맞춰탈 수 있어."
  },
  {
    "id": "EMP0935",
    "role": "boundary",
    "topic": "love",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "선부터 정해라. 선이 없으면 상대가 계속 시험한다."
  },
  {
    "id": "EMP0904",
    "role": "boundary",
    "topic": "love",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 3,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 너를 깎아먹는 관계/일은 결국 전체를 망친다. 정돈해."
  },
  {
    "id": "EMP0907",
    "role": "boundary",
    "topic": "love",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 3,
    "style": "soft",
    "text": "상대/환경이 네 에너지를 너무 빨아먹는다면, 잠깐 거리를 두는 게 오히려 건강해."
  },
  {
    "id": "EMP0872",
    "role": "boundary",
    "topic": "love",
    "emotion": "pressure",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "상대/환경이 네 에너지를 너무 빨아먹는다면, 잠깐 거리를 두는 게 오히려 건강해."
  },
  {
    "id": "EMP0928",
    "role": "boundary",
    "topic": "love",
    "emotion": "pressure",
    "need": "boundary",
    "intensity": 3,
    "style": "direct",
    "text": "선부터 정해라. 선이 없으면 상대가 계속 시험한다."
  },
  {
    "id": "EMP0853",
    "role": "boundary",
    "topic": "love",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 너를 깎아먹는 관계/일은 결국 전체를 망친다. 정돈해."
  },
  {
    "id": "EMP0889",
    "role": "boundary",
    "topic": "love",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘선 긋기’가 차갑다는 뜻이 아니야. 너를 보호하는 최소한의 예의야."
  },
  {
    "id": "EMP0945",
    "role": "boundary",
    "topic": "love",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "한 가지는 분명해: {name}가 감당할 수 없는 선까지 갈 필요는 없어."
  },
  {
    "id": "EMP0874",
    "role": "boundary",
    "topic": "love",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 3,
    "style": "soft",
    "text": "여기서 핵심은 경계야. {zodiac} 기질은 책임감이 강해서 더 무리하기 쉬워. 그걸 알아챈 것만으로도 반은 성공이야."
  },
  {
    "id": "EMP0949",
    "role": "boundary",
    "topic": "love",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 3,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 애매한 약속/기대는 비용이다. 비용을 줄여."
  },
  {
    "id": "EMP0862",
    "role": "boundary",
    "topic": "love",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "여기서 핵심은 경계야. {zodiac} 기질은 책임감이 강해서 더 무리하기 쉬워. 그걸 알아챈 것만으로도 반은 성공이야."
  },
  {
    "id": "EMP0908",
    "role": "boundary",
    "topic": "love",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 감정 소모가 큰 대화는 오늘 끝내. 내일로 넘겨."
  },
  {
    "id": "EMP0916",
    "role": "boundary",
    "topic": "love",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 3,
    "style": "soft",
    "text": "한 가지는 분명해: {name}가 감당할 수 없는 선까지 갈 필요는 없어."
  },
  {
    "id": "EMP0855",
    "role": "boundary",
    "topic": "love",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 1,
    "style": "soft",
    "text": "여기서 핵심은 경계야. {zodiac} 기질은 책임감이 강해서 더 무리하기 쉬워. 그걸 알아챈 것만으로도 반은 성공이야."
  },
  {
    "id": "EMP0905",
    "role": "boundary",
    "topic": "love",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "한 가지는 분명해: {name}가 감당할 수 없는 선까지 갈 필요는 없어."
  },
  {
    "id": "EMP0923",
    "role": "boundary",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 지금은 ‘다 해주기’가 아니라 ‘할 수 있는 만큼만’이다."
  },
  {
    "id": "EMP0947",
    "role": "boundary",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "선부터 정해라. 선이 없으면 상대가 계속 시험한다."
  },
  {
    "id": "EMP0898",
    "role": "boundary",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 3,
    "style": "soft",
    "text": "상대/환경이 네 에너지를 너무 빨아먹는다면, 잠깐 거리를 두는 게 오히려 건강해."
  },
  {
    "id": "EMP0870",
    "role": "boundary",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘선 긋기’가 차갑다는 뜻이 아니야. 너를 보호하는 최소한의 예의야."
  },
  {
    "id": "EMP0906",
    "role": "boundary",
    "topic": "relationship",
    "emotion": "pressure",
    "need": "boundary",
    "intensity": 3,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 감정 소모가 큰 대화는 오늘 끝내. 내일로 넘겨."
  },
  {
    "id": "EMP0854",
    "role": "boundary",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 너를 깎아먹는 관계/일은 결국 전체를 망친다. 정렬해."
  },
  {
    "id": "EMP0920",
    "role": "boundary",
    "topic": "relationship",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 3,
    "style": "direct",
    "text": "선부터 정해라. 선이 없으면 상대가 계속 시험한다."
  },
  {
    "id": "EMP0897",
    "role": "boundary",
    "topic": "relationship",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "너의 속도와 리듬을 지켜. 그래야 운의 흐름도 맞춰탈 수 있어."
  },
  {
    "id": "EMP0864",
    "role": "boundary",
    "topic": "relationship",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 1,
    "style": "direct",
    "text": "선부터 정해라. 선이 없으면 상대가 계속 시험한다."
  },
  {
    "id": "EMP0887",
    "role": "boundary",
    "topic": "relationship",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 1,
    "style": "direct",
    "text": "선부터 정해라. 선이 없으면 상대가 계속 시험한다."
  },
  {
    "id": "EMP0940",
    "role": "boundary",
    "topic": "relationship",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "한 가지는 분명해: {name}가 감당할 수 없는 선까지 갈 필요는 없어."
  },
  {
    "id": "EMP0860",
    "role": "boundary",
    "topic": "self",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "너의 속도와 리듬을 지켜. 그래야 운의 흐름도 맞춰탈 수 있어."
  },
  {
    "id": "EMP0930",
    "role": "boundary",
    "topic": "self",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘선 긋기’가 차갑다는 뜻이 아니야. 너를 보호하는 최소한의 예의야."
  },
  {
    "id": "EMP0937",
    "role": "boundary",
    "topic": "self",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "한 가지는 분명해: {name}가 감당할 수 없는 선까지 갈 필요는 없어."
  },
  {
    "id": "EMP0884",
    "role": "boundary",
    "topic": "self",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 3,
    "style": "soft",
    "text": "상대/환경이 네 에너지를 너무 빨아먹는다면, 잠깐 거리를 두는 게 오히려 건강해."
  },
  {
    "id": "EMP0910",
    "role": "boundary",
    "topic": "self",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 3,
    "style": "soft",
    "text": "너의 속도와 리듬을 지켜. 그래야 운의 흐름도 맞춰탈 수 있어."
  },
  {
    "id": "EMP0913",
    "role": "boundary",
    "topic": "self",
    "emotion": "pressure",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘선 긋기’가 차갑다는 뜻이 아니야. 너를 보호하는 최소한의 예의야."
  },
  {
    "id": "EMP0899",
    "role": "boundary",
    "topic": "self",
    "emotion": "pressure",
    "need": "boundary",
    "intensity": 3,
    "style": "soft",
    "text": "너의 속도와 리듬을 지켜. 그래야 운의 흐름도 맞춰탈 수 있어."
  },
  {
    "id": "EMP0881",
    "role": "boundary",
    "topic": "self",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 너를 깎아먹는 관계/일은 결국 전체를 망친다. 정리해."
  },
  {
    "id": "EMP0894",
    "role": "boundary",
    "topic": "self",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 너를 깎아먹는 관계/일은 결국 전체를 망친다. 정돈해."
  },
  {
    "id": "EMP0931",
    "role": "boundary",
    "topic": "self",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 감정 소모가 큰 대화는 오늘 끝내. 내일로 넘겨."
  },
  {
    "id": "EMP0861",
    "role": "boundary",
    "topic": "self",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 지금은 ‘다 해주기’가 아니라 ‘할 수 있는 만큼만’이다."
  },
  {
    "id": "EMP0869",
    "role": "boundary",
    "topic": "self",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘선 긋기’가 차갑다는 뜻이 아니야. 너를 보호하는 최소한의 예의야."
  },
  {
    "id": "EMP0925",
    "role": "boundary",
    "topic": "self",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "선부터 정해라. 선이 없으면 상대가 계속 시험한다."
  },
  {
    "id": "EMP0903",
    "role": "boundary",
    "topic": "self",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "너의 속도와 리듬을 지켜. 그래야 운의 흐름도 맞춰탈 수 있어."
  },
  {
    "id": "EMP0934",
    "role": "boundary",
    "topic": "career",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "한 가지는 분명해: {name}가 감당할 수 없는 선까지 갈 필요는 없어."
  },
  {
    "id": "EMP0867",
    "role": "boundary",
    "topic": "career",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 3,
    "style": "soft",
    "text": "상대/환경이 네 에너지를 너무 빨아먹는다면, 잠깐 거리를 두는 게 오히려 건강해."
  },
  {
    "id": "EMP0948",
    "role": "boundary",
    "topic": "career",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 3,
    "style": "soft",
    "text": "상대/환경이 네 에너지를 너무 빨아먹는다면, 잠깐 거리를 두는 게 오히려 건강해."
  },
  {
    "id": "EMP0871",
    "role": "boundary",
    "topic": "career",
    "emotion": "pressure",
    "need": "boundary",
    "intensity": 3,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 감정 소모가 큰 대화는 오늘 끝내. 내일로 넘겨."
  },
  {
    "id": "EMP0857",
    "role": "boundary",
    "topic": "career",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 요즘은 ‘다 해주기’가 아니라 ‘할 수 있는 만큼만’이다."
  },
  {
    "id": "EMP0882",
    "role": "boundary",
    "topic": "career",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "한 가지는 분명해: {name}가 감당할 수 없는 선까지 갈 필요는 없어."
  },
  {
    "id": "EMP0932",
    "role": "boundary",
    "topic": "career",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "너의 속도와 리듬을 지켜. 그래야 운의 흐름도 맞춰탈 수 있어."
  },
  {
    "id": "EMP0919",
    "role": "boundary",
    "topic": "career",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 1,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 감정 소모가 큰 대화는 오늘 끝내. 내일로 넘겨."
  },
  {
    "id": "EMP0942",
    "role": "boundary",
    "topic": "career",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 1,
    "style": "soft",
    "text": "여기서 핵심은 경계야. {zodiac} 기질은 책임감이 강해서 더 무리하기 쉬워. 그걸 알아챈 것만으로도 반은 성공이야."
  },
  {
    "id": "EMP0943",
    "role": "boundary",
    "topic": "career",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "너의 속도와 리듬을 지켜. 그래야 운의 흐름도 맞춰탈 수 있어."
  },
  {
    "id": "EMP0933",
    "role": "boundary",
    "topic": "money",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "너의 속도와 리듬을 지켜. 그래야 운의 흐름도 맞춰탈 수 있어."
  },
  {
    "id": "EMP0886",
    "role": "boundary",
    "topic": "money",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 3,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 애매한 약속/기대는 비용이다. 비용을 줄여."
  },
  {
    "id": "EMP0856",
    "role": "boundary",
    "topic": "money",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘선 긋기’가 차갑다는 뜻이 아니야. 너를 보호하는 최소한의 예의야."
  },
  {
    "id": "EMP0883",
    "role": "boundary",
    "topic": "money",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 애매한 약속/기대는 비용이다. 비용을 줄여."
  },
  {
    "id": "EMP0922",
    "role": "boundary",
    "topic": "money",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 애매한 약속/기대는 비용이다. 비용을 줄여."
  },
  {
    "id": "EMP0914",
    "role": "boundary",
    "topic": "money",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "너의 속도와 리듬을 지켜. 그래야 운의 흐름도 맞춰탈 수 있어."
  },
  {
    "id": "EMP0946",
    "role": "boundary",
    "topic": "money",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 애매한 약속/기대는 비용이다. 비용을 줄여."
  },
  {
    "id": "EMP0877",
    "role": "boundary",
    "topic": "money",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 애매한 약속/기대는 비용이다. 비용을 줄여."
  },
  {
    "id": "EMP0859",
    "role": "boundary",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "한 가지는 분명해: {name}가 감당할 수 없는 선까지 갈 필요는 없어."
  },
  {
    "id": "EMP0917",
    "role": "boundary",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "여기서 핵심은 경계야. {zodiac} 기질은 책임감이 강해서 더 무리하기 쉬워. 그걸 알아챈 것만으로도 반은 성공이야."
  },
  {
    "id": "EMP0944",
    "role": "boundary",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "상대/환경이 네 에너지를 너무 빨아먹는다면, 잠깐 거리를 두는 게 오히려 건강해."
  },
  {
    "id": "EMP0891",
    "role": "boundary",
    "topic": "timing",
    "emotion": "pressure",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "선부터 정해라. 선이 없으면 상대가 계속 시험한다."
  },
  {
    "id": "EMP0950",
    "role": "boundary",
    "topic": "timing",
    "emotion": "pressure",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 감정 소모가 큰 대화는 오늘 끝내. 내일로 넘겨."
  },
  {
    "id": "EMP0911",
    "role": "boundary",
    "topic": "timing",
    "emotion": "pressure",
    "need": "boundary",
    "intensity": 3,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 애매한 약속/기대는 비용이다. 비용을 줄여."
  },
  {
    "id": "EMP0941",
    "role": "boundary",
    "topic": "timing",
    "emotion": "pressure",
    "need": "boundary",
    "intensity": 3,
    "style": "direct",
    "text": "선부터 정해라. 선이 없으면 상대가 계속 시험한다."
  },
  {
    "id": "EMP0863",
    "role": "boundary",
    "topic": "timing",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 감정 소모가 큰 대화는 오늘 끝내. 내일로 넘겨."
  },
  {
    "id": "EMP0900",
    "role": "boundary",
    "topic": "timing",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "한 가지는 분명해: {name}가 감당할 수 없는 선까지 갈 필요는 없어."
  },
  {
    "id": "EMP0901",
    "role": "boundary",
    "topic": "timing",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 애매한 약속/기대는 비용이다. 비용을 줄여."
  },
  {
    "id": "EMP0918",
    "role": "boundary",
    "topic": "timing",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘선 긋기’가 차갑다는 뜻이 아니야. 너를 보호하는 최소한의 예의야."
  },
  {
    "id": "EMP0927",
    "role": "boundary",
    "topic": "timing",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "선부터 정해라. 선이 없으면 상대가 계속 시험한다."
  },
  {
    "id": "EMP0909",
    "role": "boundary",
    "topic": "timing",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 3,
    "style": "soft",
    "text": "한 가지는 분명해: {name}가 감당할 수 없는 선까지 갈 필요는 없어."
  },
  {
    "id": "EMP0926",
    "role": "boundary",
    "topic": "timing",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 3,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 애매한 약속/기대는 비용이다. 비용을 줄여."
  },
  {
    "id": "EMP0852",
    "role": "boundary",
    "topic": "timing",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 1,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 감정 소모가 큰 대화는 오늘 끝내. 내일로 넘겨."
  },
  {
    "id": "EMP0858",
    "role": "boundary",
    "topic": "timing",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "한 가지는 분명해: {name}가 감당할 수 없는 선까지 갈 필요는 없어."
  },
  {
    "id": "EMP0929",
    "role": "boundary",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 너를 깎아먹는 관계/일은 결국 전체를 망친다. 정리해."
  },
  {
    "id": "EMP0866",
    "role": "boundary",
    "topic": "universal",
    "emotion": "pressure",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "여기서 핵심은 경계야. 너를 깎아먹는 관계/일은 결국 전체를 망친다. 정리해."
  },
  {
    "id": "EMP0939",
    "role": "boundary",
    "topic": "universal",
    "emotion": "pressure",
    "need": "boundary",
    "intensity": 3,
    "style": "soft",
    "text": "오늘은 ‘선 긋기’가 차갑다는 뜻이 아니야. 너를 보호하는 최소한의 예의야."
  },
  {
    "id": "EMP0879",
    "role": "boundary",
    "topic": "universal",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘선 긋기’가 차갑다는 뜻이 아니야. 너를 보호하는 최소한의 예의야."
  },
  {
    "id": "EMP0902",
    "role": "boundary",
    "topic": "universal",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "한 가지는 분명해: {name}가 감당할 수 없는 선까지 갈 필요는 없어."
  },
  {
    "id": "EMP0924",
    "role": "boundary",
    "topic": "universal",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "상대/환경이 네 에너지를 너무 빨아먹는다면, 잠깐 거리를 두는 게 오히려 건강해."
  },
  {
    "id": "EMP0892",
    "role": "boundary",
    "topic": "universal",
    "emotion": "frustration",
    "need": "boundary",
    "intensity": 3,
    "style": "direct",
    "text": "선부터 정해라. 선이 없으면 상대가 계속 시험한다."
  },
  {
    "id": "EMP0873",
    "role": "boundary",
    "topic": "universal",
    "emotion": "anger",
    "need": "boundary",
    "intensity": 2,
    "style": "direct",
    "text": "선부터 정해라. 선이 없으면 상대가 계속 시험한다."
  },
  {
    "id": "EMP0938",
    "role": "boundary",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 1,
    "style": "soft",
    "text": "오늘은 ‘선 긋기’가 차갑다는 뜻이 아니야. 너를 보호하는 최소한의 예의야."
  },
  {
    "id": "EMP0851",
    "role": "boundary",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "한 가지는 분명해: {name}가 감당할 수 없는 선까지 갈 필요는 없어."
  },
  {
    "id": "EMP0888",
    "role": "boundary",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "상대/환경이 네 에너지를 너무 빨아먹는다면, 잠깐 거리를 두는 게 오히려 건강해."
  },
  {
    "id": "EMP0936",
    "role": "boundary",
    "topic": "universal",
    "emotion": "fatigue",
    "need": "boundary",
    "intensity": 2,
    "style": "soft",
    "text": "오늘은 ‘선 긋기’가 차갑다는 뜻이 아니야. 너를 보호하는 최소한의 예의야."
  },
  {
    "id": "EMP0963",
    "role": "closing",
    "topic": "love",
    "emotion": "confusion",
    "need": "closure",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정 인정 + 기준 설정 + 작은 실행. 이 3개면 오늘은 이긴다."
  },
  {
    "id": "EMP0983",
    "role": "closing",
    "topic": "love",
    "emotion": "hope",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 지금의 흔들림은 나쁜 징조가 아니라, 방향을 바꿀 신호야. 천천히 가도 돼."
  },
  {
    "id": "EMP0973",
    "role": "closing",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 지금의 흔들림은 나쁜 징조가 아니라, 방향을 바꿀 신호야. 천천히 가도 돼."
  },
  {
    "id": "EMP0976",
    "role": "closing",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 2,
    "style": "direct",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 너는 이미 답을 알고 있다. 이제 행동만 남았다."
  },
  {
    "id": "EMP0987",
    "role": "closing",
    "topic": "relationship",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 오늘 리딩은 {zodiac}의 장점( {zodiacTrait} )을 살리면 흐름이 좋아진다고 말해줘."
  },
  {
    "id": "EMP0978",
    "role": "closing",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "closure",
    "intensity": 1,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 오늘 리딩은 {zodiac}의 장점( {zodiacTrait} )을 살리면 흐름이 좋아진다고 말해줘."
  },
  {
    "id": "EMP0969",
    "role": "closing",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 필요하면 질문을 더 좁혀서 다시 뽑아도 유리해. 오늘은 ‘정확도’가 힘이야."
  },
  {
    "id": "EMP0980",
    "role": "closing",
    "topic": "relationship",
    "emotion": "confusion",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 지금의 흔들림은 나쁜 징조가 아니라, 방향을 바꿀 신호야. 천천히 가도 돼."
  },
  {
    "id": "EMP0956",
    "role": "closing",
    "topic": "relationship",
    "emotion": "hope",
    "need": "closure",
    "intensity": 1,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 필요하면 질문을 더 좁혀서 다시 뽑아도 좋아. 오늘은 ‘정확도’가 힘이야."
  },
  {
    "id": "EMP0993",
    "role": "closing",
    "topic": "relationship",
    "emotion": "hope",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 지금의 흔들림은 나쁜 징조가 아니라, 방향을 바꿀 신호야. 천천히 가도 돼."
  },
  {
    "id": "EMP0955",
    "role": "closing",
    "topic": "relationship",
    "emotion": "relief",
    "need": "closure",
    "intensity": 1,
    "style": "direct",
    "text": "좋은 흐름은 ‘정리’에서 나온다. 정리하고 움직여."
  },
  {
    "id": "EMP0979",
    "role": "closing",
    "topic": "relationship",
    "emotion": "relief",
    "need": "closure",
    "intensity": 1,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 오늘 리딩은 {zodiac}의 장점( {zodiacTrait} )을 살리면 흐름이 좋아진다고 말해줘."
  },
  {
    "id": "EMP0954",
    "role": "closing",
    "topic": "relationship",
    "emotion": "relief",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 현재의 흔들림은 나쁜 징조가 아니라, 방향을 바꿀 신호야. 천천히 가도 돼."
  },
  {
    "id": "EMP0984",
    "role": "closing",
    "topic": "relationship",
    "emotion": "relief",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 너무 혼자 버티지 마. 네 편을 하나 더 만들어두는 게 운을 빠르게 만든다."
  },
  {
    "id": "EMP0965",
    "role": "closing",
    "topic": "self",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 오늘 리딩은 {zodiac}의 장점( {zodiacTrait} )을 살리면 흐름이 괜찮아진다고 말해줘."
  },
  {
    "id": "EMP0989",
    "role": "closing",
    "topic": "self",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 필요하면 질문을 더 좁혀서 다시 뽑아도 좋아. 오늘은 ‘정확도’가 힘이야."
  },
  {
    "id": "EMP0953",
    "role": "closing",
    "topic": "self",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 3,
    "style": "soft",
    "text": "정렬하면, {name}는 지금 {emotionWord}를 지나 ‘선택’으로 가는 길목에 있어. 급하게 결론 내릴 필요 없어."
  },
  {
    "id": "EMP0959",
    "role": "closing",
    "topic": "self",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 3,
    "style": "direct",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 타이밍은 기다리는 게 아니라 만드는 거다. 오늘 작은 행동이 내일을 바꾼다."
  },
  {
    "id": "EMP0962",
    "role": "closing",
    "topic": "self",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 3,
    "style": "soft",
    "text": "정리하면, {name}는 지금 {emotionWord}를 지나 ‘선택’으로 가는 길목에 있어. 급하게 결론 내릴 필요 없어."
  },
  {
    "id": "EMP0967",
    "role": "closing",
    "topic": "self",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 3,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 필요하면 질문을 더 좁혀서 다시 뽑아도 유리해. 오늘은 ‘정확도’가 힘이야."
  },
  {
    "id": "EMP0992",
    "role": "closing",
    "topic": "self",
    "emotion": "confusion",
    "need": "closure",
    "intensity": 1,
    "style": "soft",
    "text": "정렬하면, {name}는 현재 {emotionWord}를 지나 ‘선택’으로 가는 길목에 있어. 급하게 결론 내릴 필요 없어."
  },
  {
    "id": "EMP0966",
    "role": "closing",
    "topic": "self",
    "emotion": "confusion",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 필요하면 질문을 더 좁혀서 다시 뽑아도 좋아. 오늘은 ‘정확도’가 힘이야."
  },
  {
    "id": "EMP0972",
    "role": "closing",
    "topic": "self",
    "emotion": "hope",
    "need": "closure",
    "intensity": 1,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 오늘 리딩은 {zodiac}의 장점( {zodiacTrait} )을 살리면 흐름이 좋아진다고 말해줘."
  },
  {
    "id": "EMP0970",
    "role": "closing",
    "topic": "self",
    "emotion": "hope",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "정리하면, {name}는 현재 {emotionWord}를 지나 ‘선택’으로 가는 길목에 있어. 급하게 결론 내릴 필요 없어."
  },
  {
    "id": "EMP0977",
    "role": "closing",
    "topic": "self",
    "emotion": "hope",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 필요하면 질문을 더 좁혀서 다시 뽑아도 유리해. 오늘은 ‘정확도’가 힘이야."
  },
  {
    "id": "EMP0961",
    "role": "closing",
    "topic": "career",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 오늘 리딩은 {zodiac}의 장점( {zodiacTrait} )을 살리면 흐름이 괜찮아진다고 말해줘."
  },
  {
    "id": "EMP0995",
    "role": "closing",
    "topic": "career",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 3,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 너무 혼자 버티지 마. 네 편을 하나 더 만들어두는 게 운을 빠르게 만든다."
  },
  {
    "id": "EMP0999",
    "role": "closing",
    "topic": "career",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 3,
    "style": "direct",
    "text": "좋은 흐름은 ‘정돈’에서 나온다. 정리하고 움직여."
  },
  {
    "id": "EMP0951",
    "role": "closing",
    "topic": "career",
    "emotion": "hope",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "정리하면, {name}는 지금 {emotionWord}를 지나 ‘선택’으로 가는 길목에 있어. 급하게 결론 내릴 필요 없어."
  },
  {
    "id": "EMP0975",
    "role": "closing",
    "topic": "career",
    "emotion": "hope",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 오늘 리딩은 {zodiac}의 장점( {zodiacTrait} )을 살리면 흐름이 좋아진다고 말해줘."
  },
  {
    "id": "EMP0981",
    "role": "closing",
    "topic": "career",
    "emotion": "relief",
    "need": "closure",
    "intensity": 1,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 너무 혼자 버티지 마. 네 편을 하나 더 만들어두는 게 운을 빠르게 만든다."
  },
  {
    "id": "EMP1000",
    "role": "closing",
    "topic": "money",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 지금의 흔들림은 나쁜 징조가 아니라, 방향을 바꿀 신호야. 천천히 가도 돼."
  },
  {
    "id": "EMP0957",
    "role": "closing",
    "topic": "money",
    "emotion": "confusion",
    "need": "closure",
    "intensity": 1,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 오늘 리딩은 {zodiac}의 장점( {zodiacTrait} )을 살리면 흐름이 좋아진다고 말해줘."
  },
  {
    "id": "EMP0974",
    "role": "closing",
    "topic": "money",
    "emotion": "confusion",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 지금의 흔들림은 나쁜 징조가 아니라, 방향을 바꿀 신호야. 천천히 가도 돼."
  },
  {
    "id": "EMP0964",
    "role": "closing",
    "topic": "money",
    "emotion": "relief",
    "need": "closure",
    "intensity": 1,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 너무 혼자 버티지 마. 네 편을 하나 더 만들어두는 게 운을 빠르게 만든다."
  },
  {
    "id": "EMP0988",
    "role": "closing",
    "topic": "money",
    "emotion": "relief",
    "need": "closure",
    "intensity": 1,
    "style": "direct",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 타이밍은 기다리는 게 아니라 만드는 거다. 오늘 작은 행동이 내일을 바꾼다."
  },
  {
    "id": "EMP0952",
    "role": "closing",
    "topic": "money",
    "emotion": "relief",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "정렬하면, {name}는 지금 {emotionWord}를 지나 ‘선택’으로 가는 길목에 있어. 급하게 결론 내릴 필요 없어."
  },
  {
    "id": "EMP0982",
    "role": "closing",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 2,
    "style": "direct",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 타이밍은 기다리는 게 아니라 만드는 거다. 오늘 작은 행동이 내일을 바꾼다."
  },
  {
    "id": "EMP0985",
    "role": "closing",
    "topic": "timing",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 2,
    "style": "direct",
    "text": "좋은 흐름은 ‘정리’에서 나온다. 정리하고 움직여."
  },
  {
    "id": "EMP0990",
    "role": "closing",
    "topic": "timing",
    "emotion": "confusion",
    "need": "closure",
    "intensity": 2,
    "style": "direct",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 너는 이미 답을 알고 있다. 이제 행동만 남았다."
  },
  {
    "id": "EMP0998",
    "role": "closing",
    "topic": "timing",
    "emotion": "confusion",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 필요하면 질문을 더 좁혀서 다시 뽑아도 좋아. 오늘은 ‘정확도’가 힘이야."
  },
  {
    "id": "EMP0991",
    "role": "closing",
    "topic": "timing",
    "emotion": "relief",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "정리하면, {name}는 지금 {emotionWord}를 지나 ‘선택’으로 가는 길목에 있어. 급하게 결론 내릴 필요 없어."
  },
  {
    "id": "EMP0996",
    "role": "closing",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 2,
    "style": "direct",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 오늘 리딩의 핵심은 ‘통제 가능한 것부터’다. 나머지는 흘려보내."
  },
  {
    "id": "EMP0960",
    "role": "closing",
    "topic": "universal",
    "emotion": "anxiety",
    "need": "closure",
    "intensity": 3,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 지금의 흔들림은 나쁜 징조가 아니라, 방향을 바꿀 신호야. 천천히 가도 돼."
  },
  {
    "id": "EMP0968",
    "role": "closing",
    "topic": "universal",
    "emotion": "confusion",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "정리하면, {name}는 지금 {emotionWord}를 지나 ‘선택’으로 가는 길목에 있어. 급하게 결론 내릴 필요 없어."
  },
  {
    "id": "EMP0971",
    "role": "closing",
    "topic": "universal",
    "emotion": "confusion",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 오늘 리딩은 {zodiac}의 장점( {zodiacTrait} )을 살리면 흐름이 좋아진다고 말해줘."
  },
  {
    "id": "EMP0986",
    "role": "closing",
    "topic": "universal",
    "emotion": "confusion",
    "need": "closure",
    "intensity": 2,
    "style": "direct",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 너는 이미 답을 알고 있다. 이제 행동만 남았다."
  },
  {
    "id": "EMP0997",
    "role": "closing",
    "topic": "universal",
    "emotion": "confusion",
    "need": "closure",
    "intensity": 2,
    "style": "direct",
    "text": "결론: 감정 인정 + 기준 설정 + 작은 실행. 이 3개면 오늘은 이긴다."
  },
  {
    "id": "EMP0994",
    "role": "closing",
    "topic": "universal",
    "emotion": "hope",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "정리하면, {name}는 지금 {emotionWord}를 지나 ‘선택’으로 가는 길목에 있어. 급하게 결론 내릴 필요 없어."
  },
  {
    "id": "EMP0958",
    "role": "closing",
    "topic": "universal",
    "emotion": "relief",
    "need": "closure",
    "intensity": 2,
    "style": "soft",
    "text": "이번 타로 리딩의 결론은 ‘정리’야. 필요하면 질문을 더 좁혀서 다시 뽑아도 좋아. 오늘은 ‘정확도’가 힘이야."
  },
];
