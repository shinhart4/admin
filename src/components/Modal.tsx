import { ReactNode } from 'react';

type Props = { 
  open: boolean; 
  title: string; 
  onClose: () => void; 
  children: ReactNode; 
  footer?: ReactNode; 
  size?: 'sm'|'md'|'lg'|'xl' 
};

const Modal = ({ open, title, onClose, children, footer, size='md' }: Props) => {
  if (!open) return null;
  const sizes = { sm:'max-w-md', md:'max-w-lg', lg:'max-w-2xl', xl:'max-w-4xl' }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className={`w-full ${sizes} rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-black via-gray-800 to-gray-300 text-white`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-600">
          <h3 className="font-semibold text-lg text-gray-100">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-5 py-3 border-t border-gray-600 bg-gradient-to-br from-black via-gray-800 to-gray-300 text-gray-100">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
