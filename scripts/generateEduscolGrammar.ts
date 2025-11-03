import fs from "fs";
import path from "path";

interface Exercice {
  id: string;
  domaine: string;
  niveau: "CP" | "CE1" | "CE2";
  objectif: string;
  competence: string;
  question: string;
  reponses: string[];
  bonneReponse: string;
}

const niveaux: ("CP" | "CE1" | "CE2")[] = ["CP", "CE1", "CE2"];
const basePath = path.resolve("src/data/francais/grammaire");

// Objectifs Eduscol officiels pour Cycle 2
const objectifs = {
  CP: [
    "Identifier le verbe et le sujet dans une phrase simple",
    "Reconnaître la ponctuation et les majuscules",
    "Distinguer les noms et les verbes dans une phrase",
    "Repérer le groupe nominal sujet",
    "Compléter une phrase avec le bon verbe",
  ],
  CE1: [
    "Identifier le groupe nominal et ses expansions",
    "Accorder le verbe avec le sujet (singulier/pluriel)",
    "Reconnaître les types de phrases : affirmative, négative, interrogative",
    "Repérer la fonction du mot dans la phrase",
    "Compléter une phrase avec le bon pronom",
  ],
  CE2: [
    "Identifier les accords en genre et en nombre",
    "Distinguer les classes grammaticales (nom, adjectif, verbe, pronom, déterminant)",
    "Transformer une phrase du singulier au pluriel",
    "Identifier les compléments du verbe",
    "Reconnaître les formes de phrases : déclarative, interrogative, exclamative",
  ],
};

// Mots simples utilisés dans les phrases
const mots = ["chat", "chien", "fille", "garçon", "maîtresse", "lapin", "papa", "maman", "Paul", "Mina"];

function genererExercice(niveau: "CP" | "CE1" | "CE2", index: number): Exercice {
  const objectif = objectifs[niveau][index % objectifs[niveau].length];
  const sujet = mots[index % mots.length];
  const verbe = ["mange", "court", "lit", "chante", "regarde"][index % 5];
  const complement = ["dans la cour", "à l’école", "sur la table", "dans le jardin", "avec ses amis"][index % 5];

  const question = `Dans la phrase : « ${sujet} ${verbe} ${complement}. », que faut-il identifier ?`;
  const reponses = [
    "Le verbe",
    "Le sujet",
    "Le complément",
    "La ponctuation",
  ];
  const bonneReponse = index % 2 === 0 ? "Le verbe" : "Le sujet";

  return {
    id: `gram-eduscol-${niveau}-${index + 1}`,
    domaine: "grammaire",
    niveau,
    objectif,
    competence: objectif,
    question,
    reponses,
    bonneReponse,
  };
}

function genererExercices(): Exercice[] {
  const result: Exercice[] = [];
  niveaux.forEach((niveau) => {
    for (let i = 0; i < (niveau === "CE2" ? 20 : 15); i++) {
      result.push(genererExercice(niveau, i));
    }
  });
  return result;
}

function sauvegarderExercices() {
  const exercices = genererExercices();
  const filePath = path.join(basePath, "index.ts");

  const content = `import { Exercice } from "../common/types";

export const grammaireExercices: Exercice[] = ${JSON.stringify(exercices, null, 2)};
`;
  fs.mkdirSync(basePath, { recursive: true });
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✅ 50 exercices Eduscol de grammaire générés avec succès !`);
}

sauvegarderExercices();