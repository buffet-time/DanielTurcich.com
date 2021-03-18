/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Release } from '@/typings'
import { Vue } from 'vue-class-component'

export default class Home extends Vue {
	public releasesArray?: string[][]
	public searchInput = ''
	public reviewsText = ''

	public async mounted(): Promise<void> {
		await this.initializeSheets()
	}

	public copyReviews(): void {
		navigator.clipboard.writeText(this.reviewsText)
	}

	public getReviewsButtonPressed(): void {
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
		this.reviewsText = this.arrayToFormattedOutput(
			this.getRelasesFromSearch(column, equals)
		)
	}

	private async initializeSheets() {
		const idBefore = '1tn0BmleHcs0okzWKhUnyOCWUPD422HvutpNQNzdAAIk'
		const rangeBefore = 'Main!A2:F'
		const id2020 = '1dmETb3Ybqs8Dhez_kP2DHiXR_Gqw-X56qsXDHYyTH1w'
		const range2020 = 'Main!A2:C'
		const id2021 = '18V5oypFBW3Bu_tHxfTL-iSbb9ALYrCJlMwLhpPmp72M'
		const range2021 = 'Main!A2:F'

		const [arrayBefore, array2020, array2021] = await Promise.all([
			this.getArray(idBefore, rangeBefore),
			this.getArray(id2020, range2020),
			this.getArray(id2021, range2021)
		])

		this.releasesArray = arrayBefore.concat(array2020.concat(array2021))
	}

	private getRelasesFromSearch(index: Release, equals: boolean): string[][] {
		if (equals) {
			return this.releasesArray!.filter((release) => {
				if (release[index]) {
					return release[index].trim().toLowerCase() === this.searchInput
				} else {
					return false
				}
			})
		} else {
			return this.releasesArray!.filter((release) => {
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
				if (release.length === 3) {
					return ` ${release[Release.artist].trim()} - ${release[
						Release.name
					].trim()}: ${release[Release.score].trim()}`
				} else if (release.length === 6) {
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
		return new Promise((resolve) => {
			const httpRequest = new XMLHttpRequest()

			httpRequest.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					const sheetResult: string[][] = JSON.parse(
						'[' + httpRequest.response + ']'
					)[0]
					resolve(sheetResult)
				}
			}

			httpRequest.open(
				'GET',
				`https://api.danielturcich.com/Sheets/${id}/${range}`,
				true
			)

			httpRequest.send()
		})
	}
}
