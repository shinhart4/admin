type Props = {
  onBack: () => void;
};

const ForgotPassword = ({ onBack }: Props) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto bg-black/70 backdrop-blur-md rounded-2xl shadow-[0_10px_30px_rgba(128,0,128,0.5)] p-6">
      <h2 className="text-2xl text-white text-center font-bold mb-4">Récupération de compte</h2>

      <input
        type="email"
        placeholder="Votre email"
        className="p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      />

      <button className="bg-purple-600 hover:bg-purple-700 p-3 rounded-xl text-white font-semibold transition transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
        Envoyer
      </button>

      <p
        className="text-sm text-gray-400 mt-2 text-center cursor-pointer hover:text-purple-400 hover:underline transition"
        onClick={onBack}
      >
        Retour
      </p>
    </div>
  );
};

export default ForgotPassword;

