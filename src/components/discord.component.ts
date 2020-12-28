import { BButton, BFormInput } from 'bootstrap-vue'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Model } from 'vue-property-decorator'
import Template from './discord.component.html'
import { Navbar } from './navbar.component'

@Template
@Component({
	components: {
		'd-navbar': Navbar,
		'b-button': BButton,
		'b-form-input': BFormInput
	}
})
export class Discord extends Vue {
	@Model()
	public discordInput?: string
	public discordText: string = ''

	public discordButtonPressed() {
		this.discordText = ''
		if (this.discordInput && this.discordInput.length < 2000) {
			const inputLength: number = this.discordInput.length
			while (inputLength < 2000) {
				if (this.discordText.length + inputLength > 2000) {
					document.getElementById(
						'discordTextDiv'
					)!.innerText = this.discordText
					break
				}
				this.discordText = this.discordText + this.discordInput
			}
		}
	}

	public copydiscord() {
		navigator.clipboard.writeText(this.discordText)
	}
}
