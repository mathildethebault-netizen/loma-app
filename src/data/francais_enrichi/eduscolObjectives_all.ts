// ======================================================
// 🇫🇷 Objectifs & Compétences Éduscol — Français (Cycle 2)
// Source : Programmes officiels Éduscol 2024–2025
// ======================================================

export interface EduscolObjective {
  domaine: string;
  sousDomaine: string;
  objectifs: string[];
  competences: string[];
}

export const EDUSCOL_OBJECTIFS_FRANCAIS: EduscolObjective[] = [
  // ======================================================
  // 🧠 Lecture et compréhension
  // ======================================================
  {
    domaine: "lecture",
    sousDomaine: "identifier les mots et comprendre leur sens",
    objectifs: [
      "Lire à voix haute avec fluidité et compréhension.",
      "Mobiliser le vocabulaire connu pour comprendre un texte.",
      "Identifier les mots outils et les mots porteurs de sens.",
      "Repérer les indices lexicaux et grammaticaux facilitant la compréhension."
    ],
    competences: [
      "Décoder et comprendre des mots simples et complexes.",
      "Lire avec intonation et respecter la ponctuation.",
      "Faire des hypothèses sur le sens d’un texte.",
      "Justifier sa compréhension à partir d’indices textuels."
    ]
  },
  {
    domaine: "lecture",
    sousDomaine: "comprendre des textes variés",
    objectifs: [
      "Comprendre des textes narratifs, descriptifs et informatifs.",
      "Repérer les personnages, les lieux et les événements d’un récit.",
      "Identifier la structure d’un texte : début, développement, fin.",
      "Faire des inférences simples à partir du texte et des illustrations."
    ],
    competences: [
      "Lire silencieusement pour comprendre un texte adapté à son âge.",
      "Répondre à des questions explicites et implicites.",
      "Relier des informations dispersées dans le texte.",
      "Restituer oralement ou par écrit l’essentiel d’un texte lu."
    ]
  },

  // ======================================================
  // ✏️ Écriture
  // ======================================================
  {
    domaine: "ecriture",
    sousDomaine: "produire des écrits courts et cohérents",
    objectifs: [
      "Écrire des phrases simples en respectant la syntaxe.",
      "Orthographier correctement les mots appris.",
      "Utiliser la ponctuation de base : point, majuscule, virgule.",
      "Planifier son écrit avant la rédaction."
    ],
    competences: [
      "Mettre en œuvre le processus d’écriture (réfléchir, rédiger, réviser).",
      "Rédiger une phrase correcte du point de vue grammatical.",
      "Relire et corriger son texte avec des outils d’aide (affichages, dictionnaire).",
      "Rédiger un court texte narratif ou descriptif cohérent."
    ]
  },
  {
    domaine: "ecriture",
    sousDomaine: "copier et présenter ses écrits",
    objectifs: [
      "Copier sans erreur un texte court.",
      "Soigner la présentation de son travail.",
      "Respecter la mise en page et l’orthographe du modèle."
    ],
    competences: [
      "Écrire lisiblement en cursive ou script.",
      "Utiliser correctement les outils d’écriture numérique.",
      "Respecter les conventions de présentation (titre, alinéa, marge)."
    ]
  },

  // ======================================================
  // 🧩 Vocabulaire
  // ======================================================
  {
    domaine: "lexique",
    sousDomaine: "enrichir le lexique et comprendre le sens des mots",
    objectifs: [
      "Comprendre le sens d’un mot dans un contexte donné.",
      "Regrouper les mots par familles de sens ou par champs lexicaux.",
      "Utiliser des mots nouveaux dans ses productions orales et écrites."
    ],
    competences: [
      "Utiliser le dictionnaire pour vérifier le sens d’un mot.",
      "Employer un vocabulaire précis adapté au contexte.",
      "Reconnaître les synonymes et antonymes."
    ]
  },
  {
    domaine: "lexique",
    sousDomaine: "structurer le lexique",
    objectifs: [
      "Identifier les préfixes et suffixes fréquents.",
      "Distinguer les mots simples et les mots composés.",
      "Construire des familles de mots à partir d’un radical commun."
    ],
    competences: [
      "Reconnaître la relation entre le sens et la formation des mots.",
      "Utiliser les familles de mots pour comprendre et écrire correctement."
    ]
  },

  // ======================================================
  // 🧱 Grammaire
  // ======================================================
  {
    domaine: "grammaire",
    sousDomaine: "identifier la phrase et ses constituants",
    objectifs: [
      "Repérer le sujet, le verbe et le complément dans une phrase simple.",
      "Distinguer les types et formes de phrases.",
      "Comprendre la notion de groupe nominal."
    ],
    competences: [
      "Analyser la structure grammaticale d’une phrase.",
      "Accorder le verbe avec son sujet.",
      "Repérer les expansions du nom (adjectif, complément du nom, relative)."
    ]
  },
  {
    domaine: "grammaire",
    sousDomaine: "maîtriser les accords",
    objectifs: [
      "Accorder le déterminant avec le nom.",
      "Accorder l’adjectif avec le nom qu’il qualifie.",
      "Accorder le verbe avec son sujet."
    ],
    competences: [
      "Mettre en œuvre les règles d’accords simples en production écrite.",
      "Identifier et corriger les erreurs d’accord."
    ]
  },

  // ======================================================
  // 🕰️ Conjugaison
  // ======================================================
  {
    domaine: "conjugaison",
    sousDomaine: "connaître les temps de base",
    objectifs: [
      "Conjuguer les verbes des 1er, 2e et 3e groupes au présent, futur et passé composé.",
      "Reconnaître les auxiliaires être et avoir.",
      "Identifier le verbe conjugué dans une phrase."
    ],
    competences: [
      "Utiliser correctement les temps étudiés dans des phrases écrites.",
      "Employer les temps verbaux adaptés au contexte du récit.",
      "Comparer les temps pour exprimer la chronologie."
    ]
  },
  {
    domaine: "conjugaison",
    sousDomaine: "maîtriser la morphologie verbale",
    objectifs: [
      "Identifier les marques de personne et de nombre.",
      "Comparer les terminaisons des verbes selon les groupes.",
      "Utiliser les verbes pronominaux correctement."
    ],
    competences: [
      "Appliquer les régularités de conjugaison.",
      "Repérer les formes verbales erronées et les corriger."
    ]
  },

  // ======================================================
  // ✒️ Orthographe
  // ======================================================
  {
    domaine: "orthographe",
    sousDomaine: "orthographe lexicale",
    objectifs: [
      "Mémoriser l’orthographe des mots fréquents et irréguliers.",
      "Vérifier la correspondance entre sons et lettres.",
      "Corriger les erreurs à partir d’outils (affichages, dictionnaire)."
    ],
    competences: [
      "Écrire sans erreur les mots appris.",
      "Mobiliser les connaissances phonologiques et morphologiques.",
      "Employer les graphies correctes pour les sons complexes."
    ]
  },
  {
    domaine: "orthographe",
    sousDomaine: "mots invariables",
    objectifs: [
      "Mémoriser l’orthographe des mots invariables les plus fréquents.",
      "Les utiliser correctement dans les phrases écrites.",
      "Reconnaître leur fonction dans la phrase."
    ],
    competences: [
      "Écrire sans erreur les mots invariables appris.",
      "Savoir les employer dans des contextes variés.",
      "Repérer les confusions fréquentes (a/à, ou/où, son/sont, et/est)."
    ]
  }
];