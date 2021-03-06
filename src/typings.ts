export interface PixiRect {
	x: number
	y: number
	width: number
	height: number
	frequency: number
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

export enum Release {
	artist,
	name,
	score,
	type,
	year,
	genre,
	comments
}
