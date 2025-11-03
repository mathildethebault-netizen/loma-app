// ✅ Script de vérification des polices Loma
// À placer à la racine du projet

import fs from "fs";
import path from "path";

const fontsDir = path.resolve("public/fonts");

const requiredFonts = [
  "GlacialIndifference-Regular.woff2",
  "GlacialIndifference-Regular.woff",
  "GlacialIndifference-Bold.woff2",
  "GlacialIndifference-Bold.woff",
  "ChildosArabic-Regular.woff2",
  "ChildosArabic-Regular.woff",
  "Nunito-Regular.woff2",
  "Nunito-Regular.woff",
  "Nunito-Bold.woff2",
  "Nunito-Bold.woff",
];

console.log("🔍 Vérification des polices dans :", fontsDir, "\n");

let missing = [];

requiredFonts.forEach((font) => {
  const fontPath = path.join(fontsDir, font);
  if (!fs.existsSync(fontPath)) {
    missing.push(font);
  }
});

if (missing.length === 0) {
  console.log("✅ Toutes les polices sont présentes !");
  process.exit(0);
} else {
  console.warn("⚠️ Polices manquantes :\n");
  missing.forEach((m) => console.warn("  - " + m));
  console.warn(
    "\n➡️ Ajoute les fichiers manquants dans /public/fonts avant de relancer l'app.\n"
  );
  process.exit(1);
}