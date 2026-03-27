# MarchéCI

**Le marché de Côte d'Ivoire** — Vitrine en ligne des produits du marché ivoirien : fruits, légumes, viandes, poissons, épices, hygiène et plus encore.

Inspiré des grands marchés d'Abidjan (Adjamé, Treichville, Marcory). Les données sont scrappées depuis [lemarcheci.com](https://lemarcheci.com) et servies par une API Django.

> Challenge 14-14-14 · Mars 2026

## Fonctionnalités

- Catalogue de **364 produits** répartis en **16 catégories**
- Filtres par catégorie, recherche textuelle et tri (prix, notes, nouveautés)
- Pagination côté serveur (20 produits par page)
- Page produit détaillée avec produits similaires
- Panier avec lien d'achat vers le site du vendeur (lemarcheci.com)
- Mode sombre / clair
- Design responsive (mobile, tablette, desktop)
- Images et prix réels en Francs CFA (XOF)

## Stack technique

| Frontend | Backend | API |
|----------|---------|-----|
| Svelte 5 + SvelteKit 2 | Django (Python) | REST API publique |

- **API** : `https://api.marcheci.chalenge14.com`
- **Endpoints** : `/api/products/`, `/api/products/:id/`, `/api/categories/`
- **Données** : scrappées depuis lemarcheci.com (364 produits, 16 catégories)

## Installation

```bash
# Prérequis : Node.js 20+
nvm use 20

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## Autres commandes

```bash
npm run build      # Build de production
npm run preview    # Prévisualiser le build
```

## Docker

```bash
# Build de l'image (l'URL API est configurable via --build-arg)
docker build -t marcheci .

# Lancer le conteneur
docker run -p 3000:3000 marcheci
```

## Architecture

```
src/
├── lib/
│   ├── api/            # Client API (fetch produits, catégories)
│   ├── stores/         # Stores Svelte (cart, theme, filters)
│   ├── utils/          # Utilitaires (couleurs, formatage FCFA)
│   └── components/
│       ├── ui/         # Composants réutilisables (FlagBar, Stars, Loader...)
│       ├── layout/     # Navigation et Footer
│       ├── cart/       # Sidebar panier et items
│       └── products/   # Carte produit, filtres, tri
├── routes/
│   ├── +page.svelte              # Catalogue (accueil)
│   ├── product/[id]/+page.svelte # Détail produit
│   └── about/+page.svelte        # À propos
└── app.css                        # Styles globaux
```

## Équipe

| Nom | Rôle |
|-----|------|
| **Bath Dorgelès** | Chef de projet & Front-end |
| **Oclin Marcel Coulibaly** | Dev Front-end (Svelte) |
| **Rayane Irié** | Back-end (Django) |

## Licence

Open Source — [225os.com](https://225os.com)
