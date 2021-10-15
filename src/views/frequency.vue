<script setup lang="ts">
import { Generator, GeneratorType } from '../typings'
import noteGenerator from '../components/soundGenerator.vue'
import 'bootstrap/js/dist/modal'
import { closeSvg, addSvg } from '../svgs'
import { reactive } from 'vue'

const generators: Generator[] = reactive([
	{
		id: 0,
		generatorType: 'Frequency'
	},
	{
		id: 1,
		generatorType: 'Note'
	}
])

function addGenerator(type: GeneratorType) {
	let availableId = 0
	while (isIdInUse(availableId)) {
		availableId++
	}

	generators.push({
		id: availableId,
		generatorType: type
	})
}

function isIdInUse(id: number) {
	if (
		generators.some((generator) => {
			return generator.id === id
		})
	) {
		return true
	}

	return false
}
</script>

<template>
	<h1 v-once class="app-title disable-select">Frequency Generator</h1>

	<!-- v-model:generator-settings="generator.settings" -->
	<noteGenerator
		v-for="(generator, index) in generators"
		:key="generator.id"
		:index="index"
		:generator="generator"
		@deleteGenerator="generators.splice(index, 1)"
	/>

	<!-- @updateSettings="updateSettings(type, value, index)" -->

	<svg
		class="add-generator btn-secondary"
		viewBox="0 0 20 20"
		data-bs-toggle="modal"
		:data-bs-target="`#index`"
	>
		<path :d="addSvg"></path>
	</svg>

	<div
		:id="'index'"
		class="modal fade"
		tabindex="-1"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<!-- comments -->
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Add a new generator</h5>

					<svg
						class="release-close-button"
						viewBox="0 0 24 24"
						data-bs-dismiss="modal"
						aria-label="Close"
					>
						<path fill="currentColor" :d="closeSvg" />
					</svg>
				</div>
				<div class="modal-body">
					<div>
						<button
							class="btn btn-secondary"
							data-bs-dismiss="modal"
							@click="addGenerator('Frequency')"
						>
							Frequency
						</button>
						<button
							class="btn btn-secondary note-modal-button"
							data-bs-dismiss="modal"
							@click="addGenerator('Note')"
						>
							Note
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.add-generator {
	width: 50px;
	cursor: pointer;
	fill: white;
	background-color: #424242 !important;
	margin-top: 16px;
	border-radius: 10px;
	padding: 3px;
}

.release-close-button {
	height: 24px;
	cursor: pointer;
}

.modal-content {
	background-color: #383838;
	color: lightgray;
}

.note-modal-button {
	margin-left: 8px;
}

.modal-dialog {
	width: 300px;
}
</style>
