import { Vue } from 'vue-class-component'
import Words from '../assets/words.json'

const words: { [key: string]: string[] } = Words

export default class Acronym extends Vue {
	public acronymInput = ''
	public acronymText = ''

	private acronymTextDiv!: HTMLElement

	public mounted() {
		this.acronymTextDiv = document.getElementById('acronymTextDiv')!
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
		let wordsArray: string[]

		return acronymArray.map((letter: string) => {
			wordsArray = words[letter]
			return wordsArray[Math.floor(Math.random() * wordsArray.length)]
		})
	}
}
