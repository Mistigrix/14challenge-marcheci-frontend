<!--
  Page Catalogue (accueil) — Grille de produits avec filtres et tri

  Affiche :
  - Titre et sous-titre du marché
  - Filtres par catégorie
  - Barre de tri
  - Skeleton loaders pendant le chargement
  - Grille responsive de ProductCards
-->
<script>
	import { onMount } from 'svelte';
	import CategoryFilter from '$lib/components/products/CategoryFilter.svelte';
	import SortBar from '$lib/components/products/SortBar.svelte';
	import ProductCard from '$lib/components/products/ProductCard.svelte';
	import SkeletonCard from '$lib/components/ui/SkeletonCard.svelte';
	import { themeColors } from '$lib/stores/theme.js';
	import { filteredProducts } from '$lib/stores/filters.js';
	import { CI_ORANGE } from '$lib/utils/colors.js';

	const colors = $derived($themeColors);
	const displayedProducts = $derived($filteredProducts);

	/** Simule un chargement initial (sera remplacé par l'appel API Django) */
	let loading = $state(true);

	onMount(() => {
		// Simule le temps de chargement — à remplacer par fetch API
		const timer = setTimeout(() => { loading = false; }, 800);
		return () => clearTimeout(timer);
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
			Artisanat, mode, beauté, alimentation — le meilleur du terroir ivoirien
		</p>
	</div>

	<!-- Filtres par catégorie -->
	<CategoryFilter />

	<!-- Barre de tri et compteur -->
	<SortBar />

	<!-- Grille de produits avec skeleton pendant le chargement -->
	{#if loading}
		<div class="product-grid">
			{#each Array(8) as _}
				<SkeletonCard />
			{/each}
		</div>
	{:else}
		<div class="product-grid">
			{#each displayedProducts as product (product.id)}
				<ProductCard {product} />
			{/each}
		</div>
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

	/* === Responsive — Réduction du padding et tailles sur mobile === */

	/* Tablette — grille 2 colonnes, padding réduit */
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

	/* Mobile — grille 1 colonne, titre compact */
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

		/* Une seule colonne sur mobile */
		.product-grid {
			grid-template-columns: 1fr;
			gap: 12px;
		}
	}
</style>
