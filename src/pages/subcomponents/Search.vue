<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { type MusicSearchProps, Release, type SearchType } from '#types'
import MusicRelease from './MusicRelease.vue'

const Props = defineProps<{
	search: MusicSearchProps
}>()
const Router = useRouter()
const Route = useRoute()

let mounting = true

// refs
const releasesToShow = ref([['']])
const searchType = ref(Release.artist)
const showReleasesDiv = ref(false)
const showNoResults = ref(false)
const searchInput = ref('')

watch(searchType, () => {
	if (mounting && Route.query.term) {
		return
	}

	switch (searchType.value) {
		case Release.score:
			searchInput.value = '7'
			break
		case Release.type:
			searchInput.value = 'Album'
			break
		case Release.year:
			searchInput.value = String(Props.search.currentYear)
			break
		default:
			searchInput.value = ''
	}

	Router.replace({
		query: {
			tab: 'Search',
			term: searchInput.value,
			type: Release[searchType.value]
		}
	})
})

onMounted(() => {
	if (Route.query.term) {
		searchInput.value = Route.query.term as string
		searchType.value = Release[Route.query.type as SearchType]
		const interval = setInterval(() => {
			if (!Props.search.initializing) {
				searchButtonPressed()
				clearInterval(interval)
				mounting = false
			}
		}, 250)
	} else if (Route.query.type) {
		searchType.value = Release[Route.query.type as SearchType]
		mounting = false
	} else {
		mounting = false
	}
})

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
	} else {
		showNoResults.value = true
	}

	Router.replace({
		query: {
			tab: 'Search',
			term: searchInput.value,
			type: Release[searchType.value]
		}
	})
}

function getRelasesFromSearch(index: Release, equals: boolean) {
	return Props.search.releasesArray.filter((release) =>
		equals
			? release[index].toLowerCase() === searchInput.value.toLowerCase()
			: release[index].toLowerCase().includes(searchInput.value.toLowerCase())
	)
}
</script>

<template>
	<div id="searchContent" class="w-full">
		<h3 class="mb-2">Search by:</h3>
		<select v-model="searchType" class="text-black pl-4 py-2 rounded w-72">
			<option selected :value="Release.artist">Artist</option>
			<option :value="Release.name">Release Name</option>
			<option :value="Release.score">Score</option>
			<!-- <option :value="Release.type">Type</option> -->
			<option :value="Release.year">Year</option>
			<option :value="Release.genre">Genre</option>
		</select>

		<div class="m-4 flex justify-center">
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

			<!-- Sorta irrelevant search type? -->
			<!-- Search against release type -->

			<!-- // prettier-ignore
			const releaseTypes = [
				'Album', 'EP', 'Live Album',
				'Soundtrack', 'Remix Album',
				'Compilation', 'Demo Album'
			] -->
			<!-- <div v-else-if="searchType === Release.type">
				<select v-model="searchInput" class="text-black pl-4 py-2 rounded w-64">
					<option
						v-for="(type, index) in releaseTypes"
						:key="index"
						:value="type"
					>
						{{ type }}
					</option>
				</select>
			</div> -->

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
				:index="index"
				:release="release"
			/>
		</div>
		<div v-if="showNoResults">No results from your search.</div>
	</div>
</template>
