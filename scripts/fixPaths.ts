import fs from "fs";
import path from "path";

// 📁 Dossier contenant les sous-domaines
const basePath = path.resolve("src/data/francais");

console.log("🔍 Correction des chemins d'import dans les fichiers de données...");

// Fonction utilitaire pour corriger les chemins
function fixImportPaths(filePath: string) {
  let content = fs.readFileSync(filePath, "utf-8");
  const original = content;

  // Remplace les mauvais chemins vers common/types
  content = content.replace(
    /import\s+\{\s*Exercice[^\}]*\}\s+from\s+["']\.\.\/\.\.\/common\/types["']/g,
    'import { Exercice } from "../common/types"'
  );

  // Si le contenu a changé, on sauvegarde
  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✅ Chemin corrigé dans : ${filePath}`);
  }
}

// Parcours tous les sous-dossiers (grammaire, orthographe, etc.)
fs.readdirSync(basePath).forEach((subdir) => {
  const indexPath = path.join(basePath, subdir, "index.ts");
  if (fs.existsSync(indexPath)) {
    fixImportPaths(indexPath);
  }
});

console.log("\n🎉 Tous les chemins d’import ont été corrigés avec succès !");