import { Generator, GeneratorType } from '../typings'
import { Options, Vue } from 'vue-class-component'
import noteGenerator from '../components/soundGenerator.vue'
import 'bootstrap/js/dist/modal'
import { closeSvg, addSvg } from '../svgs'

const baseGeneratorConfig: Generator = {
	id: 0,
	settings: {
		generatorType: 'Frequency',
		volume: 0.07,
		frequency: 440,
		oscillatorType: 'sine'
	}
}

@Options({
	components: {
		'd-sound-gen': noteGenerator
	}
})
export default class Frequency extends Vue {
	public closeSvg = closeSvg
	public addSvg = addSvg

	public generators: Generator[] = [
		{
			id: 0,
			settings: {
				...baseGeneratorConfig.settings
			}
		},
		{
			id: 1,
			settings: {
				...baseGeneratorConfig.settings,
				generatorType: 'Note',
				noteName: 'A',
				noteOctave: 4,
				noteOffset: 0,
				notesIndex: 9
			}
		}
	]

	public addGenerator(type: GeneratorType): void {
		let availableId = 0
		while (this.isIdInUse(availableId)) {
			availableId++
		}

		const baseGenerator: Generator = {
			id: availableId,
			settings: {
				...baseGeneratorConfig.settings,
				generatorType: type
			}
		}

		if (type === 'Frequency') {
			this.generators.push(baseGenerator)
		} else {
			const noteGenerator: Generator = {
				id: availableId,
				settings: {
					...baseGenerator.settings,
					noteName: 'A',
					noteOctave: 4,
					noteOffset: 0,
					notesIndex: 9
				}
			}
			this.generators.push(noteGenerator)
		}
	}

	private isIdInUse(id: number): boolean {
		if (
			this.generators.some((generator) => {
				return generator.id === id
			})
		) {
			return true
		}

		return false
	}
}
