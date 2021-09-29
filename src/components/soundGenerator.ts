/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GeneratorSettings } from '../typings'
import { watch } from 'vue'
import { Vue, Options, prop } from 'vue-class-component'
import { closeSvg } from '../svgs'

class Props {
	generatorSettings: GeneratorSettings = prop({
		type: Object,
		required: true,
		validator: (value: GeneratorSettings) => {
			if (
				value.frequency &&
				value.generatorType &&
				value.oscillatorType &&
				value.volume
			) {
				return true
			} else {
				return false
			}
		}
	})
}

@Options({
	emits: ['deleteGenerator']
})
export default class SoundGenerator extends Vue.with(Props) {
	public closeSvg = closeSvg
	public started = false

	private audioContext!: AudioContext
	private oscillator!: OscillatorNode
	private gainNode!: GainNode
	private initialized = false

	// prettier-ignore
	private notes = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B']
	private twelthRoot = 2 ** (1 / 12)
	private fixedNote = 440 // Standard tuning frequency of A4 for 12 tone equal temperment
	private difference = 0

	public mounted(): void {
		if (this.generatorSettings.generatorType === 'Frequency') {
			watch(
				() => this.generatorSettings.frequency,
				() => {
					if (!this.initialized) {
						this.initializeContext()
					}

					this.oscillator.frequency.setValueAtTime(
						this.generatorSettings.frequency,
						this.audioContext.currentTime
					)
				}
			)
		} else {
			watch(
				() => this.generatorSettings.noteOffset!,
				(newValue: number, previousValue: number) => {
					if (!this.initialized) {
						this.initializeContext()
					}

					this.difference = newValue - previousValue
					this.updateNoteFrequency()

					if (this.difference > 0) {
						this.incrementNote('Up')
					} else {
						// get absolute value of the difference when its negative
						// so we can easily recursive call in incrementNote()
						this.difference = Math.abs(this.difference)
						this.incrementNote('Down')
					}
				}
			)
		}

		watch(
			() => this.generatorSettings.volume,
			() => {
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
		this.$emit('deleteGenerator')
	}

	public toPercent(value: number): number {
		return parseFloat((value * 2 * 100).toFixed(1))
	}

	// Audio contexts must be created by user gesture
	// so if this is the first press of the button create the contexts and if not ignore
	private initializeContext() {
		this.audioContext = new AudioContext()

		this.gainNode = new GainNode(this.audioContext, {
			gain: this.generatorSettings.volume
		})

		this.oscillator = new OscillatorNode(this.audioContext, {
			type: this.generatorSettings.oscillatorType,
			frequency: this.generatorSettings.frequency
		})

		this.oscillator.start()
		this.oscillator.connect(this.audioContext.destination)
		this.oscillator.disconnect()
		this.initialized = true
	}

	private incrementNote(increment: 'Up' | 'Down') {
		do {
			if (increment === 'Up') {
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

		this.oscillator.frequency.setValueAtTime(
			this.generatorSettings.frequency,
			this.audioContext.currentTime
		)
	}
}
