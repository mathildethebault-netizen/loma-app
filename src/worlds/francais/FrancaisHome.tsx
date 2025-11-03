import { Link } from "react-router-dom";
import { useState } from "react";
import LomaImage from "../../assets/loma.png";

export default function FrancaisHome() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const onLoad = () => setImageLoaded(true);

  if (!imageLoaded) {
    return (
      <>
        <img
          src="/src/assets/bg-foret-pastel.png"
          alt="background"
          className="hidden"
          onLoad={onLoad}
        />
        <div className="flex items-center justify-center min-h-screen text-gray-800 dark:text-gray-100 font-[Nunito] text-2xl">
          Chargement...
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen animate-fadeIn bg-[url('/src/assets/bg-foret-pastel.png')] bg-cover bg-center bg-no-repeat text-gray-800 dark:text-gray-100 font-[Nunito] p-8">
      
      <img
        src={LomaImage}
        alt="Loma"
        className="w-32 mb-8 drop-shadow-lg animate-bounce-slow"
      />

      <h1 className="text-5xl font-extrabold text-[#8674A9] mb-12 text-center">
        ✏️ Monde du Français
      </h1>

      <div className="flex flex-wrap justify-center gap-12 max-w-5xl">
        <Link
          to="/francais/lecture"
          className="px-10 py-6 bg-[#B3A4D3]/60 hover:bg-[#B3A4D3]/80 text-[#4B3C5D] font-semibold rounded-[2rem] shadow-lg backdrop-blur-md transition-all duration-300 text-2xl hover:scale-105"
        >
          📖 Lecture
        </Link>

        <Link
          to="/francais/vocabulaire"
          className="px-10 py-6 bg-[#E4B0AC]/60 hover:bg-[#E4B0AC]/80 text-[#4B3C5D] font-semibold rounded-[2rem] shadow-lg backdrop-blur-md transition-all duration-300 text-2xl hover:scale-105"
        >
          🗂️ Vocabulaire
        </Link>

        <Link
          to="/francais/grammaire-orthographe"
          className="px-10 py-6 bg-[#C2C58D]/60 hover:bg-[#C2C58D]/80 text-[#4B3C5D] font-semibold rounded-[2rem] shadow-lg backdrop-blur-md transition-all duration-300 text-2xl hover:scale-105"
        >
          ✏️ Grammaire & Orthographe
        </Link>
      </div>

      <Link
        to="/child"
        className="mt-16 bg-[#E8D2A6]/70 hover:bg-[#E8D2A6]/90 text-[#4B3C5D] px-8 py-4 rounded-[2rem] shadow-md backdrop-blur-md transition-all duration-300 text-lg font-semibold hover:scale-105"
      >
        ⬅️ Retour au choix du monde
      </Link>
    </div>
  );
}