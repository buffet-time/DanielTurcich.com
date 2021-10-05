<script lang="ts" src="./sorting.ts"></script>

<template>
	<div class="sorting-wrapper">
		<div class="settings">
			<button
				class="sorting-button btn btn-secondary disable-select"
				:disabled="disableStopButton"
				@click="stop()"
			>
				Stop Execution
			</button>

			<button
				class="sorting-button btn btn-secondary disable-select"
				:disabled="disableRandomizeButton"
				@click="randomizeArray()"
			>
				Randomize
			</button>

			<label for="range-1"> Volume: {{ toPercent(volume) }}% </label>
			<input
				v-once
				id="range-1"
				v-model="volume"
				class="password-length-range form-range disable-select"
				type="range"
				min="0"
				max="0.2"
				step="0.0001"
			/>

			<label for="range-2">Add extra Delay of: {{ sleepTime }}ms</label>
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

			<label for="range-3"> {{ numberOfRectangles }} Rectangles </label>
			<input
				id="range-3"
				v-model="numberOfRectangles"
				class="password-length-range form-range disable-select"
				type="range"
				min="10"
				max="1000"
				step="5"
				:disabled="disableRectangleSlider"
			/>

			<button
				v-for="(algorithm, index) in sorts"
				:key="index"
				class="sorting-button btn btn-secondary disable-select"
				:disabled="disableSortButtons"
				@click="executeMethod(algorithm.method)"
			>
				{{ algorithm.buttonText }}
			</button>
		</div>
		<canvas v-once ref="pixi" class="pixi-canvas disable-select"></canvas>
	</div>
</template>

<style scoped>
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
