# ILift - Backend API

Application backend pour la plateforme sociale de fitness ILift, permettant aux utilisateurs de suivre leurs
entraînements et partager leurs progrès.

## Technologies Utilisées

- Node.js avec TypeScript
- Express.js pour l'API REST
- Prisma comme ORM
- PostgreSQL comme base de données
- JWT pour l'authentification
- Multer pour la gestion des uploads
- Zod pour la validation des données

## Structure du Projet

```
backend/
├── src/
│   ├── config/          # Configuration (env, sécurité)
│   ├── controllers/     # Contrôleurs de routes
│   ├── database/        # Configuration Prisma
│   ├── errors/          # Gestion des erreurs
│   ├── middlewares/     # Middlewares (auth, upload)
│   ├── routes/          # Définition des routes
│   ├── services/        # Logique métier
│   ├── types/           # Types TypeScript
│   ├── utils/           # Utilitaires
│   ├── validators/      # Schémas de validation
│   ├── server.ts        # Configuration du serveur
│   └── index.ts         # Point d'entrée
├── prisma/
│   ├── schema.prisma    # Schéma de base de données
│   └── seed.ts          # Données de test
└── uploads/             # Dossier des fichiers uploadés
└── bruno/               # Collection de tests API et documentation des endpoints
```

## Prérequis

- Node.js 18+
- PNPM (gestionnaire de paquets recommandé)
  ```bash
  npm install -g pnpm
  ```
- PostgreSQL

## Fonctionnalités Principales

- Authentification JWT avec refresh tokens
- Gestion des utilisateurs et profils
- Gestion des programmes d'entraînement
- Publication de posts avec images
- Système de likes et commentaires
- Système de suivi entre utilisateurs
- Gestion des exercices et résultats
- Système de notifications

## Installation

1. Cloner le projet

```bash
git clone https://github.com/Gutsey68/CDA-Ilift-backend.git
cd backend
```

2. Installer les dépendances avec PNPM

```bash
pnpm install
```

3. Configurer l'environnement

```bash
cp .env.example .env
# Modifier les variables dans .env selon votre configuration
```

4. Initialiser la base de données

```bash
npx prisma generate
npx prisma migrate dev
npm run seed
```

## Scripts Disponibles

- `npm run dev` : Lance le serveur en mode développement
- `npm run build` : Compile le projet TypeScript
- `npm run serve` : Lance le serveur compilé
- `npm run seed` : Remplit la base de données avec des données de test
- `npm start` : Lance le serveur en production
- `npm run start:prod` : Lance le serveur en production avec NODE_ENV=production

## Sécurité

L'application implémente plusieurs mesures de sécurité :

- Protection CORS
- Rate limiting
- Validation des données
- Protection XSS via Helmet
- Compression des réponses
- Gestion sécurisée des fichiers

## Documentation API

Le fichier [seyzeriat_gauthier_mcd_mld_api.pdf](./seyzeriat_gauthier_mcd_mld_api.pdf) contient :

- Le Modèle Conceptuel de Données (MCD)
- Le Modèle Logique de Données (MLD)
- La documentation complète des routes API

## Variables d'Environnement Requises

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=7d
RESEND_API_KEY=your_resend_api_key
CLIENT_URL=http://localhost:5173
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
```

## Tests des Routes API

Le projet inclut une collection Bruno pour tester les routes API.

Les fichiers de test se trouvent dans le dossier `/bruno` et sont organisés par fonctionnalité :

- auth/
- users/
- programs/
- workouts/
- etc.

Pour utiliser Bruno :

1. Installer Bruno (https://www.usebruno.com/)
2. Ouvrir le dossier `/bruno` dans Bruno
3. Configurer les variables d'environnement dans Bruno
4. Exécuter les requêtes

## Déploiement

Un guide détaillé de déploiement est disponible dans le fichier [guide-deploiement.md](./guide-deploiement.md). Il
couvre :

- La préparation du serveur
- L'installation des dépendances nécessaires
- La configuration Docker et Docker Compose
- Le déploiement avec Nginx
- La maintenance et les sauvegardes

## Contribution

1. Créer une branche pour votre fonctionnalité
2. Commiter vos changements
3. Pousser vers la branche
4. Créer une Pull Request
