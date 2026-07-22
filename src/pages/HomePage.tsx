export function HomePage() {
  const features = [
    { icon: '🎨', title: 'Screen Color Picker', desc: 'Pick any color from your screen with the eyedropper tool' },
    { icon: '#', title: 'HEX, RGB & HSL', desc: 'View and copy colors in multiple formats with one click' },
    { icon: '📋', title: 'Palette History', desc: 'Save and organize your favorite color combinations' },
    { icon: '📦', title: 'Export', desc: 'Export palettes as CSS variables or JSON files' },
  ];

  return (
    <div className="page home-page animate-fade-in">
      <div className="home-hero">
        <div className="home-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        </div>
        <h1 className="home-title">ColorSnap</h1>
        <p className="home-subtitle">Color Picker Utility</p>
        <p className="home-desc">
          A modern desktop color picker for designers and developers.
          Pick, save, and export colors with ease.
        </p>
      </div>

      <div className="home-features">
        {features.map((f, i) => (
          <div key={i} className="home-feature-card animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
            <span className="home-feature-icon">{f.icon}</span>
            <h3 className="home-feature-title">{f.title}</h3>
            <p className="home-feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
