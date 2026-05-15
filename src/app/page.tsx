"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import ConsultationCard from "@/components/ConsultationCard";
import AlerteIA from "@/components/AlerteIA";

export default function Home() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/stats").then(r => r.json()).then(setStats);
  }, []);

  const heure = new Date().getHours();
  const salutation = heure < 12 ? "Bonjour" : heure < 18 ? "Bon après-midi" : "Bonsoir";

  return (
    <div className="space-y-8">

      {/* Salutation */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 text-white">
        <p className="text-teal-200 text-sm">{salutation} 👋</p>
        <h1 className="text-2xl font-bold mt-1">{session?.user?.name || "Agent de santé"}</h1>
        <p className="text-teal-200 text-sm mt-1">Voici un résumé de l'activité SénSanté aujourd'hui.</p>
      </div>

      {/* KPI */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Vue d'ensemble</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            titre="Patients"
            valeur={stats?.kpi?.totalPatients ?? 0}
            unite="enregistrés"
            couleur="border-teal-500"
          />
          <StatCard
            titre="Consultations"
            valeur={stats?.kpi?.totalConsultations ?? 0}
            unite="au total"
            couleur="border-orange-500"
          />
          <StatCard
            titre="Alertes IA"
            valeur={stats?.kpi?.alertesUrgentes ?? 0}
            unite="urgentes"
            couleur="border-red-500"
          />
        </div>
      </div>

      {/* Dernière consultation + Alerte IA */}
      {stats?.dernieresAlertes?.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Dernière consultation</h2>
            <Link href="/consultations" className="text-sm text-teal-600 hover:underline">
              Voir tout →
            </Link>
          </div>
          <ConsultationCard
            patient={stats.dernieresAlertes[0].patient}
            date={new Date(stats.dernieresAlertes[0].date).toLocaleDateString("fr-FR")}
            symptomes="Voir détails"
            statut="termine"
          />
          {stats.dernieresAlertes[0].diagnostic && (
            <div className="mt-4">
              <AlerteIA
                diagnostic={stats.dernieresAlertes[0].diagnostic}
                confiance={stats.dernieresAlertes[0].confiance ?? 0}
                niveau={
                  (stats.dernieresAlertes[0].confiance ?? 0) >= 75
                    ? "urgent"
                    : (stats.dernieresAlertes[0].confiance ?? 0) >= 50
                    ? "moyen"
                    : "faible"
                }
              />
            </div>
          )}
        </div>
      )}

      {/* Raccourcis */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Accès rapide</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Nouveau patient", href: "/patients", color: "bg-teal-50 text-teal-700 border-teal-200", icon: "👤" },
            { label: "Nouvelle consultation", href: "/consultations", color: "bg-orange-50 text-orange-700 border-orange-200", icon: "📋" },
            { label: "Dashboard", href: "/dashboard", color: "bg-purple-50 text-purple-700 border-purple-200", icon: "📊" },
            { label: "Mon profil", href: "/profil", color: "bg-gray-50 text-gray-700 border-gray-200", icon: "⚙️" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border ${item.color} hover:shadow-md transition text-sm font-medium text-center`}
            >
              <span className="text-2xl">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}