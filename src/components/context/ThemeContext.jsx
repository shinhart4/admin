// src/context/ThemeContext.tsx
import React, { createContext, useState, useEffect } from 'react';

// Créer un contexte pour le thème
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

// Fournisseur de thème
export const ThemeProvider: React.FC = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Utiliser useEffect pour récupérer le thème préféré depuis le localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Fonction pour basculer entre les modes
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Sauvegarder la préférence dans le localStorage
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
