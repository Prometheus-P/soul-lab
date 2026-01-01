/* eslint-disable no-console */
import { refineTarotOutput } from "../src/utils/refineOutput";

const sample = `
(양자리 · 직진·결단) (음력→양력 변환됨) 너, 지금은 커리어/일에서 안도가 먼저 올라오는 구간이야.
괜찮아. 그 반응은 과한 게 아니야. 그 반응, 과한 게 아니야. 지금 불안해도 정상이다.
미래에는 탐욕(으)로 흘러갑니다.
`;

const out = refineTarotOutput(sample);
console.log(out.text);
console.log(out.meta);
