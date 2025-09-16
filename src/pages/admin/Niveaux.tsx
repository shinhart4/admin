import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Form, { Field } from '../../components/Form';
import ConfirmDialog from '../../components/ConfirmDialog';
import Loader from '../../components/Loader';
import { Niveau, Programme, Column } from '../../types';

const Niveaux = () => {
  const [data, setData] = useState<Niveau[]>([]);
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Niveau | null>(null);
  const [confirm, setConfirm] = useState<{open:boolean; row:Niveau|null}>({open:false,row:null});

  const fetchAll = async () => {
    setLoading(true);
    const [n, p] = await Promise.all([
      supabase.from('Wilgo_niveaux').select('*').order('nom'),
      supabase.from('Wilgo_programmes_scolaires').select('*').order('name'),
    ]);
    setData(n.data || []);
    setProgrammes(p.data || []);
    setLoading(false);
  };
  useEffect(() => { fetchAll(); }, []);

  const columns: Column<Niveau>[] = [
    { key:'id', header:'ID', className:'w-16' },
    { key:'nom', header:'Nom' },
    { key:'programme_id', header:'Programme', render: r => programmes.find(p=>p.id===r.programme_id)?.name ?? r.programme_id },
  ];

  const fields: Field[] = [
    { type:'text', name:'nom', label:'Nom', required:true },
    { type:'select', name:'programme_id', label:'Programme', options: programmes.map(p=>({ value:p.id, label:p.name })) },
  ];

  const onCreate = () => { setEditing(null); setOpen(true); };
  const onEdit = (row:Niveau) => { setEditing(row); setOpen(true); };
  const onDelete = (row:Niveau) => setConfirm({open:true,row});

  const handleSave = async (values:any) => {
    if (editing) await supabase.from('Wilgo_niveaux').update(values).eq('id', editing.id);
    else await supabase.from('Wilgo_niveaux').insert(values);
    setOpen(false); await fetchAll();
  };

  const handleConfirmDelete = async () => {
    if (!confirm.row) return;
    await supabase.from('Wilgo_niveaux').delete().eq('id', confirm.row.id);
    setConfirm({open:false,row:null}); await fetchAll();
  };

  return (
    <div className="p-6 space-y-4 ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold ">Niveaux</h1>
        <button onClick={onCreate}className="
    px-4 py-2 rounded
    bg-gradient-to-r from-gray-900 to-gray-700
    text-white font-semibold
    shadow-md
    transform transition-transform duration-200
    hover:scale-105
    hover:from-gray-800 hover:to-gray-600
  ">+ Nouveau niveau</button>
      </div>
      {loading ? <Loader/> : <Table<Niveau> columns={columns} data={data} onEdit={onEdit} onDelete={onDelete} />}
      <Modal  open={open} title={editing ? `Modifier #${editing.id}` : 'Nouveau niveau'} onClose={() => setOpen(false)} >
        <Form initial={editing ?? { nom:'', programme_id:'' }} fields={fields} onSubmit={handleSave} />
      </Modal>
      <ConfirmDialog open={confirm.open} message={`Supprimer le niveau "${confirm.row?.nom}" ?`} onCancel={()=>setConfirm({open:false,row:null})} onConfirm={handleConfirmDelete} />
    </div>
  );
};
export default Niveaux;
