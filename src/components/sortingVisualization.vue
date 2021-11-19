<script setup lang="ts">
import { type SortingAlgorithm } from '../views/sorting.vue'
import { onMounted, watch } from 'vue'

interface SortingRect {
	x: number
	y: number
	width: number
	height: number
	frequency: number
}

const props = defineProps<{
	sleepTime: number | string
	stopExecution: boolean
	randomizeArray: boolean
	oscillator: OscillatorNode
	numberOfRectangles: number | string
	sortingMethod: SortingAlgorithm
}>()

const emit = defineEmits<{
	(e: 'randomizeArrayDone'): void
	(e: 'sortingMethodEnded'): void
	(e: 'audioForRandomizing'): void
	(e: 'sortingMethodStarted'): void
	(e: 'sortingMethodEndedBools'): void
	(e: 'sortingMethodStartedBools'): void
	(e: 'beep', frequency: number): void
}>()

let Context2d: CanvasRenderingContext2D,
	Canvas: HTMLCanvasElement,
	sortingArray: SortingRect[] = [],
	quickSortIndex = 0

watch(
	() => props.randomizeArray,
	async (newValue) => {
		if (newValue) {
			emit('sortingMethodStartedBools')
			emit('audioForRandomizing')

			Context2d.fillStyle = '#303030'
			Context2d.fillRect(0, 0, Canvas.width, Canvas.height)
			Context2d.fillStyle = '#0F0'
			createUnsortedArray()
			await drawAllRectangles()
			props.oscillator.disconnect()

			emit('sortingMethodEndedBools')
			emit('randomizeArrayDone')
		}
	}
)

watch(
	() => props.sortingMethod,
	async (newValue) => {
		if (newValue === '') return

		emit('sortingMethodStarted')
		switch (newValue) {
			case 'Bubble':
				await bubbleSort()
				break
			case 'Cocktail Shaker':
				await cocktailShakerSort()
				break
			case 'Heap':
				await heapSort()
				break
			case 'Insertion':
				await insertionSort()
				break
			case 'Merge':
				sortingArray = await mergeSort(sortingArray)
				break
			case 'Quick':
				await quickSort(0, sortingArray.length - 1)
				break
			case 'Selection':
				await selectionSort()
				break
			case 'Shell':
				await shellSort()
				break
			case 'Gnome':
				await gnomeSort()
				break
		}
		emit('sortingMethodEnded')
	}
)

// Lifecycle hooks
onMounted(async () => {
	emit('sortingMethodStartedBools')
	Canvas = document.getElementById('canvas') as HTMLCanvasElement
	Canvas.setAttribute('height', String(window.innerHeight - 64))
	Canvas.setAttribute('width', String(window.innerWidth - 300))
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	Context2d = Canvas.getContext('2d')!
	fixDpi()
	Context2d.fillStyle = '#0F0'
	createUnsortedArray()
	await drawAllRectangles()
	emit('sortingMethodEndedBools')
})

function fixDpi() {
	Canvas.setAttribute(
		'height',
		String(
			Number(getComputedStyle(Canvas).getPropertyValue('height').slice(0, -2)) *
				window.devicePixelRatio
		)
	)
	Canvas.setAttribute(
		'width',
		String(
			Number(getComputedStyle(Canvas).getPropertyValue('width').slice(0, -2)) *
				window.devicePixelRatio
		)
	)
}

function swapArrayElements(index1: number, index2: number) {
	// swap the x and Frequency values then swap the objects
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

function createUnsortedArray() {
	sortingArray = []
	const widthOfRect = Canvas.width / Number(props.numberOfRectangles),
		heightOfRect = Canvas.height / Number(props.numberOfRectangles),
		lowFrequencyBound = 100,
		highFrequencyBound = 10000,
		frequencyIncrease = highFrequencyBound / Number(props.numberOfRectangles)

	for (let n = 0; n < Number(props.numberOfRectangles); n++)
		sortingArray.push({
			x: widthOfRect * n,
			y: Canvas.height - heightOfRect * (n + 1),
			width: widthOfRect - 1,
			height: heightOfRect * (n + 1),
			frequency: frequencyIncrease * n + lowFrequencyBound
		})

	for (let n = 0; n < Number(props.numberOfRectangles) * 10; n++) randomSwaps()
}

function randomSwaps() {
	const firstElementIndex = Math.floor(
		Math.random() * Number(props.numberOfRectangles)
	)
	let secondElementIndex = 0

	do
		secondElementIndex = Math.floor(
			Math.random() * Number(props.numberOfRectangles)
		)
	while (firstElementIndex === secondElementIndex)

	swapArrayElements(firstElementIndex, secondElementIndex)
}

// // // // // // //
// Drawing functions
// // // // // // //
async function drawAllRectangles() {
	for (let n = 0; n < props.numberOfRectangles; n++) await drawRectangle(n)
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
	await sleep(Number(props.sleepTime))
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
	emit('beep', sortingArray[index].frequency)
	await drawRectangle(index)
}

function sleep(time: number) {
	return new Promise((s) => setTimeout(s, time))
}

// // // // // // //
// Sorting functions
// // // // // // //
async function bubbleSort() {
	const length = sortingArray.length
	let swapped = false,
		count = 0,
		n = 0
	do {
		count++
		swapped = false
		for (n = 0; n < length - count; n++) {
			if (props.stopExecution) return

			if (sortingArray[n].height > sortingArray[n + 1].height) {
				await redrawRectangles(n, n + 1)
				swapped = true
			}
		}
	} while (swapped)
}

async function insertionSort() {
	const length = sortingArray.length
	let j = 0,
		current: SortingRect

	for (let i = 1; i < length; i++) {
		current = sortingArray[i]

		for (j = i - 1; j >= 0 && sortingArray[j].height > current.height; j--) {
			if (props.stopExecution) return

			await redrawRectangles(j, j + 1)
		}

		sortingArray[j + 1] = current
	}
}

async function selectionSort() {
	let minHeight = 0
	let x = 0

	for (let n = 0; n < sortingArray.length; n++) {
		minHeight = n // Finding the smallest number in the array
		for (x = n + 1; x < sortingArray.length; x++) {
			if (props.stopExecution) return

			if (sortingArray[x].height < sortingArray[minHeight].height) minHeight = x
		}
		if (minHeight !== n) await redrawRectangles(n, minHeight)
	}
}

async function cocktailShakerSort() {
	let sorted = false
	let n = 0

	while (!sorted) {
		sorted = true
		while (n < sortingArray.length - 1) {
			if (props.stopExecution) return

			if (sortingArray[n].height > sortingArray[n + 1].height) {
				await redrawRectangles(n, n + 1)
				sorted = false
			}
			n++
		}

		if (sorted) break

		sorted = true

		while (n > 0) {
			if (props.stopExecution) return

			if (sortingArray[n - 1].height > sortingArray[n].height) {
				await redrawRectangles(n, n - 1)
				sorted = false
			}
			n--
		}
	}
}

async function quickSort(left: number, right: number) {
	quickSortIndex = await quicksortPartition(left, right) //index returned from partition
	if (props.stopExecution) return

	//more elements on the left side of the pivot
	if (left < quickSortIndex - 1) await quickSort(left, quickSortIndex - 1)

	//more elements on the right side of the pivot
	if (quickSortIndex < right) await quickSort(quickSortIndex, right)
}

async function quicksortPartition(left: number, right: number) {
	const pivot = sortingArray[Math.floor((right + left) / 2)]
	while (left <= right) {
		if (props.stopExecution) return 0

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

async function mergeSort(unsorted: SortingRect[]): Promise<SortingRect[]> {
	if (props.stopExecution) return []
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
	const combinedArray = [
		...resultSortingArray,
		...left.slice(leftIndex),
		...right.slice(rightIndex)
	]

	// get all the x values of the current array and sort them and then set the merged contents above.
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
		if (props.stopExecution) return []
		await redrawRectangle(indexArray[n])
	}

	return combinedArray
}

async function heapSort() {
	for (let n = Math.floor(sortingArray.length / 2 - 1); n >= 0; n--) {
		if (props.stopExecution) return

		await heapify(sortingArray.length, n)
	}

	for (let n = sortingArray.length - 1; n >= 0; n--) {
		if (props.stopExecution) return

		await redrawRectangles(0, n)
		await heapify(n, 0)
	}
}

async function heapify(size: number, index: number) {
	let max = index
	const left = 2 * index + 1
	const right = 2 * index + 2

	if (props.stopExecution) return

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
				if (props.stopExecution) return
				await redrawRectangles(n, n - gap)
			}

			sortingArray[n].x = temp.x
			sortingArray[n] = temp
		}
	}
}

async function gnomeSort() {
	for (let n = 1; n < sortingArray.length; n++) {
		if (sortingArray[n - 1].height > sortingArray[n].height) {
			while (n > 0 && sortingArray[n - 1].height > sortingArray[n].height) {
				await redrawRectangles(n, n - 1)
				n--
			}
		}
	}
}
</script>

<template>
	<canvas v-once id="canvas" class="canvas disable-select"></canvas>
</template>

<style scoped>
.canvas {
	flex: 1 1 auto;
}
</style>
