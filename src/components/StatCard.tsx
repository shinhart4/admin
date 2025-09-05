// src/components/StatCard.tsx
type Props = { title: string; value: number | string; icon: JSX.Element; color?: string; hint?: string };
const StatCard = ({ title, value, icon, color = 'text-blue-600', hint }: Props) => (
  <div className="bg-white p-4 rounded-2xl shadow flex items-center justify-between">
    <div>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-extrabold leading-tight">{value}</div>
      {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
    </div>
    <div className={`text-3xl ${color}`}>{icon}</div>
  </div>
);
export default StatCard;
