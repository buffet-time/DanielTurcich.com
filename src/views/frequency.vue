<script lang="ts" src="./frequency.ts"></script>

<template>
	<h1 v-once class="app-title disable-select">Frequency Generator (wip)</h1>

	<!-- <template v-if="showGenerators"> -->
	<d-sound-gen
		v-for="(generator, index) in generators"
		:key="index"
		:ref="setChildRef"
		:generator-settings="generator"
		:blah="index"
		@deleteGenerator="onDeleteGenerator(index)"
	/>
	<!-- </template> -->
</template>

<style>
.card {
	margin: 32px;
	margin-bottom: 0px;
}

.frequency-ranges {
	width: 90%;
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
