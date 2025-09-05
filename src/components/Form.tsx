// src/components/Form.tsx
import { useState } from 'react';

export type Field =
  | { type: 'text'|'number'|'email'; name: string; label: string; placeholder?: string; required?: boolean }
  | { type: 'select'; name: string; label: string; options: { value: any; label: string }[]; required?: boolean }
  | { type: 'textarea'; name: string; label: string; rows?: number; placeholder?: string }
  | { type: 'json'; name: string; label: string; rows?: number; placeholder?: string };

type Props<T> = {
  initial: T;
  fields: Field[];
  onSubmit: (values: T) => Promise<void> | void;
  submitLabel?: string;
}

export default function Form<T extends Record<string, any>>({ initial, fields, onSubmit, submitLabel='Enregistrer' }: Props<T>) {
  const [values, setValues] = useState<T>(initial);
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: any) => setValues(v => ({ ...v, [name]: value }));

  const parseJSON = (s: string) => { try { return JSON.parse(s); } catch { return s } };

  return (
    <form onSubmit={async (e) => { e.preventDefault(); setLoading(true); await onSubmit(values); setLoading(false); }} className="space-y-4">
      {fields.map(f => (
        <div key={f.name}>
          <label className="block text-sm font-medium mb-1">{f.label}</label>
          {f.type === 'textarea' && (
            <textarea rows={f.rows ?? 4} className="w-full border rounded px-3 py-2"
              placeholder={f.placeholder} required={false}
              value={values[f.name] ?? ''} onChange={e => handleChange(f.name, e.target.value)} />
          )}
          {f.type === 'json' && (
            <textarea rows={f.rows ?? 8} className="w-full border rounded px-3 py-2 font-mono text-xs"
              placeholder={f.placeholder}
              value={typeof values[f.name] === 'string' ? values[f.name] : JSON.stringify(values[f.name] ?? {}, null, 2)}
              onChange={e => handleChange(f.name, parseJSON(e.target.value))} />
          )}
          {f.type === 'select' && (
            <select className="w-full border rounded px-3 py-2" required={f.required}
              value={values[f.name] ?? ''} onChange={e => handleChange(f.name, e.target.value)}>
              <option value="">—</option>
              {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          )}
          {['text','number','email'].includes(f.type) && (
            <input type={f.type} className="w-full border rounded px-3 py-2"
              placeholder={(f as any).placeholder} required={(f as any).required}
              value={values[f.name] ?? ''} onChange={e => handleChange(f.name, (f.type==='number'? Number(e.target.value): e.target.value))} />
          )}
        </div>
      ))}
      <div className="flex justify-end">
        <button disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
          {loading ? 'En cours...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
