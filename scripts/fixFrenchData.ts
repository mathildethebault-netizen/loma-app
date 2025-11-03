import fs from "fs";
import path from "path";

// 🧩 Liste des domaines à corriger
const domaines = [
  "orthographe",
  "grammaire",
  "conjugaison",
  "lexique-expression",
  "expression",
  "comprehension",
];

// 📁 Chemin de base
const basePath = path.resolve("src/data/francais");

// ✅ Fonction utilitaire pour ajouter le champ manquant `niveau`
function ensureNiveauInExercices(content: string) {
  // Si le champ `niveau` n'existe pas, on l’ajoute par défaut à "CE1"
  return content.replace(
    /(\{[\s\S]*?"domaine":\s*".*?",)(\s*"objectif":)/g,
    `$1 "niveau": "CE1", $2`
  );
}

console.log("🛠️ Correction des fichiers français...\n");

// Parcourt tous les fichiers du dossier
domaines.forEach((domaine) => {
  const filePath = path.join(basePath, domaine, "index.ts");

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Fichier introuvable : ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, "utf-8");

  // Corrige les champs manquants
  if (!content.includes('"niveau":')) {
    content = ensureNiveauInExercices(content);
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✅ Champ "niveau" ajouté à : ${filePath}`);
  } else {
    console.log(`✔️ Déjà correct : ${filePath}`);
  }
});

console.log("\n🎉 Tous les fichiers français ont été corrigés !");