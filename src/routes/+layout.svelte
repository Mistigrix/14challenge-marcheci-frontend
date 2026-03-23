<!--
  Layout principal — Structure commune à toutes les pages

  Applique le thème (couleurs de fond), affiche la navigation,
  la sidebar panier, le footer et un loader de navigation sur chaque page.
-->
<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { navigating } from '$app/state';
	import Nav from '$lib/components/layout/Nav.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import CartSidebar from '$lib/components/cart/CartSidebar.svelte';
	import Loader from '$lib/components/ui/Loader.svelte';
	import { darkMode, themeColors } from '$lib/stores/theme.js';
	import { CI_ORANGE, CI_GREEN } from '$lib/utils/colors.js';

	let { children } = $props();

	const colors = $derived($themeColors);
	const isDark = $derived($darkMode);

	/** Indique si une navigation SvelteKit est en cours */
	const isNavigating = $derived(!!navigating.to);

	/** Masque le loader HTML initial une fois l'app Svelte montée */
	onMount(() => {
		const loader = document.getElementById('app-loader');
		if (loader) {
			loader.classList.add('hidden');
			// Supprime le loader du DOM après la transition
			setTimeout(() => loader.remove(), 500);
		}
	});
</script>

<div
	class="app"
	style="
		background: {colors.bg};
		color: {colors.textPrimary};
		--ci-orange: {CI_ORANGE};
		--ci-green: {CI_GREEN};
	"
>
	<Nav />
	<CartSidebar />

	<!-- Barre de progression en haut pendant la navigation -->
	{#if isNavigating}
		<div class="nav-progress"></div>
	{/if}

	<main>
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	.app {
		min-height: 100vh;
		transition: background-color 0.3s ease, color 0.3s ease;
	}

	main {
		min-height: calc(100vh - 56px - 48px);
	}

	/* Barre de progression de navigation — dégradé aux couleurs CI */
	.nav-progress {
		position: fixed;
		top: 56px;
		left: 0;
		right: 0;
		height: 3px;
		z-index: 200;
		background: linear-gradient(90deg, #FF8C00, #FFFFFF, #009E49);
		background-size: 200% 100%;
		animation: progress-slide 1s ease-in-out infinite;
	}

	@keyframes progress-slide {
		0% { background-position: 100% 0; }
		100% { background-position: -100% 0; }
	}
</style>
