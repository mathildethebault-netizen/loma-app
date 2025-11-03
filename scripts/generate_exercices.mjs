// scripts/generate_exercices.mjs
import fs from "fs";
import path from "path";

const OUT_DIR = "src/data";
const TOTAL_PER_DOMAIN = 500;

// --- RNG déterministe pour résultats reproductibles ---
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42);

const niveaux = ["CP", "CE1", "CE2"];

// Helpers
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const randint = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const asChoices = (correct, distractors) => {
  const options = shuffle([correct, ...distractors].slice(0, 4));
  return { options, correct: correct };
};

// --- Générateurs par sous-domaine ---

function genCalculs(idNum) {
  const niveau = pick(niveaux);
  const type = pick(["addition", "soustraction", "multiplication", "division", "complément"]);
  let question, correct, distract;

  if (type === "addition") {
    const a = randint(2, niveau === "CP" ? 9 : 99);
    const b = randint(2, niveau === "CP" ? 9 : 99);
    correct = String(a + b);
    distract = [String(a + b + 1), String(a + b - 1), String(a + b + (niveau === "CP" ? 2 : 10))];
    question = `Léa a ${a} billes et en gagne ${b}. Combien en a-t-elle maintenant ?`;
  } else if (type === "soustraction") {
    const a = randint(10, niveau === "CP" ? 20 : 120);
    const b = randint(2, Math.min(9, a - 1));
    correct = String(a - b);
    distract = [String(a - b + 1), String(a - b - 1), String(a - b + 2)];
    question = `Paul a ${a} autocollants, il en donne ${b} à Emma. Combien lui en reste-t-il ?`;
  } else if (type === "multiplication") {
    const a = randint(2, niveau === "CP" ? 5 : 9);
    const b = randint(2, niveau === "CP" ? 5 : 9);
    correct = String(a * b);
    distract = [String(a * b + a), String(a * b - a), String(a + b)];
    question = `Il y a ${a} boîtes de ${b} crayons. Combien de crayons en tout ?`;
  } else if (type === "division") {
    const b = randint(2, niveau === "CP" ? 4 : 8);
    const correctInt = randint(2, niveau === "CP" ? 4 : 9);
    const a = b * correctInt;
    correct = String(correctInt);
    distract = [String(correctInt + 1), String(correctInt - 1), String(correctInt + 2)];
    question = `${a} bonbons à partager en ${b} parts égales. Combien par part ?`;
  } else {
    const cible = niveau === "CP" ? 10 : niveau === "CE1" ? 20 : 100;
    const a = randint(1, cible - 1);
    correct = String(cible - a);
    distract = [String(cible - a + 1), String(cible - a - 1), String(a)];
    question = `Complète pour atteindre ${cible} : ${a} + __ = ${cible}`;
  }

  const { options, correct: bonne } = asChoices(correct, distract);
  const objectifs = {
    CP: "Je calcule mentalement de petites quantités",
    CE1: "Je pose et effectue une opération",
    CE2: "Je choisis l’opération adaptée",
  };

  return {
    id: `maths:calculs-${idNum}`,
    domaine: "maths",
    sousDomaine: "calculs",
    niveau,
    question,
    reponses: options,
    bonneReponse: bonne,
    objectif: objectifs[niveau],
    competence:
      type === "addition"
        ? "J’additionne des nombres entiers"
        : type === "soustraction"
        ? "Je soustrais des nombres entiers"
        : type === "multiplication"
        ? "Je calcule des produits simples"
        : type === "division"
        ? "Je résous des partages équitables"
        : "Je complète pour atteindre une valeur cible",
    xpReward: randint(7, 14),
  };
}

function genMesures(idNum) {
  const niveau = pick(niveaux);
  const theme = pick(["longueurs", "masses", "contenances", "durées", "monnaie"]);
  let question, correct, distract;

  if (theme === "longueurs") {
    const cm = randint(10, 90);
    correct = `${cm} cm`;
    distract = [`${cm + 10} cm`, `${cm - 5} cm`, `${Math.round(cm / 100)} m`];
    question = `Une règle mesure ${cm} centimètres. Quelle est sa longueur ?`;
  } else if (theme === "masses") {
    const g = randint(200, 900);
    correct = `${g} g`;
    distract = [`${g + 100} g`, `${g - 100} g`, `${(g / 1000).toFixed(1)} kg`];
    question = `Un paquet de riz pèse ${g} grammes. Quelle est sa masse ?`;
  } else if (theme === "contenances") {
    const ml = randint(250, 900);
    correct = `${ml} mL`;
    distract = [`${ml + 100} mL`, `${ml - 100} mL`, `${(ml / 1000).toFixed(1)} L`];
    question = `Une bouteille contient ${ml} millilitres. Quelle est sa contenance ?`;
  } else if (theme === "durées") {
    const h = randint(1, 2);
    const m = randint(5, 50);
    correct = `${h} h ${m} min`;
    distract = [`${h} h ${m + 5} min`, `${h} h ${m - 5} min`, `${h + 1} h`];
    question = `Un trajet dure ${h} heure(s) et ${m} minutes. Quelle est la durée ?`;
  } else {
    const euros = randint(2, 20);
    const cents = randint(0, 95 - (95 % 5));
    correct = `${euros},${String(cents).padStart(2, "0")} €`;
    distract = [
      `${euros + 1},${String(cents).padStart(2, "0")} €`,
      `${euros},${String((cents + 10) % 100).padStart(2, "0")} €`,
      `${euros - 1},${String(cents).padStart(2, "0")} €`,
    ];
    question = `Prix affiché : ${correct}. Quel est le montant à payer ?`;
  }

  const { options, correct: bonne } = asChoices(correct, distract);
  const objectifs = {
    CP: "Je repère et compare des mesures",
    CE1: "Je lis et j’exprime des mesures usuelles",
    CE2: "Je convertis et je compare des unités",
  };

  return {
    id: `maths:mesures-${idNum}`,
    domaine: "maths",
    sousDomaine: "mesures",
    niveau,
    question,
    reponses: options,
    bonneReponse: bonne,
    objectif: objectifs[niveau],
    competence:
      theme === "longueurs"
        ? "Je mesure des longueurs (m, cm, mm)"
        : theme === "masses"
        ? "Je compare des masses (kg, g)"
        : theme === "contenances"
        ? "Je compare des contenances (L, mL)"
        : theme === "durées"
        ? "Je lis et compare des durées"
        : "Je compte et fais la monnaie",
    xpReward: randint(7, 14),
  };
}

function genGeometrie(idNum) {
  const niveau = pick(niveaux);
  const theme = pick(["figures", "angles", "symetrie", "solides", "repérage"]);
  let question, correct, distract;

  if (theme === "figures") {
    const figs = ["Carré", "Rectangle", "Triangle", "Cercle"];
    correct = pick(figs);
    distract = shuffle(figs.filter((f) => f !== correct)).slice(0, 3);
    question = `Quelle est la figure représentée : ${correct.toLowerCase()} aux propriétés indiquées ?`;
  } else if (theme === "angles") {
    correct = "Angle droit";
    distract = ["Angle aigu", "Angle obtus", "Ligne brisée"];
    question = "Quel type d’angle mesure 90° ?";
  } else if (theme === "symetrie") {
    correct = "Axe de symétrie";
    distract = ["Centre de gravité", "Diagonale", "Rayon"];
    question = "Comment s’appelle la ligne qui partage une figure en deux parties superposables ?";
  } else if (theme === "solides") {
    const sols = ["Cube", "Pavé droit", "Cylindre", "Sphère"];
    correct = pick(sols);
    distract = shuffle(sols.filter((s) => s !== correct)).slice(0, 3);
    question = `Quel est ce solide (${correct.toLowerCase()}) ?`;
  } else {
    correct = "Quadrillage";
    distract = ["Compas", "Rapporteur", "Règle graduée"];
    question = "Sur quoi repère-t-on une position (ligne/colonne) en géométrie plane ?";
  }

  const { options, correct: bonne } = asChoices(correct, distract);
  const objectifs = {
    CP: "Je reconnais et nomme des figures usuelles",
    CE1: "Je décris des propriétés géométriques",
    CE2: "Je trace et je valide des constructions",
  };

  return {
    id: `maths:geometrie-${idNum}`,
    domaine: "maths",
    sousDomaine: "geometrie",
    niveau,
    question,
    reponses: options,
    bonneReponse: bonne,
    objectif: objectifs[niveau],
    competence:
      theme === "figures"
        ? "Je reconnais triangles, carrés, rectangles, cercles"
        : theme === "angles"
        ? "J’identifie un angle droit"
        : theme === "symetrie"
        ? "Je repère un axe de symétrie"
        : theme === "solides"
        ? "Je distingue cube, pavé, cylindre, sphère"
        : "Je me repère sur un quadrillage",
    xpReward: randint(7, 14),
  };
}

function genProblemes(idNum) {
  const niveau = pick(niveaux);
  const theme = pick(["additif", "soustractif", "multiplicatif", "partage", "logique", "schéma"]);
  let question, correct, distract;

  if (theme === "additif") {
    const a = randint(4, 50);
    const b = randint(4, 50);
    correct = String(a + b);
    distract = [String(a + b - 1), String(a + b + 1), String(a + b + 10)];
    question = `Mia collecte ${a} images puis ${b} de plus. Combien en a-t-elle ?`;
  } else if (theme === "soustractif") {
    const a = randint(20, 90);
    const b = randint(5, Math.min(30, a - 1));
    correct = String(a - b);
    distract = [String(a - b + 1), String(a - b - 1), String(a - b + 5)];
    question = `Dans une boîte, il y a ${a} crayons. On en utilise ${b}. Combien restent-ils ?`;
  } else if (theme === "multiplicatif") {
    const g = randint(2, 9);
    const s = randint(2, 9);
    correct = String(g * s);
    distract = [String(g * s + g), String(g * s - g), String(g + s)];
    question = `Il y a ${g} rangées de ${s} chaises. Combien de chaises au total ?`;
  } else if (theme === "partage") {
    const enfants = randint(2, 8);
    const par = randint(2, 9);
    correct = String(par);
    distract = [String(par + 1), String(par - 1), String(par + 2)];
    question = `${enfants * par} bonbons à partager entre ${enfants} enfants. Combien chacun ?`;
  } else if (theme === "logique") {
    correct = "8";
    distract = ["6", "7", "9"];
    question = "Suite logique : 2, 4, 6, __ ?";
  } else {
    const total = randint(30, 80);
    const pris = randint(5, 20);
    correct = String(total - pris);
    distract = [String(total - pris + 2), String(total - pris - 2), String(total)];
    question = `Pour un schéma : ${total} pommes, on en retire ${pris}. Quelle quantité représenter ?`;
  }

  const { options, correct: bonne } = asChoices(correct, distract);
  const objectifs = {
    CP: "Je comprends l’énoncé et j’agis",
    CE1: "Je choisis la bonne opération",
    CE2: "Je modélise et j’explique ma démarche",
  };

  return {
    id: `maths:problemes-${idNum}`,
    domaine: "maths",
    sousDomaine: "problemes",
    niveau,
    question,
    reponses: options,
    bonneReponse: bonne,
    objectif: objectifs[niveau],
    competence:
      theme === "additif"
        ? "Je résous un problème additif"
        : theme === "soustractif"
        ? "Je résous un problème soustractif"
        : theme === "multiplicatif"
        ? "Je résous un problème multiplicatif"
        : theme === "partage"
        ? "Je fais un partage équitable"
        : theme === "logique"
        ? "Je complète une suite logique"
        : "Je représente par un schéma",
    xpReward: randint(7, 14),
  };
}

// --- Génération ---
function makeList(genFn, count) {
  const arr = [];
  for (let i = 1; i <= count; i++) arr.push(genFn(i));
  return arr;
}

function writeJSON(fp, data) {
  const full = path.resolve(fp);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, JSON.stringify(data, null, 2), "utf8");
  console.log("✅ écrit :", full);
}

function main() {
  const calculs = makeList(genCalculs, TOTAL_PER_DOMAIN);
  const geometrie = makeList(genGeometrie, TOTAL_PER_DOMAIN);
  const mesures = makeList(genMesures, TOTAL_PER_DOMAIN);
  const problemes = makeList(genProblemes, TOTAL_PER_DOMAIN);

  writeJSON(`${OUT_DIR}/maths_calculs.json`, calculs);
  writeJSON(`${OUT_DIR}/maths_geometrie.json`, geometrie);
  writeJSON(`${OUT_DIR}/maths_mesures.json`, mesures);
  writeJSON(`${OUT_DIR}/maths_problemes.json`, problemes);

  // Fusion au format attendu par MathsMonde.tsx
  const merged = {
    "maths:calculs": calculs,
    "maths:geometrie": geometrie,
    "maths:mesures": mesures,
    "maths:problemes": problemes,
  };
  writeJSON(`${OUT_DIR}/mathsExercices.json`, merged);
}

main();