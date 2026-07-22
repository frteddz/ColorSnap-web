import { useCallback } from 'react';
import { ColorSwatch } from '../components/ColorSwatch';
import { ColorValues } from '../components/ColorValues';
import { ColorPicker } from '../components/ColorPicker';
import { EyeDropper } from '../components/EyeDropper';
import { ColorHistory } from '../components/ColorHistory';
import { useColorPicker } from '../hooks/useColorPicker';

interface PickerPageProps {
  onSaveToPalette: (color: string) => void;
}

export function PickerPage({ onSaveToPalette }: PickerPageProps) {
  const {
    color,
    setColor,
    hsl,
    hexDisplay,
    rgbDisplay,
    hslDisplay,
    history,
    addToHistory,
    clearHistory,
  } = useColorPicker('#6366f1');

  const handleEyeDropper = useCallback((picked: string) => {
    setColor(picked);
  }, [setColor]);

  const handleHistorySelect = useCallback((c: string) => {
    setColor(c);
  }, [setColor]);

  const handleSave = useCallback(() => {
    addToHistory();
    onSaveToPalette(color);
  }, [addToHistory, onSaveToPalette, color]);

  return (
    <div className="page picker-page animate-fade-in">
      <div className="picker-main">
        <ColorSwatch color={color} />
        <ColorValues hex={hexDisplay} rgb={rgbDisplay} hsl={hslDisplay} />
      </div>

      <div className="picker-controls">
        <ColorPicker color={color} hsl={hsl} onChange={setColor} />

        <div className="picker-actions">
          <EyeDropper onPick={handleEyeDropper} />
          <button className="btn btn-primary" onClick={handleSave}>
            Save to Palette
          </button>
        </div>

        <ColorHistory
          colors={history}
          onSelect={handleHistorySelect}
          onClear={clearHistory}
        />
      </div>
    </div>
  );
}
