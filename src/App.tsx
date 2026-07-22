import { useState, useCallback, lazy, Suspense } from 'react';
import { useTheme } from './hooks/useTheme';

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
  const [page, setPage] = useState<Page>('home');
  const [pendingColor, setPendingColor] = useState<string | null>(null);
  const { isDark, toggleTheme } = useTheme();

  const handleSaveToPalette = useCallback((color: string) => {
    setPendingColor(color);
    setPage('palettes');
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
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          <span>ColorSnap</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-link ${page === item.id ? 'active' : ''}`}
              onClick={() => setPage(item.id)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
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
  );
}
