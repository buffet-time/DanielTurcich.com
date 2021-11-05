<script setup lang="ts">
import { SortingAlgorithm } from '../typings'
import { Ref, ref, watch } from 'vue'
import SortingVisualization from '../components/sortingVisualization.vue'

// TODO:
// Show time to draw and time to execute
// Show array accesses?
// Show swaps?
// Break this down into components/ more TS files // hopw to do this optimally?
// Add implementations of WebGL and WebGL2 rendering and a switch for each

// Public
const sleepTime = ref(0),
	volume = ref(0.025),
	stopExecution = ref(false),
	randomizeArray = ref(false),
	disableStopButton = ref(true),
	numberOfRectangles = ref(100),
	disableSortButtons = ref(false),
	disableRandomizeButton = ref(false),
	disableRectangleSlider = ref(false),
	// executionTime = ref(0),
	oscillator: Ref<OscillatorNode> = ref() as Ref<OscillatorNode>,
	sortingMethod: Ref<SortingAlgorithm> = ref('') as Ref<SortingAlgorithm>,
	sorts: Ref<SortingAlgorithm[]> = ref([
		'Bubble',
		'Insertion',
		'Cocktail Shaker',
		'Selection',
		'Merge',
		'Quick',
		'Heap',
		'Shell'
		// 'Bitonic Sort'
	]) as Ref<SortingAlgorithm[]>

// Private
let audioContext!: AudioContext,
	audioIntialized = false,
	gainNode!: GainNode,
	timestamp = 0

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
	} else gainNode.gain.setValueAtTime(volume.value, audioContext.currentTime)
})

// Methods
async function stop(): Promise<void> {
	stopExecution.value = true
	oscillator.value.disconnect()
	await sleep(500) // easy safe way to ensure all operations are done
	stopExecution.value = false
	oscillator.value.disconnect()
	sortingMethodEndedBools()
}

// TODO:
// sorting methods to add
//  radix sort (LSD), radix sort (MSD),
// std::sort (intro sort), std::stable_sort (adaptive merge sort)
// gnome sort, bitonic sort,   tim sort

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
	sortingMethod.value = ''
	console.log(Date.now() - timestamp)
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
// Audio Methods
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
