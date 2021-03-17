<script lang="ts" src="./music.ts"></script>

<template>
	<h1 v-once class="music-title disable-select">Music Page (WiP)</h1>
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
			@keyup.enter="getReviewsButtonPressed"
		/>
		<button
			:disabled="searchInput.length < 1"
			class="music-button btn btn-secondary"
			@click="getReviewsButtonPressed"
		>
			Search
		</button>
	</div>

	<div class="music-text-div">{{ reviewsText }}</div>
	<button
		v-show="reviewsText.length > 0"
		class="btn btn-secondary"
		@click="copyReviews"
	>
		Copy
	</button>
</template>

<style>
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
	margin: 24px;
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
</style>
