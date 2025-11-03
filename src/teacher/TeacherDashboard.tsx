import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TeacherDashboard() {
  const [niveau, setNiveau] = useState<string>("Inconnu");
  const [resultats, setResultats] = useState<any[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // 🧠 Chargement des infos locales au montage
  useEffect(() => {
    const storedLevel = localStorage.getItem("loma_niveau");
    if (storedLevel) setNiveau(storedLevel);

    const savedResults = localStorage.getItem("loma_resultats");
    if (savedResults) setResultats(JSON.parse(savedResults));

    // Détection du thème
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(systemDark ? "dark" : "light");
  }, []);

  // 🧹 Réinitialiser toutes les données
  const handleReset = () => {
    if (confirm("Voulez-vous vraiment effacer toutes les données élèves ?")) {
      localStorage.removeItem("loma_niveau");
      localStorage.removeItem("loma_resultats");
      setNiveau("CP");
      setResultats([]);
      alert("Données réinitialisées ✅");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start p-10 font-[Nunito] transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-b from-yellow-50 via-pink-50 to-blue-50 text-gray-800"
      }`}
    >
      <h1 className="text-5xl font-extrabold text-pink-500 dark:text-pink-300 mb-8 drop-shadow-sm">
        👩‍🏫 Tableau Enseignant
      </h1>

      {/* Niveau actuel */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-2xl w-full max-w-2xl mb-6 text-center">
        <p className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
          Niveau actuel détecté :
        </p>
        <span className="text-3xl font-extrabold text-pink-500 dark:text-pink-300">
          {niveau}
        </span>
      </div>

      {/* Historique des résultats */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-2xl w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-200">
          Historique des réussites 🧩
        </h2>

        {resultats.length > 0 ? (
          <ul className="space-y-3">
            {resultats.map((r, i) => (
              <li
                key={i}
                className={`p-3 rounded-xl shadow-sm ${
                  r.ok
                    ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200"
                }`}
              >
                <p>
                  <strong>{r.domaine.toUpperCase()}</strong> — {r.objectif}
                </p>
                <p className="text-sm italic">
                  {r.competence} ({r.date})
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">
            Aucun résultat enregistré pour le moment.
          </p>
        )}
      </div>

      {/* Boutons */}
      <div className="flex gap-6 mt-10">
        <button
          onClick={handleReset}
          className="bg-red-100 hover:bg-red-200 dark:bg-red-700 dark:hover:bg-red-600 text-red-700 dark:text-red-100 font-semibold px-6 py-3 rounded-xl shadow transition-all"
        >
          🔄 Réinitialiser les données
        </button>

        <Link
          to="/"
          className="bg-blue-100 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-blue-700 dark:text-gray-100 font-semibold px-6 py-3 rounded-xl shadow transition-all"
        >
          🏠 Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}