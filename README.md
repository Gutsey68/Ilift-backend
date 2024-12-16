# Ilift Backend

<embed src="./seyzeriat_gauthier_mcd_mld_api.pdf" type="application/pdf" width="100%" height="100%" />

## Prérequis

- Node.js
- pnpm ou npm

## Installation

1. Clonez le dépôt :

Dans le même répertoir que le frontend

```bash
git clone https://github.com/Gutsey68/CDA-Ilift-backend.git
```

2. Accédez au répertoire du projet :

```bash
cd Ilift/backend
```

3. Installez les dépendances :

```bash
pnpm install
```

4. Créez la base de données :

Créer la base de donnée postgresql

5. Créez un fichier `.env` à la racine du projet et remplissez-le avec les variables d'environnement nécessaires.

```env
DATABASE_URL="postgresql://[user]:[password]@localhost:5432/[database]?schema=public"
JWT_SECRET=yourjwtsecret
```

6. Exécutez les migrations Prisma :

```bash
pnpm run prisma migrate dev
```

7. Remplissez la base de données avec le fichier data.sql présent dans le repo

Vous pouvez vous connecter avec l'utilisateur test:

-Pseudo: John
-Mot de passe: test

## Lancer le projet

1. Démarrez le serveur de développement :

```bash
pnpm run dev
```

2. Le serveur sera accessible à l'adresse suivante :

```
http://localhost:3000
```

## Scripts pnpm

- `pnpm start` : Démarre le serveur de développement
- `pnpm test` : Exécute les tests unitaires
- `pnpm run build` : Compile le projet pour la production
- `pnpm run prisma migrate dev` : Exécute les migrations Prisma
