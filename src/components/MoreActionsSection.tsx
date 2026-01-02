/**
 * MoreActionsSection - 스크롤 하단 더보기 영역
 *
 * Primary CTA 아래에 배치되는 secondary/tertiary 액션들.
 * 시각적 구분선으로 분리되어 decision fatigue 감소.
 */
import React from 'react';
import { Button } from '@toss/tds-mobile';
import {
  QuickLinksBar,
  QuickLinkAIConsult,
  QuickLinkTarot,
  QuickLinkCredits,
} from './QuickLinksBar';

interface MoreActionsSectionProps {
  /** 친구 궁합/초대 클릭 핸들러 */
  onChemistry: () => void;
  /** 공유하기 클릭 핸들러 */
  onShare: () => void;
  /** 복채 퀵링크 표시 여부 (Unlocked에서만) */
  showCredits?: boolean;
  /** 친구 버튼 라벨 (Unlocked: "친구 궁합", Locked: "친구 초대") */
  chemistryLabel?: string;
}

export default function MoreActionsSection({
  onChemistry,
  onShare,
  showCredits = false,
  chemistryLabel = '💕 친구 궁합',
}: MoreActionsSectionProps) {
  return (
    <section className="more-section" aria-label="더보기">
      <div className="more-section-header">더보기</div>

      {/* Secondary 버튼들 */}
      <div className="action-row">
        <Button size="small" color="primary" variant="weak" onClick={onChemistry}>
          {chemistryLabel}
        </Button>
        <Button size="small" color="dark" variant="weak" onClick={onShare}>
          📤 공유하기
        </Button>
      </div>

      {/* Tertiary 퀵링크 */}
      <QuickLinksBar>
        <QuickLinkAIConsult />
        <QuickLinkTarot />
        {showCredits && <QuickLinkCredits />}
      </QuickLinksBar>
    </section>
  );
}
