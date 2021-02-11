<script lang="ts" src="./acronym.ts"></script>

<template>
	<div>
		<h1 class="acronym-title" v-once>Acronym Generator</h1>
		<input
			class="acronym-input form-control"
			v-model="acronymInput"
			@keyup.enter="acronymButtonPressed"
			placeholder="Type a word here"
			v-once
		/>
		<button
			class="acronym-button btn btn-secondary"
			@click="acronymButtonPressed"
			v-once
		>
			Generate
		</button>
		<div class="generated-text-div">
			<div class="acronym-text-div">{{ textToDisplay }}</div>
			<button
				v-if="buttonPressedState === 'good'"
				class="acronym-copy-button btn btn-secondary"
				@click="copyAcronym"
			>
				Copy
			</button>
		</div>
	</div>
</template>

<style>
.acronym-title {
	user-select: none;
	margin-top: 8px;
}

.acronym-input {
	position: relative;
	display: inline-block;
	width: 250px;
}

.acronym-button {
	position: relative;
	display: inline-block;
	margin-left: 20px;
}

.acronym-text-div {
	position: relative;
	display: inline-block;
	text-transform: capitalize;
	margin: 24px;
	margin-top: 8px;
	margin-bottom: 8px;
}

.acronym-copy-button {
	position: relative;
	display: inline-block;
	margin-left: 5px;
}

.generated-text-div {
	margin-top: 12px;
}

@media screen and (max-width: 400px) {
	.acronym-button {
		margin: 16px auto;
		display: block;
	}
}
</style>
