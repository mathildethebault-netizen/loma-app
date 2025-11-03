// ======================================================
// 📘 Mots officiels Éduscol — Cycle 2 (par niveau)
// Source : https://eduscol.education.fr/document/15655/download
// ======================================================

// --- CP ---
export const EDUSCOL_MOTS_CP = [
  "chat", "chien", "maison", "livre", "école", "fleur", "jour", "nuit", "soleil", "lune",
  "porte", "fenêtre", "arbre", "papa", "maman", "table", "chaise", "crayon", "papier", "main"
];

// --- CE1 ---
export const EDUSCOL_MOTS_CE1 = [
  "garçon", "fille", "voiture", "rue", "robe", "chaussure", "bureau", "neige", "pluie", "vent",
  "ville", "campagne", "bleu", "vert", "beau", "gentil", "heureux", "triste", "fort", "rapide"
];

// --- CE2 ---
export const EDUSCOL_MOTS_CE2 = [
  "chanter", "marcher", "manger", "parler", "jouer", "dessiner", "voir", "venir", "savoir", "prendre",
  "grand", "petit", "blanc", "noir", "bon", "mauvais", "content", "travailler", "regarder", "dire"
];

// ✅ Export combiné pour compatibilité
export const EDUSCOL_MOTS = [
  ...EDUSCOL_MOTS_CP,
  ...EDUSCOL_MOTS_CE1,
  ...EDUSCOL_MOTS_CE2,
];