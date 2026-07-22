import { useCallback, useState } from 'react';

interface EyeDropperProps {
  onPick: (color: string) => void;
}

export function EyeDropper({ onPick }: EyeDropperProps) {
  const [supported] = useState(() => 'EyeDropper' in window);
  const [active, setActive] = useState(false);

  const handlePick = useCallback(async () => {
    if (!supported) return;
    try {
      setActive(true);
      const EyeDropperAPI = (window as unknown as { EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper;
      const eyeDropper = new EyeDropperAPI();
      const result = await eyeDropper.open();
      onPick(result.sRGBHex);
    } catch {
      // user cancelled
    } finally {
      setActive(false);
    }
  }, [supported, onPick]);

  if (!supported) return null;

  return (
    <button
      className={`eye-dropper-btn ${active ? 'active' : ''}`}
      onClick={handlePick}
      disabled={active}
      title="Pick color from screen"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22l1-1h3l9-9" />
        <path d="M3 21l9-9" />
        <circle cx="17" cy="7" r="3" />
      </svg>
      {active ? 'Pick...' : 'Eyedropper'}
    </button>
  );
}
