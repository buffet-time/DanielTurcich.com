import { Vue } from 'vue-class-component'

export default class Password extends Vue {
	public passwordLength = 16
	public excludeLowercase = false
	public excludeUppercase = false
	public excludeNumbers = false
	public excludeSymbols = false
	// prettier-ignore
	private lowercaseLetters = [
        'a','b','c', 'd', 'e','f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
        'n','o', 'p', 'q', 'r', 's','t','u','v', 'w', 'x', 'y', 'z'
	]
	// prettier-ignore
	private uppercaseLetters = [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
		'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
	// prettier-ignore
	private numbers = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ]
	// prettier-ignore
	private symbols = [
        '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', 
        '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', 
        ']', '^', '_', '`', '{', '|', '}', '~'
    ]

	private password = ''

	public generatePassword() {
		let passwordCharacters = ['']
		this.password = ''

		if (!this.excludeLowercase) {
			passwordCharacters = passwordCharacters.concat(this.lowercaseLetters)
		}
		if (!this.excludeUppercase) {
			passwordCharacters = passwordCharacters.concat(this.uppercaseLetters)
		}
		if (!this.excludeNumbers) {
			passwordCharacters = passwordCharacters.concat(this.numbers)
		}
		if (!this.excludeSymbols) {
			passwordCharacters = passwordCharacters.concat(this.symbols)
		}

		for (let i = 0; i < this.passwordLength; i++) {
			this.password +=
				passwordCharacters[this.randomInt(0, passwordCharacters.length - 1)]
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
