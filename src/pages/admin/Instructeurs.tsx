import { useEffect, useState } from 'react';
import { supabase } from '../../supabase'; // Assurez-vous que Supabase est bien configuré
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Form, { Field } from '../../components/Form';
import ConfirmDialog from '../../components/ConfirmDialog';
import Loader from '../../components/Loader';
import { Instructeur, Column } from '../../types';

const Instructeurs = () => {
  const [data, setData] = useState<Instructeur[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Instructeur | null>(null);
  const [confirm, setConfirm] = useState<{ open: boolean; row: Instructeur | null }>({ open: false, row: null });

  // Récupérer toutes les données nécessaires pour les instructeurs
  const fetchAll = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('instructeur')
      .select('*')
      .order('username', { ascending: true });

    console.log('Data fetched:', data);
    console.log('Error:', error);

    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      setData(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const columns: Column<Instructeur>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'email', header: 'Email' },
    { key: 'username', header: 'Username' },
    { key: 'specialisation', header: 'Spécialisation', render: r => r.specialisation ?? '—' },
  ];

  const fields: Field[] = [
    { type: 'email', name: 'email', label: 'Email', required: true },
    { type: 'text', name: 'specialisation', label: 'Spécialisation' },
    { type: 'text', name: 'mdp', label: 'Mot de passe' },
  ];

  const onCreate = () => { setEditing(null); setOpen(true); };
  const onEdit = (row: Instructeur) => { setEditing(row); setOpen(true); };
  const onDelete = (row: Instructeur) => setConfirm({ open: true, row });

  const handleSave = async (values: any) => {
    if (editing) {
      await supabase.from('instructeur').update(values).eq('id', editing.id);
    } else {
      await supabase.from('instructeur').insert(values);
    }
    setOpen(false);
    await fetchAll(); // Recharger les données
  };

  const handleConfirmDelete = async () => {
    if (!confirm.row) return;
    await supabase.from('instructeur').delete().eq('id', confirm.row.id);
    setConfirm({ open: false, row: null });
    await fetchAll(); // Recharger les données
  };

  return (
    <div className="p-6 space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-500 to-green-700">
          Instructeurs
        </h1>
        <button
          onClick={onCreate}
          className="px-4 py-2 rounded bg-gradient-to-r from-green-300 via-green-500 to-green-700 text-white font-semibold shadow-md transform transition-transform duration-200 hover:scale-105 hover:from-green-300 hover:to-green-500"
        >
          + Nouvel instructeur
        </button>
      </div>

      {loading ? <Loader /> : (
        <Table<Instructeur> columns={columns} data={data} onEdit={onEdit} onDelete={onDelete} />
      )}

      {/* Modal pour l'ajout ou la modification d'un instructeur */}
      <Modal open={open} title={editing ? `Modifier #${editing.id}` : 'Nouvel instructeur'} onClose={() => setOpen(false)} size="xl">
        <Form initial={editing ?? { email: '', specialisation: '', mdp: '' }} fields={fields} onSubmit={handleSave} />
      </Modal>

      {/* Confirmation avant la suppression d'un instructeur */}
      <ConfirmDialog
        open={confirm.open}
        message={`Supprimer l'instructeur "${confirm.row?.email}" ?`}
        onCancel={() => setConfirm({ open: false, row: null })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Instructeurs;
