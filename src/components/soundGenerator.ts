import { watch } from 'vue'
import { Vue, prop } from 'vue-class-component'

class Props {
	generatorType = prop({
		type: String,
		required: true,
		validator: (value) => value === 'Frequency' || value === 'Note'
	})
}

export default class SoundGenerator extends Vue.with(Props) {
	public started = false
	public volume = 0.07
	public frequency = 440
	public oscillatorType: OscillatorType = 'sine'
	// for notes
	public noteName = 'A'
	public noteOctave = 4
	public noteOffset = 0

	private audioContext!: AudioContext
	private oscillator!: OscillatorNode
	private gainNode!: GainNode
	private initialized = false
	// for notes
	// prettier-ignore
	private notes = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B']
	private twelthRoot = 2 ** (1 / 12)
	private fixedNote = 440 // Frequency of A4
	private notesIndex = 9
	private difference = 0

	public mounted(): void {
		watch(
			() => this.frequency,
			() => {
				if (!this.initialized) {
					this.initializeContext()
				}
				this.oscillator.frequency.setValueAtTime(
					this.frequency,
					this.audioContext.currentTime
				)
			}
		)

		watch(
			() => this.noteOffset,
			(newValue, previousValue) => {
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

		watch(
			() => this.oscillatorType,
			() => {
				if (!this.initialized) {
					this.initializeContext()
				}

				if (this.started) {
					this.oscillator.disconnect()
					this.oscillator.type = this.oscillatorType
					this.oscillator
						.connect(this.gainNode)
						.connect(this.audioContext.destination)
				} else {
					this.oscillator.type = this.oscillatorType
				}
			}
		)

		watch(
			() => this.volume,
			() => {
				if (!this.initialized) {
					this.initializeContext()
				}

				if (this.started) {
					this.oscillator.disconnect()
					this.gainNode.gain.setValueAtTime(
						this.volume,
						this.audioContext.currentTime
					)
					this.oscillator
						.connect(this.gainNode)
						.connect(this.audioContext.destination)
				} else {
					this.gainNode.gain.setValueAtTime(
						this.volume,
						this.audioContext.currentTime
					)
				}
			}
		)
	}

	public frequencyButton(): void {
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

	public toPercent(value: number): number {
		return parseFloat((value * 2 * 100).toFixed(1))
	}

	// Audio contexts must be created by user gesture
	// so if this is the first press of the button create the contexts and if not ignore
	private initializeContext() {
		this.initialized = true
		this.audioContext = new AudioContext()

		this.gainNode = new GainNode(this.audioContext, {
			gain: this.volume
		})

		this.oscillator = new OscillatorNode(this.audioContext, {
			type: this.oscillatorType,
			frequency: this.frequency
		})

		this.oscillator.start()
		this.oscillator.connect(this.audioContext.destination)
		this.oscillator.disconnect()
	}

	private incrementNote(incrementUp: boolean) {
		do {
			if (incrementUp) {
				if (this.notesIndex === 11) {
					this.noteOctave++
					this.notesIndex = 0
				} else {
					this.notesIndex++
				}
				this.noteName = this.notes[this.notesIndex]
			} else {
				if (this.notesIndex === 0) {
					this.noteOctave--
					this.notesIndex = 11
				} else {
					this.notesIndex--
				}
				this.noteName = this.notes[this.notesIndex]
			}
			this.difference--
		} while (this.difference > 0)
	}

	private updateNoteFrequency() {
		// From here: https://pages.mtu.edu/~suits/NoteFreqCalcs.html
		this.frequency = parseFloat(
			(this.fixedNote * this.twelthRoot ** this.noteOffset).toFixed(4)
		)
	}
}
