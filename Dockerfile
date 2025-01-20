FROM node:20-alpine

WORKDIR /app
RUN npm install -g pnpm

# Installation des dépendances
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copie et configuration de l'application
COPY . .
RUN pnpm prisma generate

EXPOSE 4000
CMD ["pnpm", "start"]