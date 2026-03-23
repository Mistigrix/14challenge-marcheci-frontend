<!--
  Stars — Affichage d'une note sous forme d'étoiles
  Avec le nombre d'avis entre parenthèses.

  Props :
  - rating : note sur 5
  - reviewsCount : nombre d'avis (optionnel)
-->
<script>
	import { renderStars } from '$lib/utils/format.js';
	import { CI_ORANGE } from '$lib/utils/colors.js';
	import { themeColors } from '$lib/stores/theme.js';

	/** @type {number} Note sur 5 */
	let { rating, reviewsCount = null } = $props();

	const colors = $derived($themeColors);
	const starsText = $derived(renderStars(rating));
</script>

<div class="stars-container">
	<span class="stars" style="color: {CI_ORANGE};">{starsText}</span>
	{#if reviewsCount !== null}
		<span class="count" style="color: {colors.textSecondary};">({reviewsCount})</span>
	{/if}
</div>

<style>
	.stars-container {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.stars {
		font-size: 11px;
	}

	.count {
		font-size: 10px;
	}
</style>
