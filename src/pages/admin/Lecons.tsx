import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Form, { Field } from '../../components/Form';
import ConfirmDialog from '../../components/ConfirmDialog';
import Loader from '../../components/Loader';
import { Lecon, Matiere, Niveau, Column } from '../../types';

const Lecons = () => {
  const [data, setData] = useState<Lecon[]>([]);
  const [matieres, setMatieres] = useState<Matiere[]>([]);
  const [niveaux, setNiveaux] = useState<Niveau[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Lecon | null>(null);
  const [confirm, setConfirm] = useState<{open:boolean; row:Lecon|null}>({open:false,row:null});

  const fetchAll = async () => {
    setLoading(true);
    const [l, m, n] = await Promise.all([
      supabase.from('Wilgo_lecons').select('*').order('id', { ascending: true }),
      supabase.from('Wilgo_matieres').select('*').order('nom'),
      supabase.from('Wilgo_niveaux').select('*').order('nom'),
    ]);
    setData(l.data || []);
    setMatieres(m.data || []);
    setNiveaux(n.data || []);
    setLoading(false);
  };
  useEffect(() => { fetchAll(); }, []);

  const columns: Column<Lecon>[] = [
    { key:'id', header:'ID', className:'w-16' },
    { key:'titre_lecon', header:'Titre' },
    { key:'matiere_id', header:'Matière', render:r=> matieres.find(m=>m.id===r.matiere_id)?.nom ?? r.matiere_id },
    { key:'niveau_id', header:'Niveau', render:r=> niveaux.find(n=>n.id===r.niveau_id)?.nom ?? r.niveau_id },
  ];

  const fields: Field[] = [
    { type:'text', name:'titre_lecon', label:'Titre', required:true },
    { type:'select', name:'matiere_id', label:'Matière', options: matieres.map(m=>({value:m.id,label:m.nom})) },
    { type:'select', name:'niveau_id', label:'Niveau', options: niveaux.map(n=>({value:n.id,label:n.nom})) },
  ];

  const onCreate = () => { setEditing(null); setOpen(true); };
  const onEdit = (row:Lecon) => { setEditing(row); setOpen(true); };
  const onDelete = (row:Lecon) => setConfirm({open:true,row});

  const handleSave = async (values:any) => {
    if (editing) await supabase.from('Wilgo_lecons').update(values).eq('id', editing.id);
    else await supabase.from('Wilgo_lecons').insert(values);
    setOpen(false); await fetchAll();
  };

  const handleConfirmDelete = async () => {
    if (!confirm.row) return;
    await supabase.from('Wilgo_lecons').delete().eq('id', confirm.row.id);
    setConfirm({open:false,row:null}); await fetchAll();
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leçons</h1>
        <button onClick={onCreate} className="px-4 py-2 rounded bg-blue-600 text-white">+ Nouvelle leçon</button>
      </div>
      {loading ? <Loader/> : <Table<Lecon> columns={columns} data={data} onEdit={onEdit} onDelete={onDelete} />}
      <Modal open={open} title={editing ? `Modifier #${editing.id}` : 'Nouvelle leçon'} onClose={() => setOpen(false)}>
        <Form initial={editing ?? { titre_lecon:'', matiere_id:'', niveau_id:'' }} fields={fields} onSubmit={handleSave} />
      </Modal>
      <ConfirmDialog open={confirm.open} message={`Supprimer la leçon "${confirm.row?.titre_lecon}" ?`} onCancel={()=>setConfirm({open:false,row:null})} onConfirm={handleConfirmDelete} />
    </div>
  );
};
export default Lecons;
