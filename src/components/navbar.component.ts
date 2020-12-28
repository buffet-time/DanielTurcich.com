import router from '@/router'
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
	public currentRoute: string = ''

	private sidenavElement: any
	private overlayElement: any

	public mounted() {
		this.sidenavElement = document.getElementById('sidenav')
		this.overlayElement = document.getElementById('overlay')
		if (this.$route.name) {
			this.currentRoute = this.$route.name
		}
	}

	public openNav() {
		this.overlayElement.style.zIndex = '1'
		this.sidenavElement.style.width = '230px'
		this.overlayElement.style.opacity = '15%'
		this.overlayElement.style.width = 'calc(100% - 230px)'
		this.overlayElement.style.marginLeft = '230px'
	}

	public closeNav() {
		this.sidenavElement.style.width = '0'
		this.overlayElement.style.opacity = '0'
		this.overlayElement.style.width = '100%'
		this.overlayElement.style.marginLeft = '0'
		this.overlayElement.style.zIndex = '-1'
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

	public home() {
		router.push('/')
	}

	public password() {
		router.push('password')
	}

	public acronym() {
		router.push('acronym')
	}

	public discord() {
		router.push('discord')
	}
}
