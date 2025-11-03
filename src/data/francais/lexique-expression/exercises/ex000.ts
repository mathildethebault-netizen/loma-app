import type { ExerciseModule } from "../common/types";

const data: ExerciseModule = [
  {
    "id": "lex-0001",
    "domaine": "lexique-expression",
    "sousDomaine": "lexique",
    "type": "qcm",
    "consigne": "Choisis le synonyme.",
    "items": [
      {
        "question": "Synonyme de « content » ?",
        "options": [
          "heureux",
          "rapide",
          "petit"
        ],
        "reponse": "heureux",
        "explication": "Synonyme courant."
      }
    ],
    "tags": [
      "synonymes"
    ],
    "meta": {
      "difficulte": 1,
      "tempsEstime": 1,
      "niveau": "cycle2",
      "competencies": [
        "lexique"
      ],
      "source": "Éduscol",
      "reference": "Éduscol",
      "objectif": "Trouver un synonyme courant",
      "objectifCode": "L2"
    },
    "style": {
      "theme": "pastel",
      "font": "Nunito"
    }
  },
  {
    "id": "lex-0002",
    "domaine": "lexique-expression",
    "sousDomaine": "compréhension",
    "type": "reponse-courte",
    "consigne": "Réponds en une phrase.",
    "items": [
      {
        "question": "Pourquoi le personnage quitte-t-il la maison ?",
        "reponse": "Parce qu'il est en retard.",
        "explication": "Indices textuels."
      }
    ],
    "tags": [
      "lecture"
    ],
    "meta": {
      "difficulte": 2,
      "tempsEstime": 5,
      "niveau": "cycle2",
      "competencies": [
        "compréhension"
      ],
      "source": "Éduscol",
      "reference": "Éduscol",
      "objectif": "Comprendre un ordre d’images et raconter",
      "objectifCode": "L5"
    },
    "style": {
      "theme": "pastel",
      "font": "Nunito"
    }
  }
] as const;

export default data;
