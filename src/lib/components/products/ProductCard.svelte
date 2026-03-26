<!--
  ProductCard — Carte produit dans la grille du catalogue

  Affiche : image du produit, titre, étoiles, prix, bouton ajout panier.
  Clic sur la carte → navigation vers la page produit détaillée.

  Props :
  - product : objet produit API (id, title, price, image_url, rating, etc.)
-->
<script>
	import { goto } from '$app/navigation';
	import Stars from '$lib/components/ui/Stars.svelte';
	import { themeColors } from '$lib/stores/theme.js';
	import { addToCart } from '$lib/stores/cart.js';
	import { formatPrice } from '$lib/utils/format.js';

	/** @type {Object} Produit depuis l'API */
	let { product } = $props();

	const colors = $derived($themeColors);

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
	<!-- Image du produit -->
	<div class="card-image">
		<img
			src={product.image_url}
			alt={product.title}
			class="card-img"
			loading="lazy"
		/>
		{#if !product.in_stock}
			<span class="out-of-stock-badge">Rupture</span>
		{/if}
	</div>

	<!-- Informations produit -->
	<div class="card-body">
		<p class="card-category" style="color: {colors.textSecondary};">
			{product.category_name}
		</p>
		<p class="card-name" style="color: {colors.textPrimary};">
			{product.title}
		</p>

		<Stars rating={product.rating} />

		<div class="card-footer">
			<div class="card-prices">
				<span class="price-current">
					{formatPrice(product.price, product.currency)}
				</span>
			</div>

			<!-- Bouton ajout rapide au panier -->
			<button
				class="add-btn"
				onclick={handleAddToCart}
				disabled={!product.in_stock}
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

	/* Image du produit */
	.card-image {
		height: 180px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		background: #f5f5f5;
		overflow: hidden;
	}

	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.out-of-stock-badge {
		position: absolute;
		top: 10px;
		left: 10px;
		font-size: 9px;
		font-weight: 700;
		padding: 4px 10px;
		border-radius: 6px;
		color: #FFF;
		background: #E53E3E;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	/* Corps de la carte */
	.card-body {
		padding: 14px 16px;
	}

	.card-category {
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin: 0 0 2px;
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

	.add-btn:hover:not(:disabled) {
		background: var(--ci-orange, #FF8C00);
		color: #FFF;
	}

	.add-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	/* === Responsive === */

	@media (max-width: 768px) {
		.card-image {
			height: 150px;
		}
	}

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

		.add-btn {
			width: 38px;
			height: 38px;
			font-size: 18px;
		}

		.card:hover {
			transform: none;
			box-shadow: none;
		}
	}
</style>
