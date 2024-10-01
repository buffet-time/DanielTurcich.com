<script setup lang="ts">
import type { SortingVisualizationProps, SortingRect } from '#types'
import { onMounted, watch } from 'vue'

import { startMergeSort } from './mergeSort'
import { startQuickSort } from './quickSort'
import { startCombSort } from './combSort'

const { algorithm, startSortingMethod } = defineProps<{
	algorithm: SortingVisualizationProps
	startSortingMethod: boolean
}>()

const emit = defineEmits<{
	randomizeArrayDone: []
	sortingMethodEnded: []
	audioForRandomizing: []
	sortingMethodStarted: []
	sortingMethodEndedBools: []
	sortingMethodStartedBools: []
	beep: [frequency: number]
}>()

let Context2d: CanvasRenderingContext2D
let Canvas: HTMLCanvasElement
let sortingArray: SortingRect[] = []

watch(
	() => algorithm.randomizeArray,
	async (newValue) => {
		if (newValue) {
			emit('sortingMethodStartedBools')
			emit('audioForRandomizing')

			Context2d.fillStyle = '#303030'
			Context2d.fillRect(0, 0, Canvas.width, Canvas.height)
			Context2d.fillStyle = '#0F0'
			createUnsortedArray()
			await drawAllRectangles()
			algorithm.oscillator.disconnect()

			emit('sortingMethodEndedBools')
			emit('randomizeArrayDone')
		}
	},
)

watch(
	() => startSortingMethod,
	async () => {
		if (startSortingMethod) {
			emit('sortingMethodStarted')
			switch (algorithm.sortingMethod) {
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
					await startMergeSort(
						sortingArray,
						eraseRectangleByObject,
						redrawRectangle,
					)
					break
				case 'Quick':
					await startQuickSort(sortingArray, redrawRectangles)
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
				case 'Bogo':
					await bogoSort()
					break
				case 'Comb':
					await startCombSort(sortingArray, algorithm, redrawRectangles)
					break
			}
			emit('sortingMethodEnded')
		}
	},
)

// Lifecycle hooks
onMounted(async () => {
	emit('sortingMethodStartedBools')
	Canvas = document.getElementById('canvas') as HTMLCanvasElement
	Canvas.setAttribute('height', String(window.innerHeight - 64))
	Canvas.setAttribute('width', String(window.innerWidth - 300))

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
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
				window.devicePixelRatio,
		),
	)
	Canvas.setAttribute(
		'width',
		String(
			Number(getComputedStyle(Canvas).getPropertyValue('width').slice(0, -2)) *
				window.devicePixelRatio,
		),
	)
}

/// helpers
function swapArrayElements(index1: number, index2: number) {
	// swap the x and Frequency values then swap the objects

	;[
		sortingArray[index1].x,
		sortingArray[index2].x,
		sortingArray[index1].frequency,
		sortingArray[index2].frequency,
		sortingArray[index1],
		sortingArray[index2],
	] = [
		sortingArray[index2].x,
		sortingArray[index1].x,
		sortingArray[index2].frequency,
		sortingArray[index1].frequency,
		sortingArray[index2],
		sortingArray[index1],
	]
}

function createUnsortedArray() {
	sortingArray = []
	const widthOfRect = Canvas.width / Number(algorithm.numberOfRectangles)
	const heightOfRect = Canvas.height / Number(algorithm.numberOfRectangles)
	const lowFrequencyBound = 100
	const highFrequencyBound = 10000
	const frequencyIncrease =
		highFrequencyBound / Number(algorithm.numberOfRectangles)

	for (let n = 0; n < Number(algorithm.numberOfRectangles); n++)
		sortingArray.push({
			x: widthOfRect * n,
			y: Canvas.height - heightOfRect * (n + 1),
			width: widthOfRect - 1,
			height: heightOfRect * (n + 1),
			frequency: frequencyIncrease * n + lowFrequencyBound,
		})

	for (let n = 0; n < Number(algorithm.numberOfRectangles) * 10; n++)
		randomSwaps()
}

function randomSwaps() {
	const firstElementIndex = Math.floor(
		Math.random() * Number(algorithm.numberOfRectangles),
	)
	let secondElementIndex = 0

	do
		secondElementIndex = Math.floor(
			Math.random() * Number(algorithm.numberOfRectangles),
		)
	while (firstElementIndex === secondElementIndex)

	swapArrayElements(firstElementIndex, secondElementIndex)
}

// // // // // // //
// Drawing functions
// // // // // // //
async function drawAllRectangles() {
	for (let n = 0; n < Number(algorithm.numberOfRectangles); n++)
		await drawRectangle(n, true)

	await sleep(0)
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

async function drawRectangle(index: number, microTask?: boolean) {
	function fillRect() {
		Context2d.fillRect(
			sortingArray[index].x,
			sortingArray[index].y,
			sortingArray[index].width,
			sortingArray[index].height,
		)
	}

	if (microTask) {
		queueMicrotask(() => {
			fillRect()
		})
	} else {
		fillRect()
		await sleep(Number(algorithm.sleepTime))
	}
}

function eraseRectangle(index: number) {
	Context2d.fillStyle = '#303030'
	Context2d.fillRect(
		sortingArray[index].x - 1,
		sortingArray[index].y - 1,
		sortingArray[index].width + 2,
		sortingArray[index].height + 2,
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
	let swapped = false
	let count = 0
	let n = 0

	do {
		count++
		swapped = false
		for (n = 0; n < length - count; n++) {
			if (algorithm.stopExecution) return

			if (sortingArray[n].height > sortingArray[n + 1].height) {
				await redrawRectangles(n, n + 1)
				swapped = true
			}
		}
	} while (swapped)
}

async function insertionSort() {
	const length = sortingArray.length
	let j = 0
	let current: SortingRect

	for (let i = 1; i < length; i++) {
		current = sortingArray[i]

		for (j = i - 1; j >= 0 && sortingArray[j].height > current.height; j--) {
			if (algorithm.stopExecution) return

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
			if (algorithm.stopExecution) return

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
			if (algorithm.stopExecution) return

			if (sortingArray[n].height > sortingArray[n + 1].height) {
				await redrawRectangles(n, n + 1)
				sorted = false
			}
			n++
		}

		if (sorted) break

		sorted = true

		while (n > 0) {
			if (algorithm.stopExecution) return

			if (sortingArray[n - 1].height > sortingArray[n].height)
				await redrawRectangles(n, n - 1)
			sorted = false

			n--
		}
	}
}

async function heapSort() {
	async function heapify(size: number, index: number) {
		let max = index
		const left = 2 * index + 1
		const right = 2 * index + 2

		if (algorithm.stopExecution) return

		if (left < size && sortingArray[left].height > sortingArray[max].height)
			max = left

		if (right < size && sortingArray[right].height > sortingArray[max].height)
			max = right

		if (max !== index) {
			await redrawRectangles(index, max)
			await heapify(size, max)
		}
	}

	for (let n = Math.floor(sortingArray.length / 2 - 1); n >= 0; n--) {
		if (algorithm.stopExecution) return

		await heapify(sortingArray.length, n)
	}

	for (let n = sortingArray.length - 1; n >= 0; n--) {
		if (algorithm.stopExecution) return

		await redrawRectangles(0, n)
		await heapify(n, 0)
	}
}

async function shellSort() {
	let n = 0
	let x = 0

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
				if (algorithm.stopExecution) return

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
				if (algorithm.stopExecution) return

				await redrawRectangles(n, n - 1)
				n--
			}
		}
	}
}

async function bogoSort() {
	function isNotSorted() {
		for (let n = 1; n < sortingArray.length; n++) {
			if (sortingArray[n - 1].height > sortingArray[n].height) return true
		}
		return false
	}

	async function redrawAllRectangles() {
		for (let n = 0; n < Number(algorithm.numberOfRectangles); n++)
			eraseRectangle(n)

		for (let n = 0; n < Number(algorithm.numberOfRectangles); n++) randomSwaps()

		for (let n = 0; n < Number(algorithm.numberOfRectangles); n++)
			await redrawRectangle(n)
	}

	while (isNotSorted()) {
		if (algorithm.stopExecution) return

		await redrawAllRectangles()
	}
}
</script>

<template>
	<canvas id="canvas" class="w-[calc(100vw_-_288px)]"></canvas>
</template>
