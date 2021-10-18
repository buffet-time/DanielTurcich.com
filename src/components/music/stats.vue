<script setup lang="ts">
import { StatsObject } from '../../typings'

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
						<th scope="col bold">Stat</th>
						<th scope="col bold">Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th v-once scope="row bold">Number of releases</th>
						<td>{{ statsObject.numberOfReleases }}</td>
					</tr>
					<tr>
						<th v-once scope="row bold">Number of artists</th>
						<td>{{ statsObject.numberOfArtists }}</td>
					</tr>
					<tr>
						<th v-once scope="row bold">Average Year</th>
						<td>{{ statsObject.averageYear }}</td>
					</tr>
					<tr>
						<th v-once scope="row bold">Average Score</th>
						<td>{{ statsObject.averageScore }}</td>
					</tr>
					<tr>
						<th v-once scope="row bold">Releases before 1960</th>
						<td>{{ statsObject.numberOf50sAndBefore }}</td>
					</tr>
					<tr>
						<th v-once scope="row bold">Releases in the 1960s</th>
						<td>{{ statsObject.numberOf1960sReleases }}</td>
					</tr>
					<tr>
						<th v-once scope="row bold">Releases in the 1970s</th>
						<td>{{ statsObject.numberOf1970sReleases }}</td>
					</tr>
					<tr>
						<th v-once scope="row bold">Releases in the 1980s</th>
						<td>{{ statsObject.numberOf1980sReleases }}</td>
					</tr>
					<tr>
						<th v-once scope="row bold">Releases in the 1990s</th>
						<td>{{ statsObject.numberOf1990sReleases }}</td>
					</tr>
					<tr>
						<th v-once scope="row bold">Releases in the 2000s</th>
						<td>{{ statsObject.numberOf2000sReleases }}</td>
					</tr>
					<tr>
						<th v-once scope="row bold">Releases in the 2010s</th>
						<td>{{ statsObject.numberOf2010sReleases }}</td>
					</tr>
					<tr>
						<th v-once scope="row bold">Releases in the 2020s</th>
						<td>{{ statsObject.numberOf2020sReleases }}</td>
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
