import Vue from 'vue'
import Component from 'vue-class-component'
import Words from '../assets/words.json'
import Template from './acronym.component.html'
import { Navbar } from './navbar.component'

@Template
@Component({
	components: {
		'd-navbar': Navbar
	}
})
export class Acronym extends Vue {
	private wordsArray: string[] = Words

	public mounted() {
		console.log(this.getWordsFromProvidedAcronym('test'))
	}

	public getWordsStartingWith(letter: string): string[] {
		return this.wordsArray.filter(word => {
			if (word.startsWith(letter)) {
				return word
			}
		})
	}

	public getWordsFromProvidedAcronym(acronym: string): string[] {
		const wordsFromAcronym: string[] = []
		const acronymArray: string[] = acronym.split('')

		acronymArray.forEach(letter => {
			const wordsArray = this.getWordsStartingWith(letter)
			wordsFromAcronym.push(
				wordsArray[Math.floor(Math.random() * wordsArray.length)]
			)
		})

		return wordsFromAcronym
	}
}
