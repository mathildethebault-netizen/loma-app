import React, { useEffect } from "react";
import { motion } from "framer-motion";
import mascotteBrune from "/images/mascotte-brune.png";
import "../styles/buttons.tailwind.css";

export default function FrancaisMonde() {
  useEffect(() => {
    document.body.classList.add("monde-francais");
    return () => document.body.classList.remove("monde-francais");
  }, []);

  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start monde-francais"
      style={{
        backgroundImage: "url('/images/fond-loma-francais.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#f1c68c",
      }}
    >
      <motion.h1
        className="text-5xl font-bold text-[#604a3b] mt-8 mb-12 font-childos text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Monde du Français
      </motion.h1>

      <div className="grid grid-cols-2 gap-8 px-6 text-center">
        <motion.button
          onClick={() => navigateTo("/francais/grammaire")}
          className="btn btn-primary monde-francais"
          whileHover={{ scale: 1.05 }}
        >
          ✏️ Grammaire & Conjugaison
        </motion.button>

        <motion.button
          onClick={() => navigateTo("/francais/lecture")}
          className="btn btn-secondary monde-francais flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={mascotteBrune}
            alt="Mascotte du français"
            className="w-6 h-6 inline-block"
          />
          📖 Lecture
        </motion.button>

        <motion.button
          onClick={() => navigateTo("/francais/lexique")}
          className="btn btn-accent monde-francais"
          whileHover={{ scale: 1.05 }}
        >
          💬 Lexique
        </motion.button>

        <motion.button
          onClick={() => navigateTo("/francais/orthographe")}
          className="btn btn-neutral monde-francais"
          whileHover={{ scale: 1.05 }}
        >
          ✨ Orthographe
        </motion.button>
      </div>

      <p className="mt-12 text-center text-[#604a3b]/80 text-lg bg-white/70 px-6 py-3 rounded-full backdrop-blur-sm shadow-sm">
        Explore le monde des mots avec douceur 🌸
      </p>
    </div>
  );
}
