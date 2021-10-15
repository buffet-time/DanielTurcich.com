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

export interface Generator {
	id: number
	generatorType: GeneratorType
}

export type GeneratorType = 'Frequency' | 'Note'

export type GeneratorOscillatorType =
	| 'sawtooth'
	| 'sine'
	| 'square'
	| 'triangle'

export interface SpreadsheetParams {
	id: string
	range: string
}
