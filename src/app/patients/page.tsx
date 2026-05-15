"use client";
import { useEffect, useState } from "react";
import PatientCard from "@/components/PatientCard";
import PatientForm from "@/components/PatientForm";

interface Patient {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: string;
  telephone: string | null;
  adresse: string | null;
  region: string;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 bg-gray-200 rounded-xl shrink-0" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [recherche, setRecherche] = useState("");
  const [filtreSexe, setFiltreSexe] = useState<"" | "M" | "F">("");
  const [filtreRegion, setFiltreRegion] = useState("");

  async function chargerPatients() {
    const res = await fetch("/api/patients");
    const data = await res.json();
    setPatients(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { chargerPatients(); }, []);

  function calculerAge(dateNaissance: string): number {
    const naissance = new Date(dateNaissance);
    const today = new Date();
    let age = today.getFullYear() - naissance.getFullYear();
    const m = today.getMonth() - naissance.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < naissance.getDate())) age--;
    return age;
  }

  const regions = [...new Set(patients.map((p) => p.region))].sort();

  const patientsFiltres = patients.filter((p) => {
    const texte = `${p.prenom} ${p.nom} ${p.region}`.toLowerCase().includes(recherche.toLowerCase());
    const sexeOk = filtreSexe === "" || p.sexe === filtreSexe;
    const regionOk = filtreRegion === "" || p.region === filtreRegion;
    return texte && sexeOk && regionOk;
  });

  const hasFilters = recherche || filtreSexe || filtreRegion;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
          {patients.length} patient{patients.length > 1 ? "s" : ""}
        </span>
      </div>

      <PatientForm onSuccess={chargerPatients} />

      {/* Recherche + Filtres */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
        {/* Barre de recherche */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Rechercher par nom, prénom ou région..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm text-gray-800 placeholder-gray-400 bg-white"
          />
          {recherche && (
            <button
              onClick={() => setRecherche("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filtres */}
        <div className="flex gap-2 flex-wrap">
          <select
            value={filtreSexe}
            onChange={(e) => setFiltreSexe(e.target.value as "" | "M" | "F")}
            className="text-sm border border-gray-300 rounded-xl px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="">Tous les sexes</option>
            <option value="F">Femme</option>
            <option value="M">Homme</option>
          </select>

          <select
            value={filtreRegion}
            onChange={(e) => setFiltreRegion(e.target.value)}
            className="text-sm border border-gray-300 rounded-xl px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="">Toutes les régions</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={() => { setRecherche(""); setFiltreSexe(""); setFiltreRegion(""); }}
              className="text-sm text-red-500 hover:text-red-700 border border-red-200 bg-red-50 rounded-xl px-3 py-2 transition"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Résultats */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">
          Liste des patients
        </h2>
        {hasFilters && (
          <span className="text-sm text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
            {patientsFiltres.length} résultat{patientsFiltres.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Skeleton loading */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : patientsFiltres.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400 bg-white rounded-2xl border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm font-medium">
            {hasFilters ? "Aucun résultat pour ces filtres" : "Aucun patient enregistré"}
          </p>
          {hasFilters && (
            <button
              onClick={() => { setRecherche(""); setFiltreSexe(""); setFiltreRegion(""); }}
              className="mt-2 text-xs text-teal-600 hover:underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patientsFiltres.map((p) => (
            <PatientCard
              key={p.id}
              nom={`${p.prenom} ${p.nom}`}
              region={p.region}
              age={calculerAge(p.dateNaissance)}
              sexe={p.sexe as "M" | "F"}
            />
          ))}
        </div>
      )}
    </div>
  );
}