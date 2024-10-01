<script setup lang="ts">
import { ref } from 'vue'

// public refs
const discordInput = ref('')
const nitro = ref(false)
const discordText = ref('')

function discordButtonPressed() {
	const maxLength = nitro.value ? 4000 : 2000
	const input = `${discordInput.value.trim()} `

	discordText.value = ''
	if (discordInput.value.length < maxLength) {
		while (input.length < maxLength) {
			if (discordText.value.length + input.length > maxLength) {
				break
			}

			discordText.value = discordText.value + input
		}
	}
}

async function copy() {
	await navigator.clipboard.writeText(discordText.value)
}
</script>

<template>
	<div class="flex flex-col gap-4 mt-4">
		<h1 class="tw-h1">Discord Max Message Generator</h1>

		<div class="flex flex-col justify-center items-center">
			<div class="flex items-center gap-2">
				<input
					v-model="discordInput"
					class="tw-input w-64"
					placeholder="Type a word here"
					@keyup.enter="discordButtonPressed"
				/>
				<div class="flex gap-1">
					<input v-model="nitro" class="tw-checkbox" type="checkbox" />
					<label class="inline-block" for="flexCheckDefault"> Nitro? </label>
				</div>
			</div>

			<button
				class="mt-3 tw-button"
				:disabled="discordInput.length < 1"
				@click="discordButtonPressed"
			>
				Generate
			</button>
		</div>

		<div>
			<div class="m-4">{{ discordText }}</div>
			<button v-show="discordText.length > 0" class="tw-button" @click="copy">
				Copy
			</button>
		</div>
	</div>
</template>
