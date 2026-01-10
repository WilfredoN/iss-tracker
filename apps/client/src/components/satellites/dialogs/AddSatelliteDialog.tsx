import { useState, useCallback } from 'react';
import { useOutsideClicks } from '../../../hooks/useOutsideClicks';
import { Input, Button } from '../../ui';
import type { AddSatelliteData } from '../../../types';
import { parseTLEPaste } from './tleHelpers';

type AddSatelliteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (data: AddSatelliteData) => void;
};

export const AddSatelliteDialog = ({ open, onOpenChange, onAdd }: AddSatelliteDialogProps) => {
  const [form, setForm] = useState<AddSatelliteData>({ name: '', tle1: '', tle2: '' });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handlePaste = useCallback(
    (field: keyof AddSatelliteData) => (e: React.ClipboardEvent<HTMLInputElement>) => {
      const text = e.clipboardData.getData('text');
      const parsed = parseTLEPaste(text, field, form);
      if (parsed !== form) {
        e.preventDefault();
        setForm(parsed);
      }
    },
    [form],
  );

  const handleAdd = useCallback(() => {
    if (form.name && form.tle1 && form.tle2) {
      onAdd(form);
      setForm({ name: '', tle1: '', tle2: '' });
      onOpenChange(false);
    }
  }, [form, onAdd, onOpenChange]);

  const handleClose = useCallback(() => onOpenChange(false), [onOpenChange]);
  const isValid = form.name && form.tle1 && form.tle2;

  const dialogRef = useOutsideClicks<HTMLDivElement>(() => {
    if (open) onOpenChange(false);
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div
        ref={dialogRef}
        className="animate-fade-in border-(--foreground) bg-(--panel-bg) shadow-(--glow-strong) relative w-full max-w-md border-2 p-6"
      >
        <h2 className="border-(--foreground) text-(--foreground) border-b-2 pb-2 text-lg font-bold uppercase tracking-widest">
          &gt; ADD SATELLITE
        </h2>
        <button
          aria-label="Close"
          onClick={handleClose}
          className="text-(--foreground) hover:text-(--destructive) absolute right-4 top-4 cursor-pointer text-2xl font-bold transition-colors focus:outline-none"
        >
          ×
        </button>
        <div className="mt-4 space-y-3">
          <Input
            name="name"
            placeholder="NAME"
            value={form.name}
            onChange={handleChange}
            onPaste={handlePaste('name')}
            clearable
          />
          <Input
            name="tle1"
            placeholder="TLE LINE 1"
            value={form.tle1}
            onChange={handleChange}
            onPaste={handlePaste('tle1')}
            clearable
          />
          <Input
            name="tle2"
            placeholder="TLE LINE 2"
            value={form.tle2}
            onChange={handleChange}
            onPaste={handlePaste('tle2')}
            clearable
          />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} disabled={!isValid}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
