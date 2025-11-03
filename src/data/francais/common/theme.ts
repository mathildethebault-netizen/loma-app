export interface Exercice {
  id: string;
  domaine: string;
  niveau: "CP" | "CE1" | "CE2";
  objectif: string;
  competence: string;
  question: string;
  reponses?: string[];
  bonneReponse?: string;
}