<script lang="ts" src="./life.ts"></script>

<template>
	<div class="sorting-wrapper">
		<div class="settings">
			<button
				class="sorting-button btn btn-secondary disable-select"
				:disabled="disableStopButton"
				@click="stop"
			>
				Stop Execution
			</button>

			<button
				class="sorting-button btn btn-secondary disable-select"
				:disabled="disableRandomizeButton"
				@click="randomizeArray"
			>
				Randomize
			</button>

			<label for="range-2">Delay: {{ sleepTime }}ms</label>
			<input
				v-once
				id="range-2"
				v-model="sleepTime"
				class="password-length-range form-range disable-select"
				type="range"
				min="0"
				max="250"
				step="5"
			/>
		</div>
		<canvas v-once ref="pixi" class="pixi-canvas disable-select"></canvas>
	</div>
</template>

<style>
.sorting-wrapper {
	height: calc(100vh - 60px);
	display: flex;
}

.settings {
	flex: 0 0 300px;
	align-self: center;
}

.pixi-canvas {
	flex: 1 1 auto;
}

.sorting-button {
	margin-right: 8px;
	margin-bottom: 8px;
	height: 50px;
	width: 43%;
	line-height: normal;
}

.password-length-range {
	width: 280px;
}
</style>
