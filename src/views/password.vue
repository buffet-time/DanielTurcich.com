<script setup lang="ts">
import { ref } from 'vue'

// Public variables
const passwordLength = ref(16)
const excludeLowercase = ref(false)
const excludeUppercase = ref(false)
const excludeNumbers = ref(false)
const excludeSymbols = ref(false)
const textToShow = ref('')
const password = ref('')

// Local variables
// prettier-ignore
const lowercaseLetters = [
	'a','b','c', 'd', 'e','f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
	'n','o', 'p', 'q', 'r', 's','t','u','v', 'w', 'x', 'y', 'z'
]
// prettier-ignore
const	uppercaseLetters = [
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
	'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]
// prettier-ignore
const	numbers = [
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
]
// prettier-ignore
const	symbols = [
	'!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',',
	'-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\',
	']', '^', '_', '`', '{', '|', '}', '~'
]

function generatePassword() {
	password.value = ''

	const passwordCharacters = ['']

	if (!excludeLowercase.value) {
		passwordCharacters.push(...lowercaseLetters)
	}
	if (!excludeUppercase.value) {
		passwordCharacters.push(...uppercaseLetters)
	}
	if (!excludeNumbers.value) {
		passwordCharacters.push(...numbers)
	}
	if (!excludeSymbols.value) {
		passwordCharacters.push(...symbols)
	}

	for (let i = 0; i < passwordLength.value; i++) {
		password.value +=
			passwordCharacters[Math.floor(Math.random() * passwordCharacters.length)]
	}

	textToShow.value = password.value
}

function copyPassword() {
	navigator.clipboard.writeText(password.value)
}
</script>

<template>
	<div class="flex flex-col">
		<h1 v-once class="m-4 text-2xl font-semibold">Password Generator</h1>

		<div class="flex flex-col justify-center items-center">
			<div class="flex flex-col mb-2">
				<label class="inline-block" for="range-1">
					Password Length: {{ passwordLength }}
				</label>
				<input
					v-once
					id="range-1"
					v-model="passwordLength"
					class="w-64 h-6 bg-transparent"
					type="range"
					min="1"
					max="128"
				/>
			</div>

			<div v-once class="flex flex-col items-center justify-center">
				<div class="pl-6">
					<input
						id="lowercase"
						v-model="excludeLowercase"
						class="rounded w-4 h-4 bg-white"
						type="checkbox"
					/>
					<label for="lowercase"> Exclude Lowercase Letters </label>
				</div>

				<div class="pl-6">
					<input
						id="uppercase"
						v-model="excludeUppercase"
						class="rounded w-4 h-4 bg-white"
						type="checkbox"
					/>
					<label for="uppercase"> Exclude Uppercase Letters </label>
				</div>

				<div class="pl-6">
					<input
						id="numbers"
						v-model="excludeNumbers"
						class="rounded w-4 h-4 bg-white"
						type="checkbox"
					/>
					<label for="numbers"> Exclude Numbers </label>
				</div>

				<div class="pl-6">
					<input
						id="symbols"
						v-model="excludeSymbols"
						class="rounded w-4 h-4 bg-white"
						type="checkbox"
					/>
					<label for="symbols"> Exclude Symbols </label>
				</div>
			</div>
			<button v-once class="mt-4 tw-button" @click="generatePassword">
				Generate
			</button>
		</div>

		<div class="m-4">
			<div class="mb-4">{{ textToShow }}</div>
			<button
				v-show="password.length > 0"
				class="tw-button"
				@click="copyPassword"
			>
				Copy
			</button>
		</div>
	</div>
</template>
