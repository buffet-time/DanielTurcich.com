import { BButton, BCard, BNavbar } from 'bootstrap-vue'
import Vue from 'vue'
import Component from 'vue-class-component'
import Template from './navbar.component.html'

@Template
@Component({
	components: {
		'b-card': BCard,
		'b-navbar': BNavbar,
		'b-button': BButton
	}
})
export class Navbar extends Vue {
	public showOverlay: boolean = false

	public openNav() {
		document.getElementById('mySidenav')!.style.width = '230px'
		setTimeout(() => {
			this.showOverlay = true
		}, 200)
	}

	public closeNav() {
		document.getElementById('mySidenav')!.style.width = '0'
		this.showOverlay = false
	}

	public github() {
		window.open('https://github.com/buffet-time')
	}

	public linkedin() {
		window.open('https://www.linkedin.com/in/danielturcich/')
	}

	public resume() {
		window.open(
			'https://drive.google.com/file/d/1UhcfJUs0U3AAuHyZTZbi6bXxEL_QFZR0/view'
		)
	}

	public bandcamp() {
		window.open('https://buffet-time.bandcamp.com/')
	}

	public soundcloud() {
		window.open('https://soundcloud.com/buffet_time')
	}
}
