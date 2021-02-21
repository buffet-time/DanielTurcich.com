export interface PixiRect {
	x: number
	y: number
	width: number
	height: number
}

export interface SidenavLink {
	openLink: string
	src: string
	alt: string
	buttonText: string
}

export interface SortingAlgorithm {
	method: () => Promise<void> | void
	buttonText: string
}
