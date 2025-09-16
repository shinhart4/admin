import { useState } from 'react';

export type Field =
  | { type: 'text' | 'number' | 'email'; name: string; label: string; placeholder?: string; required?: boolean }
  | { type: 'select'; name: string; label: string; options: { value: any; label: string }[]; required?: boolean }
  | { type: 'textarea'; name: string; label: string; rows?: number; placeholder?: string }
  | { type: 'json'; name: string; label: string; rows?: number; placeholder?: string };

type Props<T> = {
  initial: T;
  fields: Field[];
  onSubmit: (values: T) => Promise<void> | void;
  submitLabel?: string;
};

export default function Form<T extends Record<string, any>>({
  initial,
  fields,
  onSubmit,
  submitLabel = 'Enregistrer',
}: Props<T>) {
  const [values, setValues] = useState<T>(initial);
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: any) =>
    setValues((v) => ({ ...v, [name]: value }));

  const parseJSON = (s: string) => {
    try {
      return JSON.parse(s);
    } catch {
      return s;
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(values);
        setLoading(false);
      }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {fields.map((f) => (
        <div key={f.name} className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-[#5C3A00]">{f.label}</label>

          {f.type === 'textarea' && (
            <textarea
              rows={f.rows ?? 3}
              className="border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={f.placeholder}
              value={values[f.name] ?? ''}
              onChange={(e) => handleChange(f.name, e.target.value)}
            />
          )}

          {f.type === 'json' && (
            <textarea
              rows={f.rows ?? 4}
              className="border border-gray-300 rounded px-3 py-2 font-mono text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={f.placeholder}
              value={
                typeof values[f.name] === 'string'
                  ? values[f.name]
                  : JSON.stringify(values[f.name] ?? {}, null, 2)
              }
              onChange={(e) => handleChange(f.name, parseJSON(e.target.value))}
            />
          )}

          {f.type === 'select' && (
            <select
              className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required={f.required}
              value={values[f.name] ?? ''}
              onChange={(e) => handleChange(f.name, e.target.value)}
            >
              <option value="">—</option>
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          )}

          {['text', 'number', 'email'].includes(f.type) && (
            <input
              type={f.type}
              className="border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={(f as any).placeholder}
              required={(f as any).required}
              value={values[f.name] ?? ''}
              onChange={(e) =>
                handleChange(
                  f.name,
                  f.type === 'number' ? Number(e.target.value) : e.target.value
                )
              }
            />
          )}
        </div>
      ))}

      <div className="sm:col-span-2 flex justify-end mt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded font-medium bg-gradient-to-r from-green-300 via-green-500 to-green-700 text-white shadow hover:scale-105 transition disabled:opacity-60"
        >
          {loading ? 'En cours...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
