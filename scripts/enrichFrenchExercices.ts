import fs from "fs";
import path from "path";

// ======================================================
// 🎯 Générateur d'exercices ludiques enrichis
// ======================================================

const domaines = [
  "grammaire",
  "conjugaison",
  "orthographe",
  "lexique",
  "expression",
  "comprehension",
];

const niveaux = ["CP", "CE1", "CE2"];

// 🔤 Mots de base inspirés du lexique Éduscol
const mots = [
  "chat", "chien", "maison", "livre", "école", "fleur", "arbre", "voiture",
  "pomme", "soleil", "lune", "enfant", "oiseau", "poisson", "neige", "vent",
  "rue", "montagne", "ville", "campagne"
];

function random(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Génère un exercice aléatoire selon le domaine
function generateExercice(domaine: string, niveau: string, id: number) {
  const mot = random(mots);
  const other1 = random(mots);
  const other2 = random(mots);

  const base = {
    id: `${domaine}-${id}`,
    domaine,
    niveau,
    objectif: "",
    competence: "",
    question: "",
    reponses: [mot, other1, other2],
    bonneReponse: mot,
  };

  switch (domaine) {
    case "orthographe":
      return {
        ...base,
        objectif: "Mémoriser l’orthographe de mots fréquents",
        competence: "Écrire sans erreur des mots appris",
        question: `Comment écrit-on correctement le mot "${mot}" ?`,
      };
    case "grammaire":
      return {
        ...base,
        objectif: "Identifier le verbe et le sujet dans une phrase simple",
        competence: "Reconnaître le verbe conjugué et son sujet",
        question: `Quel est le verbe dans cette phrase ? « Le ${mot} court vite. »`,
        reponses: [mot, "court", "vite"],
        bonneReponse: "court",
      };
    case "conjugaison":
      return {
        ...base,
        objectif: "Conjuguer correctement les verbes au présent",
        competence: "Employer les terminaisons verbales correctes selon le sujet",
        question: `Conjugue le verbe « ${mot} » au présent avec « Le chien ».`,
        reponses: [
          `Le chien ${mot}e`,
          `Le chien ${mot}es`,
          `Le chien ${mot}ent`,
          `Le chien ${mot}ons`
        ],
        bonneReponse: `Le chien ${mot}e`,
      };
    case "lexique":
      return {
        ...base,
        objectif: "Enrichir le vocabulaire et comprendre le sens des mots",
        competence: "Associer des mots de sens proches ou contraires",
        question: `Quel mot est synonyme de "${mot}" ?`,
        reponses: [other1, mot, other2],
        bonneReponse: mot,
      };
    case "expression":
      return {
        ...base,
        objectif: "Rédiger des phrases courtes et cohérentes",
        competence: "Utiliser correctement les connecteurs et les majuscules",
        question: `Choisis la phrase bien écrite :`,
        reponses: [
          `le ${mot} joue dans la maison`,
          `Le ${mot} joue dans la maison.`,
          `le ${mot} joue Dans la maison.`,
        ],
        bonneReponse: `Le ${mot} joue dans la maison.`,
      };
    case "comprehension":
      return {
        ...base,
        objectif: "Comprendre des phrases simples",
        competence: "Répondre à une question sur une phrase courte",
        question: `Dans la phrase : « Le ${mot} dort sur la table. » — que fait le ${mot} ?`,
        reponses: ["il mange", "il dort", "il saute"],
        bonneReponse: "il dort",
      };
    default:
      return base;
  }
}

// ======================================================
// 📦 Génération de tous les fichiers par domaine
// ======================================================
const basePath = path.resolve("src/data/francais_enrichi");

if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });

domaines.forEach((domaine) => {
  const dirPath = path.join(basePath, domaine);
  const filePath = path.join(dirPath, "index.ts");
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

  const exercices: any[] = [];
  let id = 1;

  niveaux.forEach((niveau) => {
    for (let i = 0; i < 10; i++) {
      exercices.push(generateExercice(domaine, niveau, id++));
    }
  });

  const content = `import { Exercice } from "../../francais/common/types";

export const ${domaine}Exercices: Exercice[] = ${JSON.stringify(exercices, null, 2)};
`;
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✅ Fichier généré : ${filePath}`);
});

console.log("\n🎉 Tous les exercices enrichis ont été générés avec succès !");