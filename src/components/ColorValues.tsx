import { useState, useCallback } from 'react';

interface ColorValueRowProps {
  label: string;
  value: string;
}

function ColorValueRow({ label, value }: ColorValueRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  }, [value]);

  return (
    <div className="color-value-row">
      <span className="color-value-label">{label}</span>
      <code className="color-value-code">{value}</code>
      <button
        className={`color-value-copy ${copied ? 'copied' : ''}`}
        onClick={handleCopy}
        title={`Copy ${label}`}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

interface ColorValuesProps {
  hex: string;
  rgb: string;
  hsl: string;
}

export function ColorValues({ hex, rgb, hsl }: ColorValuesProps) {
  return (
    <div className="color-values">
      <ColorValueRow label="HEX" value={hex} />
      <ColorValueRow label="RGB" value={rgb} />
      <ColorValueRow label="HSL" value={hsl} />
    </div>
  );
}
