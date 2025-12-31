import React, { useEffect, lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

// Route-based code splitting - lazy load pages for smaller initial bundle
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoadingPage = lazy(() => import('./pages/LoadingPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));
const ChemistryPage = lazy(() => import('./pages/ChemistryPage'));
const AgreementPage = lazy(() => import('./pages/AgreementPage'));
const TarotPage = lazy(() => import('./pages/TarotPage'));
const CreditPage = lazy(() => import('./pages/CreditPage'));
const ConsultPage = lazy(() => import('./pages/ConsultPage'));
// Small pages - keep static import
import NotFoundPage from './pages/NotFoundPage';
import DebugPage from './pages/DebugPage';
import Balatro from './components/Balatro';
import { ToastProvider } from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';

import { captureAttributionFromUrl } from './lib/attribution';
import { updateStreak } from './lib/streak';
import { getAttribution } from './lib/attribution';
import { track } from './lib/analytics';


function Bootstrap() {
  const loc = useLocation();

  useEffect(() => {
    // attribution & retention: on every navigation, but cheap
    captureAttributionFromUrl(loc.search, loc.pathname);
    const s = updateStreak();
    const at = getAttribution();
    track('page_view', { path: loc.pathname, search: loc.search, entryType: at?.entryType, variant: at?.variant, referrerId: at?.referrerId, streak: s });
  }, [loc.key, loc.pathname, loc.search]);

  return (
    <>
      {/* WCAG SC 2.4.1: Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        메인 콘텐츠로 건너뛰기
      </a>
      <Suspense
        fallback={
          <div
            role="status"
            aria-live="polite"
            aria-label="페이지 로딩 중"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              color: '#9370DB',
              fontSize: '18px',
            }}
          >
            <span aria-hidden="true">✨</span> 로딩 중...
          </div>
        }
      >
        {/* WCAG SC 1.3.1: Main landmark for page content */}
        <main id="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/agreement" element={<AgreementPage />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/detail" element={<DetailPage />} />
            <Route path="/chemistry" element={<ChemistryPage />} />
            <Route path="/tarot" element={<TarotPage />} />
            <Route path="/credits" element={<CreditPage />} />
            <Route path="/consult" element={<ConsultPage />} />
            <Route path="/debug" element={<DebugPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastProvider>
          <Balatro
            isRotate={false}
            mouseInteraction={true}
            pixelFilter={1000}
            color1="#2d2850"
            color2="#3d352e"
            color3="#06030a"
            spinSpeed={0.5}
            spinAmount={0.05}
            contrast={1.4}
            lighting={0.12}
            spinEase={0.3}
          />
          <Bootstrap />
        </ToastProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
