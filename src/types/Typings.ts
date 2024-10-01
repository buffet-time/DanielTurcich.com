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
	Album = 0,
	EP = 1,
	'Live Album' = 2,
	'Remix Album' = 3,
	Soundtrack = 4,
	Compilation = 5,
	'Demo Album' = 6,
}

export type SearchType = 'artist' | 'name' | 'score' | 'type' | 'year' | 'genre'

export enum Release {
	artist = 0,
	name = 1,
	score = 2,
	type = 3,
	year = 4,
	genre = 5,
	comments = 6,
}

export enum ReleasesIn {
	'1950s' = 0,
	'1960s' = 1,
	'1970s' = 2,
	'1980s' = 3,
	'1990s' = 4,
	'2000s' = 5,
	'2010s' = 6,
	'2020s' = 7,
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
