import type { SortingRect, SortingVisualizationProps } from '#types'
import { useStopExecution } from '#stores/sorting'

export async function startCombSort(
	sortingArray: SortingRect[],
	algorithm: SortingVisualizationProps,
	redrawRectangles: (firstIndex: number, secondIndex: number) => Promise<void>,
) {
	const store = useStopExecution()
	const decrease_factor = 1.25

	await combSort(sortingArray)

	// To find gap between elements
	function getNextGap(gap: number) {
		return gap === 1 ? gap : Math.floor(gap / decrease_factor)
	}

	async function combSort(sortingArray: SortingRect[]) {
		if (store.stopExecution) {
			console.log(1)
			return
		}
		const numberOfRectangles = Number(algorithm.numberOfRectangles)

		let gap = numberOfRectangles

		let swapped = true

		// Keep running while gap is more than
		// 1 and last iteration caused a swap
		while (gap !== 1 || swapped === true) {
			if (store.stopExecution) return

			gap = getNextGap(gap)

			swapped = false

			for (let i = 0; i < numberOfRectangles - gap; i++) {
				if (sortingArray[i].height > sortingArray[i + gap].height) {
					await redrawRectangles(i, i + gap)

					swapped = true
				}
			}
		}
	}
}
