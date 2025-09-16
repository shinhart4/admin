type Props = {
  onBack: () => void;
};

const ForgotPassword = ({ onBack }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-custom-light-yellow via-custom-orange to-custom-dark-orange p-4">
      <div className="flex flex-col gap-4 w-full max-w-md bg-black/70 backdrop-blur-md rounded-2xl shadow-xl p-6 text-white">
        <h2 className="text-2xl text-custom-light-brown text-center font-bold mb-4">
          Récupération de compte
        </h2>

        <input
          type="email"
          placeholder="Votre email"
          className="p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition"
        />

        <button className="bg-gradient-to-r from-green-300 via-green-500 to-green-700 hover:bg-gradient-to-r hover:from-green-400 hover:via-green-600 hover:to-green-800 p-3 rounded-xl text-white font-semibold transition transform hover:scale-105">
          Envoyer
        </button>

        <p
          className="text-sm text-gray-400 mt-2 text-center cursor-pointer hover:text-white hover:underline transition"
          onClick={onBack}
        >
          Retour
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
