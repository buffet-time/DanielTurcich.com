<script lang="ts" src="./performance.ts"></script>

<template>
	<div class="perf-container">
		<div class="other-container">
			<button
				class="btn btn-secondary disable-select perf-button"
				:disabled="startButton"
				@click="getFuncs"
			>
				Start Comparison
			</button>
			<button
				class="btn btn-secondary disable-select perf-button"
				:disabled="stopButton"
				@click="getFuncs"
			>
				Stop Comparison
			</button>
		</div>
		<div class="functions-container">
			<div class="form-group">
				<label> First Function</label>
				<textarea v-model="functionOne" class="form-control"></textarea>
			</div>

			<div class="form-group">
				<label> Second Function</label>
				<textarea v-model="functionTwo" class="form-control"></textarea>
			</div>
		</div>
	</div>
</template>

<style>
.perf-container {
	height: calc(100vh - 60px);
	display: flex;
}

.form-group {
	width: 98%;
	margin-left: 1%;
	margin-top: 1%;
}

.form-control {
	height: 41vh;
}

.functions-container {
	flex: 1 1 auto;
}

.other-container {
	flex: 0 0 200px;
	align-self: center;
}

.perf-button {
	margin-bottom: 16px;
	height: 50px;
	width: 155px;
	line-height: normal;
}
</style>
