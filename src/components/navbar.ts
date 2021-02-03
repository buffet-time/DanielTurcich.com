import router from '@/router'
import { Vue } from 'vue-class-component'

export default class Navbar extends Vue {
	public showOverlay = false
	public currentRoute = ''

	private sidenavElement!: HTMLElement
	private overlayElement!: HTMLElement

	public mounted() {
		this.sidenavElement = document.getElementById('sidenav')!
		this.overlayElement = document.getElementById('overlay')!
	}

	public openNav() {
		this.overlayElement.style.zIndex = '1'
		this.sidenavElement.style.width = '230px'
		this.overlayElement.style.opacity = '15%'
		this.overlayElement.style.width = 'calc(100% - 230px)'
		this.overlayElement.style.marginLeft = '230px'
		if (!this.currentRoute) {
			this.currentRoute = this.$router.currentRoute.value.name!.toString()!
		}
	}

	public closeNav() {
		this.sidenavElement.style.width = '0'
		this.overlayElement.style.opacity = '0'
		this.overlayElement.style.width = '100%'
		this.overlayElement.style.marginLeft = '0'
		this.overlayElement.style.zIndex = '-1'
	}

	public openLink(link: string) {
		switch (link) {
			case 'github':
				window.open('https://github.com/buffet-time')

			case 'linkedin':
				window.open('https://www.linkedin.com/in/danielturcich/')

			case 'resume':
				window.open(
					'https://drive.google.com/file/d/1UhcfJUs0U3AAuHyZTZbi6bXxEL_QFZR0/view'
				)

			case 'bandcamp':
				window.open('https://buffet-time.bandcamp.com/')

			case 'soundcloud':
				window.open('https://soundcloud.com/buffet_time')
		}
	}

	public async routeChange(route: string) {
		await router.push(route)
		this.currentRoute = this.$router.currentRoute.value.name!.toString()!
	}
}
