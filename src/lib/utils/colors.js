/**
 * Couleurs et thème de MarchéCI
 *
 * Les couleurs principales reprennent le drapeau ivoirien :
 * - Orange (CI_ORANGE) : couleur d'accent principale
 * - Vert (CI_GREEN) : couleur secondaire / succès
 * - Blanc : fond clair
 */

// === Couleurs du drapeau CI ===
export const CI_ORANGE = '#FF8C00';
export const CI_GREEN = '#009E49';

/**
 * Génère un dégradé unique basé sur le nom d'un produit.
 * Utilisé comme placeholder visuel pour les images produit.
 * @param {string} name - Nom du produit
 * @returns {string} Valeur CSS linear-gradient
 */
export function getCoverGradient(name) {
	const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
	const hue = hash % 360;
	return `linear-gradient(135deg, hsl(${hue}, 50%, 40%), hsl(${(hue + 30) % 360}, 40%, 30%))`;
}

/**
 * Retourne les initiales d'un nom (2 lettres max).
 * @param {string} name - Nom complet
 * @returns {string} Initiales en majuscules
 */
export function getInitials(name) {
	return name
		.split(' ')
		.map((word) => word[0])
		.slice(0, 2)
		.join('')
		.toUpperCase();
}

/**
 * Palette de couleurs pour les badges produit.
 * @param {string|null} badge - Type de badge (promo, new, bestseller)
 * @returns {string} Couleur hexadécimale
 */
export function getBadgeColor(badge) {
	const colors = {
		promo: '#E53E3E',
		new: CI_GREEN,
		bestseller: CI_ORANGE
	};
	return colors[badge] || '#CCC';
}

/**
 * Tokens de thème clair et sombre.
 * Chaque propriété retourne la valeur adaptée au mode.
 */
export const themes = {
	light: {
		bg: '#F8F6F2',
		card: '#FFFFFF',
		border: '#E5E2DC',
		textPrimary: '#1A1A1A',
		textSecondary: '#888',
		textDim: '#CCC',
		inputBg: '#F0EDE6',
		hoverBg: '#F5F3EE'
	},
	dark: {
		bg: '#0B0B10',
		card: '#1A1A22',
		border: '#2A2A35',
		textPrimary: '#F0EDE6',
		textSecondary: '#777',
		textDim: '#444',
		inputBg: '#111116',
		hoverBg: '#22222C'
	}
};
