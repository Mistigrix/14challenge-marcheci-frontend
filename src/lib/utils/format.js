/**
 * Utilitaires de formatage pour MarchéCI
 *
 * Gère le formatage des prix en Francs CFA
 * et le rendu des étoiles pour les notes produit.
 */

/**
 * Formate un montant en Francs CFA (format ivoirien).
 * @param {number} amount - Montant à formater
 * @returns {string} Montant formaté (ex: "25 000 F")
 */
export function formatPrice(amount) {
	return amount.toLocaleString('fr-FR') + ' F';
}

/**
 * Génère une représentation textuelle d'une note en étoiles.
 * @param {number} rating - Note de 0 à 5
 * @returns {string} Chaîne d'étoiles (ex: "★★★★½☆")
 */
export function renderStars(rating) {
	const full = Math.floor(rating);
	const half = rating % 1 >= 0.5 ? '½' : '';
	const empty = '☆'.repeat(5 - Math.ceil(rating));
	return '★'.repeat(full) + half + empty;
}

/** Taux de TVA ivoirien (18%) */
export const TAX_RATE = 0.18;
