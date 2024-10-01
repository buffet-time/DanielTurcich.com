import type { SortingRect } from '#types'
import { useStopExecution } from '#stores/sorting'

// TODO: stop execution isnt working oops
export async function startQuickSort(
	sortingArray: SortingRect[],
	redrawRectangles: (firstIndex: number, secondIndex: number) => Promise<void>,
) {
	const store = useStopExecution()
	let quickSortIndex = 0

	await quickSort(0, sortingArray.length - 1)

	async function quickSort(left: number, right: number) {
		quickSortIndex = await quicksortPartition(left, right) //index returned from partition
		if (store.stopExecution) return

		//more elements on the left side of the pivot
		if (left < quickSortIndex - 1) await quickSort(left, quickSortIndex - 1)

		//more elements on the right side of the pivot
		if (quickSortIndex < right) await quickSort(quickSortIndex, right)
	}

	async function quicksortPartition(left: number, right: number) {
		const pivot = sortingArray[Math.floor((right + left) / 2)]
		while (left <= right) {
			if (store.stopExecution) return 0

			// increment up until find a height to the left larger than the pivot
			// biome-ignore lint:
			while (sortingArray[left].height < pivot.height) left++

			// increment up until  find a height to the right smaller than the pivot
			// biome-ignore lint:
			while (sortingArray[right].height > pivot.height) right--

			if (left <= right) await redrawRectangles(left, right)
			// biome-ignore lint:
			left++
			// biome-ignore lint:
			right--
		}
		return left
	}
}
