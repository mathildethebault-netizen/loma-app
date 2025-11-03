import { useEffect, useState } from "react";
import LomaImg from "../assets/loma.png";

export default function MascotteProgression({
  world,
  progress = 0,
}: {
  world: string;
  progress?: number;
}) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    // Animation douce vers la nouvelle position
    setPosition(progress * 100);
  }, [progress]);

  return (
    <div className="relative w-full">
      {/* 🌟 Chemin étoilé */}
      <svg
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full h-[100px]"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffe9a7" />
            <stop offset="100%" stopColor="#b5e3ff" />
          </linearGradient>
        </defs>
        <path
          d="M0,70 Q360,30 720,70 T1440,70"
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>

      {/* 🧸 Loma — avance selon la progression */}
      <img
        src={LomaImg}
        alt="Loma"
        className="absolute bottom-[20px] w-20 transition-all duration-700 ease-in-out"
        style={{
          left: `calc(${position}% - 50px)`,
          transform: `translateX(${position}%)`,
        }}
      />
    </div>
  );
}