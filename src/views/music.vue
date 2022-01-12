<script setup lang="ts">
import { onBeforeMount, type Ref, ref } from 'vue'
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
			for (const element of current) {
				element.trim()
			}
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

function switchTab(event: any, tabName: string) {
	const tabcontent = document.getElementsByClassName('tabcontent') as any
	const tablinks = document.getElementsByClassName('tablinks')

	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none'
	}

	for (let x = 0; x < tablinks.length; x++) {
		tablinks[x].className = tablinks[x].className.replace(' active', '')
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	document.getElementById(tabName)!.style.display = 'block'
	event.currentTarget.tabName += ' active'
}
</script>

<template>
	<div class="flex flex-col justify-center items-center gap-4">
		<h1 class="mt-4 text-2xl font-semibold">My Music Page</h1>

		<div class="flex justify-center">
			<button
				class="tablinks active tw-tab-button"
				type="button"
				@click="switchTab($event, 'statsContent')"
			>
				Stats
			</button>

			<button
				class="tablinks tw-tab-button"
				type="button"
				@click="switchTab($event, 'searchContent')"
			>
				Search
			</button>
		</div>

		<div id="statsContent" class="tabcontent">
			<stats :stats-object="statsObject" />
		</div>
		<div id="searchContent" class="tabcontent hidden">
			<search
				:current-year="currentYear"
				:earliest-year="earliestYear"
				:releases-array="releasesArray"
				:initializing="initializing"
			/>
		</div>
	</div>
</template>
