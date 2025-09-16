import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64"> {/* Ajout de margin-left pour le sidebar */}
        <Header />
        <main className="flex-1 p-6 pt-16 overflow-y-auto"> {/* Ajout de padding-top pour le header */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
