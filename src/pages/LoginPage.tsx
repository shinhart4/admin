import LoginForm from '../components/LoginForm'; // ← Corrigez le chemin si nécessaire

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-custom-light-yellow via-custom-orange to-custom-dark-orange">
      {/* Background animation */}
      <div className="absolute inset-0">
        <div className="bg-gradient-to-r from-custom-dark-brown via-custom-light-brown to-custom-dark-orange animate-pulse-slow w-full h-full"></div>
      </div>

      {/* Form */}
      <div className="relative z-10 w-full px-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
