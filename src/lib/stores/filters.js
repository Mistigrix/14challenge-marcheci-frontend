/**
 * Store des filtres et de la recherche
 *
 * Gère la catégorie sélectionnée, la barre de recherche
 * et le tri des produits. Expose un store dérivé
 * `filteredProducts` qui retourne les produits filtrés et triés.
 */

import { writable, derived } from 'svelte/store';
import { products } from '$lib/data/products.js';

/** Catégorie actuellement sélectionnée ("all" par défaut) */
export const selectedCategory = writable('all');

/** Texte de recherche saisi par l'utilisateur */
export const searchQuery = writable('');

/** Critère de tri actif : newest, price_asc, price_desc, rating */
export const sortBy = writable('newest');

/**
 * Store dérivé — produits filtrés par catégorie et recherche,
 * puis triés selon le critère sélectionné.
 */
export const filteredProducts = derived(
	[selectedCategory, searchQuery, sortBy],
	([$category, $query, $sort]) => {
		let result = products;

		// Filtrage par catégorie
		if ($category !== 'all') {
			result = result.filter((p) => p.category === $category);
		}

		// Filtrage par recherche textuelle (insensible à la casse)
		if ($query) {
			const lowerQuery = $query.toLowerCase();
			result = result.filter((p) =>
				p.name.toLowerCase().includes(lowerQuery)
			);
		}

		// Tri selon le critère choisi
		result = [...result].sort((a, b) => {
			switch ($sort) {
				case 'price_asc':
					return a.price - b.price;
				case 'price_desc':
					return b.price - a.price;
				case 'rating':
					return b.rating - a.rating;
				default:
					// "newest" — tri par id décroissant
					return b.id - a.id;
			}
		});

		return result;
	}
);
