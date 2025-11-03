/* ================================================================
   🧠 Générateur d’exercices Éduscol — Grammaire & Structure (Plan 3)
   ----------------------------------------------------------------
   Objectifs :
   - Reconnaître les phrases simples et complexes
   - Identifier sujet, verbe, complément
   - Travailler les accords dans le GN
   - Manipuler la phrase : déplacer, remplacer, supprimer, ajouter
   ================================================================= */

import fs from "fs";
import path from "path";

// Types locaux pour guider la génération (la sortie doit matcher Exercice du projet)
type Niveau = "CP" | "CE1" | "CE2";
type Domaine = "grammaire";

interface Exercice {
  id: string;
  domaine: Domaine;
  niveau: Niveau;
  objectif: string;
  competence: string;
  question: string;
  reponses?: string[];
  bonneReponse?: string;
  contexte?: string;
  difficulte?: 1 | 2 | 3;
  typeExercice: "choix_multiple" | "phrase_a_reformer";
  hint?: string;
  phraseAReformer?: string;
  reponsesPossibles?: string[];
}

// ==========================
// 🔧 Outils utilitaires
// ==========================
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const shuffle = <T,>(a: T[]): T[] => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};
const nextId = (() => {
  const c = new Map<string, number>();
  return (prefix: string) => {
    const n = (c.get(prefix) || 0) + 1;
    c.set(prefix, n);
    return `${prefix}-${n}`;
  };
})();

// ==========================
// 📚 Banc de phrases
// ==========================
const sujetsCP = [
  "Le chien", "La fille", "Le garçon", "Le chat",
  "La souris", "Le lapin", "Mina", "Paul"
];
const gnCE1 = [
  "Le petit chat", "La grande fille", "Le vieux chien",
  "Le garçon curieux", "La petite souris", "La maîtresse"
];
const verbesSimples = [
  "court", "mange", "dort", "saute", "joue", "regarde", "lit", "chante"
];
const complements = [
  "dans le jardin", "avec un ballon", "sur la table",
  "dans la maison", "dans la classe", "près du lac", "dans la cour"
];

// ==========================
// 🎯 Meta objectifs
// ==========================
const OBJECTIF =
  "Identifier la structure de la phrase et ses composants essentiels.";
const COMPETENCE =
  "Reconnaître et manipuler le verbe, le sujet et les compléments.";

// ==========================
// 🧩 Fabriques par niveau
// ==========================
function makeCP(): {
  question: string; reponses: string[]; bonneReponse: string;
} {
  const sujet = pick(sujetsCP);
  const verbe = pick(verbesSimples);
  const phrase = `${sujet} ${verbe}.`;
  const mode: "sujet" | "verbe" = Math.random() < 0.5 ? "sujet" : "verbe";

  if (mode === "sujet") {
    const distr = shuffle([sujet, verbe, "Je ne sais pas"]);
    return {
      question: `Dans la phrase : « ${phrase} », quel est le sujet ?`,
      reponses: distr,
      bonneReponse: sujet,
    };
  } else {
    const distr = shuffle([verbe, sujet, "Je ne sais pas"]);
    return {
      question: `Dans la phrase : « ${phrase} », quel est le verbe ?`,
      reponses: distr,
      bonneReponse: verbe,
    };
  }
}

function makeCE1(): {
  question: string; reponses: string[]; bonneReponse: string;
} {
  const sujet = pick(gnCE1);
  const verbe = pick(verbesSimples);
  const comp = pick(complements);
  const phrase = `${sujet} ${verbe} ${comp}.`;
  const mode: "gn" | "compl" = Math.random() < 0.5 ? "gn" : "compl";

  if (mode === "gn") {
    const distr = shuffle([sujet, comp, verbe, "Aucun"]);
    return {
      question: `Dans la phrase : « ${phrase} », quel est le groupe nominal sujet ?`,
      reponses: distr,
      bonneReponse: sujet,
    };
  } else {
    const distr = shuffle([comp, sujet, verbe, "Aucun"]);
    return {
      question: `Dans la phrase : « ${phrase} », quel est le complément ?`,
      reponses: distr,
      bonneReponse: comp,
    };
  }
}

function makeCE2(): {
  question: string; reponses: string[]; bonneReponse: string;
} {
  // Pour compatibilité stricte, on reste en QCM (pas de champ supplémentaire)
  const sujet = pick(gnCE1);
  const verbe = pick(verbesSimples);
  const comp = pick(complements);

  // Trois variantes CE2 différentes pour varier:
  const variant = Math.floor(Math.random() * 3);

  if (variant === 0) {
    // Identifier le verbe
    const phrase = `${sujet} ${verbe} ${comp}.`;
    const distr = shuffle([verbe, sujet, comp]);
    return {
      question: `Quel est le verbe dans : « ${phrase} » ?`,
      reponses: distr,
      bonneReponse: verbe,
    };
  } else if (variant === 1) {
    // Identifier le sujet
    const phrase = `${sujet} ${verbe} ${comp}.`;
    const distr = shuffle([sujet, verbe, comp]);
    return {
      question: `Quel est le sujet dans : « ${phrase} » ?`,
      reponses: distr,
      bonneReponse: sujet,
    };
  } else {
    // Choisir la phrase correctement ordonnée
    const bonne = `${sujet} ${verbe} ${comp}.`;
    const d1 = `${comp} ${sujet.toLowerCase()} ${verbe}.`;
    const d2 = `${verbe} ${sujet.toLowerCase()} ${comp}.`;
    const d3 = `${sujet} ${comp} ${verbe}.`;
    const distr = shuffle([bonne, d1, d2, d3]);
    return {
      question: "Quelle est la phrase correctement ordonnée ?",
      reponses: distr,
      bonneReponse: bonne,
    };
  }
}

// ==========================
// 🚀 Génération massive
// ==========================
function buildAll(totalPerLevel = 150) {
  const niveaux: Niveau[] = ["CP", "CE1", "CE2"];
  const out: Array<{
    id: string; domaine: Domaine; niveau: Niveau;
    objectif: string; competence: string;
    question: string; reponses: string[]; bonneReponse: string;
    nextAvailable: string;
  }> = [];

  const today = new Date().toISOString().split("T")[0];

  for (const niveau of niveaux) {
    for (let i = 0; i < totalPerLevel; i++) {
      let payload: { question: string; reponses: string[]; bonneReponse: string; };
      if (niveau === "CP") payload = makeCP();
      else if (niveau === "CE1") payload = makeCE1();
      else payload = makeCE2();

      out.push({
        id: nextId("gram3"),
        domaine: "grammaire",
        niveau,
        objectif: OBJECTIF,
        competence: COMPETENCE,
        question: payload.question,
        reponses: payload.reponses,
        bonneReponse: payload.bonneReponse,
        nextAvailable: today,
      });
    }
  }
  return out;
}

// ==========================
// 💾 Écriture du fichier
// ==========================
const data = buildAll(300); // 300 par niveau => 900 exos
const dir = path.resolve("src/data/francais/grammaire");
const file = path.join(dir, "index.ts");

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const tsContent =
  `import { Exercice } from "../../common/types";\n\n` +
  `export const grammaireExercices: Exercice[] = ${JSON.stringify(data, null, 2)};\n`;

fs.writeFileSync(file, tsContent, "utf-8");

console.log(`✅ ${data.length} exercices de grammaire générés et écrits dans ${file}`);