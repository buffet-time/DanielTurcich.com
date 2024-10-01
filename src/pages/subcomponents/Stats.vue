<script setup lang="ts">
import type { StatsObject } from '../../types/Typings'

defineProps<{
	stats: StatsObject
}>()
</script>

<template>
	<div id="statsContent" class="w-full flex justify-center">
		<table class="table-auto text-white w-96 border-collapse bg-[#212529]">
			<thead class="border-solid p-2">
				<tr>
					<th>Stat</th>
					<th>Value</th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<th>Number of releases</th>
					<td>{{ stats.numberOfReleases }}</td>
				</tr>
				<tr>
					<th>Number of artists</th>
					<td>{{ stats.numberOfArtists }}</td>
				</tr>
				<tr>
					<th>Average Year</th>
					<td>{{ stats.averageYear }}</td>
				</tr>
				<tr>
					<th>Average Score</th>
					<td>{{ stats.averageScore }}</td>
				</tr>

				<tr v-for="(item, index) in stats.releasesPerYear" :key="index">
					<th v-if="index > 0">
						Releases in the {{ `${1950 + index * 10}s` }}
					</th>
					<th v-else>Releases before 1960</th>
					<td>
						{{ item }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped>
thead,
th,
td {
	text-align: center;
	padding: 0.5rem;
	font-weight: normal;
	font-size: large;
}

thead {
	border-style: solid;
	border-bottom-width: 1px;
}

tr:not(:last-child) {
	border-style: solid;
	border-bottom-width: 1px;
}
</style>
