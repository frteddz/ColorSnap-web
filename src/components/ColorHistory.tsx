import type { CSSProperties } from 'react';

interface ColorHistoryProps {
  colors: string[];
  onSelect: (color: string) => void;
  onClear: () => void;
}

export function ColorHistory({ colors, onSelect, onClear }: ColorHistoryProps) {
  if (colors.length === 0) return null;

  return (
    <div className="color-history">
      <div className="color-history-header">
        <span className="color-history-title">Recent Colors</span>
        <button className="color-history-clear" onClick={onClear}>Clear</button>
      </div>
      <div className="color-history-list">
        {colors.map((color, i) => (
          <button
            key={`${color}-${i}`}
            className="color-history-swatch"
            style={{ backgroundColor: color } as CSSProperties}
            onClick={() => onSelect(color)}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}
