import ForgotPassword from '../components/ForgotPassword';
import { useNavigate } from 'react-router-dom';

const Forgetpage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0">
        <div className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 animate-pulse-slow w-full h-full"></div>
      </div>

      {/* Form */}
      <div className="relative z-10 w-full px-4">
        <ForgotPassword onBack={() => navigate('/login')} />
      </div>
    </div>
  );
};

export default Forgetpage;
