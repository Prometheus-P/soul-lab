import React from 'react';

/**
 * Semantic page header component
 * WCAG SC 1.3.1: Uses proper heading hierarchy and header landmark
 */
export default function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header role="banner" style={{ marginBottom: 16, textAlign: 'center' }}>
      <h1 className="h1 mystical-title" style={{ fontSize: 26 }}>{title}</h1>
      {subtitle ? <p className="p" style={{ marginTop: 6 }}>{subtitle}</p> : null}
    </header>
  );
}
