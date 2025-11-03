// ======================================================
// 🧮 Import map — Monde Mathématiques Enrichi
// Liaison entre domaines et ensembles d’exercices ludiques enrichis
// ======================================================

import exercicesMaths from "../maths_enrichi/exercicesMaths.json" assert { type: "json" };
import type { Exercice } from "../francais/common/types";

// 🆕 Import des fichiers enrichis manuellement
// ======================================================
// 🔍 Jeux de données enrichis — répartis par domaine
// ======================================================

export const datasetsByDomain: Record<string, Exercice[]> = {
  maths: exercicesMaths as Exercice[],

  // 🌟 Sous-domaines
  nombres: (exercicesMaths as Exercice[]).filter(e => e.domaine === "nombres"),
  mesures: (exercicesMaths as Exercice[]).filter(e => e.domaine === "mesures"),
  espace: (exercicesMaths as Exercice[]).filter(e => e.domaine === "espace"),
  problemes: (exercicesMaths as Exercice[]).filter(e => e.domaine === "problemes"),
};

// ======================================================
// 🔍 Fonction utilitaire — Récupération des exercices enrichis
// ======================================================

export function getExercices(domaine: string): Exercice[] {
  return datasetsByDomain[domaine] ?? [];
}

// ======================================================
// ✅ Export global pour compatibilité
// ======================================================

export default datasetsByDomain;