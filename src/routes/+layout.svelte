<!--
  Layout principal — Structure commune à toutes les pages

  Applique le thème (couleurs de fond), affiche la navigation,
  la sidebar panier et le footer sur chaque page.
-->
<script>
	import '../app.css';
	import Nav from '$lib/components/layout/Nav.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import CartSidebar from '$lib/components/cart/CartSidebar.svelte';
	import { darkMode, themeColors } from '$lib/stores/theme.js';
	import { CI_ORANGE, CI_GREEN } from '$lib/utils/colors.js';

	let { children } = $props();

	const colors = $derived($themeColors);
	const isDark = $derived($darkMode);
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
</style>
