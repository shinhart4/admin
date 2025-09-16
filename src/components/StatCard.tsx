// src/components/StatCard.tsx
type Props = { title: string; value: number | string; icon: JSX.Element; color?: string; hint?: string };
const StatCard = ({ title, value, icon, color = 'text-blue-600', hint }: Props) => (
<div className="bg-gradient-to-r from-gray-900 to-gray-500 p-4 rounded-2xl shadow flex items-center justify-between transition-all duration-300 transform hover:scale-105 hover:brightness-110">
  <div>
    <div className="text-sm text-gray-300">{title}</div>
    <div className="text-3xl font-extrabold leading-tight text-white">{value}</div>
    {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
  </div>
  <div className={`text-3xl ${color} animate-bell`}>{icon}</div>
</div>

);
export default StatCard;
