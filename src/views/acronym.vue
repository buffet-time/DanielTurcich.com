<script setup lang="ts">
import { ref } from 'vue'
import { default as acronymWords } from '../acronymWords.json'

// Public
const acronymInput = ref('')
const buttonPressedState = ref('')
const textToDisplay = ref('')

// Private
const words: { [key: string]: string[] } = acronymWords
let acronymText = ''

function copyAcronym() {
	navigator.clipboard.writeText(acronymText)
}

// TODO: flesh out errors
function acronymButtonPressed() {
	if (!acronymInput.value) {
		return
	}

	acronymInput.value = acronymInput.value.trim()

	if (acronymInput.value.length < 2) {
		buttonPressedState.value = 'error'
		textToDisplay.value = 'There can not be spaces in the input.'
	} else {
		acronymText = getWordsFromProvidedAcronym(acronymInput.value)
		buttonPressedState.value = 'good'
		textToDisplay.value = acronymText
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
	<div class="flex flex-col justify-center items-center">
		<h1 v-once class="m-4 text-2xl font-semibold">Acronym Generator</h1>
		<div class="flex justify-center items-center">
			<input
				v-model="acronymInput"
				class="inline-block w-64 rounded-md border text-gray-900 border-gray-300 border-solid px-3 py-2"
				placeholder="Type a word here"
				@keyup.enter="acronymButtonPressed"
			/>
			<button
				class="ml-2 cursor-pointer text-white bg-gray-500 border-gray-500 rounded px-3 py-2"
				@click="acronymButtonPressed"
			>
				Generate
			</button>
		</div>
		<div class="mt-3">
			<div class="capitalize m-2">{{ textToDisplay }}</div>
			<button
				v-if="buttonPressedState === 'good'"
				class="cursor-pointer text-white bg-gray-500 border-gray-500 rounded px-3 py-2"
				@click="copyAcronym"
			>
				Copy
			</button>
		</div>
	</div>
</template>
