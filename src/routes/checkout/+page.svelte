<!--
  Page Checkout — Processus de commande en 3 étapes

  Étape 1 : Adresse de livraison
  Étape 2 : Méthode de paiement (Mobile Money, CB, livraison)
  Étape 3 : Récapitulatif et confirmation

  Après confirmation, affiche un écran de succès avec numéro de commande.
-->
<script>
	import { goto } from '$app/navigation';
	import InputField from '$lib/components/ui/InputField.svelte';
	import { themeColors } from '$lib/stores/theme.js';
	import { cart, subtotal, tax, totalPrice, clearCart } from '$lib/stores/cart.js';
	import { CI_ORANGE, CI_GREEN } from '$lib/utils/colors.js';
	import { formatPrice } from '$lib/utils/format.js';

	const colors = $derived($themeColors);

	// === État du checkout ===

	/** Étape actuelle (1 = adresse, 2 = paiement, 3 = récapitulatif) */
	let checkoutStep = $state(1);

	/** Commande confirmée ? */
	let orderConfirmed = $state(false);

	// Champs adresse de livraison
	let shippingName = $state('');
	let shippingStreet = $state('');
	let shippingCity = $state('Abidjan');
	let shippingZip = $state('');

	/** Méthode de paiement sélectionnée */
	let paymentMethod = $state('mobile_money');

	/** Méthodes de paiement disponibles */
	const paymentMethods = [
		{ key: 'mobile_money', label: 'Mobile Money (Orange / Wave / MTN)', icon: '📱' },
		{ key: 'card', label: 'Carte bancaire', icon: '💳' },
		{ key: 'cash', label: 'Paiement à la livraison', icon: '💵' }
	];

	/** Labels des étapes du checkout */
	const steps = ['Adresse', 'Paiement', 'Confirmation'];

	/** Confirme la commande et affiche l'écran de succès */
	function confirmOrder() {
		orderConfirmed = true;
	}

	/** Retour au catalogue après commande — vide le panier */
	function continueShopping() {
		clearCart();
		orderConfirmed = false;
		goto('/');
	}
</script>

<svelte:head>
	<title>Checkout — MarchéCI</title>
</svelte:head>

<div class="checkout">
	{#if orderConfirmed}
		<!-- === Écran de confirmation === -->
		<div class="confirmation">
			<div class="confirm-icon">✓</div>
			<h1 class="confirm-title" style="color: {colors.textPrimary};">
				Commande confirmée !
			</h1>
			<p class="confirm-detail" style="color: {colors.textSecondary};">
				Commande #MCI-{String(Date.now()).slice(-6)}
			</p>
			<p class="confirm-detail" style="color: {colors.textSecondary};">
				Livraison estimée : 25/03/2026
			</p>
			<p class="confirm-total">{formatPrice($totalPrice)}</p>
			<button class="continue-btn" onclick={continueShopping}>
				Continuer mes achats
			</button>
		</div>
	{:else}
		<!-- === Processus de checkout === -->
		<h1 class="checkout-title" style="color: {colors.textPrimary};">Checkout</h1>

		<!-- Indicateur d'étapes -->
		<div class="steps">
			{#each steps as step, i}
				<div class="step">
					<div
						class="step-bar"
						style="background: {checkoutStep > i ? CI_ORANGE : `${colors.textDim}40`};"
					></div>
					<span
						class="step-label"
						style="color: {checkoutStep > i ? CI_ORANGE : colors.textDim};"
					>
						{step}
					</span>
				</div>
			{/each}
		</div>

		<!-- Contenu de l'étape -->
		<div
			class="step-content"
			style="background: {colors.card}; border-color: {colors.border};"
		>
			<!-- ÉTAPE 1 : Adresse de livraison -->
			{#if checkoutStep === 1}
				<p class="step-title" style="color: {colors.textPrimary};">
					Adresse de livraison
				</p>
				<InputField label="Nom complet" bind:value={shippingName} placeholder="Kouamé Aya" />
				<InputField label="Adresse" bind:value={shippingStreet} placeholder="Cocody, Riviera 3" />
				<div class="fields-row">
					<InputField label="Ville" bind:value={shippingCity} placeholder="Abidjan" />
					<InputField label="Code postal" bind:value={shippingZip} placeholder="01 BP" />
				</div>
				<button class="primary-btn" onclick={() => (checkoutStep = 2)}>
					Continuer vers le paiement
				</button>

			<!-- ÉTAPE 2 : Méthode de paiement -->
			{:else if checkoutStep === 2}
				<p class="step-title" style="color: {colors.textPrimary};">
					Méthode de paiement
				</p>
				{#each paymentMethods as pm}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="payment-option"
						class:selected={paymentMethod === pm.key}
						style="
							border: {paymentMethod === pm.key ? `2px solid ${CI_ORANGE}` : `1px solid ${colors.border}`};
							background: {paymentMethod === pm.key ? `${CI_ORANGE}08` : 'transparent'};
						"
						onclick={() => (paymentMethod = pm.key)}
					>
						<span class="payment-icon">{pm.icon}</span>
						<span
							class="payment-label"
							style="
								font-weight: {paymentMethod === pm.key ? 700 : 400};
								color: {paymentMethod === pm.key ? CI_ORANGE : colors.textPrimary};
							"
						>
							{pm.label}
						</span>
					</div>
				{/each}
				<div class="btn-row">
					<button
						class="secondary-btn"
						style="border-color: {colors.border}; color: {colors.textSecondary};"
						onclick={() => (checkoutStep = 1)}
					>
						Retour
					</button>
					<button class="primary-btn flex-1" onclick={() => (checkoutStep = 3)}>
						Voir le récapitulatif
					</button>
				</div>

			<!-- ÉTAPE 3 : Récapitulatif -->
			{:else if checkoutStep === 3}
				<p class="step-title" style="color: {colors.textPrimary};">
					Récapitulatif
				</p>

				<!-- Liste des articles -->
				{#each $cart as item (item.productId)}
					<div class="recap-item" style="border-bottom-color: {colors.border};">
						<span class="recap-name" style="color: {colors.textPrimary};">
							{item.name} x{item.quantity}
						</span>
						<span class="recap-price" style="color: {colors.textPrimary};">
							{formatPrice(item.price * item.quantity)}
						</span>
					</div>
				{/each}

				<!-- Totaux -->
				<div class="recap-totals">
					<div class="recap-row">
						<span style="color: {colors.textSecondary};">Sous-total</span>
						<span style="color: {colors.textPrimary};">{formatPrice($subtotal)}</span>
					</div>
					<div class="recap-row">
						<span style="color: {colors.textSecondary};">TVA 18%</span>
						<span style="color: {colors.textPrimary};">{formatPrice($tax)}</span>
					</div>
					<div class="recap-row final" style="border-top-color: {colors.border};">
						<span class="recap-total-label" style="color: {colors.textPrimary};">Total</span>
						<span class="recap-total-value">{formatPrice($totalPrice)}</span>
					</div>
				</div>

				<div class="btn-row">
					<button
						class="secondary-btn"
						style="border-color: {colors.border}; color: {colors.textSecondary};"
						onclick={() => (checkoutStep = 2)}
					>
						Retour
					</button>
					<button class="confirm-btn flex-1" onclick={confirmOrder}>
						Confirmer la commande
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.checkout {
		max-width: 700px;
		margin: 0 auto;
		padding: 28px 40px 60px;
	}

	.checkout-title {
		font-size: 24px;
		font-weight: 800;
		margin: 0 0 24px;
	}

	/* === Indicateur d'étapes === */
	.steps {
		display: flex;
		gap: 4px;
		margin-bottom: 28px;
	}

	.step {
		flex: 1;
		text-align: center;
	}

	.step-bar {
		height: 3px;
		border-radius: 2px;
		margin-bottom: 8px;
		transition: background 0.3s;
	}

	.step-label {
		font-size: 10px;
		font-weight: 600;
	}

	/* === Contenu de l'étape === */
	.step-content {
		border-radius: 16px;
		border: 1px solid;
		padding: 24px;
	}

	.step-title {
		font-size: 15px;
		font-weight: 700;
		margin: 0 0 16px;
	}

	/* Ligne de 2 champs côte à côte */
	.fields-row {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 12px;
	}

	/* === Méthodes de paiement === */
	.payment-option {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 14px 16px;
		border-radius: 12px;
		cursor: pointer;
		margin-bottom: 8px;
		transition: all 0.2s;
	}

	.payment-icon {
		font-size: 22px;
	}

	.payment-label {
		font-size: 13px;
	}

	/* === Récapitulatif === */
	.recap-item {
		display: flex;
		justify-content: space-between;
		padding: 8px 0;
		border-bottom: 1px solid;
	}

	.recap-name,
	.recap-price {
		font-size: 12px;
	}

	.recap-price {
		font-weight: 600;
	}

	.recap-totals {
		padding-top: 12px;
		margin-top: 8px;
	}

	.recap-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 4px;
		font-size: 12px;
	}

	.recap-row.final {
		padding-top: 8px;
		border-top: 1px solid;
		margin-top: 8px;
	}

	.recap-total-label {
		font-size: 16px;
		font-weight: 800;
	}

	.recap-total-value {
		font-size: 16px;
		font-weight: 800;
		color: var(--ci-orange, #FF8C00);
	}

	/* === Boutons === */
	.btn-row {
		display: flex;
		gap: 8px;
		margin-top: 16px;
	}

	.flex-1 {
		flex: 1;
	}

	.primary-btn {
		width: 100%;
		padding: 13px 0;
		border-radius: 12px;
		border: none;
		cursor: pointer;
		background: linear-gradient(135deg, #FF8C00, #FFa040);
		color: #FFF;
		font-size: 13px;
		font-weight: 700;
		font-family: 'DM Sans', sans-serif;
	}

	.secondary-btn {
		padding: 13px 24px;
		border-radius: 12px;
		border: 1px solid;
		background: transparent;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
		font-family: 'DM Sans', sans-serif;
	}

	.confirm-btn {
		padding: 13px 0;
		border-radius: 12px;
		border: none;
		cursor: pointer;
		background: linear-gradient(135deg, #009E49, #00C853);
		color: #FFF;
		font-size: 14px;
		font-weight: 700;
		font-family: 'DM Sans', sans-serif;
		box-shadow: 0 4px 16px rgba(0, 158, 73, 0.2);
	}

	/* === Confirmation de commande === */
	.confirmation {
		text-align: center;
		padding: 60px 0;
	}

	.confirm-icon {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: rgba(0, 158, 73, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 20px;
		font-size: 36px;
		color: var(--ci-green, #009E49);
	}

	.confirm-title {
		font-size: 28px;
		font-weight: 800;
		margin: 0 0 8px;
	}

	.confirm-detail {
		font-size: 14px;
		margin: 0 0 4px;
	}

	.confirm-total {
		font-size: 20px;
		font-weight: 800;
		color: var(--ci-orange, #FF8C00);
		margin: 20px 0;
	}

	.continue-btn {
		padding: 13px 32px;
		border-radius: 12px;
		border: none;
		cursor: pointer;
		background: linear-gradient(135deg, #FF8C00, #FFa040);
		color: #FFF;
		font-size: 14px;
		font-weight: 700;
		font-family: 'DM Sans', sans-serif;
	}

	/* === Responsive — Réduction du padding sur mobile === */

	/* Tablette */
	@media (max-width: 768px) {
		.checkout {
			padding: 20px 20px 40px;
		}

		.step-content {
			padding: 20px;
		}
	}

	/* Mobile — padding minimal, champs empilés */
	@media (max-width: 640px) {
		.checkout {
			padding: 16px 12px 40px;
		}

		.checkout-title {
			font-size: 20px;
			margin-bottom: 16px;
		}

		.step-content {
			padding: 16px;
			border-radius: 12px;
		}

		/* Champs ville/code postal empilés sur mobile */
		.fields-row {
			grid-template-columns: 1fr;
		}

		/* Boutons empilés sur mobile si nécessaire */
		.btn-row {
			flex-direction: column;
		}

		.secondary-btn {
			text-align: center;
		}

		/* Confirmation — tailles réduites */
		.confirm-title {
			font-size: 22px;
		}

		.confirm-icon {
			width: 64px;
			height: 64px;
			font-size: 28px;
		}

		.confirmation {
			padding: 40px 0;
		}

		/* Options de paiement — taille tactile */
		.payment-option {
			padding: 12px 14px;
			min-height: 48px;
		}
	}
</style>
