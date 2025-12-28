import { parse } from 'yaml';
import rawYaml from './fortuneTemplates.yaml?raw';

type FortuneTemplate = {
  id: string;
  open: {
    oneLiner: string;
    summary: string;
  };
  locked: {
    luckyTime: string;
    helper: string;
    caution: string;
    moneyDetail: string;
    loveDetail: string;
    conditionDetail: string;
  };
};

const data = parse(rawYaml) as { templates: FortuneTemplate[] };
export const FORTUNE_TEMPLATES = data.templates;
