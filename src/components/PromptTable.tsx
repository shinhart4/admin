// src/components/PromptTable.tsx
import { Link } from 'react-router-dom';
import { countries } from '../routes';

type Prompt = {
  id: number;
  questiont_texte: string;
  answer: string;
  gradeLevel: string;
  country: string;
  wilgo_matiere: { nom: string }; // Matière
  wilgo_chapitre: { titre: string }; // Chapitre
  wilgo_niveaux: { nom: string }; // Niveau
  wilgo_programmes_scolaires: { name: string }; // Programme scolaire
};

type Props = {
  prompts: Prompt[];
  onDelete: (id: number) => void;
};

const PromptTable = ({ prompts, onDelete }: Props) => (
  <table className="min-w-full bg-white rounded shadow text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th className="text-left p-2">Question</th>
        <th className="text-left p-2">Answer Preview</th>
        <th className="p-2">Grade</th>
        <th className="p-2">Country</th>
        <th className="p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {prompts.map((prompt) => (
        <tr key={prompt.id} className="border-t">
          <td className="p-2">{prompt.questiont_texte.slice(0, 40)}...</td>
          <td className="p-2">{prompt.answer.slice(0, 60)}...</td>
          <td className="p-2 text-center">
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              {prompt.wilgo_niveaux?.nom}
            </span>
          </td>
          <td className="p-2 text-center">
            {
              countries.find((c) => c.code === prompt.country)?.name || prompt.country
            }
          </td>
          <td className="p-2 text-center">
            <Link to={`/edit/${prompt.id}`} className="text-blue-600 mr-2">Edit</Link>
            <button onClick={() => onDelete(prompt.id)} className="text-red-600">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default PromptTable;
