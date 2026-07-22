import type { CSSProperties } from 'react';
import type { ColorPalette } from '../services/colorService';

interface PaletteCardProps {
  palette: ColorPalette;
  onDelete: (id: string) => void;
  onExportCSS: (palette: ColorPalette) => void;
  onExportJSON: (palette: ColorPalette) => void;
  onSelect: (palette: ColorPalette) => void;
}

export function PaletteCard({ palette, onDelete, onExportCSS, onExportJSON, onSelect }: PaletteCardProps) {
  return (
    <div className="palette-card" onClick={() => onSelect(palette)}>
      <div className="palette-card-swatches">
        {palette.colors.map((color, i) => (
          <div
            key={i}
            className="palette-card-swatch"
            style={{ backgroundColor: color } as CSSProperties}
            title={color}
          />
        ))}
      </div>
      <div className="palette-card-footer">
        <span className="palette-card-name">{palette.name}</span>
        <span className="palette-card-count">{palette.colors.length} colors</span>
      </div>
      <div className="palette-card-actions" onClick={e => e.stopPropagation()}>
        <button className="palette-card-btn" onClick={() => onExportCSS(palette)} title="Export CSS">CSS</button>
        <button className="palette-card-btn" onClick={() => onExportJSON(palette)} title="Export JSON">JSON</button>
        <button className="palette-card-btn palette-card-btn-danger" onClick={() => onDelete(palette.id)} title="Delete palette">Delete</button>
      </div>
    </div>
  );
}
