// src/components/Table.tsx
import { Column } from '../types';

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  actionsExtra?: (row: T) => React.ReactNode;
};

export default function Table<T extends { id?: number | string }>(
  { columns, data, onEdit, onDelete, actionsExtra }: Props<T>
) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            {columns.map(c => <th key={String(c.key)} className={`text-left px-3 py-2 ${c.className || ''}`}>{c.header}</th>)}
            {(onEdit || onDelete || actionsExtra) && <th className="px-3 py-2 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={(row as any).id ?? idx} className="border-t">
              {columns.map(c => (
                <td key={String(c.key)} className={`px-3 py-2 ${c.className || ''}`}>
                  {c.render ? c.render(row) : (row as any)[c.key as string]}
                </td>
              ))}
              {(onEdit || onDelete || actionsExtra) && (
                <td className="px-3 py-2">
                  <div className="flex items-center justify-end gap-3">
                    {actionsExtra && actionsExtra(row)}
                    {onEdit && <button onClick={() => onEdit(row)} className="text-blue-600 hover:underline">Modifier</button>}
                    {onDelete && <button onClick={() => onDelete(row)} className="text-red-600 hover:underline">Supprimer</button>}
                  </div>
                </td>
              )}
            </tr>
          ))}
          {data.length === 0 && (
            <tr><td className="px-3 py-6 text-center text-gray-500" colSpan={columns.length + 1}>Aucune donnée</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
