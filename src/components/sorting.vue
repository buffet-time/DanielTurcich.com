<script lang="ts" src="./sorting.ts"></script>

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
			<br />

			<button
				class="sorting-button btn btn-secondary disable-select"
				:disabled="busy"
				@click="randomizeArray"
			>
				Randomize
			</button>
			<br />

			<label for="range-1">Extra delay: {{ sleepTime }}</label>
			<br />
			<input
				v-once
				id="range-1"
				v-model="sleepTime"
				class="password-length-range form-range disable-select"
				type="range"
				min="0"
				max="250"
				step="5"
			/>

			<label for="range-2">
				Number of Rectangles: {{ numberOfRectangles }}
			</label>
			<br />
			<input
				id="range-2"
				v-model="numberOfRectangles"
				class="password-length-range form-range disable-select"
				type="range"
				min="10"
				max="1000"
				step="5"
				:disabled="busy"
			/>

			<div>
				<button
					v-for="algorithm in sorts"
					:key="algorithm"
					class="sorting-button btn btn-secondary disable-select"
					:disabled="busy"
					@click="executeMethod(algorithm.method)"
				>
					{{ algorithm.buttonText }}
				</button>
				<br />
			</div>
		</div>
		<canvas v-once ref="pixi" class="pixi-canvas disable-select"></canvas>
	</div>
</template>

<style>
.sorting-wrapper {
	height: calc(100vh - 60px);
	display: flex;
	flex-flow: row;
}

.settings {
	flex: 0 0 300px;
	align-self: center;
}

.pixi-canvas {
	flex: 1 1 auto;
}

.sorting-button {
	margin-right: 5px;
	margin-bottom: 8px;
	height: 60px;
	width: 45%;
}

.password-length-range {
	width: 280px;
}
</style>
