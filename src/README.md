# Packs d'exercices FR — Loma (Cycle 2, Éduscol-ready)

- 4 packs par domaine (noms simples), prêts pour `src/data/francais/...`.
- Thème **pastel** + police **Nunito** (tokens et CSS inclus).
- Types TS avec `meta.objectif` et `meta.objectifCode`.
- `objectifs.json` par domaine + `common/objectifsCycle2.json` global.
- Script d'import CSV qui **valide les objectifs** (code *ou* intitulé).

## Import CSV -> TS
CSV attendu :
```
id;domaine;sousDomaine;type;consigne;question;options;reponse;explication;tags;difficulte;tempsEstime;niveau;competencies;objectif;reference
```
- `objectif` peut être **un code** (ex. `G1`) ou **un intitulé exact** (ex. `Identifier le verbe...`).

Exécution :
```bash
npx ts-node src/data/francais/tools/import_from_csv.ts grammaire 150
```
Le script génère `exNNN.ts` et alimente `index.ts`.

## Affichage de l'objectif (élève)
```tsx
{ex.meta?.objectif && (
  <p className="text-sm text-slate-500 italic mt-2">
    🎯 Objectif : {ex.meta.objectif}
  </p>
)}
```
