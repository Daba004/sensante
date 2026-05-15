interface PatientCardProps {
  nom: string;
  region: string;
  age: number;
  sexe: "M" | "F";
}

export default function PatientCard({ nom, region, age, sexe }: PatientCardProps) {
  const initiales = nom.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition group">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
          sexe === "F" ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"
        }`}>
          {initiales}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-gray-800 truncate">{nom}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
              sexe === "F" ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"
            }`}>
              {sexe === "F" ? "Femme" : "Homme"}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {region}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {age} ans
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}