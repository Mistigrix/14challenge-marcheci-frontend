<!--
  CategoryFilter — Barre de filtrage par catégorie

  Affiche les catégories récupérées depuis l'API sous forme
  de boutons horizontaux scrollables.
-->
<script>
	import { themeColors } from '$lib/stores/theme.js';
	import { selectedCategory, categories, selectCategory } from '$lib/stores/filters.js';
	import { CI_ORANGE } from '$lib/utils/colors.js';

	const colors = $derived($themeColors);
	const active = $derived($selectedCategory);
	const cats = $derived($categories);
</script>

<div class="categories">
	{#each cats as cat}
		<button
			class="category-btn"
			class:active={active === cat.slug}
			style="
				border-color: {active === cat.slug ? 'transparent' : colors.border};
				background: {active === cat.slug ? `linear-gradient(135deg, ${CI_ORANGE}, #FFa040)` : 'transparent'};
				color: {active === cat.slug ? '#FFF' : colors.textSecondary};
			"
			onclick={() => selectCategory(cat.slug)}
		>
			{cat.name}
		</button>
	{/each}
</div>

<style>
	.categories {
		display: flex;
		gap: 8px;
		margin-bottom: 20px;
		overflow-x: auto;
		flex-wrap: wrap;
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

	/* === Responsive === */
	@media (max-width: 768px) {
		.categories {
			-ms-overflow-style: none;
			scrollbar-width: none;
			padding-bottom: 4px;
			flex-wrap: nowrap;
		}

		.categories::-webkit-scrollbar {
			display: none;
		}
	}

	@media (max-width: 640px) {
		.category-btn {
			padding: 8px 14px;
			font-size: 11px;
			min-height: 44px;
		}
	}
</style>
