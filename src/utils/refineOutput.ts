/**
 * Refiner v8: output post-processing layer to boost "human-ness" and empathy quality.
 *
 * Goals:
 * - Remove obvious meta/debug phrases (e.g., "(음력→양력 변환됨)")
 * - Fix 조사 placeholders like "(으)로", "(이)가", "(을)를", "(은)는", "(와)과"
 * - De-duplicate exact/near-duplicate sentences
 * - Reduce tone contradictions by merging "안도/불안" phrasing in the same block (light heuristic)
 * - Soften overly harsh wording (e.g., "탐욕" -> "붙잡음")
 *
 * Usage:
 *   const refined = refineTarotOutput(text);
 *   return refined.text;
 */

export type RefineOptions = {
  name?: string;
  removeMeta?: boolean;    // default true
  fixParticles?: boolean;  // default true
  dedupe?: boolean;        // default true
  soften?: boolean;        // default true
  mergeEmotion?: boolean;  // default true
  maxLen?: number;         // optional: hard cut (characters)
};

export type RefineResult = {
  text: string;
  meta: {
    removed_meta_count: number;
    particle_fixes: number;
    deduped_sentences: number;
    softened_hits: number;
    merged_emotion_blocks: number;
  };
};

const DEFAULTS: Required<Omit<RefineOptions, "name" | "maxLen">> = {
  removeMeta: true,
  fixParticles: true,
  dedupe: true,
  soften: true,
  mergeEmotion: true,
};

// --- 1) Meta removal ---------------------------------------------------------
const META_PATTERNS: RegExp[] = [
  /\(\s*음력\s*→\s*양력\s*변환됨\s*\)/g,
  /\(\s*lunar\s*→\s*solar\s*\)/gi,
  /\(\s*변환됨\s*\)/g,
  /\bmeta\s*:\s*\{[^}]*\}/gi,
];

function removeMetaPhrases(text: string): { out: string; removed: number } {
  let removed = 0;
  let out = text;
  for (const re of META_PATTERNS) {
    const m = out.match(re);
    if (m?.length) removed += m.length;
    out = out.replace(re, "");
  }
  out = out.replace(/\s{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  return { out, removed };
}

// --- 2) Hangul particle helper ----------------------------------------------
function hasFinalConsonant(ch: string): boolean {
  if (!ch) return false;
  const code = ch.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return ((code - 0xac00) % 28) !== 0;
}

function lastHangulOrNumber(text: string): string {
  for (let i = text.length - 1; i >= 0; i--) {
    const c = text[i];
    if (/[0-9]/.test(c)) return c;
    if (/[가-힣]/.test(c)) return c;
  }
  return "";
}

function numberHasFinal(_d: string): boolean {
  // Simplified: treat numbers as no-final for smoother output ("로/가/를/는/와")
  return false;
}

function chooseParticle(word: string, pair: "(이)가" | "(을)를" | "(은)는" | "(와)과" | "(으)로"): string {
  const last = lastHangulOrNumber(word);
  const final = /[0-9]/.test(last) ? numberHasFinal(last) : hasFinalConsonant(last);

  if (pair === "(이)가") return final ? "이" : "가";
  if (pair === "(을)를") return final ? "을" : "를";
  if (pair === "(은)는") return final ? "은" : "는";
  if (pair === "(와)과") return final ? "과" : "와";

  if (pair === "(으)로") {
    if (!/[가-힣]/.test(last)) return "로";
    const code = last.charCodeAt(0);
    const jong = (code - 0xac00) % 28;
    if (jong === 8) return "로"; // ㄹ 받침
    return jong !== 0 ? "으로" : "로";
  }
  return "";
}

function fixParticleMarkers(text: string): { out: string; fixes: number } {
  let fixes = 0;
  let out = text;

  // Handle each particle type separately to avoid regex precedence issues
  const particlePatterns: Array<{ re: RegExp; pair: "(이)가" | "(을)를" | "(은)는" | "(와)과" | "(으)로" }> = [
    { re: /([0-9A-Za-z가-힣'""'\)\]]+)\(이\)가/g, pair: "(이)가" },
    { re: /([0-9A-Za-z가-힣'""'\)\]]+)\(을\)를/g, pair: "(을)를" },
    { re: /([0-9A-Za-z가-힣'""'\)\]]+)\(은\)는/g, pair: "(은)는" },
    { re: /([0-9A-Za-z가-힣'""'\)\]]+)\(와\)과/g, pair: "(와)과" },
    { re: /([0-9A-Za-z가-힣'""'\)\]]+)\(으\)로/g, pair: "(으)로" },
  ];

  for (const { re, pair } of particlePatterns) {
    out = out.replace(re, (_, w) => {
      const cleanW = (w as string).replace(/['""'\)\]]+$/g, "");
      const particle = chooseParticle(cleanW, pair);
      fixes += 1;
      return `${w}${particle}`;
    });
  }

  out = out.replace(/\s+([이가를은는와과]|으로|로)/g, "$1");
  return { out, fixes };
}

// --- 3) Sentence splitting + de-duplication ---------------------------------
function normalizeSentence(s: string): string {
  return s
    .replace(/[\s\u200b]+/g, " ")
    .replace(/[“”‘’"']/g, "")
    .replace(/[.!?…]+/g, "")
    .replace(/[,;:]/g, "")
    .trim()
    .toLowerCase();
}

function tokenSet(s: string): Set<string> {
  const cleaned = normalizeSentence(s);
  const toks = cleaned.split(" ").filter(Boolean);
  return new Set(toks);
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size && !b.size) return 1;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  const union = a.size + b.size - inter;
  return union ? inter / union : 0;
}

function splitSentences(text: string): string[] {
  const lines = text.split("\n");
  const out: string[] = [];

  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      out.push("");
      continue;
    }
    if (/^(•|\*|-|🌙|☀️|⭐|😑|💰|🏦)/.test(t)) {
      out.push(line);
      continue;
    }
    const parts = t
      .split(/(?<=[\.\!\?]|다\.|다\?|다\!)(\s+)?/g)
      .map((x) => x.trim())
      .filter(Boolean);

    if (parts.length <= 1) out.push(line);
    else out.push(...parts);
  }
  return out;
}

function dedupeSentences(linesOrSentences: string[]): { out: string[]; removed: number } {
  let removed = 0;
  const out: string[] = [];
  const seen = new Set<string>();
  const recent: Set<string>[] = [];

  for (const s of linesOrSentences) {
    const t = s.trim();
    if (!t) {
      out.push(s);
      continue;
    }
    if (/^(•|\*|-|🌙|☀️|⭐|😑|💰|🏦)/.test(t)) {
      out.push(s);
      continue;
    }

    const norm = normalizeSentence(t);
    if (!norm) {
      out.push(s);
      continue;
    }
    if (seen.has(norm)) {
      removed += 1;
      continue;
    }

    const cur = tokenSet(t);
    let near = false;
    for (let i = Math.max(0, recent.length - 6); i < recent.length; i++) {
      if (jaccard(cur, recent[i]) >= 0.86) {
        near = true;
        break;
      }
    }
    if (near) {
      removed += 1;
      continue;
    }

    seen.add(norm);
    recent.push(cur);
    out.push(s);
  }

  return { out, removed };
}

// --- 4) Soften harsh wording -------------------------------------------------
const SOFTEN_MAP: Array<{ re: RegExp; to: string }> = [
  { re: /탐욕/g, to: "붙잡음" },
  { re: /무조건/g, to: "가능하면" },
  { re: /반드시/g, to: "대체로" },
  { re: /절대/g, to: "웬만하면" },
  { re: /결론\s*내리지만\s*마/g, to: "그 불안만으로 결론을 내리진 말자" },
];

function softenWording(text: string): { out: string; hits: number } {
  let out = text;
  let hits = 0;
  for (const { re, to } of SOFTEN_MAP) {
    const m = out.match(re);
    if (m?.length) hits += m.length;
    out = out.replace(re, to);
  }
  return { out, hits };
}

// --- 5) Merge emotion contradictions (light heuristic) -----------------------
function mergeEmotionBlock(text: string): { out: string; merged: number } {
  let out = text;
  let merged = 0;

  const lines = out.split("\n");
  const head = lines.slice(0, Math.min(10, lines.length)).join("\n");

  if (/(안도)/.test(head) && /(불안)/.test(head)) {
    out = out.replace(
      /(안도[^\n\.\!\?]{0,40})(구간이야\.?)/,
      (_m, p1, p2) => {
        merged += 1;
        return `${p1}${p2} 안도는 잠깐이고, 불안은 잔류할 수 있다.`;
      }
    );
  }
  return { out, merged };
}

// --- Public API --------------------------------------------------------------
export function refineTarotOutput(text: string, options: RefineOptions = {}): RefineResult {
  const opt = { ...DEFAULTS, ...options };

  let out = text ?? "";
  const meta = {
    removed_meta_count: 0,
    particle_fixes: 0,
    deduped_sentences: 0,
    softened_hits: 0,
    merged_emotion_blocks: 0,
  };

  if (opt.removeMeta) {
    const r = removeMetaPhrases(out);
    out = r.out;
    meta.removed_meta_count += r.removed;
  }

  if (opt.mergeEmotion) {
    const r = mergeEmotionBlock(out);
    out = r.out;
    meta.merged_emotion_blocks += r.merged;
  }

  if (opt.soften) {
    const r = softenWording(out);
    out = r.out;
    meta.softened_hits += r.hits;
  }

  if (opt.fixParticles) {
    const r = fixParticleMarkers(out);
    out = r.out;
    meta.particle_fixes += r.fixes;
  }

  if (opt.dedupe) {
    const sentences = splitSentences(out);
    const r = dedupeSentences(sentences);
    out = r.out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
    meta.deduped_sentences += r.removed;
  }

  if (typeof opt.maxLen === "number" && opt.maxLen > 0 && out.length > opt.maxLen) {
    out = out.slice(0, opt.maxLen).trimEnd() + "…";
  }

  out = out.replace(/\s+([,.!?])/g, "$1").replace(/[ \t]{2,}/g, " ").trim();

  return { text: out, meta };
}
