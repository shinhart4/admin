// src/components/ConfirmDialog.tsx
type ConfirmDialogProps = {
  open: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmDialog = ({ open, message, onCancel, onConfirm }: ConfirmDialogProps) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <p>{message}</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onCancel} className="bg-gray-300 text-black px-4 py-2 rounded">Annuler</button>
          <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded">Confirmer</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
