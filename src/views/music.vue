<script lang="ts" src="./music.ts"></script>

<template>
	<h1 v-once class="music-title disable-select">Music Page (WiP)</h1>
	<ul v-once id="myTab" class="nav nav-tabs" role="tablist">
		<li class="nav-item" role="presentation">
			<button
				id="stats-tab"
				class="nav-link active"
				data-bs-toggle="tab"
				data-bs-target="#stats"
				type="button"
				role="tab"
				aria-controls="stats"
				aria-selected="true"
			>
				Stats
			</button>
		</li>
		<li class="nav-item" role="presentation">
			<button
				id="search-tab"
				class="nav-link"
				data-bs-toggle="tab"
				data-bs-target="#search"
				type="button"
				role="tab"
				aria-controls="search"
				aria-selected="false"
			>
				Search
			</button>
		</li>
	</ul>
	<div id="myTabContent" class="tab-content">
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
							<th scope="col">Stat</th>
							<th scope="col">Value</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th v-once scope="row">Number of releases</th>
							<td>{{ numberOfReleases }}</td>
						</tr>
						<tr>
							<th v-once scope="row">Average Year</th>
							<td>{{ averageYear }}</td>
						</tr>
						<tr>
							<th v-once scope="row">Average Score</th>
							<td>{{ averageScore }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div
			id="search"
			class="tab-pane fade"
			role="tabpanel"
			aria-labelledby="search-tab"
		>
			<div>
				<h3 v-once>Search by:</h3>
				<select v-once ref="searchType" class="form-select">
					<option value="0">Artist</option>
					<option value="1">Release Name</option>
					<option value="2">Score</option>
					<option value="3">Type</option>
					<option value="4">Year</option>
					<option value="5">Genre</option>
				</select>
				<div class="input-container">
					<input
						v-once
						v-model="searchInput"
						class="music-input form-control"
						placeholder="Search input"
						@keyup.enter="searchButtonPressed"
					/>
					<button
						:disabled="intializing || searchInput.length < 1"
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
						<music-release
							v-for="(release, index) in releasesToShow"
							:key="index"
							:index="index"
							:release="release"
						></music-release>
					</ul>
				</div>
				<div v-if="showNoResults">No results from your search.</div>
				<button
					v-show="showCopyButton"
					class="btn btn-secondary"
					@click="copyReviews"
				>
					Copy
				</button>
			</div>
		</div>
	</div>
</template>

<style>
.list-group {
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}

.music-title {
	margin-top: 8px;
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

.table-div {
	width: 400px;
	margin-left: calc(50% - 200px);
	color: white;
}

.nav-link {
	color: white;
}

.nav-tabs {
	width: 155px;
	margin-left: calc(50% - 77.5px);
	margin-bottom: 16px;
}
</style>
