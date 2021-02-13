import { Vue } from 'vue-class-component'
import * as PIXI from 'pixi.js'
import { PixiGraphicsRect } from '@/typings'

export default class Sorting extends Vue {
	public app!: PIXI.Application
	public sortingArray!: PixiGraphicsRect[]
	public pixiGraphics!: PIXI.Graphics

	public mounted() {
		this.app = new PIXI.Application({
			width: 1915,
			height: 870,
			transparent: true
		})
		const pixiRef = this.$refs.pixi as HTMLElement
		pixiRef.appendChild(this.app.view)
		this.pixiGraphics = new PIXI.Graphics()
		this.app.stage.addChild(this.pixiGraphics)

		this.sortingArray = this.createUnsortedArray()
		this.drawAllRectangles()

		this.bubbleSort()
	}

	private createUnsortedArray() {
		const sortingArray: PixiGraphicsRect[] = [
			{ x: 0, y: 0, width: 0, height: 0 }
		]

		sortingArray.pop()

		for (let n = 0; n < 870; n++) {
			const rect: PixiGraphicsRect = {
				x: n + 1,
				y: 870 - n,
				width: 1,
				height: n + 1
			}
			sortingArray.push(rect)
		}

		for (let n = 0; n < 2500; n++) {
			const firstElementIndex = Math.floor(Math.random() * sortingArray.length)
			let secondElementIndex = 0
			do {
				secondElementIndex = Math.floor(Math.random() * sortingArray.length)
			} while (firstElementIndex === secondElementIndex)

			// swap the x position of the two elements
			sortingArray[secondElementIndex].x = [
				sortingArray[firstElementIndex].x,
				(sortingArray[firstElementIndex].x = sortingArray[secondElementIndex].x)
			][0]

			// swap the array positions
			sortingArray[secondElementIndex] = [
				sortingArray[firstElementIndex],
				(sortingArray[firstElementIndex] = sortingArray[secondElementIndex])
			][0]
		}
		return sortingArray
	}

	private async drawAllRectangles() {
		for (let n = 0; n < this.app.screen.height; n++) {
			this.pixiGraphics.addChild(new PIXI.Graphics())
			this.drawRectangle(n)
		}
		await this.sleep(0.001)
	}

	private async drawRectangles(firstIndex: number, secondIndex: number) {
		;(this.pixiGraphics.children[firstIndex] as PIXI.Graphics).clear()
		;(this.pixiGraphics.children[secondIndex] as PIXI.Graphics).clear()
		this.drawRectangle(firstIndex)
		await this.drawRectangle(secondIndex)
	}

	private async drawRectangle(index: number) {
		const graphics = this.pixiGraphics.children[index] as PIXI.Graphics
		graphics.beginFill(0xde3249, 1)
		graphics.drawRect(
			this.sortingArray[index].x,
			this.sortingArray[index].y,
			this.sortingArray[index].width,
			this.sortingArray[index].height
		)
		graphics.endFill()
		await this.sleep(0.001)
	}

	private async bubbleSort() {
		const length = this.sortingArray.length
		let swapped = false
		let count = 0
		let loopLength = 0
		do {
			count++
			swapped = false
			loopLength = length - count
			for (let i = 0; i < loopLength; i++) {
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

					await this.drawRectangles(i + 1, i)
					swapped = true
				} else {
					console.log(new Date().getTime())
					await this.drawRectangles(i, i + 1)
					console.log(new Date().getTime())
				}
			}
		} while (swapped)
	}

	private async insertionSort() {
		const length = this.sortingArray.length
		let j = 0
		let current: PixiGraphicsRect

		for (let i = 0; i < length; i++) {
			current = this.sortingArray[i]

			for (
				j = i - 1;
				j >= 0 && this.sortingArray[j].height > current.height;
				j--
			) {
				// swap the x of the 2 elements then swap the array elements
				this.sortingArray[j + 1].x = [
					this.sortingArray[j].x,
					(this.sortingArray[j].x = this.sortingArray[j + 1].x)
				][0]
				this.sortingArray[j + 1] = [
					this.sortingArray[j],
					(this.sortingArray[j] = this.sortingArray[j + 1])
				][0]
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
	}

	private async selectionSort() {
		let length = this.sortingArray.length
		let minHeight = 0

		for (let n = 0; n < length; n++) {
			// Finding the smallest number in the subarray
			minHeight = n
			for (let x = n + 1; x < length; x++) {
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
			}
		}
	}

	private sleep(time: number) {
		return new Promise(s => setTimeout(s, time))
	}
}
