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
const // prettier-ignore
	lowercaseLetters = [
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
	<h1 v-once class="app-title disable-select">Password Generator</h1>

	<div class="password-generator-options">
		<div>
			<label for="range-1">Password Length: {{ passwordLength }}</label>
			<br />
			<input
				v-once
				id="range-1"
				v-model="passwordLength"
				class="password-length-range form-range"
				type="range"
				min="1"
				max="128"
			/>
		</div>

		<div v-once class="password-generator-checkboxes">
			<div class="form-check">
				<input
					id="lowercase"
					v-model="excludeLowercase"
					class="form-check-input"
					type="checkbox"
				/>
				<label class="form-check-label" for="lowercase">
					Exclude Lowercase Letters
				</label>
			</div>

			<div class="form-check">
				<input
					id="uppercase"
					v-model="excludeUppercase"
					class="form-check-input"
					type="checkbox"
				/>
				<label class="form-check-label" for="uppercase">
					Exclude Uppercase Letters
				</label>
			</div>

			<div class="form-check">
				<input
					id="numbers"
					v-model="excludeNumbers"
					class="form-check-input"
					type="checkbox"
				/>
				<label class="form-check-label" for="numbers"> Exclude Numbers </label>
			</div>

			<div class="form-check">
				<input
					id="symbols"
					v-model="excludeSymbols"
					class="form-check-input"
					type="checkbox"
				/>
				<label class="form-check-label" for="symbols"> Exclude Symbols </label>
			</div>
		</div>
		<br />
		<button
			v-once
			class="password-generate-button btn btn-secondary"
			@click="generatePassword"
		>
			Generate
		</button>
	</div>

	<div class="generated-password">
		<div class="password-text-div">{{ textToShow }}</div>
		<button
			v-show="password.length > 0"
			class="password-copy-button btn btn-secondary"
			@click="copyPassword"
		>
			Copy
		</button>
	</div>
</template>

<style scoped>
.password-length-range {
	width: 300px;
}
.password-generator-options {
	margin-bottom: 16px;
}
.password-generator-checkboxes {
	display: inline-block;
	text-align: left;
}
.password-text-div {
	display: inline-block;
	margin-right: 24px;
	margin-top: 8px;
	margin-bottom: 8px;
}
.password-copy-button {
	margin-left: 5px;
}
.password-generate-button {
	margin-top: 8px;
}
</style>
