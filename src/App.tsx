import { useState, useCallback, lazy, Suspense } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { useTheme } from './hooks/useTheme';
import { LicenseProvider, useLicense } from './licensing/LicenseProvider';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const PickerPage = lazy(() => import('./pages/PickerPage').then(m => ({ default: m.PickerPage })));
const PalettesPage = lazy(() => import('./pages/PalettesPage').then(m => ({ default: m.PalettesPage })));

type Page = 'home' | 'picker' | 'palettes';

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '◈' },
  { id: 'picker', label: 'Picker', icon: '◎' },
  { id: 'palettes', label: 'Palettes', icon: '▣' },
];

export default function App() {
  return <LicenseProvider productKey="ColorSnap"><AppInner /></LicenseProvider>;
}

function AppInner() {
  const [page, setPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingColor, setPendingColor] = useState<string | null>(null);
  const { isDark, toggleTheme } = useTheme();
  const { isPro, loading: proLoading, setShowProModal } = useLicense();

  const handleSaveToPalette = useCallback((color: string) => {
    setPendingColor(color);
    setPage('palettes');
    setMobileMenuOpen(false);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'picker':
        return <PickerPage onSaveToPalette={handleSaveToPalette} />;
      case 'palettes':
        return <PalettesPage key={pendingColor ?? 'default'} initialColor={pendingColor} />;
    }
  };

  return (
    <>
      <AnimatedBackground />
      <button className="mobile-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu"
        style={{ position: 'fixed', top: '0.75rem', left: '0.75rem', zIndex: 110, display: 'none', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)', cursor: 'pointer' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {mobileMenuOpen ? (
            <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
          ) : (
            <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
          )}
        </svg>
      </button>
      <div className="app-layout" style={{ position: 'relative', zIndex: 1 }}>
        {mobileMenuOpen && (
          <div onClick={() => setMobileMenuOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 90 }}
            className="mobile-overlay" />
        )}
        <aside className={'sidebar' + (mobileMenuOpen ? ' open' : '')}>
        <div className="sidebar-brand">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          <span>ColorSnap</span>
            {!proLoading && (
              <span style={{
                fontSize: '0.625rem',
                fontWeight: 600,
                padding: '0.125rem 0.375rem',
                borderRadius: 'var(--radius-sm)',
                background: isPro ? 'var(--color-success-light)' : 'var(--color-warning-light)',
                color: isPro ? 'var(--color-success)' : 'var(--color-warning)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                {isPro ? 'Pro' : 'Free'}
              </span>
            )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-link ${page === item.id ? 'active' : ''}`}
              onClick={() => { setPage(item.id); setMobileMenuOpen(false); }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          {!isPro && (
            <button
              onClick={() => setShowProModal(true)}
              style={{
                width: '100%',
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: 'var(--color-primary)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                marginBottom: '6px',
              }}
            >
              ⭐ Upgrade to Pro
            </button>
          )}
          <button className="sidebar-theme-btn" onClick={toggleTheme} title="Toggle theme">
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Suspense fallback={
          <div className="page-loading">
            <div className="spinner" />
          </div>
        }>
          {renderPage()}
        </Suspense>
      </main>
    </div>
    </>
  );
}
