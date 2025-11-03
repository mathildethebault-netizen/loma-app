import { useEffect, useState } from "react";
import { Exercice } from "../../data/francais/common/types";
import { getExercices } from "../../data/francais_enrichi/importMap";
import ExerciseEngine from "../../components/ExerciseEngine";
import { Link } from "react-router-dom";

export default function VocabulairePage() {
  const [exercices, setExercices] = useState<Exercice[]>([]);

  useEffect(() => {
    const vocabulaireList = getExercices("vocabulaire");
    setExercices(vocabulaireList);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-glacial text-loma-brun dark:text-loma-beige selection:bg-loma-rose/30">
      {/* 🌳 Fond forêt plein écran */}
      <div
        className="fixed inset-0 bg-[url('/src/assets/bg-foret-pastel.png')] bg-cover bg-center bg-no-repeat"
        style={{ backgroundAttachment: "fixed" }}
      />
      {/* 🌙 Voile doux */}
      <div className="fixed inset-0 bg-gradient-to-b from-loma-beige/20 via-transparent to-loma-rose/20 dark:from-black/60 dark:to-black/40" />

      {/* 🌼 Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-start w-full px-6 py-12 md:px-10">
        <header className="w-full max-w-6xl text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            🗂️ Vocabulaire
          </h1>
          <p className="mt-2 text-loma-violet dark:text-loma-beige/80">
            Sens des mots, synonymes, contraires et familles.
          </p>
        </header>

        <main className="w-full max-w-6xl">
          <div className="rounded-3xl bg-white/90 dark:bg-loma-brun/60 backdrop-blur-md shadow-loma border border-loma-beige/30 p-6 md:p-8">
            <ExerciseEngine domaine="vocabulaire" exercices={exercices} />
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/francais"
              className="inline-flex items-center gap-2 rounded-[1rem] px-6 py-3 
                         bg-loma-beige/90 hover:bg-loma-beige 
                         text-loma-brun dark:text-loma-beige 
                         shadow-lomaHover transition backdrop-blur-sm"
            >
              ⬅️ Retour au Monde Français
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}