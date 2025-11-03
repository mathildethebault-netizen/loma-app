export interface Exercice {
  id: string;
  domaine: string;
  niveau: "CP" | "CE1" | "CE2";
  objectif: string;
  competence: string;
  question: string;
  reponses?: string[];
  bonneReponse?: string;

  // 🌈 Types d’exercices ludiques
  typeExercice?: "qcm" | "texte_a_trous" | "drag_drop" | "phrase_a_reformer";

  // ✏️ Pour les textes à trous
  texteATrous?: {
    original: string;
    masque: string;
    trou: string;
  };

  // 🎯 Pour les exercices de type drag & drop
  dragDrop?: {
    consigne: string;
    items: string[];
    zones: string[];
    solution: Record<string, string>;
  };

  // 🧩 Métadonnées optionnelles
  difficulte?: number;
  hint?: string;
  seed?: number;
  cooldown?: string;
  xpReward?: number;
  emoji?: string;
  nextAvailable?: string;
  feedbackPositif?: string;
  feedbackNegatif?: string;
}

export interface Exercice {
  id: string;
  titre: string;
  consigne: string;
  questions: {
    texte: string;
    options: string[];
    reponse: string;
  }[];
}
