<!--
  CartItem — Ligne d'un produit dans la sidebar panier

  Affiche : image, nom, prix, lien d'achat et bouton supprimer.

  Props :
  - item : objet CartItem (productId, name, price, currency, image_url, product_url)
-->
<script>
	import { themeColors } from '$lib/stores/theme.js';
	import { removeFromCart } from '$lib/stores/cart.js';
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

	<!-- Détails -->
	<div class="item-details">
		<p class="item-name" style="color: {colors.textPrimary};">{item.name}</p>
		<p class="item-price" style="color: {CI_ORANGE};">
			{formatPrice(item.price, item.currency)}
		</p>

		<div class="item-actions">
			<!-- Lien vers le site source -->
			{#if item.product_url}
				<a
					href={item.product_url}
					target="_blank"
					rel="noopener noreferrer"
					class="buy-link"
					onclick={(e) => e.stopPropagation()}
				>
					Acheter →
				</a>
			{/if}

			<!-- Supprimer -->
			<button
				class="remove-btn"
				onclick={() => removeFromCart(item.productId)}
			>
				Retirer
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

	/* Actions */
	.item-actions {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.buy-link {
		font-size: 11px;
		font-weight: 700;
		color: #009E49;
		text-decoration: none;
		padding: 4px 10px;
		border-radius: 6px;
		background: rgba(0, 158, 73, 0.08);
		transition: all 0.2s;
	}

	.buy-link:hover {
		background: rgba(0, 158, 73, 0.15);
	}

	.remove-btn {
		margin-left: auto;
		background: none;
		border: none;
		cursor: pointer;
		color: #E53E3E;
		font-size: 11px;
		font-family: 'DM Sans', sans-serif;
	}
</style>
