FROM node:20-alpine

# Ajout d'un utilisateur non-root
USER node
WORKDIR /home/node/app

# Installation de pnpm
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
ENV PATH="/home/node/.local/bin:$PATH"

# Installation des dépendances
COPY --chown=node:node package*.json ./
RUN pnpm install

# Copie du code source et configuration
COPY --chown=node:node . .
RUN cp .env.example .env

# Génération du client Prisma
RUN pnpm prisma generate

EXPOSE 4000
CMD ["pnpm", "start"]