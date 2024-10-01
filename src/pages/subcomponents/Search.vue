<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import {
	type MusicSearchProps,
	Release,
	type SearchType,
	ReleaseType,
} from '#types'
import MusicRelease from './MusicRelease.vue'

const { search } = defineProps<{
	search: MusicSearchProps
}>()
const Router = useRouter()
const Route = useRoute()

const massagedReleaseType = Object.keys(ReleaseType).filter((current) =>
	Number.isNaN(Number(current)),
)

// TODO:
// Add ability to search by year range

// refs
const releasesToShow = ref([['']])
const searchType = ref(Release.artist)
const showReleasesDiv = ref(false)
const showNoResults = ref(false)
const searchInput = ref('Daft Punk')
const filterBy = ref(Release.score)
const ascending = ref(true)

watch(searchType, async () => {
	switch (searchType.value) {
		case Release.score:
			searchInput.value = '7'
			break
		case Release.type:
			searchInput.value = 'Live Album'
			break
		case Release.year:
			searchInput.value = String(search.currentYear)
			break
		// case Release.range:
		// 	searchInput.value = '2020-2023'
		default:
			searchInput.value = ''
	}

	await Router.replace({
		query: {
			tab: 'Search',
			term: searchInput.value,
			type: Release[searchType.value],
		},
	})
})

watch(filterBy, () => {
	switch (filterBy.value) {
		case Release.score:
		case Release.year:
			ascending.value = true
			break

		default:
			ascending.value = false
			break
	}

	sortReleases()
})

watch(ascending, () => sortReleases())

onMounted(() => {
	// TODO bug in setting this not searching on load
	if (Route.query.term) {
		searchInput.value = Route.query.term as string
		searchType.value = Release[Route.query.type as SearchType]
		const interval = setInterval(
			() => async () => {
				if (!search.initializing) {
					await searchButtonPressed()
					clearInterval(interval)
				}
			},
			250,
		)
	} else if (Route.query.type) {
		searchType.value = Release[Route.query.type as SearchType]
	}
})

async function searchButtonPressed() {
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
	sortReleases()

	if (releasesToShow.value.length > 0) {
		showReleasesDiv.value = true
	} else {
		showNoResults.value = true
	}

	await Router.replace({
		query: {
			tab: 'Search',
			term: searchInput.value,
			type: Release[searchType.value],
		},
	})
}

function getRelasesFromSearch(index: Release, equals: boolean) {
	return search.releasesArray.filter((release) => {
		return equals
			? release[index].toLowerCase() === searchInput.value.toLowerCase()
			: release[index].toLowerCase().includes(searchInput.value.toLowerCase())
	})
}

function sortReleases() {
	if (ascending.value) {
		releasesToShow.value.sort(
			(previous, current) =>
				// @ts-expect-error - this is valid js.
				current[filterBy.value] - previous[filterBy.value],
		)
		return
	}

	releasesToShow.value.sort(
		(previous, current) =>
			// @ts-expect-error - this is valid js.
			previous[filterBy.value] - current[filterBy.value],
	)
}
</script>

<template>
	<div id="searchContent" class="w-full flex flex-col gap-2">
		<div class="tw-select-container">
			<h3 class="tw-music-search-label">Search by</h3>
			<select v-model="searchType" class="tw-music-select">
				<option :value="Release.artist">Artist</option>
				<option :value="Release.name">Release Name</option>
				<option :value="Release.score">Score</option>
				<option :value="Release.type">Type</option>
				<option :value="Release.year">Year</option>
				<option :value="Release.genre">Genre</option>
			</select>
		</div>

		<div class="tw-select-container">
			<h3 class="tw-music-search-label">Sort by</h3>
			<select v-model="filterBy" class="tw-music-select">
				<option :value="Release.artist">Artist</option>
				<option :value="Release.name">Release Name</option>
				<option :value="Release.score">Score</option>
				<option :value="Release.type">Type</option>
				<option :value="Release.year">Year</option>
				<option :value="Release.genre">Genre</option>
			</select>
		</div>

		<div class="tw-select-container">
			<h3 class="tw-music-search-label">Order</h3>
			<select v-model="ascending" class="tw-music-select">
				<option :value="true">Ascending</option>
				<option :value="false">Descending</option>
			</select>
		</div>

		<div class="mt-2 flex justify-center">
			<!-- Search against score -->
			<div v-if="searchType === Release.score" class="flex flex-col">
				<div class="mb-1">{{ searchInput }}</div>
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

			<div v-else-if="searchType === Release.type">
				<select v-model="searchInput" class="text-black pl-4 py-2 rounded w-64">
					<option
						v-for="(type, index) in massagedReleaseType"
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
					:placeholder="String(search.currentYear)"
					type="range"
					class="w-64 bg-transparent h-2"
					:min="search.earliestYear"
					:max="search.currentYear"
					step="1"
				/>
			</div>

			<!-- All others -->
			<input
				v-else
				v-model="searchInput"
				class="w-64 py-2 px-3 text-black rounded"
				placeholder="Search input"
				@keyup.enter="searchButtonPressed"
			/>

			<button
				:disabled="search.initializing || searchInput.length < 1"
				class="ml-4 tw-button"
				@click="searchButtonPressed"
			>
				Search
			</button>
		</div>

		<div
			v-if="showReleasesDiv"
			ref="releases"
			class="m-2 mt-4 mb-2 flex flex-wrap justify-center"
		>
			<MusicRelease
				v-for="(release, index) in releasesToShow"
				:key="index"
				:release="release"
			/>
		</div>

		<div v-if="showNoResults">No results from your search.</div>
	</div>
</template>
