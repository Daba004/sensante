"use client";
import { useSession } from "next-auth/react";

export default function ProfilPage() {
  const { data: session } = useSession();

  const initiales = session?.user?.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mon profil</h1>

      <div className="max-w-lg">
        {/* Carte profil */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">

          {/* Bandeau haut */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 h-24 relative">
            <div className="absolute -bottom-8 left-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-teal-100">
                <span className="text-xl font-bold text-teal-700">{initiales}</span>
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="pt-12 pb-6 px-6">
            <h2 className="text-xl font-bold text-gray-800">{session?.user?.name}</h2>
            <p className="text-teal-600 text-sm mt-0.5">{(session?.user as any)?.role || "Agent de santé"}</p>

            <div className="mt-6 space-y-4">

              {/* Email */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm font-medium text-gray-700">{session?.user?.email}</p>
                </div>
              </div>

              {/* Rôle */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Rôle</p>
                  <p className="text-sm font-medium text-gray-700">{(session?.user as any)?.role || "Agent de santé"}</p>
                </div>
              </div>

              {/* Badge application */}
              <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl border border-teal-100">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Application</p>
                  <p className="text-sm font-medium text-teal-700">SénSanté v1.0 — ESP/UCAD</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}