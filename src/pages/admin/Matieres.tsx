import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
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
  const [confirm, setConfirm] = useState<{open:boolean; row:Matiere|null}>({open:false,row:null});

  const fetchAll = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('Wilgo_matieres').select('*').order('nom');
    if (!error) setData(data || []);
    setLoading(false);
  };
  useEffect(() => { fetchAll(); }, []);

  const columns: Column<Matiere>[] = [
    { key:'id', header:'ID', className:'w-16' },
    { key:'nom', header:'Nom' },
    { key:'icon', header:'Icône', render: r => r.icon ? <img src={r.icon} alt="" className="h-6 w-6"/> : '—' },
    { key:'description', header:'Description', render: r => r.description ?? '—' },
  ];

  const fields: Field[] = [
    { type:'text', name:'nom', label:'Nom', required:true },
    { type:'text', name:'icon', label:'URL Icône' },
    { type:'textarea', name:'description', label:'Description' },
  ];

  const onCreate = () => { setEditing(null); setOpen(true); };
  const onEdit = (row:Matiere) => { setEditing(row); setOpen(true); };
  const onDelete = (row:Matiere) => setConfirm({open:true,row});

  const handleSave = async (values:any) => {
    if (editing) await supabase.from('Wilgo_matieres').update(values).eq('id', editing.id);
    else await supabase.from('Wilgo_matieres').insert(values);
    setOpen(false); await fetchAll();
  };

  const handleConfirmDelete = async () => {
    if (!confirm.row) return;
    await supabase.from('Wilgo_matieres').delete().eq('id', confirm.row.id);
    setConfirm({open:false,row:null}); await fetchAll();
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Matières</h1>
        <button onClick={onCreate} className="px-4 py-2 rounded bg-blue-600 text-white">+ Nouvelle matière</button>
      </div>
      {loading ? <Loader/> : <Table<Matiere> columns={columns} data={data} onEdit={onEdit} onDelete={onDelete} />}
      <Modal open={open} title={editing ? `Modifier #${editing.id}` : 'Nouvelle matière'} onClose={() => setOpen(false)}>
        <Form initial={editing ?? { nom:'', icon:'', description:'' }} fields={fields} onSubmit={handleSave} />
      </Modal>
      <ConfirmDialog open={confirm.open} message={`Supprimer la matière "${confirm.row?.nom}" ?`} onCancel={()=>setConfirm({open:false,row:null})} onConfirm={handleConfirmDelete} />
    </div>
  );
};
export default Matieres;
