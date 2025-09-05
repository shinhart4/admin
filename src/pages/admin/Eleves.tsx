import { useEffect, useState } from 'react';
import { supabase } from '../../supabase'; // Assurez-vous que Supabase est bien configuré
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Form, { Field } from '../../components/Form';
import ConfirmDialog from '../../components/ConfirmDialog';
import Loader from '../../components/Loader';
import { Eleve, Niveau, Column } from '../../types';

const Eleves = () => {
  const [data, setData] = useState<Eleve[]>([]);
  const [niveaux, setNiveaux] = useState<Niveau[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Eleve | null>(null);
  const [confirm, setConfirm] = useState<{ open: boolean; row: Eleve | null }>({ open: false, row: null });

  // Récupérer toutes les données nécessaires pour les élèves et les niveaux
//   const fetchAll = async () => {
//     setLoading(true);
//     const [e, n] = await Promise.all([
//       supabase.from('eleve').select('*').order('name'), // Sélectionner tous les élèves
//       supabase.from('Wilgo_niveaux').select('*').order('nom'), // Sélectionner tous les niveaux
//     ]);
//     setData(e.data || []);
//     setNiveaux(n.data || []);
//     setLoading(false);
//     console.log(e.data); // Vérifiez ce qui est renvoyé

//     const { data, error } = await supabase
//   .from('eleve')
//   .select('*')
//   .order('name');

// if (error) {
//   console.error('Error fetching data:', error.message);
// }
//   };
const fetchAll = async () => {
  setLoading(true);
  const { data, error } = await supabase
    .from('eleve')
    .select('*')
    .order('username');

  console.log('Data fetched:', data); // Affiche les données récupérées
  console.log('Error:', error); // Affiche toute erreur

  if (error) {
    console.error('Error fetching data:', error.message);
  } else {
    setData(data || []);
  }
  setLoading(false);
};


  useEffect(() => { fetchAll(); }, []);

  // Colonnes de la table pour afficher les informations des élèves
  const columns: Column<Eleve>[] = [
    { key: 'id_eleve', header: 'ID', className: 'w-16' },
    { key: 'username', header: 'Nom' },
    { key: 'email', header: 'Email' },
    { key: 'matricule', header: 'Matricule' },
    { key: 'niveau_id', header: 'Niveau', render: (r) => niveaux.find((n) => n.id === r.niveau_id)?.nom ?? r.niveau_id },
    { key: 'last_active', header: 'Dernière activité', render: (r) => r.last_active ?? '—' },
  ];

  // Champs du formulaire pour ajouter ou modifier un élève
  const fields: Field[] = [
    { type: 'text', name: 'name', label: 'Nom', required: true },
    { type: 'text', name: 'matricule', label: 'Matricule' },
    { type: 'select', name: 'niveau_id', label: 'Niveau', options: niveaux.map((n) => ({ value: n.id, label: n.nom })) },
  ];

  // Fonction pour créer un nouvel élève
  const onCreate = () => { setEditing(null); setOpen(true); };

  // Fonction pour éditer un élève existant
  const onEdit = (row: Eleve) => { setEditing(row); setOpen(true); };

  // Fonction pour supprimer un élève
  const onDelete = (row: Eleve) => setConfirm({ open: true, row });

  // Fonction pour enregistrer les données (ajout ou mise à jour d'un élève)
  const handleSave = async (values: any) => {
    if (editing) {
      await supabase.from('eleve').update(values).eq('id_eleve', editing.id_eleve); // Mise à jour de l'élève
    } else {
      await supabase.from('eleve').insert(values); // Ajout d'un nouvel élève
    }
    setOpen(false);
    await fetchAll(); // Recharger les données
  };

  // Fonction de suppression avec confirmation
  const handleConfirmDelete = async () => {
    if (!confirm.row) return;
    await supabase.from('eleve').delete().eq('id_eleve', confirm.row.id_eleve); // Suppression de l'élève
    setConfirm({ open: false, row: null });
    await fetchAll(); // Recharger les données
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Élèves</h1>
        <button onClick={onCreate} className="px-4 py-2 rounded bg-blue-600 text-white">+ Nouvel élève</button>
      </div>

      {loading ? <Loader /> : (
        <Table<Eleve> columns={columns} data={data} onEdit={onEdit} onDelete={onDelete} />
      )}

      {/* Modal pour l'ajout ou la modification d'un élève */}
      <Modal open={open} title={editing ? `Modifier #${editing.id_eleve}` : 'Nouvel élève'} onClose={() => setOpen(false)}>
        <Form
          initial={editing ?? { name: '', matricule: '', niveau_id: '' }}
          fields={fields}
          onSubmit={handleSave}
        />
      </Modal>

      {/* Confirmation avant la suppression d'un élève */}
      <ConfirmDialog
        open={confirm.open}
        message={`Supprimer l'élève "${confirm.row?.name}" ?`}
        onCancel={() => setConfirm({ open: false, row: null })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Eleves;
