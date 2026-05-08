"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface Stats {
  kpi: {
    totalPatients: number;
    totalConsultations: number;
    consultationsTerminees: number;
    alertesUrgentes: number;
  };
  parRegion: { region: string; total: number }[];
  parMois: { mois: string; total: number }[];
  dernieresAlertes: {
    id: number;
    patient: string;
    region: string;
    diagnostic: string | null;
    confiance: number | null;
    date: string;
  }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">Chargement du dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">
        Tableau de bord
      </h1>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          titre="Patients"
          valeur={stats.kpi.totalPatients}
          unite="enregistrés"
          couleur="border-teal-500"
        />
        <StatCard
          titre="Consultations"
          valeur={stats.kpi.totalConsultations}
          unite="au total"
          couleur="border-orange-500"
        />
        <StatCard
          titre="Diagnostics IA"
          valeur={stats.kpi.consultationsTerminees}
          unite="terminés"
          couleur="border-purple-500"
        />
        <StatCard
          titre="Alertes"
          valeur={stats.kpi.alertesUrgentes}
          unite="urgentes"
          couleur="border-red-500"
        />
      </div>

      {/* GRAPHIQUES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Consultations par mois
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.parMois}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" tick={{ fill: "#4B5563" }} />
              <YAxis tick={{ fill: "#4B5563" }} />
              <Tooltip />
              <Bar dataKey="total" fill="#E65100" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Patients par région
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.parRegion}
                dataKey="total"
                nameKey="region"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {stats.parRegion.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ALERTES */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Derniers diagnostics IA
        </h2>
        <div className="space-y-3">
          {stats.dernieresAlertes.map((a) => (
            <div
              key={a.id}
              className="flex justify-between items-start p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition"
            >
              <div>
                <p className="font-semibold text-gray-800">{a.patient}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {a.region} — {new Date(a.date).toLocaleDateString("fr-FR")}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  {a.diagnostic?.slice(0, 80)}...
                </p>
              </div>
              <div className="text-right ml-4 shrink-0">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    (a.confiance ?? 0) >= 75
                      ? "bg-red-100 text-red-700"
                      : (a.confiance ?? 0) >= 50
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {a.confiance}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}