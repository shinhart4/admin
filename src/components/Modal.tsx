import { ReactNode } from 'react';

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
};

const Modal = ({ open, title, onClose, children, footer }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4 py-8">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-[#5C3A00]">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-[#5C3A00] space-y-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
