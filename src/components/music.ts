/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Release } from '@/typings'
import { Vue } from 'vue-class-component'
import 'bootstrap/js/dist/tab'

export default class Home extends Vue {
	public releasesArray: string[][] = []
	public searchInput = ''
	public reviewsText = ''
	public intializing = true
	public showCopyButton = false
	public numberOfReleases = 'Loading...'
	public averageYear = 'Loading...'
	public averageScore = 'Loading...'

	public async created(): Promise<void> {
		await this.initializeSheets()
		this.intializing = false
		function isNum(value: string): boolean {
			return !isNaN(Number(value))
		}
		let scoreCount = 0,
			questionMarkScoreCount = 0,
			yearCount = 0,
			tempScore = 0,
			tempYear = 0

		this.releasesArray.forEach((current) => {
			if (isNum(current[Release.year])) {
				tempYear += Number(current[Release.year])
				yearCount++
			}
			if (isNum(current[Release.score])) {
				tempScore += Number(current[Release.score])
				scoreCount++
			} else if (current[Release.score] == '?') {
				questionMarkScoreCount++
			}
		})

		this.averageScore = (tempScore / scoreCount).toFixed(2)
		this.averageYear = (tempYear / yearCount).toFixed(2)
		this.numberOfReleases = (scoreCount + questionMarkScoreCount).toString()
	}

	public copyReviews(): void {
		navigator.clipboard.writeText(this.reviewsText)
	}

	public searchButtonPressed(): void {
		this.searchInput = this.searchInput.trim().toLowerCase()
		const column = Number((this.$refs.searchType as HTMLSelectElement).value)
		let equals = false

		switch (column) {
			case Release.score:
				equals = true
				break
			case Release.type:
				equals = true
				break
			case Release.year:
				equals = true
				break
		}
		const results = this.arrayToFormattedOutput(
			this.getRelasesFromSearch(column, equals)
		)
		if (results.length > 0) {
			this.showCopyButton = true
			this.reviewsText = results
		} else {
			this.showCopyButton = false
			this.reviewsText = 'No results for your search.'
		}
	}

	private async initializeSheets() {
		const idBefore = '1tn0BmleHcs0okzWKhUnyOCWUPD422HvutpNQNzdAAIk',
			rangeBefore = 'Main!A2:F',
			id2020 = '1dmETb3Ybqs8Dhez_kP2DHiXR_Gqw-X56qsXDHYyTH1w',
			range2020 = 'Main!A2:F',
			id2021 = '18V5oypFBW3Bu_tHxfTL-iSbb9ALYrCJlMwLhpPmp72M',
			range2021 = 'Main!A2:F'

		const [arrayBefore, array2020, array2021] = await Promise.all([
			this.getArray(idBefore, rangeBefore),
			this.getArray(id2020, range2020),
			this.getArray(id2021, range2021)
		])

		this.releasesArray = arrayBefore.concat(array2020, array2021)
	}

	private getRelasesFromSearch(index: Release, equals: boolean): string[][] {
		if (equals) {
			return this.releasesArray.filter((release) => {
				if (release[index]) {
					return release[index].trim().toLowerCase() === this.searchInput
				} else {
					return false
				}
			})
		} else {
			return this.releasesArray.filter((release) => {
				if (release[index]) {
					return release[index].trim().toLowerCase().includes(this.searchInput)
				} else {
					return false
				}
			})
		}
	}

	private arrayToFormattedOutput(array: string[][]): string {
		return array
			.map((release) => {
				if (release.length > 0) {
					return ` ${release[Release.artist].trim()} - ${release[
						Release.name
					].trim()}: ${release[Release.score].trim()}`
				} else {
					return ''
				}
			})
			.toString()
	}

	private async getArray(id: string, range: string): Promise<string[][]> {
		const response = await fetch(
			`https://api.danielturcich.com/Sheets/${id}/${range}`
		)
		const data: string[][] = await response.json()
		return data
	}
}
