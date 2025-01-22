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
- Un reverse proxy Nginx

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

7. **Installer Certbot** :

   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

## Préparation de l'environnement

1. **Configurer les variables d'environnement** :

   - Créez un fichier `.env` à la racine. Il doit ressembler à ceci :

   ```properties
   POSTGRES_USER=
   DATABASE_URL=
   DOMAIN=
   ACME_EMAIL=
   JWT_SECRET=
   REFRESH_TOKEN_SECRET=
   JWT_EXPIRES_IN=
   REFRESH_TOKEN_EXPIRES_IN=
   CLIENT_URL=
   RESEND_API_KEY=
   PORT=
   NODE_ENV=
   UPLOAD_DIR=
   MAX_FILE_SIZE=
   ```

2. **Cloner les dépôts** :

   ```bash
   # Cloner le frontend
   git clone https://github.com/Gutsey68/CDA-Ilift-frontend.git /var/www/ilift/frontend

   # Cloner le backend
   git clone https://github.com/Gutsey68/CDA-Ilift-backend.git /var/www/ilift/backend
   ```

## Configuration et Déploiement

1. **Préparer la structure des fichiers** :

   Déplacez le fichier docker-compose.yml du dossier backend vers le dossier parent :

   ```bash
   mv /var/www/ilift/backend/docker-compose.yml /var/www/ilift/
   ```

   L'arborescence doit ressembler à ceci :

   ```
   /var/www/ilift
   ├── docker-compose.yml  # Déplacé depuis le dossier backend
   ├── acme.json
   ├── frontend
   │   └── Dockerfile
   ├── backend
   │   └── Dockerfile
   ```

2. **Configurer le fichier `docker-compose.yml`** :

   Voici la configuration mise à jour de `docker-compose.yml` pour Nginx, le backend, le frontend, et PostgreSQL :

   ```yaml
   services:
     frontend:
       build:
         context: ./frontend
       ports:
         - "80:80"
         - "443:443"
       volumes:
         - /etc/letsencrypt:/etc/letsencrypt:ro
         - uploads_data:/usr/share/nginx/uploads
       networks:
         - internal
       depends_on:
         - backend

     backend:
       build:
         context: ./backend
       environment:
         - DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
         - PORT=${PORT}
         - NODE_ENV=${NODE_ENV}
         - JWT_SECRET=${JWT_SECRET}
         - JWT_EXPIRES_IN=${JWT_EXPIRES_IN}
         - REFRESH_TOKEN_SECRET=${REFRESH_TOKEN_SECRET}
         - REFRESH_TOKEN_EXPIRES_IN=${REFRESH_TOKEN_EXPIRES_IN}
         - CLIENT_URL=${CLIENT_URL}
         - UPLOAD_DIR=${UPLOAD_DIR}
         - MAX_FILE_SIZE=${MAX_FILE_SIZE}
         - RESEND_API_KEY=${RESEND_API_KEY}
         - POSTGRES_USER=${POSTGRES_USER}
         - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
         - POSTGRES_DB=${POSTGRES_DB}
       networks:
         - internal
       depends_on:
         db:
           condition: service_healthy
       volumes:
         - uploads_data:/app/uploads

     db:
       image: postgres:17-alpine
       environment:
         - POSTGRES_USER=${POSTGRES_USER}
         - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
         - POSTGRES_DB=${POSTGRES_DB}
         - PGDATA=/var/lib/postgresql/data/pgdata
       volumes:
         - postgres_data:/var/lib/postgresql/data/pgdata
       networks:
         - internal
       healthcheck:
         test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
         interval: 5s
         timeout: 5s
         retries: 5
       restart: unless-stopped

   networks:
     internal:
       driver: bridge

   volumes:
     postgres_data:
     uploads_data:
   ```

3. **Obtenir un certificat SSL avec Certbot** :

   ```bash
   sudo certbot --nginx -d votredomaine.com
   ```

4. **Lancer l'application** :

   ```bash
   docker compose up -d
   ```

5. **Vérifier les conteneurs** :

   ```bash
   docker ps
   ```

6. **Accéder à l'application** :
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
- [Documentation Nginx](https://nginx.org/)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Certbot](https://certbot.eff.org/)

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
