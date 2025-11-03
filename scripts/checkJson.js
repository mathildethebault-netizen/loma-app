// scripts/checkJson.js
import fs from "fs";
import path from "path";

const filePath = path.resolve("src/data/mathsExercices.json");

try {
  const data = fs.readFileSync(filePath, "utf8");
  JSON.parse(data);
  console.log("✅ Le fichier JSON est valide !");
} catch (err) {
  console.error("❌ Le JSON est invalide !");
  console.error("🔍 Détail :", err.message);

  // Si une position est indiquée, affiche le contexte autour
  const match = /position (\d+)/.exec(err.message);
  if (match) {
    const pos = parseInt(match[1], 10);
    const lines = fs.readFileSync(filePath, "utf8").split("\n");

    let total = 0;
    for (let i = 0; i < lines.length; i++) {
      total += lines[i].length + 1; // +1 pour le retour à la ligne
      if (total >= pos) {
        console.log(`📍 Erreur probable autour de la ligne ${i + 1}`);
        console.log(lines.slice(Math.max(0, i - 2), i + 3).join("\n"));
        break;
      }
    }
  }
}