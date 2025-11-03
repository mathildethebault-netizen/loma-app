import { useState } from "react";
import Livre3D from "../../components/ui/Livre3D";

export default function CarnetLecteurMonde() {
  const [titre, setTitre] = useState("");
  const [texte, setTexte] = useState("");

  const save = () => {
    alert(`📚 Carnet enregistré pour “${titre || "Sans titre"}”.`);
    // TODO: persister plus tard (Firestore / localForage)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-amber-50 to-blue-50 text-gray-800 px-4 py-10 flex flex-col items-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-6 drop-shadow-sm">
        📖 Mon Carnet de Lecteur
      </h2>

      <Livre3D
        title={titre || "Titre du livre"}
        leftPage={
          <div className="flex flex-col gap-3">
            <label className="text-sm text-gray-600">Titre du livre</label>
            <input
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Ex. Le loup qui voulait changer de couleur"
              className="px-3 py-2 rounded-lg border border-rose-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <div className="text-xs text-gray-500">
              Astuce : tu peux écrire aussi l’auteur et la date de lecture.
            </div>
          </div>
        }
        rightPage={
          <div className="flex flex-col gap-3">
            <label className="text-sm text-gray-600">
              Écris ce que tu as ressenti, ce que tu as compris ou imaginé
            </label>
            <textarea
              value={texte}
              onChange={(e) => setTexte(e.target.value)}
              placeholder="J’ai aimé ce passage parce que… / Ce personnage me fait penser à…"
              className="min-h-[180px] px-3 py-2 rounded-lg border border-amber-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-vertical"
            />
          </div>
        }
        footer={
          <button
            onClick={save}
            className="bg-pink-200 hover:bg-pink-300 text-pink-900 font-semibold px-6 py-3 rounded-full shadow-md transition"
          >
            📬 Sauvegarder mon carnet
          </button>
        }
      />
    </div>
  );
}