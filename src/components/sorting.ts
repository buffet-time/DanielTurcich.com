import { Vue } from 'vue-class-component'
import { GraphicsRect } from '@/typings'
import { default as Two } from 'two.js'

export default class Sorting extends Vue {
	public sleepTime = 0
	public numberOfRectangles = 100
	public busy = false
	public stopExecution = false
	public disableStopButton = true

	private two!: Two
	private twoElement!: HTMLDivElement
	private sortingArray: GraphicsRect[] = []

	// sorting styles to add   heap sort     radix sorts    tim sort
	// C standard in place and non in place    bogo sort     merge sort    quick sort

	// The algorithms are: selection sort, insertion sort, quick sort,
	// merge sort, heap sort, radix sort (LSD), radix sort (MSD),
	// std::sort (intro sort), std::stable_sort (adaptive merge sort), shell sort, bubble sort,
	//  cocktail shaker sort, gnome sort, bitonic sort and bogo sort (30 seconds of it).
	public mounted() {
		this.twoElement = this.$refs.twojs as HTMLDivElement
		const params: Two.ConstructorParams = {
			width: this.twoElement.clientWidth,
			height: this.twoElement.clientHeight,
			autostart: true,
			type: Two.Types.webgl,
			fullscreen: false
		}
		this.two = new Two(params).appendTo(this.twoElement)
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
		while (this.two.scene.children.length > 0) {
			this.two.scene.children.pop()
			this.sortingArray.pop()
		}
		this.two.update()
		this.createUnsortedArray()
		await this.drawAllRectangles()
		this.busy = false
	}

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
		let current: GraphicsRect

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
	private createUnsortedArray() {
		const divWidth = this.twoElement.clientWidth
		const widthOfRectangle = (divWidth - 15) / this.numberOfRectangles
		const divHeight = this.twoElement.clientHeight
		const heightOfRectangle = (divHeight - 15) / this.numberOfRectangles

		const yValue = divHeight / 2
		const widthValue = widthOfRectangle - 1
		for (let n = 0; n < this.numberOfRectangles; n++) {
			const rect: GraphicsRect = {
				x: n * widthOfRectangle + widthOfRectangle,
				y: yValue,
				width: widthValue,
				height: n * heightOfRectangle + heightOfRectangle
			}
			this.sortingArray.push(rect)
		}

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

	private async drawRectangle(index: number, redraw?: boolean) {
		let rect: Two.Rectangle
		if (redraw) {
			const arrayRect = this.sortingArray[index]
			rect = this.two.makeRectangle(
				arrayRect.x,
				arrayRect.y,
				arrayRect.width,
				arrayRect.height
			)
			this.two.scene.children.splice(
				index,
				0,
				this.two.scene.children.pop() as any
			)
		} else {
			const arrayRect = this.sortingArray[index]
			rect = this.two.makeRectangle(
				arrayRect.x,
				arrayRect.y,
				arrayRect.width,
				arrayRect.height
			)
		}
		rect.fill = 'rgb(0, 255, 0)'
		rect.opacity = 1
		rect.noStroke()
		await this.sleep(this.sleepTime)
	}

	private async drawAllRectangles() {
		for (let n = 0; n < this.numberOfRectangles; n++) {
			await this.drawRectangle(n)
			this.two.update()
		}
	}

	private async redrawRectangles(smallerIndex: number, largerIndex: number) {
		;(this.two.scene.children[largerIndex] as Two.Path).remove()
		;(this.two.scene.children[smallerIndex] as Two.Path).remove()

		await this.drawRectangle(smallerIndex, true)
		await this.drawRectangle(largerIndex, true)
		this.two.update()
	}

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
}
