import * as fs from "fs";
import * as path from "path";

const DOMAINS = ["grammaire", "conjugaison", "orthographe", "lexique-expression"] as const;
type Domain = typeof DOMAINS[number];

const [,, domainArg, chunkArg] = process.argv;
if (!DOMAINS.includes(domainArg as Domain)) {
  console.error("Domaine invalide. Utilisez:", DOMAINS.join(", "));
  process.exit(1);
}
const CHUNK = Math.max(1, parseInt(chunkArg || "150", 10));

const root = path.resolve("src/data/francais");
const domainDir = path.join(root, domainArg);
const dataCsv = path.join(domainDir, "data", `${domainArg}.csv`);
const exercisesDir = path.join(domainDir, "exercises");
const indexFile = path.join(domainDir, "index.ts");
const commonDir = path.join(root, "common");
const objectifsGlobal = path.join(commonDir, "objectifsCycle2.json");
const objectifsDomain = path.join(domainDir, "objectifs.json");

function loadObjectifs() {
  const map: Record<string, string> = {};
  try {
    const g = JSON.parse(fs.readFileSync(objectifsGlobal, "utf8"));
    for (const d of Object.keys(g)) {
      for (const o of g[d]) {
        map[o.code] = o.intitule;
        map[o.intitule] = o.intitule;
      }
    }
  } catch {}
  try {
    const d = JSON.parse(fs.readFileSync(objectifsDomain, "utf8"));
    for (const o of d) {
      map[o.code] = o.intitule;
      map[o.intitule] = o.intitule;
    }
  } catch {}
  return map;
}
const objectifsMap = loadObjectifs();

if (!fs.existsSync(dataCsv)) {
  console.error("CSV introuvable:", dataCsv);
  process.exit(1);
}

const csv = fs.readFileSync(dataCsv, "utf8").trim().split("\n");
const header = csv.shift();
if (!header) {
  console.error("CSV vide.");
  process.exit(1);
}

const headers = header.split(";");
function parseRow(row: string) {
  const cols = row.split(";").map(s => s.trim());
  const obj: any = {};
  headers.forEach((h, i) => obj[h] = cols[i] ?? "");
  return obj;
}

const rows = csv.map(parseRow);

function normalizeObjectif(raw: string) {
  if (!raw) return { objectif: undefined, objectifCode: undefined, warn: undefined };
  if (objectifsMap[raw]) {
    const isCode = /^[A-Z]\d+$/i.test(raw);
    const intitule = objectifsMap[raw];
    const code = isCode ? raw.toUpperCase() : Object.entries(objectifsMap).find(([k,v]) => v === intitule && /^[A-Z]\d+$/i.test(k))?.[0];
    return { objectif: intitule, objectifCode: code, warn: undefined };
  }
  return { objectif: raw, objectifCode: undefined, warn: `⚠️ Objectif non reconnu: "${raw}"` };
}

function toExercise(r: any) {
  const options = (r.options || "").split("|").filter(Boolean);
  const tags = (r.tags || "").split("|").filter(Boolean);
  const competencies = (r.competencies || "").split("|").filter(Boolean);
  const { objectif, objectifCode, warn } = normalizeObjectif(r.objectif || "");
  if (warn) console.warn(warn);
  const items = [{
    question: r.question,
    options: options.length ? options : undefined,
    reponse: r.reponse?.includes("|") ? r.reponse.split("|") : r.reponse,
    explication: r.explication || undefined,
  }];
  return {
    id: r.id,
    domaine: r.domaine,
    sousDomaine: r.sousDomaine || undefined,
    type: r.type,
    consigne: r.consigne,
    items,
    tags: tags.length ? tags : undefined,
    meta: {
      difficulte: r.difficulte ? Number(r.difficulte) : undefined,
      tempsEstime: r.tempsEstime ? Number(r.tempsEstime) : undefined,
      niveau: r.niveau || undefined,
      competencies: competencies.length ? competencies : undefined,
      source: "Éduscol",
      reference: r.reference || undefined,
      objectif,
      objectifCode,
    },
    style: { theme: "pastel", font: "Nunito" },
  };
}

const exercises = rows.map(toExercise);

fs.mkdirSync(exercisesDir, { recursive: true });

let idx = 0;
const files: string[] = [];
for (let i = 0; i < exercises.length; i += CHUNK) {
  const slice = exercises.slice(i, i + CHUNK);
  const fileName = `ex${String(++idx).padStart(3, "0")}.ts`;
  const fp = path.join(exercisesDir, fileName);
  const content = `import type { ExerciseModule } from "../common/types";\n\nconst data: ExerciseModule = ${JSON.stringify(slice, null, 2)} as const;\n\nexport default data;\n`;
  fs.writeFileSync(fp, content, "utf8");
  files.push(`./exercises/${fileName}`);
}

const importLines = files.map((f, i) => `import ex${i+1} from "${f}";`).join("\n");
const exportBlock = `export const exercises = [${files.map((_, i) => `...ex${i+1}`).join(", ")}] as const;`;
const indexContent = `// Auto-généré par tools/import_from_csv.ts\n${importLines}\n\n${exportBlock}\n\nexport default exercises;\n`;
fs.writeFileSync(indexFile, indexContent, "utf8");

console.log("OK - généré:", files.length, "fichiers, total exercices:", exercises.length);
