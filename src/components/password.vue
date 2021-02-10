<script lang="ts" src="./password.ts"></script>

<template>
	<div>
		<h1 class="password-title" v-once>Password Generator</h1>

		<div class="password-generator-options">
			<div>
				<label for="range-1">Password Length: {{ passwordLength }}</label>
				<br />
				<input
					class="password-length-range form-range"
					id="range-1"
					v-model="passwordLength"
					type="range"
					min="1"
					max="128"
					v-once
				/>
			</div>

			<div class="password-generator-checkboxes" v-once>
				<div class="form-check">
					<input
						v-model="excludeLowercase"
						class="form-check-input"
						type="checkbox"
						id="lowercase"
					/>
					<label class="form-check-label" for="lowercase">
						Exclude Lowercase Letters
					</label>
				</div>

				<div class="form-check">
					<input
						v-model="excludeUppercase"
						class="form-check-input"
						type="checkbox"
						id="uppercase"
					/>
					<label class="form-check-label" for="uppercase">
						Exclude Uppercase Letters
					</label>
				</div>

				<div class="form-check">
					<input
						v-model="excludeNumbers"
						class="form-check-input"
						type="checkbox"
						id="numbers"
					/>
					<label class="form-check-label" for="numbers">
						Exclude Numbers
					</label>
				</div>

				<div class="form-check">
					<input
						v-model="excludeSymbols"
						class="form-check-input"
						type="checkbox"
						id="symbols"
					/>
					<label class="form-check-label" for="symbols">
						Exclude Symbols
					</label>
				</div>
			</div>
			<br />
			<button
				class="password-generate-button btn btn-secondary"
				@click="generatePassword"
				v-once
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
	</div>
</template>

<style>
.password-title {
	user-select: none;
	margin-top: 8px;
}

.password-length-range {
	position: relative;
	display: inline-block;
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
	position: relative;
	display: inline-block;
	margin: 24px;
	margin-top: 8px;
	margin-bottom: 8px;
}

.password-copy-button {
	position: relative;
	display: inline-block;
	margin-left: 5px;
}
</style>
