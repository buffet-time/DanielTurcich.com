<script lang="ts" src="./soundGenerator.ts"></script>

<template>
	<div bg-variant="secondary" class="card">
		<div class="card-body">
			<div class="frequency-ranges">
				<div v-if="generatorType === 'Frequency'" class="frequency-range">
					<label for="range-1">Frequency: {{ frequency }}</label>
					<input
						v-once
						id="range-1"
						v-model="frequency"
						class="frequency-range form-range disable-select"
						type="range"
						min="10"
						max="22000"
						step="10"
					/>
				</div>

				<div v-else-if="generatorType === 'Note'" class="note-range">
					<label for="range-1">
						Note/ Frequency: {{ noteName }}<sub>{{ noteOctave }}</sub> /
						{{ frequency }}
					</label>
					<input
						v-once
						id="range-1"
						v-model="noteOffset"
						class="frequency-range form-range disable-select"
						type="range"
						min="-57"
						max="68"
						step="1"
					/>
				</div>

				<div class="volume-range">
					<label for="range-1">Volume: {{ toPercent(volume) }}%</label>
					<input
						v-once
						id="range-1"
						v-model="volume"
						class="volume-range form-range disable-select"
						type="range"
						min="0"
						max="1"
						step="0.0005"
					/>
				</div>

				<select v-model="oscillatorType" class="form-select disable-select">
					<option value="sawtooth">Sawtooth</option>
					<option selected value="sine">Sine</option>
					<option value="square">Square</option>
					<option value="triangle">Triangle</option>
				</select>
			</div>

			<div class="button-container">
				<button class="btn btn-secondary" @click="frequencyButton()">
					<template v-if="started">Stop</template>
					<template v-else>Start</template>
				</button>
			</div>
		</div>
	</div>
</template>
