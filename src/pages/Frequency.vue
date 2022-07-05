<script setup lang="ts">
import SoundGenerator from './subcomponents/SoundGenerator.vue'
import { closeSvg, addSvg } from '../assets/svgs'
import { onMounted, reactive, ref } from 'vue'
import { type GeneratorType, type Generator } from '../types/Typings'
import { ClickOutsideDialog, DynamicImportDialogPolyfill } from '../shared'

const generators = reactive<Generator[]>([
	{
		id: 0,
		generatorType: 'Frequency'
	},
	{
		id: 1,
		generatorType: 'Note'
	}
])

const generatorModal = ref<HTMLDialogElement>()

onMounted(async () => {
	if (!generatorModal.value) {
		console.error('Release Modal does not exist: ', generatorModal.value)
		return
	}
	await DynamicImportDialogPolyfill([generatorModal.value])
	ClickOutsideDialog(generatorModal.value)
})

function addGenerator(type: GeneratorType) {
	generators.push({
		id: generators.length > 0 ? generators[generators.length - 1].id + 1 : 0,
		generatorType: type
	})
	generatorModal.value?.close()
}
</script>

<template>
	<div class="tw-flex-col-center">
		<h1 class="m-4 mb-0 text-2xl font-semibold">Frequency Generator</h1>

		<SoundGenerator
			v-for="(generator, index) in generators"
			:key="generator.id"
			:index="index"
			:generator="generator"
			@delete-generator="generators.splice(index, 1)"
		/>

		<div class="flex justify-center">
			<svg
				class="w-[50px] cursor-pointer tw-button fill-white bg-neutral-500 mt-4 rounded-xl p-[2px]"
				viewBox="0 0 20 20"
				@click="generatorModal?.showModal()"
			>
				<path :d="addSvg"></path>
			</svg>
		</div>
	</div>

	<dialog ref="generatorModal" class="bg-transparent">
		<div id="generatorModal" class="text-neutral-300 bg-[#383838] w-72">
			<div
				class="flex justify-between p-4 border-b border-solid border-[#dee2e6]"
			>
				<h5>Add a new generator</h5>

				<svg
					class="h-6 cursor-pointer"
					viewBox="0 0 24 24"
					@click="generatorModal?.close()"
				>
					<path fill="currentColor" :d="closeSvg" />
				</svg>
			</div>

			<div class="p-4 flex gap-2 justify-center">
				<button class="tw-button" @click="addGenerator('Frequency')">
					Frequency
				</button>
				<button class="tw-button" @click="addGenerator('Note')">Note</button>
			</div>
		</div>
	</dialog>
</template>
