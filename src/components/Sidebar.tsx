// src/components/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaLayerGroup,
  FaBook,
  FaListOl,
  FaQuestion,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaHistory,
  FaClipboardList, 
  FaComments,
  FaCogs,
} from 'react-icons/fa';

const linkBase = 'flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition';
const linkActive = 'bg-gray-100 text-blue-700 font-semibold';

const Sidebar = () => {
  const items = [
    { to: '/admin', label: 'Dashboard', icon: <FaTachometerAlt />, end: true },
    { to: '/admin/programmes', label: 'Programmes', icon: <FaProjectDiagram /> },
    { to: '/admin/niveaux', label: 'Niveaux', icon: <FaLayerGroup /> },
    { to: '/admin/matieres', label: 'Matières', icon: <FaBook /> },
    { to: '/admin/chapitres', label: 'Chapitres', icon: <FaListOl /> },
    { to: '/admin/lecons', label: 'Leçons', icon: <FaListOl /> },
    { to: '/admin/questions', label: 'Questions', icon: <FaQuestion /> },
    { to: '/admin/UserResponses', label: 'UserResponses', icon: <FaClipboardList /> },
    { to: '/admin/eleves', label: 'Élèves', icon: <FaUserGraduate /> },
    { to: '/admin/instructeurs', label: 'Instructeurs', icon: <FaChalkboardTeacher /> },
    { to: '/admin/sessions', label: 'Sessions', icon: <FaHistory /> },
    { to: '/admin/utilisateurs', label: 'Utilisateurs', icon: <FaUsers /> },
    { to: '/admin/parametres', label: 'Paramètres', icon: <FaCogs /> },
  ];

  return (
    <aside className="w-64 border-r bg-white h-screen sticky top-0">
      <div className="p-4 border-b">
        <div className="text-2xl font-extrabold tracking-tight">Wilgo Admin</div>
        <div className="text-xs text-gray-500">Back-office</div>
      </div>
      <nav className="p-3 space-y-1">
        {items.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            end={i.end || false} // uniquement pour Dashboard
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : 'text-gray-700'}`
            }
          >
            <span className="text-lg">{i.icon}</span>
            <span>{i.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
