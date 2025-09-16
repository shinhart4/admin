import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'admin@gmail.com' && password === 'admin') {
      localStorage.setItem('token', 'test'); 
      navigate('/admin');
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-black p-4">
      <div className="w-full max-w-md bg-black/70 backdrop-blur-md rounded-2xl shadow-xl p-8 text-white">
      <h2 className="text-3xl font-bold mb-2 flex items-center justify-center">
  {/* Texte */}
  <span className="mr-2">Wilgo</span>
  
  {/* Logo */}
  <img
    src="/logo.png"   // ⚠️ mets ton fichier dans /public/logo.png
    alt="Logo Wilgo"
    className="w-12 h-12 object-contain align-middle"
  />
</h2>

        <p className="mb-4 text-gray-300 text-center">
          Connectez-vous à votre espace administration
        </p>
        <p className="mb-4 text-sm text-yellow-400 text-center">
          Pour tester : admin@gmail.com / admin
        </p>

        {error && <p className="mb-4 text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition"
            required
          />
          <button
            type="submit"
            className="bg-white hover:bg-white-700 p-3 rounded-xl text-black font-semibold transition transform hover:scale-105"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-4 text-gray-400 text-sm text-center">
          <p>
            Mot de passe oublié ? <span className="text-white cursor-pointer hover:underline" onClick={() => navigate('/forgot-password')}>Réinitialiser</span>
          </p>
          <p className="mt-2">
            Pas encore de compte ?{' '}
            <span
              className="text-white cursor-pointer hover:underline"
              onClick={() => navigate('/register')}
            >
              S’inscrire
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
