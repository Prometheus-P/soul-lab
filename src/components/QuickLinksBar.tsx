/**
 * QuickLinksBar - Tertiary navigation component
 *
 * Displays icon + label links in a horizontal bar.
 * Used for low-priority actions that don't warrant full buttons.
 */
import React from 'react';
import { useNavigate } from 'react-router';
import { track } from '../lib/analytics';

interface QuickLinkProps {
  icon: string;
  label: string;
  to: string;
  trackEvent?: string;
}

export function QuickLink({ icon, label, to, trackEvent }: QuickLinkProps) {
  const nav = useNavigate();

  const handleClick = () => {
    if (trackEvent) {
      track(trackEvent, { destination: to });
    }
    nav(to);
  };

  return (
    <button className="quick-link" onClick={handleClick} aria-label={label}>
      <span className="quick-link-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="quick-link-label">{label}</span>
    </button>
  );
}

interface QuickLinksBarProps {
  children: React.ReactNode;
}

export function QuickLinksBar({ children }: QuickLinksBarProps) {
  return (
    <nav className="quick-links-bar" aria-label="빠른 링크">
      {children}
    </nav>
  );
}

// Preset quick link buttons for common destinations
export function QuickLinkAIConsult() {
  return <QuickLink icon="🔮" label="AI 상담" to="/consult" trackEvent="quick_link_consult" />;
}

export function QuickLinkTarot() {
  return <QuickLink icon="🃏" label="타로" to="/tarot" trackEvent="quick_link_tarot" />;
}

export function QuickLinkCredits() {
  return <QuickLink icon="💎" label="복채" to="/credits" trackEvent="quick_link_credits" />;
}

export function QuickLinkLeaderboard() {
  return (
    <QuickLink icon="🏆" label="리더보드" to="/leaderboard" trackEvent="quick_link_leaderboard" />
  );
}
