import React, { Component, ReactNode } from 'react';
import { Button } from '@toss/tds-mobile';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #1a0f2e 0%, #0d0a12 100%)',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.3), rgba(75, 0, 130, 0.5))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              animation: 'error-pulse 2s ease-in-out infinite',
            }}
          >
            <span style={{ fontSize: 40 }}>🌙</span>
          </div>

          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#fff',
              marginBottom: 12,
              textShadow: '0 0 20px rgba(147, 112, 219, 0.5)',
            }}
          >
            별들의 기운이 흐트러졌습니다
          </h1>

          <p
            style={{
              fontSize: 14,
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: 24,
              maxWidth: 280,
              lineHeight: 1.6,
            }}
          >
            잠시 후 다시 시도해 주세요.
            <br />
            문제가 계속되면 앱을 새로고침 해주세요.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 280 }}>
            <Button size="large" color="primary" variant="fill" display="full" onClick={this.handleRetry}>
              다시 시도하기
            </Button>
            <Button size="large" color="dark" variant="weak" display="full" onClick={this.handleReset}>
              처음으로 돌아가기
            </Button>
          </div>

          {import.meta.env.DEV && this.state.error && (
            <div
              style={{
                marginTop: 24,
                padding: 16,
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: 8,
                border: '1px solid rgba(239, 68, 68, 0.3)',
                maxWidth: 320,
                overflow: 'auto',
              }}
            >
              <p style={{ fontSize: 12, color: 'rgba(239, 68, 68, 0.9)', fontFamily: 'monospace' }}>
                {this.state.error.message}
              </p>
            </div>
          )}

          <style>{`
            @keyframes error-pulse {
              0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 20px rgba(147, 112, 219, 0.3);
              }
              50% {
                transform: scale(1.05);
                box-shadow: 0 0 40px rgba(147, 112, 219, 0.5);
              }
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}
