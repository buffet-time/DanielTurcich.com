import router from '@/router'
import { Options, Vue } from 'vue-class-component'

@Options({})
export default class Navbar extends Vue {
	public showOverlay = false
	public currentRoute = ''

	private sidenavElement: any
	private overlayElement: any

	public mounted() {
		this.sidenavElement = document.getElementById('sidenav')
		this.overlayElement = document.getElementById('overlay')
	}

	public openNav() {
		if (!this.currentRoute) {
			this.currentRoute = this.$router.currentRoute.value.name!.toString()!
		}
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

	public async home() {
		await router.push('/')
		this.currentRoute = this.$router.currentRoute.value.name!.toString()!
	}

	public async password() {
		await router.push('password')
		this.currentRoute = this.$router.currentRoute.value.name!.toString()!
	}

	public async acronym() {
		await router.push('acronym')
		this.currentRoute = this.$router.currentRoute.value.name!.toString()!
	}

	public async discord() {
		await router.push('discord')
		this.currentRoute = this.$router.currentRoute.value.name!.toString()!
	}
}
