import { useState, useCallback, useMemo } from 'react';
import { hexToRgb, rgbToHsl, formatColor, isValidHex } from '../utils/colorUtils';

const HISTORY_KEY = 'colorsnap_history';
const MAX_HISTORY = 20;

function loadHistory(): string[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: string[]): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function useColorPicker(initialColor = '#6366f1') {
  const [color, setColorState] = useState(initialColor);
  const [history, setHistoryState] = useState<string[]>(loadHistory);

  const rgb = useMemo(() => hexToRgb(color), [color]);
  const hsl = useMemo(() => rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null, [rgb]);

  const hexDisplay = useMemo(() => formatColor(color, 'hex'), [color]);
  const rgbDisplay = useMemo(() => formatColor(color, 'rgb'), [color]);
  const hslDisplay = useMemo(() => formatColor(color, 'hsl'), [color]);

  const setColor = useCallback((newColor: string) => {
    if (isValidHex(newColor)) setColorState(newColor);
  }, []);

  const addToHistory = useCallback(() => {
    setHistoryState(prev => {
      const filtered = prev.filter(c => c.toLowerCase() !== color.toLowerCase());
      const next = [color, ...filtered].slice(0, MAX_HISTORY);
      saveHistory(next);
      return next;
    });
  }, [color]);

  const clearHistory = useCallback(() => {
    setHistoryState([]);
    saveHistory([]);
  }, []);

  return {
    color,
    setColor,
    rgb,
    hsl,
    hexDisplay,
    rgbDisplay,
    hslDisplay,
    history,
    addToHistory,
    clearHistory,
  };
}
