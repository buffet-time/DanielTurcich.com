<script setup lang="ts">
import { ref } from 'vue'

const discordInput = ref('')
const discordText = ref('')
const reviewsText = ref('')

// TODO: handle no spaces printing properly
function discordButtonPressed() {
	discordText.value = ''
	reviewsText.value = ''
	if (discordInput.value && discordInput.value.length < 2000) {
		const inputLength = discordInput.value.length
		while (inputLength < 2000) {
			if (discordText.value.length + inputLength > 2000) {
				reviewsText.value = discordText.value
				break
			}
			discordText.value = discordText.value + discordInput.value
		}
	}
}

function copydiscord() {
	navigator.clipboard.writeText(discordText.value)
}
</script>

<template>
	<h1 v-once class="app-title disable-select">Discord Max Message Generator</h1>
	<input
		v-model="discordInput"
		class="discord-input form-control"
		placeholder="Type a word here"
		@keyup.enter="discordButtonPressed"
	/>
	<button
		v-once
		class="discord-button btn btn-secondary"
		@click="discordButtonPressed"
	>
		Generate
	</button>
	<div>
		<div class="discord-text-div">{{ reviewsText }}</div>
		<button
			v-show="discordText.length > 0"
			class="btn btn-secondary"
			@click="copydiscord"
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
}

.discord-text-div {
	margin: 24px;
	margin-top: 16px;
	margin-bottom: 8px;
}
</style>
