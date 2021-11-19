<script setup lang="ts">
import { StatsObject } from '../../views/music.vue'

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
		<div class="table-div">
			<table class="table table-dark .table-borderless">
				<thead v-once>
					<tr>
						<th>Stat</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th v-once>Number of releases</th>
						<td>{{ statsObject.numberOfReleases }}</td>
					</tr>
					<tr>
						<th v-once>Number of artists</th>
						<td>{{ statsObject.numberOfArtists }}</td>
					</tr>
					<tr>
						<th v-once>Average Year</th>
						<td>{{ statsObject.averageYear }}</td>
					</tr>
					<tr>
						<th v-once>Average Score</th>
						<td>{{ statsObject.averageScore }}</td>
					</tr>
					<!-- change to v-for  -->

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
.table-div {
	width: 400px;
	margin-left: calc(50% - 200px);
	color: white;
}
th {
	font-weight: normal;
	font-size: large;
}
</style>
