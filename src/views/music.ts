/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Release } from '@/typings'
import { Options, Vue } from 'vue-class-component'
import 'bootstrap/js/dist/tab'
import MusicRelease from '../components/musicRelease.vue'

@Options({
	components: {
		'music-release': MusicRelease
	}
})
export default class Home extends Vue {
	public releasesArray: string[][] = []
	public releaseToShow: string[][] = []
	public searchInput = ''
	public reviewsText = ''
	public intializing = true
	public showCopyButton = false
	public showReleasesDiv = false
	public showNoResults = false
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

		const reversedArray = this.releasesArray.reverse()
		reversedArray.forEach((current) => {
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
		this.releasesArray.reverse()

		this.averageScore = (tempScore / scoreCount).toFixed(2)
		this.averageYear = (tempYear / yearCount).toFixed(2)
		this.numberOfReleases = (scoreCount + questionMarkScoreCount).toString()
	}

	public copyReviews(): void {
		navigator.clipboard.writeText(this.reviewsText)
	}

	public searchButtonPressed(): void {
		this.showReleasesDiv = false
		this.showNoResults = false
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
		this.releaseToShow = this.getRelasesFromSearch(column, equals)

		if (this.releaseToShow.length > 0) {
			this.reviewsText = this.arrayToFormattedOutput(this.releaseToShow)
			this.showReleasesDiv = true
			this.showCopyButton = true
		} else {
			this.showNoResults = true
			this.showCopyButton = false
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

		this.releasesArray = arrayBefore
			.concat(array2020, array2021)
			.filter((current) => current.length > 5) // makes sure to not include any not fully written reviews
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
