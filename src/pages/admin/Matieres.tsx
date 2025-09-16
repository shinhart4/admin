import { useEffect, useState } from 'react';
import { supabase } from '../../supabase'; // Assurez-vous que Supabase est bien configuré
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Form, { Field } from '../../components/Form';
import ConfirmDialog from '../../components/ConfirmDialog';
import Loader from '../../components/Loader';
import { Matiere, Column } from '../../types';

const Matieres = () => {
  const [data, setData] = useState<Matiere[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Matiere | null>(null);
  const [confirm, setConfirm] = useState<{ open: boolean; row: Matiere | null }>({ open: false, row: null });

  const fetchAll = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('Wilgo_matieres').select('*').order('nom');
    if (!error) setData(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const columns: Column<Matiere>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'nom', header: 'Nom' },
    { key: 'icon', header: 'Icône', render: r => r.icon ? <img src={r.icon} alt="" className="h-6 w-6" /> : '—' },
    { key: 'description', header: 'Description', render: r => r.description ?? '—' },
  ];

  const fields: Field[] = [
    { type: 'text', name: 'nom', label: 'Nom', required: true },
    { type: 'text', name: 'icon', label: 'URL Icône' },
    { type: 'textarea', name: 'description', label: 'Description' },
  ];

  const onCreate = () => { setEditing(null); setOpen(true); };
  const onEdit = (row: Matiere) => { setEditing(row); setOpen(true); };
  const onDelete = (row: Matiere) => setConfirm({ open: true, row });

  const handleSave = async (values: any) => {
    if (editing) await supabase.from('Wilgo_matieres').update(values).eq('id', editing.id);
    else await supabase.from('Wilgo_matieres').insert(values);
    setOpen(false); await fetchAll();
  };

  const handleConfirmDelete = async () => {
    if (!confirm.row) return;
    await supabase.from('Wilgo_matieres').delete().eq('id', confirm.row.id);
    setConfirm({ open: false, row: null }); await fetchAll();
  };

  return (
    <div className="p-6 space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-500 to-green-700">
          Matières
        </h1>
        <button
          onClick={onCreate}
          className="px-4 py-2 rounded bg-gradient-to-r from-green-300 via-green-500 to-green-700 text-white font-semibold shadow-md transform transition-transform duration-200 hover:scale-105 hover:from-green-300 hover:to-green-500"
        >
          + Nouvelle matière
        </button>
      </div>

      {loading ? <Loader /> : (
        <Table<Matiere> columns={columns} data={data} onEdit={onEdit} onDelete={onDelete} />
      )}

      {/* Modal pour l'ajout ou la modification d'une matière */}
      <Modal open={open} title={editing ? `Modifier #${editing.id}` : 'Nouvelle matière'} onClose={() => setOpen(false)} size="xl">
        <Form
          initial={editing ?? { nom: '', icon: '', description: '' }}
          fields={fields}
          onSubmit={handleSave}
        />
      </Modal>

      {/* Confirmation avant la suppression d'une matière */}
      <ConfirmDialog
        open={confirm.open}
        message={`Supprimer la matière "${confirm.row?.nom}" ?`}
        onCancel={() => setConfirm({ open: false, row: null })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Matieres;
