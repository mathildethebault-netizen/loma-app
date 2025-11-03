// ======================================================
// 🌸 Import Map — Monde du Français enrichi (Lecture, Vocabulaire, Grammaire)
// ======================================================

import { Exercice } from "../francais/common/types";
import objectifsData from "./objectifs_francais.json";

// ======================================================
// 🗺️ Mapping entre domaines et objectifs
// ======================================================
export const importMap: Record<string, any> = {
  lecture: objectifsData.lecture,
  vocabulaire: objectifsData.vocabulaire,
  "grammaire-orthographe": objectifsData["grammaire-orthographe"],
};

// ======================================================
// 🧩 Fonction d’accès aux exercices / objectifs
// ======================================================
export const getExercices = (domaine: string): Exercice[] => {
  const data = importMap[domaine];
  if (!data) {
    console.warn(`⚠️ Domaine "${domaine}" introuvable dans importMap.ts`);
    return [];
  }

  // Transforme les objectifs JSON en pseudo-exercices
  return Object.entries(data).flatMap(([sousDomaine, objectifs]) =>
    (objectifs as string[]).map((objectif, index) => ({
      id: `${domaine}-${sousDomaine}-${index}`,
      domaine,
      objectif,
      competence: sousDomaine,
      question: objectif,
      typeExercice: "qcm",
      reponses: ["Oui", "Non"], // temporaire — exemple générique
      bonneReponse: "Oui",
      emoji: "🌸"
    }))
  );
};