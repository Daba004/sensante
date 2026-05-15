"use client";
import { useState } from "react";

export default function PatientForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      nom: formData.get("nom"),
      prenom: formData.get("prenom"),
      dateNaissance: formData.get("dateNaissance"),
      sexe: formData.get("sexe"),
      telephone: formData.get("telephone"),
      adresse: formData.get("adresse"),
      region: formData.get("region"),
    };
    const res = await fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      (e.target as HTMLFormElement).reset();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onSuccess();
    }
    setLoading(false);
  }

  const regions = [
    "Dakar", "Thiès", "Saint-Louis", "Ziguinchor",
    "Tambacounda", "Kaolack", "Louga", "Fatick",
    "Kolda", "Matam", "Kaffrine", "Kédougou",
    "Sédhiou", "Diourbel",
  ];

  const inputClass = "w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-sm text-gray-800 placeholder-gray-400";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-800">Nouveau patient</h3>
      </div>

      {success && (
        <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 p-3 rounded-xl mb-4 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Patient enregistré avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Nom *</label>
            <input name="nom" placeholder="SENE" required className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Prénom *</label>
            <input name="prenom" placeholder="Daba" required className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Date de naissance *</label>
            <input name="dateNaissance" type="date" required className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Sexe *</label>
            <select name="sexe" required className={inputClass}>
              <option value="">Sélectionner</option>
              <option value="F">Femme</option>
              <option value="M">Homme</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Téléphone</label>
            <input name="telephone" placeholder="77 000 00 00" className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Région *</label>
            <select name="region" required className={inputClass}>
              <option value="">Sélectionner</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Adresse</label>
          <input name="adresse" placeholder="Quartier, ville..." className={inputClass} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2.5 rounded-xl hover:bg-teal-700 transition disabled:opacity-50 font-medium text-sm"
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
              Enregistrer
            </>
          )}
        </button>
      </form>
    </div>
  );
}