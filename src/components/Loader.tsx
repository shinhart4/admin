const Loader = ({ label = 'Chargement...' }: { label?: string }) => (
  <div className="w-full grid place-items-center py-12 text-custom-light-brown">
    <div className="animate-spin h-6 w-6 border-2 border-custom-dark-brown border-t-transparent rounded-full mr-3" />
    <img 
      src="/logo.png" // Remplacer par le chemin correct de l'avatar de Wilgo
      alt="Wilgo Avatar"
      className="h-12 w-12 rounded-full object-contain"
    />
    <span className="sr-only">{label}</span>
  </div>
);

export default Loader;
