// // src/components/Header.tsx
// import { FaBell, FaUserCircle } from 'react-icons/fa';

// const Header = () => {
//   return (
//     <header className="h-16 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10">
//       <div className="font-semibold">Panneau d’administration</div>
//       <div className="flex items-center gap-4">
//         <button className="relative">
//           <FaBell className="text-xl text-gray-600" />
//           <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 grid place-items-center rounded-full">3</span>
//         </button>
//         <div className="flex items-center gap-2">
//           <FaUserCircle className="text-2xl text-gray-600" />
//           <div className="text-sm">
//             <div className="font-medium">Admin</div>
//             <div className="text-gray-500 text-xs">admin@wilgo</div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const handleLogout = () => {
    localStorage.clear(); // ou Supabase.auth.signOut()
    window.location.href = '/login';
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-4 shadow-md flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-white">Wilgo Admin Panel</h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl text-white" />
          <div className="text-sm text-gray-200">
            <div className="font-medium">Admin</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-500 transition-colors"
        >
          <FaSignOutAlt className="text-lg text-white" />
          <span className="text-white">Déconnexion</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
