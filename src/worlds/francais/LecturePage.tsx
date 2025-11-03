import { Link } from "react-router-dom";
import LomaImage from "../../assets/loma.png";

export default function LectureMonde() {
  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen animate-fadeIn font-glacial text-loma-brun dark:text-loma-beige 
      bg-[url('/src/assets/bg-foret-pastel.png')] bg-cover bg-center bg-no-repeat overflow-hidden">

      {/* 🌙 Voile doux pour le mode sombre */}
      <div className="absolute inset-0 bg-black/40 dark:opacity-60 opacity-0 transition-opacity duration-700 pointer-events-none"></div>

      {/* 🦙 Mascotte */}
      <img
        src={LomaImage}
        alt="Loma"
        className="relative w-32 mb-10 drop-shadow-md animate-bounce-slow z-10"
      />

      {/* 📖 Titre principal */}
      <h1 className="relative text-5xl font-semibold drop-shadow-sm mb-14 text-center z-10">
        📖 Monde de la Lecture
      </h1>

      {/* 📚 Boutons sous-mondes */}
      <div className="relative flex flex-wrap justify-center gap-12 max-w-5xl z-10">
        <Link
          to="/lecture/devinettes"
          className="px-12 py-7 bg-loma-violet/40 hover:bg-loma-violet/60 dark:bg-loma-violet/30 dark:hover:bg-loma-violet/50 
          text-loma-brun dark:text-loma-beige font-medium rounded-[2rem] shadow-loma backdrop-blur-sm transition-all duration-300 
          text-2xl hover:scale-105"
        >
          🧩 Devinettes
        </Link>

        <Link
          to="/lecture/emotions"
          className="px-12 py-7 bg-loma-rose/40 hover:bg-loma-rose/60 dark:bg-loma-rose/30 dark:hover:bg-loma-rose/50 
          text-loma-brun dark:text-loma-beige font-medium rounded-[2rem] shadow-loma backdrop-blur-sm transition-all duration-300 
          text-2xl hover:scale-105"
        >
          💖 Émotions
        </Link>

        <Link
          to="/lecture/prediction"
          className="px-12 py-7 bg-loma-vert/40 hover:bg-loma-vert/60 dark:bg-loma-vert/30 dark:hover:bg-loma-vert/50 
          text-loma-brun dark:text-loma-beige font-medium rounded-[2rem] shadow-loma backdrop-blur-sm transition-all duration-300 
          text-2xl hover:scale-105"
        >
          🔮 Prédiction
        </Link>

        <Link
          to="/lecture/fluence"
          className="px-12 py-7 bg-loma-violet/40 hover:bg-loma-violet/60 dark:bg-loma-violet/30 dark:hover:bg-loma-violet/50 
          text-loma-brun dark:text-loma-beige font-medium rounded-[2rem] shadow-loma backdrop-blur-sm transition-all duration-300 
          text-2xl hover:scale-105"
        >
          🌬️ Fluence
        </Link>

        <Link
          to="/lecture/liens"
          className="px-12 py-7 bg-loma-brun/50 hover:bg-loma-brun/70 dark:bg-loma-brun/40 dark:hover:bg-loma-brun/60 
          text-white font-medium rounded-[2rem] shadow-loma backdrop-blur-sm transition-all duration-300 
          text-2xl hover:scale-105"
        >
          🔗 Liens
        </Link>

        <Link
          to="/lecture/carnet-lecteur"
          className="px-12 py-7 bg-loma-rose/40 hover:bg-loma-rose/60 dark:bg-loma-rose/30 dark:hover:bg-loma-rose/50 
          text-loma-brun dark:text-loma-beige font-medium rounded-[2rem] shadow-loma backdrop-blur-sm transition-all duration-300 
          text-2xl hover:scale-105"
        >
          📔 Carnet du lecteur
        </Link>
      </div>

      {/* 🔙 Bouton retour */}
      <Link
        to="/francais"
        className="relative mt-20 bg-loma-beige/80 hover:bg-loma-beige/90 dark:bg-loma-brun/60 dark:hover:bg-loma-brun/70 
        text-loma-brun dark:text-loma-beige px-10 py-5 rounded-[2rem] shadow-loma backdrop-blur-sm transition-all duration-300 
        text-xl font-medium hover:scale-105 z-10"
      >
        ⬅️ Retour au Monde Français
      </Link>
    </div>
  );
}