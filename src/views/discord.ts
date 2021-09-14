import { Vue } from 'vue-class-component'

export default class Discord extends Vue {
	public discordInput = ''
	public discordText = ''
	public reviewsText = ''

	// TODO: handle no spaces printing properly

	public discordButtonPressed(): void {
		this.discordText = ''
		this.reviewsText = ''
		if (this.discordInput && this.discordInput.length < 2000) {
			const inputLength = this.discordInput.length
			while (inputLength < 2000) {
				if (this.discordText.length + inputLength > 2000) {
					this.reviewsText = this.discordText
					break
				}
				this.discordText = this.discordText + this.discordInput
			}
		}
	}

	public copydiscord(): void {
		navigator.clipboard.writeText(this.discordText)
	}
}
