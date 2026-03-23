<!--
  SortBar — Barre de tri et compteur de résultats

  Affiche le nombre de produits trouvés et les options de tri :
  Nouveautés, Prix croissant, Prix décroissant, Notes.
-->
<script>
	import { themeColors } from '$lib/stores/theme.js';
	import { sortBy, filteredProducts } from '$lib/stores/filters.js';
	import { CI_GREEN } from '$lib/utils/colors.js';

	const colors = $derived($themeColors);
	const activeSort = $derived($sortBy);
	const count = $derived($filteredProducts.length);

	/** Options de tri disponibles */
	const sortOptions = [
		{ key: 'newest', label: 'Nouveautés' },
		{ key: 'price_asc', label: 'Prix ↑' },
		{ key: 'price_desc', label: 'Prix ↓' },
		{ key: 'rating', label: 'Notes' }
	];

	/** Change le critère de tri */
	function setSort(key) {
		sortBy.set(key);
	}
</script>

<div class="sort-bar">
	<span class="result-count" style="color: {colors.textSecondary};">
		{count} produit{count > 1 ? 's' : ''}
	</span>

	<div class="sort-options">
		{#each sortOptions as option}
			<button
				class="sort-btn"
				class:active={activeSort === option.key}
				style="
					border-color: {activeSort === option.key ? 'transparent' : colors.border};
					background: {activeSort === option.key ? `${CI_GREEN}15` : 'transparent'};
					color: {activeSort === option.key ? CI_GREEN : colors.textDim};
				"
				onclick={() => setSort(option.key)}
			>
				{option.label}
			</button>
		{/each}
	</div>
</div>

<style>
	.sort-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.result-count {
		font-size: 13px;
	}

	.sort-options {
		display: flex;
		gap: 4px;
	}

	.sort-btn {
		padding: 6px 12px;
		border-radius: 6px;
		cursor: pointer;
		border: 1px solid;
		font-size: 10px;
		font-weight: 500;
		font-family: 'DM Sans', sans-serif;
	}

	/* === Responsive — Empiler les éléments sur mobile === */
	@media (max-width: 640px) {
		/* Empiler le compteur et les options de tri */
		.sort-bar {
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
		}

		/* Options de tri en scroll horizontal */
		.sort-options {
			width: 100%;
			overflow-x: auto;
			-ms-overflow-style: none;
			scrollbar-width: none;
		}

		.sort-options::-webkit-scrollbar {
			display: none;
		}

		/* Boutons de tri avec taille tactile suffisante */
		.sort-btn {
			min-height: 36px;
			padding: 6px 14px;
			flex-shrink: 0;
		}
	}
</style>
