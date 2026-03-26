/**
 * Client API MarchéCI
 *
 * Centralise les appels vers l'API REST Django.
 * Base URL : https://api.marcheci.chalenge14.com
 *
 * Endpoints utilisés :
 * - GET /api/products/       → liste paginée avec filtres, recherche, tri
 * - GET /api/products/:id/   → détail d'un produit
 * - GET /api/categories/     → liste des catégories
 */

/**
 * URL de base de l'API.
 * - Dev : vide → passe par le proxy Vite (contourne le CORS)
 * - Prod : définie via VITE_API_URL au build (ou fallback sur l'URL par défaut)
 */
const BASE_URL = import.meta.env.DEV
	? ''
	: (import.meta.env.VITE_API_URL || 'https://api.marcheci.chalenge14.com');

/**
 * Effectue un appel GET vers l'API et retourne le JSON.
 * @param {string} endpoint - Chemin relatif (ex: "/api/products/")
 * @param {Record<string, string>} [params] - Paramètres query string
 * @returns {Promise<any>} Réponse JSON
 * @throws {Error} En cas d'erreur réseau ou de réponse non-OK
 */
async function apiGet(endpoint, params = {}) {
	const url = new URL(endpoint, BASE_URL || window.location.origin);

	// Ajout des paramètres de requête non vides
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== '') {
			url.searchParams.set(key, String(value));
		}
	});

	const response = await fetch(url.toString(), {
		headers: { 'Accept': 'application/json' }
	});

	if (!response.ok) {
		throw new Error(`API ${response.status}: ${response.statusText}`);
	}

	return response.json();
}

/**
 * Récupère la liste paginée des produits avec filtres optionnels.
 *
 * @param {Object} [options] - Options de filtrage, tri et pagination
 * @param {string} [options.category] - Slug de la catégorie
 * @param {string} [options.search] - Recherche textuelle (title + description)
 * @param {string} [options.ordering] - Tri : price, -price, rating, -rating, scraped_at, -scraped_at, title
 * @param {number} [options.page] - Numéro de page (20 résultats par page)
 * @param {number} [options.min_price] - Prix minimum
 * @param {number} [options.max_price] - Prix maximum
 * @param {boolean} [options.in_stock] - Filtrer par disponibilité
 * @returns {Promise<{count: number, next: string|null, previous: string|null, results: Array}>}
 */
export async function fetchProducts(options = {}) {
	const params = {};

	if (options.category) params.category = options.category;
	if (options.search) params.search = options.search;
	if (options.ordering) params.ordering = options.ordering;
	if (options.page) params.page = String(options.page);
	if (options.min_price) params.min_price = String(options.min_price);
	if (options.max_price) params.max_price = String(options.max_price);
	if (options.in_stock !== undefined) params.in_stock = String(options.in_stock);

	return apiGet('/api/products/', params);
}

/**
 * Récupère le détail complet d'un produit par son identifiant.
 *
 * @param {number|string} id - Identifiant du produit
 * @returns {Promise<Object>} Produit détaillé (inclut description, category objet, etc.)
 */
export async function fetchProductById(id) {
	return apiGet(`/api/products/${id}/`);
}

/**
 * Récupère la liste de toutes les catégories.
 *
 * @returns {Promise<{count: number, results: Array<{id: number, name: string, slug: string}>}>}
 */
export async function fetchCategories() {
	return apiGet('/api/categories/');
}
