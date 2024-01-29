import type { SortingRect, SortingVisualizationProps } from '#types'

// TODO: stop execution isnt working oops
export async function startQuickSort(
	sortingArray: SortingRect[],
	algorithm: SortingVisualizationProps,
	redrawRectangles: (firstIndex: number, secondIndex: number) => Promise<void>
) {
	let quickSortIndex = 0

	await quickSort(0, sortingArray.length - 1)

	async function quickSort(left: number, right: number) {
		quickSortIndex = await quicksortPartition(left, right) //index returned from partition
		if (algorithm.stopExecution) return

		//more elements on the left side of the pivot
		if (left < quickSortIndex - 1) await quickSort(left, quickSortIndex - 1)

		//more elements on the right side of the pivot
		if (quickSortIndex < right) await quickSort(quickSortIndex, right)
	}

	async function quicksortPartition(left: number, right: number) {
		const pivot = sortingArray[Math.floor((right + left) / 2)]
		while (left <= right) {
			if (algorithm.stopExecution) return 0

			// increment up until find a height to the left larger than the pivot
			while (sortingArray[left].height < pivot.height) left++

			// increment up until  find a height to the right smaller than the pivot
			while (sortingArray[right].height > pivot.height) right--

			if (left <= right) await redrawRectangles(left, right)
			left++
			right--
		}
		return left
	}
}
