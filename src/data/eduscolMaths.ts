// Référentiel Eduscol — Maths Cycle 2
// Version simplifiée et adaptée pour Loma 🌸
// Domaines : Nombres et calculs, Grandeurs et mesures, Espace et géométrie, Résolution de problèmes

export type EduscolObjectif = {
  id: string;
  titre: string; // formulation simple pour enfants
  competences: string[];
  exemples?: string[];
  cycle: "Cycle 2";
};

export const EDUSCOL_MATHS: Record<
  "maths:calculs" | "maths:mesures" | "maths:geometrie" | "maths:problemes",
  EduscolObjectif[]
> = {
  "maths:calculs": [
    {
      id: "calc-1",
      titre: "Je comprends et j’utilise les nombres entiers",
      competences: [
        "Je sais lire, écrire et ranger des nombres jusqu’à 1 000",
        "Je sais décomposer un nombre en unités, dizaines, centaines",
        "Je sais repérer un nombre sur une ligne graduée"
      ],
      exemples: [
        "Écrire le nombre 348 en lettres",
        "Placer 526 sur une droite numérique",
        "Comparer 275 et 527"
      ],
      cycle: "Cycle 2",
    },
    {
      id: "calc-2",
      titre: "Je fais des additions et des soustractions",
      competences: [
        "Je sais additionner et soustraire mentalement",
        "Je sais poser une addition ou une soustraction",
        "Je vérifie si mon résultat est logique"
      ],
      exemples: [
        "Faire 245 + 320",
        "Calculer 980 - 250",
        "Trouver le total d’un panier d’achats"
      ],
      cycle: "Cycle 2",
    },
    {
      id: "calc-3",
      titre: "Je découvre la multiplication",
      competences: [
        "Je connais des tables de multiplication",
        "Je sais représenter des groupes égaux",
        "Je peux résoudre des situations répétitives"
      ],
      exemples: [
        "Faire 4 × 5",
        "Compter le nombre de roues sur 3 voitures",
        "Utiliser un tableau de multiplication"
      ],
      cycle: "Cycle 2",
    },
    {
      id: "calc-4",
      titre: "Je découvre la division et le partage",
      competences: [
        "Je sais partager équitablement",
        "Je comprends qu’on peut faire des restes",
        "Je vérifie mes répartitions"
      ],
      exemples: [
        "Partager 12 bonbons entre 4 enfants",
        "Trouver combien de paquets de 5 on peut faire avec 23 objets"
      ],
      cycle: "Cycle 2",
    },
  ],

  "maths:mesures": [
    {
      id: "mes-1",
      titre: "Je mesure des longueurs",
      competences: [
        "Je sais utiliser une règle ou un mètre",
        "Je choisis l’unité adaptée (cm, m)",
        "Je compare et estime des longueurs"
      ],
      exemples: [
        "Mesurer la longueur d’un cahier",
        "Comparer la taille de deux objets",
        "Tracer un segment de 8 cm"
      ],
      cycle: "Cycle 2",
    },
    {
      id: "mes-2",
      titre: "Je mesure des masses et des contenances",
      competences: [
        "Je sais peser avec une balance",
        "Je choisis entre g, kg ou L selon la situation",
        "Je sais estimer avant de mesurer"
      ],
      exemples: [
        "Peser un fruit",
        "Comparer la masse d’un sac et d’un livre",
        "Remplir un récipient d’un litre"
      ],
      cycle: "Cycle 2",
    },
    {
      id: "mes-3",
      titre: "Je mesure le temps",
      competences: [
        "Je lis l’heure sur une horloge",
        "Je connais les unités (heures, minutes, secondes)",
        "Je calcule des durées simples"
      ],
      exemples: [
        "Lire l’heure sur une montre",
        "Trouver combien de temps dure un dessin animé",
        "Placer des moments de la journée sur une frise"
      ],
      cycle: "Cycle 2",
    },
    {
      id: "mes-4",
      titre: "Je lis et comprends des tableaux ou des graphiques",
      competences: [
        "Je repère des informations dans un tableau",
        "Je sais lire un graphique simple",
        "Je compare des données"
      ],
      exemples: [
        "Lire un tableau de températures",
        "Comparer le nombre d’élèves par couleur préférée",
        "Compléter un tableau à double entrée"
      ],
      cycle: "Cycle 2",
    },
  ],

  "maths:geometrie": [
    {
      id: "geo-1",
      titre: "Je reconnais les figures géométriques",
      competences: [
        "Je reconnais un carré, un rectangle, un triangle, un cercle",
        "Je distingue les côtés et les sommets",
        "Je trouve les axes de symétrie"
      ],
      exemples: [
        "Classer des figures selon leur forme",
        "Compter les côtés d’un polygone",
        "Tracer un carré avec une règle"
      ],
      cycle: "Cycle 2",
    },
    {
      id: "geo-2",
      titre: "Je trace et construis des figures",
      competences: [
        "Je sais tracer avec la règle et l’équerre",
        "Je reproduis une figure sur quadrillage",
        "Je vérifie les alignements et les angles droits"
      ],
      exemples: [
        "Tracer un triangle",
        "Reproduire une figure à l’identique",
        "Vérifier si deux droites sont perpendiculaires"
      ],
      cycle: "Cycle 2",
    },
    {
      id: "geo-3",
      titre: "Je me repère dans l’espace",
      competences: [
        "Je sais lire un plan ou un quadrillage",
        "Je me repère dans une carte simple",
        "Je décris la position d’un objet"
      ],
      exemples: [
        "Trouver un trésor sur un plan",
        "Indiquer la position d’un objet (à gauche, devant...)",
        "Suivre un parcours sur un quadrillage"
      ],
      cycle: "Cycle 2",
    },
  ],

  "maths:problemes": [
    {
      id: "prob-1",
      titre: "Je résous des problèmes de la vie courante",
      competences: [
        "Je comprends la question posée",
        "Je choisis les bonnes opérations",
        "Je vérifie ma réponse"
      ],
      exemples: [
        "Trouver le prix total d’un achat",
        "Calculer combien il reste d’objets",
        "Comparer deux quantités"
      ],
      cycle: "Cycle 2",
    },
    {
      id: "prob-2",
      titre: "Je représente un problème pour mieux le comprendre",
      competences: [
        "Je fais un dessin ou un schéma",
        "Je repère les données utiles",
        "Je teste et ajuste ma stratégie"
      ],
      exemples: [
        "Faire un dessin pour un partage",
        "Représenter une situation avec des barres",
        "Vérifier sa solution en relisant le problème"
      ],
      cycle: "Cycle 2",
    },
    {
      id: "prob-3",
      titre: "Je résous des problèmes de logique et de raisonnement",
      competences: [
        "Je cherche plusieurs solutions possibles",
        "Je teste des hypothèses",
        "Je justifie ma réponse"
      ],
      exemples: [
        "Résoudre une devinette mathématique",
        "Trouver un nombre mystère",
        "Faire un puzzle logique"
      ],
      cycle: "Cycle 2",
    },
  ],
};