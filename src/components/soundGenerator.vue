<script lang="ts" src="./soundGenerator.ts"></script>

<template>
	<div bg-variant="secondary" class="card">
		<div class="card-body">
			<!-- abstract delete button svg -->
			<svg class="delete-button" viewBox="0 0 24 24" @click="deleteGenerator()">
				<path fill="currentColor" :d="closeSvg" />
			</svg>

			<div class="frequency-ranges">
				<div
					v-if="generatorSettings.generatorType === 'Frequency'"
					class="frequency-range"
				>
					<label for="range-1">
						Frequency: {{ generatorSettings.frequency }}
					</label>
					<input
						v-once
						id="range-1"
						v-model="generatorSettings.frequency"
						class="frequency-range form-range disable-select"
						type="range"
						min="10"
						max="22000"
						step="10"
					/>
				</div>
				<div
					v-else-if="generatorSettings.generatorType === 'Note'"
					class="note-range"
				>
					<label for="range-1">
						Note/ Frequency: {{ generatorSettings.noteName
						}}<sub>{{ generatorSettings.noteOctave }}</sub> /
						{{ generatorSettings.frequency }}
					</label>
					<input
						v-once
						id="range-1"
						v-model="generatorSettings.noteOffset"
						class="frequency-range form-range disable-select"
						type="range"
						min="-57"
						max="68"
						step="1"
					/>
				</div>

				<div class="volume-range">
					<label for="range-1">
						Volume: {{ toPercent(generatorSettings.volume) }}%
					</label>
					<input
						v-once
						id="range-1"
						v-model="generatorSettings.volume"
						class="volume-range form-range disable-select"
						type="range"
						min="0"
						max="1"
						step="0.0005"
					/>
				</div>

				<select
					v-model="generatorSettings.oscillatorType"
					class="form-select disable-select"
				>
					<option value="sawtooth">Sawtooth</option>
					<option selected value="sine">Sine</option>
					<option value="square">Square</option>
					<option value="triangle">Triangle</option>
				</select>
			</div>

			<div class="button-container">
				<button class="btn btn-secondary" @click="startStopButton()">
					<template v-if="started">Stop</template>
					<template v-else>Start</template>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.delete-button {
	height: 24px;
	float: right;
	cursor: pointer;
}

.card {
	margin: 32px;
	margin-bottom: 0px;
}

.frequency-ranges {
	width: 90%;
	margin: 0 auto;
}

.form-select {
	margin: 0 auto;
	width: 125px;
	margin-bottom: 8px;
}

.button-container {
	display: flex;
	justify-content: center;
}
</style>
