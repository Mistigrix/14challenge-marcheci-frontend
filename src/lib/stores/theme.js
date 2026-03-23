/**
 * Store du thème (mode clair / sombre)
 *
 * Gère le basculement entre les modes et expose
 * les tokens de couleur réactifs via le store dérivé `themeColors`.
 */

import { writable, derived } from 'svelte/store';
import { themes } from '$lib/utils/colors.js';

/** État du mode sombre (false = clair par défaut) */
export const darkMode = writable(false);

/** Bascule entre mode clair et sombre */
export function toggleDarkMode() {
	darkMode.update((value) => !value);
}

/**
 * Store dérivé — retourne les tokens de couleur
 * adaptés au mode actif (light ou dark).
 */
export const themeColors = derived(darkMode, ($darkMode) => {
	return $darkMode ? themes.dark : themes.light;
});
