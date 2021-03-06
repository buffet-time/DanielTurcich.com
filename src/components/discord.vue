<script lang="ts" src="./discord.ts"></script>

<template>
	<div>
		<h1 v-once class="discord-title">Discord Max Message Generator</h1>
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
			<div class="discord-text-div">{{ textToShow }}</div>
			<button
				v-show="discordText.length > 0"
				class="btn btn-secondary"
				@click="copydiscord"
			>
				Copy
			</button>
		</div>
	</div>
</template>

<style>
.discord-title {
	user-select: none;
	margin-top: 8px;
}

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
