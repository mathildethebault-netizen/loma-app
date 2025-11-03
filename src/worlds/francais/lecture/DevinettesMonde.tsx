import { useEffect, useState } from "react";
import { Exercice } from "../../../data/francais/common/types";
import { getExercices } from "../../../data/francais/importMap";
import ExerciseEngine from "../../../components/ExerciseEngine";
import { Link } from "react-router-dom";

export default function DevinettesMonde() {
  const [exercices, setExercices] = useState<Exercice[]>([]);

  useEffect(() => {
    const devinettesList = getExercices("lecture");
    setExercices(devinettesList.filter(e => e.objectif?.toLowerCase().includes("devinette")));
  }, []);

  return (
    <div className="min-h-screen bg-monde-francais font-glacial text-loma-brun selection:bg-loma-rose/30">
      <header className="mx-auto max-w-5xl px-6 pt-10">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          🔍 Monde des Devinettes
        </h1>
        <p className="mt-2 text-loma-violet">
          Devine, observe, et trouve les réponses cachées dans les mots !
        </p>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="rounded-3xl bg-white/90 backdrop-blur-sm shadow-loma border border-loma-beige/30 p-4 md:p-6">
          <ExerciseEngine domaine="lecture" exercices={exercices} />
        </div>

        <div className="mt-8">
          <Link
            to="/francais/lecture"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 bg-loma-beige text-loma-brun hover:brightness-105 shadow-lomaHover transition"
          >
            ⬅️ Retour au Monde de la Lecture
          </Link>
        </div>
      </main>
    </div>
  );
}