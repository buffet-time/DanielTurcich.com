<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Public
const acronymInput = ref('')
const showButton = ref(false)
const textToDisplay = ref('')

// Private
let words: { [key: string]: string[] }
let acronymText = ''

function copyAcronym() {
	navigator.clipboard.writeText(acronymText)
}

function acronymButtonPressed() {
	if (!acronymInput.value) {
		return
	}

	acronymInput.value = acronymInput.value.trim()

	if (acronymInput.value.length < 2) {
		showButton.value = false
		textToDisplay.value = 'There can not be spaces in the input.'
	} else {
		acronymText = getWordsFromProvidedAcronym(acronymInput.value)
		showButton.value = true
		textToDisplay.value = acronymText
	}
}

function getWordsFromProvidedAcronym(acronym: string) {
	const massagedAcronym = acronym.toLowerCase().split('')

	return massagedAcronym.reduce(
		(previousValue: string, currentLetter: string) => {
			const randomIndex = Math.floor(
				Math.random() * words[currentLetter].length
			)
			return `${previousValue} ${words[currentLetter][randomIndex]}`
		},
		''
	)
}

onMounted(async () => {
	try {
		const { default: acronymWords } = await import(
			'../assets/acronymWords.json'
		)
		words = acronymWords
	} catch (error) {
		console.error('You need to update your browser.')
	}
})
</script>

<template>
	<div class="tw-flex-col-center gap-4">
		<h1 class="mt-4 tw-h1">Acronym Generator</h1>

		<div class="flex gap-4">
			<input
				v-model="acronymInput"
				class="tw-input"
				placeholder="Type a word here"
				@keyup.enter="acronymButtonPressed"
			/>
			<button class="tw-button w-24" @click="acronymButtonPressed">
				Generate
			</button>
		</div>

		<div class="tw-flex-col-center gap-4">
			<div class="capitalize">{{ textToDisplay }}</div>
			<button v-if="showButton" class="tw-button w-24" @click="copyAcronym">
				Copy
			</button>
		</div>
	</div>
</template>
