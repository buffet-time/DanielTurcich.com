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
	public releasesToShow: string[][] = []
	public searchInput = ''
	public reviewsText = ''
	public intializing = true
	public showCopyButton = false
	public showReleasesDiv = false
	public showNoResults = false
	public numberOfReleases = 'Loading...'
	public averageYear = 'Loading...'
	public averageScore = 'Loading...'
	public numberOfArtists = 'Loading...'
	public numberOf50sAndBefore = 'Loading...'
	public numberOf1960sReleases = 'Loading...'
	public numberOf1970sReleases = 'Loading...'
	public numberOf1980sReleases = 'Loading...'
	public numberOf1990sReleases = 'Loading...'
	public numberOf2000sReleases = 'Loading...'
	public numberOf2010sReleases = 'Loading...'
	public numberOf2020sReleases = 'Loading...'

	// add possible functionality to export last.fm to chart?

	public async created(): Promise<void> {
		await this.initializeSheets()
		this.intializing = false
		let scoreCount = 0,
			questionMarkScoreCount = 0,
			yearCount = 0,
			tempScore = 0,
			tempYear = 0,
			before1960 = 0,
			num1960s = 0,
			num1970s = 0,
			num1980s = 0,
			num1990s = 0,
			num2000s = 0,
			num2010s = 0,
			num2020s = 0
		const reversedArray = this.releasesArray.reverse()
		const artistArray: string[] = []

		reversedArray.forEach((current) => {
			if (!artistArray.includes(current[Release.artist])) {
				artistArray.push(current[Release.artist])
			}
			const currentYear = Number(current[Release.year])
			if (currentYear) {
				tempYear += currentYear
				yearCount++
				if (currentYear > 2019) {
					num2020s++
				} else if (currentYear > 2009) {
					num2010s++
				} else if (currentYear > 1999) {
					num2000s++
				} else if (currentYear > 1989) {
					num1990s++
				} else if (currentYear > 1979) {
					num1980s++
				} else if (currentYear > 1969) {
					num1970s++
				} else if (currentYear > 1959) {
					num1960s++
				} else {
					before1960++
				}
			}
			if (this.isNum(current[Release.score])) {
				tempScore += Number(current[Release.score])
				scoreCount++
			} else if (current[Release.score] == '?') {
				questionMarkScoreCount++
			}
		})
		this.releasesArray.reverse()

		this.averageScore = (tempScore / scoreCount).toFixed(2)
		this.numberOfArtists = artistArray.length.toString()
		this.averageYear = (tempYear / yearCount).toFixed(2)
		this.numberOfReleases = (scoreCount + questionMarkScoreCount).toString()
		this.numberOf50sAndBefore = before1960.toString()
		this.numberOf1960sReleases = num1960s.toString()
		this.numberOf1970sReleases = num1970s.toString()
		this.numberOf1980sReleases = num1980s.toString()
		this.numberOf1990sReleases = num1990s.toString()
		this.numberOf2000sReleases = num2000s.toString()
		this.numberOf2010sReleases = num2010s.toString()
		this.numberOf2020sReleases = num2020s.toString()
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
		this.releasesToShow = this.getRelasesFromSearch(column, equals)

		if (this.releasesToShow.length > 0) {
			this.showReleasesDiv = true
			this.showCopyButton = true
			this.reviewsText = this.arrayToFormattedOutput(this.releasesToShow)
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
			range2021 = 'Main!A2:G'

		const [arrayBefore, array2020, array2021] = await Promise.all([
			this.getArray(idBefore, rangeBefore),
			this.getArray(id2020, range2020),
			this.getArray(id2021, range2021)
		])

		for (let x = 0; x < this.releasesArray.length; x++) {
			for (let n = 0; n < this.releasesArray[x].length; n++) {
				this.releasesArray[x][n].trim()
			}
		}

		this.releasesArray = arrayBefore
			.concat(array2020, array2021)
			.filter((current) => current.length > 5) // makes sure to not include any not fully written reviews
	}

	private getRelasesFromSearch(index: Release, equals: boolean): string[][] {
		if (equals) {
			return this.releasesArray.filter((release) => {
				if (release[index]) {
					return release[index].toLowerCase() === this.searchInput
				} else {
					return false
				}
			})
		} else {
			return this.releasesArray.filter((release) => {
				if (release[index]) {
					return release[index].toLowerCase().includes(this.searchInput)
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
					return ` ${release[Release.artist]} - ${release[Release.name]}: ${
						release[Release.score]
					}`
				} else {
					return ''
				}
			})
			.toString()
	}

	private async getArray(id: string, range: string): Promise<string[][]> {
		return (
			await fetch(`https://api.danielturcich.com/Sheets/${id}/${range}`)
		).json()
	}

	private isNum(value: string): boolean {
		return !isNaN(Number(value))
	}
}
