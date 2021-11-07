export interface SortingRect {
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

export type SortingAlgorithm =
	| ''
	| 'Bubble'
	| 'Insertion'
	| 'Cocktail Shaker'
	| 'Selection'
	| 'Merge'
	| 'Quick'
	| 'Heap'
	| 'Shell'
	| 'Gnome'

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
	releasesPerYear: number[]
}

export enum ReleasesIn {
	'1950s',
	'1960s',
	'1970s',
	'1980s',
	'1990s',
	'2000s',
	'2010s',
	'2020s'
}
