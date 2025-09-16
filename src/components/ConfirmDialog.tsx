type ConfirmDialogProps = {
  open: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmDialog = ({ open, message, onCancel, onConfirm }: ConfirmDialogProps) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm z-50">
      <div className="w-full max-w-md bg-gradient-to-br from-black via-gray-800 to-gray-300 text-white rounded-2xl shadow-2xl p-6">
        <p className="text-gray-100">{message}</p>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500 transition-colors"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
