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
	for (const [_key, toggle] of Object.entries(PasswordToggles)) {
		if (!toggle.exclude) {
			passwordCharacters += toggle.characters
		}
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
	<div class="flex flex-col justify-center items-center">
		<h1 class="m-4 text-2xl font-semibold">Password Generator</h1>

		<div class="flex flex-col justify-center items-center">
			<div class="flex flex-col justify-center items-center mb-2">
				<label class="inline-block" for="range-1">
					Password Length: {{ passwordLength }}
				</label>
				<input
					id="range-1"
					v-model="passwordLength"
					class="w-64 h-6 bg-transparent"
					type="range"
					min="1"
					max="128"
				/>
			</div>

			<div class="flex flex-col items-center justify-center">
				<div
					v-for="(toggle, index) in PasswordToggles"
					:key="index"
					class="pl-6"
				>
					<input
						id="lowercase"
						v-model="toggle.exclude"
						class="rounded w-4 h-4 bg-white"
						type="checkbox"
					/>
					<label for="lowercase"> {{ toggle.label }} </label>
				</div>
			</div>
			<button class="mt-4 tw-button" @click="generatePassword">Generate</button>
		</div>

		<div class="m-4 flex flex-col justify-center items-center">
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
