<script setup lang="ts">
import { onBeforeMount, type Ref, ref } from 'vue'
import 'bootstrap/js/dist/tab'
import search from '../components/music/Search.vue'
import stats from '../components/music/Stats.vue'
import { Release } from '../assets/enums'

export interface StatsObject {
	numberOfReleases: string | number
	averageYear: string | number
	averageScore: string | number
	numberOfArtists: string | number
	releasesPerYear: number[]
}

// prettier-ignore
const enum ReleasesIn {
	'1950s', '1960s', '1970s', '1980s',
	'1990s', '2000s', '2010s', '2020s'
}

interface SpreadsheetParams {
	id: string
	range: string
}

const loadingString = 'loading...'
const currentYear = 2021
const releasePerYear: number[] = []

for (let x = 0; x < ReleasesIn['2020s'] + 1; x++) {
	releasePerYear.push(0)
}

// public variables
const releasesArray = ref([['']])
const initializing = ref(true)
const earliestYear = ref(currentYear)
const statsObject = ref({
	numberOfReleases: loadingString,
	averageYear: loadingString,
	averageScore: loadingString,
	numberOfArtists: loadingString,
	releasesPerYear: releasePerYear
}) as Ref<StatsObject>

// Private variables
const artistArray: string[] = []
const spreadsheets: SpreadsheetParams[] = [
	{
		id: '1tn0BmleHcs0okzWKhUnyOCWUPD422HvutpNQNzdAAIk',
		range: 'Main!A2:F' // before
	},
	{
		id: '1dmETb3Ybqs8Dhez_kP2DHiXR_Gqw-X56qsXDHYyTH1w',
		range: 'Main!A2:F' // 2020
	},
	{
		id: '18V5oypFBW3Bu_tHxfTL-iSbb9ALYrCJlMwLhpPmp72M',
		range: 'Main!A2:G' // 2021
	}
]

let scoreCount = 0
let questionMarkScoreCount = 0
let yearCount = 0
let tempScore = 0
let tempYear = 0

onBeforeMount(async () => {
	await initializeSheets()
	initializing.value = false

	for (const current of releasesArray.value) {
		if (!artistArray.includes(current[Release.artist])) {
			artistArray.push(current[Release.artist])
		}

		const curYear = Number(current[Release.year])

		if (curYear < earliestYear.value) {
			earliestYear.value = curYear
		}

		tempYear += curYear
		yearCount++

		if (isNum(current[Release.score])) {
			tempScore += Number(current[Release.score])
			scoreCount++
		} else if (current[Release.score] == '?') {
			questionMarkScoreCount++
		}

		curYear > 1959
			? // @ts-ignore
			  releasePerYear[ReleasesIn[current[Release.year].slice(0, 3) + '0s']]++
			: releasePerYear[ReleasesIn['1950s']]++
	}

	statsObject.value = {
		averageScore: (tempScore / scoreCount).toFixed(2),
		numberOfArtists: artistArray.length,
		averageYear: (tempYear / yearCount).toFixed(2),
		numberOfReleases: scoreCount + questionMarkScoreCount,
		releasesPerYear: releasePerYear
	}
})

async function initializeSheets() {
	releasesArray.value = (
		await Promise.all(
			spreadsheets.map((spreadsheet) =>
				getArray(spreadsheet.id, spreadsheet.range)
			)
		)
	)
		.flat()
		.filter((current: string[]) => {
			for (const element of current) element.trim()
			return current.length > 5 // makes sure to not include any not fully written reviews
		})
}

async function getArray(id: string, range: string) {
	return (
		await fetch(`https://api.danielturcich.com/Sheets?id=${id}&range=${range}`)
	).json()
}

// for readability
function isNum(value: string) {
	return !isNaN(Number(value))
}
</script>

<template>
	<div class="flex flex-col justify-center items-center gap-4">
		<h1 v-once class="mt-4 text-2xl font-semibold">My Music Page</h1>

		<!-- border-bottom: 1px solid #dee2e6; -->
		<ul
			v-once
			id="myTab"
			class="flex justify-center nav nav-tabs"
			role="tablist"
		>
			<!-- 

		 -->
			<li role="presentation">
				<button
					id="stats-tab"
					class="nav-link active text-white hover:text-zinc-400 focus:text-zinc-400 rounded-tl rounded-tr cursor-pointer px-4 py-2"
					data-bs-toggle="tab"
					data-bs-target="#stats"
					type="button"
					role="tab"
				>
					Stats
				</button>
			</li>
			<li role="presentation">
				<button
					id="search-tab"
					class="nav-link text-white hover:text-zinc-400 focus:text-zinc-400"
					data-bs-toggle="tab"
					data-bs-target="#search"
					type="button"
					role="tab"
				>
					Search
				</button>
			</li>
		</ul>

		<div id="myTabContent" class="tab-content">
			<stats :stats-object="statsObject" />
			<search
				:current-year="currentYear"
				:earliest-year="earliestYear"
				:releases-array="releasesArray"
				:initializing="initializing"
			/>
		</div>
	</div>
</template>
