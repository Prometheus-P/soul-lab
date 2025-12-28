import { parse } from 'yaml';
import rawYaml from '../data/copyVariants.yaml?raw';
import type { Variant } from './variant';

export type CopyPack = {
  landingSubtitle: string;
  startCta: string;
  shareDaily: (link: string) => string;
  shareChemistry: (link: string) => string;
  lockReason: string;
  unlockedReason: string;
};

type RawCopyPack = {
  landingSubtitle: string;
  startCta: string;
  shareDaily: string;
  shareChemistry: string;
  lockReason: string;
  unlockedReason: string;
};

const data = parse(rawYaml) as { A: RawCopyPack; B: RawCopyPack };

function toCopyPack(raw: RawCopyPack): CopyPack {
  return {
    landingSubtitle: raw.landingSubtitle,
    startCta: raw.startCta,
    shareDaily: (link: string) => raw.shareDaily.replace('{link}', link),
    shareChemistry: (link: string) => raw.shareChemistry.replace('{link}', link),
    lockReason: raw.lockReason,
    unlockedReason: raw.unlockedReason,
  };
}

export function copyFor(v: Variant): CopyPack {
  return v === 'A' ? toCopyPack(data.A) : toCopyPack(data.B);
}
