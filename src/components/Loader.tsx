// src/components/Loader.tsx
const Loader = ({ label = 'Chargement...' }: { label?: string }) => (
  <div className="w-full grid place-items-center py-12 text-gray-600">
    <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-transparent rounded-full mr-3" />
    <span className="sr-only">{label}</span>
  </div>
);
export default Loader;
