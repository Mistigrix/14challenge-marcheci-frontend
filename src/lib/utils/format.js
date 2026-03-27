/**
 * Utilitaires de formatage pour MarchéCI
 *
 * Gère le formatage des prix en Francs CFA
 * et le rendu des étoiles pour les notes produit.
 */

/**
 * Formate un prix pour l'affichage.
 * Accepte un nombre ou une chaîne (format API : "51.77").
 * @param {number|string} amount - Montant à formater
 * @param {string} [currency='XOF'] - Code devise (ex: "XOF", "EUR")
 * @returns {string} Montant formaté (ex: "2 500 F")
 */
export function formatPrice(amount, currency = 'XOF') {
	const num = typeof amount === 'string' ? parseFloat(amount) : amount;
	if (isNaN(num)) return '—';

	const symbols = { GBP: '£', EUR: '€', USD: '$', XOF: 'F' };
	const symbol = symbols[currency] || currency;

	// Format avec 2 décimales pour les devises internationales
	if (currency === 'XOF') {
		return num.toLocaleString('fr-FR') + ' F';
	}
	return symbol + num.toFixed(2);
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
