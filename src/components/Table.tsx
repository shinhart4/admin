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
    <div className="bg-white text-black rounded-2xl shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-white text-[#5C3A00]">
          <tr>
            {columns.map(c => (
              <th key={String(c.key)} className={`text-left px-3 py-2 ${c.className || ''}`}>
                {c.header}
              </th>
            ))}
            {(onEdit || onDelete || actionsExtra) && (
              <th className="px-3 py-2 text-right">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={(row as any).id ?? idx} className="border-t border-[#5C3A00] hover:bg-[#5C3A00]/20 transition-colors duration-200">
              {columns.map(c => (
                <td key={String(c.key)} className={`px-3 py-2 ${c.className || ''}`}>
                  {c.render ? c.render(row) : (row as any)[c.key as string]}
                </td>
              ))}
              {(onEdit || onDelete || actionsExtra) && (
                <td className="px-3 py-2">
                  <div className="flex items-center justify-end gap-2">
                    {actionsExtra && actionsExtra(row)}
                    {onEdit && (
                      <button 
                        onClick={() => onEdit(row)} 
                        className="px-2 py-1 bg-gradient-to-r from-green-300 via-green-500 to-green-700 text-white rounded shadow hover:scale-105 transform transition-all duration-200"
                      >
                        Modifier
                      </button>
                    )}
                    {onDelete && (
                      <button 
                        onClick={() => onDelete(row)} 
                        className="px-2 py-1 bg-gradient-to-r from-red-500 via-red-700 to-red-900 text-white rounded shadow hover:scale-105 transform transition-all duration-200"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td className="px-3 py-6 text-center text-gray-300" colSpan={columns.length + 1}>
                Aucune donnée
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
