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
# installs fnm (Fast Node Manager)
curl -fsSL https://fnm.vercel.app/install | bash

# activate fnm
source ~/.bashrc

# download and install Node.js
fnm use --install-if-missing 22

# verifies the right Node.js version is in the environment
node -v # should print `v22.12.0`

# verifies the right npm version is in the environment
npm -v # should print `10.9.0
```

### Installation de PNPM

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### Installation de PostgreSQL

```bash
sudo apt install -y postgresql-common
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
```

### Installation de Nginx

```bash
sudo apt install nginx
```

### Installation de Git

```bash
apt-get install git
```

### Configuration du pare-feu

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### Configuration des ports

```bash
# Vérifier les ports utilisés
sudo ss -tulpn

# Ouvrir les ports nécessaires dans le pare-feu
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp  # Pour l'API
sudo ufw allow 5432/tcp  # Pour PostgreSQL (uniquement si accès externe nécessaire)
```

### Clonage des dépôts

```bash
# Créer le répertoire de l'application
sudo mkdir -p /var/www/ilift
sudo chown -R $USER:$USER /var/www/ilift
cd /var/www/ilift

# Cloner les dépôts
git clone https://github.com/votre-org/ilift-frontend.git frontend
git clone https://github.com/votre-org/ilift-backend.git backend

# Configuration des branches
cd frontend
git checkout main  # ou votre branche de production
cd ../backend
git checkout main  # ou votre branche de production
```

## Configuration de PostgreSQL

### Création de l'utilisateur et de la base

```bash
sudo -u postgres psql

CREATE USER ilift WITH PASSWORD 'yourpwd';
CREATE DATABASE ilift OWNER ilift;
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

### Configuration du port PostgreSQL

```bash
sudo nano /etc/postgresql/14/main/postgresql.conf
```

Modifications recommandées:

```conf
# Ajouter ou modifier ces lignes
listen_addresses = 'localhost'  # par défaut pour la sécurité
port = 5432                    # port par défaut
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

### Configuration du port de l'API

Dans le fichier `.env` du backend, ajoutez:

```javascript
PORT=3000  # Port pour l'API
```

### Installation et démarrage

```bash
pnpm install
pnpm prisma migrate deploy
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
