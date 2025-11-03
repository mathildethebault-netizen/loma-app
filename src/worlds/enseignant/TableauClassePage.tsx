import { Link } from "react-router-dom";

interface Eleve {
  id: number;
  nom: string;
  progression: number;
  moyenne: number;
}

const eleves: Eleve[] = [
  { id: 1, nom: "Lina", progression: 0.8, moyenne: 16 },
  { id: 2, nom: "Eliott", progression: 0.6, moyenne: 14 },
  { id: 3, nom: "Sarah", progression: 0.9, moyenne: 18 },
  { id: 4, nom: "Noah", progression: 0.7, moyenne: 15 },
  { id: 5, nom: "Camille", progression: 0.5, moyenne: 12 },
];

export default function TableauClassePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 p-8 font-[Nunito]">
      <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-300 mb-8 text-center">
        👩‍🏫 Tableau de la Classe
      </h1>

      <table className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <thead className="bg-indigo-100 dark:bg-indigo-700 text-gray-800 dark:text-gray-100 text-lg">
          <tr>
            <th className="py-3 px-6 text-left">Élève</th>
            <th className="py-3 px-6 text-center">Progression 🌟</th>
            <th className="py-3 px-6 text-center">Moyenne 📚</th>
            <th className="py-3 px-6 text-center">Détails 🔍</th>
          </tr>
        </thead>
        <tbody>
          {eleves.map((e) => (
            <tr
              key={e.id}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
            >
              <td className="py-4 px-6 text-left font-semibold">{e.nom}</td>
              <td className="py-4 px-6 text-center">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-indigo-500 h-3 rounded-full"
                    style={{ width: `${e.progression * 100}%` }}
                  ></div>
                </div>
              </td>
              <td className="py-4 px-6 text-center text-lg font-bold text-indigo-600 dark:text-indigo-300">
                {e.moyenne}/20
              </td>
              <td className="py-4 px-6 text-center">
                <Link
                  to={`/enseignant/eleve/${e.id}`}
                  className="text-indigo-500 hover:text-indigo-700 font-semibold"
                >
                  Voir la fiche →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📊 Progression adaptative */}
      <section className="mt-12 w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 dark:bg-gray-800/70 dark:border-gray-700 rounded-3xl shadow-xl p-8 transition-all duration-500">
        <h2 className="text-3xl font-extrabold text-[#6b5b5b] mb-6 drop-shadow-sm text-center">
          📈 Progression adaptative des élèves
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600">
              <th className="py-3 px-4">📘 Domaine</th>
              <th className="py-3 px-4">🎯 Niveau actuel</th>
              <th className="py-3 px-4">⭐ Score</th>
            </tr>
          </thead>
          <tbody>
            {[
              { key: "francais", label: "Français", color: "bg-[#C9B4CF]" },
              { key: "conjugaison", label: "Conjugaison", color: "bg-[#E7B4A4]" },
              { key: "orthographe", label: "Orthographe", color: "bg-[#A6B565]" },
              { key: "grammaire", label: "Grammaire", color: "bg-[#E8C48E]" },
              { key: "lexique-expression", label: "Lexique & Expression", color: "bg-[#5A4536]" },
            ].map(({ key, label, color }) => {
              const niveau = localStorage.getItem(`loma_${key}_niveau`) || "CP";
              const bonnes = localStorage.getItem(`loma_${key}_bonnes`) || "0";
              const total = localStorage.getItem(`loma_${key}_total`) || "0";
              return (
                <tr
                  key={key}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50/60 dark:hover:bg-gray-700/40 transition"
                >
                  <td
                    className={`py-3 px-4 font-semibold text-gray-800 dark:text-gray-100 rounded-l-lg ${color} bg-opacity-30`}
                  >
                    {label}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{niveau}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-200">
                    {bonnes}/{total} bonnes réponses
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-indigo-500 transition-all duration-500"
                        style={{ width: `${(Number(total) > 0 ? (Number(bonnes) / Number(total)) * 100 : 0)}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <div className="text-center mt-10">
        <Link
          to="/enseignant"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md transition"
        >
          ⬅️ Retour à l’accueil enseignant
        </Link>
      </div>
    </div>
  );
}