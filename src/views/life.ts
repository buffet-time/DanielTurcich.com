import { Vue } from 'vue-class-component'
import { Application } from 'pixi.js'

export default class Sorting extends Vue {
	private app!: Application
	private canvasElement!: HTMLCanvasElement

	public async mounted(): Promise<void> {
		this.canvasElement = this.$refs.pixi as HTMLCanvasElement
		this.app = new Application({
			autoStart: true,
			antialias: false,
			width: this.canvasElement.clientWidth,
			height: this.canvasElement.clientHeight,
			view: this.canvasElement,
			clearBeforeRender: false,
			powerPreference: 'high-performance',
			sharedTicker: false,
			sharedLoader: false,
			resizeTo: this.canvasElement
		})
	}

	private sleep(time: number) {
		return new Promise((s) => {
			setTimeout(s, time)
		})
	}
}
