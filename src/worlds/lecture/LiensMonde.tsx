import { useEffect, useState } from "react";
import { Exercice } from "../../data/francais/common/types";
import { getExercices } from "../../data/francais_enrichi/importMap";
import ExerciseEngine from "../../components/ExerciseEngine";
import { Link } from "react-router-dom";

export default function LiensMonde() {
  const [exercices, setExercices] = useState<Exercice[]>([]);
  useEffect(() => setExercices(getExercices("lecture-liens")), []);

  return (
    <div className="min-h-screen bg-[url('/src/assets/bg-fleurs-pastel.png')] bg-cover bg-center font-glacial text-loma-brun p-8">
      <header className="text-center pt-10">
        <h1 className="text-5xl font-semibold text-loma-rose drop-shadow-sm">🔗 Monde des Liens</h1>
        <p className="mt-3 text-loma-brun/70">Relie les idées, découvre les connexions entre les phrases et les textes.</p>
      </header>

      <main className="max-w-5xl mx-auto py-8">
        <div className="rounded-3xl bg-white/90 backdrop-blur-sm border border-loma-rose/30 p-6 shadow-loma">
          <ExerciseEngine domaine="lecture-liens" exercices={exercices} />
        </div>

        <div className="mt-8 text-center">
          <Link to="/francais/lecture" className="px-8 py-4 rounded-xl bg-loma-rose text-white font-semibold hover:brightness-105 shadow-lomaHover transition">
            ⬅️ Retour au Monde Lecture
          </Link>
        </div>
      </main>
    </div>
  );
}