export default function TeacherExercises() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50 flex flex-col items-center justify-center font-[Nunito] text-gray-800 p-8">
      <h2 className="text-3xl font-bold text-pink-600 mb-4">
        ✏️ Création d’exercices
      </h2>
      <p className="text-gray-600 text-lg mb-6 text-center max-w-2xl">
        Créez vos propres activités personnalisées à partager avec vos élèves.
      </p>

      <div className="bg-white/80 rounded-3xl shadow-xl p-6 w-[90%] max-w-3xl">
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Titre de l’exercice"
            className="border border-pink-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <textarea
            placeholder="Consigne..."
            rows={4}
            className="border border-pink-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            type="submit"
            className="bg-pink-100 hover:bg-pink-200 text-pink-700 font-semibold py-3 px-6 rounded-2xl shadow-md transition"
          >
            💾 Enregistrer l’exercice
          </button>
        </form>
      </div>
    </div>
  );
}
