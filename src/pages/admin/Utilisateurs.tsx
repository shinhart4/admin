import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Form, { Field } from '../../components/Form';
import ConfirmDialog from '../../components/ConfirmDialog';
import Loader from '../../components/Loader';
import { Utilisateur, Column } from '../../types';

const fields: Field[] = [
  { name: 'username', label: 'Nom d’utilisateur', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  {
    name: 'role',
    label: 'Rôle',
    type: 'select',
    options: [
      { value: 'admin', label: 'Admin' },
      { value: 'instructeur', label: 'Instructeur' },
      { value: 'eleve', label: 'Élève' }
    ],
    required: true
  },
];

const columns: Column<Utilisateur>[] = [
  { key: 'username', header: 'Nom' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Rôle' },
  { key: 'created_at', header: 'Créé le' },
  // { key: 'id', header: 'ID' }, // Décommentez si besoin d'afficher l'ID
];

const Utilisateurs = () => {
  const [data, setData] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Utilisateur | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const { data: users, error } = await supabase
      .from('wilgo_utilisateurs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      setData([]);
    } else {
      setData(users || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (form: Partial<Utilisateur>) => {
    if (selectedUser) {
      const { error } = await supabase
        .from('wilgo_utilisateurs')
        .update(form)
        .eq('id', selectedUser.id);
      if (error) {
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabase.from('wilgo_utilisateurs').insert(form);
      if (error) {
        console.error(error);
        return;
      }
    }
    setModalOpen(false);
    setSelectedUser(null);
    fetchData();
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    const { error } = await supabase
      .from('wilgo_utilisateurs')
      .delete()
      .eq('id', selectedUser.id);
    if (error) {
      console.error(error);
      return;
    }
    setConfirmOpen(false);
    setSelectedUser(null);
    fetchData();
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6 space-y-6 bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-500 to-green-700">
          Gestion des Utilisateurs
        </h1>
        <button
          onClick={() => {
            setSelectedUser(null);
            setModalOpen(true);
          }}
          className="
            px-4 py-2 rounded
            bg-gradient-to-r from-green-300 via-green-500 to-green-700
            text-white font-semibold
            shadow-md
            transform transition-transform duration-200
            hover:scale-105
            hover:from-green-300 hover:to-green-500
          "
        >
          + Ajouter
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          data={data}
          onEdit={(row) => {
            setSelectedUser(row);
            setModalOpen(true);
          }}
          onDelete={(row) => {
            setSelectedUser(row);
            setConfirmOpen(true);
          }}
        />
      )}

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        title={selectedUser ? 'Modifier Utilisateur' : 'Ajouter un Utilisateur'}
      >
        <Form fields={fields} initialValues={selectedUser || {}} onSubmit={handleSave} />
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        message={`Confirmer la suppression de ${selectedUser?.username} ?`}
      />
    </div>
  );
};

export default Utilisateurs;
