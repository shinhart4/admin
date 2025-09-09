import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Form, { Field } from '../../components/Form';
import ConfirmDialog from '../../components/ConfirmDialog';
import Loader from '../../components/Loader';
import { UserResponse, Column, Eleve, Question } from '../../types';

const UserResponses = () => {
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState<{ open: boolean; row: UserResponse | null }>({ open: false, row: null });
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<UserResponse | null>(null);

  const [eleves, setEleves] = useState<Eleve[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const [r, e, q] = await Promise.all([
      supabase.from('Wilgo_user_responses').select('*').order('id', { ascending: false }),
      supabase.from('eleve').select('*'),
      supabase.from('Wilgo_questions').select('*'),
    ]);
    setResponses(r.data || []);
    setEleves(e.data || []);
    setQuestions(q.data || []);
    
    setLoading(false);
   
  };

  useEffect(() => { fetchData(); }, []);

  const columns: Column<UserResponse>[] = [
    { key: 'id', header: 'ID', className: 'w-16' },
   {
  key: 'user_id',
header: 'Élève',
render: r => {
  const eleve = eleves.find(e => e.id_eleve === r.user_id);
  return eleve ? eleve.username : r.user_id;
}}
,
      {
      key: 'question_id',
      header: 'Question',
      render: r => {
        const question = questions.find(q => q.id === r.question_id);
        if (!question) return <em className="text-red-500">Question introuvable</em>;

        const text = question.question_text;
        return (
          <span title={text}>
            {text.length > 80 ? text.slice(0, 80) + '…' : text}
          </span>
        );
      }
    },
    { key: 'user_answer', header: 'Réponse', render: r => r.user_answer || 'Aucune réponse' },
    {
  key: 'is_correcte',
  header: 'Correcte',
  render: r => r.is_correct 
            ? <span className="text-green-600 font-bold">✔️</span> 
            : <span className="text-red-600 font-bold">❌</span>
},
    {
  key: 'is_correct',
  header: 'Correcte',
  render: r => r.is_correct
            ? <span className="text-green-600 font-bold">✔️</span> 
            : <span className="text-red-600 font-bold">❌</span>
},
    {
      key: 'date_reponse',
      header: 'Date de Réponse',
      render: r => new Date(r.date_reponse).toLocaleString('fr-FR')
    },
  ];

  const fields: Field[] = [
    {
      type: 'select', name: 'eleve_id', label: 'Élève',
      options: eleves.map(e => ({ value: e.id_eleve, label: e.username }))
    },
    {
      type: 'select', name: 'question_id', label: 'Question',
      options: questions.map(q => ({ value: q.id, label: q.question_text.slice(0, 50) }))
    },
    { type: 'textarea', name: 'response', label: 'Réponse de l’élève' },
    { type: 'text', name: 'timestamp', label: 'Date/Heure de réponse' },
  ];

  const handleSave = async (values: any) => {
    if (editing) {
      const { error } = await supabase.from('Wilgo_user_responses').update(values).eq('id', editing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('Wilgo_user_responses').insert(values);
      if (error) throw error;
    }
    setOpenModal(false);
    await fetchData();
  };

  const handleDelete = async (row: UserResponse) => {
    const { error } = await supabase.from('Wilgo_user_responses').delete().eq('id', row.id);
    if (!error) {
      setResponses(responses.filter(r => r.id !== row.id));
    }
    setConfirm({ open: false, row: null });
  };

  const handleConfirmDelete = () => {
    if (!confirm.row) return;
    handleDelete(confirm.row);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Réponses des utilisateurs</h1>
        <button onClick={() => { setEditing(null); setOpenModal(true); }}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">+ Nouvelle réponse</button>
      </div>

      {loading ? <Loader /> : (
        <Table<UserResponse>
          columns={columns}
          data={responses}
          onEdit={(row) => { setEditing(row); setOpenModal(true); }}
          onDelete={(row) => setConfirm({ open: true, row })}
        />
      )}

      {/* Modal Formulaire */}
      <Modal
        open={openModal}
        title={editing ? `Modifier réponse #${editing.id}` : 'Ajouter une réponse'}
        onClose={() => setOpenModal(false)}
        footer={null}
      >
        <Form
          initial={editing ?? {
            eleve_id: '', question_id: '', response: '', timestamp: new Date().toISOString()
          }}
          fields={fields}
          onSubmit={handleSave}
          submitLabel={editing ? 'Mettre à jour' : 'Créer'}
        />
      </Modal>

      {/* Confirmation de suppression */}
      <ConfirmDialog
        open={confirm.open}
        message={`Supprimer la réponse #${confirm.row?.id} ? Cette action est irréversible.`}
        onCancel={() => setConfirm({ open: false, row: null })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UserResponses;
