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
  FaCogs,
} from 'react-icons/fa';

const linkBase =
  'flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm';

const linkActive =
  'bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white font-semibold shadow-md';

// const Sidebar = () => {
//   const items = [
//     { to: '/admin', label: 'Dashboard', icon: <FaTachometerAlt />, end: true },
//     { to: '/admin/programmes', label: 'Programmes', icon: <FaProjectDiagram /> },
//     { to: '/admin/niveaux', label: 'Niveaux', icon: <FaLayerGroup /> },
//     { to: '/admin/matieres', label: 'Matières', icon: <FaBook /> },
//     { to: '/admin/chapitres', label: 'Chapitres', icon: <FaListOl /> },
//     { to: '/admin/lecons', label: 'Leçons', icon: <FaListOl /> },
//     { to: '/admin/questions', label: 'Questions', icon: <FaQuestion /> },
//     { to: '/admin/user-Responses', label: 'UserResponses', icon: <FaClipboardList /> },
//     { to: '/admin/eleves', label: 'Élèves', icon: <FaUserGraduate /> },
//     { to: '/admin/instructeurs', label: 'Instructeurs', icon: <FaChalkboardTeacher /> },
//     { to: '/admin/sessions', label: 'Sessions', icon: <FaHistory /> },
//     { to: '/admin/utilisateurs', label: 'Utilisateurs', icon: <FaUsers /> },
//     { to: '/admin/parametres', label: 'Paramètres', icon: <FaCogs /> },
//   ];

//   return (
//     <aside className="w-64 h-screen flex flex-col bg-white text-[#5C3A00] border-r shadow-md">
//       <div className="px-6 py-1 border-b bg-opacity-20">
//         <div className="flex items-center justify-between gap-3 ">
//           <div className="text-2xl font-extrabold tracking-tight text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-500 to-green-700">
//             Wilgo
//           </div>
//           <img
//             src="/logo.png"
//             alt="Logo Wilgo"
//             className="object-contain"
//             style={{
//               width: '48px',
//               marginTop: '2px',
//             }}
//           />
//         </div>
//       </div>

//       <nav className="p-3 space-y-1 flex-grow overflow-hidden">
//         {items.map((i) => (
//           <NavLink
//             key={i.to}
//             to={i.to}
//             end={i.end || false}
//             className={({ isActive }) =>
//               `${linkBase} ${
//                 isActive
//                   ? linkActive
//                   : 'text-[#4B3D3B] hover:bg-[#FFD699] hover:text-[#FF7043] hover:bg-gradient-to-r hover:from-green-300 hover:via-green-500 hover:to-green-700 hover:shadow-lg'
//               }`
//             }
//           >
//             {({ isActive }) => (
//               <>
//                 <span
//                   className={`text-lg transition-all duration-300 ${
//                     isActive
//                       ? 'text-gray-800 animate-pulse'
//                       : 'text-[#5C3A00] hover:translate-y-[-2px]'
//                   }`}
//                 >
//                   {i.icon}
//                 </span>
//                 <span
//                   className={`${
//                     isActive
//                       ? 'text-gray-800'
//                       : 'text-[#5C3A00] hover:text-[#FF7043]'
//                   }`}
//                 >
//                   {i.label}
//                 </span>
//               </>
//             )}
//           </NavLink>
//         ))}
//       </nav>

//       <footer className="mt-auto p-3 text-xs text-center text-gray-800 border-t bg-opacity-10">
//         <span className="block mt-2">&copy; 2025 Wilgo | All Rights Reserved</span>
//       </footer>
//     </aside>
//   );
// };
const Sidebar = () => {
  const items = [
    { to: '/admin', label: 'Dashboard', icon: <FaTachometerAlt />, end: true },
    { to: '/admin/programmes', label: 'Programmes', icon: <FaProjectDiagram /> },
    { to: '/admin/niveaux', label: 'Niveaux', icon: <FaLayerGroup /> },
    { to: '/admin/matieres', label: 'Matières', icon: <FaBook /> },
    { to: '/admin/chapitres', label: 'Chapitres', icon: <FaListOl /> },
    { to: '/admin/lecons', label: 'Leçons', icon: <FaListOl /> },
    { to: '/admin/questions', label: 'Questions', icon: <FaQuestion /> },
    { to: '/admin/user-Responses', label: 'UserResponses', icon: <FaClipboardList /> },
    { to: '/admin/eleves', label: 'Élèves', icon: <FaUserGraduate /> },
    { to: '/admin/instructeurs', label: 'Instructeurs', icon: <FaChalkboardTeacher /> },
    { to: '/admin/sessions', label: 'Sessions', icon: <FaHistory /> },
    { to: '/admin/utilisateurs', label: 'Utilisateurs', icon: <FaUsers /> },
    { to: '/admin/parametres', label: 'Paramètres', icon: <FaCogs /> },
  ];
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 flex flex-col bg-white text-[#5C3A00] border-r shadow-md z-20">
      <div className="px-6 py-1 border-b bg-opacity-20">
        <div className="flex items-center justify-between gap-3">
          <div className="text-2xl font-extrabold tracking-tight text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-500 to-green-700">
            Wilgo
          </div>
          <img
            src="/logo.png"
            alt="Logo Wilgo"
            className="object-contain"
            style={{
              width: '48px',
              marginTop: '2px',
            }}
          />
        </div>
      </div>

      <nav className="p-3 space-y-1 flex-grow overflow-hidden">
        {items.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            end={i.end || false}
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? linkActive
                  : 'text-[#4B3D3B] hover:bg-[#FFD699] hover:text-[#FF7043] hover:bg-gradient-to-r hover:from-green-300 hover:via-green-500 hover:to-green-700 hover:shadow-lg'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`text-lg transition-all duration-300 ${
                    isActive
                      ? 'text-gray-800 animate-pulse'
                      : 'text-[#5C3A00] hover:translate-y-[-2px]'
                  }`}
                >
                  {i.icon}
                </span>
                <span
                  className={`${
                    isActive
                      ? 'text-gray-800'
                      : 'text-[#5C3A00] hover:text-[#FF7043]'
                  }`}
                >
                  {i.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <footer className="mt-auto p-3 text-xs text-center text-gray-800 border-t bg-opacity-10">
        <span className="block mt-2">&copy; 2025 Wilgo | All Rights Reserved</span>
      </footer>
    </aside>
  );
};



export default Sidebar;
