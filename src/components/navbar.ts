import router, { resume } from '@/router'
import { SidenavLink } from '@/typings'
import { Vue } from 'vue-class-component'
import { RouteRecordNormalized } from 'vue-router'

export default class Navbar extends Vue {
	public routes: RouteRecordNormalized[] = []
	public links: SidenavLink[] = [
		{
			openLink: 'github',
			buttonText: 'Github',
			alt: 'github logo',
			src: 'github.png'
		},
		{
			openLink: 'linkedin',
			buttonText: 'LinkedIn',
			alt: 'linkedin logo',
			src: 'linkedin.png'
		},
		{
			openLink: 'resume',
			buttonText: 'Resume',
			alt: 'pdf logo',
			src: 'resume.png'
		},
		{
			openLink: 'bandcamp',
			buttonText: 'Bandcamp',
			alt: 'bandcamp logo',
			src: 'bandcamp.png'
		},
		{
			openLink: 'soundcloud',
			buttonText: 'Soundcloud',
			alt: 'soundcloud logo',
			src: 'soundcloud.png'
		}
	]

	private sidenavElement!: HTMLDivElement
	private overlayElement!: HTMLDivElement

	public mounted(): void {
		this.routes = router.getRoutes().filter((route) => {
			return route.meta['buttonName'] !== undefined
		})
		this.sidenavElement = this.$refs['sidenav'] as HTMLDivElement
		this.overlayElement = this.$refs['overlay'] as HTMLDivElement

		// close the sidenav if click outside
		document.addEventListener('mouseup', (event) => {
			if (this.overlayElement.style.zIndex === '1' && event.x > 230) {
				this.closeNav()
			}
		})
		this.closeNav()
	}

	public openLink(link: string): void {
		switch (link) {
			case 'github':
				window.open('https://github.com/buffet-time', '_blank')
				break

			case 'linkedin':
				window.open('https://www.linkedin.com/in/danielturcich/', '_blank')
				break

			case 'resume':
				window.open(resume, '_blank')
				break

			case 'bandcamp':
				window.open('https://buffet-time.bandcamp.com/', '_blank')
				break

			case 'soundcloud':
				window.open('https://soundcloud.com/buffet_time', '_blank')
				break
		}
	}

	public async routeChange(route: string): Promise<void> {
		await router.push(route)
	}

	public openNav(): void {
		this.sidenavElement.style.width = '230px'
		Object.assign(this.overlayElement.style, {
			opacity: '15%',
			width: 'calc(100% - 230px)',
			marginLeft: '230px',
			zIndex: '1'
		})
	}

	public closeNav(): void {
		this.sidenavElement.style.width = '0'
		Object.assign(this.overlayElement.style, {
			opacity: '0',
			width: '100%',
			marginLeft: '0',
			zIndex: '-1'
		})
	}
}
