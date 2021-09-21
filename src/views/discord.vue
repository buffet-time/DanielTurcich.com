<script lang="ts" src="./discord.ts"></script>

<template>
	<h1 v-once class="app-title disable-select">Discord Max Message Generator</h1>
	<input
		v-once
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
