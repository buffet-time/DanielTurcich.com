/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GeneratorSettings } from '@/typings'
import { watch } from 'vue'
import { Vue, prop, Options } from 'vue-class-component'

class Props {
	generatorSettings: GeneratorSettings = prop({
		type: Object,
		required: true
	})
}

@Options({
	emits: ['deleteGenerator']
})
export default class SoundGenerator extends Vue.with(Props) {
	public started = false
	public isDeleting = false

	private audioContext!: AudioContext
	private oscillator!: OscillatorNode
	private gainNode!: GainNode
	private initialized = false

	// for notes
	// prettier-ignore
	private notes = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B']
	private twelthRoot = 2 ** (1 / 12)
	private fixedNote = 440 // Frequency of A4
	private difference = 0

	public mounted(): void {
		console.log(10)
		// try {
		// 	this.initializeContext()
		// } catch (error) {
		// 	console.log(error)
		// }
		// this.$nextTick({})
		watch(
			() => this.generatorSettings.frequency,
			() => {
				this.generatorSettings.frequency = Number(
					this.generatorSettings.frequency
				)

				if (this.isDeleting) {
					return
				}
				if (!this.initialized) {
					this.initializeContext()
				}

				this.oscillator.frequency.setValueAtTime(
					this.generatorSettings.frequency,
					this.audioContext.currentTime
				)
			}
		)

		if (this.generatorSettings.generatorType === 'Note') {
			watch(
				() => this.generatorSettings.noteOffset!,
				(newValue, previousValue) => {
					this.generatorSettings.noteOffset = Number(
						this.generatorSettings.noteOffset
					)

					if (this.isDeleting) {
						return
					}
					if (!this.initialized) {
						this.initializeContext()
					}

					this.difference = newValue - previousValue
					this.updateNoteFrequency()

					if (this.difference > 0) {
						this.incrementNote(true)
					} else {
						// get absolute value of the difference when its negative
						// so we can easily recursive call in incrementNote()
						this.difference = Math.abs(this.difference)
						this.incrementNote(false)
					}
				}
			)
		}

		watch(
			() => this.generatorSettings.volume,
			() => {
				this.generatorSettings.volume = Number(this.generatorSettings.volume)

				if (this.isDeleting) {
					return
				}
				if (!this.initialized) {
					this.initializeContext()
				}

				if (this.started) {
					this.oscillator.disconnect()
					this.gainNode.gain.setValueAtTime(
						this.generatorSettings.volume,
						this.audioContext.currentTime
					)
					this.oscillator
						.connect(this.gainNode)
						.connect(this.audioContext.destination)
				} else {
					this.gainNode.gain.setValueAtTime(
						this.generatorSettings.volume,
						this.audioContext.currentTime
					)
				}
			}
		)

		watch(
			() => this.generatorSettings.oscillatorType,
			() => {
				if (this.isDeleting) {
					return
				}
				if (!this.initialized) {
					this.initializeContext()
				}

				if (this.started) {
					this.oscillator.disconnect()
					this.oscillator.type = this.generatorSettings.oscillatorType
					this.oscillator
						.connect(this.gainNode)
						.connect(this.audioContext.destination)
				} else {
					this.oscillator.type = this.generatorSettings.oscillatorType
				}
			}
		)
	}

	public beforeUnmount(): void {
		if (this.started) {
			this.oscillator.disconnect()
			this.audioContext.suspend()
		}
	}

	public startStopButton(): void {
		this.started = !this.started
		if (!this.initialized) {
			this.initializeContext()
		}

		if (this.started) {
			this.oscillator
				.connect(this.gainNode)
				.connect(this.audioContext.destination)
		} else {
			this.oscillator.disconnect()
		}
	}

	public deleteGenerator(): void {
		this.isDeleting = true
		// if (!this.initialized) {
		// 	this.initializeContext()
		// }
		this.$emit('deleteGenerator')
	}

	public toPercent(value: number): number {
		return parseFloat((value * 2 * 100).toFixed(1))
	}

	// Audio contexts must be created by user gesture
	// so if this is the first press of the button create the contexts and if not ignore
	private initializeContext() {
		console.log(20)
		this.audioContext = new AudioContext()

		this.gainNode = new GainNode(this.audioContext, {
			gain: this.generatorSettings.volume
		})

		console.log(this.generatorSettings.frequency)
		this.oscillator = new OscillatorNode(this.audioContext, {
			type: this.generatorSettings.oscillatorType,
			frequency: this.generatorSettings.frequency
		})

		this.oscillator.start()
		this.oscillator.connect(this.audioContext.destination)
		this.oscillator.disconnect()
		this.initialized = true
	}

	private incrementNote(incrementUp: boolean) {
		do {
			if (incrementUp) {
				if (this.generatorSettings.notesIndex === 11) {
					this.generatorSettings.noteOctave!++
					this.generatorSettings.notesIndex = 0
				} else {
					this.generatorSettings.notesIndex!++
				}
				this.generatorSettings.noteName =
					this.notes[this.generatorSettings.notesIndex!]
			} else {
				if (this.generatorSettings.notesIndex === 0) {
					this.generatorSettings.noteOctave!--
					this.generatorSettings.notesIndex = 11
				} else {
					this.generatorSettings.notesIndex!--
				}
				this.generatorSettings.noteName =
					this.notes[this.generatorSettings.notesIndex!]
			}
			this.difference--
		} while (this.difference > 0)
	}

	private updateNoteFrequency() {
		// From here: https://pages.mtu.edu/~suits/NoteFreqCalcs.html
		this.generatorSettings.frequency = parseFloat(
			(
				this.fixedNote *
				this.twelthRoot ** this.generatorSettings.noteOffset!
			).toFixed(4)
		)
	}
}
