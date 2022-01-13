<script setup lang="ts">
import { ref } from 'vue'

// TODO: actually do this at some point?

const functionOne = ref(
	`const array = [];
const array2 = [];
for(let x=0; x < 1000001; x++) {
    array.push(x);
}

for(let x=0; x < array.length; x++) {
    array2.push(x * 2)
}`
)
const functionTwo = ref(
	`const array = [];
const array2 = [];
for(let x=0; x < 1000001; x++) {
    array.push(x);
}

array.forEach((element) => {
    array2.push(element * 2)
});`
)

const startButton = ref(false)
const stopButton = ref(true)

function getFuncs() {
	console.log(functionOne, functionTwo)
}
</script>

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

<style scoped>
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
