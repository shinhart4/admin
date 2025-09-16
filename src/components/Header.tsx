import { FaSignOutAlt, FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode); // Apply dark mode globally on the body
  };

  useEffect(() => {
    // Check if the theme preference is stored in localStorage and apply it on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark');
    } else {
      setDarkMode(false);
      document.body.classList.remove('dark');
    }
  }, []);

  // Save dark mode preference in localStorage
  useEffect(() => {
    if (darkMode) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <header className={`px-6 py-3 shadow-md flex justify-between items-center sticky top-0 z-10 transition-all duration-300 ${darkMode ? 'bg-[#1A202C] text-white' : 'bg-white text-gray-800'}`}>
      <h1 className="text-xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-500 to-green-700 drop-shadow-xl">
        Tableau de Bord
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaUserCircle className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-800'}`} />
          <div className="text-sm">
            <div className="font-medium">{darkMode ? 'Admin' : 'Admin'}</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className={`flex items-center gap-6 border-2 border-transparent ${darkMode ? 'bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white' : 'bg-gradient-to-r from-green-300 via-green-500 to-green-700 text-gray-800'} hover:text-white hover:bg-gradient-to-r hover:from-green-300 hover:via-green-500 hover:to-green-700 transition-all duration-300 px-4 py-2 rounded-md`}
        >
          <FaSignOutAlt className="text-lg" />
          <span className="font-semibold">Déconnexion</span>
        </button>

       
      </div>
    </header>
  );
};

export default Header;
