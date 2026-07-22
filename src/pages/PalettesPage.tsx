import { useState, useCallback, type FormEvent } from 'react';
import { PaletteCard } from '../components/PaletteCard';
import { usePalette } from '../hooks/usePalette';
import type { ColorPalette } from '../services/colorService';

interface PalettesPageProps {
  initialColor?: string | null;
}

export function PalettesPage({ initialColor }: PalettesPageProps) {
  const { palettes, createPalette, deletePalette, exportCSS, exportJSON, updatePalette } = usePalette();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newColors, setNewColors] = useState<string[]>(initialColor
    ? [initialColor, '#22c55e', '#f59e0b', '#ef4444', '#3b82f6']
    : ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6']
  );
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(null);

  const handleCreate = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || newColors.length === 0) return;
    createPalette(newName.trim(), newColors);
    setNewName('');
    setShowCreate(false);
  }, [newName, newColors, createPalette]);

  const handleSelect = useCallback((palette: ColorPalette) => {
    setSelectedPalette(palette);
  }, []);

  const handleUpdateName = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!selectedPalette || !newName.trim()) return;
    updatePalette(selectedPalette.id, { name: newName.trim(), colors: newColors });
    setSelectedPalette(null);
    setNewName('');
  }, [selectedPalette, newName, newColors, updatePalette]);

  if (selectedPalette) {
    return (
      <div className="page palettes-page animate-fade-in">
        <button className="btn btn-ghost" onClick={() => setSelectedPalette(null)}>
          &larr; Back
        </button>
        <h2 className="page-title">{selectedPalette.name}</h2>
        <form onSubmit={handleUpdateName} className="palette-edit-form">
          <input
            className="input"
            value={newName || selectedPalette.name}
            onChange={e => setNewName(e.target.value)}
            placeholder="Palette name"
          />
          <div className="palette-edit-colors">
            {newColors.map((c, i) => (
              <div key={i} className="palette-edit-color-row">
                <input
                  type="color"
                  value={c}
                  onChange={e => {
                    const next = [...newColors];
                    next[i] = e.target.value;
                    setNewColors(next);
                  }}
                />
                <input
                  className="input input-sm"
                  value={c}
                  onChange={e => {
                    const next = [...newColors];
                    next[i] = e.target.value;
                    setNewColors(next);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => setNewColors(newColors.filter((_, j) => j !== i))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setNewColors([...newColors, '#6366f1'])}
          >
            + Add Color
          </button>
          <div className="palette-edit-actions">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-ghost" onClick={() => setSelectedPalette(null)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="page palettes-page animate-fade-in">
      <div className="page-header">
        <h2 className="page-title">Palettes</h2>
        <button className="btn btn-primary" onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? 'Cancel' : '+ New Palette'}
        </button>
      </div>

      {showCreate && (
        <form onSubmit={handleCreate} className="palette-create-form animate-slide-up">
          <input
            className="input"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Palette name"
            required
          />
          <div className="palette-create-colors">
            {newColors.map((c, i) => (
              <div key={i} className="palette-create-color">
                <input
                  type="color"
                  value={c}
                  onChange={e => {
                    const next = [...newColors];
                    next[i] = e.target.value;
                    setNewColors(next);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="palette-create-actions">
            <button type="submit" className="btn btn-primary">Create</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setNewColors([...newColors, '#6366f1'])}
            >
              + Add
            </button>
          </div>
        </form>
      )}

      {palettes.length === 0 ? (
        <div className="palettes-empty">
          <p>No palettes yet. Pick some colors and save them!</p>
        </div>
      ) : (
        <div className="palettes-grid">
          {palettes.map(p => (
            <PaletteCard
              key={p.id}
              palette={p}
              onDelete={deletePalette}
              onExportCSS={exportCSS}
              onExportJSON={exportJSON}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
