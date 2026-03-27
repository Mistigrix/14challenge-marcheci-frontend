<!--
  CartSidebar — Panneau latéral du panier (slide-in depuis la droite)

  Affiche la liste des produits ajoutés avec prix et lien d'achat.
  Pas de système de commande — redirige vers le site source.
-->
<script>
	import CartItem from './CartItem.svelte';
	import { darkMode, themeColors } from '$lib/stores/theme.js';
	import { cart, showCart, totalItems } from '$lib/stores/cart.js';

	const colors = $derived($themeColors);
	const isDark = $derived($darkMode);
	const isOpen = $derived($showCart);
	const items = $derived($cart);
	const itemCount = $derived($totalItems);

	/** Ferme la sidebar */
	function closeCart() {
		showCart.set(false);
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
			Mon panier ({itemCount})
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
			<p class="empty-hint" style="color: {colors.textDim};">
				Ajoutez des produits pour les retrouver ici
			</p>
		</div>
	{:else}
		<!-- Liste des produits -->
		<div class="cart-items">
			{#each items as item (item.productId)}
				<CartItem {item} />
			{/each}
		</div>

		<!-- Info en bas -->
		<div class="cart-footer" style="border-top-color: {colors.border};">
			<p class="footer-hint" style="color: {colors.textSecondary};">
				Cliquez sur « Acheter » pour être redirigé vers le site du vendeur.
			</p>
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
		margin: 0 0 4px;
	}

	.empty-hint {
		font-size: 12px;
		margin: 0;
	}

	/* Liste des produits */
	.cart-items {
		flex: 1;
		overflow-y: auto;
	}

	/* Footer */
	.cart-footer {
		border-top: 1px solid;
		padding-top: 16px;
		margin-top: 8px;
	}

	.footer-hint {
		font-size: 11px;
		text-align: center;
		margin: 0;
		line-height: 1.5;
	}

	/* === Responsive === */
	@media (max-width: 640px) {
		.sidebar {
			width: 100%;
			padding: 20px 16px;
		}

		.close-btn {
			font-size: 24px;
			padding: 4px;
			min-height: 44px;
			min-width: 44px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
