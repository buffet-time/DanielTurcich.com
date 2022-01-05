<script setup lang="ts">
import { type StatsObject } from '../../views/music.vue'

defineProps<{
	statsObject: StatsObject
}>()
</script>

<template>
	<div
		id="stats"
		class="tab-pane fade show active"
		role="tabpanel"
		aria-labelledby="stats-tab"
	>
		<div class="w-96">
			<table class="table-auto text-white w-full border-collapse bg-[#212529]">
				<thead class="border-solid p-2">
					<tr>
						<th>Stat</th>
						<th>Value</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<th>Number of releases</th>
						<td>{{ statsObject.numberOfReleases }}</td>
					</tr>
					<tr>
						<th>Number of artists</th>
						<td>{{ statsObject.numberOfArtists }}</td>
					</tr>
					<tr>
						<th>Average Year</th>
						<td>{{ statsObject.averageYear }}</td>
					</tr>
					<tr>
						<th v-once>Average Score</th>
						<td>{{ statsObject.averageScore }}</td>
					</tr>

					<tr v-for="(item, index) in statsObject.releasesPerYear" :key="index">
						<th v-if="index > 0">
							Releases in the {{ `${1950 + index * 10}s` }}
						</th>
						<th v-else v-once>Releases before 1960</th>
						<td>
							{{ item }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style scoped>
thead,
th,
td {
	border-style: solid;
	padding: 0.5rem;
	border-bottom-width: 1px;
	font-weight: normal;
	font-size: large;
}
</style>
