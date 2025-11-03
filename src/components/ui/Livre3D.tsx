import React, { PropsWithChildren } from "react";

type Livre3DProps = {
  title: string;
  footer?: React.ReactNode;
  leftPage?: React.ReactNode;
  rightPage?: React.ReactNode;
};

export default function Livre3D({
  title,
  footer,
  leftPage,
  rightPage,
}: PropsWithChildren<Livre3DProps>) {
  return (
    <div className="livre3d-wrap">
      <div className="livre3d">
        <div className="cover cover-left">
          <div className="cover-title">{title}</div>
        </div>

        <div className="book-block">
          <div className="spine" />
          <div className="pages">
            <div className="page page-left">
              <div className="page-inner">
                <div className="page-header">{title}</div>
                <div className="page-content">
                  {leftPage ?? (
                    <p className="placeholder">
                      Page de gauche (titre, auteur, date…)
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="page page-right">
              <div className="page-inner">
                <div className="page-header">Carnet de lecteur</div>
                <div className="page-content">
                  {rightPage ?? (
                    <p className="placeholder">
                      Page de droite (texte / carnet)
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cover cover-right" />
      </div>

      {footer ? <div className="livre3d-footer">{footer}</div> : null}

      {/* Style interne au composant */}
      <style>{`
        .livre3d-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          perspective: 1600px;
          width: min(100%, 960px);
          margin-inline: auto;
        }

        .livre3d {
          position: relative;
          width: min(100%, 880px);
          aspect-ratio: 16/9;
          transform-style: preserve-3d;
          animation: openBook 900ms ease-out;
          transition: transform .4s ease;
        }
        .livre3d:hover { transform: rotateX(1deg) rotateY(-1deg); }

        .cover {
          position: absolute; top: 0; bottom: 0;
          width: 50%;
          border-radius: 20px;
          background: linear-gradient(145deg, #fde7ef, #f8d4df);
          box-shadow: 0 10px 20px rgba(0,0,0,.1);
        }

        .cover-left {
          left: 0;
          transform: translateZ(6px) rotateY(12deg);
          transform-origin: right center;
          background: linear-gradient(145deg, #ffe4ee, #ffd9e6);
        }

        .cover-right {
          right: 0;
          transform: translateZ(3px) rotateY(-3deg);
          transform-origin: left center;
          background: linear-gradient(145deg, #ffe4ee, #ffd9e6);
        }

        .cover-title {
          position: absolute;
          bottom: 12%;
          width: 100%;
          text-align: center;
          color: #b84b7f;
          font-weight: 800;
          font-size: clamp(16px, 2.6vw, 28px);
        }

        .book-block {
          position: absolute;
          inset: 2%;
          border-radius: 18px;
          background: linear-gradient(#fff, #fffaf7);
          box-shadow: 0 12px 24px rgba(0,0,0,.06);
          overflow: hidden;
          transform: translateZ(10px);
        }

        .spine {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, #f6cfe0, #f7d7e6);
        }

        .pages {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .page {
          padding: 20px;
          background: linear-gradient(#fffdfb, #fffdfb);
        }

        .page-inner {
          height: 100%;
          border-radius: 12px;
          background: repeating-linear-gradient(#fffbf7 0 28px, #fffbf7 27px, #ffeedd 28px);
          padding: 12px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.8);
        }

        .page-header {
          color: #c45486;
          font-weight: 700;
          margin-bottom: 10px;
          font-size: 18px;
        }

        .placeholder {
          color: #7a6f6f;
          opacity: .8;
        }

        .livre3d-footer {
          margin-top: 12px;
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        @keyframes openBook {
          0% { transform: rotateX(12deg) rotateY(8deg) scale(.98); opacity: 0; }
          60% { transform: rotateX(2deg) rotateY(-2deg) scale(1.01); opacity: 1; }
          100% { transform: rotateX(0) rotateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
