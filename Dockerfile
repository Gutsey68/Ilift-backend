# Étape 1 : Build
FROM node:20-buster AS builder
WORKDIR /app

# Installation des dépendances
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN apt-get update && apt-get install -y python3 make g++
RUN pnpm install

# Copie du code source
COPY . .

# Génération des fichiers Prisma
RUN pnpm prisma generate

# Compilation du code TypeScript en JavaScript
RUN pnpm run build

# Étape 2 : Exécution en production
FROM node:20-buster
WORKDIR /app

# Installer les dépendances nécessaires
RUN apt-get update && apt-get install -y openssl postgresql-client
RUN npm install -g pnpm

# Copier uniquement les fichiers nécessaires depuis le builder
COPY --from=builder /app /app

# 🔹 Supprimer bcrypt et le réinstaller proprement
RUN pnpm uninstall bcrypt && pnpm add bcrypt

# Exposer le port
EXPOSE 4000

# Nouvelle commande de démarrage
CMD ["pnpm", "start"]
