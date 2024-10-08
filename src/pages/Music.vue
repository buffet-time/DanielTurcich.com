<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Search from './subcomponents/Search.vue'
import Stats from './subcomponents/Stats.vue'
import type { MusicPageQueries, StatsObject, Tab } from '#types'
import { ProperFetch } from '../shared'

// const loadingString = 'loading...'
const route = useRoute()
const router = useRouter()

// public variables
const initializing = ref(true)
const releasesArray = ref([['']])
const currentActiveTab = ref<Tab>('Search')
const statsObject = ref<StatsObject>()

// TODO: move Stats to be calculated and cached on the API
onBeforeMount(async () => {
	const queryTab = route.query.tab as Tab
	if (queryTab === 'Stats') {
		setTab(queryTab)
	} else {
		await switchTabTo('Search')
	}

	let retries = 0
	async function getData() {
		if (retries > 2) {
			console.error(`Can't get the data :(`)
		}

		const values = await Promise.all([getReleases(), getStats()])

		const releases = values[0]
		const stats = values[1]

		if (releases && stats) {
			releasesArray.value = releases
			statsObject.value = stats
			initializing.value = false
		} else {
			setTimeout(
				() => async () => {
					await getData()
					retries++
				},
				5000,
			)
		}
	}

	await getData()
})

async function getReleases(): Promise<string[][] | null> {
	return (await ProperFetch(
		'https://api.danielturcich.com/Releases',
	)) as string[][]
}

async function getStats(): Promise<StatsObject | null> {
	return (await ProperFetch(
		'https://api.danielturcich.com/Stats',
	)) as StatsObject
}

function setTab(tabName: Tab) {
	currentActiveTab.value = tabName
}

async function switchTabTo(tabName: Tab) {
	const queryParams: MusicPageQueries = { query: { tab: tabName } }

	if (tabName === 'Search') {
		queryParams.query.type = 'artist'
	}
	await router.replace(queryParams)
	setTab(tabName)
}
</script>

<template>
	<div class="tw-flex-col-center gap-4">
		<h1 class="mt-4 text-2xl font-semibold">My Music Page</h1>

		<!-- TODO: have the current tab be persistently highlighted -->
		<div>
			<button
				class="tw-tab-button"
				:class="{
					'bg-white': currentActiveTab === 'Search',
					'text-neutral-600': currentActiveTab === 'Search'
				}"
				type="button"
				@click="switchTabTo('Search')"
			>
				Search
			</button>

			<button
				class="tw-tab-button"
				:class="{
					'bg-white': currentActiveTab === 'Stats',
					'text-neutral-600': currentActiveTab === 'Stats'
				}"
				type="button"
				@click="switchTabTo('Stats')"
			>
				Stats
			</button>
		</div>

		<template v-if="!initializing">
			<Search
				v-if="currentActiveTab === 'Search'"
				:search="{
					currentYear: statsObject!.currentYear,
					earliestYear: statsObject!.earliestYear,
					releasesArray: releasesArray,
					initializing: initializing
				}"
			/>
			<Stats v-else-if="currentActiveTab === 'Stats'" :stats="statsObject!" />
		</template>
	</div>
</template>
