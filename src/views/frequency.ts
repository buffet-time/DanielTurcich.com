/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GeneratorSettings } from '@/typings'
import { Options, Vue } from 'vue-class-component'
import noteGenerator from '../components/soundGenerator.vue'

@Options({
	components: {
		'd-sound-gen': noteGenerator
	}
})
export default class Frequency extends Vue {
	// public showGenerators = true
	public childRefs: any[] = []
	public generators: GeneratorSettings[] = [
		{
			generatorType: 'Frequency',
			volume: 0.07,
			frequency: 440,
			oscillatorType: 'sine'
		},
		{
			generatorType: 'Note',
			volume: 0.07,
			frequency: 440,
			oscillatorType: 'square',
			noteName: 'A',
			noteOctave: 4,
			noteOffset: 0,
			notesIndex: 9
		},
		{
			generatorType: 'Frequency',
			volume: 0.1,
			frequency: 450,
			oscillatorType: 'sine'
		}
	]

	// public mounted(): void {
	// 	for (let x = 0; x < this.generators.length; x++) {
	// 		console.log(this.childRefs[x].generatorSettings)
	// 	}
	// }

	public setChildRef(el: any): void {
		this.childRefs.push(el)
	}

	public onDeleteGenerator(index: number): void {
		// console.log(1, this.generators)
		console.log(1, index)
		// this.showGenerators = false
		// console.log(index, this.generators)
		this.childRefs.splice(index, 1)
		// console.log(2)
		// console.log(
		this.generators.splice(index, 1)

		// console.log(3)
		// )
		// this.showGenerators = true
		// console.log(4)
		// console.log(1, this.generators)
	}
}
