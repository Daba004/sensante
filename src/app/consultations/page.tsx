"use client";
import DiagnosticIA from "@/components/DiagnosticIA";
import { useEffect, useState } from "react";
import ConsultationForm from "@/components/ConsultationForm";

interface Consultation {
  id: number;
  date: string;
  symptomes: string[];
  diagnosticIa: string | null;
  confiance: number | null;
  statut: string;
  notes: string | null;
  patient: {
    nom: string;
    prenom: string;
    region: string;
  };
}

function SkeletonConsultation() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="h-4 bg-gray-200 rounded w-40 mb-2" />
          <div className="h-3 bg-gray-100 rounded w-28" />
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-20" />
      </div>
      <div className="flex gap-2">
        <div className="h-5 bg-gray-100 rounded-full w-16" />
        <div className="h-5 bg-gray-100 rounded-full w-20" />
        <div className="h-5 bg-gray-100 rounded-full w-14" />
      </div>
    </div>
  );
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtreStatut, setFiltreStatut] = useState<"" | "en_attente" | "termine">("");
  const [recherche, setRecherche] = useState("");

  async function charger() {
    const res = await fetch("/api/consultations");
    if (res.status === 401) {
      window.location.href = "/login";
      return;
    }
    const data = await res.json();
    setConsultations(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { charger(); }, []);

  const consultationsFiltrees = consultations.filter((c) => {
    const statutOk = filtreStatut === "" || c.statut === filtreStatut;
    const texteOk = `${c.patient.prenom} ${c.patient.nom} ${c.patient.region}`
      .toLowerCase()
      .includes(recherche.toLowerCase());
    return statutOk && texteOk;
  });

  const nbAttente = consultations.filter((c) => c.statut === "en_attente").length;
  const nbTermine = consultations.filter((c) => c.statut === "termine").length;
  const hasFilters = filtreStatut || recherche;

  // Vérifie si consultation du jour
  function estAujourdhui(date: string) {
    const today = new Date().toDateString();
    return new Date(date).toDateString() === today;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Consultations</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
          {consultations.length} consultation{consultations.length > 1 ? "s" : ""}
        </span>
      </div>

      <ConsultationForm onSuccess={charger} />

      {/* Stats rapides */}
      {!loading && consultations.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
            <p className="text-2xl font-bold text-gray-800">{consultations.length}</p>
            <p className="text-xs text-gray-500 mt-0.5">Total</p>
          </div>
          <div className="bg-yellow-50 rounded-xl border border-yellow-100 p-3 text-center">
            <p className="text-2xl font-bold text-yellow-700">{nbAttente}</p>
            <p className="text-xs text-yellow-600 mt-0.5">En attente</p>
          </div>
          <div className="bg-green-50 rounded-xl border border-green-100 p-3 text-center">
            <p className="text-2xl font-bold text-green-700">{nbTermine}</p>
            <p className="text-xs text-green-600 mt-0.5">Terminées</p>
          </div>
        </div>
      )}

      {/* Recherche + Filtres */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
        {/* Recherche */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Rechercher par patient ou région..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm text-gray-800 placeholder-gray-400 bg-white"
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

        {/* Filtres statut */}
        <div className="flex gap-2 flex-wrap">
          {[
            { label: "Toutes", value: "" },
            { label: "⏳ En attente", value: "en_attente" },
            { label: "✓ Terminées", value: "termine" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltreStatut(f.value as "" | "en_attente" | "termine")}
              className={`text-sm px-4 py-1.5 rounded-xl border font-medium transition ${
                filtreStatut === f.value
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {f.label}
            </button>
          ))}

          {hasFilters && (
            <button
              onClick={() => { setRecherche(""); setFiltreStatut(""); }}
              className="text-sm text-red-500 hover:text-red-700 border border-red-200 bg-red-50 rounded-xl px-3 py-1.5 transition"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Historique */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">Historique</h2>
        {hasFilters && (
          <span className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
            {consultationsFiltrees.length} résultat{consultationsFiltrees.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Liste */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <SkeletonConsultation key={i} />)}
        </div>
      ) : consultationsFiltrees.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400 bg-white rounded-2xl border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-sm font-medium">
            {hasFilters ? "Aucun résultat pour ces filtres" : "Aucune consultation enregistrée"}
          </p>
          {hasFilters && (
            <button
              onClick={() => { setRecherche(""); setFiltreStatut(""); }}
              className="mt-2 text-xs text-orange-500 hover:underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {consultationsFiltrees.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-800">
                        {c.patient.prenom} {c.patient.nom}
                      </h3>
                      {estAujourdhui(c.date) && (
                        <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">
                          Aujourd'hui
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {c.patient.region} — {new Date(c.date).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  c.statut === "termine"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {c.statut === "termine" ? "✓ Terminé" : "⏳ En attente"}
                </span>
              </div>

              {/* Symptômes */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {c.symptomes.map((s, i) => (
                  <span key={i} className="bg-orange-50 text-orange-700 text-xs px-2.5 py-1 rounded-full border border-orange-100">
                    {s}
                  </span>
                ))}
              </div>

              {/* Notes */}
              {c.notes && (
                <p className="text-sm text-gray-500 mt-3 italic bg-gray-50 px-3 py-2 rounded-lg">
                  {c.notes}
                </p>
              )}

              <DiagnosticIA
                consultationId={c.id}
                diagnosticExistant={c.diagnosticIa}
                confianceExistante={c.confiance}
                onDiagnostic={charger}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}