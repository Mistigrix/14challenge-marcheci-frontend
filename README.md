# MarchéCI 🇨🇮

**Le marché de Côte d'Ivoire** — Boutique en ligne dédiée aux produits ivoiriens : artisanat, mode, beauté et alimentation.

Inspiré des grands marchés d'Abidjan (Adjamé, Treichville, Marcory), symbole fort du commerce et de la vie quotidienne ivoirienne.

> Challenge 14-14-14 · Jour 11 · Mars 2026

## Fonctionnalités

- Catalogue de produits avec filtres par catégorie et recherche
- Tri par prix, notes ou nouveautés
- Page produit détaillée avec produits similaires
- Panier interactif (ajout, suppression, modification de quantité)
- Calcul automatique des totaux avec TVA ivoirienne (18%)
- Checkout en 3 étapes (adresse → paiement → confirmation)
- Paiement : Mobile Money (Orange, Wave, MTN), carte bancaire, paiement à la livraison
- Mode sombre / clair
- Design responsive (mobile, tablette, desktop)

## Stack technique

| Frontend | Backend (prévu) | Base de données |
|----------|----------------|-----------------|
| Svelte 5 + SvelteKit 2 | Django (Python) | SQLite / PostgreSQL |

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

## Architecture

```
src/
├── lib/
│   ├── data/           # Données produits et catégories
│   ├── stores/         # Stores Svelte (cart, theme, filters)
│   ├── utils/          # Utilitaires (couleurs, formatage)
│   └── components/
│       ├── ui/         # Composants réutilisables (FlagBar, InputField, Badge, Stars)
│       ├── layout/     # Navigation et Footer
│       ├── cart/       # Sidebar panier et items
│       └── products/   # Carte produit, filtres, tri
├── routes/
│   ├── +page.svelte              # Catalogue (accueil)
│   ├── product/[id]/+page.svelte # Détail produit
│   ├── checkout/+page.svelte     # Checkout 3 étapes
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

Open Source — [225os.com](https://225os.com) & [GitHub](https://github.com)
