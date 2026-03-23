<!--
  Loader — Animation de chargement aux couleurs du drapeau ivoirien

  Trois barres (orange, blanc, vert) qui pulsent en décalé,
  rappelant le drapeau CI et l'identité du marché.

  Props :
  - size : "sm" | "md" | "lg" (défaut : "md")
  - message : texte optionnel affiché sous le loader
-->
<script>
	import { themeColors } from '$lib/stores/theme.js';

	/** @type {"sm" | "md" | "lg"} Taille du loader */
	let { size = 'md', message = '' } = $props();

	const colors = $derived($themeColors);
</script>

<div class="loader-wrapper" class:sm={size === 'sm'} class:lg={size === 'lg'}>
	<div class="loader">
		<div class="bar orange"></div>
		<div class="bar white"></div>
		<div class="bar green"></div>
	</div>

	{#if message}
		<p class="loader-message" style="color: {colors.textSecondary};">
			{message}
		</p>
	{/if}
</div>

<style>
	.loader-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		padding: 40px 0;
	}

	/* === Animation des 3 barres CI === */
	.loader {
		display: flex;
		gap: 6px;
		align-items: center;
		height: 48px;
	}

	.bar {
		width: 8px;
		height: 32px;
		border-radius: 4px;
		animation: pulse 1.2s ease-in-out infinite;
	}

	/* Décalage entre chaque barre */
	.bar:nth-child(1) { animation-delay: 0s; }
	.bar:nth-child(2) { animation-delay: 0.2s; }
	.bar:nth-child(3) { animation-delay: 0.4s; }

	/* Couleurs du drapeau ivoirien */
	.bar.orange { background: #FF8C00; }
	.bar.white  { background: #D4D4D4; }
	.bar.green  { background: #009E49; }

	/* Animation de pulsation verticale */
	@keyframes pulse {
		0%, 100% {
			height: 16px;
			opacity: 0.5;
		}
		50% {
			height: 40px;
			opacity: 1;
		}
	}

	/* Message sous le loader */
	.loader-message {
		font-size: 13px;
		margin: 0;
		font-weight: 500;
		letter-spacing: 0.3px;
	}

	/* === Variantes de taille === */

	/* Petit — pour les composants inline */
	.sm .loader {
		height: 28px;
		gap: 4px;
	}

	.sm .bar {
		width: 5px;
		height: 20px;
		border-radius: 3px;
	}

	@keyframes pulse-sm {
		0%, 100% { height: 10px; opacity: 0.5; }
		50% { height: 24px; opacity: 1; }
	}

	.sm .bar {
		animation-name: pulse-sm;
	}

	.sm .loader-message {
		font-size: 11px;
	}

	.sm {
		padding: 12px 0;
		gap: 8px;
	}

	/* Grand — pour les pages entières */
	.lg .loader {
		height: 64px;
		gap: 8px;
	}

	.lg .bar {
		width: 12px;
		height: 48px;
		border-radius: 6px;
	}

	@keyframes pulse-lg {
		0%, 100% { height: 24px; opacity: 0.5; }
		50% { height: 56px; opacity: 1; }
	}

	.lg .bar {
		animation-name: pulse-lg;
	}

	.lg .loader-message {
		font-size: 15px;
	}

	.lg {
		padding: 60px 0;
	}
</style>
