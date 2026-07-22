import { useCallback, type ChangeEvent } from 'react';
import { hslToHex } from '../utils/colorUtils';
import type { HSLColor } from '../utils/colorUtils';

interface ColorPickerProps {
  color: string;
  hsl: HSLColor | null;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, hsl, onChange }: ColorPickerProps) {
  const handleNativeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  const handleHueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (hsl) {
      const hex = hslToHex(Number(e.target.value), hsl.s, hsl.l);
      onChange(hex);
    }
  }, [hsl, onChange]);

  const handleSatChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (hsl) {
      const hex = hslToHex(hsl.h, Number(e.target.value), hsl.l);
      onChange(hex);
    }
  }, [hsl, onChange]);

  const handleLightChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (hsl) {
      const hex = hslToHex(hsl.h, hsl.s, Number(e.target.value));
      onChange(hex);
    }
  }, [hsl, onChange]);

  return (
    <div className="color-picker">
      <div className="color-picker-native">
        <label className="color-picker-label">Color</label>
        <input
          type="color"
          value={color}
          onChange={handleNativeChange}
          className="color-picker-input"
        />
      </div>

      <div className="color-picker-sliders">
        <div className="slider-group">
          <label className="slider-label">Hue <span>{hsl?.h ?? 0}°</span></label>
          <input
            type="range"
            min={0}
            max={360}
            value={hsl?.h ?? 0}
            onChange={handleHueChange}
            className="slider slider-hue"
          />
        </div>
        <div className="slider-group">
          <label className="slider-label">Saturation <span>{hsl?.s ?? 0}%</span></label>
          <input
            type="range"
            min={0}
            max={100}
            value={hsl?.s ?? 0}
            onChange={handleSatChange}
            className="slider slider-sat"
          />
        </div>
        <div className="slider-group">
          <label className="slider-label">Lightness <span>{hsl?.l ?? 0}%</span></label>
          <input
            type="range"
            min={0}
            max={100}
            value={hsl?.l ?? 0}
            onChange={handleLightChange}
            className="slider slider-light"
          />
        </div>
      </div>
    </div>
  );
}
