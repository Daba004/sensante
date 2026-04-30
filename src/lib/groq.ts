// Intégration Groq API — sera implémentée dans le Lab IA (v0.5)
// Ce fichier prépare la structure pour l'appel à Llama 3

export const GROQ_MODEL = "llama-3.1-8b-instant";

// Format attendu :
// symptomes: string[] -> ex: ["Fièvre", "Toux", "Fatigue"]
// response: { diagnostic: string, confiance: number, niveau: string }
