// ======================================================
// 📘 Liste de mots les plus fréquents (source : Éduscol)
// ======================================================
// Ces mots sont extraits du document officiel Éduscol sur la fréquence lexicale
// et classés ici par grandes catégories grammaticales pour une utilisation
// pédagogique dans les générateurs d’exercices du monde Français.

export const eduscolWords = {
  noms: [
    "enfant", "maison", "temps", "jour", "année", "main", "ami", "livre",
    "fille", "garçon", "école", "travail", "voiture", "chien", "chat",
    "mère", "père", "histoire", "mot", "monde", "pluie", "soleil",
    "route", "ville", "forêt", "village", "arbre", "fleur", "oiseau",
  ],
  verbes: [
    "être", "avoir", "aller", "faire", "dire", "voir", "venir", "prendre",
    "donner", "pouvoir", "savoir", "aimer", "jouer", "parler", "regarder",
    "manger", "chanter", "lire", "écrire", "marcher", "courir", "dessiner",
  ],
  adjectifs: [
    "grand", "petit", "beau", "jeune", "vieux", "bon", "mauvais", "heureux",
    "triste", "gentil", "rapide", "lent", "fort", "faible", "intelligent",
    "malin", "fatigué", "souriant", "sage", "propre", "sale",
  ],
  adverbes: [
    "bien", "mal", "vite", "lentement", "souvent", "toujours", "jamais",
    "parfois", "ici", "là", "partout", "ailleurs", "bientôt", "maintenant",
    "hier", "demain", "aujourd’hui", "ensemble",
  ],
  determinants: [
    "le", "la", "les", "un", "une", "des", "mon", "ton", "son", "notre",
    "votre", "leur", "ce", "cette", "ces", "quel", "quelle", "mes", "tes",
  ],
  pronoms: [
    "je", "tu", "il", "elle", "nous", "vous", "ils", "elles", "on", "me",
    "te", "se", "moi", "toi", "lui", "leur", "ceci", "cela",
  ],
  prepositions: [
    "à", "de", "dans", "sur", "sous", "chez", "avec", "sans", "pour",
    "par", "vers", "entre", "devant", "derrière", "avant", "après",
  ],
  conjonctions: [
    "et", "ou", "mais", "donc", "or", "ni", "car", "que", "quand", "si",
    "comme", "lorsque", "puisque",
  ],
};

// Version plate (tous les mots confondus) pour génération rapide
export const allEduscolWords: string[] = Object.values(eduscolWords).flat();

export type WordCategory = keyof typeof eduscolWords;