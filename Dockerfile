# === Étape 1 : Build de l'application ===
FROM node:20-alpine AS build

WORKDIR /app

# Copier les fichiers de dépendances en premier (cache Docker)
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste du code source
COPY . .

# URL de l'API Django injectée au build (accessible côté client via VITE_)
ARG VITE_API_URL=https://api.marcheci.chalenge14.com
ENV VITE_API_URL=$VITE_API_URL

# Build de production
RUN npm run build

# Supprimer les devDependencies pour alléger l'image
RUN npm prune --omit=dev

# === Étape 2 : Image de production légère ===
FROM node:20-alpine AS production

WORKDIR /app

# Copier uniquement le nécessaire depuis l'étape de build
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules

# Port exposé par le serveur
EXPOSE 3000

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000
ENV ORIGIN=https://marcheci.chalenge14.com

# Lancer le serveur Node
CMD ["node", "build"]
