<script lang="ts" src="./sorting.ts"></script>

<template>
	<div class="sorting-wrapper">
		<div class="settings">
			<button
				class="randomize-button btn btn-secondary"
				@click="stop"
				:disabled="disableStopButton"
			>
				Stop Execution
			</button>
			<br />

			<label for="range-1">Extra delay: {{ sleepTime }}</label>
			<br />
			<input
				class="password-length-range form-range"
				id="range-1"
				v-model="sleepTime"
				type="range"
				min="0"
				max="250"
				step="5"
				v-once
			/>

			<label for="range-2">Password Length: {{ numberOfRectangles }}</label>
			<br />
			<input
				class="password-length-range form-range"
				id="range-2"
				v-model="numberOfRectangles"
				type="range"
				min="10"
				max="1000"
				step="5"
				:disabled="busy"
			/>

			<button
				class="randomize-button btn btn-secondary"
				@click="randomizeArray"
				:disabled="busy"
			>
				Randomize
			</button>
			<br />

			<button
				class="randomize-button btn btn-secondary"
				@click="bubbleSort"
				:disabled="busy"
			>
				Bubble Sort
			</button>
			<br />

			<button
				class="randomize-button btn btn-secondary"
				@click="insertionSort"
				:disabled="busy"
			>
				Insertion Sort
			</button>
			<br />

			<button
				class="randomize-button btn btn-secondary"
				@click="selectionSort"
				:disabled="busy"
			>
				Selection Sort
			</button>
		</div>
		<div ref="twojs" class="twojs" v-once></div>
	</div>
</template>

<style>
.sorting-wrapper {
	height: 100vh;
	display: flex;
	flex-flow: row;
}

.settings {
	flex: 0 0 300px;
	align-self: center;
	/* align-items to center multiple */
}

.twojs {
	flex: 1 1 auto;
}

.randomize-button {
	position: relative;
	display: inline-block;
	margin-left: 20px;
	margin-bottom: 8px;
}

.password-length-range {
	width: 280px;
}
</style>
