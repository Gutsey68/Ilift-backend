# Étape 1 : Construction de l'application
FROM node:20-alpine AS builder

WORKDIR /app
RUN apk add --no-cache openssl
RUN npm install -g pnpm

# Installation des dépendances
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copie du code source
COPY . .

# Génération des fichiers Prisma
RUN pnpm prisma generate

# Compilation du code TypeScript en JavaScript
RUN pnpm run build

# Étape 2 : Exécution en production
FROM node:20-alpine

WORKDIR /app

# Installer les dépendances nécessaires
RUN apk add --no-cache openssl postgresql-client
RUN npm install -g pnpm

# Copier uniquement les fichiers nécessaires depuis le builder
COPY --from=builder /app /app

# Exposer le port
EXPOSE 4000

# Nouvelle commande de démarrage
CMD ["pnpm", "start"]
