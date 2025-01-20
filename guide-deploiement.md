# Guide de déploiement d'une application React avec PostgreSQL sous Linux (Docker, Docker Compose, Traefik)

## Table des matières

- [Introduction](#introduction)
- [Contexte](#contexte)
- [Objectifs pédagogiques](#objectifs-p%C3%A9dagogiques)
- [Prérequis](#pr%C3%A9requis)
- [Préparation du serveur](#pr%C3%A9paration-du-serveur)
- [Configuration de Docker et Docker Compose](#configuration-de-docker-et-docker-compose)
- [Déploiement avec Docker Compose](#d%C3%A9ploiement-avec-docker-compose)
- [Configuration de Traefik](#configuration-de-traefik)
- [Mise en production](#mise-en-production)
- [Sécurisation](#s%C3%A9curisation)
- [Résolution des problèmes](#r%C3%A9solution-des-probl%C3%A8mes)
- [Maintenance](#maintenance)
- [Conclusion](#conclusion)
- [Références](#r%C3%A9f%C3%A9rences)

---

## Introduction

L'objectif de ce guide est de déployer une application web composée de :

- Un frontend React
- Un backend Node.js (Express + Prisma)
- Une base de données PostgreSQL

Le tout orchestré avec **Docker Compose** et sécurisé avec **Traefik** comme reverse proxy.

---

## Contexte

Dans le cadre de votre formation, vous êtes chargé de rédiger un guide détaillé pour la mise en production d’une application web React avec PostgreSQL, déployée sur un serveur Linux. Ce guide est destiné aux administrateurs système et aux développeurs.

---

## Objectifs pédagogiques

- Comprendre et appliquer les étapes nécessaires à la mise en production d’une application React avec PostgreSQL.
- Maîtriser les bonnes pratiques de sécurité et d’optimisation pour un environnement de production.

---

## Prérequis

### Matériel recommandé

- **CPU** : 4 cœurs
- **RAM** : 8 Go
- **Stockage** : 100 Go SSD
- **OS** : Ubuntu 20.04 LTS ou supérieur

### Logiciels nécessaires

- Docker 24+
- Docker Compose 2.20+
- Certbot (si vous ne configurez pas automatiquement le SSL via Traefik)

---

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

5. **Créer un utilisateur Docker** (facultatif) :
   ```bash
   sudo usermod -aG docker $USER
   ```

---

## Configuration de Docker et Docker Compose

### Structure des fichiers

Créez une arborescence comme suit :

```
/var/www/ilift
├── docker-compose.yml
├── traefik
│   ├── traefik.yml
│   ├── acme.json
├── frontend
│   └── Dockerfile
├── backend
│   └── Dockerfile
└── postgres
    └── init.sql
```

### Exemple de `docker-compose.yml`

```yaml
version: '3.9'

services:
  traefik:
    image: traefik:v2.10
    command:
      - '--api.insecure=false'
      - '--providers.docker=true'
      - '--entrypoints.web.address=:80'
      - '--entrypoints.websecure.address=:443'
      - '--certificatesresolvers.myresolver.acme.httpchallenge=true'
      - '--certificatesresolvers.myresolver.acme.httpchallenge.entrypoint=web'
      - '--certificatesresolvers.myresolver.acme.email=admin@votredomaine.com'
      - '--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json'
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
      - './traefik/acme.json:/letsencrypt/acme.json'
      - './traefik/traefik.yml:/traefik.yml'

  postgres:
    image: postgres:14
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
    environment:
      POSTGRES_USER: ilift
      POSTGRES_PASSWORD: votre_mot_de_passe
      POSTGRES_DB: ilift
    networks:
      - iliftnet

  backend:
    build:
      context: ./backend
    environment:
      DATABASE_URL: 'postgresql://ilift:votre_mot_de_passe@postgres:5432/ilift'
    depends_on:
      - postgres
    networks:
      - iliftnet
    labels:
      - 'traefik.http.routers.backend.rule=Host(`api.votredomaine.com`)'
      - 'traefik.http.services.backend.loadbalancer.server.port=3000'

  frontend:
    build:
      context: ./frontend
    networks:
      - iliftnet
    labels:
      - 'traefik.http.routers.frontend.rule=Host(`votredomaine.com`)'
      - 'traefik.http.services.frontend.loadbalancer.server.port=80'

volumes:
  postgres_data:
networks:
  iliftnet:
```

### Dockerfile pour le Frontend

```dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
```

### Dockerfile pour le Backend

```dockerfile
FROM node:18
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

---

## Configuration de Traefik

### Fichier `traefik.yml`

```yaml
api:
  dashboard: true
entryPoints:
  web:
    address: ':80'
  websecure:
    address: ':443'
certificatesResolvers:
  myresolver:
    acme:
      email: 'admin@votredomaine.com'
      storage: '/letsencrypt/acme.json'
      httpChallenge:
        entryPoint: web
```

### Fichier `acme.json`

```bash
touch traefik/acme.json
chmod 600 traefik/acme.json
```

---

## Mise en production

1. Lancer l'application :

   ```bash
   docker compose up -d
   ```

2. Vérifier les conteneurs :

   ```bash
   docker ps
   ```

3. Accéder au tableau de bord Traefik :
   - URL : `http://votredomaine.com:8080/dashboard`

---

## Sécurisation

- **SSL** : Automatisé avec Traefik.
- **Fichiers sensibles** :
  ```bash
  chmod 600 backend/.env
  chmod 600 postgres/init.sql
  ```

---

## Résolution des problèmes

---

## Maintenance

1. **Mettre à jour les images** :

   ```bash
   docker compose pull
   docker compose up -d
   ```

2. **Sauvegarder la base de données** :
   ```bash
   docker exec -t postgres pg_dump ilift > backup.sql
   ```

---

## Conclusion

Ce guide récapitule toutes les étapes de déploiement : de la préparation du serveur à la configuration de Docker, Traefik et PostgreSQL, en passant par la sécurisation et la maintenance. Assurez-vous de tenir votre système à jour et de respecter les bonnes pratiques pour garantir la pérennité de votre application.

---

## Références

- [Documentation Docker](https://docs.docker.com/)
- [Documentation Traefik](https://doc.traefik.io/traefik/)
- [Certbot](https://certbot.eff.org/)

---

```

```
