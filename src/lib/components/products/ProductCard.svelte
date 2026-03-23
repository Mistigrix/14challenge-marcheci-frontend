<!--
  ProductCard — Carte produit dans la grille du catalogue

  Affiche : image placeholder, badge, nom, étoiles, prix, bouton ajout panier.
  Clic sur la carte → navigation vers la page produit détaillée.

  Props :
  - product : objet Product (voir lib/data/products.js)
-->
<script>
	import { goto } from '$app/navigation';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Stars from '$lib/components/ui/Stars.svelte';
	import { themeColors } from '$lib/stores/theme.js';
	import { addToCart } from '$lib/stores/cart.js';
	import { CI_ORANGE } from '$lib/utils/colors.js';
	import { getCoverGradient } from '$lib/utils/colors.js';
	import { formatPrice } from '$lib/utils/format.js';
	import { categories } from '$lib/data/products.js';

	/** @type {import('$lib/data/products.js').Product} */
	let { product } = $props();

	const colors = $derived($themeColors);

	/** Icône de la catégorie du produit */
	const categoryIcon = $derived(
		categories.find((c) => c.id === product.category)?.icon || ''
	);

	/** Navigue vers la page de détail du produit */
	function goToProduct() {
		goto(`/product/${product.id}`);
	}

	/** Ajoute le produit au panier sans naviguer */
	function handleAddToCart(event) {
		event.stopPropagation();
		addToCart(product);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="card"
	style="
		background: {colors.card};
		border-color: {colors.border};
	"
	onclick={goToProduct}
>
	<!-- Image placeholder avec dégradé -->
	<div
		class="card-image"
		style="background: {getCoverGradient(product.name)};"
	>
		<span class="card-image-icon">{categoryIcon}</span>
		<Badge type={product.badge} />
	</div>

	<!-- Informations produit -->
	<div class="card-body">
		<p class="card-name" style="color: {colors.textPrimary};">
			{product.name}
		</p>

		<Stars rating={product.rating} reviewsCount={product.reviewsCount} />

		<div class="card-footer">
			<div class="card-prices">
				<span class="price-current">{formatPrice(product.price)}</span>
				{#if product.originalPrice}
					<span class="price-original" style="color: {colors.textDim};">
						{formatPrice(product.originalPrice)}
					</span>
				{/if}
			</div>

			<!-- Bouton ajout rapide au panier -->
			<button
				class="add-btn"
				onclick={handleAddToCart}
			>
				+
			</button>
		</div>
	</div>
</div>

<style>
	.card {
		border-radius: 16px;
		border: 1px solid;
		overflow: hidden;
		cursor: pointer;
		transition: all 0.3s;
	}

	.card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
	}

	/* Image placeholder */
	.card-image {
		height: 180px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.card-image-icon {
		font-size: 40px;
		opacity: 0.6;
	}

	/* Corps de la carte */
	.card-body {
		padding: 14px 16px;
	}

	.card-name {
		font-size: 13px;
		font-weight: 700;
		margin: 0 0 4px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 8px;
	}

	/* Prix */
	.card-prices {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.price-current {
		font-size: 16px;
		font-weight: 800;
		color: var(--ci-orange, #FF8C00);
	}

	.price-original {
		font-size: 11px;
		text-decoration: line-through;
	}

	/* Bouton ajout panier */
	.add-btn {
		width: 34px;
		height: 34px;
		border-radius: 10px;
		border: none;
		cursor: pointer;
		background: rgba(255, 140, 0, 0.08);
		color: var(--ci-orange, #FF8C00);
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}

	.add-btn:hover {
		background: var(--ci-orange, #FF8C00);
		color: #FFF;
	}

	/* === Responsive — Cartes adaptatives === */

	/* Tablette — image légèrement réduite */
	@media (max-width: 768px) {
		.card-image {
			height: 150px;
		}

		.card-image-icon {
			font-size: 34px;
		}
	}

	/* Mobile — cible tactile suffisante pour le bouton ajout */
	@media (max-width: 640px) {
		.card-image {
			height: 140px;
		}

		.card-body {
			padding: 10px 12px;
		}

		.card-name {
			font-size: 12px;
		}

		.price-current {
			font-size: 14px;
		}

		/* Bouton ajout plus grand pour le tactile */
		.add-btn {
			width: 38px;
			height: 38px;
			font-size: 18px;
		}

		/* Désactiver le hover/transform sur mobile (pas de souris) */
		.card:hover {
			transform: none;
			box-shadow: none;
		}
	}
</style>
