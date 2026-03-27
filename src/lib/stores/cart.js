/**
 * Store du panier
 *
 * Gère les produits ajoutés au panier.
 * Pas de système de commande — le panier sert de liste
 * avec lien vers le site source pour acheter.
 */

import { writable, derived } from 'svelte/store';

/**
 * @typedef {Object} CartItem
 * @property {number} productId - Identifiant du produit
 * @property {string} name - Nom du produit
 * @property {number} price - Prix unitaire
 * @property {string} currency - Devise (ex: "XOF")
 * @property {string} image_url - URL de l'image du produit
 * @property {string} product_url - Lien vers le site source pour acheter
 */

/** @type {import('svelte/store').Writable<CartItem[]>} */
export const cart = writable([]);

/** Contrôle la visibilité de la sidebar panier */
export const showCart = writable(false);

/**
 * Ajoute un produit au panier.
 * Si le produit est déjà présent, ne fait rien (pas de doublon).
 * @param {Object} product - Produit à ajouter
 */
export function addToCart(product) {
	cart.update((items) => {
		const existing = items.find((item) => item.productId === product.id);
		if (existing) return items;

		return [
			...items,
			{
				productId: product.id,
				name: product.title || product.name,
				price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
				currency: product.currency || 'XOF',
				image_url: product.image_url || '',
				product_url: product.product_url || ''
			}
		];
	});
}

/**
 * Supprime un produit du panier.
 * @param {number} productId - Identifiant du produit à retirer
 */
export function removeFromCart(productId) {
	cart.update((items) => items.filter((item) => item.productId !== productId));
}

/**
 * Vérifie si un produit est dans le panier.
 * @param {number} productId - Identifiant du produit
 * @returns {boolean}
 */
export function isInCart(productId) {
	let result = false;
	cart.subscribe((items) => {
		result = items.some((item) => item.productId === productId);
	})();
	return result;
}

/** Vide entièrement le panier */
export function clearCart() {
	cart.set([]);
}

/** Nombre total de produits dans le panier */
export const totalItems = derived(cart, ($cart) => $cart.length);
