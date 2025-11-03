import { Link, useLocation } from "react-router-dom";
import lomaMascotte from "../assets/loma.png";

export default function LomaButton() {
  const location = useLocation();

  if (location.pathname === "/") return null;

  return (
    <Link
      to="/"
      className="fixed bottom-6 left-6 flex flex-col items-center cursor-pointer group"
    >
      <div className="relative">
        {/* Loma elle-même */}
        <img
          src={lomaMascotte}
          alt="Loma mascotte"
          className="w-24 h-24 object-contain drop-shadow-lg"
        />

        {/* La petite main de Loma */}
        <div className="absolute right-0 top-4 text-4xl origin-bottom-right animate-loma-hand">👋</div>
      </div>

      <span className="text-sm font-semibold text-purple-700 mt-1 opacity-0 group-hover:opacity-100 transition">
        Retour à Loma
      </span>
    </Link>
  );
}