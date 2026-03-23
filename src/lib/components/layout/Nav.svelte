<!--
  Nav — Barre de navigation principale (sticky)

  Contient :
  - Logo MarchéCI avec le drapeau CI
  - Barre de recherche
  - Liens de navigation (Boutique, À propos)
  - Icône panier avec compteur
  - Toggle mode sombre/clair
-->
<script>
	import { goto } from '$app/navigation';
	import FlagBar from '$lib/components/ui/FlagBar.svelte';
	import { darkMode, toggleDarkMode, themeColors } from '$lib/stores/theme.js';
	import { searchQuery } from '$lib/stores/filters.js';
	import { showCart, totalItems } from '$lib/stores/cart.js';
	import { CI_ORANGE } from '$lib/utils/colors.js';
	import { page } from '$app/state';

	const colors = $derived($themeColors);
	const items = $derived($totalItems);
	const isDark = $derived($darkMode);

	/** Identifie la page active pour le style de navigation */
	const currentPath = $derived(page.url.pathname);

	/** Navigation vers l'accueil et reset de la recherche */
	function goHome() {
		searchQuery.set('');
		goto('/');
	}

	/** Met à jour la recherche et redirige vers le catalogue */
	function handleSearch(event) {
		searchQuery.set(event.target.value);
		if (currentPath !== '/') {
			goto('/');
		}
	}

	/** Bascule la visibilité de la sidebar panier */
	function toggleCart() {
		showCart.update((v) => !v);
	}

	/** État du menu mobile (ouvert / fermé) */
	let mobileMenuOpen = $state(false);

	/** Bascule le menu mobile */
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	/** Ferme le menu mobile (après clic sur un lien) */
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	/** Liens de navigation */
	const navLinks = [
		{ href: '/', label: 'Boutique' },
		{ href: '/about', label: 'À propos' }
	];
</script>

<nav
	class="navbar"
	style="
		background: {isDark ? 'rgba(11,11,16,0.92)' : 'rgba(248,246,242,0.92)'};
		border-bottom: 1px solid {colors.border};
	"
>
	<div class="navbar-inner">
		<!-- Logo -->
		<button class="logo" onclick={goHome}>
			<FlagBar />
			<span class="logo-text" style="color: {colors.textPrimary};">
				Marche<span class="logo-accent">CI</span>
			</span>
		</button>

		<div class="nav-actions">
			<!-- Barre de recherche -->
			<div class="search-wrapper">
				<input
					type="text"
					value={$searchQuery}
					oninput={handleSearch}
					placeholder="Rechercher..."
					class="search-input"
					style="
						border-color: {colors.border};
						background: {colors.inputBg};
						color: {colors.textPrimary};
					"
				/>
				<span class="search-icon" style="color: {colors.textDim};">🔍</span>
			</div>

			<!-- Liens de navigation -->
			{#each navLinks as link}
				<a
					href={link.href}
					class="nav-link"
					class:active={currentPath === link.href}
					style="color: {currentPath === link.href ? CI_ORANGE : colors.textSecondary};"
				>
					{link.label}
				</a>
			{/each}

			<!-- Bouton panier -->
			<button class="cart-btn" onclick={toggleCart}>
				<span class="cart-icon">🛒</span>
				{#if items > 0}
					<span class="cart-count">{items}</span>
				{/if}
			</button>

			<!-- Toggle dark mode -->
			<button
				class="theme-toggle"
				style="
					background: {isDark ? '#1A1A22' : '#E5E2DC'};
					border-color: {colors.border};
				"
				onclick={toggleDarkMode}
			>
				{isDark ? '☀' : '☾'}
			</button>

			<!-- Bouton hamburger (visible uniquement sur mobile) -->
			<button
				class="menu-toggle"
				style="color: {colors.textPrimary};"
				onclick={toggleMobileMenu}
				aria-label="Menu"
			>
				{mobileMenuOpen ? '✕' : '☰'}
			</button>
		</div>
	</div>

	<!-- Menu mobile déroulant -->
	{#if mobileMenuOpen}
		<div
			class="mobile-menu"
			style="
				background: {isDark ? 'rgba(11,11,16,0.98)' : 'rgba(248,246,242,0.98)'};
				border-top: 1px solid {colors.border};
			"
		>
			{#each navLinks as link}
				<a
					href={link.href}
					class="mobile-link"
					class:active={currentPath === link.href}
					style="
						color: {currentPath === link.href ? CI_ORANGE : colors.textPrimary};
						border-bottom: 1px solid {colors.border};
					"
					onclick={closeMobileMenu}
				>
					{link.label}
				</a>
			{/each}
		</div>
	{/if}
</nav>

<style>
	.navbar {
		position: sticky;
		top: 0;
		z-index: 100;
		padding: 0 40px;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
	}

	.navbar-inner {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 56px;
	}

	/* Logo */
	.logo {
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		background: none;
		border: none;
		padding: 0;
	}

	.logo-text {
		font-size: 18px;
		font-weight: 800;
		letter-spacing: -0.5px;
	}

	.logo-accent {
		color: var(--ci-orange, #FF8C00);
	}

	/* Actions de navigation */
	.nav-actions {
		display: flex;
		gap: 20px;
		align-items: center;
	}

	/* Recherche */
	.search-wrapper {
		position: relative;
	}

	.search-input {
		width: 200px;
		padding: 8px 14px 8px 32px;
		border-radius: 10px;
		border: 1px solid;
		font-size: 12px;
		outline: none;
		font-family: 'DM Sans', sans-serif;
	}

	.search-icon {
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 13px;
	}

	/* Liens */
	.nav-link {
		font-size: 12px;
		font-weight: 400;
		cursor: pointer;
		text-decoration: none;
		transition: all 0.2s;
	}

	.nav-link.active {
		font-weight: 700;
	}

	/* Panier */
	.cart-btn {
		position: relative;
		cursor: pointer;
		padding: 6px;
		background: none;
		border: none;
	}

	.cart-icon {
		font-size: 20px;
	}

	.cart-count {
		position: absolute;
		top: 0;
		right: 0;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--ci-orange, #FF8C00);
		color: #FFF;
		font-size: 9px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Toggle thème */
	.theme-toggle {
		width: 34px;
		height: 34px;
		border-radius: 10px;
		cursor: pointer;
		border: 1px solid;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
	}

	/* === Responsive — Menu hamburger sur mobile === */

	/* Bouton hamburger — caché par défaut, visible sur mobile */
	.menu-toggle {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 22px;
		padding: 4px;
	}

	/* Menu mobile déroulant — sous la navbar */
	.mobile-menu {
		display: none;
		flex-direction: column;
		padding: 0 12px;
	}

	.mobile-link {
		display: block;
		padding: 14px 8px;
		font-size: 14px;
		font-weight: 500;
		text-decoration: none;
		transition: all 0.2s;
	}

	.mobile-link.active {
		font-weight: 700;
	}

	/* Tablette — réduire le padding et la barre de recherche */
	@media (max-width: 768px) {
		.navbar {
			padding: 0 16px;
		}

		.search-input {
			width: 140px;
			font-size: 11px;
		}

		.nav-actions {
			gap: 12px;
		}
	}

	/* Mobile — menu hamburger, recherche réduite */
	@media (max-width: 640px) {
		.navbar {
			padding: 0 12px;
		}

		.navbar-inner {
			height: 50px;
		}

		/* Masquer les liens desktop sur mobile */
		.nav-link {
			display: none;
		}

		/* Afficher le bouton hamburger sur mobile */
		.menu-toggle {
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 44px;
			min-width: 44px;
		}

		/* Afficher le menu déroulant mobile */
		.mobile-menu {
			display: flex;
		}

		/* Barre de recherche plus compacte sur mobile */
		.search-input {
			width: 110px;
			padding: 6px 10px 6px 28px;
			font-size: 11px;
		}

		.search-icon {
			font-size: 11px;
			left: 8px;
		}

		.nav-actions {
			gap: 8px;
		}

		/* Logo plus petit sur mobile */
		.logo-text {
			font-size: 15px;
		}

		/* Boutons tactiles suffisants */
		.cart-btn {
			padding: 8px;
		}

		.theme-toggle {
			width: 38px;
			height: 38px;
		}
	}
</style>
