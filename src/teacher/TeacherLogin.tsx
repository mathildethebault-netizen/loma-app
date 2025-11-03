import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // 🔒 Vérification du domaine autorisé
      if (!email.endsWith("@ac-versailles.fr")) {
        setError("❌ Seules les adresses @ac-versailles.fr sont autorisées.");
        return;
      }

      // 🔐 Connexion Firebase
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/teacher/dashboard");
    } catch (err: any) {
      console.error("Firebase error:", err);
      setError("⚠️ " + (err.message || "Une erreur est survenue."));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-yellow-50 to-blue-50 flex flex-col items-center justify-center font-nunito text-gray-800">
      <div className="bg-white/80 backdrop-blur p-10 rounded-3xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
          👩‍🏫 Connexion Enseignant
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Adresse e-mail académique"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-3 rounded-2xl shadow-md transition"
          >
            Se connecter
          </button>
        </form>

        <div className="text-center text-sm mt-6 text-gray-500">
          L’accès est réservé aux enseignants du rectorat de Versailles.
        </div>
      </div>
    </div>
  );
}