import { useEffect, useMemo, useState } from "react";
// Utilitaire pour normaliser le domaine
function normalizeDomain(raw: string): "vocabulaire" | "lecture" | "grammaire_orthographe" {
  const d = (raw || "").toLowerCase().replace(/\s+/g, "").replace(/-/g, "_");
  if (d.includes("vocab") || d.includes("lexique")) return "vocabulaire";
  if (d.includes("grammaire") || d.includes("orthographe")) return "grammaire_orthographe";
  return "lecture";
}
import MascotteProgression from "./MascotteProgression";
import ScreenTimeFlower from "./ScreenTimeFlower";
import MascotteShop from "./MascotteShop";
import exercicesGeneres from "../data/francais_enrichi/exercicesGeneres.json";
import type { Exercice } from "../data/francais/common/types";

// Importer les objectifs depuis le JSON
import objectifsData from "../data/francais_enrichi/objectifs.json";

// Props enrichies : on accepte désormais aussi une liste externe
type ExerciseEngineProps = {
  domaine: string;
  exercices?: Exercice[];  // ← facultatif
};

export default function ExerciseEngine({ domaine, exercices: externalExercices }: ExerciseEngineProps) {
  const [exercices, setExercices] = useState<Exercice[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [combo, setCombo] = useState<number>(0);
  const [badge, setBadge] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showShop, setShowShop] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(() => Number(localStorage.getItem("loma_score") || 0));

  const [niveauInterne, setNiveauInterne] = useState<string>(() => {
    return localStorage.getItem(`loma_${domaine}_niveau`) || "CP";
  });

  // Nouvel état pour gérer l'objectif sélectionné
  const [selectedObjectif, setSelectedObjectif] = useState<string | null>(null);

  // Extraire les objectifs, même s'ils sont organisés par sous-domaines
  const objectifsBruts =
    (objectifsData as Record<string, Record<string, string[]>>)[normalizeDomain(domaine)] || {};
  const objectifs = Object.entries(objectifsBruts).flatMap(([sousDomaine, liste]) =>
    liste.map((description) => ({
      titre: `${sousDomaine} — ${description.split(":")[0]}`,
      description: description,
    }))
  );

  // 🎯 Sélection aléatoire automatique d’un objectif à chaque ouverture
  useEffect(() => {
    if (objectifs.length > 0) {
      const random = objectifs[Math.floor(Math.random() * objectifs.length)];
      setSelectedObjectif(random.titre);
    }
  }, [objectifs, domaine]);

  // ⚙️ Nouvelle logique : sélection d’exercices aléatoires selon le domaine, avec fallback manuel
  useEffect(() => {
    const normalized = normalizeDomain(domaine);
    let all = (exercicesGeneres as Exercice[]).filter(
      (e) => e.domaine === normalized && e.question && e.reponses?.length
    );

    console.log("🎯 Domaine sélectionné :", normalized, "| Exercices valides :", all.length);

    // 🔄 Si aucun exercice valide, générer un fallback manuel
    if (all.length === 0) {
      all = [
        {
          id: "fallback-1",
          niveau: "CP",
          domaine: normalized,
          objectif: "Compléter une phrase",
          competence: "Grammaire et orthographe",
          question: "Complète la phrase : Les enfants ___ heureux.",
          reponses: ["est", "sont", "es"],
          bonneReponse: "sont",
          titre: "",
          consigne: "",
          questions: []
        },
        {
          id: "fallback-2",
          niveau: "CP",
          domaine: normalized,
          objectif: "Choisir le bon mot",
          competence: "Vocabulaire",
          question: "Quel mot est synonyme de 'content' ?",
          reponses: ["heureux", "fâché", "triste", "fatigué"],
          bonneReponse: "heureux",
          titre: "",
          consigne: "",
          questions: []
        },
      ];
    }

    // 🎲 Sélectionner 10 exercices aléatoires
    const randomExos = [...all].sort(() => Math.random() - 0.5).slice(0, 10);
    setExercices(randomExos);
    setIndex(0);
  }, [domaine]);

  useEffect(() => {
    localStorage.setItem("loma_score", String(points));
  }, [points]);

  const exercice = exercices[index];
  const progression = useMemo(() => {
    if (!exercices || exercices.length === 0) return 0;
    return (index + 1) / exercices.length;
  }, [exercices, index]);

  const handleReponse = (reponse: string) => {
    if (!exercice) return;
    const bonne = reponse === exercice.bonneReponse;
    const nextIndex = index + 1;

    if (bonne) {
      const compliments = [
        "🌟 Excellent !",
        "🧸 Loma applaudit !",
        "🎯 Juste !",
        "✨ +10 points !",
        "🔥 Super série !",
      ];
      setFeedback(compliments[Math.floor(Math.random() * compliments.length)]);
      setPoints((p) => p + 10);
      const currentStars = Number(localStorage.getItem("loma_stars") || "0");
      localStorage.setItem("loma_stars", String(currentStars + 1));
      setCombo((c) => c + 1);
      window.dispatchEvent(new CustomEvent("loma:progress", { detail: { increment: 0.05 } }));

      if ((combo + 1) % 5 === 0) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1500);
      }
      if (points + 10 >= 100 && !badge) setBadge("🏅 Explorateur des mots");
      if (points + 10 >= 300 && badge !== "🎓 Maître des phrases") setBadge("🎓 Maître des phrases");

      const currentScore = Number(localStorage.getItem(`loma_${domaine}_score`) || "0") + 1;
      localStorage.setItem(`loma_${domaine}_score`, String(currentScore));

      if (currentScore > 10 && niveauInterne === "CP") {
        setNiveauInterne("CE1");
        localStorage.setItem(`loma_${domaine}_niveau`, "CE1");
      } else if (currentScore > 20 && niveauInterne === "CE1") {
        setNiveauInterne("CE2");
        localStorage.setItem(`loma_${domaine}_niveau`, "CE2");
      }
    } else {
      setFeedback("❌ Essaie encore !");
      setCombo(0);

      const currentScore = Number(localStorage.getItem(`loma_${domaine}_score`) || "0") - 1;
      localStorage.setItem(`loma_${domaine}_score`, String(Math.max(0, currentScore)));

      if (currentScore < 5 && niveauInterne === "CE2") {
        setNiveauInterne("CE1");
        localStorage.setItem(`loma_${domaine}_niveau`, "CE1");
      } else if (currentScore < 3 && niveauInterne === "CE1") {
        setNiveauInterne("CP");
        localStorage.setItem(`loma_${domaine}_niveau`, "CP");
      }
    }

    setTimeout(() => {
      setFeedback(null);
      if (nextIndex < exercices.length) setIndex(nextIndex);
    }, 900);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between bg-gradient-to-b from-[#f6afa1]/30 via-[#f1c68c]/25 to-[#96a842]/25 text-[#604a3b] font-[Nunito] overflow-hidden transition-all duration-700">
      <button
        onClick={() => setSelectedObjectif(null)}
        className="absolute top-4 left-4 z-50 bg-[#f6afa1] hover:bg-[#96a842] text-[#604a3b] font-bold py-2 px-4 rounded-xl shadow-loma transition-colors duration-300"
      >
        ⬅️ Retour aux objectifs
      </button>
      {badge && (
        <div className="absolute top-20 right-6 bg-[#f6afa1]/80 text-white px-4 py-2 rounded-xl shadow-loma font-bold animate-bounce z-40">
          {badge}
        </div>
      )}
      {showConfetti && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none text-5xl animate-fadeIn z-40">
          🎊🎉🌈
        </div>
      )}
      {combo >= 3 && (
        <div className="absolute bottom-24 right-10 text-2xl font-bold text-[#f6afa1] animate-pulse z-40">
          🔥 {combo} enchaînés !
        </div>
      )}
      <div className="absolute top-4 left-4 z-40">
        <ScreenTimeFlower world={domaine as "francais" | "lecture" | "maths"} />
      </div>
      <div className="absolute top-4 right-6 z-40 flex items-center gap-2 bg-white/80 border border-[#f1c68c] rounded-xl shadow-loma px-4 py-2">
        <span className="text-[#f6afa1] text-2xl">⭐</span>
        <span className="font-bold text-[#604a3b]">{points} pts</span>
        <button
          onClick={() => setShowShop(true)}
          className="ml-3 bg-[#f6afa1]/70 hover:bg-[#96a842] text-white rounded-xl shadow-lomaHover px-3 py-2 font-bold"
        >
          🛍 Boutique
        </button>
      </div>
      {showShop && (
        <div className="absolute inset-0 bg-black/40 flex justify-center items-center z-50">
          <MascotteShop onClose={() => setShowShop(false)} />
        </div>
      )}
      <div
        className="absolute z-30"
        style={{
          top: `calc(60px + ${Math.sin(progression * Math.PI) * 15}px)`,
          left: `${progression * 75 + 5}%`,
          transition: "all 0.8s ease-in-out",
        }}
      >
        <MascotteProgression world={domaine as "francais" | "lecture" | "maths"} progress={progression || 0} />
      </div>
      {exercice ? (
        <div className="flex flex-col items-center justify-start w-full px-6 pt-24 pb-10 flex-grow">
          <div className="bg-white/80 border border-[#f1c68c] rounded-3xl shadow-loma p-6 text-center max-w-4xl w-full mb-6">
            <p className="text-[#f6afa1] font-bold mb-1">
              🎯 Objectif : <span className="text-[#604a3b] font-normal">{exercice.objectif}</span>
            </p>
            <p className="text-[#604a3b] italic">🧠 Compétence : {exercice.competence}</p>
          </div>
          <div className="bg-[#fffdf9]/95 backdrop-blur-md rounded-3xl shadow-loma p-12 w-full max-w-6xl text-center animate-fadeIn border border-[#f1c68c]/60">
            <p className="text-[#f6afa1] font-bold text-2xl mb-8 whitespace-pre-line">
              {exercice.question}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {exercice.reponses?.map((r: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleReponse(r)}
                  className="bg-[#f6afa1] hover:bg-[#96a842] text-white px-6 py-4 rounded-xl font-semibold shadow-loma transition-all duration-300 text-lg"
                >
                  {r}
                </button>
              ))}
            </div>
            {feedback && (
              <p className={`mt-8 text-xl font-bold ${
                feedback.includes("✅") ? "text-green-500" : "text-red-500"
              } transition-all duration-300`}>
                {feedback}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center mt-12 text-[#604a3b] text-lg">
          🎉 Bravo ! Tu as terminé tous les exercices !
        </div>
      )}
    </div>
  );
}