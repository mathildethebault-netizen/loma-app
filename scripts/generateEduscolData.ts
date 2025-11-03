// scripts/generateEduscolData.ts
import fs from "fs";
import path from "path";

const ROOT = process.cwd();

// Chemins de base
const dataBase = path.join(ROOT, "src", "data", "francais");
const commonTypesImport = `import { Exercice } from "../common/types";\n\n`;

// Sécurité : crée le dossier de base
if (!fs.existsSync(dataBase)) {
  fs.mkdirSync(dataBase, { recursive: true });
}

// ======================================================
// Helpers
// ======================================================
type Niveau = "CP" | "CE1" | "CE2";

const niveaux: Niveau[] = ["CP", "CE1", "CE2"];
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Répartition CP/CE1/CE2 : i%3
const niveauAt = (i: number): Niveau => niveaux[i % 3];

// Génère un ID court
const id = (prefix: string, i: number) => `${prefix}-${i + 1}`;

// Escape TS string
const esc = (s: string) => s.replace(/`/g, "\\`");

// ======================================================
// Tables d’objectifs & compétences (Éduscol-like)
// ======================================================

const GRAMMAR_OBJECTIFS = [
  "Identifier la nature des mots (nom, verbe, adjectif, déterminant)",
  "Identifier le sujet du verbe dans une phrase simple",
  "Repérer le groupe nominal et ses expansions",
  "Reconnaître le verbe conjugué dans la phrase",
  "Distinguer phrase affirmative / négative",
  "Repérer ponctuation et majuscule en début de phrase",
];

const GRAMMAR_COMP = [
  "Reconnaître la nature des mots",
  "Identifier le sujet et le verbe",
  "Analyser un groupe nominal",
  "Comprendre la structure de la phrase",
  "Respecter les conventions de l’écrit",
];

const CONJ_OBJECTIFS = [
  "Conjuguer au présent (être, avoir, verbes du 1er groupe)",
  "Conjuguer au futur (verbes fréquents)",
  "Conjuguer à l’imparfait (verbes fréquents)",
  "Accorder verbe / sujet (personne & nombre)",
  "Distinguer infinitif / verbe conjugué",
];

const CONJ_COMP = [
  "Conjuguer au présent",
  "Conjuguer au futur",
  "Conjuguer à l’imparfait",
  "Accorder verbe et sujet",
  "Identifier l’infinitif",
];

const ORTHO_OBJECTIFS = [
  "Mémoriser l’orthographe des mots fréquents",
  "Utiliser correctement les accents",
  "Accorder le nom et l’adjectif en genre et en nombre",
  "Différencier des homophones grammaticaux (a/à, et/est)",
  "Respecter les marques du pluriel",
];

const ORTHO_COMP = [
  "Écrire sans erreur des mots usuels",
  "Utiliser les accents",
  "Accorder nom et adjectif",
  "Distinguer les homophones",
  "Orthographier correctement au pluriel",
];

const LEX_OBJECTIFS = [
  "Enrichir le lexique (synonymes/antonymes)", 
  "Identifier le champ lexical",
  "Choisir le mot précis selon le contexte",
  "Comprendre des expressions courantes",
];

const LEX_COMP = [
  "Mobiliser des synonymes",
  "Reconnaître un champ lexical",
  "Employer un vocabulaire précis",
  "Comprendre le sens d’expressions",
];

const EXPR_OBJECTIFS = [
  "Produire une phrase simple correcte",
  "Compléter une phrase de façon cohérente",
  "Réécrire une phrase en améliorant le vocabulaire",
  "Ordonner des mots pour former une phrase",
];

const EXPR_COMP = [
  "Rédiger une phrase correcte",
  "Assurer la cohérence de la phrase",
  "Améliorer le lexique d’une phrase",
  "Respecter l’ordre syntaxique",
];

const COMP_OBJECTIFS = [
  "Comprendre un court texte narratif",
  "Repérer une information explicite",
  "Inférer une information implicite simple",
  "Identifier le personnage principal",
  "Déterminer le lieu ou le moment d’une scène",
];

const COMP_COMP = [
  "Comprendre un texte court",
  "Prélever des informations",
  "Faire une inférence simple",
  "Identifier les éléments narratifs",
];

// Petites banques de phrases pour générer des items
const SUJETS = ["Le chat", "La maîtresse", "Paul", "Mina", "Les enfants", "Le chien", "Le lapin", "La voiture"];
const VERBES = ["dort", "lit", "mange", "court", "chante", "regarde", "saute", "dessine"];
const LIEUX = ["dans le jardin", "à l'école", "dans la cuisine", "sur le canapé", "dans la cour", "dans la classe"];
const OBJETS = ["un livre", "une pomme", "un gâteau", "une balle", "un dessin", "une chanson"];
const ADJ = ["grand", "petit", "joli", "rapide", "heureux", "malin", "gentil", "fatigué"];

// ======================================================
// Génération par domaine
// ======================================================

function makeGrammaire50(): string {
  const items: string[] = [];

  for (let i = 0; i < 50; i++) {
    const niveau = niveauAt(i);
    const obj = pick(GRAMMAR_OBJECTIFS);
    const comp = pick(GRAMMAR_COMP);

    // Fabrique une phrase modèle
    const sujet = pick(SUJETS);
    const verbe = pick(VERBES);
    const lieu = pick(LIEUX);
    const phrase = `${sujet} ${verbe} ${lieu}.`;

    // Selon objectif choisi, on fabrique question + réponses
    const type = obj.includes("nature des mots")
      ? "nature"
      : obj.includes("sujet")
      ? "sujet"
      : obj.includes("groupe nominal")
      ? "gn"
      : obj.includes("ponctuation")
      ? "ponct"
      : "verbe";

    let question = "";
    let reponses: string[] = [];
    let bonne = "";

    if (type === "nature") {
      question = `Quel est le verbe dans la phrase : « ${phrase} » ?`;
      reponses = [pick(SUJETS).split(" ")[0].toLowerCase(), verbe, pick(LIEUX).split(" ")[1]];
      bonne = verbe;
    } else if (type === "sujet") {
      question = `Quel est le sujet dans la phrase : « ${phrase} » ?`;
      reponses = [sujet, verbe, lieu];
      bonne = sujet;
    } else if (type === "gn") {
      question = `Quel groupe de mots forme le groupe nominal sujet dans : « ${phrase} » ?`;
      reponses = [sujet, verbe, lieu];
      bonne = sujet;
    } else if (type === "ponct") {
      question = `Quelle est la bonne ponctuation de fin de phrase ? « ${sujet} ${verbe} ${lieu} »`;
      reponses = [".", "?", "!"];
      bonne = ".";
    } else {
      question = `Quel mot est le verbe conjugué dans : « ${phrase} » ?`;
      reponses = [sujet.split(" ")[1] || sujet, verbe, lieu.split(" ")[0]];
      bonne = verbe;
    }

    items.push(`{
  id: "${id("gram", i)}",
  domaine: "grammaire",
  niveau: "${niveau}",
  objectif: "${esc(obj)}",
  competence: "${esc(comp)}",
  question: "${esc(question)}",
  reponses: ${JSON.stringify(reponses)},
  bonneReponse: "${esc(bonne)}"
}`);
  }

  return `${commonTypesImport}export const grammaireExercices: Exercice[] = [
${items.join(",\n")}
];\n`;
}

function makeConjugaison50(): string {
  const items: string[] = [];

  for (let i = 0; i < 50; i++) {
    const niveau = niveauAt(i);
    const obj = pick(CONJ_OBJECTIFS);
    const comp = pick(CONJ_COMP);

    const sujet = pick(SUJETS);
    const verbe = pick(VERBES);
    const temps = obj.includes("présent") ? "présent"
                : obj.includes("futur")   ? "futur"
                : obj.includes("imparfait") ? "imparfait"
                : "présent";

    // Conjugaisons très simplifiées pour l’exemple
    const conj = {
      "présent": {
        "je": verbe + "e", "tu": verbe + "es", "il": verbe + "e",
        "nous": verbe + "ons", "vous": verbe + "ez", "ils": verbe + "ent"
      },
      "futur": {
        "je": verbe + "rai", "tu": verbe + "ras", "il": verbe + "ra",
        "nous": verbe + "rons", "vous": verbe + "rez", "ils": verbe + "ront"
      },
      "imparfait": {
        "je": verbe + "ais", "tu": verbe + "ais", "il": verbe + "ait",
        "nous": verbe + "ions", "vous": verbe + "iez", "ils": verbe + "aient"
      }
    } as const;

    const pronom = pick(["je","tu","il","nous","vous","ils"]);
    const conjugaisonTemps = conj[temps as keyof typeof conj] as Record<string, string>;
    const bonne = conjugaisonTemps && pronom in conjugaisonTemps
      ? conjugaisonTemps[pronom]
      : `${verbe}`;

    const distract1 = bonne.replace(/.$/, "a");
    const distract2 = bonne.replace(/.$/, "e");

    const question = `Conjugue au ${temps} : « ${cap(pronom)} ${verbe} … »`;
    const reponses = Array.from(new Set([bonne, distract1, distract2])).slice(0,3);

    items.push(`{
  id: "${id("conj", i)}",
  domaine: "conjugaison",
  niveau: "${niveau}",
  objectif: "${esc(obj)}",
  competence: "${esc(comp)}",
  question: "${esc(question)}",
  reponses: ${JSON.stringify(reponses)},
  bonneReponse: "${esc(bonne)}"
}`);
  }

  return `${commonTypesImport}export const conjugaisonExercices: Exercice[] = [
${items.join(",\n")}
];\n`;
}

function makeOrthographe50(): string {
  const items: string[] = [];

  for (let i = 0; i < 50; i++) {
    const niveau = niveauAt(i);
    const obj = pick(ORTHO_OBJECTIFS);
    const comp = pick(ORTHO_COMP);

    let question = "";
    let reponses: string[] = [];
    let bonne = "";

    if (obj.includes("accents")) {
      question = `Quelle est l’orthographe correcte ?`;
      const base = pick(["pere", "tache", "eleve", "cout"]);
      const withAccent = base
        .replace("pere","père").replace("tache","tâche")
        .replace("eleve","élève").replace("cout","coût");
      reponses = [base, withAccent, base + "e"];
      bonne = withAccent;
    } else if (obj.includes("homophones")) {
      question = `Choisis la bonne orthographe : « Il ___ très content. »`;
      reponses = ["est", "et", "ait"];
      bonne = "est";
    } else if (obj.includes("pluriel")) {
      const nom = pick(["chat", "chien", "voiture", "fleur"]);
      question = `Écris le pluriel de « ${nom} ».`;
      reponses = [`${nom}s`, `${nom}x`, `${nom}es`];
      bonne = `${nom}s`;
    } else if (obj.includes("Accorder le nom et l’adjectif")) {
      const adj = pick(ADJ);
      question = `Choisis l’accord correct : « Les maisons sont _____. »`;
      reponses = [adj, `${adj}es`, `${adj}s`];
      bonne = `${adj}es`;
    } else {
      const mot = pick(["château", "monsieur", "beaucoup", "toujours"]);
      question = `Écris correctement :`;
      reponses = [mot, mot.replace("e","é"), mot.replace("ou","u")];
      bonne = mot;
    }

    items.push(`{
  id: "${id("ortho", i)}",
  domaine: "orthographe",
  niveau: "${niveau}",
  objectif: "${esc(obj)}",
  competence: "${esc(comp)}",
  question: "${esc(question)}",
  reponses: ${JSON.stringify(reponses)},
  bonneReponse: "${esc(bonne)}"
}`);
  }

  return `${commonTypesImport}export const orthographeExercices: Exercice[] = [
${items.join(",\n")}
];\n`;
}

function makeLexiqueExpression100(): string {
  const items: string[] = [];

  // 50 LEXIQUE
  for (let i = 0; i < 50; i++) {
    const niveau = niveauAt(i);
    const obj = pick(LEX_OBJECTIFS);
    const comp = pick(LEX_COMP);
    const mot = pick(["rapide", "content", "joli", "sage", "malin"]);
    const syn = mot === "rapide" ? "vite"
             : mot === "content" ? "heureux"
             : mot === "joli" ? "beau"
             : mot === "sage" ? "calme"
             : "astucieux";
    const question = `Trouve un synonyme de « ${mot} ».`;
    const reponses = [syn, mot, "triste"];
    const bonne = syn;

    items.push(`{
  id: "${id("lex", i)}",
  domaine: "lexique",
  niveau: "${niveau}",
  objectif: "${esc(obj)}",
  competence: "${esc(comp)}",
  question: "${esc(question)}",
  reponses: ${JSON.stringify(reponses)},
  bonneReponse: "${esc(bonne)}"
}`);
  }

  // 50 EXPRESSION
  for (let i = 0; i < 50; i++) {
    const niveau = niveauAt(i);
    const obj = pick(EXPR_OBJECTIFS);
    const comp = pick(EXPR_COMP);

    const sujet = pick(SUJETS);
    const verbe = pick(VERBES);
    const lieu = pick(LIEUX);
    const question = `Complète la phrase : « ${sujet} ____ ${lieu}. »`;
    const bonne = verbe;
    const reponses = [bonne, "être", "avoir"];

    items.push(`{
  id: "${id("expr", i)}",
  domaine: "expression",
  niveau: "${niveau}",
  objectif: "${esc(obj)}",
  competence: "${esc(comp)}",
  question: "${esc(question)}",
  reponses: ${JSON.stringify(reponses)},
  bonneReponse: "${esc(bonne)}"
}`);
  }

  // Exporte sous deux noms (compat ascendant)
  return `${commonTypesImport}export const lexiqueExpressionExercices: Exercice[] = [
${items.join(",\n")}
];

// Compatibilité avec d'anciens imports (minuscule)
export const lexiqueexpressionExercices = lexiqueExpressionExercices;
`;
}

function makeComprehension50(): string {
  const items: string[] = [];

  for (let i = 0; i < 50; i++) {
    const niveau = niveauAt(i);
    const obj = pick(COMP_OBJECTIFS);
    const comp = pick(COMP_COMP);

    const sujet = pick(SUJETS);
    const verbe = pick(VERBES);
    const lieu = pick(LIEUX);
    const support = `${sujet} ${verbe} ${lieu}. Il fait beau et tout le monde sourit.`;

    let question = "";
    let reponses: string[] = [];
    let bonne = "";

    if (obj.includes("explicite")) {
      question = `Dans le texte : « ${support} » — Où se passe l’action ?`;
      reponses = [lieu, "à la maison", "au parc"];
      bonne = lieu;
    } else if (obj.includes("implicite")) {
      question = `Dans le texte : « ${support} » — Le temps est-il agréable ?`;
      reponses = ["Oui", "Non", "On ne sait pas"];
      bonne = "Oui";
    } else if (obj.includes("personnage")) {
      question = `Dans le texte : « ${support} » — Qui est le personnage principal ?`;
      reponses = [sujet, "Le voisin", "La maman"];
      bonne = sujet;
    } else {
      question = `Dans le texte : « ${support} » — Que fait le personnage ?`;
      reponses = [verbe, "mange", "parle"];
      bonne = verbe;
    }

    items.push(`{
  id: "${id("comp", i)}",
  domaine: "comprehension",
  niveau: "${niveau}",
  objectif: "${esc(obj)}",
  competence: "${esc(comp)}",
  question: "${esc(question)}",
  reponses: ${JSON.stringify(reponses)},
  bonneReponse: "${esc(bonne)}",
  support: "${esc(support)}"
}`);
  }

  return `${commonTypesImport}export const comprehensionExercices: Exercice[] = [
${items.join(",\n")}
];\n`;
}

// ======================================================
// Écriture des fichiers par domaine
// ======================================================
function writeDomainFile(dir: string, content: string) {
  const dirPath = path.join(dataBase, dir);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  const filePath = path.join(dirPath, "index.ts");
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✅ Généré : ${filePath}`);
}

writeDomainFile("grammaire",           makeGrammaire50());
writeDomainFile("conjugaison",         makeConjugaison50());
writeDomainFile("orthographe",         makeOrthographe50());
writeDomainFile("lexique-expression",  makeLexiqueExpression100());
writeDomainFile("comprehension",       makeComprehension50());

console.log("\n🎉 300 exercices générés (50 par sous-domaine). Prêts à l’emploi !\n");