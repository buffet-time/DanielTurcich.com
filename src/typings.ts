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

export interface StatsObject {
	numberOfReleases: string | number
	averageYear: string | number
	averageScore: string | number
	numberOfArtists: string | number
	numberOf50sAndBefore: string | number
	numberOf1960sReleases: string | number
	numberOf1970sReleases: string | number
	numberOf1980sReleases: string | number
	numberOf1990sReleases: string | number
	numberOf2000sReleases: string | number
	numberOf2010sReleases: string | number
	numberOf2020sReleases: string | number
}
