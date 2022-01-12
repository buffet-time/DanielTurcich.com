<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Release } from '../../assets/enums'
import musicRelease from './musicRelease.vue'

const props = defineProps<{
	currentYear: number
	earliestYear: number
	releasesArray: string[][]
	initializing: boolean
}>()

// refs
const releasesToShow = ref([['']])
const searchType = ref(Release.artist)
const showReleasesDiv = ref(false)
const latestYear = ref(props.currentYear)
const showNoResults = ref(false)
const searchInput = ref('')

// variables
// prettier-ignore
const releaseTypes = [
	'Album', 'EP', 'Live Album',
	'Soundtrack', 'Remix Album',
	'Compilation', 'Demo Album'
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
		if (searchType.value === Release.score) {
			incrementRange(event.key, 0.5, 0, 10)
		} else if (searchType.value === Release.year) {
			incrementRange(event.key, 1, props.earliestYear, latestYear.value)
		}
	})
)

function searchButtonPressed() {
	console.log(1)
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
	} else {
		showNoResults.value = true
	}
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
	if (key === 'ArrowLeft' && Number(searchInput.value) > minimum) {
		searchInput.value = String(searchInput.value + -incrementAmount)
	} else if (key === 'ArrowRight' && Number(searchInput.value) < maximum) {
		searchInput.value = String(searchInput.value + incrementAmount)
	}
}
</script>

<template>
	<div class="flex flex-col justify-center items-center">
		<h3 class="mb-2">Search by:</h3>
		<select v-model="searchType" class="text-black pl-4 py-2 rounded w-72">
			<option selected :value="Release.artist">Artist</option>
			<option :value="Release.name">Release Name</option>
			<option :value="Release.score">Score</option>
			<option :value="Release.type">Type</option>
			<option :value="Release.year">Year</option>
			<option :value="Release.genre">Genre</option>
		</select>

		<div class="m-4 flex">
			<!-- Search against score -->
			<div v-if="searchType === Release.score" class="flex flex-col">
				<label for="customRange1" class="mb-1">{{ searchInput }}</label>
				<!-- 
						background-color: transparent;
					 -->
				<input
					v-model="searchInput"
					placeholder="10"
					type="range"
					class="w-64 bg-transparent h-2"
					min="0"
					max="10"
					step="0.5"
				/>
			</div>

			<!-- Search against release type -->
			<div v-else-if="searchType === Release.type">
				<select v-model="searchInput" class="form-select mb-3">
					<option
						v-for="(type, index) in releaseTypes"
						:key="index"
						:value="type"
					>
						{{ type }}
					</option>
				</select>
			</div>

			<!-- Search against year -->
			<div v-else-if="searchType === Release.year" class="flex flex-col">
				<label for="customRange1" class="form-label">{{ searchInput }}</label>
				<input
					v-model="searchInput"
					:placeholder="String(latestYear)"
					type="range"
					class="w-64 bg-transparent h-2"
					:min="earliestYear"
					:max="latestYear"
					step="1"
				/>
			</div>

			<!-- All others -->
			<!-- 
					padding: 0.375rem 0.75rem;
					color: #212529;
					border: 1px solid #ced4da;
					order-radius: 0.25rem;
				 -->
			<input
				v-else
				v-model="searchInput"
				class="w-64 py-2 px-3 text-black rounded"
				placeholder="Search input"
				@keyup.enter="searchButtonPressed"
			/>

			<button
				:disabled="initializing || searchInput.length < 1"
				class="ml-4 tw-button"
				@click="searchButtonPressed"
			>
				Search
			</button>

			<!-- 
						add exact match checkbox			
					-->
		</div>

		<div v-if="showReleasesDiv" class="m-2 mt-4 mb-2">
			<div ref="releases" class="flex flex-wrap justify-center">
				<musicRelease
					v-for="(release, index) in releasesToShow"
					:key="index"
					:index="index"
					:release="release"
				/>
			</div>
		</div>
		<div v-if="showNoResults">No results from your search.</div>
	</div>
</template>

<style scoped>
.form-select {
	width: 300px;
	margin-left: calc(50% - 150px);
}
</style>
