interface StatCardProps {
  titre: string;
  valeur: number;
  unite: string;
  couleur: string;
}

export default function StatCard({ titre, valeur, unite, couleur }: StatCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 border-t-4 ${couleur} hover:shadow-lg transition`}>
      <p className="text-sm font-medium text-gray-600">{titre}</p>
      <p className="text-4xl font-bold text-gray-900 mt-2">{valeur}</p>
      <p className="text-sm text-gray-500 mt-1">{unite}</p>
    </div>
  );
}