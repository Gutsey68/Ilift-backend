## Table des matières

- [Introduction](#introduction)
- [Prérequis](#pr%C3%A9requis)
- [Préparation du serveur](#pr%C3%A9paration-du-serveur)
- [Configuration de PostgreSQL](#configuration-de-postgresql)
- [Déploiement Frontend](#d%C3%A9ploiement-frontend)
- [Déploiement Backend](#d%C3%A9ploiement-backend)
- [Mise en production](#mise-en-production)
- [Sécurisation](#s%C3%A9curisation)
- [Dépannage](#d%C3%A9pannage)
- [Maintenance](#maintenance)
- [Références](#r%C3%A9f%C3%A9rences)

## Introduction

Cette application est un réseau social dédié aux passionnés de musculation permettant de :

- Partager des posts avec photos
- Enregistrer et suivre ses séances d'entraînement
- Suivre d'autres utilisateurs
- Créer et suivre des programmes d'entraînement

### Stack technique

- Frontend: React 18, Typescript, TailwindCSS, Tanstack Query
- Backend: Node.js, Express, Prisma
- Base de données: PostgreSQL

## Prérequis

### Matériel serveur recommandé

- CPU: 4 cœurs
- RAM: 8 Go
- Stockage: 100 Go SSD
- OS: Ubuntu 20.04 LTS

### Logiciels requis

- Node.js 18+
- PostgreSQL 14+
- Nginx
- Pare-feu
- Git

## Préparation du serveur

### Mise à jour du système

```bash
sudo apt update
sudo apt upgrade -y
```

### Installation de Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### Installation de PNPM

```bash
wget -qO- https://get.pnpm.io/install.sh | sh -
```

### Installation de PostgreSQL

```bash
sudo apt install postgresql postgresql-contrib
```

### Installation de Nginx

```bash
sudo apt install nginx
```

### Configuration du pare-feu

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Configuration de PostgreSQL

### Création de l'utilisateur et de la base

```bash
sudo -u postgres psql

CREATE USER gymapp WITH PASSWORD 'votre_mot_de_passe';
CREATE DATABASE gymapp_db OWNER gymapp;
\q
```

### Configuration PostgreSQL

```bash
sudo nano /etc/postgresql/14/main/postgresql.conf
```

Modifications recommandées:

```conf
max_connections = 100
shared_buffers = 512MB
work_mem = 6MB
```

## Déploiement Frontend

### Build de l'application

```bash
cd frontend
pnpm install
pnpm build
```

### Configuration Nginx

```bash
sudo nano /etc/nginx/sites-available/ilift
```

```nginx
server {
    listen 80;
    server_name votre-domaine.com;
    root /var/www/ilift/frontend/dist;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Déploiement Backend

### Configuration des variables d'environnement

```bash
cd backend
cp .env.example .env
```

Editez `.env`:

```javascript
DATABASE_URL = 'postgresql://gymapp:votre_mot_de_passe@localhost:5432/gymapp_db';
JWT_SECRET = 'votre_secret_jwt';
REFRESH_TOKEN_SECRET = 'votre_secret_refresh_jwt';
```

### Installation et démarrage

```bash
pnpm install
pnpx prisma migrate deploy
pnpm build
```

## Mise en production

### Configuration du reverse proxy Nginx

```bash
sudo ln -s /etc/nginx/sites-available/ilift /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL avec Certbot

```bash
sudo snap install certbot --classic
sudo certbot --nginx
```

## Sécurisation

### Sécurisation PostgreSQL

Editez `pg_hba.conf`:

```bash
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

```conf
# IPv4 local connections:
host    all             all             127.0.0.1/32            scram-sha-256
```

### Protection des fichiers sensibles

```bash
chmod 600 backend/.env
```

## Dépannage

### Problèmes courants

#### Le frontend ne se charge pas

- Vérifier les logs Nginx: `sudo nginx -t`
- Vérifier les permissions des fichiers: `ls -la /var/www/ilift`

#### L'API ne répond pas

- Vérifier les logs PM2: `pm2 logs`
- Vérifier la connexion DB: `nc -zv localhost 5432`

#### Erreurs de base de données

- Vérifier les logs PostgreSQL: `sudo tail -f /var/log/postgresql/postgresql-14-main.log`

## Maintenance

### Backups quotidiens

```bash
sudo -u postgres pg_dump gymapp_db > backup_$(date +%Y%m%d).sql
```

### Mises à jour

```bash
# Système
sudo apt update && sudo apt upgrade -y

# Application
cd /var/www/ilift
git pull
pnpm install
pnpm build
pm2 reload all
```

### Monitoring

```bash
# Surveiller les logs
pm2 logs

# Statut des services
systemctl status nginx
systemctl status postgresql
```

## Références

- [Documentation officielle de PostgreSQL](https://www.postgresql.org/docs/)
- [Documentation officielle de React](https://react.dev/)
- [Documentation officielle de Nginx](https://nginx.org/en/docs/)
- [Documentation de PM2](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)
- [Certbot - Guide de l'utilisateur](https://certbot.eff.org/docs/)
