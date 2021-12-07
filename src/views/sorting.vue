<script setup lang="ts">
import { type Ref, ref, watch } from 'vue'
import SortingVisualization from '../components/sortingVisualization.vue'

export type SortingAlgorithm =
	| ''
	| 'Bubble'
	| 'Insertion'
	| 'Cocktail Shaker'
	| 'Selection'
	| 'Merge'
	| 'Quick'
	| 'Heap'
	| 'Shell'
	| 'Gnome'

// TODO:
// Show time to draw and time to execute
// Show array accesses?
// Show swaps?
// Add implementations of WebGL and WebGL2 rendering and a switch for each

// Public
const sleepTime: Ref<number | string> = ref(0)
const volume = ref(0.025)
const stopExecution = ref(false)
const randomizeArray = ref(false)
const disableStopButton = ref(true)
const numberOfRectangles: Ref<number | string> = ref(100)
const disableSortButtons = ref(false)
const disableRandomizeButton = ref(false)
const disableRectangleSlider = ref(false)
// executionTime = ref(0),
const oscillator: Ref<OscillatorNode> = ref() as Ref<OscillatorNode>
const sortingMethod: Ref<SortingAlgorithm> = ref('') as Ref<SortingAlgorithm>
const sorts: Ref<SortingAlgorithm[]> = ref([
	'Bubble',
	'Insertion',
	'Cocktail Shaker',
	'Selection',
	'Merge',
	'Quick',
	'Heap',
	'Shell',
	'Gnome'
	// 'Bitonic Sort'
]) as Ref<SortingAlgorithm[]>

// Private
let audioContext!: AudioContext
let audioIntialized = false
let gainNode!: GainNode
let timestamp = 0

// Watchers
watch(numberOfRectangles, () => {
	intializeAudio()
	disableSortButtons.value = true
})

watch(volume, () => {
	intializeAudio()
	if (disableSortButtons.value) {
		oscillator.value.disconnect()
		gainNode.gain.setValueAtTime(volume.value, audioContext.currentTime)
		oscillator.value.connect(gainNode).connect(audioContext.destination)
	} else {
		gainNode.gain.setValueAtTime(volume.value, audioContext.currentTime)
	}
})

async function stop(): Promise<void> {
	stopExecution.value = true
	oscillator.value.disconnect()
	await sleep(500) // easy safe way to ensure all operations are done
	stopExecution.value = false
	oscillator.value.disconnect()
	sortingMethodEndedBools()
}

// TODO: sorting methods to add
// radix (LSD)
// radix (MSD)
// std::sort (intro sort)
// std::stable_sort (adaptive merge sort)
// bitonic
// comb
// binary insertion
// tim
// Quad
// smooth
// odd even
// bogo

function sleep(time: number) {
	return new Promise((s) => setTimeout(s, time))
}

function sortingMethodStarted() {
	intializeAudio()
	oscillator.value.connect(gainNode).connect(audioContext.destination)
	sortingMethodStartedBools()
	timestamp = Date.now()
}

function sortingMethodEnded() {
	console.log(Date.now() - timestamp)
	sortingMethod.value = ''
	oscillator.value.disconnect()
	sortingMethodEndedBools()
}

function sortingMethodStartedBools() {
	disableRectangleSlider.value = true
	disableRandomizeButton.value = true
	disableSortButtons.value = true
	disableStopButton.value = false
}

function sortingMethodEndedBools() {
	disableRectangleSlider.value = false
	disableRandomizeButton.value = false
	disableSortButtons.value = false
	disableStopButton.value = true
}

// // // // // // //
// Audio Functions
// // // // // // //
function intializeAudio() {
	if (!audioIntialized) {
		audioContext = new AudioContext()

		gainNode = new GainNode(audioContext, {
			gain: volume.value
		})

		oscillator.value = new OscillatorNode(audioContext, {
			type: 'sine',
			frequency: 500
		})

		oscillator.value.start()
		oscillator.value.connect(audioContext.destination)
		oscillator.value.disconnect()
		audioIntialized = true
	}
}

function beep(frequency: number) {
	oscillator.value.frequency.setValueAtTime(frequency, audioContext.currentTime)
}

function audioForRandomizing() {
	intializeAudio()
	oscillator.value.connect(gainNode).connect(audioContext.destination)
	beep(300)
}
</script>

<template>
	<div class="sorting-wrapper">
		<div class="settings">
			<button
				class="sorting-button btn btn-secondary disable-select"
				:disabled="disableStopButton"
				@click="stop"
			>
				Stop Execution
			</button>

			<button
				class="sorting-button btn btn-secondary disable-select"
				:disabled="disableRandomizeButton"
				@click="randomizeArray = true"
			>
				Randomize
			</button>

			<label for="range-1">
				Volume: {{ parseFloat((volume * 5 * 100).toFixed(1)) }}%
			</label>
			<input
				v-once
				id="range-1"
				v-model="volume"
				class="password-length-range form-range disable-select"
				type="range"
				min="0"
				max="0.2"
				step="0.0001"
			/>

			<label for="range-2">Add extra Delay of: {{ sleepTime }}ms</label>
			<input
				v-once
				id="range-2"
				v-model="sleepTime"
				class="password-length-range form-range disable-select"
				type="range"
				min="0"
				max="250"
				step="5"
			/>

			<label for="range-3"> {{ numberOfRectangles }} Rectangles </label>
			<input
				id="range-3"
				v-model="numberOfRectangles"
				class="password-length-range form-range disable-select"
				type="range"
				min="10"
				max="1000"
				step="5"
				:disabled="disableRectangleSlider"
			/>

			<button
				v-for="(algorithm, index) in sorts"
				:key="index"
				class="sorting-button btn btn-secondary disable-select"
				:disabled="disableSortButtons"
				@click="sortingMethod = algorithm"
			>
				{{ algorithm }}
			</button>
		</div>
		<SortingVisualization
			:sleep-time="sleepTime"
			:oscillator="oscillator"
			:sorting-method="sortingMethod"
			:stop-execution="stopExecution"
			:randomize-array="randomizeArray"
			:number-of-rectangles="numberOfRectangles"
			@sorting-method-started-bools="sortingMethodStartedBools"
			@sorting-method-ended-bools="sortingMethodEndedBools"
			@sorting-method-started="sortingMethodStarted"
			@audio-for-randomizing="audioForRandomizing"
			@sorting-method-ended="sortingMethodEnded"
			@randomize-array-done="randomizeArray = false"
			@beep="beep"
		/>
	</div>
</template>

<style scoped>
.sorting-wrapper {
	height: calc(100vh - 60px);
	display: flex;
}
.settings {
	flex: 0 0 300px;
	align-self: center;
}
.sorting-button {
	margin-right: 8px;
	margin-bottom: 8px;
	height: 50px;
	width: 43%;
	line-height: normal;
}
.password-length-range {
	width: 280px;
}
</style>
