// scripts/clean-hmr.js
import fs from "fs";
import path from "path";

const dist = path.resolve("dist/assets");
const files = fs.readdirSync(dist).filter(f => f.endsWith(".js"));

for (const file of files) {
  const filePath = path.join(dist, file);
  let content = fs.readFileSync(filePath, "utf-8");

  // Supprime les références à __DEFINES__ et __HMR_CONFIG_NAME__
  content = content
    .replace(/__DEFINES__/g, "{}")
    .replace(/__HMR_CONFIG_NAME__/g, "{}");

  fs.writeFileSync(filePath, content);
  console.log(`✅ Cleaned ${file}`);
}