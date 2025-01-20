Voici ton guide réécrit avec le bon fichier `docker-compose.yml` et l'ajout de l'installation de Git ainsi que les fichiers `Dockerfile` pour le frontend et le backend :

---

# Guide de déploiement - Application iLift

## Table des matières

- [Introduction](#introduction)
- [Prérequis](#prérequis)
- [Préparation du serveur](#préparation-du-serveur)
- [Préparation de l'environnement](#préparation-de-lenvironnement)
- [Configuration et Déploiement](#configuration-et-déploiement)
- [Maintenance](#maintenance)
- [Références](#références)

## Introduction

L'objectif de ce guide est de déployer une application web composée de :

- Un frontend React
- Un backend Node.js (Express + Prisma)
- Une base de données PostgreSQL
- Un reverse proxy Traefik avec SSL automatique

## Prérequis

### Serveur

- Ubuntu 20.04 LTS ou supérieur
- 4 cœurs CPU
- 8 Go RAM
- 100 Go SSD

### Logiciels nécessaires

- Docker 24+
- Docker Compose 2.20+
- Git
- Node.js 18+
- pnpm (gestionnaire de paquets)

## Préparation du serveur

1. **Mettre à jour le système** :

   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

2. **Installer Docker** :

   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   ```

3. **Installer Docker Compose** :

   ```bash
   sudo apt install docker-compose-plugin
   ```

4. **Vérifier les versions** :

   ```bash
   docker --version
   docker compose version
   ```

5. **Installer Git** :

   ```bash
   sudo apt install git
   ```

6. **Ajouter l'utilisateur actuel au groupe Docker** (facultatif) :

   ```bash
   sudo usermod -aG docker $USER
   ```

   Déconnectez-vous et reconnectez-vous pour appliquer les modifications.

## Préparation de l'environnement

1. **Configurer les variables d'environnement** :

   - Créez un fichier `.env` à partir de `.env.example` dans chaque service (backend, Traefik) et personnalisez les valeurs.

2. **Cloner les dépôts** :

   ```bash
   # Cloner le frontend
   git clone https://github.com/Gutsey68/CDA-Ilift-frontend.git /var/www/ilift/frontend

   # Cloner le backend
   git clone https://github.com/Gutsey68/CDA-Ilift-backend.git /var/www/ilift/backend
   ```

3. **Vérifier le fichier de données SQL** :

   Assurez-vous que le fichier `data.sql` est présent dans le dossier `/var/www/ilift/backend`.

## Configuration et Déploiement

1. **Préparer la structure des fichiers** :

   L'arborescence doit ressembler à ceci :

   ```
   /var/www/ilift
   ├── docker-compose.yml
   ├── acme.json
   ├── frontend
   │   └── Dockerfile
   ├── backend
   │   ├── Dockerfile
   │   └── data.sql
   ```

2. **Configurer le fichier `docker-compose.yml`** :

   Voici la configuration mise à jour de `docker-compose.yml` pour Traefik, le backend, le frontend, et PostgreSQL :

   ```yaml
   version: '3.9'

   services:
     traefik:
       image: traefik:v2.10
       container_name: traefik
       command:
         - '--api.dashboard=true'
         - '--providers.docker=true'
         - '--entrypoints.web.address=:80'
         - '--entrypoints.websecure.address=:443'
         - '--certificatesresolvers.letsencrypt.acme.email=${ACME_EMAIL}'
         - '--certificatesresolvers.letsencrypt.acme.storage=/acme.json'
       ports:
         - '80:80'
         - '443:443'
       volumes:
         - '/var/run/docker.sock:/var/run/docker.sock:ro'
         - './acme.json:/acme.json'
       networks:
         - proxy

     frontend:
       build:
         context: ./frontend
       labels:
         - 'traefik.enable=true'
         - 'traefik.http.routers.frontend.rule=Host(`${DOMAIN}`)'
         - 'traefik.http.routers.frontend.entrypoints=websecure'
         - 'traefik.http.routers.frontend.tls.certresolver=letsencrypt'
       networks:
         - proxy
       depends_on:
         - backend

     backend:
       build:
         context: ./backend
       environment:
         - DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
       labels:
         - 'traefik.enable=true'
         - 'traefik.http.routers.backend.rule=PathPrefix(`/api`)'
         - 'traefik.http.routers.backend.entrypoints=websecure'
         - 'traefik.http.routers.backend.tls.certresolver=letsencrypt'
         - 'traefik.http.middlewares.backend-strip-prefix.stripprefix.prefixes=/api'
         - 'traefik.http.routers.backend.middlewares=backend-strip-prefix'
       networks:
         - proxy
         - internal
       depends_on:
         - db

     db:
       image: postgres:15-alpine
       environment:
         - POSTGRES_USER=${POSTGRES_USER}
         - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
         - POSTGRES_DB=${POSTGRES_DB}
       volumes:
         - postgres_data:/var/lib/postgresql/data
         - ./backend/data.sql:/docker-entrypoint-initdb.d/init.sql
       networks:
         - internal

   networks:
     proxy:
       driver: bridge
     internal:
       driver: bridge

   volumes:
     postgres_data:
       external: false
   ```

3. **Lancer l'application** :

   ```bash
   docker compose up -d
   ```

4. **Vérifier les conteneurs** :

   ```bash
   docker ps
   ```

5. **Accéder à l'application** :
   - Frontend : `https://votredomaine.com`
   - Backend : `https://votredomaine.com/api`

## Maintenance

1. **Mettre à jour les services** :

   ```bash
   docker compose pull
   docker compose up -d
   ```

2. **Sauvegarder la base de données** :

   ```bash
   docker exec -t db pg_dumpall -c -U postgres > backup.sql
   ```

3. **Restaurer la base de données** :

   ```bash
   cat backup.sql | docker exec -i db psql -U postgres
   ```

## Références

- [Documentation Docker](https://docs.docker.com/)
- [Documentation Traefik](https://doc.traefik.io/traefik/)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

---

## Dockerfiles

### Dockerfile pour le **frontend** (React)

```dockerfile
# Dockerfile pour le frontend React
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de l'application
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances
RUN npm install -g pnpm && pnpm install

# Copier le reste des fichiers
COPY . .

# Construire l'application
RUN pnpm build

# Exposer le port de l'application
EXPOSE 3000

# Démarrer l'application
CMD ["pnpm", "start"]
```

### Dockerfile pour le **backend** (Node.js avec Express et Prisma)

```dockerfile
# Dockerfile pour le backend Node.js
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de l'application
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances
RUN npm install -g pnpm && pnpm install

# Copier le reste des fichiers
COPY . .

# Construire Prisma
RUN pnpm prisma generate

# Exposer le port de l'API
EXPOSE 5000

# Démarrer l'application
CMD ["pnpm", "start"]
```

---
