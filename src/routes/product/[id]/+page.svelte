<!--
  Page Produit — Détail d'un produit avec image, infos et produits similaires

  Route dynamique : /product/[id]
  Récupère le produit depuis l'API Django.
-->
<script>
	import { page } from '$app/state';
	import ProductCard from '$lib/components/products/ProductCard.svelte';
	import Stars from '$lib/components/ui/Stars.svelte';
	import Loader from '$lib/components/ui/Loader.svelte';
	import { themeColors } from '$lib/stores/theme.js';
	import { addToCart } from '$lib/stores/cart.js';
	import { CI_ORANGE, CI_GREEN } from '$lib/utils/colors.js';
	import { formatPrice } from '$lib/utils/format.js';
	import { fetchProductById, fetchProducts } from '$lib/api/client.js';

	const colors = $derived($themeColors);

	/** Produit chargé depuis l'API */
	let product = $state(null);

	/** Produits similaires (même catégorie) */
	let related = $state([]);

	/** État de chargement */
	let loading = $state(true);

	/** Erreur éventuelle */
	let errorMsg = $state(null);

	/** Charge le produit et les produits similaires en parallèle */
	async function loadProduct(id) {
		loading = true;
		errorMsg = null;

		try {
			const productData = await fetchProductById(id);
			product = productData;

			// Afficher le produit immédiatement, charger les similaires en arrière-plan
			loading = false;

			if (productData.category?.slug) {
				fetchProducts({ category: productData.category.slug, page: 1 })
					.then((data) => {
						related = data.results
							.filter((p) => p.id !== productData.id)
							.slice(0, 4);
					})
					.catch(() => { related = []; });
			}
		} catch (err) {
			console.error('Erreur chargement produit:', err);
			errorMsg = err.message;
			loading = false;
		}
	}

	// Charger le produit à chaque changement d'id (inclut le premier rendu)
	$effect(() => {
		const id = page.params.id;
		if (id) {
			loadProduct(id);
		}
	});
</script>

<svelte:head>
	<title>{product ? product.title : 'Produit'} — MarchéCI</title>
</svelte:head>

<!-- Loader pendant le chargement du produit -->
{#if loading}
	<Loader size="lg" message="Chargement du produit..." />
{:else if errorMsg}
	<div class="not-found">
		<p style="color: {colors.textSecondary};">Erreur : {errorMsg}</p>
		<a href="/" class="back-link">← Retour au catalogue</a>
	</div>
{:else if product}
	<div class="product-page">
		<!-- Retour au catalogue -->
		<a href="/" class="back-link">
			← Retour au catalogue
		</a>

		<div class="product-layout">
			<!-- Image du produit -->
			<div class="product-image">
				<img
					src={product.image_url}
					alt={product.title}
					class="product-img"
				/>
			</div>

			<!-- Informations produit -->
			<div class="product-info">
				<!-- Catégorie -->
				<span class="product-category">{product.category?.name}</span>

				<!-- Titre -->
				<h1 class="product-name" style="color: {colors.textPrimary};">
					{product.title}
				</h1>

				<!-- Note -->
				<div class="product-rating">
					<Stars rating={product.rating} />
					<span class="rating-text" style="color: {colors.textSecondary};">
						{product.rating}/5
					</span>
				</div>

				<!-- Prix -->
				<div class="product-prices">
					<span class="price-main">
						{formatPrice(product.price, product.currency)}
					</span>
				</div>

				<!-- Description -->
				{#if product.description}
					<p class="product-description" style="color: {colors.textSecondary};">
						{product.description}
					</p>
				{/if}

				<!-- Stock -->
				<p
					class="product-stock"
					style="color: {product.in_stock ? CI_GREEN : '#E53E3E'};"
				>
					{product.in_stock ? 'En stock' : 'Rupture de stock'}
				</p>

				<!-- Bouton ajout panier -->
				<button
					class="add-to-cart-btn"
					onclick={() => addToCart(product)}
					disabled={!product.in_stock}
				>
					{#if product.in_stock}
						Ajouter au panier — {formatPrice(product.price, product.currency)}
					{:else}
						Indisponible
					{/if}
				</button>

				<!-- Source du produit -->
				{#if product.source}
					<p class="product-source" style="color: {colors.textDim};">
						Source : {product.source}
					</p>
				{/if}
			</div>
		</div>

		<!-- Produits similaires -->
		{#if related.length > 0}
			<div class="related-section">
				<h3 class="related-title" style="color: {colors.textPrimary};">
					Produits similaires
				</h3>
				<div class="related-grid">
					{#each related as relatedProduct (relatedProduct.id)}
						<ProductCard product={relatedProduct} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
{:else}
	<!-- Produit non trouvé -->
	<div class="not-found">
		<p style="color: {colors.textSecondary};">Produit introuvable.</p>
		<a href="/" class="back-link">← Retour au catalogue</a>
	</div>
{/if}

<style>
	.product-page {
		max-width: 1000px;
		margin: 0 auto;
		padding: 28px 40px 60px;
	}

	/* Lien retour */
	.back-link {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--ci-orange, #FF8C00);
		font-size: 12px;
		font-weight: 600;
		padding: 0;
		margin-bottom: 20px;
		display: inline-block;
		text-decoration: none;
	}

	/* Layout 2 colonnes */
	.product-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 32px;
	}

	/* Image du produit */
	.product-image {
		height: 400px;
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		background: #f5f5f5;
	}

	.product-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 20px;
	}

	/* Catégorie */
	.product-category {
		font-size: 11px;
		color: var(--ci-green, #009E49);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	/* Titre */
	.product-name {
		font-size: 28px;
		font-weight: 800;
		margin: 8px 0 12px;
		letter-spacing: -0.5px;
	}

	/* Note */
	.product-rating {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 16px;
	}

	.rating-text {
		font-size: 12px;
	}

	/* Prix */
	.product-prices {
		display: flex;
		align-items: baseline;
		gap: 10px;
		margin-bottom: 16px;
	}

	.price-main {
		font-size: 32px;
		font-weight: 800;
		color: var(--ci-orange, #FF8C00);
	}

	/* Description */
	.product-description {
		font-size: 14px;
		line-height: 1.8;
		margin: 0 0 24px;
	}

	/* Stock */
	.product-stock {
		font-size: 12px;
		font-weight: 600;
		margin: 0 0 20px;
	}

	/* Source */
	.product-source {
		font-size: 10px;
		margin-top: 12px;
	}

	/* Bouton ajout panier */
	.add-to-cart-btn {
		width: 100%;
		padding: 15px 0;
		border-radius: 12px;
		border: none;
		cursor: pointer;
		background: linear-gradient(135deg, #FF8C00, #FFa040);
		color: #FFF;
		font-size: 15px;
		font-weight: 700;
		font-family: 'DM Sans', sans-serif;
		box-shadow: 0 4px 20px rgba(255, 140, 0, 0.2);
		transition: all 0.2s;
	}

	.add-to-cart-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background: #999;
		box-shadow: none;
	}

	/* Produits similaires */
	.related-section {
		margin-top: 48px;
	}

	.related-title {
		font-size: 18px;
		font-weight: 700;
		margin: 0 0 16px;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}

	/* Produit non trouvé */
	.not-found {
		text-align: center;
		padding: 60px 40px;
	}

	/* === Responsive === */

	@media (max-width: 768px) {
		.product-page {
			padding: 20px 20px 40px;
		}

		.product-layout {
			grid-template-columns: 1fr;
			gap: 24px;
		}

		.product-image {
			height: 300px;
		}

		.product-name {
			font-size: 24px;
		}

		.price-main {
			font-size: 26px;
		}

		.related-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.not-found {
			padding: 40px 20px;
		}
	}

	@media (max-width: 640px) {
		.product-page {
			padding: 16px 12px 40px;
		}

		.product-image {
			height: 240px;
			border-radius: 14px;
		}

		.product-img {
			border-radius: 14px;
		}

		.product-name {
			font-size: 20px;
		}

		.price-main {
			font-size: 24px;
		}

		.product-description {
			font-size: 13px;
		}

		.add-to-cart-btn {
			padding: 16px 0;
			font-size: 14px;
		}

		.related-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 10px;
		}

		.related-section {
			margin-top: 32px;
		}

		.related-title {
			font-size: 16px;
		}
	}
</style>
