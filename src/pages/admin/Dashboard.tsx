import { useEffect, useState } from 'react'; 
import { supabase } from '../../supabase';
import StatCard from '../../components/StatCard';
import { FaQuestionCircle, FaLayerGroup, FaProjectDiagram, FaHistory } from 'react-icons/fa';
import Loader from '../../components/Loader';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ questions: 0, niveaux: 0, programmes: 0, sessionsActives: 0 });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [{ count: q }, { count: n }, { count: p }, { count: s }] = await Promise.all([
        supabase.from('Wilgo_questions').select('*', { count: 'exact', head: true }),
        supabase.from('Wilgo_niveaux').select('*', { count: 'exact', head: true }),
        supabase.from('Wilgo_programmes_scolaires').select('*', { count: 'exact', head: true }),
        supabase.from('Wilgo_sessions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      ]);
      setStats({ questions: q ?? 0, niveaux: n ?? 0, programmes: p ?? 0, sessionsActives: s ?? 0 });
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-6 bg-white">
      <h1 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-500 to-green-700">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          title="Questions publiées"
          value={stats.questions}
          icon={<FaQuestionCircle className="animate-bell text-[#5C3A00]" />} // Utilisation de la couleur text-[#5C3A00]
        />

        <StatCard
          title="Niveaux"
          value={stats.niveaux}
          icon={<FaLayerGroup className="animate-bell text-[#5C3A00]" />} // Utilisation de la couleur text-[#5C3A00]
        />

        <StatCard
          title="Programmes"
          value={stats.programmes}
          icon={<FaProjectDiagram className="animate-bell text-[#5C3A00]" />} // Utilisation de la couleur text-[#5C3A00]
        />

        <StatCard
          title="Sessions actives"
          value={stats.sessionsActives}
          icon={<FaHistory className="animate-bell text-[#5C3A00]" />} // Utilisation de la couleur text-[#5C3A00]
        />
      </div>

      <div className="bg-gradient-to-r from-green-300 via-green-500 to-green-700 rounded-2xl shadow p-6 text-white">
        <h2 className="text-lg font-semibold mb-2  bg-clip-text bg-gradient-to-r text-gray-800">
          Bienvenue
        </h2>
        <p className="text-gray-800">
          Utilise le menu à gauche pour gérer le contenu (programmes, niveaux, matières, chapitres, leçons), la banque de questions, les utilisateurs et les sessions.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
