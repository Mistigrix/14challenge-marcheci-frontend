<!--
  CartSidebar — Panneau latéral du panier (slide-in depuis la droite)

  Affiche la liste des articles, les totaux (sous-total, TVA, TTC)
  et un bouton pour passer à la commande.
  Overlay semi-transparent en arrière-plan quand le panier est ouvert.
-->
<script>
	import { goto } from '$app/navigation';
	import CartItem from './CartItem.svelte';
	import { darkMode, themeColors } from '$lib/stores/theme.js';
	import {
		cart,
		showCart,
		subtotal,
		tax,
		totalItems,
		totalPrice
	} from '$lib/stores/cart.js';
	import { CI_ORANGE } from '$lib/utils/colors.js';
	import { formatPrice } from '$lib/utils/format.js';

	const colors = $derived($themeColors);
	const isDark = $derived($darkMode);
	const isOpen = $derived($showCart);
	const items = $derived($cart);
	const itemCount = $derived($totalItems);

	/** Ferme la sidebar panier */
	function closeCart() {
		showCart.set(false);
	}

	/** Redirige vers le checkout et ferme le panier */
	function goToCheckout() {
		closeCart();
		goto('/checkout');
	}
</script>

<!-- Overlay semi-transparent -->
{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="overlay" onclick={closeCart}></div>
{/if}

<!-- Sidebar panier -->
<aside
	class="sidebar"
	class:open={isOpen}
	style="
		background: {isDark ? '#131318' : '#FFFFFF'};
		border-left-color: {colors.border};
	"
>
	<!-- En-tête -->
	<div class="sidebar-header">
		<h3 class="sidebar-title" style="color: {colors.textPrimary};">
			Panier ({itemCount})
		</h3>
		<button
			class="close-btn"
			style="color: {colors.textSecondary};"
			onclick={closeCart}
		>
			✕
		</button>
	</div>

	{#if items.length === 0}
		<!-- Panier vide -->
		<div class="empty-cart">
			<span class="empty-icon">🛒</span>
			<p class="empty-text" style="color: {colors.textSecondary};">
				Votre panier est vide
			</p>
		</div>
	{:else}
		<!-- Liste des articles -->
		<div class="cart-items">
			{#each items as item (item.productId)}
				<CartItem {item} />
			{/each}
		</div>

		<!-- Totaux et bouton commander -->
		<div class="cart-totals" style="border-top-color: {colors.border};">
			<div class="total-row">
				<span class="total-label" style="color: {colors.textSecondary};">Sous-total</span>
				<span class="total-value" style="color: {colors.textPrimary};">{formatPrice($subtotal)}</span>
			</div>
			<div class="total-row">
				<span class="total-label" style="color: {colors.textSecondary};">TVA (18%)</span>
				<span class="total-value" style="color: {colors.textPrimary};">{formatPrice($tax)}</span>
			</div>
			<div class="total-row final" style="border-top-color: {colors.border};">
				<span class="total-final-label" style="color: {colors.textPrimary};">Total TTC</span>
				<span class="total-final-value">{formatPrice($totalPrice)}</span>
			</div>

			<button class="checkout-btn" onclick={goToCheckout}>
				Commander — {formatPrice($totalPrice)}
			</button>
		</div>
	{/if}
</aside>

<style>
	/* Overlay */
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		z-index: 250;
	}

	/* Sidebar */
	.sidebar {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: 380px;
		z-index: 300;
		border-left: 1px solid;
		padding: 24px 20px;
		box-shadow: -8px 0 32px rgba(0, 0, 0, 0.15);
		display: flex;
		flex-direction: column;
		transform: translateX(100%);
		transition: transform 0.3s ease;
	}

	.sidebar.open {
		transform: translateX(0);
	}

	/* En-tête */
	.sidebar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.sidebar-title {
		font-size: 18px;
		font-weight: 800;
		margin: 0;
	}

	.close-btn {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 20px;
	}

	/* Panier vide */
	.empty-cart {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.empty-icon {
		font-size: 48px;
		margin-bottom: 12px;
	}

	.empty-text {
		font-size: 14px;
	}

	/* Liste des articles */
	.cart-items {
		flex: 1;
		overflow-y: auto;
	}

	/* Totaux */
	.cart-totals {
		border-top: 1px solid;
		padding-top: 16px;
		margin-top: 8px;
	}

	.total-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 6px;
	}

	.total-label,
	.total-value {
		font-size: 12px;
	}

	.total-value {
		font-weight: 500;
	}

	.total-row.final {
		padding-top: 8px;
		border-top: 1px solid;
		margin-top: 8px;
		margin-bottom: 16px;
	}

	.total-final-label {
		font-size: 15px;
		font-weight: 800;
	}

	.total-final-value {
		font-size: 15px;
		font-weight: 800;
		color: var(--ci-orange, #FF8C00);
	}

	/* Bouton commander */
	.checkout-btn {
		width: 100%;
		padding: 14px 0;
		border-radius: 12px;
		border: none;
		cursor: pointer;
		background: linear-gradient(135deg, #FF8C00, #FFa040);
		color: #FFF;
		font-size: 14px;
		font-weight: 700;
		font-family: 'DM Sans', sans-serif;
		box-shadow: 0 4px 16px rgba(255, 140, 0, 0.2);
	}

	/* === Responsive — Sidebar pleine largeur sur mobile === */
	@media (max-width: 640px) {
		.sidebar {
			width: 100%;
			padding: 20px 16px;
		}

		/* Bouton fermer plus grand pour le tactile */
		.close-btn {
			font-size: 24px;
			padding: 4px;
			min-height: 44px;
			min-width: 44px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		/* Bouton commander plus grand sur mobile */
		.checkout-btn {
			padding: 16px 0;
			font-size: 15px;
		}
	}
</style>
