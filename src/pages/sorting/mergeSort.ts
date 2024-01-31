import type { SortingRect } from '#types'
import { useStopExecution } from '#stores/sorting'

export async function startMergeSort(
	sortingArray: SortingRect[],
	eraseRectangleByObject: (rect: SortingRect) => void,
	redrawRectangle: (index: number) => Promise<void>
): Promise<void> {
	// Less efficient and slightly modified to handle drawing properly
	const store = useStopExecution()

	async function mergeSort(
		sortingArray: SortingRect[]
	): Promise<SortingRect[]> {
		// TODO: this doesn't work!
		if (store.stopExecution) {
			return []
		}
		if (sortingArray.length < 2) {
			return sortingArray
		}

		const middle = Math.floor(sortingArray.length / 2)

		return merge(
			await mergeSort(sortingArray.slice(0, middle)),
			await mergeSort(sortingArray.slice(middle))
		)
	}

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
				continue
			}

			resultSortingArray.push(right[rightIndex])
			rightIndex++
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
		const indexArray: number[] = []
		const xValues = combinedArray.map((rect) => rect.height)

		xValues.forEach((xValue) =>
			indexArray.push(
				sortingArray.findIndex(
					(rect) =>
						rect.height ===
						combinedArray[xValues.findIndex((x) => x === xValue)].height
				)
			)
		)

		// drawing of the rectangles
		for (let n = 0; n < combinedArray.length; n++) {
			if (store.stopExecution) return []

			await redrawRectangle(indexArray[n])
		}

		return combinedArray
	}

	await mergeSort(sortingArray)

	return
}
