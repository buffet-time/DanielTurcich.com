<script lang="ts" src="./frequency.ts"></script>

<template>
	<h1 v-once class="app-title disable-select">Frequency Generator (wip)</h1>
	<div class="generators-container">
		<d-sound-gen generator-type="Frequency" />
		<d-sound-gen generator-type="Note" />
	</div>
</template>

<style>
.card {
	margin: 32px;
	margin-bottom: 0px;
}

.frequency-ranges {
	width: 80%;
	margin: 0 auto;
}

.form-select {
	margin: 0 auto;
	width: 125px;
	margin-bottom: 8px;
}

.button-container {
	display: flex;
	justify-content: center;
}
</style>
