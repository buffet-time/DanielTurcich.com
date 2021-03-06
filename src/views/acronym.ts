import { Vue } from 'vue-class-component'
import Words from '../acronymWords.json'

const words: { [key: string]: string[] } = Words

export default class Acronym extends Vue {
	public acronymInput = ''
	public buttonPressedState = ''
	public textToDisplay = ''

	private acronymText = ''

	public copyAcronym(): void {
		navigator.clipboard.writeText(this.acronymText)
	}

	public acronymButtonPressed(): void {
		if (this.acronymInput) {
			if (this.acronymInput.split(' ').length > 1) {
				this.buttonPressedState = 'error'
				this.textToDisplay = 'There can not be spaces in the input.'
			} else {
				this.acronymText = this.getWordsFromProvidedAcronym(this.acronymInput)
					.toString()
					.replace(/,/g, '  ')
				this.buttonPressedState = 'good'
				this.textToDisplay = this.acronymText
			}
		} else {
			this.buttonPressedState = 'error'
			this.textToDisplay = 'Must type a word to generate an acronym.'
		}
	}

	private getWordsFromProvidedAcronym(acronym: string): string[] {
		const acronymArray = acronym.toLowerCase().split('')
		let wordsArray: string[]

		return acronymArray.map((letter: string) => {
			wordsArray = words[letter]
			return wordsArray[Math.floor(Math.random() * wordsArray.length)]
		})
	}
}
