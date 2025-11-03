export type Rareté = "commune" | "rare" | "épique" | "légendaire";

export interface Mascotte {
  id: string;
  nom: string;
  rarete: Rareté;
  prix: number;
  description: string;
  image: string;
}

export const lomaMascottes: Mascotte[] = [
  {
    id: "loma-classique",
    nom: "Loma Classique",
    rarete: "commune",
    prix: 50,
    description: "Le Loma original — doux, curieux et toujours souriant 🧸",
    image: "/src/assets/mascottes/loma_classique.png",
  },
  {
    id: "loma-explorateur",
    nom: "Loma Explorateur",
    rarete: "commune",
    prix: 80,
    description: "Toujours prêt à découvrir de nouveaux mondes avec son chapeau d’aventurier 🏕️",
    image: "/src/assets/mascottes/loma_explorateur.png",
  },
  {
    id: "loma-magicien",
    nom: "Loma Magicien",
    rarete: "rare",
    prix: 150,
    description: "Abracadabra ! Loma transforme les fautes en étoiles ✨",
    image: "/src/assets/mascottes/loma_magicien.png",
  },
  {
    id: "loma-pirate",
    nom: "Loma Pirate",
    rarete: "rare",
    prix: 200,
    description: "À l’abordage ! Ce Loma cherche les trésors du savoir 🏴‍☠️",
    image: "/src/assets/mascottes/loma_pirate.png",
  },
  {
    id: "loma-dragon",
    nom: "Loma Dragon",
    rarete: "épique",
    prix: 300,
    description: "Un petit dragon qui crache des confettis multicolores 🎊",
    image: "/src/assets/mascottes/loma_dragon.png",
  },
  {
    id: "loma-licorne",
    nom: "Loma Licorne",
    rarete: "épique",
    prix: 320,
    description: "Brillant et magique, il apporte chance et bonheur 🌈",
    image: "/src/assets/mascottes/loma_licorne.png",
  },
  {
    id: "loma-cowboy",
    nom: "Loma Cowboy",
    rarete: "rare",
    prix: 180,
    description: "Yeehaw ! Toujours prêt à dompter les mots les plus sauvages 🤠",
    image: "/src/assets/mascottes/loma_cowboy.png",
  },
  {
    id: "loma-astronaute",
    nom: "Loma Astronaute",
    rarete: "épique",
    prix: 350,
    description: "Ce Loma flotte entre les étoiles… et les points bonus 🚀",
    image: "/src/assets/mascottes/loma_astronaute.png",
  },
  {
    id: "loma-ange",
    nom: "Loma Ange",
    rarete: "légendaire",
    prix: 400,
    description: "Un gardien du savoir, toujours là pour encourager 💫",
    image: "/src/assets/mascottes/loma_ange.png",
  },
  {
    id: "loma-robot",
    nom: "Loma Robot",
    rarete: "rare",
    prix: 200,
    description: "Calculateur et malin, il aime les réponses parfaites 🤖",
    image: "/src/assets/mascottes/loma_robot.png",
  },
  {
    id: "loma-polaire",
    nom: "Loma Polaire",
    rarete: "commune",
    prix: 70,
    description: "Tout doux comme la neige, il adore les dictées d’hiver ❄️",
    image: "/src/assets/mascottes/loma_polaire.png",
  },
  {
    id: "loma-sirene",
    nom: "Loma Sirène",
    rarete: "légendaire",
    prix: 500,
    description: "Une sirène mélodieuse qui chante les mots justes 🧜‍♀️",
    image: "/src/assets/mascottes/loma_sirene.png",
  },
];