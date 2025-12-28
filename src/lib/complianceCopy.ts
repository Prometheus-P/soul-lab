import { parse } from 'yaml';
import rawYaml from '../data/complianceCopy.yaml?raw';

type ComplianceCopyType = {
  headline: string;
  sub: string;
  bullets: string[];
  termsTitle: string;
  thirdTitle: string;
  marketingTitle: string;
  birthTitle: string;
  birthHint: string;
  privacyFoot: string;
  thirdExplain: string[];
};

export const COMPLIANCE_COPY = parse(rawYaml) as ComplianceCopyType;
