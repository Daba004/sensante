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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Tableau de bord
      </h1>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          titre="Patients"
          valeur={stats.kpi.totalPatients}
          unite="enregistrés"
          couleur="border-teal-500"
        />
        <StatCard
          titre="Consultations"
          valeur={stats.kpi.totalConsultations}
          unite="total"
          couleur="border-orange-500"
        />
        <StatCard
          titre="Terminées"
          valeur={stats.kpi.consultationsTerminees}
          unite=""
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* BAR CHART */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">
            Consultations par mois
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.parMois}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#E65100" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">
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
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">
          Derniers diagnostics IA
        </h2>

        <div className="space-y-3">
          {stats.dernieresAlertes.map((a) => (
            <div key={a.id} className="p-3 bg-gray-50 rounded">
              <p className="font-semibold">{a.patient}</p>
              <p className="text-sm text-gray-500">
                {a.region} —{" "}
                {new Date(a.date).toLocaleDateString()}
              </p>
              <p className="text-sm">
                {a.diagnostic?.slice(0, 80)}...
              </p>
              <p className="text-xs text-gray-500">
                Confiance: {a.confiance}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}