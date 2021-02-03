import { Options, Vue } from 'vue-class-component'
import Words from '../assets/words.json'

const words: { [key: string]: string[] } = Words

@Options({})
export default class Acronym extends Vue {
	public acronymInput: string = ''
	public acronymText: string = ''
	private acronymTextDiv: any

	public mounted() {
		this.acronymTextDiv = document.getElementById('acronymTextDiv')
	}

	public copyAcronym() {
		navigator.clipboard.writeText(this.acronymText)
	}

	public acronymButtonPressed() {
		if (this.acronymInput) {
			this.acronymText = this.getWordsFromProvidedAcronym(this.acronymInput)
				.toString()
				.replace(/,/g, '  ')
			this.acronymTextDiv.innerText = this.acronymText
		}
	}

	private getWordsFromProvidedAcronym(acronym: string): string[] {
		const acronymArray = acronym.toLowerCase().split('')
		let lengthOfWords = 0
		let wordsArray: string[]
		let generatedWord = ''

		return acronymArray.map((letter: string) => {
			if (lengthOfWords > 2000) {
				return 'F'
			} else {
				wordsArray = words[letter]
				generatedWord =
					wordsArray[Math.floor(Math.random() * wordsArray.length)]
				lengthOfWords += generatedWord.length + 1
				return generatedWord
			}
		})
	}
}
