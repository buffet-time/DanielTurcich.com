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

	private wordsArray: string[] = Words
	private acronymTextDiv: any

	public mounted() {
		this.acronymTextDiv = document.getElementById('acronymTextDiv')
	}

	public acronymButtonPressed() {
		if (this.acronymInput) {
			this.acronymTextDiv.innerText = this.getWordsFromProvidedAcronym(
				this.acronymInput
			)
				.toString()
				.replace(/,/g, '  ')
		}
	}

	public getWordsFromProvidedAcronym(acronym: string): string[] {
		const wordsFromAcronym: string[] = []
		const acronymArray: string[] = acronym.toLowerCase().split('')

		acronymArray.forEach(letter => {
			const wordsArray = this.getWordsStartingWith(letter)
			wordsFromAcronym.push(
				wordsArray[Math.floor(Math.random() * wordsArray.length)]
			)
		})

		return wordsFromAcronym
	}

	public getWordsStartingWith(letter: string): string[] {
		return this.wordsArray.filter(word => {
			if (word.startsWith(letter)) {
				return word
			}
		})
	}
}
