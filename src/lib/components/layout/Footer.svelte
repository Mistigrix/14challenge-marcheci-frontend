<!--
  Footer — Pied de page avec mention du challenge
-->
<script>
	import { themeColors } from '$lib/stores/theme.js';

	const colors = $derived($themeColors);
</script>

<footer
	class="footer"
	style="border-top: 1px solid {colors.border};"
>
	<p class="footer-text" style="color: {colors.textDim};">
		CHALLENGE 14-14-14 // JOUR 11 // MARS 2026
	</p>
</footer>

<style>
	.footer {
		padding: 16px 40px;
		text-align: center;
	}

	.footer-text {
		font-size: 10px;
		margin: 0;
		letter-spacing: 1px;
	}
</style>
