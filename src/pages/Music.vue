<script setup lang="ts">
import { onBeforeMount, type Ref, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Search from './subcomponents/Search.vue'
import Stats from './subcomponents/Stats.vue'
import { MusicPageQueries, Release, ReleasesIn } from '../types/Typings'
import {
	type Tab,
	type SpreadsheetParams,
	type StatsObject
} from '../types/Typings'

const loadingString = 'loading...'
const currentYear = new Date().getFullYear()
const releasePerYear: number[] = []
const router = useRouter()
const route = useRoute()

// TODO: this is sloppy.
for (let x = 0; x < ReleasesIn['2020s'] + 1; x++) {
	releasePerYear.push(0)
}

// TODO: cleanup

// public variables
const currentActiveTab = ref('Stats') as Ref<Tab>
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
// TODO: refactor API and frontend so i dont need to update this everyyear :)
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
	},
	{
		id: '1lyFD7uLMT0mRdGkKwvbIm_2pqk2YJU7rtRQVhHq-nwU',
		range: 'Main!A2:G' // 2022
	}
]

let scoreCount = 0
let questionMarkScoreCount = 0
let yearCount = 0
let tempScore = 0
let tempYear = 0

onBeforeMount(async () => {
	const queryTab = route.query.tab as Tab
	if (queryTab === 'Search') {
		setTab(queryTab)
	} else {
		switchTabTo('Stats')
	}

	await initializeSheets()
	initializing.value = false

	releasesArray.value.forEach((current) => {
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
	})

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
			current.forEach((element) => {
				element.trim()
			})
			return current.length > 5 // makes sure to not include any not fully written reviews
		})
}

async function getArray(id: string, range: string): Promise<string[][]> {
	return (
		await fetch(`https://api.danielturcich.com/Sheets?id=${id}&range=${range}`)
	).json()
}

// for readability
function isNum(value: string) {
	return !isNaN(Number(value))
}

function setTab(tabName: Tab) {
	currentActiveTab.value = tabName
}

function switchTabTo(tabName: Tab) {
	const queryParams: MusicPageQueries = { query: { tab: tabName } }

	if (tabName === 'Search') {
		queryParams.query.type = 'artist'
	}
	router.replace(queryParams)
	setTab(tabName)
}
</script>

<template>
	<div class="tw-flex-col-center gap-4">
		<h1 class="mt-4 text-2xl font-semibold">My Music Page</h1>

		<div>
			<button class="tw-tab-button" type="button" @click="switchTabTo('Stats')">
				Stats
			</button>

			<button
				class="tw-tab-button"
				type="button"
				@click="switchTabTo('Search')"
			>
				Search
			</button>
		</div>

		<Stats v-if="currentActiveTab === 'Stats'" :stats-object="statsObject" />
		<Search
			v-else-if="currentActiveTab === 'Search'"
			:current-year="currentYear"
			:earliest-year="earliestYear"
			:releases-array="releasesArray"
			:initializing="initializing"
		/>
	</div>
</template>
