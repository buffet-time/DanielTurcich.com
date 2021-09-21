<script lang="ts" src="./soundGenerator.ts"></script>

<template>
	<div bg-variant="secondary" class="card">
		<div class="card-body">
			<!-- abstract delete button svg -->
			<svg class="delete-button" viewBox="0 0 24 24" @click="deleteGenerator()">
				<path
					fill="currentColor"
					d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
				/>
			</svg>

			<div class="frequency-ranges">
				<div
					v-if="generatorSettings.generatorType === 'Frequency'"
					class="frequency-range"
				>
					<label for="range-1"
						>Frequency: {{ generatorSettings.frequency }}</label
					>
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
					<label for="range-1"
						>Volume: {{ toPercent(generatorSettings.volume) }}%</label
					>
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
</style>
