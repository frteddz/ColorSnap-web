import { useState, useCallback } from 'react';
import {
  ColorPalette,
  loadPalettes,
  savePalettes,
  generateCSS,
  generateJSON,
  downloadText,
  generateId,
} from '../services/colorService';

export function usePalette() {
  const [palettes, setPalettes] = useState<ColorPalette[]>(loadPalettes);

  const refresh = useCallback(() => {
    setPalettes(loadPalettes());
  }, []);

  const createPalette = useCallback((name: string, colors: string[]) => {
    const newPalette: ColorPalette = {
      id: generateId(),
      name,
      colors,
      createdAt: Date.now(),
    };
    const updated = [newPalette, ...palettes];
    setPalettes(updated);
    savePalettes(updated);
  }, [palettes]);

  const deletePalette = useCallback((id: string) => {
    const updated = palettes.filter(p => p.id !== id);
    setPalettes(updated);
    savePalettes(updated);
  }, [palettes]);

  const updatePalette = useCallback((id: string, updates: Partial<ColorPalette>) => {
    const updated = palettes.map(p => p.id === id ? { ...p, ...updates } : p);
    setPalettes(updated);
    savePalettes(updated);
  }, [palettes]);

  const exportCSS = useCallback((palette: ColorPalette) => {
    const css = generateCSS(palette);
    const name = palette.name.replace(/\s+/g, '-').toLowerCase();
    downloadText(css, `${name}.css`, 'text/css');
  }, []);

  const exportJSON = useCallback((palette: ColorPalette) => {
    const json = generateJSON(palette);
    const name = palette.name.replace(/\s+/g, '-').toLowerCase();
    downloadText(json, `${name}.json`, 'application/json');
  }, []);

  return {
    palettes,
    createPalette,
    deletePalette,
    updatePalette,
    exportCSS,
    exportJSON,
    refresh,
  };
}
