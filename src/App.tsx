import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';

import Dashboard from './pages/admin/Dashboard';
import Programmes from './pages/admin/Programmes';
import Niveaux from './pages/admin/Niveaux';
import Matieres from './pages/admin/Matieres';
import Chapitres from './pages/admin/Chapitres';
import Lecons from './pages/admin/Lecons';
import Questions from './pages/admin/Questions';
import Eleves from './pages/admin/Eleves';
import Instructeurs from './pages/admin/Instructeurs';
import Sessions from './pages/admin/Sessions';
import Utilisateurs from './pages/admin/Utilisateurs';
import Parametres from './pages/admin/Parametres';
import UserResponses from './pages/admin/UserResponses';
import EditPrompt from './pages/EditPrompt';

function App() {
  return (
    <Routes>
      {/* Redirige la racine vers /admin */}
      <Route path="/" element={<Navigate to="/admin" />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="programmes" element={<Programmes />} />
        <Route path="niveaux" element={<Niveaux />} />
        <Route path="matieres" element={<Matieres />} />
        <Route path="chapitres" element={<Chapitres />} />
        <Route path="lecons" element={<Lecons />} />
        <Route path="questions" element={<Questions />} />
        <Route path="eleves" element={<Eleves />} />
        <Route path="instructeurs" element={<Instructeurs />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="utilisateurs" element={<Utilisateurs />} />
        <Route path="parametres" element={<Parametres />} />
        <Route path="UserResponses" element={<UserResponses />} />
        <Route path="edit/:id" element={<EditPrompt />} />
      </Route>

      {/* Route 404 */}
      <Route path="*" element={<div className="p-6">Page non trouvée</div>} />
    </Routes>
  );
}

export default App;
