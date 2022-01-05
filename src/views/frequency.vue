<script setup lang="ts">
import noteGenerator from '../components/soundGenerator.vue'
import 'bootstrap/js/dist/modal'
import { closeSvg, addSvg } from '../assets/svgs'
import { reactive } from 'vue'

export interface Generator {
	id: number
	generatorType: GeneratorType
}

type GeneratorType = 'Frequency' | 'Note'

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
	generators.push({
		id: generators.length > 0 ? generators[generators.length - 1].id + 1 : 0,
		generatorType: type
	})
}
</script>

<template>
	<div class="flex flex-col">
		<h1 v-once class="m-4 mb-0 text-2xl font-semibold">Frequency Generator</h1>

		<div>
			<noteGenerator
				v-for="(generator, index) in generators"
				:key="generator.id"
				:index="index"
				:generator="generator"
				@delete-generator="generators.splice(index, 1)"
			/>
		</div>

		<div class="flex justify-center">
			<svg
				class="w-[50px] cursor-pointer tw-button fill-white bg-zinc-500 mt-4 rounded-xl p-[2px]"
				viewBox="0 0 20 20"
				data-bs-toggle="modal"
				:data-bs-target="`#index`"
			>
				<path :d="addSvg"></path>
			</svg>
		</div>
	</div>

	<div
		:id="'index'"
		class="modal fade"
		tabindex="-1"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<!-- comments -->
		<div class="modal-dialog modal-dialog-centered">
			<div class="text-gray-300 bg-[#383838] w-72">
				<div
					class="flex justify-between p-4 border-b border-solid border-[#dee2e6]"
				>
					<h5>Add a new generator</h5>

					<svg
						class="h-6 cursor-pointer"
						viewBox="0 0 24 24"
						data-bs-dismiss="modal"
						aria-label="Close"
					>
						<path fill="currentColor" :d="closeSvg" />
					</svg>
				</div>

				<div class="p-4 flex gap-2 justify-center">
					<button
						class="tw-button"
						data-bs-dismiss="modal"
						@click="addGenerator('Frequency')"
					>
						Frequency
					</button>
					<button
						class="tw-button"
						data-bs-dismiss="modal"
						@click="addGenerator('Note')"
					>
						Note
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal-dialog {
	width: 300px;
	margin: 1.75rem auto;
}
</style>
