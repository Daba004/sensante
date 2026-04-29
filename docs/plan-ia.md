# Plan IA — Intégration Groq API

## Objectif
Intégrer Groq API (Llama 3) pour générer des pré-diagnostics à partir des symptômes saisis par l'agent de santé.

## Étapes prévues
1. Recevoir les symptômes depuis le formulaire de consultation
2. Envoyer une requête à l'API Groq avec les symptômes
3. Récupérer le diagnostic et le niveau de confiance
4. Afficher le résultat dans le composant AlerteIA

## Variables nécessaires
- GROQ_API_KEY : clé API obtenue sur https://console.groq.com

## Modèle utilisé
- Llama 3 (via Groq)

## Route prévue
- src/app/api/ia/route.ts
