type Props = { 
  title: string; 
  value: number | string; 
  icon: JSX.Element; 
  color?: string; 
  hint?: string;
};

const StatCard = ({ title, value, icon, color = 'text-custom-light-brown', hint }: Props) => (
  <div
    className="bg-white p-4 rounded-2xl flex items-center justify-between transition-all duration-300 transform hover:scale-105 hover:brightness-110"
    style={{
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',  // Ombre uniforme sur les 4 côtés
    }}
  >
    <div>
      <div className="text-sm text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-500 to-green-700">{title}</div>
      <div className="text-3xl font-extrabold leading-tight text-gray-800">{value}</div>
      {hint && <div className="text-xs text-gray-200 mt-1">{hint}</div>}
    </div>
    <div className={`text-3xl ${color} animate-bell`}>{icon}</div>
  </div>
);

export default StatCard;
