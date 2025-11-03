import React from "react";
import { motion } from "framer-motion";
import mascotteJaune from "/images/mascotte-jaune.png";
import mascotteBrune from "/images/mascotte-brune.png";

export default function AccueilMonde() {
  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <div
      className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden m-0 p-0"
      style={{
        backgroundImage: "url('/images/fond-loma-monde.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* === Section principale avec les mascottes === */}
      <div className="flex flex-wrap justify-center items-end gap-20 z-10 mt-8">
        {/* 🟡 Mascotte Maths */}
        <div className="flex flex-col items-center gap-3">
          <motion.img
            src={mascotteJaune}
            alt="Mascotte du monde des maths"
            className="w-36 sm:w-48 md:w-56 cursor-pointer hover:scale-110 transition-transform duration-300 drop-shadow-md"
            onClick={() => navigateTo("/maths")}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <p className="text-lg sm:text-xl font-semibold text-amber-800 bg-white/70 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
            Monde des maths 🔢
          </p>
        </div>

        {/* 🟤 Mascotte Français */}
        <div className="flex flex-col items-center gap-3">
          <motion.img
            src={mascotteBrune}
            alt="Mascotte du monde du français"
            className="w-36 sm:w-48 md:w-56 cursor-pointer hover:scale-110 transition-transform duration-300 drop-shadow-md"
            onClick={() => navigateTo("/francais")}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
          <p className="text-lg sm:text-xl font-semibold text-amber-800 bg-white/70 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
            Monde du français 📚
          </p>
        </div>
      </div>

      {/* === Texte doux en bas === */}
      <p className="absolute bottom-10 text-center text-amber-900/90 font-nunito text-lg sm:text-xl bg-white/60 px-6 py-3 rounded-full backdrop-blur-sm shadow-md">
        Clique sur une mascotte pour explorer son monde 🌿
      </p>
    </div>
  );
}