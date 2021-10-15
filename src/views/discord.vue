<script setup lang="ts">
import { ref } from 'vue'

// public refs
const discordInput = ref('')
const nitro = ref(false)
const discordText = ref('')

function discordButtonPressed() {
	// TODO: handle no spaces printing properly
	const maxLength = nitro.value ? 4000 : 2000
	const input = discordInput.value.trim() + ' '

	discordText.value = ''
	if (input && discordInput.value.length < maxLength) {
		const inputLength = input.length
		while (inputLength < maxLength) {
			if (discordText.value.length + inputLength > maxLength) {
				break
			}
			discordText.value = discordText.value + input
		}
	}
}
</script>

<template>
	<h1 v-once class="app-title disable-select">Discord Max Message Generator</h1>
	<div class="input-container">
		<div>
			<input
				v-model="discordInput"
				class="discord-input form-control"
				placeholder="Type a word here"
				@keyup.enter="discordButtonPressed"
			/>

			<input
				v-model="nitro"
				class="form-check-input nitro-checkbox"
				type="checkbox"
			/>
			<label v-once class="form-check-label nitro-label" for="flexCheckDefault">
				Nitro?
			</label>
		</div>

		<button
			class="discord-button btn btn-secondary"
			:disabled="discordInput.length < 1"
			@click="discordButtonPressed"
		>
			Generate
		</button>
	</div>

	<div class="generated-text">
		<div class="discord-text-div">{{ discordText }}</div>
		<button
			v-show="discordText.length > 0"
			class="btn btn-secondary"
			@click="navigator.clipboard.writeText(discordText)"
		>
			Copy
		</button>
	</div>
</template>

<style scoped>
.discord-input {
	display: inline-block;
	width: 250px;
}

.discord-button {
	margin-left: 20px;
	margin-top: 12px;
}

.discord-text-div {
	margin: 24px;
	margin-top: 16px;
	margin-bottom: 8px;
}

.nitro-checkbox {
	height: 1.25em;
	width: 1.25em;
	margin: 8px;
	margin-right: 4px;
}
</style>
