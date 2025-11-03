import francaisTheme from "../../theme/francaisTheme";
import { useEffect, useState } from "react";
import { Exercice } from "../../data/francais/common/types";
import { getExercices } from "../../data/francais_enrichi/importMap";
import ExerciseEngine from "../../components/ExerciseEngine";
import { Link } from "react-router-dom";

export default function OrthographePage() {
  const [exercices, setExercices] = useState<Exercice[]>([]);

  useEffect(() => {
    const orthographeList = getExercices("orthographe");
    setExercices(orthographeList);
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center font-[Nunito] p-8 transition-colors duration-500"
      style={{
        background: francaisTheme.colors.background,
        color: francaisTheme.colors.textPrimary,
      }}
    >
      <h1
        className="text-5xl font-extrabold drop-shadow-sm mb-6"
        style={{ color: francaisTheme.colors.accent }}
      >
        ✒️ Monde Orthographe
      </h1>

      <div
        className="w-full max-w-4xl rounded-3xl p-8 transition-all duration-500"
        style={{
          background: francaisTheme.colors.card,
          border: `2px solid ${francaisTheme.colors.cardBorder}`,
          boxShadow: francaisTheme.colors.cardShadow,
        }}
      >
        <ExerciseEngine domaine="orthographe" />
      </div>

      <Link
        to="/enfant/francais"
        className="mt-8 font-semibold px-6 py-3 rounded-2xl shadow-md transition-all"
        style={{
          background: francaisTheme.colors.accentLight,
          color: francaisTheme.colors.textPrimary,
          boxShadow: francaisTheme.effects.shadow,
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.boxShadow = francaisTheme.effects.hoverGlow)
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.boxShadow = francaisTheme.effects.shadow)
        }
      >
        ⬅️ Retour au Monde Français
      </Link>
    </div>
  );
}