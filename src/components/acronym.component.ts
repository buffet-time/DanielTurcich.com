import { BButton, BFormInput } from 'bootstrap-vue'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Model } from 'vue-property-decorator'
import Words from '../assets/words.json'
import Template from './acronym.component.html'
import { Navbar } from './navbar.component'

@Template
@Component({
	components: {
		'd-navbar': Navbar,
		'b-button': BButton,
		'b-form-input': BFormInput
	}
})
export class Acronym extends Vue {
	@Model()
	public acronymInput?: string
	public acronymText: string = ''

	private wordsArray: string[] = Words
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
		const wordsFromAcronym: string[] = []
		const acronymArray: string[] = acronym.toLowerCase().split('')

		acronymArray.forEach((letter: string) => {
			const wordsArray: string[] = this.getWordsStartingWith(letter)
			wordsFromAcronym.push(
				wordsArray[Math.floor(Math.random() * wordsArray.length)]
			)
		})

		return wordsFromAcronym
	}

	private getWordsStartingWith(letter: string): string[] {
		return this.wordsArray.filter((word: string) => {
			if (word.startsWith(letter)) {
				return word
			}
		})
	}
}
