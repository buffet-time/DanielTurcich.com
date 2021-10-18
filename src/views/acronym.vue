<script setup lang="ts">
import { ref } from 'vue'
import { default as acronymWords } from '../acronymWords.json'

// Public
const acronymInput = ref(''),
	buttonPressedState = ref(''),
	textToDisplay = ref('')

// Private
const words: { [key: string]: string[] } = acronymWords
let acronymText = ''

function copyAcronym() {
	navigator.clipboard.writeText(acronymText)
}

function acronymButtonPressed() {
	if (acronymInput.value) {
		if (acronymInput.value.split(' ').length > 1) {
			buttonPressedState.value = 'error'
			textToDisplay.value = 'There can not be spaces in the input.'
		} else {
			acronymText = getWordsFromProvidedAcronym(acronymInput.value)
			buttonPressedState.value = 'good'
			textToDisplay.value = acronymText
		}
	} else {
		buttonPressedState.value = 'error'
		textToDisplay.value = 'Must type a word to generate an acronym.'
	}
}

function getWordsFromProvidedAcronym(acronym: string) {
	return acronym
		.toLowerCase()
		.split('')
		.reduce(
			(previousValue: string, currentLetter: string) =>
				`${previousValue} ${
					words[currentLetter][
						Math.floor(Math.random() * words[currentLetter].length)
					]
				}`,
			''
		)
}
</script>

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

<style scoped>
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
