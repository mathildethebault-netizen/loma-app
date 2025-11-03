import type { ExerciseModule } from "../common/types";

const data: ExerciseModule = [
  {
    "id": "ortho-0001",
    "domaine": "orthographe",
    "sousDomaine": "homophones",
    "type": "qcm",
    "consigne": "Choisis la bonne orthographe.",
    "items": [
      {
        "question": "(a/à) quel âge es-tu ?",
        "options": [
          "a",
          "à"
        ],
        "reponse": "à",
        "explication": "Ici, « à » est une préposition."
      }
    ],
    "tags": [
      "homophones"
    ],
    "meta": {
      "difficulte": 1,
      "tempsEstime": 1,
      "niveau": "cycle2",
      "competencies": [
        "orthographe"
      ],
      "source": "Éduscol",
      "reference": "Éduscol",
      "objectif": "Différencier a/à, et/est",
      "objectifCode": "O4"
    },
    "style": {
      "theme": "pastel",
      "font": "Nunito"
    }
  },
  {
    "id": "ortho-0002",
    "domaine": "orthographe",
    "sousDomaine": "accord GN",
    "type": "vrai-faux",
    "consigne": "Vrai ou faux ?",
    "items": [
      {
        "question": "Les adjectifs ne s'accordent jamais.",
        "options": [
          " "
        ],
        "reponse": "faux",
        "explication": "L'adjectif s'accorde en genre et en nombre."
      }
    ],
    "tags": [
      "accords"
    ],
    "meta": {
      "difficulte": 1,
      "tempsEstime": 2,
      "niveau": "cycle2",
      "competencies": [
        "orthographe"
      ],
      "source": "Éduscol",
      "reference": "Éduscol",
      "objectif": "Accorder l’adjectif avec le nom (genre, nombre)",
      "objectifCode": "O1"
    },
    "style": {
      "theme": "pastel",
      "font": "Nunito"
    }
  }
] as const;

export default data;
