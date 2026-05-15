"use client";
import { useEffect, useState } from "react";

interface StatCardProps {
  titre: string;
  valeur: number;
  unite: string;
  couleur: string;
  icone?: React.ReactNode;
}

function useCompteur(valeurFinale: number, duree = 1000) {
  const [compteur, setCompteur] = useState(0);

  useEffect(() => {
    if (valeurFinale === 0) return;
    const steps = 30;
    const increment = valeurFinale / steps;
    const interval = duree / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= valeurFinale) {
        setCompteur(valeurFinale);
        clearInterval(timer);
      } else {
        setCompteur(Math.floor(current));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [valeurFinale, duree]);

  return compteur;
}

export default function StatCard({ titre, valeur, unite, couleur, icone }: StatCardProps) {
  const compteur = useCompteur(valeur);

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 border-t-4 ${couleur} hover:shadow-lg transition group`}>
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-gray-600">{titre}</p>
        {icone && (
          <div className="opacity-60 group-hover:opacity-100 transition">
            {icone}
          </div>
        )}
      </div>
      <p className="text-4xl font-bold text-gray-900 mt-2 tabular-nums">{compteur}</p>
      <p className="text-sm text-gray-500 mt-1">{unite}</p>
    </div>
  );
}