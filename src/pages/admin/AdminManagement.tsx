import { useState, useEffect } from 'react';
import { supabase } from '../../supabase'; // Assurez-vous que Supabase est correctement configuré
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import Loader from '../../components/Loader';

const AdminManagement = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [confirm, setConfirm] = useState<{ open: boolean; row: any | null }>({ open: false, row: null });

  const fetchAdmins = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('wilgo_utilisateurs')
      .select('*, admin(*)') // Jointure avec la table admin pour récupérer les administrateurs
      .eq('role', 'admin') // Filtrer uniquement les administrateurs
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching admins:', error);
    } else {
      setAdmins(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const columns = [
    { key: 'username', header: 'Username' },
    { key: 'email', header: 'Email' },
    { key: 'permissions', header: 'Permissions' },
    { key: 'actions', header: 'Actions' },
  ];

  const handleDelete = async (id: string) => {
    // Suppression de l'administrateur dans `wilgo_utilisateurs` et dans `admin`
    const { error } = await supabase
      .from('wilgo_utilisateurs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting admin:', error);
    } else {
      setAdmins(admins.filter((admin) => admin.id !== id));
    }
  };

  const handleEdit = (row: any) => {
    setEditing(row);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (confirm.row) {
      await handleDelete(confirm.row.id);
      setConfirm({ open: false, row: null });
    }
  };

  return (
    <div className="p-6 space-y-4 bg-gradient-to-b from-green-300 via-green-500 to-green-700">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-custom-light-brown">Manage Admins</h1>
      </div>

      {loading ? <Loader /> : (
        <Table
          columns={columns}
          data={admins}
          onEdit={handleEdit}
          onDelete={(row) => setConfirm({ open: true, row })}
        />
      )}

      <Modal
        open={open}
        title={editing ? `Edit Admin #${editing.id}` : 'Add New Admin'}
        onClose={() => setOpen(false)}
        size="xl"
        footer={null}
      >
        {/* Form to edit or create an admin */}
        {/* Add your form logic to handle editing admin here */}
      </Modal>

      <ConfirmDialog
        open={confirm.open}
        message={`Are you sure you want to delete admin #${confirm.row?.id}? This action is irreversible.`}
        onCancel={() => setConfirm({ open: false, row: null })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default AdminManagement;
