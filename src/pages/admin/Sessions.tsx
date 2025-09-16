import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Form, { Field } from '../../components/Form';
import ConfirmDialog from '../../components/ConfirmDialog';
import Loader from '../../components/Loader';
import { Session, Niveau, Chapitre, Instructeur, Column } from '../../types';

const Sessions = () => {
  const [data, setData] = useState<Session[]>([]);
  const [niveaux, setNiveaux] = useState<Niveau[]>([]);
  const [chapitres, setChapitres] = useState<Chapitre[]>([]);
  const [instructeurs, setInstructeurs] = useState<Instructeur[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Session | null>(null);
  const [confirm, setConfirm] = useState<{ open: boolean; row: Session | null }>({ open: false, row: null });

  const fetchAll = async () => {
    setLoading(true);
    const [s, n, c, i] = await Promise.all([
      supabase.from('Wilgo_sessions').select('*').order('id', { ascending: false }),
      supabase.from('Wilgo_niveaux').select('*').order('nom'),
      supabase.from('Wilgo_chapitres').select('*').order('titre'),
      supabase.from('instructeur').select('*').order('id'),
    ]);
    setData(s.data || []);
    setNiveaux(n.data || []);
    setChapitres(c.data || []);
    setInstructeurs(i.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const columns: Column<Session>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
    { key: 'user_id', header: 'Élève' },
    { key: 'niveau_id', header: 'Niveau', render: r => niveaux.find(n => n.id === r.niveau_id)?.nom ?? r.niveau_id },
    { key: 'chapitre_id', header: 'Chapitre', render: r => chapitres.find(c => c.id === r.chapitre_id)?.titre ?? r.chapitre_id },
    { key: 'status', header: 'Statut' },
    { key: 'started_at', header: 'Début' },
    { key: 'completed_at', header: 'Fin', render: r => r.completed_at ?? '—' },
    { key: 'instructeur_id', header: 'Instructeur', render: r => instructeurs.find(i => i.id === r.instructeur_id)?.email ?? r.instructeur_id ?? '—' },
  ];

  const fields: Field[] = [
    { type: 'number', name: 'user_id', label: 'ID élève', required: true },
    { type: 'select', name: 'niveau_id', label: 'Niveau', options: niveaux.map(n => ({ value: n.id, label: n.nom })) },
    { type: 'select', name: 'chapitre_id', label: 'Chapitre', options: chapitres.map(c => ({ value: c.id, label: c.titre })) },
    { type: 'select', name: 'status', label: 'Statut', options: ['active', 'completed', 'abandoned', 'paused'].map(s => ({ value: s, label: s })) },
    { type: 'text', name: 'started_at', label: 'Début (ISO)', placeholder: '2025-08-27T10:00:00Z' },
    { type: 'text', name: 'completed_at', label: 'Fin (ISO)' },
    { type: 'select', name: 'instructeur_id', label: 'Instructeur', options: instructeurs.map(i => ({ value: i.id, label: i.email })) },
  ];

  const onCreate = () => { setEditing(null); setOpen(true); };
  const onEdit = (row: Session) => { setEditing(row); setOpen(true); };
  const onDelete = (row: Session) => setConfirm({ open: true, row });

  const handleSave = async (values: any) => {
    if (editing) await supabase.from('Wilgo_sessions').update(values).eq('id', editing.id);
    else await supabase.from('Wilgo_sessions').insert(values);
    setOpen(false); await fetchAll();
  };

  const handleConfirmDelete = async () => {
    if (!confirm.row) return;
    await supabase.from('Wilgo_sessions').delete().eq('id', confirm.row.id);
    setConfirm({ open: false, row: null }); await fetchAll();
  };

  return (
    <div className="p-6 space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-500 to-green-700">
          Sessions
        </h1>
        <button
          onClick={onCreate}
          className="px-4 py-2 rounded bg-gradient-to-r from-green-300 via-green-500 to-green-700 text-white font-semibold shadow-md transform transition-transform duration-200 hover:scale-105 hover:from-green-300 hover:to-green-500"
        >
          + Nouvelle session
        </button>
      </div>

      {loading ? <Loader /> : (
        <Table<Session> columns={columns} data={data} onEdit={onEdit} onDelete={onDelete} />
      )}

      {/* Modal pour l'ajout ou la modification d'une session */}
      <Modal open={open} title={editing ? `Modifier #${editing.id}` : 'Nouvelle session'} onClose={() => setOpen(false)} size="lg">
        <Form initial={editing ?? { user_id: '', niveau_id: '', chapitre_id: '', status: 'active', started_at: new Date().toISOString(), completed_at: '', instructeur_id: '' }} fields={fields} onSubmit={handleSave} />
      </Modal>

      {/* Confirmation avant la suppression d'une session */}
      <ConfirmDialog
        open={confirm.open}
        message={`Supprimer la session #${confirm.row?.id} ?`}
        onCancel={() => setConfirm({ open: false, row: null })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Sessions;
