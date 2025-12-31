// Mock for @toss/tds-mobile (local development only)
// These are simplified versions of TDS components for development/testing
import React from 'react';

// ============ Button ============
interface ButtonProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?: 'primary' | 'dark' | 'danger' | 'light';
  variant?: 'fill' | 'weak';
  display?: 'inline' | 'block' | 'full';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  style?: React.CSSProperties;
}

export function Button({
  children,
  size = 'medium',
  color = 'primary',
  variant = 'fill',
  display = 'block',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  style,
}: ButtonProps) {
  // WCAG SC 2.5.8: Target Size - minimum 24x24px, recommended 44x44px for touch
  const sizeStyles: Record<string, React.CSSProperties> = {
    small: { padding: '10px 14px', fontSize: 13, minHeight: 44 },
    medium: { padding: '12px 16px', fontSize: 14, minHeight: 44 },
    large: { padding: '14px 20px', fontSize: 15, minHeight: 48 },
    xlarge: { padding: '16px 24px', fontSize: 16, minHeight: 52 },
  };

  const colorStyles: Record<string, Record<string, React.CSSProperties>> = {
    fill: {
      primary: {
        background: 'linear-gradient(135deg, #7c3aed 0%, #9370db 50%, #a855f7 100%)',
        color: 'white',
        border: 'none',
        boxShadow: '0 0 20px rgba(147, 112, 219, 0.4)',
      },
      dark: { background: 'rgba(26, 15, 46, 0.9)', color: 'white', border: '1px solid rgba(147, 112, 219, 0.3)' },
      danger: { background: '#f04452', color: 'white', border: 'none' },
      light: { background: 'white', color: '#191f28', border: 'none' },
    },
    weak: {
      primary: { background: 'rgba(147, 112, 219, 0.15)', color: '#9370db', border: '1px solid rgba(147, 112, 219, 0.3)' },
      dark: { background: 'rgba(26, 15, 46, 0.5)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(147, 112, 219, 0.2)' },
      danger: { background: 'rgba(240,68,82,0.1)', color: '#f04452', border: 'none' },
      light: { background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none' },
    },
  };

  const displayStyles: Record<string, React.CSSProperties> = {
    inline: { display: 'inline-flex', width: 'auto' },
    block: { display: 'flex', width: 'auto' },
    full: { display: 'flex', width: '100%' },
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        borderRadius: 12,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...sizeStyles[size],
        ...colorStyles[variant][color],
        ...displayStyles[display],
        ...style,
      }}
    >
      {loading ? '로딩 중...' : children}
    </button>
  );
}

// ============ Badge ============
interface BadgeProps {
  children: React.ReactNode;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  color?: 'blue' | 'teal' | 'green' | 'red' | 'gray';
  variant?: 'fill' | 'weak';
  style?: React.CSSProperties;
}

export function Badge({
  children,
  size = 'small',
  color = 'blue',
  variant = 'fill',
  style,
}: BadgeProps) {
  const sizeStyles: Record<string, React.CSSProperties> = {
    xsmall: { padding: '2px 6px', fontSize: 11 },
    small: { padding: '4px 8px', fontSize: 12 },
    medium: { padding: '6px 10px', fontSize: 13 },
    large: { padding: '8px 12px', fontSize: 14 },
  };

  const colorMap: Record<string, string> = {
    blue: '#9370db',
    teal: '#00b8d9',
    green: '#22c55e',
    red: '#f04452',
    gray: '#6b7280',
  };

  const baseColor = colorMap[color];
  const bgColor = variant === 'fill' ? baseColor : `${baseColor}20`;
  const textColor = variant === 'fill' ? 'white' : baseColor;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 999,
        fontWeight: 600,
        background: bgColor,
        color: textColor,
        ...sizeStyles[size],
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// ============ AgreementV4 ============
interface AgreementSingleCheckboxFieldProps {
  children: string;
  type?: 'medium' | 'medium-bold' | 'big';
  necessity?: 'none' | 'mandatory' | 'optional';
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  arrowType?: 'none' | 'link' | 'collapsible';
  indent?: number;
}

function AgreementSingleCheckboxField({
  children,
  type = 'medium',
  necessity = 'none',
  checked = false,
  onCheckedChange,
  indent = 0,
}: AgreementSingleCheckboxFieldProps) {
  const necessityLabel = {
    none: '',
    mandatory: '[필수] ',
    optional: '[선택] ',
  };

  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '12px 0',
        marginLeft: indent * 16,
        cursor: 'pointer',
      }}
    >
      {/* WCAG SC 2.5.8: Target Size - minimum 24x24px */}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        style={{ marginTop: 2, width: 24, height: 24, accentColor: '#9370db' }}
      />
      <span
        style={{
          fontSize: type === 'big' ? 16 : 14,
          fontWeight: type === 'medium-bold' ? 600 : 400,
          color: 'inherit',
        }}
      >
        <span style={{ color: necessity === 'mandatory' ? '#f04452' : '#8b95a1' }}>
          {necessityLabel[necessity]}
        </span>
        {children}
      </span>
    </label>
  );
}

interface AgreementDescriptionProps {
  children: React.ReactNode;
  indent?: number;
}

function AgreementDescription({ children, indent = 0 }: AgreementDescriptionProps) {
  return (
    <div
      style={{
        fontSize: 13,
        color: 'rgba(255,255,255,0.6)',
        marginLeft: indent * 16 + 32,
        lineHeight: 1.5,
      }}
    >
      {children}
    </div>
  );
}

interface AgreementButtonProps {
  children: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  inputType?: 'checkbox' | 'radio';
}

function AgreementButton({
  children,
  checked = false,
  onCheckedChange,
}: AgreementButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange?.(!checked)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        padding: '16px',
        background: checked ? 'rgba(49,130,246,0.1)' : 'rgba(255,255,255,0.06)',
        border: checked ? '1px solid rgba(49,130,246,0.3)' : '1px solid rgba(255,255,255,0.1)',
        borderRadius: 12,
        color: 'inherit',
        fontSize: 15,
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: checked ? '#3182f6' : 'transparent',
          border: checked ? 'none' : '2px solid rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 14,
        }}
      >
        {checked ? '✓' : ''}
      </span>
      {children}
    </button>
  );
}

export const AgreementV4 = {
  SingleCheckboxField: AgreementSingleCheckboxField,
  Description: AgreementDescription,
  Button: AgreementButton,
};

// ============ BottomSheet ============
interface BottomSheetProps {
  open: boolean;
  onClose?: () => void;
  header?: React.ReactNode;
  headerDescription?: React.ReactNode;
  cta?: React.ReactNode;
  children?: React.ReactNode;
}

function BottomSheetComponent({
  open,
  onClose,
  header,
  headerDescription,
  cta,
  children,
}: BottomSheetProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          background: '#1a1a2e',
          borderRadius: '24px 24px 0 0',
          padding: 24,
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
        {header}
        {headerDescription}
        <div style={{ marginTop: 16 }}>{children}</div>
        {cta && <div style={{ marginTop: 24 }}>{cta}</div>}
      </div>
    </div>
  );
}

function BottomSheetHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{children}</div>
  );
}

function BottomSheetHeaderDescription({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
      {children}
    </div>
  );
}

function BottomSheetCTA({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <Button size="large" color="primary" variant="fill" display="full" onClick={onClick}>
      {label}
    </Button>
  );
}

function BottomSheetDoubleCTA({
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
}: {
  primaryLabel: string;
  secondaryLabel: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Button size="large" color="primary" variant="fill" display="full" onClick={onPrimaryClick}>
        {primaryLabel}
      </Button>
      <Button size="large" color="dark" variant="weak" display="full" onClick={onSecondaryClick}>
        {secondaryLabel}
      </Button>
    </div>
  );
}

export const BottomSheet = Object.assign(BottomSheetComponent, {
  Header: BottomSheetHeader,
  HeaderDescription: BottomSheetHeaderDescription,
  CTA: BottomSheetCTA,
  DoubleCTA: BottomSheetDoubleCTA,
});

// ============ TextField ============
interface TextFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  variant?: 'box' | 'line' | 'big' | 'hero';
  error?: boolean;
  errorMessage?: string;
  inputMode?: 'text' | 'numeric' | 'tel' | 'email';
  maxLength?: number;
  style?: React.CSSProperties;
}

export function TextField({
  value = '',
  onChange,
  placeholder,
  variant = 'box',
  error = false,
  errorMessage,
  inputMode = 'text',
  maxLength,
  style,
}: TextFieldProps) {
  const variantStyles: Record<string, React.CSSProperties> = {
    box: { padding: '14px 16px', borderRadius: 12 },
    line: { padding: '14px 0', borderRadius: 0, borderBottom: '1px solid rgba(255,255,255,0.2)' },
    big: { padding: '18px 20px', borderRadius: 14, fontSize: 18 },
    hero: { padding: '24px', borderRadius: 16, fontSize: 24 },
  };

  return (
    <div>
      {/* WCAG SC 2.4.7: Focus Visible - uses global focus-visible styles */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error && errorMessage ? 'textfield-error' : undefined}
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.06)',
          border: error ? '1px solid #f04452' : '1px solid rgba(255,255,255,0.1)',
          color: 'inherit',
          fontSize: 16,
          ...variantStyles[variant],
          ...style,
        }}
      />
      {error && errorMessage && (
        <div id="textfield-error" role="alert" style={{ marginTop: 8, fontSize: 13, color: '#f04452' }}>{errorMessage}</div>
      )}
    </div>
  );
}

// ============ Spinner ============
export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: '2px solid rgba(255,255,255,0.2)',
        borderTopColor: '#3182f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
  );
}

// Re-export TDSMobileAITProvider for compatibility
export function TDSMobileAITProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
