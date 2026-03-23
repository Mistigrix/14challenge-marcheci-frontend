<!--
  CategoryFilter — Barre de filtrage par catégorie

  Affiche les catégories sous forme de boutons horizontaux
  avec icône et compteur de produits.
-->
<script>
	import { themeColors } from '$lib/stores/theme.js';
	import { selectedCategory } from '$lib/stores/filters.js';
	import { categories, getProductsCount } from '$lib/data/products.js';
	import { CI_ORANGE } from '$lib/utils/colors.js';

	const colors = $derived($themeColors);
	const active = $derived($selectedCategory);

	/** Sélectionne une catégorie */
	function selectCategory(id) {
		selectedCategory.set(id);
	}
</script>

<div class="categories">
	{#each categories as cat}
		<button
			class="category-btn"
			class:active={active === cat.id}
			style="
				border-color: {active === cat.id ? 'transparent' : colors.border};
				background: {active === cat.id ? `linear-gradient(135deg, ${CI_ORANGE}, #FFa040)` : 'transparent'};
				color: {active === cat.id ? '#FFF' : colors.textSecondary};
			"
			onclick={() => selectCategory(cat.id)}
		>
			<span class="cat-icon">{cat.icon}</span>
			{cat.name}
			<span
				class="cat-count"
				style="
					background: {active === cat.id ? 'rgba(255,255,255,0.25)' : `${colors.textDim}30`};
					color: {active === cat.id ? '#FFF' : colors.textDim};
				"
			>
				{getProductsCount(cat.id)}
			</span>
		</button>
	{/each}
</div>

<style>
	.categories {
		display: flex;
		gap: 8px;
		margin-bottom: 20px;
		overflow-x: auto;
	}

	.category-btn {
		padding: 10px 20px;
		border-radius: 12px;
		cursor: pointer;
		flex-shrink: 0;
		border: 1px solid;
		font-size: 12px;
		font-weight: 500;
		font-family: 'DM Sans', sans-serif;
		display: flex;
		align-items: center;
		gap: 6px;
		transition: all 0.2s;
	}

	.cat-icon {
		font-size: 15px;
	}

	.cat-count {
		font-size: 10px;
		padding: 1px 6px;
		border-radius: 4px;
	}

	/* === Responsive — Amélioration du scroll horizontal sur mobile === */
	@media (max-width: 768px) {
		.categories {
			/* Masquer la scrollbar pour un aspect plus propre */
			-ms-overflow-style: none;
			scrollbar-width: none;
			padding-bottom: 4px;
		}

		.categories::-webkit-scrollbar {
			display: none;
		}
	}

	@media (max-width: 640px) {
		.category-btn {
			/* Boutons plus compacts sur mobile mais tactiles */
			padding: 8px 14px;
			font-size: 11px;
			min-height: 44px;
		}

		.cat-icon {
			font-size: 14px;
		}
	}
</style>
