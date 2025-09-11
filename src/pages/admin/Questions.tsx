// src/pages/admin/Questions.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Form, { Field } from '../../components/Form';
import ConfirmDialog from '../../components/ConfirmDialog';
import Loader from '../../components/Loader';
import { Question, Column, Niveau, Matiere, Chapitre } from '../../types';

const Questions = () => {
  const [data, setData] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Question | null>(null);
  const [confirm, setConfirm] = useState<{ open: boolean; row: Question | null }>({ open: false, row: null });

  const [niveaux, setNiveaux] = useState<Niveau[]>([]);
  const [matieres, setMatieres] = useState<Matiere[]>([]);
  const [chapitres, setChapitres] = useState<Chapitre[]>([]);

  // Récupérer toutes les données nécessaires pour les questions, niveaux, matières, et chapitres
  const fetchAll = async () => {
    setLoading(true);
    const [q, n, m, c] = await Promise.all([
      supabase.from('Wilgo_questions').select('*').order('id', { ascending: false }),
      supabase.from('Wilgo_niveaux').select('*').order('nom'),
      supabase.from('Wilgo_matieres').select('*').order('nom'),
      supabase.from('Wilgo_chapitres').select('*').order('titre'),
    ]);
    setData(q.data || []);
    setNiveaux(n.data || []);
    setMatieres(m.data || []);
    setChapitres(c.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const columns: Column<Question>[] = [
    { key: 'id', header: 'ID', className: 'w-16 text-gray-200' },
    {
      key: 'question_text',
      header: 'Question',
      render: r => {
        const text = r.question_text || '';
        return (
          <span title={text} className="text-gray-100">
            {text.slice(0, 200)}
            {text.length > 80 ? '…' : ''}
          </span>
        );
      }
    },
    { key: 'question_type', header: 'Type', className: 'text-gray-100' },
    { key: 'estimated_time', header: 'Temps (s)', className: 'text-gray-100' },
    // Décommenter si tu veux afficher niveaux, matières, chapitres
    // {
    //   key: 'niveau_id',
    //   header: 'Niveau',
    //   render: r => niveaux.find(n => n.id === r.niveau_id)?.nom ?? r.niveau_id,
    //   className: 'text-gray-100'
    // },
    // {
    //   key: 'matiere_id',
    //   header: 'Matière',
    //   render: r => matieres.find(m => m.id === r.matiere_id)?.nom ?? r.matiere_id,
    //   className: 'text-gray-100'
    // },
    // {
    //   key: 'chapitre_id',
    //   header: 'Chapitre',
    //   render: r => chapitres.find(c => c.id === r.chapitre_id)?.titre ?? r.chapitre_id,
    //   className: 'text-gray-100'
    // },
    {
      key: 'answers',
      header: 'Réponses',
      render: r => {
        let answersArray: any[] = [];
        try {
          answersArray = typeof r.answers === 'string' ? JSON.parse(r.answers) : r.answers;
        } catch {
          return <span className="text-red-500">Format invalide</span>;
        }
        if (!Array.isArray(answersArray)) {
          return <span className="text-red-500">Réponses non valides</span>;
        }
        return (
          <ul className="space-y-1 text-xs">
            {answersArray.map((ans, idx) => (
              <li key={idx} className={`px-2 py-1 rounded ${ans.correct ? 'bg-green-700 text-green-100 font-semibold' : 'bg-gray-700 text-gray-200'}`}>
                {ans.option}
              </li>
            ))}
          </ul>
        );
      }
    },
    {
      key: 'explanation',
      header: 'Explication',
      render: r => (
        <span className="text-xs text-white/90 italic max-w-sm line-clamp-2">
          {r.explanation ? r.explanation.slice(0, 100) + (r.explanation.length > 100 ? '…' : '-') : '-'}
        </span>
      )
    }
  ];

  const fields: Field[] = [
    { type: 'textarea', name: 'question_text', label: 'Question', placeholder: 'Énoncé complet' },
    { type: 'select', name: 'question_type', label: 'Type', options: [
      { value: 'mcq', label: 'QCM' }, { value: 'true_false', label: 'Vrai/Faux' }, { value: 'open', label: 'Ouverte' }] },
    { type: 'number', name: 'estimated_time', label: 'Temps estimé (secondes)', placeholder: 'ex: 60' },
    { type: 'json', name: 'answers', label: 'Réponses (JSON)', placeholder: '{ "type": "mcq", "options": [...] }' },
    { type: 'textarea', name: 'explanation', label: 'Explication (facultatif)' },
  ];

  const onCreate = () => { setEditing(null); setOpen(true); };
  const onEdit = (row: Question) => { setEditing(row); setOpen(true); };
  const onDelete = (row: Question) => setConfirm({ open: true, row });

  const handleSave = async (values: any) => {
    if (editing) {
      const { error } = await supabase.from('wilgo_question').update(values).eq('id', editing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('wilgo_question').insert(values);
      if (error) throw error;
    }
    setOpen(false);
    await fetchAll();
  };

  const handleConfirmDelete = async () => {
    if (!confirm.row) return;
    const { error } = await supabase.from('wilgo_question').delete().eq('id', confirm.row.id);
    if (!error) await fetchAll();
    setConfirm({ open: false, row: null });
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-100">Questions</h1>
        <button onClick={onCreate} className="
          px-4 py-2 rounded
          bg-gradient-to-r from-gray-900 to-gray-700
          text-white font-semibold
          shadow-md
          transform transition-transform duration-200
          hover:scale-105
          hover:from-gray-800 hover:to-gray-600
        ">+ Nouvelle question</button>
      </div>

      {loading ? <Loader /> : (
        <Table<Question> columns={columns} data={data} onEdit={onEdit} onDelete={onDelete} />
      )}

      <Modal open={open} title={editing ? `Modifier #${editing.id}` : 'Ajouter une question'} onClose={() => setOpen(false)} size="xl" footer={null}>
        <Form
          initial={editing ?? {
            question_text: '', question_type: 'mcq', estimated_time: 60, niveau_id: '', matiere_id: '', chapitre_id: '', answers: {}, explanation: ''
          }}
          fields={fields}
          onSubmit={handleSave}
          submitLabel={editing ? 'Mettre à jour' : 'Créer'}
        />
      </Modal>

      <ConfirmDialog
        open={confirm.open}
        message={`Supprimer la question #${confirm.row?.id} ? Cette action est irréversible.`}
        onCancel={() => setConfirm({ open: false, row: null })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Questions;
