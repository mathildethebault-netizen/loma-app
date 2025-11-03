import fs from "fs";
import path from "path";

// 🔹 Import des objectifs français
const objectifsPath = path.resolve("src/data/objectifs/francais.json");
const data = JSON.parse(fs.readFileSync(objectifsPath, "utf-8"));

// 🔹 Liste de verbes de base pour les exercices de conjugaison
const verbesPremierGroupe = ["chanter", "marcher", "aimer", "jouer", "manger", "dessiner", "regarder", "parler", "danser"];
const verbesIrreguliers = ["être", "avoir", "aller", "faire", "dire", "venir", "pouvoir", "voir"];
const nomsCommun = ["chat", "maison", "fille", "garçon", "livre", "école", "voiture", "fleur", "oiseau", "arbre"];

const exercices: any[] = [];

// 💬 Générateurs de questions selon le domaine
const generateQuestion = (domaine: string, objectif: string, niveau: string, i: number) => {
  switch (domaine.toLowerCase()) {
    case "conjugaison": {
      const verbe = verbesPremierGroupe[Math.floor(Math.random() * verbesPremierGroupe.length)];
      const sujets = ["je", "tu", "il", "nous", "vous", "ils"];
      const sujet = sujets[Math.floor(Math.random() * sujets.length)];
      const correct = sujet === "il" || sujet === "elle" ? `${verbe.slice(0, -2)}e` : sujet === "nous" ? `${verbe.slice(0, -2)}ons` : sujet === "vous" ? `${verbe.slice(0, -2)}ez` : `${verbe.slice(0, -2)}es`;

      return {
        question: `Conjugue le verbe "${verbe}" avec le sujet "${sujet}".`,
        reponses: [
          correct,
          `${verbe.slice(0, -2)}er`,
          `${verbe.slice(0, -2)}é`,
          `${verbe.slice(0, -2)}ons`
        ],
        bonneReponse: correct
      };
    }

    case "grammaire et orthographe": {
      const nom = nomsCommun[Math.floor(Math.random() * nomsCommun.length)];
      return {
        question: `Choisis la bonne forme du déterminant : ___ ${nom}`,
        reponses: ["le", "la", "les", "un"],
        bonneReponse: nom.endsWith("e") ? "la" : "le"
      };
    }

    case "vocabulaire": {
      const synonymes = [
        ["content", "heureux", "joyeux", "triste"],
        ["rapide", "vite", "lent", "calme"],
        ["grand", "énorme", "petit", "minuscule"]
      ];
      const pair = synonymes[Math.floor(Math.random() * synonymes.length)];
      return {
        question: `Quel mot est synonyme de "${pair[0]}" ?`,
        reponses: [pair[1], pair[2], pair[3], pair[0]],
        bonneReponse: pair[1]
      };
    }

    case "lecture": {
      const phrases = [
        "Le chat dort sur le canapé.",
        "La maîtresse lit une histoire.",
        "Les enfants jouent dans la cour."
      ];
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      return {
        question: `Que fait le personnage dans la phrase : "${phrase}" ?`,
        reponses: ["Il mange", "Il lit", "Il dort", "Il court"],
        bonneReponse: phrase.includes("dort") ? "Il dort" : phrase.includes("lit") ? "Il lit" : "Il joue"
      };
    }

    case "écriture": {
      return {
        question: `Écris une phrase contenant le mot "${nomsCommun[Math.floor(Math.random() * nomsCommun.length)]}".`,
        reponses: ["Phrase libre"],
        bonneReponse: "Phrase libre"
      };
    }

    default:
      return {
        question: `Exercice ${i} - ${objectif}`,
        reponses: ["Option A", "Option B", "Option C", "Option D"],
        bonneReponse: "Option A"
      };
  }
};

// 🧩 Génération automatique de 20 exercices par objectif
if (!data || typeof data !== "object" || !("domaines" in data) || !data.domaines) {
  throw new Error("❌ Le fichier francais.json est vide ou mal formaté !");
}

for (const [domaine, contenu] of Object.entries(data.domaines ?? {})) {
  if (!contenu) continue; // sécurité supplémentaire

  if (typeof contenu === "object") {
    for (const [sousDomaine, objectifs] of Object.entries(contenu ?? {})) {
      if (Array.isArray(objectifs)) {
        for (const obj of objectifs) {
          for (let i = 1; i <= 20; i++) {
            const q = generateQuestion(domaine, obj.intitule, obj.niveau, i);
            exercices.push({
              domaine,
              sousDomaine,
              niveau: obj.niveau,
              objectif: obj.intitule,
              ...q
            });
          }
        }
      } else if (Array.isArray((contenu as any).objectifs)) {
        for (const obj of (contenu as any).objectifs) {
          for (let i = 1; i <= 20; i++) {
            const q = generateQuestion(domaine, obj.intitule, obj.niveau, i);
            exercices.push({
              domaine,
              niveau: obj.niveau,
              objectif: obj.intitule,
              ...q
            });
          }
        }
      }
    }
  }
}

// 💾 Sauvegarde du fichier final
const outputPath = path.resolve("src/data/francais_enrichi/exercicesAuto.json");
fs.writeFileSync(outputPath, JSON.stringify(exercices, null, 2), "utf-8");
console.log(`✅ ${exercices.length} exercices intelligents générés dans ${outputPath}`);