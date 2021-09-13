<script lang="ts" src="./frequency.ts"></script>

<template>
	<h1 v-once class="frequency-title disable-select">
		Frequency Sound Generator
	</h1>

	<div class="options-div">
		<label for="range-1">Frequency: {{ frequency }}</label>
		<br />
		<input
			v-once
			id="range-1"
			v-model="frequency"
			class="frequency-range form-range"
			type="range"
			min="10"
			max="22000"
			step="10"
		/>
		<br />

		<label for="range-1">Volume: {{ volume }}</label>
		<br />
		<input
			v-once
			id="range-1"
			v-model="volume"
			class="volume-range form-range disable-select"
			type="range"
			min="0"
			max="0.5"
			step="0.0001"
		/>
	</div>

	<select v-model="oscillatorType" class="form-select">
		<option value="sawtooth">Sawtooth</option>
		<option selected value="sine">Sine</option>
		<option value="square">Square</option>
		<option value="triangle">Triangle</option>
	</select>

	<button class="btn btn-secondary" @click="frequencyButton()">
		<template v-if="started">Stop</template>
		<template v-else>Start</template>
	</button>
</template>

<style>
.frequency-title {
	margin-top: 8px;
}

.options-div {
	width: 80%;
	margin: 0 auto;
}

.form-select {
	margin: 0 auto;
	width: 400px;
	margin-bottom: 8px;
}
</style>
