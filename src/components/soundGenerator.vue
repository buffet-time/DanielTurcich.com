<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { onBeforeUnmount, Ref, ref, watch } from 'vue'
import { closeSvg } from '../svgs'
import { Generator, GeneratorOscillatorType } from '../typings'

defineEmits<{
	(e: 'deleteGenerator'): void
}>()

const props = defineProps<{
	generator: Generator
}>()

// Public Refs
const volume = ref(0.07)
const frequency = ref(440)
const oscillatorType = ref('sine') as Ref<GeneratorOscillatorType>
const noteName = ref('')
const noteOctave = ref(4)
const noteOffset = ref(0)
const started = ref(false)

// Private Variables
let audioContext!: AudioContext
let oscillator!: OscillatorNode
let gainNode!: GainNode
let initialized = false
let difference = 0
let noteIndex = 9

const twelthRoot = 2 ** (1 / 12)
const fixedNote = 440 // Standard tuning frequency of A4 for 12 tone equal temperment
const notes = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B']

if (props.generator.generatorType === 'Frequency') {
	watch(frequency, () => {
		if (!initialized) {
			initializeContext()
		}

		oscillator.frequency.setValueAtTime(
			frequency.value,
			audioContext.currentTime
		)
	})
} else {
	watch(noteOffset, (newValue, previousValue) => {
		if (!initialized) {
			initializeContext()
		}

		difference = newValue - previousValue!
		updateNoteFrequency()

		if (difference > 0) {
			incrementNote('Up')
		} else {
			// get absolute value of the difference when its negative
			// so we can easily recursive call in incrementNote()
			difference = Math.abs(difference)
			incrementNote('Down')
		}
	})
}

watch(volume, () => {
	if (!initialized) {
		initializeContext()
	}

	if (started.value) {
		oscillator.disconnect()
		gainNode.gain.setValueAtTime(volume.value, audioContext.currentTime)
		oscillator.connect(gainNode).connect(audioContext.destination)
	} else {
		gainNode.gain.setValueAtTime(volume.value, audioContext.currentTime)
	}
})

watch(oscillatorType, () => {
	if (!initialized) {
		initializeContext()
	}

	if (started.value) {
		oscillator.disconnect()
		oscillator.type = oscillatorType.value
		oscillator.connect(gainNode).connect(audioContext.destination)
	} else {
		oscillator.type = oscillatorType.value
	}
})

// Lifecycle Hooks
onBeforeUnmount(() => {
	if (started.value) {
		oscillator.disconnect()
	}
})

// Methods
function startStopButton() {
	started.value = !started.value
	if (!initialized) {
		initializeContext()
	}

	if (started.value) {
		oscillator.connect(gainNode).connect(audioContext.destination)
	} else {
		oscillator.disconnect()
	}
}

function toPercent(value: number) {
	return parseFloat((value * 2 * 100).toFixed(1))
}

function initializeContext() {
	// Audio contexts must be created by user gesture
	// so if this is the first press of the button create the contexts and if not ignore
	audioContext = new AudioContext()

	gainNode = new GainNode(audioContext, {
		gain: volume.value
	})

	oscillator = new OscillatorNode(audioContext, {
		type: oscillatorType.value,
		frequency: frequency.value
	})

	oscillator.start()
	oscillator.connect(audioContext.destination)
	oscillator.disconnect()
	initialized = true
}

function incrementNote(increment: 'Up' | 'Down') {
	do {
		if (increment === 'Up') {
			if (noteIndex === 11) {
				noteOctave.value++
				noteIndex = 0
			} else {
				noteIndex++
			}
			noteName.value = notes[noteIndex]
		} else {
			if (noteIndex === 0) {
				noteOctave.value--
				noteIndex = 11
			} else {
				noteIndex--
			}
			noteName.value = notes[noteIndex]
		}
		difference--
	} while (difference > 0)
}

function updateNoteFrequency() {
	// From here: https://pages.mtu.edu/~suits/NoteFreqCalcs.html
	const updatedFrequency = parseFloat(
		(fixedNote * twelthRoot ** noteOffset.value).toFixed(4)
	)

	frequency.value = updatedFrequency
	oscillator.frequency.setValueAtTime(
		updatedFrequency,
		audioContext.currentTime
	)
}
</script>

<template>
	<div bg-variant="secondary" class="card">
		<div class="card-body">
			<!-- abstract delete button svg -->
			<svg
				class="delete-button"
				viewBox="0 0 24 24"
				@click="$emit('deleteGenerator')"
			>
				<path fill="currentColor" :d="closeSvg" />
			</svg>

			<div class="frequency-ranges">
				<div
					v-if="generator.generatorType === 'Frequency'"
					class="frequency-range"
				>
					<label for="range-1"> Frequency: {{ frequency }} </label>
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

				<!-- @input="$emit('updateSettings', 'frequency', ($event.target! as any).value)" -->

				<div v-else-if="generator.generatorType === 'Note'" class="note-range">
					<label class="current-note-label" for="range-1">
						Note/ Frequency: {{ noteName }} <sub>{{ noteOctave }}</sub> /
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
					<label for="range-1"> Volume: {{ toPercent(volume) }}% </label>
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
				<button class="btn btn-secondary" @click="startStopButton">
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

.current-note-label {
	height: 22px;
}
</style>
