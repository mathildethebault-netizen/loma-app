import { useEffect, useState } from "react";
import { Exercice } from "../../../data/francais/common/types";
import { getExercices } from "../../../data/francais_enrichi/importMap";
import ExerciseEngine from "../../../components/ExerciseEngine";
import { Link } from "react-router-dom";

export default function PredictionMonde() {
  const [exercices, setExercices] = useState<Exercice[]>([]);
  useEffect(() => setExercices(getExercices("lecture-prediction")), []);

  return (
    <div className="min-h-screen bg-[url('/src/assets/bg-foret-pastel.png')] bg-cover bg-center font-glacial text-loma-brun p-8">
      <header className="max-w-5xl mx-auto pt-10 text-center">
        <h1 className="text-5xl font-semibold text-loma-beige drop-shadow-sm">🔮 Monde des Prédictions</h1>
        <p className="mt-3 text-loma-violet">Devine la suite, imagine ce qui va arriver dans l’histoire...</p>
      </header>

      <main className="max-w-5xl mx-auto py-8">
        <div className="rounded-3xl bg-white/90 backdrop-blur-sm shadow-loma border border-loma-beige/30 p-6">
          <ExerciseEngine domaine="lecture-prediction" exercices={exercices} />
        </div>
        <div className="mt-8 text-center">
          <Link to="/francais/lecture"
            className="px-8 py-4 rounded-xl bg-loma-beige text-loma-brun font-semibold hover:brightness-105 shadow-lomaHover transition">
            ⬅️ Retour au Monde Lecture
          </Link>
        </div>
      </main>
    </div>
  );
}