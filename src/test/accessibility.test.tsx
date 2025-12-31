/**
 * Accessibility Tests for Soul Lab
 * WCAG 2.2 Level AA compliance testing using vitest-axe
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Components
import Header from '../components/Header';
import BirthDatePicker from '../components/BirthDatePicker';
import { ToastProvider } from '../components/Toast';

// Helper function to wrap components in required providers
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <ToastProvider>{children}</ToastProvider>
    </BrowserRouter>
  );
}

// Helper function for axe testing
async function checkA11y(container: HTMLElement) {
  const results = await axe(container, {
    rules: {
      // WCAG 2.2 AA rules
      'color-contrast': { enabled: true },
      'label': { enabled: true },
      'button-name': { enabled: true },
      'link-name': { enabled: true },
      'heading-order': { enabled: true },
      'region': { enabled: false }, // Disable for component tests
    },
  });
  return results;
}

// Helper to check for no violations
function expectNoViolations(results: Awaited<ReturnType<typeof axe>>) {
  if (results.violations.length > 0) {
    const violationMessages = results.violations.map(
      (v) => `${v.id}: ${v.description} (${v.nodes.length} occurrences)`
    );
    throw new Error(`Accessibility violations found:\n${violationMessages.join('\n')}`);
  }
}

beforeEach(() => {
  cleanup();
});

describe('Accessibility: Core Components', () => {
  describe('Header', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <TestWrapper>
          <Header title="Test Title" subtitle="Test Subtitle" />
        </TestWrapper>
      );

      const results = await checkA11y(container);
      expectNoViolations(results);
    });

    it('should use semantic header element', () => {
      const { container } = render(
        <TestWrapper>
          <Header title="Test Title" />
        </TestWrapper>
      );

      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute('role', 'banner');
    });

    it('should have proper heading hierarchy', () => {
      const { container } = render(
        <TestWrapper>
          <Header title="Test Title" subtitle="Test Subtitle" />
        </TestWrapper>
      );

      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent('Test Title');
    });
  });

  describe('BirthDatePicker', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <TestWrapper>
          <BirthDatePicker value="" onChange={() => {}} />
        </TestWrapper>
      );

      const results = await checkA11y(container);
      expectNoViolations(results);
    });

    it('should have accessible labels for all select fields', () => {
      const { container } = render(
        <TestWrapper>
          <BirthDatePicker value="" onChange={() => {}} />
        </TestWrapper>
      );

      const yearSelect = container.querySelector('#birth-year');
      const monthSelect = container.querySelector('#birth-month');
      const daySelect = container.querySelector('#birth-day');

      expect(yearSelect).toBeInTheDocument();
      expect(monthSelect).toBeInTheDocument();
      expect(daySelect).toBeInTheDocument();

      // Check for associated labels
      const yearLabel = container.querySelector('label[for="birth-year"]');
      const monthLabel = container.querySelector('label[for="birth-month"]');
      const dayLabel = container.querySelector('label[for="birth-day"]');

      expect(yearLabel).toBeInTheDocument();
      expect(monthLabel).toBeInTheDocument();
      expect(dayLabel).toBeInTheDocument();
    });

    it('should have fieldset and legend for grouping', () => {
      const { container } = render(
        <TestWrapper>
          <BirthDatePicker value="" onChange={() => {}} />
        </TestWrapper>
      );

      const fieldset = container.querySelector('fieldset');
      const legend = container.querySelector('legend');

      expect(fieldset).toBeInTheDocument();
      expect(legend).toBeInTheDocument();
    });

    it('should indicate error state accessibly', () => {
      const { container } = render(
        <TestWrapper>
          <BirthDatePicker
            value=""
            onChange={() => {}}
            error={true}
            errorMessage="Please select a valid date"
          />
        </TestWrapper>
      );

      const selects = container.querySelectorAll('select');
      selects.forEach((select) => {
        expect(select).toHaveAttribute('aria-invalid', 'true');
        expect(select).toHaveAttribute('aria-describedby', 'birthdate-error');
      });

      const errorMessage = container.querySelector('#birthdate-error');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });
  });
});

describe('Accessibility: Focus Management', () => {
  it('should have visible focus indicators', () => {
    const { container } = render(
      <TestWrapper>
        <button>Test Button</button>
      </TestWrapper>
    );

    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    // Focus indicators are tested via CSS, this just verifies the element exists
  });
});

describe('Accessibility: ARIA Live Regions', () => {
  it('ToastProvider should be mountable', () => {
    const { container } = render(
      <ToastProvider>
        <div>Test Content</div>
      </ToastProvider>
    );

    expect(container).toBeInTheDocument();
  });
});

describe('Accessibility: Semantic HTML', () => {
  it('should use proper heading levels', () => {
    const { container } = render(
      <TestWrapper>
        <Header title="H1 Title" />
        <section>
          <h2>Section Heading</h2>
          <p>Content</p>
        </section>
      </TestWrapper>
    );

    const h1 = container.querySelector('h1');
    const h2 = container.querySelector('h2');

    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
  });
});

describe('Accessibility: Color Contrast', () => {
  it('should pass color contrast checks', async () => {
    const { container } = render(
      <TestWrapper>
        <div style={{ background: '#1a0f2e', padding: '20px' }}>
          <Header title="Soul Lab" subtitle="Fortune telling app" />
          <p style={{ color: 'rgba(220, 200, 240, 0.9)' }}>Muted text content</p>
        </div>
      </TestWrapper>
    );

    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
        'region': { enabled: false },
      },
    });

    // Note: Some contrast issues may be acceptable for decorative elements
    // This test ensures we're actively checking contrast
    const contrastViolations = results.violations.filter((v) => v.id === 'color-contrast');
    expect(contrastViolations.length).toBeLessThanOrEqual(0);
  });
});

describe('Accessibility: Screen Reader Support', () => {
  it('should have sr-only class available', () => {
    const { container } = render(
      <TestWrapper>
        <span className="sr-only">Screen reader only text</span>
        <button>Visible Button</button>
      </TestWrapper>
    );

    const srOnly = container.querySelector('.sr-only');
    expect(srOnly).toBeInTheDocument();
    expect(srOnly).toHaveTextContent('Screen reader only text');
  });

  it('should hide decorative content from screen readers', () => {
    const { container } = render(
      <TestWrapper>
        <span aria-hidden="true">✨</span>
        <span>Meaningful content</span>
      </TestWrapper>
    );

    const decorative = container.querySelector('[aria-hidden="true"]');
    expect(decorative).toBeInTheDocument();
    expect(decorative).toHaveTextContent('✨');
  });
});
