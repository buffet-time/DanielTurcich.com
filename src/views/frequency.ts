import { watch } from 'vue'
import { Vue } from 'vue-class-component'

export default class Frequency extends Vue {
	public started = false
	public volume = 0.07
	public frequency = 440
	public oscillatorType: OscillatorType = 'sine'

	private audioContext!: AudioContext
	private oscillator!: OscillatorNode
	private gainNode!: GainNode
	private initialized = false

	public mounted(): void {
		watch(
			() => this.frequency,
			() =>
				this.oscillator.frequency.setValueAtTime(
					this.frequency,
					this.audioContext.currentTime
				)
		)

		watch(
			() => this.oscillatorType,
			() => {
				this.oscillator.disconnect()
				this.oscillator.type = this.oscillatorType
				this.oscillator
					.connect(this.gainNode)
					.connect(this.audioContext.destination)
			}
		)

		watch(
			() => this.volume,
			() => {
				this.oscillator.disconnect()
				this.gainNode.gain.setValueAtTime(
					this.volume,
					this.audioContext.currentTime
				)
				this.oscillator
					.connect(this.gainNode)
					.connect(this.audioContext.destination)
			}
		)
	}

	public async frequencyButton(): Promise<void> {
		this.started = !this.started
		// Audio contexts must be created by user gesture
		// so if this is the first press of the button create the contexts and if not ignore
		if (!this.initialized) {
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

		if (this.started) {
			this.oscillator
				.connect(this.gainNode)
				.connect(this.audioContext.destination)
		} else {
			this.oscillator.disconnect()
		}
	}
}
