<!--
  Badge — Étiquette visuelle sur les cartes produit
  Affiche "promo", "new" ou "bestseller" avec une couleur distincte.

  Props :
  - type : type de badge ("promo" | "new" | "bestseller")
-->
<script>
	import { getBadgeColor } from '$lib/utils/colors.js';

	/** @type {string} Type de badge */
	let { type } = $props();

	const color = $derived(getBadgeColor(type));
</script>

{#if type}
	<span class="badge" style="background: {color};">
		{type}
	</span>
{/if}

<style>
	.badge {
		position: absolute;
		top: 10px;
		left: 10px;
		font-size: 9px;
		font-weight: 700;
		padding: 4px 10px;
		border-radius: 6px;
		color: #FFF;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
</style>
