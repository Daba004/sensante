interface AlerteIAProps {
  diagnostic: string;
  confiance: number;
  niveau: "faible" | "moyen" | "urgent";
}

export default function AlerteIA({ diagnostic, confiance, niveau }: AlerteIAProps) {
  const config = {
    faible: { bg: "bg-green-50", border: "border-green-400", badge: "bg-green-100 text-green-700", label: "FAIBLE" },
    moyen: { bg: "bg-orange-50", border: "border-orange-400", badge: "bg-orange-100 text-orange-700", label: "MOYEN" },
    urgent: { bg: "bg-red-50", border: "border-red-400", badge: "bg-red-100 text-red-700", label: "URGENT" },
  }[niveau];

  return (
    <div className={`rounded-xl border-l-4 ${config.border} ${config.bg} p-5`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="font-bold text-gray-800">Résultat IA</h3>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${config.badge}`}>
          {config.label}
        </span>
      </div>

      <p className="text-gray-700 text-sm">{diagnostic}</p>

      <div className="mt-3">
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs text-gray-500">Niveau de confiance</p>
          <p className="text-xs font-bold text-gray-700">{confiance}%</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full ${
              niveau === "urgent" ? "bg-red-500" : niveau === "moyen" ? "bg-orange-500" : "bg-green-500"
            }`}
            style={{ width: `${confiance}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-gray-400 italic mt-3 border-t border-gray-200 pt-2">
        ⚕️ Ceci n'est pas un diagnostic médical. Consultez un professionnel de santé.
      </p>
    </div>
  );
}