"use client";

import { useState, useEffect } from "react";

interface Patient {
  id: number;
  nom: string;
  prenom: string;
  region: string;
}

const SYMPTOMES_DISPONIBLES = [
  "Fièvre", "Toux", "Maux de tête",
  "Fatigue", "Diarrhée", "Vomissements",
  "Douleur abdominale", "Éruption cutanée",
  "Frissons", "Douleur thoracique",
  "Essoufflement", "Vertiges",
];

export default function ConsultationForm({ onSuccess }: { onSuccess: () => void }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [symptomes, setSymptomes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/patients").then((res) => res.json()).then(setPatients);
  }, []);

  function toggleSymptome(s: string) {
    setSymptomes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (symptomes.length === 0) {
      alert("Cochez au moins un symptôme.");
      return;
    }
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;
    const res = await fetch("/api/consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId: Number(formData.get("patientId")),
        symptomes,
        notes: formData.get("notes"),
      }),
    });
    if (res.ok) {
      setSymptomes([]);
      form.reset();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onSuccess();
    }
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-800">Nouvelle consultation</h3>
      </div>

      {success && (
        <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 p-3 rounded-xl mb-5 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Consultation enregistrée avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Patient */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Patient *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <select
              name="patientId"
              required
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm text-gray-800 bg-white"
            >
              <option value="">Sélectionner un patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.prenom} {p.nom} — {p.region}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Symptômes */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Symptômes *</label>
            {symptomes.length > 0 && (
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                {symptomes.length} sélectionné{symptomes.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {SYMPTOMES_DISPONIBLES.map((s) => {
              const selected = symptomes.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSymptome(s)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-sm font-medium transition-all ${
                    selected
                      ? "bg-orange-50 border-orange-400 text-orange-700"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    selected ? "bg-orange-500 border-orange-500" : "border-gray-300"
                  }`}>
                    {selected && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">
            Notes cliniques
            <span className="text-gray-400 font-normal ml-1">(optionnel)</span>
          </label>
          <textarea
            name="notes"
            rows={3}
            placeholder="Observations cliniques, contexte particulier..."
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm text-gray-800 placeholder-gray-400 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-xl hover:bg-orange-600 transition disabled:opacity-50 font-medium text-sm"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Enregistrement...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Enregistrer la consultation
            </>
          )}
        </button>
      </form>
    </div>
  );
}