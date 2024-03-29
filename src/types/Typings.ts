export type PasswordToggle = Record<
	string,
	{
		exclude: boolean
		characters: string
		label: string
	}
>

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
	| 'Comb'

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
	currentYear: number
	earliestYear: number
}

export interface NavLink {
	src: string
	alt: string
	buttonText: string
	link: string
}

export type Tab = 'Search' | 'Stats'

export enum ReleaseType {
	'Album',
	'EP',
	'Live Album',
	'Remix Album',
	'Soundtrack',
	'Compilation',
	'Demo Album'
}

export type SearchType = 'artist' | 'name' | 'score' | 'type' | 'year' | 'genre'

export enum Release {
	'artist',
	'name',
	'score',
	'type',
	'year',
	'genre',
	'comments'
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

// Wrapped in query for router.replace()
export interface MusicPageQueries {
	query: {
		tab: Tab
		type?: SearchType
		term?: string
	}
}

export interface ArticleLink {
	url: string
	text: string
}

export interface MusicSearchProps {
	currentYear: number
	earliestYear: number
	releasesArray: string[][]
	initializing: boolean
}

export interface SortingVisualizationProps {
	sleepTime: number | string
	stopExecution: boolean
	randomizeArray: boolean
	oscillator: OscillatorNode
	numberOfRectangles: number | string
	sortingMethod: SortingAlgorithm
}
