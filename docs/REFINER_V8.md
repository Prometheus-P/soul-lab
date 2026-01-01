# Refiner v8 (Output Cleanup Layer)

목표: 사용자에게 노출되는 결과물의 “공감 체감”을 떨어뜨리는 **기계 티**를 제거한다.

## 해결하는 문제
- 중복 문장 (같은 말 반복)
- 조사 깨짐: `(으)로`, `(이)가`, `(을)를` 등
- 메타 문구 노출: `(음력→양력 변환됨)` 같은 디버그/설명
- 과도한 단정/공격적 표현: “탐욕”, “절대/반드시/무조건”
- 감정 라벨 모순(안도/불안 등) → 약한 브리지 문장으로 연결

## 적용 위치(핵심)
`buildEmpathicAnswer()` 이후, UI로 내보내기 직전에 `refineTarotOutput()` 를 한 번 더 통과시킨다.

```ts
import { buildEmpathicAnswer } from "@/utils/empathyEngine";
import { refineTarotOutput } from "@/utils/refineOutput";

const { text } = buildEmpathicAnswer(...);

const refined = refineTarotOutput(text, {
  removeMeta: true,
  fixParticles: true,
  dedupe: true,
  soften: true,
  mergeEmotion: true,
});

return refined.text;
```

## 운영 팁
- `deduped_sentences`가 2 이상 자주 나오면 템플릿 소스 중복이 많다는 뜻
- `particle_fixes`가 1 이상 자주 나오면 템플릿에 조사 마커가 많다는 뜻
- meta는 운영에서 sampling 로그로만 추천
