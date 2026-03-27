<!--
  Page À propos — Présentation du projet MarchéCI

  Affiche :
  - Description du projet et du challenge
  - L'équipe (Bath Dorgelès, Oclin Marcel, Rayane Irié)
  - Stack technique
  - Lien open source
-->
<script>
	import { themeColors } from '$lib/stores/theme.js';
	import { CI_ORANGE, CI_GREEN, getInitials } from '$lib/utils/colors.js';

	const colors = $derived($themeColors);

	/** Membres de l'équipe */
	const team = [
		{ name: 'Bath Dorgelès', role: 'Chef de projet & Front' },
		{ name: 'Oclin Marcel C.', role: 'Dev Front-end (Svelte)' },
		{ name: 'Rayane Irié', role: 'Back-end (Django)' }
	];

	/** Technologies utilisées */
	const techStack = ['Svelte', 'Django (Python)', 'SQLite / PostgreSQL'];
</script>

<svelte:head>
	<title>À propos — MarchéCI</title>
</svelte:head>

<div class="about">
	<!-- Présentation du projet -->
	<div class="about-card" style="background: {colors.card}; border-color: {colors.border};">
		<!-- Drapeau CI décoratif -->
		<div class="flag-large" style="border-color: {colors.border};">
			<div class="flag-stripe" style="background: {CI_ORANGE};"></div>
			<div class="flag-stripe" style="background: #FFF;"></div>
			<div class="flag-stripe" style="background: {CI_GREEN};"></div>
		</div>

		<h2 class="about-title">MarchéCI</h2>

		<p class="about-text" style="color: {colors.textSecondary};">
			Jour 11 du Challenge 14-14-14. MarchéCI est une boutique en ligne dédiée aux produits
			ivoiriens — artisanat, mode, beauté et alimentation. Inspirée des grands marchés d'Abidjan
			(Adjamé, Treichville, Marcory), où l'on trouve le meilleur du terroir.
		</p>
		<p class="about-text" style="color: {colors.textSecondary};">
			Ajoutez des produits au panier et retrouvez les liens pour acheter directement
			sur les sites des vendeurs ivoiriens.
		</p>
	</div>

	<!-- Équipe et stack technique -->
	<div class="info-grid">
		<!-- Équipe -->
		<div class="info-card" style="background: {colors.card}; border-color: {colors.border};">
			<p class="info-label" style="color: {colors.textDim};">L'équipe</p>
			{#each team as member, i}
				<div class="member" class:mb-12={i < team.length - 1}>
					<div class="member-avatar">
						{getInitials(member.name)}
					</div>
					<div>
						<p class="member-name" style="color: {colors.textPrimary};">{member.name}</p>
						<p class="member-role" style="color: {colors.textSecondary};">{member.role}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Stack technique -->
		<div class="info-card" style="background: {colors.card}; border-color: {colors.border};">
			<p class="info-label" style="color: {colors.textDim};">Stack technique</p>
			{#each techStack as tech, i}
				<div
					class="tech-item"
					class:mb-6={i < techStack.length - 1}
					style="background: {colors.inputBg}; border-color: {colors.border};"
				>
					<span class="tech-name">{tech}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Lien open source -->
	<div
		class="open-source"
		style="background: {colors.card}; border-color: {colors.border};"
	>
		<p class="open-source-text" style="color: {colors.textSecondary};">
			Open Source sur <span class="highlight-orange">225os.com</span>
			{' & '}
			<span class="highlight-green">GitHub</span>
		</p>
	</div>
</div>

<style>
	.about {
		max-width: 700px;
		margin: 0 auto;
		padding: 40px 40px 60px;
	}

	/* Carte principale */
	.about-card {
		border-radius: 20px;
		border: 1px solid;
		padding: 36px;
		margin-bottom: 24px;
	}

	/* Drapeau décoratif */
	.flag-large {
		display: flex;
		width: 56px;
		height: 35px;
		border-radius: 6px;
		overflow: hidden;
		margin-bottom: 20px;
		border: 1px solid;
	}

	.flag-stripe {
		flex: 1;
	}

	.about-title {
		font-size: 28px;
		font-weight: 800;
		color: var(--ci-orange, #FF8C00);
		margin: 0 0 16px;
	}

	.about-text {
		font-size: 15px;
		line-height: 1.8;
		margin: 0 0 16px;
	}

	.about-text:last-child {
		margin-bottom: 0;
	}

	/* Grille info (équipe + stack) */
	.info-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		margin-bottom: 24px;
	}

	.info-card {
		border-radius: 16px;
		border: 1px solid;
		padding: 24px;
	}

	.info-label {
		font-size: 10px;
		margin: 0 0 14px;
		text-transform: uppercase;
		letter-spacing: 1.5px;
	}

	/* Membres de l'équipe */
	.member {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.mb-12 {
		margin-bottom: 12px;
	}

	.member-avatar {
		width: 32px;
		height: 32px;
		border-radius: 8px;
		background: linear-gradient(135deg, var(--ci-orange, #FF8C00), var(--ci-green, #009E49));
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFF;
		font-size: 11px;
		font-weight: 700;
	}

	.member-name {
		font-size: 13px;
		font-weight: 600;
		margin: 0;
	}

	.member-role {
		font-size: 10px;
		margin: 0;
	}

	/* Stack technique */
	.tech-item {
		padding: 8px 12px;
		border-radius: 8px;
		border: 1px solid;
	}

	.mb-6 {
		margin-bottom: 6px;
	}

	.tech-name {
		font-size: 12px;
		font-weight: 500;
		color: var(--ci-green, #009E49);
	}

	/* Open source */
	.open-source {
		text-align: center;
		padding: 16px;
		border-radius: 12px;
		border: 1px solid;
	}

	.open-source-text {
		font-size: 12px;
		margin: 0;
	}

	.highlight-orange {
		color: var(--ci-orange, #FF8C00);
		font-weight: 600;
	}

	.highlight-green {
		color: var(--ci-green, #009E49);
		font-weight: 600;
	}

	/* === Responsive — Grille 1 colonne sur mobile === */

	/* Tablette — padding réduit */
	@media (max-width: 768px) {
		.about {
			padding: 28px 20px 40px;
		}

		.about-card {
			padding: 24px;
		}
	}

	/* Mobile — grille 1 colonne, tailles réduites */
	@media (max-width: 640px) {
		.about {
			padding: 20px 12px 40px;
		}

		.about-card {
			padding: 20px;
			border-radius: 14px;
		}

		.about-title {
			font-size: 22px;
		}

		.about-text {
			font-size: 13px;
			line-height: 1.7;
		}

		/* Grille équipe/stack en 1 colonne */
		.info-grid {
			grid-template-columns: 1fr;
		}

		.info-card {
			padding: 18px;
			border-radius: 12px;
		}
	}
</style>
