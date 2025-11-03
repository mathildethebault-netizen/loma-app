// ======================================================
// 📚 Monde Français – Données globales du Cycle 2
// ======================================================

import type { Exercice } from "./common/types";
import { grammaireExercices } from "./grammaire";
import { conjugaisonExercices } from "./conjugaison";
import { orthographeExercices } from "./orthographe";
import { lexiqueexpressionExercices } from "./lexique-expression";
import { comprehensionExercices } from "./comprehension";

// ======================================================
// 🧩 Agrégation par domaine
// ======================================================

export const datasetsByDomain: Record<string, Exercice[]> = {
  grammaire: grammaireExercices,
  conjugaison: conjugaisonExercices,
  orthographe: orthographeExercices,
  lexique: lexiqueexpressionExercices.filter((e) => e.domaine === "lexique"),
  expression: lexiqueexpressionExercices.filter((e) => e.domaine === "expression"),
  comprehension: comprehensionExercices,
};

// ======================================================
// 📦 Données globales (fusionnées)
// ======================================================

export const allFrancaisExercices: Exercice[] = [
  ...grammaireExercices,
  ...conjugaisonExercices,
  ...orthographeExercices,
  ...lexiqueexpressionExercices,
  ...comprehensionExercices,
];

// ======================================================
// ✅ Exports — compatibilité nommée + défaut
// ======================================================

export type { Exercice };

// ⚠️ Certains fichiers importent un export par défaut depuis ce module
// (ex. `import X from "./data/francais"`) ou via des barrels `export *`.
// On fournit donc un export par défaut pour éviter l'erreur :
// "Importing binding name 'default' cannot be resolved by star export entries."

const defaultExport = {
  datasetsByDomain,
  allFrancaisExercices,
};

export default defaultExport;