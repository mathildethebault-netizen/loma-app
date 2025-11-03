import fs from "fs";

const path = "src/data/mathsExercices.json";

try {
  const content = fs.readFileSync(path, "utf8");
  const data = JSON.parse(content);

  const keys = Object.keys(data);
  console.log("🔑 Clés trouvées :", keys);

  const expected = ["maths:calculs", "maths:mesures", "maths:geometrie", "maths:problemes"];
  const expectedAlt = ["calculs", "mesures", "geometrie", "problemes"];

  const hasPrefixed = expected.every((k) => keys.includes(k));
  const hasSimple = expectedAlt.every((k) => keys.includes(k));

  if (hasPrefixed) {
    console.log("✅ Ton JSON utilise les clés 'maths:...'");
  } else if (hasSimple) {
    console.log("✅ Ton JSON utilise les clés simples ('calculs', 'mesures'...)");
  } else {
    console.warn("⚠️ Les clés ne correspondent pas au format attendu !");
    console.warn("Clés détectées :", keys.slice(0, 10));
  }

  let total = 0;
  for (const key of keys) {
    if (Array.isArray(data[key])) total += data[key].length;
  }
  console.log(`📊 Total d'exercices détectés : ${total}`);

} catch (err) {
  console.error("❌ Erreur :", err.message);
}