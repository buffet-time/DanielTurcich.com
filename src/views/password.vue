<script lang="ts" src="./password.ts"></script>

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

<style>
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
