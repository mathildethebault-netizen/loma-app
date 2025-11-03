import fs from "fs";
import path from "path";
import chalk from "chalk";

const objectifsPath = path.resolve("src/data/objectifs/francais.json");
const exercicesPath = path.resolve("src/data/francais_enrichi/exercicesAuto.json");

const data = JSON.parse(fs.readFileSync(objectifsPath, "utf-8"));

const exercices: any[] = [];
const stats: Record<string, number> = {};

if (!data || typeof data !== "object" || !("domaines" in data) || !data.domaines) {
  throw new Error("❌ Le fichier francais.json est vide ou mal formaté !");
}

for (const [domaine, contenu] of Object.entries(data.domaines ?? {})) {
  if (!contenu) continue;

  if (typeof contenu === "object") {
    for (const [sousDomaine, objectifs] of Object.entries(contenu ?? {})) {
      if (Array.isArray(objectifs)) {
        for (const obj of objectifs) {
          for (let i = 1; i <= 20; i++) {
            exercices.push({
              domaine,
              sousDomaine,
              niveau: obj.niveau,
              objectif: obj.intitule,
              question: `Exercice ${i} - ${obj.intitule}`,
              reponses: ["Option A", "Option B", "Option C", "Option D"],
              bonneReponse: "Option A"
            });
          }
          stats[domaine] = (stats[domaine] || 0) + 20;
        }
      } else if (Array.isArray((contenu as any).objectifs)) {
        for (const obj of (contenu as any).objectifs) {
          for (let i = 1; i <= 20; i++) {
            exercices.push({
              domaine,
              niveau: obj.niveau,
              objectif: obj.intitule,
              question: `Exercice ${i} - ${obj.intitule}`,
              reponses: ["Option A", "Option B", "Option C", "Option D"],
              bonneReponse: "Option A"
            });
          }
          stats[domaine] = (stats[domaine] || 0) + 20;
        }
      }
    }
  }
}

fs.writeFileSync(exercicesPath, JSON.stringify(exercices, null, 2), "utf-8");

console.log(chalk.green(`\n✅ ${exercices.length} exercices générés dans ${exercicesPath}\n`));
console.log(chalk.cyan("📊 Détail par domaine :"));
for (const [domaine, count] of Object.entries(stats)) {
  console.log(chalk.yellow(`  • ${domaine}: `) + chalk.bold(`${count} exercices`));
}