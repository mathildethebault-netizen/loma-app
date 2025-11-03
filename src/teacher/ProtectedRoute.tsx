import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { JSX, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-50 via-pink-50 to-yellow-50 text-gray-700 font-[Nunito]">
        <p>Chargement...</p>
      </div>
    );
  }

  // Si pas connecté → redirige vers la page de connexion
  if (!user) {
    return <Navigate to="/enseignant/login" replace />;
  }

  // Sinon, affiche la page protégée
  return children;
}