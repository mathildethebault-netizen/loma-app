// ======================================================
// 🧠 Générateur d’exercices ludiques et variés — LOMA
// Version enrichie avec rotation quotidienne, XP et objectifs Éduscol
// ======================================================

import fs from "fs";
import path from "path";
import { fakerFR as faker } from "@faker-js/faker";
import { EDUSCOL_OBJECTIFS_FRANCAIS as EDUSCOL_OBJECTIFS } from "../src/data/francais_enrichi/eduscolObjectives_all";

type Domaine =
  | "grammaire"
  | "conjugaison"
  | "orthographe"
  | "lexique-expression";
type Niveau = "CP" | "CE1" | "CE2";

interface Exercice {
  id: string;
  domaine: Domaine;
  sousDomaine: string;
  niveau: Niveau;
  question: string;
  reponses: string[];
  bonneReponse: string;
  seed: number;
  cooldown: string;
  xpReward: number;
  objectif: string;
  competence: string;
}

// ======================================================
// 🎯 Petits jeux de mots pour varier les exercices
// ======================================================
const sujets = ["Le chat", "La fille", "Le garçon", "Mina", "Paul", "Le chien", "Loma", "Le dragon", "Le lapin", "La maîtresse"];
const verbes = ["saute", "court", "mange", "lit", "regarde", "dessine", "chante", "joue"];
const complements = ["dans le jardin", "à l’école", "sur la table", "dans la classe", "près du lac", "dans la maison"];

const sousDomaines = {
  grammaire: [
    "identifier le sujet",
    "repérer le verbe",
    "trouver le complément",
    "reconnaître la phrase correcte",
  ],
  conjugaison: [
    "conjuguer au présent",
    "trouver le bon verbe",
    "choisir la bonne terminaison",
  ],
  orthographe: [
    "trouver l’erreur",
    "choisir le mot juste",
    "repérer le son",
    "mots invariables",
  ],
  "lexique-expression": [
    "trouver le synonyme",
    "choisir le bon mot",
    "compléter la phrase",
  ],
};

// ======================================================
// 🧭 Association automatique aux objectifs Éduscol
// ======================================================
function getObjectiveFor(domaine: string, sousDomaine: string) {
  const domaineData = (EDUSCOL_OBJECTIFS as any)[domaine];
  if (!domaineData)
    return {
      objectif: "Découvrir et s'entraîner 🎯",
      competence: "Savoir faire un exercice du domaine",
    };

  const sousData = domaineData[sousDomaine];
  if (!sousData)
    return {
      objectif: "Découvrir et s'entraîner 🎯",
      competence: "Savoir faire un exercice du domaine",
    };

  return sousData;
}

// ======================================================
// 🧩 Génération d’exercices uniques
// ======================================================
function genererExercice(
  domaine: Domaine,
  sousDomaine: string,
  niveau: Niveau,
  index: number
): Exercice {
  const sujet = faker.helpers.arrayElement(sujets);
  const verbe = faker.helpers.arrayElement(verbes);
  const complement = faker.helpers.arrayElement(complements);
  const seed = faker.number.int({ min: 100, max: 999999 });
  const xp = faker.number.int({ min: 5, max: 20 });

  const { objectif, competence } = getObjectiveFor(domaine, sousDomaine);

  let question = "";
  let reponses: string[] = [];
  let bonneReponse = "";

  switch (domaine) {
    case "grammaire":
      if (sousDomaine === "identifier le sujet") {
        question = `Quel est le sujet dans la phrase : « ${sujet} ${verbe} ${complement}. » ?`;
        reponses = faker.helpers.shuffle([sujet, verbe, complement]);
        bonneReponse = sujet;
      } else if (sousDomaine === "repérer le verbe") {
        question = `Quel est le verbe dans la phrase : « ${sujet} ${verbe} ${complement}. » ?`;
        reponses = faker.helpers.shuffle([sujet, verbe, complement]);
        bonneReponse = verbe;
      } else {
        question = `Complète correctement : « ${sujet} ___ ${complement}. »`;
        reponses = faker.helpers.shuffle(verbes).slice(0, 3);
        bonneReponse = verbe;
      }
      break;

    case "conjugaison":
      question = `Conjugue le verbe "${verbe}" au présent avec "${sujet}".`;
      reponses = [`${verbe}`, `${verbe}s`, `${verbe}nt`, `${verbe}e`];
      bonneReponse = reponses[0];
      break;

    case "orthographe":
      if (sousDomaine === "mots invariables") {
        const motsInvariables = ["mais", "ou", "et", "donc", "or", "ni", "car", "très", "vite", "souvent"];
        const mot = faker.helpers.arrayElement(motsInvariables);
        const motFaux = mot + faker.helpers.arrayElement(["e", "s", "t"]);
        question = `Choisis le mot invariable correctement orthographié :`;
        reponses = faker.helpers.shuffle([mot, motFaux, faker.word.sample(), faker.word.sample()]);
        bonneReponse = mot;
      } else {
        question = `Choisis le mot correctement orthographié :`;
        const motFaux = verbe + verbe.slice(-1);
        reponses = Array.from(new Set(faker.helpers.shuffle([verbe, motFaux, verbe.replace(/e$/, "é"), verbe + "s"]))).slice(0, 4);
        bonneReponse = verbe;
      }
      break;

    case "lexique-expression":
      question = `Complète la phrase : « ${sujet} ${faker.helpers.arrayElement(["est", "semble", "paraît"])} ___ ${faker.helpers.arrayElement(["heureux", "rapide", "fatigué", "curieux"])}. »`;
      reponses = ["joyeux", "rapide", "fatigué", "curieux"];
      bonneReponse = faker.helpers.arrayElement(reponses);
      break;
  }

  return {
    id: `${domaine}-${index}-${seed}`,
    domaine,
    sousDomaine,
    niveau,
    question,
    reponses,
    bonneReponse,
    seed,
    cooldown: "1j",
    xpReward: xp,
    objectif,
    competence,
  };
}

// ======================================================
// 🚀 Génération massive (plus de 1000 variantes uniques)
// ======================================================
const niveaux: Niveau[] = ["CP", "CE1", "CE2"];
const exercices: Exercice[] = [];

let index = 1;
for (const domaine of Object.keys(sousDomaines) as Domaine[]) {
  for (const sous of sousDomaines[domaine]) {
    for (const niveau of niveaux) {
      for (let i = 0; i < 50; i++) {
        exercices.push(genererExercice(domaine, sous, niveau, index++));
      }
    }
  }
}

// ======================================================
// 💾 Sauvegarde automatique
// ======================================================
const outputDir = path.resolve("src/data/francais_enrichi");
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, "exercicesLudiques.json"),
  JSON.stringify(exercices, null, 2),
  "utf-8"
);

console.log(`✅ ${exercices.length} exercices ludiques générés avec succès avec objectifs Éduscol ! 🎮`);