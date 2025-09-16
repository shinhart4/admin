import LoginForm from '../components/LoginForm'; // ← corrige le chemin si nécessaire

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0">
        <div className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 animate-pulse-slow w-full h-full"></div>
      </div>

      {/* Form */}
      <div className="relative z-10 w-full px-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
