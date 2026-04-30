# Format des données pour l'IA Groq

## Entrée (symptômes depuis la consultation)
```json
{
  "symptomes": ["Fièvre", "Toux", "Fatigue"]
}
```

## Sortie attendue de Groq
```json
{
  "diagnostic": "Suspicion de paludisme",
  "confiance": 78,
  "niveau": "urgent"
}
```

## Modèle utilisé
- llama-3.1-8b-instant via api.groq.com

## Route prévue
- src/app/api/ia/route.ts
