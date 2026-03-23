<!--
  SkeletonCard — Placeholder animé pour les cartes produit en chargement

  Reproduit la forme d'une ProductCard avec des blocs gris
  qui shimmer (effet de brillance) pendant le chargement.
-->
<script>
	import { themeColors } from '$lib/stores/theme.js';

	const colors = $derived($themeColors);
</script>

<div class="skeleton-card" style="background: {colors.card}; border-color: {colors.border};">
	<!-- Placeholder image -->
	<div class="skeleton-image" style="background: {colors.inputBg};"></div>

	<!-- Placeholder contenu -->
	<div class="skeleton-body">
		<!-- Nom du produit -->
		<div class="skeleton-line title" style="background: {colors.inputBg};"></div>

		<!-- Étoiles -->
		<div class="skeleton-line stars" style="background: {colors.inputBg};"></div>

		<!-- Prix et bouton -->
		<div class="skeleton-footer">
			<div class="skeleton-line price" style="background: {colors.inputBg};"></div>
			<div class="skeleton-circle" style="background: {colors.inputBg};"></div>
		</div>
	</div>
</div>

<style>
	.skeleton-card {
		border-radius: 16px;
		border: 1px solid;
		overflow: hidden;
	}

	/* Placeholder image */
	.skeleton-image {
		height: 180px;
		position: relative;
		overflow: hidden;
	}

	/* Effet shimmer (brillance qui se déplace) */
	.skeleton-image::after,
	.skeleton-line::after,
	.skeleton-circle::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 140, 0, 0.08) 50%,
			transparent 100%
		);
		animation: shimmer 1.8s ease-in-out infinite;
	}

	@keyframes shimmer {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}

	/* Contenu */
	.skeleton-body {
		padding: 14px 16px;
	}

	/* Lignes de placeholder */
	.skeleton-line {
		border-radius: 6px;
		position: relative;
		overflow: hidden;
	}

	.skeleton-line.title {
		height: 14px;
		width: 80%;
		margin-bottom: 10px;
	}

	.skeleton-line.stars {
		height: 10px;
		width: 50%;
		margin-bottom: 14px;
	}

	.skeleton-line.price {
		height: 16px;
		width: 40%;
	}

	/* Footer (prix + bouton) */
	.skeleton-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.skeleton-circle {
		width: 34px;
		height: 34px;
		border-radius: 10px;
		position: relative;
		overflow: hidden;
	}

	/* === Responsive === */
	@media (max-width: 768px) {
		.skeleton-image {
			height: 150px;
		}
	}

	@media (max-width: 640px) {
		.skeleton-image {
			height: 140px;
		}

		.skeleton-body {
			padding: 10px 12px;
		}
	}
</style>
