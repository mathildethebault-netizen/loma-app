

import { Link } from "react-router-dom";

export default function AccueilEnseignantPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 font-[Nunito] p-8">
      <h1 className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-300 mb-8">
        👩‍🏫 Espace Enseignant
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl text-center mb-12">
        Bienvenue dans l’espace enseignant de <strong>Loma</strong>. 
        Gérez vos classes, suivez la progression de vos élèves et consultez leurs fiches individuelles.
      </p>

      <div className="flex flex-col gap-6 w-full max-w-md">
        <Link
          to="/enseignant/tableau"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-4 rounded-xl text-center shadow-md transition-all"
        >
          📋 Accéder au tableau de la classe
        </Link>

        <Link
          to="/enseignant/vue-globale"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl text-center shadow-md transition-all"
        >
          📊 Vue globale de la classe
        </Link>

        <Link
          to="/enseignant/import"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 rounded-xl text-center shadow-md transition-all"
        >
          📂 Importer une classe
        </Link>
      </div>

      <Link
        to="/"
        className="mt-10 text-indigo-500 hover:text-indigo-700 font-semibold text-lg transition"
      >
        ⬅️ Retour à l’accueil
      </Link>
    </div>
  );
}