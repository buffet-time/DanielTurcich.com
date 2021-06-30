import { Vue } from 'vue-class-component'
import { Application, Graphics } from 'pixi.js'

export default class Sorting extends Vue {
	public sleepTime = 0

	private app!: Application
	private canvasElement!: HTMLCanvasElement

	public async mounted(): Promise<void> {
		this.canvasElement = this.$refs.pixi as HTMLCanvasElement
		this.app = new Application({
			autoStart: true,
			antialias: true,
			width: this.canvasElement.clientWidth,
			height: this.canvasElement.clientHeight,
			view: this.canvasElement,
			clearBeforeRender: false,
			powerPreference: 'high-performance',
			sharedTicker: false,
			sharedLoader: false,
			resizeTo: this.canvasElement
		})

		this.app.stage.addChild(
			new Graphics().beginFill(0x00ff00).drawRect(10, 10, 2, 2).endFill()
		)
	}

	// private sleep(time: number) {
	// 	return new Promise((s) => {
	// 		setTimeout(s, time)
	// 	})
	// }
}
