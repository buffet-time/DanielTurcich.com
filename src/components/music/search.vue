<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Release } from '../../typings'
import musicRelease from './musicRelease.vue'

const props = defineProps<{
	currentYear: number
	earliestYear: number
	releasesArray: string[][]
	initializing: boolean
}>()

// refs
const releasesToShow = ref([['']]),
	searchType = ref(Release.artist),
	showReleasesDiv = ref(false),
	latestYear = ref(props.currentYear),
	showNoResults = ref(false),
	searchInput = ref('')

// variables
const releaseTypes = [
	'Album',
	'EP',
	'Live Album',
	'Soundtrack',
	'Remix Album',
	'Compilation',
	'Demo Album'
]

watch(searchType, () => {
	switch (searchType.value) {
		case Release.score:
			searchInput.value = '7'
			break
		case Release.type:
			searchInput.value = 'Album'
			break
		case Release.year:
			searchInput.value = String(latestYear.value)
			break
		default:
			searchInput.value = ''
	}
})

onMounted(() =>
	window.addEventListener('keydown', (event) => {
		if (searchType.value === Release.score)
			incrementRange(event.key, 0.5, 0, 10)
		else if (searchType.value === Release.year)
			incrementRange(event.key, 1, props.earliestYear, latestYear.value)
	})
)

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

	if (releasesToShow.value.length > 0) showReleasesDiv.value = true
	else showNoResults.value = true
}

function getRelasesFromSearch(index: Release, equals: boolean) {
	return props.releasesArray.filter((release) =>
		equals
			? release[index].toLowerCase() === searchInput.value.toLowerCase()
			: release[index].toLowerCase().includes(searchInput.value.toLowerCase())
	)
}

function incrementRange(
	key: string,
	incrementAmount: number,
	minimum: number,
	maximum: number
) {
	if (key === 'ArrowLeft' && Number(searchInput.value) > minimum)
		searchInput.value = String(searchInput.value + -incrementAmount)
	else if (key === 'ArrowRight' && Number(searchInput.value) < maximum)
		searchInput.value = String(searchInput.value + incrementAmount)
}
</script>

<template>
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
					<label for="customRange1" class="form-label">{{ searchInput }}</label>
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
					<label for="customRange1" class="form-label">{{ searchInput }}</label>
					<br />
					<input
						v-model="searchInput"
						:placeholder="String(latestYear)"
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
					:disabled="initializing || searchInput.length < 1"
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
.type-select {
	margin-bottom: 10px;
}
</style>
