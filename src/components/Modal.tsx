// src/components/Modal.tsx
import { ReactNode } from 'react';

type Props = { open: boolean; title: string; onClose: () => void; children: ReactNode; footer?: ReactNode; size?: 'sm'|'md'|'lg'|'xl' };
const Modal = ({ open, title, onClose, children, footer, size='md' }: Props) => {
  if (!open) return null;
  const sizes = { sm:'max-w-md', md:'max-w-lg', lg:'max-w-2xl', xl:'max-w-4xl' }[size];
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className={`w-full ${sizes} bg-white rounded-2xl shadow-lg overflow-hidden`}>
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="px-5 py-3 border-t bg-gray-50">{footer}</div>}
      </div>
    </div>
  );
};
export default Modal;
