import type { ExerciseModule } from "../common/types";

const data: ExerciseModule = [
  {
    "id": "conj-0001",
    "domaine": "conjugaison",
    "sousDomaine": "temps simple",
    "type": "qcm",
    "consigne": "Choisis la bonne conjugaison.",
    "items": [
      {
        "question": "Je (manger) à midi.",
        "options": [
          "mange",
          "manges",
          "mangent"
        ],
        "reponse": "mange",
        "explication": "1re personne du singulier au présent."
      }
    ],
    "tags": [
      "présent"
    ],
    "meta": {
      "difficulte": 1,
      "tempsEstime": 2,
      "niveau": "cycle2",
      "competencies": [
        "conjugaison"
      ],
      "source": "Éduscol",
      "reference": "Éduscol",
      "objectif": "Conjuguer un verbe du 1er groupe au présent",
      "objectifCode": "C1"
    },
    "style": {
      "theme": "pastel",
      "font": "Nunito"
    }
  },
  {
    "id": "conj-0002",
    "domaine": "conjugaison",
    "sousDomaine": "accords",
    "type": "texte-a-trous",
    "consigne": "Complète avec l'auxiliaire correct.",
    "items": [
      {
        "question": "Nous (être/avoir) partis hier.",
        "reponse": "avons",
        "explication": "Ici l'auxiliaire « avoir » s'emploie."
      }
    ],
    "tags": [
      "auxiliaires"
    ],
    "meta": {
      "difficulte": 2,
      "tempsEstime": 3,
      "niveau": "cycle2",
      "competencies": [
        "conjugaison"
      ],
      "source": "Éduscol",
      "reference": "Éduscol",
      "objectif": "Conjuguer être et avoir au passé composé",
      "objectifCode": "C5"
    },
    "style": {
      "theme": "pastel",
      "font": "Nunito"
    }
  }
] as const;

export default data;
