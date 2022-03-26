<script setup lang="ts">
import { onBeforeMount, type Ref, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Search from './subcomponents/Search.vue'
import Stats from './subcomponents/Stats.vue'
import {
	type MusicPageQueries,
	type StatsObject,
	type Tab
} from '../types/Typings'
import { ProperFetch } from '../shared'

// const loadingString = 'loading...'
const route = useRoute()
const router = useRouter()

// public variables
const initializing = ref(true)
const releasesArray = ref([['']])
const currentActiveTab = ref('Stats') as Ref<Tab>
const statsObject = ref() as Ref<StatsObject>

// TODO: move Stats to be calculated and cached on the API
onBeforeMount(() => {
	const queryTab = route.query.tab as Tab
	if (queryTab === 'Search') {
		setTab(queryTab)
	} else {
		switchTabTo('Stats')
	}

	let retries = 0
	const getData = () => {
		if (retries > 2) {
			console.error(`Can't get the data :(`)
		}

		Promise.all([getReleases(), getStats()])
			.then((values) => {
				if (values[0] && values[1]) {
					releasesArray.value = values[0]
					statsObject.value = values[1]
					initializing.value = false
				} else {
					setTimeout(() => {
						getData()
						retries++
					}, 5000)
				}
			})
			.catch((error) => {
				console.error(`Error in Music.vue promise.all(): ${error}`)
			})
	}

	getData()
})

async function getReleases(): Promise<string[][] | null> {
	return await ProperFetch(`https://api.danielturcich.com/Releases`)
}

async function getStats(): Promise<StatsObject | null> {
	return await ProperFetch(`https://api.danielturcich.com/Stats`)
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

		<!-- TODO: have the current tab be persistently highlighted -->
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

		<template v-if="!initializing">
			<Stats v-if="currentActiveTab === 'Stats'" :stats-object="statsObject" />
			<Search
				v-else-if="currentActiveTab === 'Search'"
				:current-year="statsObject.currentYear"
				:earliest-year="statsObject.earliestYear"
				:releases-array="releasesArray"
				:initializing="initializing"
			/>
		</template>
	</div>
</template>
