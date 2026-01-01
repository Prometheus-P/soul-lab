import { describe, it, expect } from "vitest";
import { refineTarotOutput } from "./refineOutput";

describe("Refiner v8", () => {
  it("removes meta phrases, softens wording, fixes particles, and dedupes", () => {
    // Input with meta phrase, harsh wording, particle placeholder, and exact duplicate
    const input = "(음력→양력 변환됨) 탐욕(으)로 흘러갑니다. 탐욕(으)로 흘러갑니다.";
    const out = refineTarotOutput(input);
    expect(out.text).not.toContain("음력→양력");
    expect(out.text).toContain("붙잡음으로");
    expect(out.meta.deduped_sentences).toBeGreaterThanOrEqual(1);
  });

  it("adds a bridging line when both '안도' and '불안' appear in the head block", () => {
    const input = "너, 지금은 안도가 먼저 올라오는 구간이야.\n지금 불안해도 정상이다.";
    const out = refineTarotOutput(input, { mergeEmotion: true, dedupe: false, soften: false, fixParticles: false, removeMeta: false });
    expect(out.text).toContain("안도는 잠깐이고, 불안은 잔류할 수 있다");
  });
});
