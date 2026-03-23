/**
 * Données fictives des produits MarchéCI
 *
 * Catalogue de produits ivoiriens répartis en 5 catégories :
 * Mode, Alimentation, Artisanat, Beauté, Bijoux.
 *
 * Ces données seront remplacées par des appels API Django
 * une fois le backend connecté (GET /api/products).
 */

/** @typedef {Object} Product
 * @property {number} id - Identifiant unique
 * @property {string} name - Nom du produit
 * @property {string} description - Description détaillée
 * @property {number} price - Prix actuel en FCFA
 * @property {number|null} originalPrice - Prix avant promo (null si pas de promo)
 * @property {string} category - Catégorie du produit
 * @property {number} rating - Note moyenne (1-5)
 * @property {number} reviewsCount - Nombre d'avis
 * @property {number} stock - Quantité en stock
 * @property {string|null} badge - Badge : "promo", "new", "bestseller" ou null
 */

/** @type {Product[]} */
export const products = [
	{
		id: 1,
		name: 'Pagne Baoulé traditionnel',
		description:
			"Pagne tissé à la main par les artisans baoulé. Motifs géométriques authentiques, coton 100% local. Idéal pour les cérémonies et événements culturels.",
		price: 25000,
		originalPrice: 35000,
		category: 'Mode',
		rating: 4.8,
		reviewsCount: 124,
		stock: 15,
		badge: 'promo'
	},
	{
		id: 2,
		name: 'Attiéké déshydraté premium',
		description:
			"Attiéké de qualité supérieure, préparé selon la méthode traditionnelle des femmes d'Abidjan. Prêt en 5 minutes.",
		price: 3500,
		originalPrice: null,
		category: 'Alimentation',
		rating: 4.6,
		reviewsCount: 89,
		stock: 200,
		badge: 'bestseller'
	},
	{
		id: 3,
		name: 'Djembé sculpté artisanal',
		description:
			'Djembé fabriqué à la main en bois de Iroko avec peau de chèvre. Son authentique et puissant. Hauteur 60cm.',
		price: 45000,
		originalPrice: null,
		category: 'Artisanat',
		rating: 4.9,
		reviewsCount: 56,
		stock: 8,
		badge: null
	},
	{
		id: 4,
		name: 'Beurre de karité pur',
		description:
			"Beurre de karité 100% naturel du Nord de la Côte d'Ivoire. Non raffiné, idéal pour la peau et les cheveux.",
		price: 5000,
		originalPrice: 7500,
		category: 'Beauté',
		rating: 4.7,
		reviewsCount: 203,
		stock: 150,
		badge: 'promo'
	},
	{
		id: 5,
		name: 'Café de Man torréfié',
		description:
			'Café arabica de la région de Man, torréfié artisanalement. Notes de cacao et fruits rouges.',
		price: 8000,
		originalPrice: null,
		category: 'Alimentation',
		rating: 4.5,
		reviewsCount: 67,
		stock: 80,
		badge: 'new'
	},
	{
		id: 6,
		name: 'Masque Dan en bois',
		description:
			"Masque traditionnel Dan sculpté à la main. Pièce unique décorative, bois d'ébène.",
		price: 75000,
		originalPrice: null,
		category: 'Artisanat',
		rating: 5.0,
		reviewsCount: 12,
		stock: 3,
		badge: null
	},
	{
		id: 7,
		name: "Bracelet en or Akan",
		description:
			"Bracelet inspiré des poids à peser l'or Akan. Plaqué or 18 carats, design géométrique.",
		price: 35000,
		originalPrice: 42000,
		category: 'Bijoux',
		rating: 4.4,
		reviewsCount: 38,
		stock: 25,
		badge: 'promo'
	},
	{
		id: 8,
		name: 'Sauce graine en conserve',
		description:
			"Sauce graine traditionnelle prête à l'emploi. Recette authentique du Sud-Ouest ivoirien.",
		price: 2500,
		originalPrice: null,
		category: 'Alimentation',
		rating: 4.3,
		reviewsCount: 145,
		stock: 300,
		badge: 'bestseller'
	},
	{
		id: 9,
		name: 'Chemise en Faso Dan Fani',
		description:
			'Chemise homme coupe moderne en tissu Faso Dan Fani. Coton tissé main, teinture végétale.',
		price: 18000,
		originalPrice: null,
		category: 'Mode',
		rating: 4.6,
		reviewsCount: 42,
		stock: 20,
		badge: 'new'
	},
	{
		id: 10,
		name: 'Huile de coco vierge bio',
		description:
			'Huile de coco extra vierge pressée à froid. Production artisanale de Grand-Lahou.',
		price: 4500,
		originalPrice: 6000,
		category: 'Beauté',
		rating: 4.8,
		reviewsCount: 178,
		stock: 100,
		badge: 'promo'
	},
	{
		id: 11,
		name: 'Statuette Sénoufo',
		description:
			"Statuette traditionnelle Sénoufo en bois. Art sacré du Nord de la Côte d'Ivoire.",
		price: 55000,
		originalPrice: null,
		category: 'Artisanat',
		rating: 4.9,
		reviewsCount: 19,
		stock: 5,
		badge: null
	},
	{
		id: 12,
		name: 'Sac en raphia tressé',
		description:
			'Sac à main en raphia tressé naturel. Fait main par les artisanes de Bouaké.',
		price: 12000,
		originalPrice: 15000,
		category: 'Mode',
		rating: 4.5,
		reviewsCount: 93,
		stock: 35,
		badge: 'promo'
	}
];

/**
 * Catégories de produits avec icônes et compteurs.
 * La catégorie "all" affiche tous les produits.
 */
export const categories = [
	{ id: 'all', name: 'Tous', icon: '🏪' },
	{ id: 'Mode', name: 'Mode', icon: '👗' },
	{ id: 'Alimentation', name: 'Alimentation', icon: '🍽️' },
	{ id: 'Artisanat', name: 'Artisanat', icon: '🎭' },
	{ id: 'Beauté', name: 'Beauté', icon: '✨' },
	{ id: 'Bijoux', name: 'Bijoux', icon: '💍' }
];

/**
 * Calcule le nombre de produits par catégorie.
 * @param {string} categoryId - Identifiant de la catégorie
 * @returns {number} Nombre de produits dans cette catégorie
 */
export function getProductsCount(categoryId) {
	if (categoryId === 'all') return products.length;
	return products.filter((p) => p.category === categoryId).length;
}

/**
 * Retrouve un produit par son identifiant.
 * @param {number} id - Identifiant du produit
 * @returns {Product|undefined}
 */
export function getProductById(id) {
	return products.find((p) => p.id === Number(id));
}

/**
 * Retrouve les produits similaires (même catégorie, hors produit courant).
 * @param {Product} product - Produit de référence
 * @param {number} limit - Nombre max de résultats
 * @returns {Product[]}
 */
export function getRelatedProducts(product, limit = 4) {
	return products
		.filter((p) => p.category === product.category && p.id !== product.id)
		.slice(0, limit);
}
