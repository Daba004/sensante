"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  const initiales = session?.user?.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <header className="bg-white border-b border-gray-200 text-gray-800 px-6 py-3 flex items-center justify-between shadow-sm">
      {/* Logo gauche */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <span className="font-bold text-lg text-teal-700">SénSanté</span>
      </div>

      {/* Droite */}
      <div className="flex items-center gap-3">
        {session ? (
          <>
            {/* Nom + badge rôle */}
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">{session.user?.name}</p>
              <p className="text-xs text-teal-600">Agent de santé</p>
            </div>

            {/* Avatar initiales */}
            <div className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {initiales}
            </div>

            {/* Bouton déconnexion */}
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 text-sm bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 transition font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Déconnexion
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-sm bg-teal-600 text-white px-4 py-1.5 rounded-lg hover:bg-teal-700 transition font-medium"
          >
            Se connecter
          </Link>
        )}
      </div>
    </header>
  );
}