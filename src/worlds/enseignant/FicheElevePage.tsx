

import { Link, useParams } from "react-router-dom";

interface Objectif {
  domaine: string;
  objectif: string;
  statut: "Acquis" | "En cours" | "À venir";
}

const objectifsMock: Objectif[] = [
  { domaine: "Français", objectif: "Écrire sans erreur une phrase simple", statut: "Acquis" },
  { domaine: "Grammaire", objectif: "Identifier le verbe et le sujet", statut: "En cours" },
  { domaine: "Orthographe", objectif: "Mémoriser des mots fréquents", statut: "À venir" },
];

export default function FicheElevePage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 font-[Nunito] p-8">
      <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-300 mb-6 text-center">
        🧠 Fiche Élève — {id ? `Élève ${id}` : "Élève"}
      </h1>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-500 dark:text-indigo-300">
          🎯 Objectifs Éduscol
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-indigo-100 dark:bg-gray-700">
              <th className="py-3 px-4 rounded-tl-lg">Domaine</th>
              <th className="py-3 px-4">Objectif</th>
              <th className="py-3 px-4 rounded-tr-lg">Statut</th>
            </tr>
          </thead>
          <tbody>
            {objectifsMock.map((obj, idx) => (
              <tr key={idx} className="border-t border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 transition">
                <td className="py-3 px-4 font-semibold">{obj.domaine}</td>
                <td className="py-3 px-4">{obj.objectif}</td>
                <td className="py-3 px-4 text-center">
                  {obj.statut === "Acquis" && <span className="text-green-600 dark:text-green-400 font-semibold">🟢 Acquis</span>}
                  {obj.statut === "En cours" && <span className="text-yellow-600 dark:text-yellow-400 font-semibold">🟡 En cours</span>}
                  {obj.statut === "À venir" && <span className="text-gray-500 dark:text-gray-400 font-semibold">⚪ À venir</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 text-center">
          <Link
            to="/enseignant/tableau"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md transition"
          >
            ⬅️ Retour au tableau de classe
          </Link>
        </div>
      </div>
    </div>
  );
}