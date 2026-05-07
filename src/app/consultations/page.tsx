"use client";

import { useState, useEffect } from "react";
import DiagnosticIA from "@/components/DiagnosticIA";
import ConsultationCard from "@/components/ConsultationCard";

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState([]);

  async function charger() {
    const res = await fetch("/api/consultations");
    if (res.ok) {
      const data = await res.json();
      setConsultations(data);
    }
  }

  useEffect(() => {
    charger();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Consultations
      </h1>
      <div className="space-y-4">
        {consultations.map((c: any) => (
          <div key={c.id}>
            <ConsultationCard
              patient={`${c.patient.prenom} ${c.patient.nom}`}
              date={c.createdAt}
              symptomes={c.symptomes.join(", ")}
              statut={c.statut}
            />
            <DiagnosticIA
              consultationId={c.id}
              diagnosticExistant={c.diagnosticIa}
              confianceExistante={c.confiance}
              onDiagnostic={charger}
            />
          </div>
        ))}
      </div>
    </div>
  );
}