import { useEffect, useState } from "react";

interface ScreenTimeFlowerProps {
  world: "francais" | "lecture" | "maths" | "orthographe";
}

export default function ScreenTimeFlower({ world }: ScreenTimeFlowerProps) {
  const [minutes, setMinutes] = useState(0);
  const [stage, setStage] = useState<"seed" | "sprout" | "grown" | "flower">("seed");

  // 🎨 Couleurs selon le monde
  const themeMap: Record<string, { stem: string; leaf: string; flower: string }> = {
    francais: { stem: "#4ade80", leaf: "#16a34a", flower: "#f472b6" },
    lecture: { stem: "#60a5fa", leaf: "#2563eb", flower: "#a78bfa" },
    maths: { stem: "#34d399", leaf: "#059669", flower: "#fde047" },
    orthographe: { stem: "#fcd5ce", leaf: "#fae1dd", flower: "#f8edeb" },
  };

  const themes = themeMap[world] || themeMap["francais"];

  // 🕒 Temps d’écran simulé avec localStorage
  useEffect(() => {
    const startKey = `loma:start_${world}`;
    const stored = localStorage.getItem(startKey);
    let startTime = stored ? parseInt(stored) : Date.now();
    if (!stored) localStorage.setItem(startKey, startTime.toString());

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 60000);
      setMinutes(elapsed);

      if (elapsed >= 40) setStage("flower");
      else if (elapsed >= 20) setStage("grown");
      else if (elapsed >= 5) setStage("sprout");
    }, 10000); // toutes les 10 secondes pour test

    return () => clearInterval(interval);
  }, [world]);

  // 🌼 Message après 40 min
  useEffect(() => {
    if (stage === "flower") {
      alert("🌸 Il est temps de faire une pause !");
      localStorage.removeItem(`loma:start_${world}`);
    }
  }, [stage, world]);

  // 🌱 Choix de l’étape visuelle
  const plantStage = {
    seed: <circle cx="50" cy="90" r="4" fill="#8B4513" />,
    sprout: (
      <>
        <line x1="50" y1="90" x2="50" y2="70" stroke={themes.stem} strokeWidth="3" />
        <ellipse cx="45" cy="78" rx="5" ry="2" fill={themes.leaf} />
        <ellipse cx="55" cy="78" rx="5" ry="2" fill={themes.leaf} />
      </>
    ),
    grown: (
      <>
        <line x1="50" y1="90" x2="50" y2="55" stroke={themes.stem} strokeWidth="3" />
        <ellipse cx="43" cy="68" rx="7" ry="3" fill={themes.leaf} />
        <ellipse cx="57" cy="65" rx="7" ry="3" fill={themes.leaf} />
      </>
    ),
    flower: (
      <>
        <line x1="50" y1="90" x2="50" y2="50" stroke={themes.stem} strokeWidth="3" />
        <ellipse cx="40" cy="65" rx="8" ry="4" fill={themes.leaf} />
        <ellipse cx="60" cy="63" rx="8" ry="4" fill={themes.leaf} />
        <circle cx="50" cy="45" r="6" fill={themes.flower} />
      </>
    ),
  }[stage];

  return (
    <div className="relative w-16 h-24 flex flex-col items-center">
      {/* 🌍 Terre */}
      <div className="absolute bottom-0 w-16 h-3 bg-[#8B4513] rounded-t-full z-0" />
      {/* 🌱 Plante (SVG animée) */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="transition-all duration-1000 ease-in-out"
      >
        <g className="origin-bottom animate-[grow_4s_ease-in-out_forwards]">
          {plantStage}
        </g>
      </svg>

      <style>{`
        @keyframes grow {
          from { transform: scaleY(0.1) translateY(80%); opacity: 0.6; }
          to { transform: scaleY(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}