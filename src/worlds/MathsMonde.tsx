import React, { useEffect } from "react";
import { motion } from "framer-motion";
import mascotteJaune from "/images/mascotte-jaune.png"; // 🌟 Mascotte principale du monde maths
import mascotteJauneRegle from "/images/mascotte-jaune-regle.png"; // 📐 Pour le bouton géométrie
import mascotteJauneBalance from "/images/mascotte-jaune-balance.png"; // ⚖️ Pour le bouton grandeurs
import mascotteNombres from "/images/mascotte-maths-nombres.png"; // 🔢 Pour le bouton numération
import mascotteSymboles from "/images/mascotte-maths-symboles.png"; // ➕ Pour le bouton calcul
import "../styles/buttons.tailwind.css";

export default function MathsMonde() {
  useEffect(() => {
    document.body.classList.add("monde-maths");
    return () => document.body.classList.remove("monde-maths");
  }, []);

  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <div
      className="min-h-screen w-screen flex flex-col items-center justify-start overflow-hidden monde-maths"
      style={{
        backgroundImage: "url('/images/fond-loma-maths.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#c8e3d4",
      }}
    >
      {/* === Mascotte principale === */}
      <motion.img
        src={mascotteJaune}
        alt="Mascotte du monde des mathématiques"
        className="w-40 sm:w-48 md:w-56 mt-10 drop-shadow-md animate-fadeIn"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === Titre principal === */}
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-[#604a3b] mt-8 mb-12 font-childos drop-shadow-sm text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Monde des Mathématiques
      </motion.h1>

      {/* === Boutons === */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-8 px-6 text-center">

        {/* 🔢 Numération */}
        <motion.button
          onClick={() => navigateTo("/maths/numeration")}
          className="btn btn-primary monde-maths flex flex-col items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={mascotteNombres}
            alt="Mascotte nombres"
            className="w-16 mb-2"
          />
          🔢 Numération
        </motion.button>

        {/* ➕ Calcul */}
        <motion.button
          onClick={() => navigateTo("/maths/calcul")}
          className="btn btn-accent monde-maths flex flex-col items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={mascotteSymboles}
            alt="Mascotte symboles"
            className="w-16 mb-2"
          />
          ➕ Calcul
        </motion.button>

        {/* ⚖️ Grandeurs & Mesures */}
        <motion.button
          onClick={() => navigateTo("/maths/grandeurs")}
          className="btn btn-secondary monde-maths flex flex-col items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={mascotteJauneBalance}
            alt="Mascotte avec balance"
            className="w-16 mb-2"
          />
          ⚖️ Grandeurs & Mesures
        </motion.button>

        {/* 📐 Espace & Géométrie */}
        <motion.button
          onClick={() => navigateTo("/maths/geometrie")}
          className="btn btn-secondary monde-maths flex flex-col items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={mascotteJauneRegle}
            alt="Mascotte avec règle"
            className="w-16 mb-2"
          />
          📐 Espace & Géométrie
        </motion.button>
      </div>

      {/* === Sous-texte === */}
      <p className="mt-12 text-center text-[#604a3b]/80 text-lg bg-white/70 px-6 py-3 rounded-full backdrop-blur-sm shadow-sm font-nunito">
        Explore le monde des nombres avec logique 🌿
      </p>
    </div>
  );
}