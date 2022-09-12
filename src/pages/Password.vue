<script setup lang="ts">
import { type PasswordToggle } from '../types/Typings'
import { ref } from 'vue'

const passwordLength = ref(16)
const textToShow = ref('')
const password = ref('')

const PasswordToggles: PasswordToggle = {
	lowercase: {
		exclude: false,
		characters: 'abcdefghijklmnopqrstuvwxyz',
		label: 'Exclude Lowercase Letters'
	},
	uppercase: {
		exclude: false,
		characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		label: 'Exclude Uppercase Letters'
	},
	numbers: {
		exclude: false,
		characters: '0123456789',
		label: 'Exclude Numbers'
	},
	symbols: {
		exclude: false,
		characters: '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
		label: 'Exclude Symbols'
	}
}

function generatePassword() {
	password.value = ''
	let passwordCharacters = ''

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	Object.entries(PasswordToggles).forEach(([_key, toggle]) => {
		if (!toggle.exclude) {
			passwordCharacters += toggle.characters
		}
	})

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
	<h1 class="m-4 text-2xl font-semibold">Password Generator</h1>

	<div>
		<div class="tw-flex-col-center mb-2">
			Password Length: {{ passwordLength }}
			<input
				v-model="passwordLength"
				class="w-64 h-6 bg-transparent"
				type="range"
				min="1"
				max="128"
			/>
		</div>

		<div class="flex flex-col items-center justify-center">
			<div v-for="(toggle, index) in PasswordToggles" :key="index" class="pl-6">
				<input
					v-model="toggle.exclude"
					class="rounded w-4 h-4 bg-white"
					type="checkbox"
				/>
				{{ toggle.label }}
			</div>
		</div>
		<button class="mt-4 tw-button" @click="generatePassword">Generate</button>
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
</template>
