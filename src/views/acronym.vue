<script lang="ts" src="./acronym.ts"></script>

<template>
	<h1 v-once class="app-title disable-select">Acronym Generator</h1>
	<input
		v-once
		v-model="acronymInput"
		class="acronym-input form-control"
		placeholder="Type a word here"
		@keyup.enter="acronymButtonPressed"
	/>
	<button
		v-once
		class="acronym-button btn btn-secondary"
		@click="acronymButtonPressed"
	>
		Generate
	</button>
	<div class="generated-text-div">
		<div class="acronym-text-div">{{ textToDisplay }}</div>
		<button
			v-if="buttonPressedState === 'good'"
			class="btn btn-secondary"
			@click="copyAcronym"
		>
			Copy
		</button>
	</div>
</template>

<style>
.acronym-input {
	display: inline-block;
	width: 250px;
}

.acronym-button {
	margin-left: 20px;
}

.acronym-text-div {
	display: inline-block;
	text-transform: capitalize;
	margin: 24px;
	margin-top: 8px;
	margin-bottom: 8px;
}

.generated-text-div {
	margin-top: 12px;
}

@media screen and (max-width: 400px) {
	.acronym-button {
		margin: 16px auto;
		display: block;
	}
}
</style>
