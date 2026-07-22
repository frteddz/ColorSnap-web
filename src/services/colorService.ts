export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  createdAt: number;
}

const STORAGE_KEY = 'colorsnap_palettes';

export function loadPalettes(): ColorPalette[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function savePalettes(palettes: ColorPalette[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(palettes));
}

export function generateCSS(palette: ColorPalette): string {
  const lines = [`/* ${palette.name} */`];
  palette.colors.forEach((color, i) => {
    lines.push(`--color-${i + 1}: ${color};`);
  });
  lines.push('');
  palette.colors.forEach((color, i) => {
    lines.push(`.swatch-${i + 1} { background-color: ${color}; }`);
  });
  return lines.join('\n');
}

export function generateJSON(palette: ColorPalette): string {
  return JSON.stringify({ name: palette.name, colors: palette.colors }, null, 2);
}

export function downloadText(content: string, filename: string, mime = 'text/plain'): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
