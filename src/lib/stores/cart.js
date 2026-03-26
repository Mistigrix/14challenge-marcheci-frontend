/**
 * Store du panier d'achat
 *
 * Gère les articles du panier : ajout, suppression,
 * modification de quantité, et calculs des totaux (sous-total, TVA, TTC).
 */

import { writable, derived } from 'svelte/store';
import { TAX_RATE } from '$lib/utils/format.js';

/**
 * @typedef {Object} CartItem
 * @property {number} productId - Identifiant du produit
 * @property {string} name - Nom du produit (title depuis l'API)
 * @property {number} price - Prix unitaire
 * @property {string} currency - Devise (ex: "GBP")
 * @property {string} image_url - URL de l'image du produit
 * @property {number} quantity - Quantité dans le panier
 */

/** @type {import('svelte/store').Writable<CartItem[]>} */
export const cart = writable([]);

/** Contrôle la visibilité de la sidebar panier */
export const showCart = writable(false);

/**
 * Ajoute un produit au panier.
 * Si le produit est déjà présent, incrémente la quantité.
 * @param {Object} product - Produit à ajouter
 * @param {number} qty - Quantité à ajouter (défaut : 1)
 */
export function addToCart(product, qty = 1) {
	cart.update((items) => {
		const existing = items.find((item) => item.productId === product.id);

		if (existing) {
			// Incrémenter la quantité de l'article existant
			return items.map((item) =>
				item.productId === product.id
					? { ...item, quantity: item.quantity + qty }
					: item
			);
		}

		// Ajouter un nouvel article
		return [
			...items,
			{
				productId: product.id,
				name: product.title || product.name,
				price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
				currency: product.currency || 'GBP',
				image_url: product.image_url || '',
				quantity: qty
			}
		];
	});
}

/**
 * Supprime un article du panier par son productId.
 * @param {number} productId - Identifiant du produit à retirer
 */
export function removeFromCart(productId) {
	cart.update((items) => items.filter((item) => item.productId !== productId));
}

/**
 * Met à jour la quantité d'un article.
 * Si la quantité tombe à 0 ou moins, supprime l'article.
 * @param {number} productId - Identifiant du produit
 * @param {number} qty - Nouvelle quantité
 */
export function updateQuantity(productId, qty) {
	if (qty <= 0) {
		removeFromCart(productId);
		return;
	}
	cart.update((items) =>
		items.map((item) =>
			item.productId === productId ? { ...item, quantity: qty } : item
		)
	);
}

/** Vide entièrement le panier */
export function clearCart() {
	cart.set([]);
}

// === Stores dérivés pour les totaux ===

/** Nombre total d'articles dans le panier */
export const totalItems = derived(cart, ($cart) =>
	$cart.reduce((acc, item) => acc + item.quantity, 0)
);

/** Sous-total avant taxes */
export const subtotal = derived(cart, ($cart) =>
	$cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

/** Montant de la TVA (18%) */
export const tax = derived(subtotal, ($subtotal) =>
	Math.round($subtotal * TAX_RATE)
);

/** Total TTC (sous-total + TVA) */
export const totalPrice = derived(
	[subtotal, tax],
	([$subtotal, $tax]) => $subtotal + $tax
);
