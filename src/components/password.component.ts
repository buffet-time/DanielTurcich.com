import { BButton, BFormCheckbox, BFormInput } from 'bootstrap-vue'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Navbar } from './navbar.component'
import Template from './password.component.html'

@Template
@Component({
	components: {
		'd-navbar': Navbar,
		'b-button': BButton,
		'b-form-input': BFormInput,
		'b-form-checkbox': BFormCheckbox
	}
})
export class Password extends Vue {
	public passwordLength: number = 16
	public excludeLowercase: boolean = false
	public excludeUppercase: boolean = false
	public excludeNumbers: boolean = false
	public excludeSymbols: boolean = false
	/* tslint:disable */
	// prettier-ignore
	private lowercaseLetters: string[] = [
        'a','b','c', 'd', 'e','f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
        'n','o', 'p', 'q', 'r', 's','t','u','v', 'w', 'x', 'y', 'z'
	]
	// prettier-ignore
	private uppercaseLetters: string[] = [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
		'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
	// prettier-ignore
	private numbers: string[] = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ]
	// prettier-ignore
	private symbols: string[] = [
        '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', 
        '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', 
        ']', '^', '_', '`', '{', '|', '}', '~'
    ]
	/* tslint:enable */
	private passwordCharacters: string[] = ['']
	private password: string = ''

	public generatePassword() {
		this.passwordCharacters = ['']
		this.password = ''

		if (!this.excludeLowercase) {
			this.passwordCharacters = this.passwordCharacters.concat(
				this.lowercaseLetters
			)
		}
		if (!this.excludeUppercase) {
			this.passwordCharacters = this.passwordCharacters.concat(
				this.uppercaseLetters
			)
		}
		if (!this.excludeNumbers) {
			this.passwordCharacters = this.passwordCharacters.concat(this.numbers)
		}
		if (!this.excludeSymbols) {
			this.passwordCharacters = this.passwordCharacters.concat(this.symbols)
		}

		for (let i: number = 0; i < this.passwordLength; i++) {
			this.password += this.passwordCharacters[
				this.randomInt(0, this.passwordCharacters.length - 1)
			]
		}

		document.getElementById('passwordTextDiv')!.innerText = this.password
	}

	public copyPassword() {
		navigator.clipboard.writeText(this.password)
	}

	private randomInt(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
}
