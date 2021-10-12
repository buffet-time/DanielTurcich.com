import { Release } from '../typings'
import { Options, Vue } from 'vue-class-component'
import 'bootstrap/js/dist/tab'
import MusicRelease from '../components/musicRelease.vue'
import { watch } from 'vue'

const loadingString = '...',
	idBefore = '1tn0BmleHcs0okzWKhUnyOCWUPD422HvutpNQNzdAAIk',
	rangeBefore = 'Main!A2:F',
	id2020 = '1dmETb3Ybqs8Dhez_kP2DHiXR_Gqw-X56qsXDHYyTH1w',
	range2020 = 'Main!A2:F',
	id2021 = '18V5oypFBW3Bu_tHxfTL-iSbb9ALYrCJlMwLhpPmp72M',
	range2021 = 'Main!A2:G'

@Options({
	components: {
		'music-release': MusicRelease
	}
})
export default class Home extends Vue {
	public releasesToShow: string[][] = []
	public latestYear = 2021
	public earliestYear = this.latestYear
	public searchType = '0'
	public searchInput = ''
	public intializing = true
	public showCopyButton = false
	public showReleasesDiv = false
	public showNoResults = false
	public numberOfReleases: string | number = loadingString
	public averageYear: string | number = loadingString
	public averageScore: string | number = loadingString
	public numberOfArtists: string | number = loadingString
	public numberOf50sAndBefore: string | number = loadingString
	public numberOf1960sReleases: string | number = loadingString
	public numberOf1970sReleases: string | number = loadingString
	public numberOf1980sReleases: string | number = loadingString
	public numberOf1990sReleases: string | number = loadingString
	public numberOf2000sReleases: string | number = loadingString
	public numberOf2010sReleases: string | number = loadingString
	public numberOf2020sReleases: string | number = loadingString
	public releaseTypes = [
		'Album',
		'EP',
		'Live Album',
		'Soundtrack',
		'Remix Album',
		'Compilation',
		'Demo Album'
	]

	private reviewsText = ''
	private releasesArray: string[][] = []

	// add possible functionality to export last.fm to chart?
	public async created(): Promise<void> {
		await this.initializeSheets()
		this.intializing = false
		const reversedArray = this.releasesArray.reverse()
		const artistArray: string[] = []
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

		reversedArray.forEach((current) => {
			if (!artistArray.includes(current[Release.artist])) {
				artistArray.push(current[Release.artist])
			}
			const currentYear = Number(current[Release.year])
			if (currentYear) {
				if (currentYear < this.earliestYear) {
					this.earliestYear = currentYear
				}
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
		this.numberOfArtists = artistArray.length
		this.averageYear = (tempYear / yearCount).toFixed(2)
		this.numberOfReleases = scoreCount + questionMarkScoreCount
		this.numberOf50sAndBefore = before1960
		this.numberOf1960sReleases = num1960s
		this.numberOf1970sReleases = num1970s
		this.numberOf1980sReleases = num1980s
		this.numberOf1990sReleases = num1990s
		this.numberOf2000sReleases = num2000s
		this.numberOf2010sReleases = num2010s
		this.numberOf2020sReleases = num2020s

		watch(
			() => this.searchType,
			() => {
				if (this.searchType === '2') {
					this.searchInput = '7'
				} else if (this.searchType === '3') {
					this.searchInput = 'Album'
				} else if (this.searchType === '4') {
					this.searchInput = this.latestYear.toString()
				} else {
					this.searchInput = ''
				}
			}
		)

		window.addEventListener('keydown', (event) => {
			if (this.searchType === '2') {
				this.incrementRange(event.key, 0.5, 0, 10)
			} else if (this.searchType === '4') {
				this.incrementRange(event.key, 1, this.earliestYear, this.latestYear)
			}
		})
	}

	public copyReviews(): void {
		navigator.clipboard.writeText(this.reviewsText)
	}

	public searchButtonPressed(): void {
		this.showReleasesDiv = false
		this.showNoResults = false
		this.searchInput = this.searchInput.trim()
		let equals = false

		switch (Number(this.searchType)) {
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
		this.releasesToShow = this.getRelasesFromSearch(
			Number(this.searchType),
			equals
		)

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
		const [arrayBefore, array2020, array2021] = await Promise.all([
			this.getArray(idBefore, rangeBefore),
			this.getArray(id2020, range2020),
			this.getArray(id2021, range2021)
		])

		this.releasesArray = arrayBefore
			.concat(array2020, array2021)
			.filter((current) => current.length > 5) // makes sure to not include any not fully written reviews

		for (let x = 0; x < this.releasesArray.length; x++) {
			for (let n = 0; n < this.releasesArray[x].length; n++) {
				this.releasesArray[x][n].trim()
			}
		}
	}

	private getRelasesFromSearch(index: Release, equals: boolean): string[][] {
		if (equals) {
			return this.releasesArray.filter(
				(release) =>
					release[index].toLowerCase() === this.searchInput.toLowerCase()
			)
		} else {
			return this.releasesArray.filter((release) =>
				release[index].toLowerCase().includes(this.searchInput.toLowerCase())
			)
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

	private incrementRange(
		key: string,
		incrementAmount: number,
		minimum: number,
		maximum: number
	): void {
		if (key === 'ArrowLeft' && Number(this.searchInput) > minimum) {
			this.searchInput = (
				Number(this.searchInput) + -incrementAmount
			).toString()
		} else if (key === 'ArrowRight' && Number(this.searchInput) < maximum) {
			this.searchInput = (Number(this.searchInput) + incrementAmount).toString()
		}
	}

	private async getArray(id: string, range: string): Promise<string[][]> {
		return (
			await fetch(
				`https://api.danielturcich.com/Sheets?id=${id}&range=${range}`
			)
		).json()
	}

	// for readability
	private isNum(value: string): boolean {
		return !isNaN(Number(value))
	}
}
