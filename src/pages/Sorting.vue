<script setup lang="ts">
import type { SortingAlgorithm } from '#types'
import { ref, watch } from 'vue'
import SortingVisualization from './sorting/SortingVisualization.vue'

// TODO:
// Convert drawing to be microTasks to improve rendering speed?
// Show time to draw and time to execute
// Show array accesses?
// Show swaps?
// Implement WebGPU (with OpenGL backup)

const sleepTime = ref<number | string>(0)
const volume = ref(0.025)
const stopExecution = ref(false)
const randomizeArray = ref(false)
const disableStopButton = ref(true)
const numberOfRectangles = ref<number | string>(100)
const disableSortButtons = ref(false)
const disableRandomizeButton = ref(false)
const disableRectangleSlider = ref(false)
// executionTime = ref(0),
const oscillator = ref<OscillatorNode>()
const sortingMethod = ref<SortingAlgorithm>('Quick')
// prettier-ignore
const sorts = ref<SortingAlgorithm[]>([
	'Bubble', 'Insertion', 'Cocktail Shaker', 'Selection',
	'Merge', 'Quick', 'Heap', 'Shell', 'Gnome', 'Bogo', 'Comb'
])
const startSortingMethod = ref(false)

let audioContext!: AudioContext
let audioIntialized = false
let gainNode!: GainNode

// Watchers
watch(numberOfRectangles, () => {
	intializeAudio()
	disableSortButtons.value = true
})

watch(volume, () => {
	intializeAudio()
	if (disableSortButtons.value) {
		oscillator.value?.disconnect()
		gainNode.gain.setValueAtTime(volume.value, audioContext.currentTime)
		oscillator.value?.connect(gainNode).connect(audioContext.destination)
		return
	}

	gainNode.gain.setValueAtTime(volume.value, audioContext.currentTime)
})

async function stop(): Promise<void> {
	stopExecution.value = true
	oscillator.value?.disconnect()
	await sleep(500) // easy safe way to ensure all operations are done
	stopExecution.value = false
	oscillator.value?.disconnect()
	sortingMethodEndedBools()
}

// TODO: sorting methods to add
//
// Real sorting algorithms
//
// radix (LSD)
// radix (MSD)
// std::sort (intro sort)
// std::stable_sort (adaptive merge sort)
// bitonic
// binary insertion
// tim
// Quad
// smooth
// odd even
//
// GOATED SORTING ALGORITHMS
// Stooge Sort
// Slowsort
// Stalin Sort
// bozo sort
// Bogobogo sort

function sleep(time: number) {
	return new Promise((s) => setTimeout(s, time))
}

function sortingMethodStarted() {
	intializeAudio()
	oscillator.value?.connect(gainNode).connect(audioContext.destination)
	sortingMethodStartedBools()
}

function sortingMethodEnded() {
	oscillator.value?.disconnect()
	sortingMethodEndedBools()
	startSortingMethod.value = false
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
	if (audioIntialized) return

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

function beep(frequency: number) {
	oscillator.value?.frequency.setValueAtTime(
		frequency,
		audioContext.currentTime
	)
}

function audioForRandomizing() {
	intializeAudio()
	oscillator.value?.connect(gainNode).connect(audioContext.destination)
	beep(300)
}

function startSort() {
	if (!startSortingMethod.value) {
		startSortingMethod.value = true
	}
}
</script>

<template>
	<div class="flex h-[calc(100vh_-_64px)]">
		<div class="flex flex-col justify-center items-center gap-2 w-72">
			<div class="flex flex-col">
				<div class="p-4">
					Currently a few bugs, refactoring and updating this right now :)
				</div>

				<div>
					Volume: {{ parseFloat((volume * 5 * 100).toFixed(1)) }}%
					<input
						v-model="volume"
						class="w-64 h-6 bg-transparent"
						type="range"
						min="0"
						max="0.2"
						step="0.0001"
					/>
				</div>

				<div>
					Add extra Delay of: {{ sleepTime }}ms
					<input
						v-model="sleepTime"
						class="w-64 h-6 bg-transparent"
						type="range"
						min="0"
						max="250"
						step="5"
					/>
				</div>

				<div>
					{{ numberOfRectangles }} Rectangles
					<input
						v-model="numberOfRectangles"
						class="w-64 h-6 bg-transparent"
						type="range"
						min="5"
						max="1000"
						step="5"
						:disabled="disableRectangleSlider"
					/>
				</div>
			</div>

			<div class="flex flex-col justify-center items-center gap-2">
				<div class="flex gap-2">
					<button
						class="tw-button h-[50px] w-[130px] p-0"
						:disabled="disableStopButton"
						@click="stop"
					>
						Stop Execution
					</button>

					<button
						class="tw-button h-[50px] w-[130px] p-0"
						:disabled="disableRandomizeButton"
						@click="randomizeArray = true"
					>
						Randomize
					</button>
				</div>

				<select v-model="sortingMethod" class="tw-music-select h-12">
					<option
						v-for="(algorithm, index) in sorts"
						:key="index"
						:value="algorithm"
					>
						{{ algorithm }}
					</option>
				</select>

				<button class="tw-button h-[50px] w-[130px] p-0" @click="startSort">
					Start sort
				</button>
			</div>
		</div>

		<!-- TODO! -->
		<!-- merge sort doesnt stop -->
		<!-- quick sort doesnt stop -->
		<!-- comb sort doesnt stop -->
		<!-- this is because the function doesnt have a reactive state of the boolean to stop -->

		<SortingVisualization
			:algorithm="{
				sleepTime: sleepTime,
				stopExecution: stopExecution,
				randomizeArray: randomizeArray,
				oscillator: oscillator!,
				numberOfRectangles: numberOfRectangles,
				sortingMethod: sortingMethod
			}"
			:start-sorting-method="startSortingMethod"
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
