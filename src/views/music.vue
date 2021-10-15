<script setup lang="ts">
import { Release, SpreadsheetParams } from '../typings'
import 'bootstrap/js/dist/tab'
import musicRelease from '../components/musicRelease.vue'
import { onMounted, Ref, ref, watch } from 'vue'

const currentYear = 2021,
	loadingString = '...',
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
	],
	// public variables
	releasesToShow = ref([['']]),
	latestYear = ref(currentYear),
	earliestYear = ref(currentYear),
	searchType = ref(Release.artist),
	searchInput = ref(''),
	intializing = ref(true),
	showCopyButton = ref(false),
	showReleasesDiv = ref(false),
	showNoResults = ref(false),
	numberOfReleases: Ref<string | number> = ref(loadingString),
	averageYear: Ref<string | number> = ref(loadingString),
	averageScore: Ref<string | number> = ref(loadingString),
	numberOfArtists: Ref<string | number> = ref(loadingString),
	numberOf50sAndBefore: Ref<string | number> = ref(loadingString),
	numberOf1960sReleases: Ref<string | number> = ref(loadingString),
	numberOf1970sReleases: Ref<string | number> = ref(loadingString),
	numberOf1980sReleases: Ref<string | number> = ref(loadingString),
	numberOf1990sReleases: Ref<string | number> = ref(loadingString),
	numberOf2000sReleases: Ref<string | number> = ref(loadingString),
	numberOf2010sReleases: Ref<string | number> = ref(loadingString),
	numberOf2020sReleases: Ref<string | number> = ref(loadingString),
	releaseTypes = [
		'Album',
		'EP',
		'Live Album',
		'Soundtrack',
		'Remix Album',
		'Compilation',
		'Demo Album'
	]

// Private variables
const artistArray: string[] = []
let reviewsText = '',
	releasesArray: string[][] = [],
	scoreCount = 0,
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

onMounted(async () => {
	// add possible functionality to export last.fm to chart?
	await initializeSheets()
	intializing.value = false
	const reversedArray = releasesArray.reverse()

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
	releasesArray.reverse()

	averageScore.value = (tempScore / scoreCount).toFixed(2)
	numberOfArtists.value = artistArray.length
	averageYear.value = (tempYear / yearCount).toFixed(2)
	numberOfReleases.value = scoreCount + questionMarkScoreCount
	numberOf50sAndBefore.value = before1960
	numberOf1960sReleases.value = num1960s
	numberOf1970sReleases.value = num1970s
	numberOf1980sReleases.value = num1980s
	numberOf1990sReleases.value = num1990s
	numberOf2000sReleases.value = num2000s
	numberOf2010sReleases.value = num2010s
	numberOf2020sReleases.value = num2020s

	window.addEventListener('keydown', (event) => {
		if (searchType.value === Release.score) {
			incrementRange(event.key, 0.5, 0, 10)
		} else if (searchType.value === Release.year) {
			incrementRange(event.key, 1, earliestYear.value, latestYear.value)
		}
	})
})

watch(searchType, () => {
	if (searchType.value === Release.score) {
		searchInput.value = '7'
	} else if (searchType.value === Release.type) {
		searchInput.value = 'Album'
	} else if (searchType.value === Release.year) {
		searchInput.value = latestYear.value.toString()
	} else {
		searchInput.value = ''
	}
})

function copyReviews() {
	navigator.clipboard.writeText(reviewsText)
}

function searchButtonPressed() {
	showReleasesDiv.value = false
	showNoResults.value = false
	searchInput.value = searchInput.value.trim()
	let equals = false

	switch (searchType.value) {
		case Release.score:
			equals = true
			break
		case Release.type:
			equals = true
			break
		case Release.year:
			equals = true
			break
	}
	releasesToShow.value = getRelasesFromSearch(searchType.value, equals)

	if (releasesToShow.value.length > 0) {
		showReleasesDiv.value = true
		showCopyButton.value = true
		reviewsText = arrayToFormattedOutput(releasesToShow.value)
	} else {
		showNoResults.value = true
		showCopyButton.value = false
	}
}

// private functions
function getRelasesFromSearch(index: Release, equals: boolean) {
	if (equals) {
		return releasesArray.filter(
			(release) =>
				release[index].toLowerCase() === searchInput.value.toLowerCase()
		)
	} else {
		return releasesArray.filter((release) =>
			release[index].toLowerCase().includes(searchInput.value.toLowerCase())
		)
	}
}

async function initializeSheets() {
	const [arrayBefore, array2020, array2021] = await Promise.all(
		spreadsheets.map((spreadsheet) => {
			return getArray(spreadsheet.id, spreadsheet.range)
		})
	)

	releasesArray = arrayBefore
		.concat(array2020, array2021)
		.filter((current: any) => current.length > 5) // makes sure to not include any not fully written reviews

	for (let x = 0; x < releasesArray.length; x++) {
		for (let n = 0; n < releasesArray[x].length; n++) {
			releasesArray[x][n].trim()
		}
	}
}

function arrayToFormattedOutput(array: string[][]) {
	return array
		.map((release) => {
			if (release.length > 0) {
				return ` ${release[Release.artist]} - ${release[Release.name]}: ${
					release[Release.score]
				}`
			} else {
				return ''
			}
		})
		.toString()
}

function incrementRange(
	key: string,
	incrementAmount: number,
	minimum: number,
	maximum: number
) {
	if (key === 'ArrowLeft' && Number(searchInput) > minimum) {
		searchInput.value = (Number(searchInput) + -incrementAmount).toString()
	} else if (key === 'ArrowRight' && Number(searchInput) < maximum) {
		searchInput.value = (Number(searchInput) + incrementAmount).toString()
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
		<div
			id="stats"
			class="tab-pane fade show active"
			role="tabpanel"
			aria-labelledby="stats-tab"
		>
			<div class="table-div">
				<table class="table table-dark .table-borderless">
					<thead v-once>
						<tr>
							<th scope="col">Stat</th>
							<th scope="col">Value</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th v-once scope="row">Number of releases</th>
							<td>{{ numberOfReleases }}</td>
						</tr>
						<tr>
							<th v-once scope="row">Number of artists</th>
							<td>{{ numberOfArtists }}</td>
						</tr>
						<tr>
							<th v-once scope="row">Average Year</th>
							<td>{{ averageYear }}</td>
						</tr>
						<tr>
							<th v-once scope="row">Average Score</th>
							<td>{{ averageScore }}</td>
						</tr>
						<tr>
							<th v-once scope="row">Releases before 1960</th>
							<td>{{ numberOf50sAndBefore }}</td>
						</tr>
						<tr>
							<th v-once scope="row">Releases in the 1960s</th>
							<td>{{ numberOf1960sReleases }}</td>
						</tr>
						<tr>
							<th v-once scope="row">Releases in the 1970s</th>
							<td>{{ numberOf1970sReleases }}</td>
						</tr>
						<tr>
							<th v-once scope="row">Releases in the 1980s</th>
							<td>{{ numberOf1980sReleases }}</td>
						</tr>
						<tr>
							<th v-once scope="row">Releases in the 1990s</th>
							<td>{{ numberOf1990sReleases }}</td>
						</tr>
						<tr>
							<th v-once scope="row">Releases in the 2000s</th>
							<td>{{ numberOf2000sReleases }}</td>
						</tr>
						<tr>
							<th v-once scope="row">Releases in the 2010s</th>
							<td>{{ numberOf2010sReleases }}</td>
						</tr>
						<tr>
							<th v-once scope="row">Releases in the 2020s</th>
							<td>{{ numberOf2020sReleases }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div
			id="search"
			class="tab-pane fade"
			role="tabpanel"
			aria-labelledby="search-tab"
		>
			<div>
				<h3 v-once>Search by:</h3>
				<select v-model="searchType" class="form-select">
					<option selected :value="Release.artist">Artist</option>
					<option :value="Release.name">Release Name</option>
					<option :value="Release.score">Score</option>
					<option :value="Release.type">Type</option>
					<option :value="Release.year">Year</option>
					<option :value="Release.genre">Genre</option>
				</select>

				<div class="input-container">
					<!-- Search against score -->
					<template v-if="searchType === Release.score">
						<label for="customRange1" class="form-label">{{
							searchInput
						}}</label>
						<br />
						<input
							v-model="searchInput"
							placeholder="10"
							type="range"
							class="music-input form-range"
							min="0"
							max="10"
							step="0.5"
						/>
					</template>

					<!-- Search against release type -->
					<template v-else-if="searchType === Release.type">
						<select v-model="searchInput" class="form-select type-select">
							<option
								v-for="(type, index) in releaseTypes"
								:key="index"
								:value="type"
							>
								{{ type }}
							</option>
						</select>
					</template>

					<!-- Search against score -->
					<template v-else-if="searchType === Release.year">
						<label for="customRange1" class="form-label">{{
							searchInput
						}}</label>
						<br />
						<input
							v-model="searchInput"
							:placeholder="latestYear.toString()"
							type="range"
							class="music-input form-range"
							:min="earliestYear"
							:max="latestYear"
							step="1"
						/>
					</template>

					<!-- All others -->
					<input
						v-else
						v-model="searchInput"
						class="music-input form-control"
						placeholder="Search input"
						@keyup.enter="searchButtonPressed"
					/>
					<button
						:disabled="intializing || searchInput.length < 1"
						class="music-button btn btn-secondary"
						@click="searchButtonPressed"
					>
						Search
					</button>

					<!-- 
						add exact match checkbox			
					-->
				</div>

				<div v-if="showReleasesDiv" class="music-text-div">
					<ul ref="releases" class="list-group list-group-horizontal">
						<musicRelease
							v-for="(release, index) in releasesToShow"
							:key="index"
							:index="index"
							:release="release"
						></musicRelease>
					</ul>
				</div>
				<div v-if="showNoResults">No results from your search.</div>
				<button
					v-show="showCopyButton"
					class="btn btn-secondary"
					@click="copyReviews()"
				>
					Copy
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.list-group {
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}

.music-input {
	display: inline-block;
	width: 250px;
}

.music-button {
	margin-left: 20px;
}

.music-text-div {
	margin: 8px;
	margin-top: 16px;
	margin-bottom: 8px;
}

.form-select {
	width: 300px;
	margin-left: calc(50% - 150px);
}

.input-container {
	margin-top: 16px;
	margin-bottom: 16px;
}

.table-div {
	width: 400px;
	margin-left: calc(50% - 200px);
	color: white;
}

.nav-link {
	color: white;
}

.nav-tabs {
	width: 155px;
	margin-left: calc(50% - 77.5px);
	margin-bottom: 16px;
}

.type-select {
	margin-bottom: 10px;
}

.nav-link:hover,
.nav-link:focus {
	color: white;
}
</style>
