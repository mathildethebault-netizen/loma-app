/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      /* =========================================================
         🎨 PALETTE LOMA — douce et cohérente
      ========================================================= */
      colors: {
        loma: {
          rose: "#f6afa1",    // Accent rose doux
          beige: "#f1c68c",   // Fond clair et chaleureux
          vert: "#96a842",    // Naturel et équilibrant
          violet: "#96899e",  // Détail poétique
          brun: "#604a3b",    // Texte principal et éléments forts
          fond: "#fffaf2",    // Fond global très clair
        },

        // 🌙 Palette sombre élégante
        darkBg: "#1c1c1e",
        darkSurface: "#2c2c2e",
        darkAccent: "#3a3a3c",
        darkText: "#f5f5f7",
        darkMuted: "#a1a1aa",
      },

      /* =========================================================
         ✨ POLICES LOCALES — cohérentes avec index.css
      ========================================================= */
      fontFamily: {
        childos: ["'Childos Arabic'", "'Glacial Indifference'", "sans-serif"],
        glacial: ["'Glacial Indifference'", "'Nunito'", "sans-serif"],
        nunito: ["'Nunito'", "sans-serif"],
        sans: ["'Glacial Indifference'", "sans-serif"], // par défaut
      },

      /* =========================================================
         🌈 COULEURS DE FOND ET TEXTES
      ========================================================= */
      backgroundColor: {
        page: "#fdfaf5",
      },
      textColor: {
        primary: "#604a3b",
      },

      /* =========================================================
         🌅 IMAGES DE FOND ET GRADIENTS
      ========================================================= */
      backgroundImage: {
        "monde-francais": "linear-gradient(to bottom, #fdfaf5, #f6afa1)",
        "monde-maths": "linear-gradient(to bottom, #fdfaf5, #fcd581)",
      },

      /* =========================================================
         🌿 OMBRES & RAYONS
      ========================================================= */
      boxShadow: {
        loma: "0 4px 10px rgba(0,0,0,0.08)",
        lomaHover: "0 6px 16px rgba(0,0,0,0.15)",
        doux: "0 2px 8px rgba(107, 68, 35, 0.15)",
        dark: "0 2px 8px rgba(0,0,0,0.5)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },

      /* =========================================================
         🎞️ ANIMATIONS PERSONNALISÉES
      ========================================================= */
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        popIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "80%": { transform: "scale(1.05)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out both",
        popIn: "popIn 0.4s ease-out forwards",
        bounceSlow: "bounceSlow 2s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};