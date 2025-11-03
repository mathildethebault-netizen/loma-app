// src/screens/WorldScreen.tsx
import React from "react";
import { motion } from "framer-motion";
import mascotte from "../assets/loma.png";

interface WorldScreenProps {
  domaine: string;
  nomDuMonde: string;
}

const WorldScreen: React.FC<WorldScreenProps> = ({ domaine, nomDuMonde }) => {
  // 🎨 Palette sobre selon le domaine (tons doux et naturels)
  const colorPalette =
    {
      lecture: "from-loma-rose via-loma-beige to-loma-fond",
      francais: "from-loma-beige via-loma-rose to-loma-vert",
      grammaire_orthographe: "from-loma-beige via-loma-fond to-loma-orange",
      vocabulaire: "from-loma-rose via-loma-beige to-loma-jaune",
      maths: "from-loma-jaune via-loma-beige to-loma-orange",
    }[domaine] || "from-loma-fond to-loma-beige";

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center text-center 
                  font-glacial text-loma-marron 
                  bg-gradient-to-b ${colorPalette} transition-all duration-700`}
    >
      {/* 🪶 Fond papier subtil */}
      <div className="absolute inset-0 bg-[url('/src/assets/paper-texture-light.png')] bg-cover bg-center opacity-[0.08] pointer-events-none" />

      {/* 🧸 Mascotte centrale */}
      <motion.img
        src={mascotte}
        alt="Mascotte LOMA"
        className="w-40 sm:w-52 mb-10 drop-shadow-md"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🌼 Titre principal */}
      <motion.h1
        className="text-4xl sm:text-5xl font-childos text-loma-orange mb-4 tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Monde {nomDuMonde}
      </motion.h1>

      {/* ✨ Sous-titre sobre */}
      <motion.p
        className="text-lg sm:text-xl text-loma-marron font-nunito max-w-xl px-6 opacity-80 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Un espace d’apprentissage calme, coloré et bienveillant — où chaque élève
        évolue à son rythme 🌱
      </motion.p>

      {/* 🧭 Bouton retour */}
      <motion.button
        onClick={() => window.history.back()}
        className="mt-12 px-8 py-3 rounded-full font-semibold bg-loma-beige text-loma-marron border border-loma-orange shadow-loma hover:bg-loma-orange hover:text-loma-fond transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ⬅️ Retour
      </motion.button>

      {/* 🌸 Effet de halo doux */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-loma-jaune opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-loma-orange opacity-10 blur-3xl rounded-full pointer-events-none" />
    </div>
  );
};

export default WorldScreen;