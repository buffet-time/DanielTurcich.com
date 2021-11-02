<script setup lang="ts">
import { SortingRect, SortingAlgorithm } from '../typings'
import { onMounted, Ref, ref, watch } from 'vue'

// TODO:
// Show time to draw and time to execute
// Show array accesses?
// Show swaps?

// Public
const sleepTime = ref(0),
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
		{ buttonText: 'Shell Sort', method: shellSort }
		// { buttonText: 'Bitonic Sort', method: bitonicsort }
	])

// Private
let Context2d: CanvasRenderingContext2D,
	Canvas: HTMLCanvasElement,
	Dpi: number,
	audioContext!: AudioContext,
	oscillator!: OscillatorNode,
	gainNode!: GainNode,
	sortingArray: SortingRect[] = [],
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
	Dpi = window.devicePixelRatio
	Canvas = document.getElementById('canvas') as HTMLCanvasElement
	console.log(0, window.innerHeight)
	Canvas.setAttribute('height', window.innerHeight.toString())
	console.log(1, window.innerWidth)
	Canvas.setAttribute('width', window.innerWidth.toString())
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	Context2d = Canvas.getContext('2d')!
	fixDpi()
	Context2d.fillStyle = '#0F0'
	createUnsortedArray()
	await drawAllRectangles()
	sortingMethodEndedBools()
})

// Methods
// eslint-disable-next-line @typescript-eslint/ban-types
function executeMethod(this: any, method: Function) {
	method.call(this)
}

function fixDpi() {
	//the + prefix casts it to an integer
	//the slice method gets rid of "px"
	//scale the canvas
	Canvas.setAttribute(
		'height',
		(
			+getComputedStyle(Canvas).getPropertyValue('height').slice(0, -2) * Dpi
		).toString()
	)
	Canvas.setAttribute(
		'width',
		(
			+getComputedStyle(Canvas).getPropertyValue('width').slice(0, -2) * Dpi
		).toString()
	)
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

	Context2d.fillStyle = '#303030'
	Context2d.fillRect(0, 0, Canvas.width, Canvas.height)
	Context2d.fillStyle = '#0F0'

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

// swap the x and Frequency values then swap the objects
function swapArrayElements(index1: number, index2: number) {
	;[
		sortingArray[index1].x,
		sortingArray[index2].x,
		sortingArray[index1].frequency,
		sortingArray[index2].frequency,
		sortingArray[index1],
		sortingArray[index2]
	] = [
		sortingArray[index2].x,
		sortingArray[index1].x,
		sortingArray[index2].frequency,
		sortingArray[index1].frequency,
		sortingArray[index2],
		sortingArray[index1]
	]
}

async function drawAllRectangles() {
	for (let n = 0; n < numberOfRectangles.value; n++) await drawRectangle(n)
}

async function redrawRectangles(firstIndex: number, secondIndex: number) {
	// blank out the recatngles that are being swapped
	eraseRectangle(firstIndex)
	eraseRectangle(secondIndex)

	// redraw them
	swapArrayElements(firstIndex, secondIndex)
	await redrawRectangle(firstIndex)
	await redrawRectangle(secondIndex)
}

async function drawRectangle(index: number) {
	Context2d.fillRect(
		sortingArray[index].x,
		sortingArray[index].y,
		sortingArray[index].width,
		sortingArray[index].height
	)
	await sleep(sleepTime.value)
}

function eraseRectangle(index: number) {
	Context2d.fillStyle = '#303030'
	Context2d.fillRect(
		sortingArray[index].x - 1,
		sortingArray[index].y - 1,
		sortingArray[index].width + 2,
		sortingArray[index].height + 2
	)
	Context2d.fillStyle = '#0F0'
}

function eraseRectangleByObject(rect: SortingRect) {
	Context2d.fillStyle = '#303030'
	Context2d.fillRect(rect.x - 1, rect.y - 1, rect.width + 2, rect.height + 2)
	Context2d.fillStyle = '#0F0'
}

async function redrawRectangle(index: number) {
	beep(sortingArray[index].frequency)
	await drawRectangle(index)
}

function createUnsortedArray() {
	sortingArray = []
	const widthOfRect = Canvas.width / numberOfRectangles.value,
		heightOfRect = Canvas.height / numberOfRectangles.value,
		lowFrequencyBound = 100,
		highFrequencyBound = 10000,
		frequencyIncrease = highFrequencyBound / numberOfRectangles.value

	for (let n = 0; n < numberOfRectangles.value; n++)
		sortingArray.push({
			x: widthOfRect * n,
			y: Canvas.height - heightOfRect * (n + 1),
			width: widthOfRect - 1,
			height: Canvas.height - (heightOfRect - (n + 1)),
			frequency: frequencyIncrease * n + lowFrequencyBound
		})

	for (let n = 0; n < numberOfRectangles.value * 10; n++) randomSwaps()
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
		current: SortingRect

	for (let i = 1; i < length; i++) {
		current = sortingArray[i]

		for (j = i - 1; j >= 0 && sortingArray[j].height > current.height; j--) {
			if (stopExecution.value) return

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
		if (minHeight !== n) await redrawRectangles(n, minHeight)
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
				await redrawRectangles(n, n + 1)
				sorted = false
			}
			n++
		}

		if (sorted) break

		sorted = true

		while (n > 0) {
			if (stopExecution.value) return

			if (sortingArray[n - 1].height > sortingArray[n].height) {
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

async function mergeSort(unsorted: SortingRect[]): Promise<SortingRect[]> {
	if (stopExecution.value) return []
	if (unsorted.length < 2) return unsorted

	const middle = Math.floor(unsorted.length / 2)

	return merge(
		await mergeSort(unsorted.slice(0, middle)),
		await mergeSort(unsorted.slice(middle))
	)
}

// Less efficient and slightly modified to handle drawing properly
async function merge(
	left: SortingRect[],
	right: SortingRect[]
): Promise<SortingRect[]> {
	const resultSortingArray: SortingRect[] = []
	let leftIndex = 0
	let rightIndex = 0

	while (leftIndex < left.length && rightIndex < right.length) {
		if (left[leftIndex].height < right[rightIndex].height) {
			resultSortingArray.push(left[leftIndex])
			leftIndex++
		} else {
			resultSortingArray.push(right[rightIndex])
			rightIndex++
		}
	}

	// merge based on height
	const combinedArray = resultSortingArray
		.concat(left.slice(leftIndex))
		.concat(right.slice(rightIndex))

	// get all the x values of the current array and sort them and then set the merged contents above.
	// TODO create a mergesort for a normal array instead of using builtin
	const combinedXArray = combinedArray
		.map((rect) => {
			eraseRectangleByObject(rect)
			return { x: rect.x, frequency: rect.frequency }
		})
		.sort((a, b) => a.x - b.x)

	for (let n = 0; n < combinedXArray.length; n++) {
		combinedArray[n].x = combinedXArray[n].x
		combinedArray[n].frequency = combinedXArray[n].frequency
	}

	// gets an array of the index value of where the subarray is from the main array
	const indexArray = []
	const xValues = combinedArray.map((rect) => rect.height)

	for (const xValue of xValues)
		indexArray.push(
			sortingArray.findIndex(
				(rect) =>
					rect.height ===
					combinedArray[xValues.findIndex((x) => x === xValue)].height
			)
		)

	// drawing of the rectangles
	for (let n = 0; n < combinedArray.length; n++) {
		if (stopExecution.value) return []
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
		await redrawRectangles(index, max)
		await heapify(size, max)
	}
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
		<canvas v-once id="canvas" class="canvas disable-select"></canvas>
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
.canvas {
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
