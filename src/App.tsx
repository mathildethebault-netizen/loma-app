import {
  createBrowserRouter,
  RouterProvider,
  Link,
  useNavigate,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

// 🌍 Mondes enfants
import AccueilMonde from "./worlds/AccueilMonde";
import FrancaisMonde from "./worlds/FrancaisMonde";
import MathsMonde from "./worlds/MathsMonde";

// 👩‍🏫 Espace enseignant
import EnseignantHost from "./worlds/enseignant/EnseignantHost";

// ======================================================
// 🌈 Layout global sans fond forcé pour les sous-pages
// ======================================================
function AppContent() {
  const location = useLocation();

  // ✅ Pages avec fond spécifique
  const isAccueil = location.pathname === "/";
  const isMonde = location.pathname === "/child";

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "l") {
        window.location.href = "/enseignant";
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center font-[Nunito] text-gray-800 relative w-screen h-screen m-0 p-0`}
      style={{
        backgroundImage: isAccueil
          ? "url('/images/fond-loma-accueil.png')"
          : "none", // ✅ plus de fond sur /child (il est dans AccueilMonde)
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#fff8ee",
      }}
    >
      {isAccueil && (
        <div className="absolute inset-0 bg-[#fff8ee]/40 backdrop-blur-[1px] -z-10" />
      )}
      <Outlet />
    </div>
  );
}

// ======================================================
// 🏠 Page d’accueil
// ======================================================
function AccueilPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center z-10 w-full h-full">
      <div className="bg-white/60 rounded-3xl p-10 shadow-lg backdrop-blur-sm max-w-2xl mx-auto animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-serif text-amber-900 mb-6 flex justify-center items-center gap-2">
          <span className="italic font-semibold">Bienvenue dans Loma</span> 🌿
        </h1>

        <p className="text-brown-700 mb-8 leading-relaxed text-lg">
          Choisis ton espace et découvre un monde d’apprentissage doux et
          bienveillant.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/child")}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-md transition-all duration-300"
          >
            🧒 Espace Enfant
          </button>

          <Link
            to="/enseignant"
            className="bg-yellow-100 hover:bg-yellow-200 text-amber-800 font-semibold px-8 py-4 rounded-2xl shadow-md transition-all duration-300"
          >
            👩‍🏫 Espace Enseignant
          </Link>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// 🚀 ROUTEUR PRINCIPAL
// ======================================================
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppContent />,
    children: [
      { index: true, element: <AccueilPage /> },
      { path: "child", element: <AccueilMonde /> },
      { path: "francais", element: <FrancaisMonde /> },
      { path: "maths", element: <MathsMonde /> },
      { path: "enseignant", element: <EnseignantHost /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

// ======================================================
// 🧩 Application principale
// ======================================================
export default function App() {
  return (
    <div className="w-screen h-screen bg-[#fff8ee] overflow-hidden">
      <RouterProvider router={router} />
    </div>
  );
}