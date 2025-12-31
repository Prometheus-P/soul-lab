import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type ToastType = 'info' | 'success' | 'error' | 'warning';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastId = 0;

// Global toast function for use outside React components
type ToastCallback = (message: string, type?: ToastType) => void;
let globalShowToast: ToastCallback | null = null;

export function toast(message: string, type: ToastType = 'info') {
  if (globalShowToast) {
    globalShowToast(message, type);
  } else {
    // Fallback to alert if toast provider is not mounted
    console.warn('[Toast] Provider not mounted, falling back to console.log');
    console.log(`[${type}] ${message}`);
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // Register global toast function
  useEffect(() => {
    globalShowToast = showToast;
    return () => {
      globalShowToast = null;
    };
  }, [showToast]);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

/**
 * Toast container component
 * WCAG SC 4.1.3: Status Messages - Uses aria-live for screen reader announcements
 */
function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="알림"
      aria-live="polite"
      aria-atomic="false"
      style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: '90%',
        maxWidth: 400,
      }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </div>
  );
}

/**
 * Individual toast item
 * WCAG SC 2.1.1: Keyboard - Supports Enter/Space to dismiss
 * WCAG SC 4.1.2: Name, Role, Value - Uses role="alert" for important messages
 */
function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExiting(true), 2700);
    return () => clearTimeout(timer);
  }, []);

  // WCAG SC 2.1.1: Keyboard support
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') {
      event.preventDefault();
      onDismiss();
    }
  }, [onDismiss]);

  const getTypeStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.95), rgba(22, 163, 74, 0.95))',
          icon: '✓',
          ariaLabel: '성공',
        };
      case 'error':
        return {
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95))',
          icon: '✕',
          ariaLabel: '오류',
        };
      case 'warning':
        return {
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.95), rgba(217, 119, 6, 0.95))',
          icon: '⚠',
          ariaLabel: '경고',
        };
      default:
        return {
          background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.95), rgba(107, 70, 193, 0.95))',
          icon: '✨',
          ariaLabel: '알림',
        };
    }
  };

  const styles = getTypeStyles();
  // Use role="alert" for errors/warnings, role="status" for info/success
  const role = toast.type === 'error' || toast.type === 'warning' ? 'alert' : 'status';

  return (
    <div
      role={role}
      tabIndex={0}
      onClick={onDismiss}
      onKeyDown={handleKeyDown}
      aria-label={`${styles.ariaLabel}: ${toast.message}. 닫으려면 Enter 또는 Space 키를 누르세요.`}
      style={{
        padding: '12px 16px',
        borderRadius: 12,
        background: styles.background,
        color: 'white',
        fontSize: 14,
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',
        animation: isExiting ? 'toast-exit 0.3s ease forwards' : 'toast-enter 0.3s ease',
      }}
    >
      <span style={{ fontSize: 16 }} aria-hidden="true">{styles.icon}</span>
      <span style={{ flex: 1 }}>{toast.message}</span>
      <span style={{ opacity: 0.7, fontSize: 12 }} aria-hidden="true">닫기</span>

      <style>{`
        @keyframes toast-enter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes toast-exit {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
