<script setup lang="ts">
import {
	type GeneratorOscillatorType,
	type Note,
	type Generator
} from '../../types/Typings'
import { onBeforeUnmount, type Ref, ref, watch } from 'vue'
import { closeSvg } from '../../assets/svgs'

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
const noteName = ref('A') as Ref<Note>
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
// prettier-ignore
const notes: Note[] = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B']

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

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
	oscillator?.disconnect()
})

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
		} else {
			if (noteIndex === 0) {
				noteOctave.value--
				noteIndex = 11
			} else {
				noteIndex--
			}
		}
		noteName.value = notes[noteIndex]
		difference--
	} while (difference > 0)
}

function updateNoteFrequency() {
	frequency.value = parseFloat(
		// From here: https://pages.mtu.edu/~suits/NoteFreqCalcs.html
		(fixedNote * twelthRoot ** noteOffset.value).toFixed(4)
	)
	oscillator.frequency.setValueAtTime(frequency.value, audioContext.currentTime)
}
</script>

<template>
	<div class="tw-card bg-[#424242] p-4 w-4/5">
		<svg
			class="h-6 float-right cursor-pointer"
			viewBox="0 0 24 24"
			@click="$emit('deleteGenerator')"
		>
			<path fill="currentColor" :d="closeSvg" />
		</svg>

		<div class="flex flex-col">
			<div class="m-0 p-4">
				<div v-if="generator.generatorType === 'Frequency'">
					<label for="range-1"> Frequency: {{ frequency }} </label>
					<input
						id="range-1"
						v-model="frequency"
						class="w-full h-6 bg-transparent"
						type="range"
						min="10"
						max="22000"
						step="10"
					/>
				</div>

				<!-- @input="$emit('updateSettings', 'frequency', ($event.target! as any).value)" -->

				<div v-else-if="generator.generatorType === 'Note'">
					<label class="h-6" for="range-1">
						Note/ Frequency: {{ noteName }} <sub>{{ noteOctave }}</sub> /
						{{ frequency }}
					</label>
					<input
						id="range-1"
						v-model="noteOffset"
						class="w-full h-6 bg-transparent"
						type="range"
						min="-57"
						max="68"
						step="1"
					/>
				</div>

				<div>
					<label for="range-1"> Volume: {{ toPercent(volume) }}% </label>
					<input
						id="range-1"
						v-model="volume"
						class="w-full h-6 bg-transparent"
						type="range"
						min="0"
						max="1"
						step="0.0005"
					/>
				</div>

				<select
					v-model="oscillatorType"
					class="pt-2 pr-9 pb-2 pl-3 text-black border border-solid border-[#ced4da] rounded my-0 mx-auto flex justify-center"
				>
					<option value="sawtooth">Sawtooth</option>
					<option selected value="sine">Sine</option>
					<option value="square">Square</option>
					<option value="triangle">Triangle</option>
				</select>
			</div>

			<div class="flex justify-center">
				<button class="tw-button" @click="startStopButton">
					<template v-if="started">Stop</template>
					<template v-else>Start</template>
				</button>
			</div>
		</div>
	</div>
</template>
