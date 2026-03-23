<!--
  Page Produit — Détail d'un produit avec image, infos, stock et produits similaires

  Route dynamique : /product/[id]
  Récupère le produit par son id dans les données locales.
-->
<script>
	import { page } from '$app/state';
	import ProductCard from '$lib/components/products/ProductCard.svelte';
	import Stars from '$lib/components/ui/Stars.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { themeColors } from '$lib/stores/theme.js';
	import { addToCart } from '$lib/stores/cart.js';
	import { CI_ORANGE, CI_GREEN, getCoverGradient } from '$lib/utils/colors.js';
	import { formatPrice } from '$lib/utils/format.js';
	import { getProductById, getRelatedProducts, categories } from '$lib/data/products.js';

	const colors = $derived($themeColors);

	/** Produit courant — récupéré depuis l'URL */
	const product = $derived(getProductById(page.params.id));

	/** Produits de la même catégorie */
	const related = $derived(product ? getRelatedProducts(product) : []);

	/** Icône de la catégorie */
	const categoryIcon = $derived(
		categories.find((c) => c.id === product?.category)?.icon || ''
	);

	/** Calcul du pourcentage de réduction */
	const discountPercent = $derived(
		product?.originalPrice
			? Math.round((1 - product.price / product.originalPrice) * 100)
			: 0
	);
</script>

<svelte:head>
	<title>{product ? product.name : 'Produit'} — MarchéCI</title>
</svelte:head>

{#if product}
	<div class="product-page">
		<!-- Retour au catalogue -->
		<a href="/" class="back-link">
			← Retour au catalogue
		</a>

		<div class="product-layout">
			<!-- Image placeholder -->
			<div
				class="product-image"
				style="background: {getCoverGradient(product.name)};"
			>
				<span class="product-image-icon">{categoryIcon}</span>
				{#if product.badge}
					<span
						class="product-badge"
						style="background: {product.badge === 'promo' ? '#E53E3E' : product.badge === 'new' ? CI_GREEN : CI_ORANGE};"
					>
						{product.badge}
					</span>
				{/if}
			</div>

			<!-- Informations produit -->
			<div class="product-info">
				<!-- Catégorie -->
				<span class="product-category">{product.category}</span>

				<!-- Nom -->
				<h1 class="product-name" style="color: {colors.textPrimary};">
					{product.name}
				</h1>

				<!-- Note et avis -->
				<div class="product-rating">
					<Stars rating={product.rating} />
					<span class="rating-text" style="color: {colors.textSecondary};">
						{product.rating}/5 ({product.reviewsCount} avis)
					</span>
				</div>

				<!-- Prix -->
				<div class="product-prices">
					<span class="price-main">{formatPrice(product.price)}</span>
					{#if product.originalPrice}
						<span class="price-old" style="color: {colors.textDim};">
							{formatPrice(product.originalPrice)}
						</span>
						<span class="price-discount">-{discountPercent}%</span>
					{/if}
				</div>

				<!-- Description -->
				<p class="product-description" style="color: {colors.textSecondary};">
					{product.description}
				</p>

				<!-- Stock -->
				<p
					class="product-stock"
					style="color: {product.stock > 10 ? CI_GREEN : CI_ORANGE};"
				>
					{product.stock > 10
						? `En stock (${product.stock})`
						: `Plus que ${product.stock} en stock !`}
				</p>

				<!-- Bouton ajout panier -->
				<button
					class="add-to-cart-btn"
					onclick={() => addToCart(product)}
				>
					Ajouter au panier — {formatPrice(product.price)}
				</button>
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

	/* Image placeholder */
	.product-image {
		height: 400px;
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.product-image-icon {
		font-size: 80px;
		opacity: 0.5;
	}

	.product-badge {
		position: absolute;
		top: 16px;
		left: 16px;
		font-size: 10px;
		font-weight: 700;
		padding: 5px 14px;
		border-radius: 8px;
		color: #FFF;
		text-transform: uppercase;
	}

	/* Catégorie */
	.product-category {
		font-size: 11px;
		color: var(--ci-green, #009E49);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	/* Nom */
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

	.price-old {
		font-size: 16px;
		text-decoration: line-through;
	}

	.price-discount {
		font-size: 12px;
		font-weight: 700;
		color: #E53E3E;
		padding: 3px 8px;
		border-radius: 6px;
		background: rgba(229, 62, 62, 0.08);
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

	/* === Responsive — Layout 1 colonne sur mobile/tablette === */

	/* Tablette — 1 colonne, produits similaires en 2 colonnes */
	@media (max-width: 768px) {
		.product-page {
			padding: 20px 20px 40px;
		}

		/* Passage en 1 colonne */
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

		/* Produits similaires en 2 colonnes */
		.related-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.not-found {
			padding: 40px 20px;
		}
	}

	/* Mobile — padding réduit, tailles adaptées */
	@media (max-width: 640px) {
		.product-page {
			padding: 16px 12px 40px;
		}

		.product-image {
			height: 240px;
			border-radius: 14px;
		}

		.product-image-icon {
			font-size: 60px;
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

		/* Bouton ajout panier — taille tactile */
		.add-to-cart-btn {
			padding: 16px 0;
			font-size: 14px;
		}

		/* Produits similaires en 2 colonnes sur mobile aussi */
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
