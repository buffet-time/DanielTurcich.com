<script lang="ts" src="./discord.ts"></script>

<template>
	<div>
		<h1 class="discord-title" v-once>Discord Max Message Generator</h1>
		<input
			class="discord-input form-control"
			v-model="discordInput"
			@keyup.enter="discordButtonPressed"
			placeholder="Type a word here"
			v-once
		/>
		<button
			class="discord-button btn btn-secondary"
			@click="discordButtonPressed"
			v-once
		>
			Generate
		</button>
		<div>
			<div class="discord-text-div">{{ textToShow }}</div>
			<button
				v-show="discordText.length > 0"
				class="discord-copy-button btn btn-secondary"
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
	position: relative;
	display: inline-block;
	width: 250px;
}

.discord-button {
	position: relative;
	display: inline-block;
	margin-left: 20px;
}

.discord-text-div {
	position: relative;
	display: inline-block;
	margin: 24px;
	margin-top: 16px;
	margin-bottom: 8px;
}

.discord-copy-button {
	position: relative;
	display: inline-block;
	margin-left: 5px;
}
</style>
