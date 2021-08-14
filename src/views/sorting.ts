import { Vue } from 'vue-class-component'
import { PixiRect, SortingAlgorithm } from '@/typings'
import { Application, Graphics } from 'pixi.js'

export default class Sorting extends Vue {
	public sleepTime = 0
	public numberOfRectangles = 100
	public disableSortButtons = false
	public stopExecution = false
	public disableStopButton = true
	public disableRandomizeButton = false
	public disableRectangleSlider = false
	public volume = 0.025
	public sorts: SortingAlgorithm[] = [
		{ buttonText: 'Bubble Sort', method: this.bubbleSort },
		{ buttonText: 'Insertion Sort', method: this.insertionSort },
		{ buttonText: 'Selection Sort', method: this.selectionSort },
		{ buttonText: 'Cocktail Shaker Sort', method: this.cocktailShakerSort },
		{ buttonText: 'Quicksort', method: this.callQuickSort },
		{ buttonText: 'Merge Sort', method: this.callMergeSort },
		{ buttonText: 'Heap Sort', method: this.callHeapSort },
		{ buttonText: 'Bogo Sort', method: this.bogoSort },
		{ buttonText: 'Shell Sort', method: this.shellSort }
		// { buttonText: 'Bitonic Sort', method: this.bitonicsort }
	]

	private app!: Application
	private canvasElement!: HTMLCanvasElement
	private sortingArray: PixiRect[] = []
	private quickSortIndex = 0
	private pendingRecursiveCalls = 0
	private audioContext!: AudioContext

	public async mounted(): Promise<void> {
		this.$watch(
			() => {
				return this.numberOfRectangles
			},
			() => {
				this.disableSortButtons = true
			}
		)

		this.sortingMethodStarted()
		this.canvasElement = this.$refs['pixi'] as HTMLCanvasElement
		this.app = new Application({
			autoStart: true,
			antialias: false,
			width: this.canvasElement.clientWidth,
			height: this.canvasElement.clientHeight,
			view: this.canvasElement,
			clearBeforeRender: false,
			powerPreference: 'high-performance',
			sharedTicker: false,
			sharedLoader: false,
			resizeTo: this.canvasElement
		})

		this.audioContext = new window.AudioContext()
		this.createUnsortedArray()
		await this.drawAllRectangles()
		this.sortingMethodEnded()
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public executeMethod(method: Function): void {
		method.call(this)
	}

	public async stop(): Promise<void> {
		this.stopExecution = true
		await this.sleep(500) // easy safe way to ensure all operations are done
		this.stopExecution = false
		this.sortingMethodEnded()
	}

	public async randomizeArray(): Promise<void> {
		this.sortingMethodStarted()

		while (this.sortingArray.length > 0) {
			this.sortingArray.pop()
			this.app.stage.children[0].destroy()
		}
		this.createUnsortedArray()

		await this.drawAllRectangles()
		this.sortingMethodEnded()
	}

	// sorting methods to add
	//  radix sort (LSD), radix sort (MSD),
	// std::sort (intro sort), std::stable_sort (adaptive merge sort)
	// gnome sort, bitonic sort,   tim sort

	// // // // // // //
	// Sorting methods
	// // // // // // //
	private async bubbleSort() {
		this.sortingMethodStarted()
		const length = this.sortingArray.length
		let swapped = false
		let count = 0
		let loopLength = 0
		let n = 0
		do {
			count++
			swapped = false
			loopLength = length - count
			for (n = 0; n < loopLength; n++) {
				if (this.stopExecution) {
					return
				}
				if (this.sortingArray[n].height > this.sortingArray[n + 1].height) {
					this.swapArrayElements(n, n + 1)
					await this.redrawRectangles(n, n + 1)
					swapped = true
				}
			}
		} while (swapped)
		this.sortingMethodEnded()
	}

	private async insertionSort() {
		this.sortingMethodStarted()
		const length = this.sortingArray.length
		let j = 0
		let current: PixiRect

		for (let i = 1; i < length; i++) {
			current = this.sortingArray[i]

			for (
				j = i - 1;
				j >= 0 && this.sortingArray[j].height > current.height;
				j--
			) {
				if (this.stopExecution) {
					return
				}

				this.swapArrayElements(j, j + 1)
				await this.redrawRectangles(j, j + 1)
			}

			this.sortingArray[j + 1] = current
		}
		this.sortingMethodEnded()
	}

	private async selectionSort() {
		this.sortingMethodStarted()
		const length = this.sortingArray.length
		let minHeight = 0
		let x = 0

		for (let n = 0; n < length; n++) {
			minHeight = n // Finding the smallest number in the array
			for (x = n + 1; x < length; x++) {
				if (this.stopExecution) {
					return
				}
				if (this.sortingArray[x].height < this.sortingArray[minHeight].height) {
					minHeight = x
				}
			}
			if (minHeight !== n) {
				this.swapArrayElements(minHeight, n)
				await this.redrawRectangles(n, minHeight)
			}
		}
		this.sortingMethodEnded()
	}

	private async cocktailShakerSort() {
		this.sortingMethodStarted()
		const length = this.sortingArray.length
		let sorted = false
		let n = 0

		while (!sorted) {
			sorted = true
			while (n < length - 1) {
				if (this.stopExecution) {
					return
				}
				if (this.sortingArray[n].height > this.sortingArray[n + 1].height) {
					this.swapArrayElements(n, n + 1)
					await this.redrawRectangles(n, n + 1)
					sorted = false
				}
				n++
			}

			if (sorted) {
				break
			}
			sorted = true

			while (n > 0) {
				if (this.stopExecution) {
					return
				}
				if (this.sortingArray[n - 1].height > this.sortingArray[n].height) {
					this.swapArrayElements(n, n - 1)
					await this.redrawRectangles(n, n - 1)
					sorted = false
				}
				n--
			}
		}
		this.sortingMethodEnded()
	}

	private callQuickSort() {
		if (!this.isSorted()) {
			this.sortingMethodStarted()
			this.pendingRecursiveCalls = 0
			this.quickSort(0, this.sortingArray.length - 1)
		}
	}

	private async quickSort(left: number, right: number) {
		this.quickSortIndex = await this.quicksortPartition(left, right) //index returned from partition
		if (this.stopExecution) {
			return
		}

		//more elements on the left side of the pivot
		if (left < this.quickSortIndex - 1) {
			this.pendingRecursiveCalls++
			this.quickSort(left, this.quickSortIndex - 1)
		}
		//more elements on the right side of the pivot
		if (this.quickSortIndex < right) {
			this.pendingRecursiveCalls++
			this.quickSort(this.quickSortIndex, right)
		}
		if (this.pendingRecursiveCalls-- === 0) {
			this.sortingMethodEnded()
		}
	}

	private async quicksortPartition(left: number, right: number) {
		const pivot = this.sortingArray[Math.floor((right + left) / 2)]
		while (left <= right) {
			if (this.stopExecution) {
				return 0
			}
			// increment up until find a height to the left larger than the pivot
			while (this.sortingArray[left].height < pivot.height) {
				left++
			}
			// increment up until  find a height to the right smaller than the pivot
			while (this.sortingArray[right].height > pivot.height) {
				right--
			}
			if (left <= right) {
				this.swapArrayElements(left, right)
				await this.redrawRectangles(left, right)
				left++
				right--
			}
		}
		return left
	}

	private async callMergeSort() {
		if (!this.isSorted()) {
			this.sortingMethodStarted()
			const tempArray = this.sortingArray.slice(0)
			const mergedSortingArray = await this.mergeSort(this.sortingArray)
			if (mergedSortingArray.length === tempArray.length) {
				this.sortingArray = mergedSortingArray
			}
			this.sortingMethodEnded()
		}
	}

	private async mergeSort(unsorted: PixiRect[]): Promise<PixiRect[]> {
		if (this.stopExecution) {
			return []
		}
		if (unsorted.length <= 1) {
			return unsorted
		}

		const middle = Math.floor(unsorted.length / 2)

		const left = unsorted.slice(0, middle)
		const right = unsorted.slice(middle)

		return this.merge(await this.mergeSort(left), await this.mergeSort(right))
	}

	private async merge(
		left: PixiRect[],
		right: PixiRect[]
	): Promise<PixiRect[]> {
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
			.map((rect) => {
				return rect.x
			})
			.sort((a, b) => a - b)

		for (let n = 0; n < combinedXArray.length; n++) {
			combinedArray[n].x = combinedXArray[n]
		}

		// gets an array of the index value of where the subarray is from the main array
		const indexArray = []
		const xValues = combinedArray.map((rect) => {
			return rect.height
		})

		for (const value of xValues) {
			indexArray.push(
				this.sortingArray.findIndex((rect) => {
					return (
						rect.height ===
						combinedArray[
							xValues.findIndex((blah) => {
								return blah === value
							})
						].height
					)
				})
			)
		}

		// drawing of the rectangles
		for (let n = 0; n < combinedArray.length; n++) {
			if (this.stopExecution) {
				return []
			}
			;(this.app.stage.children[indexArray[n]] as Graphics).clear()
			await this.redrawRectangle(indexArray[n])
		}

		return combinedArray
	}

	private async callHeapSort() {
		this.sortingMethodStarted()
		await this.heapSort()
		this.sortingMethodEnded()
	}

	private async heapSort() {
		for (let n = Math.floor(this.sortingArray.length / 2 - 1); n >= 0; n--) {
			if (this.stopExecution) {
				return
			}
			await this.heapify(this.sortingArray.length, n)
		}

		for (let n = this.sortingArray.length - 1; n >= 0; n--) {
			if (this.stopExecution) {
				return
			}
			this.swapArrayElements(0, n)
			this.redrawRectangles(0, n)
			await this.heapify(n, 0)
		}
	}

	private async heapify(size: number, index: number) {
		let max = index
		const left = 2 * index + 1
		const right = 2 * index + 2

		if (this.stopExecution) {
			return
		}

		if (
			left < size &&
			this.sortingArray[left].height > this.sortingArray[max].height
		) {
			max = left
		}
		if (
			right < size &&
			this.sortingArray[right].height > this.sortingArray[max].height
		) {
			max = right
		}

		if (max != index) {
			this.swapArrayElements(index, max)
			await this.redrawRectangles(index, max)
			await this.heapify(size, max)
		}
	}

	private async bogoSort() {
		this.sortingMethodStarted()

		while (!this.isSorted()) {
			const length = this.sortingArray.length * 3
			for (let index = 0; index < length; index++) {
				if (this.stopExecution) {
					return
				}
				const indexes = this.randomSwaps()

				await this.redrawRectangles(indexes[0], indexes[1])
			}
		}

		this.sortingMethodEnded()
	}

	private async shellSort() {
		this.sortingMethodStarted()
		let n = 0
		let x = 0

		for (
			let gap = Math.floor(this.sortingArray.length / 2);
			gap > 0;
			gap = Math.floor(gap / 2)
		) {
			for (x = gap; x < this.sortingArray.length; x += 1) {
				const temp = this.sortingArray[x]

				for (
					n = x;
					n >= gap && this.sortingArray[n - gap].height > temp.height;
					n -= gap
				) {
					if (this.stopExecution) {
						return
					}
					this.swapArrayElements(n, n - gap)
					await this.redrawRectangles(n, n - gap)
				}

				this.sortingArray[n].x = temp.x
				this.sortingArray[n] = temp
			}
		}
		this.sortingMethodEnded()
	}

	//private async bitonicsort() {
	//	for (let i = 0; i < 10; i++) {
	//		for (let j = 0; j <= i; j++) {
	//			await this.kernel(i, j)
	//		}
	//	}
	//}

	//private async kernel(p: number, q: number) {
	//	const d = 1 << (p - q)
	//
	//		for (let i = 0; i < this.sortingArray.length; i++) {
	//			const up = ((i >> p) & 2) === 0
	//			if (
	//				(i & d) == 0 &&
	//				this.sortingArray[i].height > this.sortingArray[i | d].height === up
	//			) {
	//				this.swapArrayElements(i, i | d)
	//				await this.redrawRectangles(i, i | d)
	//				// const tmp = x[i]
	//				// x[i] = x[i | d]
	//				// x[i | d] = tmp
	//			}
	//		}
	//	}

	// // // // // // //
	// Other methods
	// // // // // // //
	private isSorted() {
		for (let index = 0; index < this.sortingArray.length - 1; index++) {
			if (
				this.sortingArray[index].height > this.sortingArray[index + 1].height
			) {
				return false
			}
		}
		return true
	}

	private sleep(time: number) {
		return new Promise((s) => {
			setTimeout(s, time)
		})
	}

	private sortingMethodStarted() {
		this.disableRectangleSlider = true
		this.disableRandomizeButton = true
		this.disableSortButtons = true
		this.disableStopButton = false
	}

	private sortingMethodEnded() {
		this.disableRectangleSlider = false
		this.disableRandomizeButton = false
		this.disableSortButtons = false
		this.disableStopButton = true
	}

	private swapArrayElements(indexOne: number, indexTwo: number) {
		// swap the x positions of the 2 rectangles
		const temp1 = this.sortingArray[indexOne].x
		this.sortingArray[indexOne].x = this.sortingArray[indexTwo].x
		this.sortingArray[indexTwo].x = temp1
		// then swap their position in the array
		const temp2 = this.sortingArray[indexOne]
		this.sortingArray[indexOne] = this.sortingArray[indexTwo]
		this.sortingArray[indexTwo] = temp2
	}

	private async drawAllRectangles() {
		for (let n = 0; n < this.numberOfRectangles; n++) {
			await this.drawRectangle(n)
		}
	}

	private async redrawRectangles(firstIndex: number, secondIndex: number) {
		this.app.stage.swapChildren(
			(this.app.stage.children[secondIndex] as Graphics).clear(),
			(this.app.stage.children[firstIndex] as Graphics).clear()
		)

		await this.redrawRectangle(firstIndex)
		await this.redrawRectangle(secondIndex)
	}

	private async drawRectangle(index: number) {
		const arrayRect = this.sortingArray[index]
		this.app.stage.addChild(
			new Graphics()
				.beginFill(0x00ff00)
				.drawRect(arrayRect.x, arrayRect.y, arrayRect.width, arrayRect.height)
				.endFill()
		)
		await this.sleep(this.sleepTime)
	}

	private async redrawRectangle(index: number) {
		const arrayRect = this.sortingArray[index]
		this.beep(arrayRect.frequency)
		;(this.app.stage.children[index] as Graphics)
			.beginFill(0x00ff00)
			.drawRect(arrayRect.x, arrayRect.y, arrayRect.width, arrayRect.height)
			.endFill()
		await this.sleep(this.sleepTime)
	}

	private createUnsortedArray() {
		const divWidth = this.canvasElement.clientWidth
		const widthOfRectangle = divWidth / this.numberOfRectangles
		const divHeight = this.canvasElement.clientHeight
		const heightOfRectangle = divHeight / this.numberOfRectangles
		const widthValue = widthOfRectangle - 1
		const lowFrequencyBound = 100
		const highFrequencyBound = 10000
		const frequencyIncrease = highFrequencyBound / this.numberOfRectangles

		for (let n = 0; n < this.numberOfRectangles; n++) {
			this.sortingArray.push({
				x: Number((n * widthOfRectangle).toFixed(2)),
				y: Number((divHeight - (n + 1) * heightOfRectangle).toFixed(2)),
				width: Number(widthValue.toFixed(2)),
				height: Number((n * heightOfRectangle + heightOfRectangle).toFixed(2)),
				frequency: frequencyIncrease * n + lowFrequencyBound
			})
		}

		const sortingLengthMultiplied = this.numberOfRectangles * 10
		for (let n = 0; n < sortingLengthMultiplied; n++) {
			this.randomSwaps()
		}
	}

	private randomSwaps() {
		const firstElementIndex = Math.floor(
			Math.random() * this.numberOfRectangles
		)
		let secondElementIndex = 0
		do {
			secondElementIndex = Math.floor(Math.random() * this.numberOfRectangles)
		} while (firstElementIndex === secondElementIndex)

		this.swapArrayElements(firstElementIndex, secondElementIndex)
		return [firstElementIndex, secondElementIndex]
	}

	private async beep(frequency: number) {
		if (this.volume > 0) {
			const oscillator = this.audioContext.createOscillator()
			const gainNode = this.audioContext.createGain()
			oscillator.connect(gainNode)
			gainNode.connect(this.audioContext.destination)
			gainNode.gain.value = this.volume
			oscillator.type = 'sine'
			oscillator.frequency.value = frequency
			oscillator.start()
			await this.sleep(50)
			oscillator.stop()
		}
	}
}
