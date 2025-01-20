# Étape 1 : Construction de l'application
FROM node:20-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

# Installation des dépendances
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copie du code source
COPY . .

# Génération des fichiers Prisma
RUN pnpm prisma generate

# Étape 2 : Exécution en production
FROM node:20-alpine

WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis le builder
COPY --from=builder /app /app

# Exposer le port
EXPOSE 4000

# Commande de démarrage
CMD ["pnpm", "start"]
