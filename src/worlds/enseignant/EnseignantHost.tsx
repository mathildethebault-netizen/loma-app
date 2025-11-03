import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import AccueilEnseignantPage from "./AccueilEnseignantPage";
import TableauClassePage from "./TableauClassePage";
import FicheElevePage from "./FicheElevePage";
import VueGlobaleClassePage from "./VueGlobaleClassePage";

const pastelGradients = [
  "linear-gradient(135deg, #cce6ff 0%, #e7e6fb 100%)", // bleu ciel & lavande
  "linear-gradient(135deg, #e6ffe6 0%, #fdf6e3 100%)", // menthe & beige
  "linear-gradient(135deg, #fffbe6 0%, #fff7c2 100%)", // jaune miel
  "linear-gradient(135deg, #e6faff 0%, #f3e6ff 100%)", // bleu ciel & lavande pâle
];

const mascottes = [
  { emoji: "📖", label: "Lecture", color: pastelGradients[0] },
  { emoji: "📝", label: "Français", color: pastelGradients[1] },
  { emoji: "🔢", label: "Maths", color: pastelGradients[2] },
  { emoji: "🌍", label: "Découverte", color: pastelGradients[3] },
  { emoji: "🎨", label: "Arts", color: pastelGradients[1] },
  { emoji: "🏃‍♂️", label: "Sport", color: pastelGradients[0] },
];

const AccueilCards: React.FC = () => {
  return (
    <>
      <div className="luma-dashboard-title">Tableau de bord</div>
      <div className="luma-cards-grid">
        {mascottes.map((m) => (
          <Link
            key={m.label}
            to={m.label === "Français" ? "tableau" : m.label === "Lecture" ? "tableau" : m.label === "Maths" ? "tableau" : "vue-globale"}
            className="luma-card"
            style={{
              background: m.color as string,
              boxShadow: "0 4px 20px 0 #b0c4de33, 0 1px 0 #fff7c2",
              textDecoration: "none",
            }}
          >
            <span className="mascotte">{m.emoji}</span>
            <span className="label">{m.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

const EnseignantHost: React.FC = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #e3f0ff 0%, #fdf6e3 100%)",
      fontFamily: "'Quicksand', 'Nunito', 'Segoe UI', Arial, sans-serif",
      color: "#36384c",
      letterSpacing: "0.01em"
    }}>
      <style>{`
        .luma-dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 2.2rem 2rem 1.2rem 2rem;
        }
        .luma-logo {
          display: flex;
          align-items: center;
          font-family: 'Quicksand', 'Nunito', sans-serif;
          font-weight: 700;
          font-size: 2rem;
          color: #3a4e88;
          letter-spacing: 0.04em;
          background: linear-gradient(90deg, #cce6ff 60%, #fff7c2 100%);
          padding: 0.5rem 1.3rem 0.5rem 1.1rem;
          border-radius: 1.7rem;
          box-shadow: 0 2px 16px 0 #e0e1e7a8;
          position: relative;
        }
        .luma-star {
          margin-left: 0.7rem;
          font-size: 1.5rem;
          color: #ffd700;
          text-shadow: 0 1px 7px #ffe0669a;
        }
        .luma-badges {
          display: flex;
          gap: 1.1rem;
        }
        .luma-badge {
          background: linear-gradient(90deg, #fffbe6 0%, #ffe8b0 100%);
          color: #a57b00;
          font-weight: 600;
          border-radius: 1.2rem;
          box-shadow: 0 2px 10px 0 #f7e8b0a0;
          padding: 0.5rem 1.2rem;
          font-size: 1rem;
          display: flex;
          align-items: center;
          margin-top: 0.3rem;
        }
        .luma-badge.progression {
          background: linear-gradient(90deg, #e6ffe6 0%, #d0ffd0 100%);
          color: #2e7d32;
          box-shadow: 0 2px 10px 0 #b2dfdb60;
        }
        .luma-dashboard-title {
          font-size: 2.3rem;
          font-weight: 800;
          margin: 0 0 2.1rem 0;
          letter-spacing: 0.01em;
          color: #3a4e88;
          text-align: left;
        }
        .luma-dashboard-main {
          display: flex;
          flex-direction: row;
          gap: 2.5rem;
          justify-content: space-between;
          align-items: flex-start;
          padding: 0 2rem 2rem 2rem;
        }
        .luma-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          flex: 1 1 0;
        }
        .luma-card {
          border-radius: 1.5rem;
          box-shadow: 0 4px 20px 0 #b0c4de33;
          padding: 2.2rem 1.2rem 1.5rem 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 170px;
          transition: transform 0.13s;
          font-weight: 600;
          font-size: 1.2rem;
          background: white;
        }
        .luma-card .mascotte {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 2px 8px #e0e1e7a4);
        }
        .luma-card .label {
          font-family: 'Nunito', 'Quicksand', sans-serif;
          font-size: 1.1rem;
          color: #36384c;
          text-shadow: 0 1px 4px #e0e1e7a0;
        }
        .luma-card:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 8px 28px 0 #b0c4de55;
        }
        .luma-conseils-luma {
          min-width: 270px;
          max-width: 340px;
          background: linear-gradient(120deg, #fffbe6 0%, #fff7c2 100%);
          border-radius: 2rem;
          box-shadow: 0 4px 24px 0 #ffe06652;
          padding: 2rem 1.5rem 1.5rem 1.5rem;
          margin-left: 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .luma-conseils-title {
          font-weight: 800;
          font-size: 1.25rem;
          color: #a57b00;
          margin-bottom: 1.2rem;
          text-align: center;
          letter-spacing: 0.02em;
        }
        .luma-conseils-mascotte {
          font-size: 2.8rem;
          margin-bottom: 0.6rem;
          display: flex;
          align-items: flex-end;
        }
        .luma-conseils-mascotte .book {
          font-size: 1.3rem;
          margin-left: -0.3rem;
          margin-bottom: 0.3rem;
        }
        .luma-conseils-stars {
          display: flex;
          gap: 0.22rem;
          margin-bottom: 0.8rem;
        }
        .luma-conseils-star {
          color: #ffd700;
          font-size: 1.2rem;
          filter: drop-shadow(0 2px 5px #ffe066a0);
        }
        .luma-conseils-text {
          font-size: 1.1rem;
          color: #7d6700;
          text-align: center;
          margin-bottom: 0.3rem;
          font-family: 'Nunito', 'Quicksand', sans-serif;
        }
        .luma-topnav {
          display: flex;
          gap: 0.6rem;
          padding: 0 2rem 1.2rem 2rem;
        }
        .luma-topnav a {
          background: linear-gradient(90deg, #e6faff 0%, #e6ffe6 100%);
          padding: 0.6rem 1rem;
          border-radius: 1rem;
          box-shadow: 0 2px 10px #b0c4de40;
          color: #3a4e88;
          font-weight: 700;
          text-decoration: none;
        }
        .luma-topnav a:hover {
          transform: translateY(-2px);
        }
        @media (max-width: 1000px) {
          .luma-dashboard-main {
            flex-direction: column;
            gap: 2.5rem;
          }
          .luma-conseils-luma {
            margin-left: 0;
            margin-top: 1.5rem;
            width: 100%;
            max-width: 100%;
          }
        }
        @media (max-width: 700px) {
          .luma-dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.1rem;
            padding: 1.2rem 1rem 0.5rem 1rem;
          }
          .luma-dashboard-main {
            padding: 0 0.5rem 1rem 0.5rem;
          }
          .luma-cards-grid {
            gap: 1rem;
          }
        }
      `}</style>
      <header className="luma-dashboard-header">
        <div className="luma-logo">
          Luma École
          <span className="luma-star" title="Étoile">★</span>
        </div>
        <div className="luma-badges">
          <span className="luma-badge progression">+12&nbsp;% progression lecture</span>
          <span className="luma-badge">Élève prêt pour le niveau supérieur</span>
        </div>
      </header>
      <nav className="luma-topnav">
        <Link to="/enseignant">Accueil</Link>
        <Link to="/enseignant/tableau">Tableau de la classe</Link>
        <Link to="/enseignant/vue-globale">Vue globale</Link>
      </nav>
      <main className="luma-dashboard-main">
        <section style={{ flex: 1 }}>
          <Routes>
            {/* Accueil par défaut : tuiles cliquables */}
            <Route index element={<AccueilCards />} />
            {/* Pages dédiées */}
            <Route path="tableau" element={<TableauClassePage />} />
            <Route path="fiche/:eleveId" element={<FicheElevePage />} />
            <Route path="vue-globale" element={<VueGlobaleClassePage />} />
            {/* Garde-fou */}
            <Route path="*" element={<AccueilEnseignantPage />} />
          </Routes>
        </section>
        <aside className="luma-conseils-luma">
          <div className="luma-conseils-title">💡 Conseils de Luma</div>
          <div className="luma-conseils-mascotte">
            <span role="img" aria-label="Mascotte jaune">🟡</span>
            <span className="book" role="img" aria-label="Livre">📚</span>
          </div>
          <div className="luma-conseils-stars">
            <span className="luma-conseils-star">★</span>
            <span className="luma-conseils-star">★</span>
            <span className="luma-conseils-star">★</span>
            <span className="luma-conseils-star">★</span>
          </div>
          <div className="luma-conseils-text">
            Encouragez la curiosité et félicitez les progrès.<br />
            <span style={{fontSize: "0.97em", color: "#a57b00"}}>Luma veille sur chaque élève !</span>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default EnseignantHost;