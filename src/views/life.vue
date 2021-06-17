<script lang="ts" src="./life.ts"></script>

<template>
	<div class="sorting-wrapper">
		<canvas v-once ref="pixi" class="pixi-canvas disable-select"></canvas>
	</div>
</template>

<style>
.sorting-wrapper {
	/* height: calc(100vh - 60px); */
	display: flex;
}

.pixi-canvas {
	flex: 1 1 auto;
}
</style>
