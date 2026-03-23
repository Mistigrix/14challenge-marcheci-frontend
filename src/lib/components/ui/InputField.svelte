<!--
  InputField — Champ de saisie stylisé pour les formulaires MarchéCI
  Utilisé dans le checkout (adresse de livraison).

  Props :
  - label : libellé affiché au-dessus du champ
  - value : valeur bindée du champ (bindable)
  - placeholder : texte indicatif
-->
<script>
	import { themeColors } from '$lib/stores/theme.js';
	import { CI_ORANGE } from '$lib/utils/colors.js';

	/** @type {string} Libellé du champ */
	let { label, value = $bindable(''), placeholder = '' } = $props();

	const colors = $derived($themeColors);

	/** Mise en surbrillance du bord au focus */
	let focused = $state(false);
</script>

<div class="field">
	<label
		class="field-label"
		style="color: {colors.textSecondary};"
	>
		{label}
	</label>
	<input
		bind:value
		{placeholder}
		class="field-input"
		style="
			border-color: {focused ? CI_ORANGE : colors.border};
			background: {colors.inputBg};
			color: {colors.textPrimary};
		"
		onfocus={() => (focused = true)}
		onblur={() => (focused = false)}
	/>
</div>

<style>
	.field {
		margin-bottom: 14px;
	}

	.field-label {
		font-size: 10px;
		font-weight: 500;
		display: block;
		margin-bottom: 6px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.field-input {
		width: 100%;
		padding: 11px 14px;
		border-radius: 10px;
		border: 1px solid;
		font-size: 13px;
		outline: none;
		box-sizing: border-box;
		font-family: 'DM Sans', sans-serif;
		transition: border-color 0.2s ease;
	}
</style>
