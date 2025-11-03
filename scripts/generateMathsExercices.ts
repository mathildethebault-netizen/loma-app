import { writeFileSync } from "fs";
import { EDUSCOL_MATHS } from "../src/data/eduscolMaths"; // ✅ chemin corrigé si ton script est dans /scripts

type Exercice = {
  id: string;
  domaine: string;
  sousDomaine: string;
  niveau: string;
  question: string;
  reponses: string[];
  bonneReponse: string;
  objectif: string;
  competence: string;
  xpReward: number;
};

// 📘 Génération aléatoire d'exercices à partir des objectifs Eduscol
function generateExercices(domainKey: keyof typeof EDUSCOL_MATHS, count = 500): Exercice[] {
  const exercices: Exercice[] = [];
  const objectifs = EDUSCOL_MATHS[domainKey];

  for (let i = 0; i < count; i++) {
    const objectif = objectifs[Math.floor(Math.random() * objectifs.length)];
    const competence =
      objectif.competences[Math.floor(Math.random() * objectif.competences.length)];

    const key = String(domainKey); // ✅ on force la conversion symbol → string
    const [domaine, sousDomaine] = key.split(":");

    exercices.push({
      id: `${key}-${i + 1}`,
      domaine,
      sousDomaine,
      niveau: ["CP", "CE1", "CE2"][Math.floor(Math.random() * 3)],
      question: `Exercice ${i + 1} : ${objectif.titre}`,
      reponses: ["Option A", "Option B", "Option C", "Option D"].sort(() => Math.random() - 0.5),
      bonneReponse: "Option A",
      objectif: objectif.titre,
      competence,
      xpReward: 5 + Math.floor(Math.random() * 10),
    });
  }

  return exercices;
}

// 📁 Génération complète
function main() {
  const allExos: Record<string, Exercice[]> = {};

  (Object.keys(EDUSCOL_MATHS) as (keyof typeof EDUSCOL_MATHS)[]).forEach((domainKey) => {
    const key = String(domainKey);
    allExos[key] = generateExercices(domainKey, 500);
  });

  writeFileSync("src/data/mathsExercices.json", JSON.stringify(allExos, null, 2), "utf-8");
  console.log("✅ 500 exercices générés pour chaque domaine de maths !");
}

main();