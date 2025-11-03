import type { ExerciseModule } from "../common/types";

const data: ExerciseModule = [
  {
    "id": "gram-0001",
    "domaine": "grammaire",
    "sousDomaine": "nature des mots",
    "type": "qcm",
    "consigne": "Choisis la nature du mot souligné.",
    "items": [
      {
        "question": "Quel est la nature de « rapidement » ?",
        "options": [
          "adjectif",
          "nom",
          "adverbe",
          "verbe"
        ],
        "reponse": "adverbe",
        "explication": "Un adverbe modifie un verbe, un adjectif ou un autre adverbe."
      }
    ],
    "tags": [
      "adverbes",
      "nature"
    ],
    "meta": {
      "difficulte": 1,
      "tempsEstime": 3,
      "niveau": "cycle2",
      "competencies": [
        "identifier la nature des mots"
      ],
      "source": "Éduscol",
      "reference": "Éduscol",
      "objectif": "Identifier les adverbes fréquents",
      "objectifCode": "G7"
    },
    "style": {
      "theme": "pastel",
      "font": "Nunito"
    }
  },
  {
    "id": "gram-0002",
    "domaine": "grammaire",
    "sousDomaine": "fonctions",
    "type": "vrai-faux",
    "consigne": "Indique si l'affirmation est vraie ou fausse.",
    "items": [
      {
        "question": "Le COD répond à la question « à qui ? ».",
        "reponse": "faux",
        "explication": "Le COD répond à « quoi ? » ou « qui ? » après le verbe."
      }
    ],
    "tags": [
      "fonctions"
    ],
    "meta": {
      "difficulte": 1,
      "tempsEstime": 2,
      "niveau": "cycle2",
      "competencies": [
        "fonctions"
      ],
      "source": "Éduscol",
      "reference": "Éduscol",
      "objectif": "Reconnaître le sujet du verbe",
      "objectifCode": "G2"
    },
    "style": {
      "theme": "pastel",
      "font": "Nunito"
    }
  }
] as const;

export default data;
