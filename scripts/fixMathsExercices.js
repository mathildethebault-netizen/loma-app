import fs from "fs";

const filePath = "src/data/mathsExercices.json";

try {
  const backupPath = "src/data/mathsExercices_backup.json";
  fs.copyFileSync(filePath, backupPath);
  console.log("🪣 Sauvegarde créée :", backupPath);

  let content = fs.readFileSync(filePath, "utf8");

  // Supprime les duplications des sections
  content = content
    .replace(/\s*"maths:geometrie":\s*\[[\s\S]*?\],?/g, "")
    .replace(/\s*"maths:mesures":\s*\[[\s\S]*?\],?/g, "")
    .replace(/\s*"maths:problemes":\s*\[[\s\S]*?\],?/g, "");

  // Supprime les accolades ou erreurs de fin
  content = content.replace(/\}\s*\}[\s\S]*$/, "}");

  // Réinsère la structure finale correcte
  content = content.replace(/\}$/, `
  ],
  "maths:geometrie": [],
  "maths:mesures": [],
  "maths:problemes": []
}`);

  fs.writeFileSync(filePath, content, "utf8");
  console.log("✅ Fichier mathsExercices.json corrigé avec succès !");
} catch (error) {
  console.error("❌ Erreur lors de la correction :", error);
}