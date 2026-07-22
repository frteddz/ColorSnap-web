import type { CSSProperties } from 'react';

interface ColorSwatchProps {
  color: string;
  className?: string;
}

export function ColorSwatch({ color, className = '' }: ColorSwatchProps) {
  const style: CSSProperties = {
    backgroundColor: color,
    boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.08), 0 4px 24px ${color}40`,
  };

  return (
    <div
      className={`color-swatch ${className}`}
      style={style}
    />
  );
}
