import { useEffect, useState } from 'react';
import { supabase } from '../../supabase'; // Assurez-vous que Supabase est correctement configuré
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Form, { Field } from '../../components/Form';
import ConfirmDialog from '../../components/ConfirmDialog';
import Loader from '../../components/Loader';
import { Chapitre, Lecon, Column } from '../../types';

const Chapitres = () => {
  const [data, setData] = useState<Chapitre[]>([]);
  const [lecons, setLecons] = useState<Lecon[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Chapitre | null>(null);
  const [confirm, setConfirm] = useState<{ open: boolean; row: Chapitre | null }>({ open: false, row: null });

  const fetchAll = async () => {
    setLoading(true);
    const [c, l] = await Promise.all([
      supabase.from('Wilgo_chapitres').select('*').order('id', { ascending: true }),
      supabase.from('Wilgo_lecons').select('*').order('titre_lecon', { ascending: true }),
    ]);
    setData(c.data || []);
    setLecons(l.data || []);
    setLoading(false);
  };
  useEffect(() => { fetchAll(); }, []);

  const columns: Column<Chapitre>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'titre', header: 'Titre' },
    { key: 'trimestre_id', header: 'Trimestre', render: r => r.trimestre_id ?? '—' },
    { key: 'lecon_id', header: 'Leçon', render: r => lecons.find(x => x.id === r.lecon_id)?.titre_lecon ?? r.lecon_id ?? '—' },
  ];

  const fields: Field[] = [
    { type: 'text', name: 'titre', label: 'Titre', required: true },
    { type: 'number', name: 'trimestre_id', label: 'Trimestre (id)' },
    { type: 'select', name: 'lecon_id', label: 'Leçon', options: lecons.map(l => ({ value: l.id, label: l.titre_lecon })) },
  ];

  const onCreate = () => { setEditing(null); setOpen(true); };
  const onEdit = (row: Chapitre) => { setEditing(row); setOpen(true); };
  const onDelete = (row: Chapitre) => setConfirm({ open: true, row });

  const handleSave = async (values: any) => {
    if (editing) await supabase.from('wilgo_chapitre').update(values).eq('id', editing.id);
    else await supabase.from('wilgo_chapitre').insert(values);
    setOpen(false); await fetchAll();
  };

  const handleConfirmDelete = async () => {
    if (!confirm.row) return;
    await supabase.from('wilgo_chapitre').delete().eq('id', confirm.row.id);
    setConfirm({ open: false, row: null }); await fetchAll();
  };

  return (
    <div className="p-6 space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-500 to-green-700">
          Chapitres
        </h1>
        <button
          onClick={onCreate}
          className="px-4 py-2 rounded bg-gradient-to-r from-green-300 via-green-500 to-green-700 text-white font-semibold shadow-md transform transition-transform duration-200 hover:scale-105 hover:from-custom-dark-brown hover:to-custom-light-brown"
        >
          + Nouveau chapitre
        </button>
      </div>

      {loading ? <Loader /> : <Table<Chapitre> columns={columns} data={data} onEdit={onEdit} onDelete={onDelete} />}

      {/* Modal pour l'ajout ou la modification d'un chapitre */}
      <Modal open={open} title={editing ? `Modifier #${editing.id}` : 'Nouveau chapitre'} onClose={() => setOpen(false)} size="xl">
        <Form initial={editing ?? { titre: '', trimestre_id: '', lecon_id: '' }} fields={fields} onSubmit={handleSave} />
      </Modal>

      {/* Confirmation avant la suppression d'un chapitre */}
      <ConfirmDialog open={confirm.open} message={`Supprimer le chapitre "${confirm.row?.titre}" ?`} onCancel={() => setConfirm({ open: false, row: null })} onConfirm={handleConfirmDelete} />
    </div>
  );
};

export default Chapitres;
