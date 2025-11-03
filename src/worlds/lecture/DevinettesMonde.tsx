import { Link } from "react-router-dom";

export default function LectureMonde() {
  return (
    <div className="min-h-screen w-full bg-[url('/src/assets/bg-foret-pastel.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-loma-brun font-glacial px-6 py-12">

      {/* 🪶 Titre principal */}
      <h1 className="text-5xl md:text-6xl font-semibold text-center mb-6 drop-shadow-lg text-loma-violet">
        📖 Monde de la Lecture
      </h1>
      <p className="text-lg md:text-xl text-loma-brun/80 text-center max-w-4xl mb-14">
        Explore la lecture sous toutes ses formes : devine, ressens, anticipe, lis avec aisance et découvre les liens entre les mots !
      </p>

      {/* 🌸 Grille de boutons horizontale — identique à Monde du Français */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl justify-items-center">
        <Link
          to="devinettes"
          className="w-64 px-10 py-6 bg-loma-rose/80 hover:bg-loma-rose text-loma-brun text-2xl font-semibold rounded-[2rem] shadow-lg backdrop-blur-md transition-all hover:scale-105 text-center"
        >
          🧩 Devinettes
        </Link>

        <Link
          to="emotions"
          className="w-64 px-10 py-6 bg-loma-beige/80 hover:bg-loma-beige text-loma-brun text-2xl font-semibold rounded-[2rem] shadow-lg backdrop-blur-md transition-all hover:scale-105 text-center"
        >
          💖 Émotions
        </Link>

        <Link
          to="prediction"
          className="w-64 px-10 py-6 bg-loma-violet/80 hover:bg-loma-violet text-white text-2xl font-semibold rounded-[2rem] shadow-lg backdrop-blur-md transition-all hover:scale-105 text-center"
        >
          🔮 Prédiction
        </Link>

        <Link
          to="fluence"
          className="w-64 px-10 py-6 bg-loma-vert/80 hover:bg-loma-vert text-loma-brun text-2xl font-semibold rounded-[2rem] shadow-lg backdrop-blur-md transition-all hover:scale-105 text-center"
        >
          🌬️ Fluence
        </Link>

        <Link
          to="liens"
          className="w-64 px-10 py-6 bg-loma-brun/80 hover:bg-loma-brun text-white text-2xl font-semibold rounded-[2rem] shadow-lg backdrop-blur-md transition-all hover:scale-105 text-center"
        >
          🔗 Liens
        </Link>

        <Link
          to="carnet-lecteur"
          className="w-64 px-10 py-6 bg-loma-orange/80 hover:bg-loma-orange text-loma-brun text-2xl font-semibold rounded-[2rem] shadow-lg backdrop-blur-md transition-all hover:scale-105 text-center"
        >
          📔 Carnet du lecteur
        </Link>
      </div>

      {/* 🔙 Retour au monde Français */}
      <div className="mt-16">
        <Link
          to="/francais"
          className="px-8 py-4 bg-loma-violet/80 hover:bg-loma-violet text-white text-xl font-semibold rounded-[2rem] shadow-lg backdrop-blur-md transition-all hover:scale-105"
        >
          ⬅️ Retour au Monde Français
        </Link>
      </div>
    </div>
  );
}