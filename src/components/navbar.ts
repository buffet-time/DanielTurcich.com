import router from '@/router'
import { Vue } from 'vue-class-component'

export default class Navbar extends Vue {
	public currentRoute = ''

	private sidenavElement!: HTMLElement
	private overlayElement!: HTMLElement

	public mounted() {
		this.sidenavElement = this.$refs.sidenav as HTMLElement
		this.overlayElement = this.$refs.overlay as HTMLElement

		// close the sidenav if click outside
		document.addEventListener('mouseup', event => {
			if (this.overlayElement.style.zIndex === '1' && event.x > 230) {
				this.closeNav()
			}
		})
	}

	public openLink(link: string) {
		switch (link) {
			case 'github':
				window.open('https://github.com/buffet-time', '_blank')
				break

			case 'linkedin':
				window.open('https://www.linkedin.com/in/danielturcich/', '_blank')
				break

			case 'resume':
				window.open(
					'https://drive.google.com/file/d/1UhcfJUs0U3AAuHyZTZbi6bXxEL_QFZR0/view',
					'_blank'
				)
				break

			case 'bandcamp':
				window.open('https://buffet-time.bandcamp.com/', '_blank')
				break

			case 'soundcloud':
				window.open('https://soundcloud.com/buffet_time', '_blank')
				break
		}
	}

	public async routeChange(route: string) {
		await router.push(route)
		this.currentRoute = this.$router.currentRoute.value.name!.toString()!
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

	private closeNav() {
		this.sidenavElement.style.width = '0'
		this.overlayElement.style.opacity = '0'
		this.overlayElement.style.width = '100%'
		this.overlayElement.style.marginLeft = '0'
		this.overlayElement.style.zIndex = '-1'
	}
}
