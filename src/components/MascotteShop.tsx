

import { useState, useEffect } from "react";
import { lomaMascottes } from "../data/mascottes/lomaMascottes";

interface MascotteShopProps {
  onClose: () => void;
}

export default function MascotteShop({ onClose }: MascotteShopProps) {
  const [stars, setStars] = useState<number>(() => Number(localStorage.getItem("loma_stars") || 0));
  const [owned, setOwned] = useState<string[]>(() => JSON.parse(localStorage.getItem("loma_owned") || "[]"));

  const handleBuy = (id: string, prix: number) => {
    if (owned.includes(id)) return;
    if (stars < prix) {
      alert("Pas assez d’étoiles ✨");
      return;
    }
    const newStars = stars - prix;
    const newOwned = [...owned, id];
    setStars(newStars);
    setOwned(newOwned);
    localStorage.setItem("loma_stars", String(newStars));
    localStorage.setItem("loma_owned", JSON.stringify(newOwned));
  };

  useEffect(() => {
    localStorage.setItem("loma_stars", String(stars));
  }, [stars]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-3xl font-extrabold text-pink-500 dark:text-pink-300 mb-6 text-center">
        🛍 Boutique des Mascottes
      </h2>

      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Tu as <span className="font-bold text-yellow-500">{stars}</span> ⭐ à dépenser !
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {lomaMascottes.map((m) => (
          <div
            key={m.id}
            className={`p-4 rounded-2xl border shadow-md text-center transition-all duration-300 ${
              owned.includes(m.id)
                ? "bg-green-100 border-green-400"
                : "bg-pink-50 border-pink-200 hover:bg-pink-100"
            }`}
          >
            <img
              src={m.image}
              alt={m.nom}
              className="w-24 h-24 object-contain mx-auto mb-3"
            />
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">{m.nom}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{m.description}</p>

            {owned.includes(m.id) ? (
              <span className="text-green-600 font-semibold">✅ Déjà achetée</span>
            ) : (
              <button
                onClick={() => handleBuy(m.id, m.prix)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-4 py-2 rounded-xl shadow-md transition-all"
              >
                Acheter — {m.prix} ⭐
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-xl font-bold shadow-md"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}