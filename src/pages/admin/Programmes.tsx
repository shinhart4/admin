import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Form, { Field } from '../../components/Form';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Programme, Column } from '../../types';
import Loader from '../../components/Loader';

const Programmes = () => {
  const [data, setData] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Programme | null>(null);
  const [confirm, setConfirm] = useState<{open:boolean; row:Programme|null}>({open:false,row:null});

  const fetchAll = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('Wilgo_programmes_scolaires').select('*').order('name');
    if (!error) setData(data || []);
    setLoading(false);
  };
  useEffect(() => { fetchAll(); }, []);

  const columns: Column<Programme>[] = [
    { key: 'id', header: 'ID', className:'w-16' },
    { key: 'name', header: 'Nom' },
    { key: 'description', header: 'Description', render: r => r.description ?? '—' },
  ];

  const fields: Field[] = [
    { type:'text', name:'name', label:'Nom', required:true },
    { type:'textarea', name:'description', label:'Description' },
  ];

  const onCreate = () => { setEditing(null); setOpen(true); };
  const onEdit = (row:Programme) => { setEditing(row); setOpen(true); };
  const onDelete = (row:Programme) => setConfirm({open:true,row});

  const handleSave = async (values:any) => {
    if (editing) await supabase.from('Wilgo_programmes_scolaires').update(values).eq('id', editing.id);
    else await supabase.from('Wilgo_programmes_scolaires').insert(values);
    setOpen(false); await fetchAll();
  };

  const handleConfirmDelete = async () => {
    if (!confirm.row) return;
    await supabase.from('Wilgo_programmes_scolaires').delete().eq('id', confirm.row.id);
    setConfirm({open:false,row:null}); await fetchAll();
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Programmes scolaires</h1>
        <button
  onClick={onCreate}
  className="
    px-4 py-2 rounded
    bg-gradient-to-r from-gray-900 to-gray-700
    text-white font-semibold
    shadow-md
    transform transition-transform duration-200
    hover:scale-105
    hover:from-gray-800 hover:to-gray-600
  "
>
  + Nouveau programme
</button>

              </div>
      {loading ? <Loader/> : <Table<Programme> columns={columns} data={data} onEdit={onEdit} onDelete={onDelete} />}
      <Modal open={open} title={editing ? `Modifier #${editing.id}` : 'Nouveau programme'} onClose={() => setOpen(false)}>
        <Form initial={editing ?? { name:'', description:'' }} fields={fields} onSubmit={handleSave} />
      </Modal>
      <ConfirmDialog open={confirm.open} message={`Supprimer le programme "${confirm.row?.name}" ?`} onCancel={()=>setConfirm({open:false,row:null})} onConfirm={handleConfirmDelete} />
    </div>
  );
};
export default Programmes;
