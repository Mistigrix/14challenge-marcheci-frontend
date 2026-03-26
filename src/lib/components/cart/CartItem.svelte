<!--
  CartItem — Ligne d'un article dans la sidebar panier

  Affiche : image du produit, nom, prix, contrôles de quantité, bouton supprimer.

  Props :
  - item : objet CartItem (productId, name, price, currency, image_url, quantity)
-->
<script>
	import { themeColors } from '$lib/stores/theme.js';
	import { updateQuantity, removeFromCart } from '$lib/stores/cart.js';
	import { CI_ORANGE } from '$lib/utils/colors.js';
	import { formatPrice } from '$lib/utils/format.js';

	/** @type {import('$lib/stores/cart.js').CartItem} */
	let { item } = $props();

	const colors = $derived($themeColors);
</script>

<div class="cart-item" style="border-bottom-color: {colors.border};">
	<!-- Miniature produit -->
	<div class="item-thumb">
		{#if item.image_url}
			<img src={item.image_url} alt={item.name} class="item-thumb-img" />
		{/if}
	</div>

	<!-- Détails et contrôles -->
	<div class="item-details">
		<p class="item-name" style="color: {colors.textPrimary};">{item.name}</p>
		<p class="item-price" style="color: {CI_ORANGE};">
			{formatPrice(item.price, item.currency)}
		</p>

		<div class="item-controls">
			<!-- Décrémenter -->
			<button
				class="qty-btn"
				style="border-color: {colors.border}; color: {colors.textSecondary};"
				onclick={() => updateQuantity(item.productId, item.quantity - 1)}
			>
				-
			</button>

			<!-- Quantité -->
			<span class="qty-value" style="color: {colors.textPrimary};">{item.quantity}</span>

			<!-- Incrémenter -->
			<button
				class="qty-btn"
				style="border-color: {colors.border}; color: {colors.textSecondary};"
				onclick={() => updateQuantity(item.productId, item.quantity + 1)}
			>
				+
			</button>

			<!-- Supprimer -->
			<button
				class="remove-btn"
				onclick={() => removeFromCart(item.productId)}
			>
				Supprimer
			</button>
		</div>
	</div>
</div>

<style>
	.cart-item {
		display: flex;
		gap: 12px;
		padding: 12px 0;
		border-bottom: 1px solid;
	}

	/* Miniature */
	.item-thumb {
		width: 56px;
		height: 56px;
		border-radius: 10px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: #f5f5f5;
	}

	.item-thumb-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Détails */
	.item-details {
		flex: 1;
		min-width: 0;
	}

	.item-name {
		font-size: 12px;
		font-weight: 600;
		margin: 0 0 4px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.item-price {
		font-size: 13px;
		font-weight: 700;
		margin: 0 0 6px;
	}

	/* Contrôles de quantité */
	.item-controls {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.qty-btn {
		width: 26px;
		height: 26px;
		border-radius: 6px;
		border: 1px solid;
		background: transparent;
		cursor: pointer;
		font-size: 14px;
	}

	.qty-value {
		font-size: 13px;
		font-weight: 600;
		width: 20px;
		text-align: center;
	}

	.remove-btn {
		margin-left: auto;
		background: none;
		border: none;
		cursor: pointer;
		color: #E53E3E;
		font-size: 12px;
		font-family: 'DM Sans', sans-serif;
	}
</style>
