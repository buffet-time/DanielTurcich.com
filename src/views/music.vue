<script setup lang="ts">
import { Release, ReleasesIn, SpreadsheetParams, StatsObject } from '../typings'
import { onBeforeMount, Ref, ref } from 'vue'
import 'bootstrap/js/dist/tab'
import search from '../components/music/search.vue'
import stats from '../components/music/stats.vue'

const loadingString = 'loading...',
	currentYear = 2021,
	releasePerYear: number[] = []

for (let x = 0; x < ReleasesIn['2020s'] + 1; x++) releasePerYear.push(0)

// public variables
const releasesArray = ref([['']]),
	initializing = ref(true),
	earliestYear = ref(currentYear),
	statsObject = ref({
		numberOfReleases: loadingString,
		averageYear: loadingString,
		averageScore: loadingString,
		numberOfArtists: loadingString,
		releasesPerYear: releasePerYear
	}) as Ref<StatsObject>

// Private variables
const artistArray: string[] = [],
	spreadsheets: SpreadsheetParams[] = [
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

let scoreCount = 0,
	questionMarkScoreCount = 0,
	yearCount = 0,
	tempScore = 0,
	tempYear = 0

// Lifecycle Hooks
onBeforeMount(async () => {
	await initializeSheets()
	initializing.value = false

	// TODO: handle doing this without twice reversing the array because i was lazy
	releasesArray.value.reverse().forEach((current) => {
		if (!artistArray.includes(current[Release.artist]))
			artistArray.push(current[Release.artist])

		const curYear = Number(current[Release.year])

		if (curYear < earliestYear.value) earliestYear.value = curYear

		tempYear += curYear
		yearCount++

		if (isNum(current[Release.score])) {
			tempScore += Number(current[Release.score])
			scoreCount++
		} else if (current[Release.score] == '?') questionMarkScoreCount++

		curYear > 1959
			? // @ts-ignore
			  releasePerYear[ReleasesIn[current[Release.year].slice(0, 3) + '0s']]++
			: releasePerYear[ReleasesIn['1950s']]++
	})

	releasesArray.value.reverse()

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
			current.forEach((element) => element.trim())
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
	<h1 v-once class="app-title disable-select">My Music Page</h1>
	<ul v-once id="myTab" class="nav nav-tabs" role="tablist">
		<li class="nav-item" role="presentation">
			<button
				id="stats-tab"
				class="nav-link active"
				data-bs-toggle="tab"
				data-bs-target="#stats"
				type="button"
				role="tab"
				aria-controls="stats"
				aria-selected="true"
			>
				Stats
			</button>
		</li>
		<li class="nav-item" role="presentation">
			<button
				id="search-tab"
				class="nav-link"
				data-bs-toggle="tab"
				data-bs-target="#search"
				type="button"
				role="tab"
				aria-controls="search"
				aria-selected="false"
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
</template>

<style scoped>
.nav-link {
	color: white;
}
.nav-tabs {
	width: 155px;
	margin-left: calc(50% - 77.5px);
	margin-bottom: 16px;
}
.nav-link:hover,
.nav-link:focus {
	color: white;
}
</style>
