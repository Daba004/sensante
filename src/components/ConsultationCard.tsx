interface ConsultationCardProps {
  patient: string;
  date: string;
  symptomes: string;
  statut: "en_attente" | "termine";
}

export default function ConsultationCard({ patient, date, symptomes, statut }: ConsultationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{patient}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{date}</p>
          </div>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
          statut === "termine"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}>
          {statut === "termine" ? "✓ Terminé" : "⏳ En attente"}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {symptomes.split(",").map((s, i) => (
          <span key={i} className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full border border-orange-100">
            {s.trim()}
          </span>
        ))}
      </div>
    </div>
  );
}