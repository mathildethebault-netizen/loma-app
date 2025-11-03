import { Exercice } from "../francais/common/types";

export const exercices: Exercice[] = [
  {
    id: "lecture-cp-1",
    niveau: "CP",
    domaine: "lecture",
    objectif: "Lire et comprendre des phrases simples.",
    competence: "Identifier les personnages, les lieux et les actions dans un texte court.",
    question: "Lis la phrase suivante : « Le chat dort sur le lit. » Que fait le chat ?",
    reponses: ["Il mange.", "Il dort.", "Il joue."],
    bonneReponse: "Il dort.",
    typeExercice: "qcm",
    emoji: "😺",
    feedbackPositif: "Bravo ! Tu as bien compris la phrase.",
    feedbackNegatif: "Essaie encore, relis bien la phrase.",
  },
  {
    id: "lecture-ce1-1",
    niveau: "CE1",
    domaine: "lecture",
    objectif: "Comprendre le sens global d’un texte court.",
    competence: "Repérer des informations explicites dans un texte narratif.",
    question:
      "Lis : « Léa met son manteau, car il fait froid dehors. » Pourquoi Léa met-elle son manteau ?",
    reponses: ["Parce qu’il pleut.", "Parce qu’il fait froid.", "Parce qu’il est tard."],
    bonneReponse: "Parce qu’il fait froid.",
    typeExercice: "qcm",
    emoji: "🧥",
    feedbackPositif: "Super, tu as bien compris la raison !",
    feedbackNegatif: "Regarde bien la phrase, la raison est écrite dedans.",
  },
  {
    id: "lecture-ce2-1",
    niveau: "CE2",
    domaine: "lecture",
    objectif: "Comprendre un texte plus long et en dégager le sens.",
    competence: "Repérer les éléments essentiels d’un texte narratif (personnages, lieu, temps).",
    question:
      "Dans l’histoire, « Paul prépare son sac pour aller à l’école », que s’apprête à faire Paul ?",
    reponses: [
      "Il va se promener.",
      "Il va à l’école.",
      "Il rentre à la maison.",
    ],
    bonneReponse: "Il va à l’école.",
    typeExercice: "qcm",
    emoji: "🎒",
    feedbackPositif: "Exactement ! Paul part à l’école.",
    feedbackNegatif: "Relis la phrase, il prépare son sac pour une raison.",
  },
];