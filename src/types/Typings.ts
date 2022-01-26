export interface PasswordToggle {
	[key: string]: {
		exclude: boolean
		characters: string
		label: string
	}
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
	| 'Bogo'

export type GeneratorOscillatorType =
	| 'sawtooth'
	| 'sine'
	| 'square'
	| 'triangle'

export type Note =
	| 'C'
	| 'D♭'
	| 'D'
	| 'E♭'
	| 'E'
	| 'F'
	| 'G♭'
	| 'G'
	| 'A♭'
	| 'A'
	| 'B♭'
	| 'B'

export type GeneratorType = 'Frequency' | 'Note'

export interface Generator {
	id: number
	generatorType: GeneratorType
}

export interface SortingRect {
	x: number
	y: number
	width: number
	height: number
	frequency: number
}

export interface StatsObject {
	numberOfReleases: string | number
	averageYear: string | number
	averageScore: string | number
	numberOfArtists: string | number
	releasesPerYear: number[]
}

export interface SpreadsheetParams {
	id: string
	range: string
}

export interface NavLink {
	src: string
	alt: string
	buttonText: string
	link: string
}
