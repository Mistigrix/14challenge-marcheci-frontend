/**
 * Store des filtres, recherche et produits (côté serveur)
 *
 * Gère la catégorie sélectionnée, la barre de recherche,
 * le tri et la pagination. Les produits sont récupérés
 * depuis l'API Django à chaque changement de filtre.
 */

import { writable, derived, get } from 'svelte/store';
import { fetchProducts, fetchCategories } from '$lib/api/client.js';

/** Catégorie actuellement sélectionnée (slug, "all" par défaut) */
export const selectedCategory = writable('all');

/** Texte de recherche saisi par l'utilisateur */
export const searchQuery = writable('');

/** Critère de tri actif */
export const sortBy = writable('newest');

/** Page courante */
export const currentPage = writable(1);

/** Liste des produits retournés par l'API */
export const products = writable([]);

/** Nombre total de produits (pour la pagination) */
export const totalCount = writable(0);

/** URL de la page suivante (null si dernière page) */
export const nextPage = writable(null);

/** URL de la page précédente (null si première page) */
export const previousPage = writable(null);

/** État de chargement */
export const loading = writable(false);

/** Message d'erreur éventuel */
export const error = writable(null);

/** Liste des catégories récupérées depuis l'API */
export const categories = writable([]);

/**
 * Correspondance entre les clés de tri UI et les paramètres API.
 * L'API accepte : price, -price, rating, -rating, scraped_at, -scraped_at, title
 */
const SORT_MAP = {
	newest: '-scraped_at',
	price_asc: 'price',
	price_desc: '-price',
	rating: '-rating'
};

/**
 * Charge les produits depuis l'API selon les filtres actuels.
 * Appelée à chaque changement de filtre, tri ou page.
 */
export async function loadProducts() {
	loading.set(true);
	error.set(null);

	const category = get(selectedCategory);
	const search = get(searchQuery);
	const sort = get(sortBy);
	const page = get(currentPage);

	try {
		const params = {
			ordering: SORT_MAP[sort] || '-scraped_at',
			page
		};

		// Filtre par catégorie (sauf "all")
		if (category !== 'all') {
			params.category = category;
		}

		// Recherche textuelle
		if (search.trim()) {
			params.search = search.trim();
		}

		const data = await fetchProducts(params);

		products.set(data.results);
		totalCount.set(data.count);
		nextPage.set(data.next);
		previousPage.set(data.previous);
	} catch (err) {
		console.error('Erreur chargement produits:', err);
		error.set(err.message);
		products.set([]);
		totalCount.set(0);
	} finally {
		loading.set(false);
	}
}

/**
 * Charge les catégories depuis l'API.
 * Ajoute l'option "Tous" en tête de liste.
 */
export async function loadCategories() {
	try {
		const data = await fetchCategories();
		categories.set([
			{ id: 'all', name: 'Tous', slug: 'all' },
			...data.results
		]);
	} catch (err) {
		console.error('Erreur chargement catégories:', err);
		// Fallback : juste "Tous"
		categories.set([{ id: 'all', name: 'Tous', slug: 'all' }]);
	}
}

/**
 * Nombre total de pages (20 produits par page).
 */
export const totalPages = derived(totalCount, ($count) =>
	Math.ceil($count / 20)
);

/**
 * Change la catégorie et recharge les produits depuis la page 1.
 * @param {string} slug - Slug de la catégorie ("all" pour toutes)
 */
export function selectCategory(slug) {
	selectedCategory.set(slug);
	currentPage.set(1);
	loadProducts();
}

/**
 * Lance une recherche et recharge les produits depuis la page 1.
 * @param {string} query - Texte de recherche
 */
export function applySearch(query) {
	searchQuery.set(query);
	currentPage.set(1);
	loadProducts();
}

/**
 * Change le critère de tri et recharge les produits.
 * @param {string} key - Clé de tri (newest, price_asc, price_desc, rating)
 */
export function applySort(key) {
	sortBy.set(key);
	currentPage.set(1);
	loadProducts();
}

/**
 * Change la page courante et recharge les produits.
 * @param {number} page - Numéro de page
 */
export function goToPage(page) {
	currentPage.set(page);
	loadProducts();
}
