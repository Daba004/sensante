# Plan Dashboard — SénSanté (Pilote)

## 1. Objectif du dashboard

Le dashboard permet d’avoir une vue globale sur les patients enregistrés dans l’application SénSanté.

Il sert à afficher des informations importantes comme le nombre de patients, leur âge, leur sexe et leur région.

Ce tableau de bord aide les utilisateurs, notamment les médecins, à comprendre rapidement les données sans parcourir toute la liste des patients.

Il facilite aussi la prise de décision grâce à des statistiques simples et visuelles.

---

## 2. Statistiques principales

### Nombre total de patients

Afficher le nombre total de patients enregistrés dans la base de données.
Cela permet de suivre l’évolution de l’application.

### Répartition par sexe

Afficher le nombre d’hommes et de femmes.
Cela permet d’avoir une vue rapide sur la population.

### Répartition par région

Afficher combien de patients viennent de chaque région (Dakar, Thiès, etc.).
Cela permet d’identifier les zones les plus représentées.

### Répartition par âge

Classer les patients par tranches d’âge :

* 0 à 17 ans
* 18 à 59 ans
* 60 ans et plus

Cela permet d’analyser les différentes catégories d’âge.

---

## 3. Graphiques proposés

### Diagramme en barres

Utilisé pour afficher le nombre de patients par région.
Il permet de comparer facilement les différentes régions.

### Diagramme circulaire (camembert)

Utilisé pour montrer la répartition hommes/femmes.
Il permet de visualiser rapidement les proportions.

### Graphique en ligne (optionnel)

Permet de voir l’évolution du nombre de patients dans le temps.
Utile si on ajoute la date de création des patients.

---

## 4. Composants nécessaires

Pour construire le dashboard, on aura besoin de :

* StatCard : pour afficher les chiffres importants (ex : total patients)
* Graphiques : avec des bibliothèques comme Chart.js ou Recharts
* Liste ou tableau (optionnel)

---

## 5. Données nécessaires

Les données viendront de l’API suivante :

GET /api/patients

Les informations utilisées seront :

* nom
* prénom
* sexe
* date de naissance
* région

Ces données permettront de calculer les statistiques.

---

## 6. Améliorations futures

Dans le futur, on pourra améliorer le dashboard en ajoutant :

* Des filtres (par région, sexe, âge)
* Un export des données (PDF ou Excel)
* Des statistiques sur les consultations

---

## 7. Conclusion

Le dashboard est une partie importante de l’application.
Il permet de transformer les données des patients en informations utiles et faciles à comprendre.

Il sera développé après le CRUD et l’authentification.
