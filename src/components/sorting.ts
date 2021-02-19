import { Vue } from 'vue-class-component'
import { PixiRect } from '@/typings'
import { Application, Graphics } from 'pixi.js'

export default class Sorting extends Vue {
	public sleepTime = 0
	public numberOfRectangles = 100
	public busy = false
	public stopExecution = false
	public disableStopButton = true
	// public soundOn = false

	private app!: Application
	private canvasElement!: HTMLCanvasElement
	private sortingArray: PixiRect[] = []
	// private audioContext!: AudioContext

	public mounted() {
		this.canvasElement = this.$refs.pixi as HTMLCanvasElement
		this.app = new Application({
			autoStart: true,
			width: this.canvasElement.clientWidth,
			height: this.canvasElement.clientHeight,
			view: this.canvasElement,
			clearBeforeRender: false,
			powerPreference: 'high-performance',
			sharedTicker: false,
			sharedLoader: false,
			resizeTo: this.canvasElement
		})

		// this.audioContext = new window.AudioContext()
		this.createUnsortedArray()
		this.drawAllRectangles()
	}

	public async stop() {
		this.stopExecution = true
		this.disableStopButton = false
		await this.sleep(500) // easy safe way to ensure all operations are done
		this.stopExecution = false
		this.disableStopButton = true
		this.busy = false
	}

	public async randomizeArray() {
		this.busy = true
		this.disableStopButton = true

		while (this.sortingArray.length > 0) {
			this.sortingArray.pop()
			this.app.stage.children[0].destroy()
		}
		this.createUnsortedArray()

		await this.drawAllRectangles()
		this.busy = false
	}

	// sorting styles to add   heap sort     radix sorts    tim sort
	// C standard in place and non in place    bogo sort     merge sort    quick sort

	// The algorithms are: selection sort, insertion sort, quick sort,
	// merge sort, heap sort, radix sort (LSD), radix sort (MSD),
	// std::sort (intro sort), std::stable_sort (adaptive merge sort), shell sort, bubble sort,
	//  cocktail shaker sort, gnome sort, bitonic sort and bogo sort (30 seconds of it).

	// // // // // // //
	// Sorting methods
	// // // // // // //
	public async bubbleSort() {
		this.sortingMethodStarted()
		const length = this.sortingArray.length
		let swapped = false
		let count = 0
		let loopLength = 0
		do {
			count++
			swapped = false
			loopLength = length - count
			for (let i = 0; i < loopLength; i++) {
				if (this.stopExecution) {
					return
				}
				if (this.sortingArray[i].height > this.sortingArray[i + 1].height) {
					// swap the x position of the two elements
					this.sortingArray[i + 1].x = [
						this.sortingArray[i].x,
						(this.sortingArray[i].x = this.sortingArray[i + 1].x)
					][0]

					// swap the array positions
					this.sortingArray[i + 1] = [
						this.sortingArray[i],
						(this.sortingArray[i] = this.sortingArray[i + 1])
					][0]

					swapped = true
				}
				await this.redrawRectangles(i, i + 1)
			}
		} while (swapped)
		this.sortingMethodEnded()
	}

	public async insertionSort() {
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

				// swap the x of the 2 elements then swap the array elements
				this.sortingArray[j + 1].x = [
					this.sortingArray[j].x,
					(this.sortingArray[j].x = this.sortingArray[j + 1].x)
				][0]
				this.sortingArray[j + 1] = [
					this.sortingArray[j],
					(this.sortingArray[j] = this.sortingArray[j + 1])
				][0]
				await this.redrawRectangles(j, j + 1)
			}

			// swap the x of the 2 elements then swap the array elements
			this.sortingArray[j + 1].x = [
				current.x,
				(current.x = this.sortingArray[j + 1].x)
			][0]
			this.sortingArray[j + 1] = [
				current,
				(current = this.sortingArray[j + 1])
			][0]
		}
		this.sortingMethodEnded()
	}

	public async selectionSort() {
		this.sortingMethodStarted()
		let length = this.sortingArray.length
		let minHeight = 0

		for (let n = 0; n < length; n++) {
			// Finding the smallest number in the subarray
			minHeight = n
			for (let x = n + 1; x < length; x++) {
				if (this.stopExecution) {
					return
				}
				if (this.sortingArray[x].height < this.sortingArray[minHeight].height) {
					minHeight = x
				}
			}
			if (minHeight !== n) {
				// swap the x of the 2 elements then swap the array elements
				this.sortingArray[minHeight].x = [
					this.sortingArray[n].x,
					(this.sortingArray[n].x = this.sortingArray[minHeight].x)
				][0]
				this.sortingArray[minHeight] = [
					this.sortingArray[n],
					(this.sortingArray[n] = this.sortingArray[minHeight])
				][0]
				await this.redrawRectangles(n, minHeight)
			}
		}
		this.sortingMethodEnded()
	}

	// // // // // // //
	// Private methods
	// // // // // // //
	private sleep(time: number) {
		return new Promise(s => setTimeout(s, time))
	}

	private sortingMethodStarted() {
		this.busy = true
		this.disableStopButton = false
	}

	private sortingMethodEnded() {
		this.busy = false
		this.disableStopButton = true
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

		for (let n = 0; n < this.numberOfRectangles; n++) {
			this.sortingArray.push({
				x: n * widthOfRectangle,
				y: divHeight - (n + 1) * heightOfRectangle,
				width: widthValue,
				height: n * heightOfRectangle + heightOfRectangle
			})
		}

		// randomize sorting array
		const sortingLength = this.sortingArray.length
		const sortingLengthMultiplied = sortingLength * 10
		for (let n = 0; n < sortingLengthMultiplied; n++) {
			const firstElementIndex = Math.floor(Math.random() * sortingLength)
			let secondElementIndex = 0
			do {
				secondElementIndex = Math.floor(Math.random() * sortingLength)
			} while (firstElementIndex === secondElementIndex)

			// swap the x position of the two elements
			this.sortingArray[secondElementIndex].x = [
				this.sortingArray[firstElementIndex].x,
				(this.sortingArray[firstElementIndex].x = this.sortingArray[
					secondElementIndex
				].x)
			][0]

			// swap the array positions
			this.sortingArray[secondElementIndex] = [
				this.sortingArray[firstElementIndex],
				(this.sortingArray[firstElementIndex] = this.sortingArray[
					secondElementIndex
				])
			][0]
		}
	}

	// if (this.soundOn) {
	// 	this.beep(1000, 0.1)
	// }
	// // TODO - hook up audio to sorting
	// private async beep(frequency: number, volume: number) {
	// 	const oscillator = this.audioContext.createOscillator()
	// 	const gainNode = this.audioContext.createGain()
	// 	oscillator.connect(gainNode)
	// 	gainNode.connect(this.audioContext.destination)
	// 	oscillator.type = 'sine'
	// 	gainNode.gain.value = volume
	// 	oscillator.frequency.value = frequency
	// 	oscillator.start()
	// 	await this.sleep(50)
	// 	oscillator.stop()
	// }
}
