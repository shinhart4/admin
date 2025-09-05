import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';

import Dashboard from '../pages/admin/Dashboard';
import Programmes from '../pages/admin/Programmes';
import Niveaux from '../pages/admin/Niveaux';
import Matieres from '../pages/admin/Matieres';
import Lecons from '../pages/admin/Lecons';
import Chapitres from '../pages/admin/Chapitres';
import Questions from '../pages/admin/Questions';
import Eleves from '../pages/admin/Eleves';
import Instructeurs from '../pages/admin/Instructeurs';
import Sessions from '../pages/admin/Sessions';
import Utilisateurs from '../pages/admin/Utilisateurs';
import Parametres from '../pages/admin/Parametres';

const AdminRoutes = () => (
  <Routes>
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
    </Route>
  </Routes>
);

export default AdminRoutes;



