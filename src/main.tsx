// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ✅ Thème global LOMA (fond beige/orange)
import "./index.css";

// ✅ Polices officielles LOMA
import "./styles/fonts.css";

// 💫 Point d’entrée principal de Loma
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);