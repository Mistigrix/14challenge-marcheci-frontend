<!--
  Page Catalogue (accueil) — Grille de produits avec filtres, tri et pagination

  Affiche :
  - Titre et sous-titre du marché
  - Filtres par catégorie (depuis l'API)
  - Barre de tri
  - Grille responsive de ProductCards
  - Pagination en bas de page
-->
<script>
	import { onMount } from 'svelte';
	import CategoryFilter from '$lib/components/products/CategoryFilter.svelte';
	import SortBar from '$lib/components/products/SortBar.svelte';
	import ProductCard from '$lib/components/products/ProductCard.svelte';
	import SkeletonCard from '$lib/components/ui/SkeletonCard.svelte';
	import { themeColors } from '$lib/stores/theme.js';
	import {
		products,
		loading,
		error,
		currentPage,
		totalPages,
		loadProducts,
		loadCategories,
		goToPage
	} from '$lib/stores/filters.js';
	import { CI_ORANGE } from '$lib/utils/colors.js';

	const colors = $derived($themeColors);
	const displayedProducts = $derived($products);
	const isLoading = $derived($loading);
	const errorMsg = $derived($error);
	const page = $derived($currentPage);
	const pages = $derived($totalPages);

	/** Chargement initial des catégories et produits */
	onMount(() => {
		loadCategories();
		loadProducts();
	});
</script>

<svelte:head>
	<title>MarchéCI — Boutique</title>
</svelte:head>

<div class="catalog">
	<!-- En-tête de la page -->
	<div class="catalog-header">
		<h1 class="catalog-title" style="color: {colors.textPrimary};">
			Le marché de <span style="color: {CI_ORANGE};">Côte d'Ivoire</span>
		</h1>
		<p class="catalog-subtitle" style="color: {colors.textSecondary};">
			Découvrez notre catalogue de produits
		</p>
	</div>

	<!-- Filtres par catégorie -->
	<CategoryFilter />

	<!-- Barre de tri et compteur -->
	<SortBar />

	<!-- Message d'erreur -->
	{#if errorMsg}
		<div class="error-msg">
			<p>Erreur : {errorMsg}</p>
			<button class="retry-btn" onclick={loadProducts}>Réessayer</button>
		</div>
	{/if}

	<!-- Grille de produits avec skeleton pendant le chargement -->
	{#if isLoading}
		<div class="product-grid">
			{#each Array(8) as _}
				<SkeletonCard />
			{/each}
		</div>
	{:else if displayedProducts.length === 0}
		<div class="empty-state" style="color: {colors.textSecondary};">
			<p>Aucun produit trouvé.</p>
		</div>
	{:else}
		<div class="product-grid">
			{#each displayedProducts as product (product.id)}
				<ProductCard {product} />
			{/each}
		</div>

		<!-- Pagination -->
		{#if pages > 1}
			<div class="pagination">
				<button
					class="page-btn"
					disabled={page <= 1}
					style="border-color: {colors.border}; color: {colors.textSecondary};"
					onclick={() => goToPage(page - 1)}
				>
					← Précédent
				</button>

				<span class="page-info" style="color: {colors.textSecondary};">
					Page {page} / {pages}
				</span>

				<button
					class="page-btn"
					disabled={page >= pages}
					style="border-color: {colors.border}; color: {colors.textSecondary};"
					onclick={() => goToPage(page + 1)}
				>
					Suivant →
				</button>
			</div>
		{/if}
	{/if}
</div>

<style>
	.catalog {
		max-width: 1200px;
		margin: 0 auto;
		padding: 28px 40px 60px;
	}

	.catalog-header {
		margin-bottom: 28px;
	}

	.catalog-title {
		font-size: 32px;
		font-weight: 800;
		margin: 0 0 6px;
		letter-spacing: -1px;
	}

	.catalog-subtitle {
		font-size: 14px;
		margin: 0;
	}

	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 16px;
	}

	/* Message d'erreur */
	.error-msg {
		text-align: center;
		padding: 24px;
		color: #E53E3E;
		font-size: 14px;
	}

	.retry-btn {
		margin-top: 8px;
		padding: 8px 20px;
		border-radius: 8px;
		border: 1px solid #E53E3E;
		background: transparent;
		color: #E53E3E;
		cursor: pointer;
		font-family: 'DM Sans', sans-serif;
		font-weight: 600;
	}

	/* État vide */
	.empty-state {
		text-align: center;
		padding: 40px;
		font-size: 14px;
	}

	/* Pagination */
	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 16px;
		margin-top: 32px;
		padding-top: 24px;
	}

	.page-btn {
		padding: 10px 20px;
		border-radius: 10px;
		border: 1px solid;
		background: transparent;
		cursor: pointer;
		font-size: 12px;
		font-weight: 600;
		font-family: 'DM Sans', sans-serif;
		transition: all 0.2s;
	}

	.page-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.page-btn:hover:not(:disabled) {
		background: rgba(255, 140, 0, 0.08);
		color: var(--ci-orange, #FF8C00);
		border-color: var(--ci-orange, #FF8C00);
	}

	.page-info {
		font-size: 12px;
		font-weight: 600;
	}

	/* === Responsive === */

	@media (max-width: 768px) {
		.catalog {
			padding: 20px 20px 40px;
		}

		.catalog-title {
			font-size: 26px;
		}

		.product-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 12px;
		}
	}

	@media (max-width: 640px) {
		.catalog {
			padding: 16px 12px 40px;
		}

		.catalog-header {
			margin-bottom: 20px;
		}

		.catalog-title {
			font-size: 22px;
			letter-spacing: -0.5px;
		}

		.catalog-subtitle {
			font-size: 13px;
		}

		.product-grid {
			grid-template-columns: 1fr;
			gap: 12px;
		}

		.pagination {
			gap: 8px;
		}

		.page-btn {
			padding: 10px 14px;
			font-size: 11px;
		}
	}
</style>
