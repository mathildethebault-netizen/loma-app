/**
 * 🧠 Script : generateExercices.ts
 * Génère automatiquement des exercices réalistes à partir des objectifs officiels.
 */

import fs from "fs";
import path from "path";
import objectifsData from "../data/francais_enrichi/objectifs.json" assert { type: "json" };

// Nombre d’exercices à générer par objectif
const NB_EXERCICES_PAR_OBJECTIF = 50;

type Domaine = "lecture" | "vocabulaire" | "grammaire_orthographe";

interface Exercice {
  domaine: Domaine;
  objectif: string;
  question: string;
  reponses: string[];
  bonneReponse: string;
  competence: string;
}

// --- OUTILS GÉNÉRAUX ---
function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

// --- GÉNÉRATION SELON LE DOMAINE ---

/** 🧩 Génère un exercice de grammaire ou orthographe (version enrichie) */
function generateGrammaireOrthographeExercice(objectif: string): Exercice {
  const objectifLower = objectif.toLowerCase();

  // 🔹 Cas 1 : Accord sujet-verbe
  if (objectifLower.includes("accord") && objectifLower.includes("verbe")) {
    const ex = random([
      { phrase: "Les enfants ___ dans la cour.", options: ["joue", "jouent"], bonne: "jouent" },
      { phrase: "Le chat et le chien ___.", options: ["court", "courent"], bonne: "courent" },
      { phrase: "La fille ___ un livre.", options: ["lis", "lit"], bonne: "lit" },
    ]);
    return {
      domaine: "grammaire_orthographe",
      objectif,
      question: `Complète correctement : ${ex.phrase.replace("___", "_____")}`,
      reponses: shuffle(ex.options),
      bonneReponse: ex.bonne,
      competence: "Accord sujet-verbe",
    };
  }

  // 🔹 Cas 2 : Accord adjectif/nom
  if (objectifLower.includes("accord") && objectifLower.includes("adjectif")) {
    const ex = random([
      { phrase: "Une robe ___.", options: ["rouge", "rouges"], bonne: "rouge" },
      { phrase: "Des fleurs ___.", options: ["belle", "belles"], bonne: "belles" },
      { phrase: "Un homme ___.", options: ["gentil", "gentille"], bonne: "gentil" },
    ]);
    return {
      domaine: "grammaire_orthographe",
      objectif,
      question: `Choisis la forme correcte : ${ex.phrase.replace("___", "_____")}`,
      reponses: shuffle(ex.options),
      bonneReponse: ex.bonne,
      competence: "Accord adjectif-nom",
    };
  }

  // 🔹 Cas 3 : Conjugaisons (présent, futur, imparfait)
  if (objectifLower.includes("conjug")) {
    const ex = random([
      { phrase: "Je ___ au parc. (aller, présent)", options: ["vais", "va", "vont"], bonne: "vais" },
      { phrase: "Demain, nous ___ un gâteau. (faire, futur)", options: ["ferons", "faisons", "faisaient"], bonne: "ferons" },
      { phrase: "Quand j’étais petit, je ___ au foot. (jouer, imparfait)", options: ["jouais", "joue", "jouerai"], bonne: "jouais" },
    ]);
    return {
      domaine: "grammaire_orthographe",
      objectif,
      question: `Complète avec la bonne forme du verbe : ${ex.phrase.replace("___", "_____")}`,
      reponses: shuffle(ex.options),
      bonneReponse: ex.bonne,
      competence: "Conjugaison",
    };
  }

  // 🔹 Cas 4 : Homophones grammaticaux
  if (objectifLower.includes("homophone") || objectifLower.includes("a/à") || objectifLower.includes("sa/ça") || objectifLower.includes("son/sont")) {
    const ex = random([
      { phrase: "Il ___ une pomme. (a / à)", options: ["a", "à"], bonne: "a" },
      { phrase: "C’est ___ maison. (sa / ça)", options: ["sa", "ça"], bonne: "sa" },
      { phrase: "Ils ___ partis. (son / sont)", options: ["son", "sont"], bonne: "sont" },
    ]);
    return {
      domaine: "grammaire_orthographe",
      objectif,
      question: `Choisis le bon mot : ${ex.phrase.replace("___", "_____")}`,
      reponses: shuffle(ex.options),
      bonneReponse: ex.bonne,
      competence: "Homophones grammaticaux",
    };
  }

  // 🔹 Cas 5 : Orthographe lexicale / ponctuation
  if (objectifLower.includes("ponct") || objectifLower.includes("orthographe")) {
    const ex = random([
      { phrase: "Quelle belle journée", options: ["Quelle belle journée!", "Quelle belle journée.", "Quelle belle journée?"], bonne: "Quelle belle journée!" },
      { phrase: "Tu viens demain", options: ["Tu viens demain?", "Tu viens demain.", "Tu viens demain!"], bonne: "Tu viens demain?" },
      { phrase: "Attention", options: ["Attention!", "Attention.", "Attention?"], bonne: "Attention!" },
    ]);
    return {
      domaine: "grammaire_orthographe",
      objectif,
      question: `Choisis la phrase bien écrite :`,
      reponses: shuffle(ex.options),
      bonneReponse: ex.bonne,
      competence: "Ponctuation / Orthographe lexicale",
    };
  }

  // 🔹 Cas par défaut
  const ex = random([
    { phrase: "Complète la phrase correctement : Les enfants ___ heureux.", options: ["sont", "es", "est"], bonne: "sont" },
  ]);
  return {
    domaine: "grammaire_orthographe",
    objectif,
    question: ex.phrase,
    reponses: shuffle(ex.options),
    bonneReponse: ex.bonne,
    competence: "Grammaire générale",
  };
}

/** 🧩 Génère un exercice de vocabulaire */
function generateVocabulaireExercice(objectif: string): Exercice {
  const synonymes = [
    { mot: "heureux", reponses: ["joyeux", "triste", "fatigué", "fâché"], bonne: "joyeux" },
    { mot: "rapide", reponses: ["lent", "vif", "paresseux", "doux"], bonne: "vif" },
    { mot: "calme", reponses: ["paisible", "bruyant", "colérique", "agité"], bonne: "paisible" },
  ];

  const contraires = [
    { mot: "grand", reponses: ["petit", "haut", "fort", "beau"], bonne: "petit" },
    { mot: "chaud", reponses: ["froid", "tiède", "sec", "doux"], bonne: "froid" },
  ];

  const famille = [
    { mot: "chanson", reponses: ["chanter", "chanteur", "chant", "tapis"], bonne: "chant" },
  ];

  let pool = synonymes;
  if (objectif.toLowerCase().includes("contraire")) pool = contraires;
  else if (objectif.toLowerCase().includes("famille")) pool = famille;

  const ex = random(pool);

  return {
    domaine: "vocabulaire",
    objectif,
    question: `Quel mot a un sens proche ou lié à "${ex.mot}" ?`,
    reponses: shuffle(ex.reponses),
    bonneReponse: ex.bonne,
    competence: objectif,
  };
}

/** 🧩 Génère un exercice de lecture */
function generateLectureExercice(objectif: string): Exercice {
  const comprehension = [
    {
      texte: "Le chat dort sur le canapé. Il est tout gris.",
      question: "Où dort le chat ?",
      reponses: ["Sur le lit", "Sur le canapé", "Dans le jardin", "Sous la table"],
      bonne: "Sur le canapé",
    },
    {
      texte: "Marie aime les fleurs rouges. Elle en cueille tous les matins.",
      question: "Quelle couleur de fleurs aime Marie ?",
      reponses: ["Jaunes", "Bleues", "Rouges", "Blanches"],
      bonne: "Rouges",
    },
  ];

  const ex = random(comprehension);

  return {
    domaine: "lecture",
    objectif,
    question: `${ex.texte}\n\n${ex.question}`,
    reponses: shuffle(ex.reponses),
    bonneReponse: ex.bonne,
    competence: objectif,
  };
}

// --- MOTEUR PRINCIPAL ---
const allExercices: Exercice[] = [];

(Object.entries(objectifsData) as [Domaine, Record<string, string[]>][]).forEach(([domaine, sousDomaines]) => {
  Object.entries(sousDomaines).forEach(([sous, objectifs]) => {
    objectifs.forEach((objectif) => {
      for (let i = 0; i < NB_EXERCICES_PAR_OBJECTIF; i++) {
        let exercice: Exercice;
        if (domaine === "grammaire_orthographe") exercice = generateGrammaireOrthographeExercice(objectif);
        else if (domaine === "vocabulaire") exercice = generateVocabulaireExercice(objectif);
        else exercice = generateLectureExercice(objectif);
        allExercices.push(exercice);
      }
    });
  });
});

// --- SAUVEGARDE ---
const outputPath = path.resolve("src/data/francais_enrichi/exercicesGeneres.json");
fs.writeFileSync(outputPath, JSON.stringify(allExercices, null, 2), "utf-8");

console.log("✅ Génération terminée !");
console.log("📦 Nombre total d’exercices :", allExercices.length);
console.log("🛠️ Fichier créé :", outputPath);