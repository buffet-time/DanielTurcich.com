import { Vue } from 'vue-class-component'

export default class Discord extends Vue {
	public discordInput = ''
	public discordText = ''
	public textToShow = ''

	public discordButtonPressed(): void {
		this.discordText = ''
		this.textToShow = ''
		if (this.discordInput && this.discordInput.length < 2000) {
			const inputLength = this.discordInput.length
			while (inputLength < 2000) {
				if (this.discordText.length + inputLength > 2000) {
					this.textToShow = this.discordText
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
