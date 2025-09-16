// src/types.ts
export type Programme = { id: number; name: string; description?: string | null };
export type Niveau = { id: number; nom: string; programme_id: number };
export type Matiere = { id: number; nom: string; icon?: string | null; description?: string | null };
export type Chapitre = { id: number; titre: string; trimestre_id?: number | null; lecon_id?: number | null };
export type Lecon = { id: number; titre_lecon: string; matiere_id: number; niveau_id: number };

export type Question = {
  id: number;
  question_text: string;  // champ dans la base de données
  question_type: 'mcq' | 'true_false' | 'open'; // Type de la question
  matiere_id: number;  // FK id_matiere
  chapitre_id: number; // FK id_chapitre
  estimated_time?: number | null;  // Temps estimé en secondes
  answers?: any; // Réponses (type JSONB)
  explanation?: string | null; // Explication facultative
  niveau_id: number; // FK id_niveau
};

export type UserResponse = {
  id: number;
  user_id: number;  // ID de l'élève
  question_id: number;  // ID de la question
  user_answer: string;  // Réponse de l'élève
  date_reponse: string;
  is_correct: boolean  // Date/heure de la réponse
};

// export type Column<T> = {
//   key: keyof T;
//   header: string;
//   render?: (row: T) => JSX.Element | string;
//   className?: string;
// };

export type Utilisateur = {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'instructeur' | 'eleve';
  created_at?: string;
  last_active?: string | null;
};
export type Eleve = {
  id_eleve: number;
  id: number;          // Ajouté pour compatibilité avec Table/Form
  niveau_id: number;
  matricule: string;
  username: string;
  last_active?: string | null;
};

// export type Eleve = { id_eleve: number; niveau_id: number; matricule: string; name: string; last_active?: string | null };
export type Instructeur = { id: number; specialisation?: string | null; email: string };

export type Session = {
  id: number;
  user_id: number;
  niveau_id: number;
  chapitre_id: number;
  started_at: string;
  completed_at?: string | null;
  status: 'active' | 'completed' | 'abandoned' | 'paused';
  instructeur_id?: number | null;
};

export type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
};
