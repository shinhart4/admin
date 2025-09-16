const Parametres = () => {
  return (
    <div className="p-6 space-y-4 bg-white">
      <h1 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-custom-light-yellow via-custom-orange to-custom-dark-orange mb-4">
        Paramètres de l'application
      </h1>
      <p className="text-custom-light-brown">
        Cette section permet de gérer les réglages globaux de l’administration Wilgo (langue, thèmes, préférences IA,
        notifications, etc.).
      </p>
    </div>
  );
};

export default Parametres;
