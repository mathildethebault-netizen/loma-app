/**
 * Agrégation des exercices enrichis
 * (généré automatiquement)
 */
import type { Exercice } from "../francais/common/types";
import { grammaireExercicesEnrichis } from "./grammaire";
import { conjugaisonExercicesEnrichis } from "./conjugaison";
import { orthographeExercicesEnrichis } from "./orthographe";
import { lexiqueExercicesEnrichis } from "./lexique";
import { expressionExercicesEnrichis } from "./expression";
import { comprehensionExercicesEnrichis } from "./comprehension";

export const datasetsByDomainEnrichi: Record<string, Exercice[]> = {
  "grammaire": grammaireExercicesEnrichis,
  "conjugaison": conjugaisonExercicesEnrichis,
  "orthographe": orthographeExercicesEnrichis,
  "lexique": lexiqueExercicesEnrichis,
  "expression": expressionExercicesEnrichis,
  "comprehension": comprehensionExercicesEnrichis,
};

export function getExercicesEnrichis(domaine: string): Exercice[] {
  return datasetsByDomainEnrichi[domaine] || [];
}
