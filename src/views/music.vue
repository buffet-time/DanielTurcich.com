<script setup lang="ts">
import { Release, SpreadsheetParams, StatsObject } from '../typings'
import { onBeforeMount, Ref, ref } from 'vue'
import 'bootstrap/js/dist/tab'
import search from '../components/music/search.vue'
import stats from '../components/music/stats.vue'

// public variables
const loadingString = 'loading...',
	currentYear = 2021,
	releasesArray = ref([['']]),
	initializing = ref(true),
	earliestYear = ref(currentYear),
	statsObject = ref({
		numberOfReleases: loadingString,
		averageYear: loadingString,
		averageScore: loadingString,
		numberOfArtists: loadingString,
		numberOf50sAndBefore: loadingString,
		numberOf1960sReleases: loadingString,
		numberOf1970sReleases: loadingString,
		numberOf1980sReleases: loadingString,
		numberOf1990sReleases: loadingString,
		numberOf2000sReleases: loadingString,
		numberOf2010sReleases: loadingString,
		numberOf2020sReleases: loadingString
	}) as Ref<StatsObject>,
	// Private variables
	artistArray: string[] = [],
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
	tempYear = 0,
	before1960 = 0,
	num1960s = 0,
	num1970s = 0,
	num1980s = 0,
	num1990s = 0,
	num2000s = 0,
	num2010s = 0,
	num2020s = 0

onBeforeMount(async () => {
	// add possible functionality to export last.fm to chart?
	await initializeSheets()
	initializing.value = false
	const reversedArray = releasesArray.value.reverse()

	reversedArray.forEach((current) => {
		if (!artistArray.includes(current[Release.artist])) {
			artistArray.push(current[Release.artist])
		}
		const currentYear = Number(current[Release.year])

		if (currentYear < earliestYear.value) {
			earliestYear.value = currentYear
		}
		tempYear += currentYear
		yearCount++
		if (currentYear > 2019) {
			num2020s++
		} else if (currentYear > 2009) {
			num2010s++
		} else if (currentYear > 1999) {
			num2000s++
		} else if (currentYear > 1989) {
			num1990s++
		} else if (currentYear > 1979) {
			num1980s++
		} else if (currentYear > 1969) {
			num1970s++
		} else if (currentYear > 1959) {
			num1960s++
		} else {
			before1960++
		}

		if (isNum(current[Release.score])) {
			tempScore += Number(current[Release.score])
			scoreCount++
		} else if (current[Release.score] == '?') {
			questionMarkScoreCount++
		}
	})
	releasesArray.value.reverse()

	statsObject.value = {
		averageScore: (tempScore / scoreCount).toFixed(2),
		numberOfArtists: artistArray.length,
		averageYear: (tempYear / yearCount).toFixed(2),
		numberOfReleases: scoreCount + questionMarkScoreCount,
		numberOf50sAndBefore: before1960,
		numberOf1960sReleases: num1960s,
		numberOf1970sReleases: num1970s,
		numberOf1980sReleases: num1980s,
		numberOf1990sReleases: num1990s,
		numberOf2000sReleases: num2000s,
		numberOf2010sReleases: num2010s,
		numberOf2020sReleases: num2020s
	}
})

async function initializeSheets() {
	const [arrayBefore, array2020, array2021] = await Promise.all(
		spreadsheets.map((spreadsheet) =>
			getArray(spreadsheet.id, spreadsheet.range)
		)
	)

	releasesArray.value = arrayBefore
		.concat(array2020, array2021)
		.filter((current: any) => current.length > 5) // makes sure to not include any not fully written reviews

	for (let x = 0; x < releasesArray.value.length; x++) {
		for (let n = 0; n < releasesArray.value[x].length; n++) {
			releasesArray.value[x][n].trim()
		}
	}
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
