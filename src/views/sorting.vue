<script setup lang="ts">
import { PixiRect, SortingAlgorithm } from '../typings'
import { Application, Graphics } from 'pixi.js'
import { onBeforeUnmount, onMounted, Ref, ref, watch } from 'vue'

// Public
const pixi = ref(null),
	sleepTime = ref(0),
	numberOfRectangles = ref(100),
	disableSortButtons = ref(false),
	stopExecution = ref(false),
	disableStopButton = ref(true),
	disableRandomizeButton = ref(false),
	disableRectangleSlider = ref(false),
	volume = ref(0.025),
	sorts: Ref<SortingAlgorithm[]> = ref([
		{ buttonText: 'Bubble Sort', method: bubbleSort },
		{ buttonText: 'Insertion Sort', method: insertionSort },
		{ buttonText: 'Selection Sort', method: selectionSort },
		{ buttonText: 'Cocktail Shaker Sort', method: cocktailShakerSort },
		{ buttonText: 'Quicksort', method: callQuickSort },
		{ buttonText: 'Merge Sort', method: callMergeSort },
		{ buttonText: 'Heap Sort', method: callHeapSort },
		{ buttonText: 'Bogo Sort', method: bogoSort },
		{ buttonText: 'Shell Sort', method: shellSort }
		// { buttonText: 'Bitonic Sort', method: bitonicsort }
	])

// Private
let app!: Application,
	canvasElement!: HTMLCanvasElement,
	audioContext!: AudioContext,
	oscillator!: OscillatorNode,
	gainNode!: GainNode,
	sortingArray: PixiRect[] = [],
	quickSortIndex = 0,
	pendingRecursiveCalls = 0,
	audioIntialized = false

// Watchers
watch(numberOfRectangles, () => {
	intializeAudio()
	disableSortButtons.value = true
})

watch(volume, () => {
	intializeAudio()
	if (disableSortButtons.value) {
		oscillator.disconnect()
		gainNode.gain.setValueAtTime(volume.value, audioContext.currentTime)
		oscillator.connect(gainNode).connect(audioContext.destination)
	} else gainNode.gain.setValueAtTime(volume.value, audioContext.currentTime)
})

// Lifecycle hooks
onMounted(async () => {
	sortingMethodStartedBools()
	canvasElement = pixi.value as unknown as HTMLCanvasElement
	app = new Application({
		autoStart: true,
		antialias: false,
		width: canvasElement.clientWidth,
		height: canvasElement.clientHeight,
		view: canvasElement,
		clearBeforeRender: false,
		powerPreference: 'high-performance',
		sharedTicker: false,
		sharedLoader: false,
		resizeTo: canvasElement
	})
	createUnsortedArray()
	await drawAllRectangles()
	sortingMethodEndedBools()
})

onBeforeUnmount(() => app.destroy())

// Methods
// eslint-disable-next-line @typescript-eslint/ban-types
function executeMethod(this: any, method: Function) {
	method.call(this)
}

async function stop(): Promise<void> {
	stopExecution.value = true
	oscillator.disconnect()
	await sleep(500) // easy safe way to ensure all operations are done
	stopExecution.value = false
	sortingMethodEnded()
}

async function randomizeArray(): Promise<void> {
	sortingMethodStartedBools()
	audioForRandomizing()

	while (sortingArray.length > 0) {
		sortingArray.pop()
		app.stage.children[0].destroy()
	}
	createUnsortedArray()

	await drawAllRectangles()
	sortingMethodEnded()
}

// sorting methods to add
//  radix sort (LSD), radix sort (MSD),
// std::sort (intro sort), std::stable_sort (adaptive merge sort)
// gnome sort, bitonic sort,   tim sort

// // // // // // //
// Other methods
// // // // // // //
function isSorted() {
	for (let index = 0; index < sortingArray.length - 1; index++)
		if (sortingArray[index].height > sortingArray[index + 1].height)
			return false

	return true
}

function sleep(time: number) {
	return new Promise((s) => setTimeout(s, time))
}

function sortingMethodStarted() {
	intializeAudio()
	oscillator.connect(gainNode).connect(audioContext.destination)
	sortingMethodStartedBools()
}

function sortingMethodEnded() {
	oscillator.disconnect()
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

function swapArrayElements(indexOne: number, indexTwo: number) {
	// swap the x positions of the 2 rectangles
	const temp1 = sortingArray[indexOne].x
	sortingArray[indexOne].x = sortingArray[indexTwo].x
	sortingArray[indexTwo].x = temp1
	// then swap their position in the array
	const temp2 = sortingArray[indexOne]
	sortingArray[indexOne] = sortingArray[indexTwo]
	sortingArray[indexTwo] = temp2
}

async function drawAllRectangles() {
	for (let n = 0; n < numberOfRectangles.value; n++) await drawRectangle(n)
}

async function redrawRectangles(firstIndex: number, secondIndex: number) {
	app.stage.swapChildren(
		(app.stage.children[secondIndex] as Graphics).clear(),
		(app.stage.children[firstIndex] as Graphics).clear()
	)

	await redrawRectangle(firstIndex)
	await redrawRectangle(secondIndex)
}

async function drawRectangle(index: number) {
	app.stage.addChild(
		new Graphics()
			.beginFill(0x00ff00)
			.drawRect(
				sortingArray[index].x,
				sortingArray[index].y,
				sortingArray[index].width,
				sortingArray[index].height
			)
			.endFill()
	)
	await sleep(sleepTime.value)
}

async function redrawRectangle(index: number) {
	beep(sortingArray[index].frequency)
	;(app.stage.children[index] as Graphics)
		.beginFill(0x00ff00)
		.drawRect(
			sortingArray[index].x,
			sortingArray[index].y,
			sortingArray[index].width,
			sortingArray[index].height
		)
		.endFill()
	await sleep(sleepTime.value)
}

function createUnsortedArray() {
	const divWidth = canvasElement.clientWidth,
		widthOfRectangle = divWidth / numberOfRectangles.value,
		divHeight = canvasElement.clientHeight,
		heightOfRectangle = divHeight / numberOfRectangles.value,
		widthValue = widthOfRectangle - 1,
		lowFrequencyBound = 100,
		highFrequencyBound = 10000,
		frequencyIncrease = highFrequencyBound / numberOfRectangles.value

	for (let n = 0; n < numberOfRectangles.value; n++) {
		sortingArray.push({
			x: Number((n * widthOfRectangle).toFixed(2)),
			y: Number((divHeight - (n + 1) * heightOfRectangle).toFixed(2)),
			width: Number(widthValue.toFixed(2)),
			height: Number((n * heightOfRectangle + heightOfRectangle).toFixed(2)),
			frequency: frequencyIncrease * n + lowFrequencyBound
		})
	}

	const sortingLengthMultiplied = numberOfRectangles.value * 10
	for (let n = 0; n < sortingLengthMultiplied; n++) randomSwaps()
}

function randomSwaps() {
	const firstElementIndex = Math.floor(Math.random() * numberOfRectangles.value)
	let secondElementIndex = 0

	do secondElementIndex = Math.floor(Math.random() * numberOfRectangles.value)
	while (firstElementIndex === secondElementIndex)

	swapArrayElements(firstElementIndex, secondElementIndex)
	return [firstElementIndex, secondElementIndex]
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

		oscillator = new OscillatorNode(audioContext, {
			type: 'sine',
			frequency: 500
		})

		oscillator.start()
		oscillator.connect(audioContext.destination)
		oscillator.disconnect()
		audioIntialized = true
	}
}

function beep(frequency: number) {
	oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
}

function audioForRandomizing() {
	intializeAudio()
	oscillator.connect(gainNode).connect(audioContext.destination)
	beep(300)
}

// // // // // // //
// Sorting methods
// // // // // // //
async function bubbleSort() {
	sortingMethodStarted()
	const length = sortingArray.length
	let swapped = false,
		count = 0,
		n = 0
	do {
		count++
		swapped = false
		for (n = 0; n < length - count; n++) {
			if (stopExecution.value) return

			if (sortingArray[n].height > sortingArray[n + 1].height) {
				swapArrayElements(n, n + 1)
				await redrawRectangles(n, n + 1)
				swapped = true
			}
		}
	} while (swapped)
	sortingMethodEnded()
}

async function insertionSort() {
	sortingMethodStarted()
	const length = sortingArray.length
	let j = 0,
		current: PixiRect

	for (let i = 1; i < length; i++) {
		current = sortingArray[i]

		for (j = i - 1; j >= 0 && sortingArray[j].height > current.height; j--) {
			if (stopExecution.value) return

			swapArrayElements(j, j + 1)
			await redrawRectangles(j, j + 1)
		}

		sortingArray[j + 1] = current
	}
	sortingMethodEnded()
}

async function selectionSort() {
	sortingMethodStarted()
	let minHeight = 0
	let x = 0

	for (let n = 0; n < sortingArray.length; n++) {
		minHeight = n // Finding the smallest number in the array
		for (x = n + 1; x < sortingArray.length; x++) {
			if (stopExecution.value) return

			if (sortingArray[x].height < sortingArray[minHeight].height) minHeight = x
		}
		if (minHeight !== n) {
			swapArrayElements(minHeight, n)
			await redrawRectangles(n, minHeight)
		}
	}
	sortingMethodEnded()
}

async function cocktailShakerSort() {
	sortingMethodStarted()
	let sorted = false
	let n = 0

	while (!sorted) {
		sorted = true
		while (n < sortingArray.length - 1) {
			if (stopExecution.value) return

			if (sortingArray[n].height > sortingArray[n + 1].height) {
				swapArrayElements(n, n + 1)
				await redrawRectangles(n, n + 1)
				sorted = false
			}
			n++
		}

		if (sorted) {
			break
		}
		sorted = true

		while (n > 0) {
			if (stopExecution.value) return

			if (sortingArray[n - 1].height > sortingArray[n].height) {
				swapArrayElements(n, n - 1)
				await redrawRectangles(n, n - 1)
				sorted = false
			}
			n--
		}
	}
	sortingMethodEnded()
}

function callQuickSort() {
	if (!isSorted()) {
		sortingMethodStarted()
		pendingRecursiveCalls = 0
		quickSort(0, sortingArray.length - 1)
	}
}

async function quickSort(left: number, right: number) {
	quickSortIndex = await quicksortPartition(left, right) //index returned from partition
	if (stopExecution.value) return

	//more elements on the left side of the pivot
	if (left < quickSortIndex - 1) {
		pendingRecursiveCalls++
		quickSort(left, quickSortIndex - 1)
	}
	//more elements on the right side of the pivot
	if (quickSortIndex < right) {
		pendingRecursiveCalls++
		quickSort(quickSortIndex, right)
	}
	if (pendingRecursiveCalls-- === 0) sortingMethodEnded()
}

async function quicksortPartition(left: number, right: number) {
	const pivot = sortingArray[Math.floor((right + left) / 2)]
	while (left <= right) {
		if (stopExecution.value) return 0

		// increment up until find a height to the left larger than the pivot
		while (sortingArray[left].height < pivot.height) left++
		// increment up until  find a height to the right smaller than the pivot
		while (sortingArray[right].height > pivot.height) right--

		if (left <= right) {
			swapArrayElements(left, right)
			await redrawRectangles(left, right)
			left++
			right--
		}
	}
	return left
}

async function callMergeSort() {
	if (!isSorted()) {
		sortingMethodStarted()
		const tempArray = sortingArray.slice(0)
		const mergedSortingArray = await mergeSort(sortingArray)

		if (mergedSortingArray.length === tempArray.length)
			sortingArray = mergedSortingArray

		sortingMethodEnded()
	}
}

async function mergeSort(unsorted: PixiRect[]): Promise<PixiRect[]> {
	if (stopExecution.value) return []
	if (unsorted.length < 2) return unsorted

	const middle = Math.floor(unsorted.length / 2)

	return merge(
		await mergeSort(unsorted.slice(0, middle)),
		await mergeSort(unsorted.slice(middle))
	)
}

async function merge(left: PixiRect[], right: PixiRect[]): Promise<PixiRect[]> {
	const resultPixiArray: PixiRect[] = []
	let leftIndex = 0
	let rightIndex = 0

	while (leftIndex < left.length && rightIndex < right.length) {
		if (left[leftIndex].height < right[rightIndex].height) {
			resultPixiArray.push(left[leftIndex])
			leftIndex++
		} else {
			resultPixiArray.push(right[rightIndex])
			rightIndex++
		}
	}

	// merge based on height
	const combinedArray = resultPixiArray
		.concat(left.slice(leftIndex))
		.concat(right.slice(rightIndex))

	// get all the x values of the current array and sort them and then set the merged contents above.
	// TODO create a mergesort for a normal array instead of using builtin
	const combinedXArray = combinedArray
		.map((rect) => rect.x)
		.sort((a, b) => a - b)

	for (let n = 0; n < combinedXArray.length; n++)
		combinedArray[n].x = combinedXArray[n]

	// gets an array of the index value of where the subarray is from the main array
	const indexArray = []
	const xValues = combinedArray.map((rect) => rect.height)

	for (const value of xValues) {
		indexArray.push(
			sortingArray.findIndex(
				(rect) =>
					rect.height ===
					combinedArray[xValues.findIndex((blah) => blah === value)].height
			)
		)
	}

	// drawing of the rectangles
	for (let n = 0; n < combinedArray.length; n++) {
		if (stopExecution.value) return []
		;(app.stage.children[indexArray[n]] as Graphics).clear()
		await redrawRectangle(indexArray[n])
	}

	return combinedArray
}

async function callHeapSort() {
	sortingMethodStarted()
	await heapSort()
	sortingMethodEnded()
}

async function heapSort() {
	for (let n = Math.floor(sortingArray.length / 2 - 1); n >= 0; n--) {
		if (stopExecution.value) return

		await heapify(sortingArray.length, n)
	}

	for (let n = sortingArray.length - 1; n >= 0; n--) {
		if (stopExecution.value) return

		swapArrayElements(0, n)
		redrawRectangles(0, n)
		await heapify(n, 0)
	}
}

async function heapify(size: number, index: number) {
	let max = index
	const left = 2 * index + 1
	const right = 2 * index + 2

	if (stopExecution.value) return

	if (left < size && sortingArray[left].height > sortingArray[max].height)
		max = left

	if (right < size && sortingArray[right].height > sortingArray[max].height)
		max = right

	if (max != index) {
		swapArrayElements(index, max)
		await redrawRectangles(index, max)
		await heapify(size, max)
	}
}

async function bogoSort() {
	sortingMethodStarted()

	while (!isSorted()) {
		const length = sortingArray.length * 3
		for (let index = 0; index < length; index++) {
			if (stopExecution.value) return

			const indexes = randomSwaps()

			await redrawRectangles(indexes[0], indexes[1])
		}
	}

	sortingMethodEnded()
}

async function shellSort() {
	sortingMethodStarted()
	let n = 0,
		x = 0

	for (
		let gap = Math.floor(sortingArray.length / 2);
		gap > 0;
		gap = Math.floor(gap / 2)
	) {
		for (x = gap; x < sortingArray.length; x += 1) {
			const temp = sortingArray[x]

			for (
				n = x;
				n >= gap && sortingArray[n - gap].height > temp.height;
				n -= gap
			) {
				if (stopExecution.value) return
				swapArrayElements(n, n - gap)
				await redrawRectangles(n, n - gap)
			}

			sortingArray[n].x = temp.x
			sortingArray[n] = temp
		}
	}
	sortingMethodEnded()
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
				@click="randomizeArray"
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
				@click="executeMethod(algorithm.method)"
			>
				{{ algorithm.buttonText }}
			</button>
		</div>
		<canvas v-once ref="pixi" class="pixi-canvas disable-select"></canvas>
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

.pixi-canvas {
	flex: 1 1 auto;
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
