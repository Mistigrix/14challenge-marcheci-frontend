<!--
  FlagBar — Barre aux couleurs du drapeau ivoirien (orange, blanc, vert)
  Utilisée comme élément décoratif dans le branding MarchéCI.

  Props :
  - width : largeur en pixels (défaut : 32)
  - height : hauteur en pixels (défaut : 3)
-->
<script>
	/** @type {number} Largeur de la barre en pixels */
	let { width = 32, height = 3 } = $props();
</script>

<div
	class="flag-bar"
	style="width: {width}px; height: {height}px;"
>
	<div class="stripe orange"></div>
	<div class="stripe white"></div>
	<div class="stripe green"></div>
</div>

<style>
	.flag-bar {
		display: flex;
		border-radius: 2px;
		overflow: hidden;
	}

	.stripe {
		flex: 1;
	}

	.orange {
		background: var(--ci-orange, #FF8C00);
	}

	.white {
		background: #FFF;
	}

	.green {
		background: var(--ci-green, #009E49);
	}
</style>
