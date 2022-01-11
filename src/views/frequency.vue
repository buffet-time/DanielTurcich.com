<script setup lang="ts">
import noteGenerator from '../components/soundGenerator.vue'
import { closeSvg, addSvg } from '../assets/svgs'
import { onMounted, reactive, ref } from 'vue'
import dialogPolyfill from 'dialog-polyfill'

type GeneratorType = 'Frequency' | 'Note'

export interface Generator {
	id: number
	generatorType: GeneratorType
}

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

let target1: Element
const generatorModal = ref()

onMounted(() => {
	// Because Firefox still doesn't have HTMLDialogElement support...
	dialogPolyfill.registerDialog(generatorModal.value)

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	target1 = document.querySelector('#generatorModal')!
})

function openModal() {
	generatorModal.value.showModal()
	setTimeout(() => {
		document.addEventListener('click', clickHandler)
	}, 0)
}

function closeModal() {
	document.removeEventListener('click', clickHandler)
	generatorModal.value.close()
}

function clickHandler(event: any) {
	if (!event.composedPath().includes(target1)) {
		closeModal()
	}
}

function addGenerator(type: GeneratorType) {
	generators.push({
		id: generators.length > 0 ? generators[generators.length - 1].id + 1 : 0,
		generatorType: type
	})
	closeModal()
}
</script>

<template>
	<div class="flex flex-col justify-center items-center">
		<h1 class="m-4 mb-0 text-2xl font-semibold">Frequency Generator</h1>

		<noteGenerator
			v-for="(generator, index) in generators"
			:key="generator.id"
			:index="index"
			:generator="generator"
			@delete-generator="generators.splice(index, 1)"
		/>

		<div class="flex justify-center">
			<svg
				class="w-[50px] cursor-pointer tw-button fill-white bg-zinc-500 mt-4 rounded-xl p-[2px]"
				viewBox="0 0 20 20"
				@click="openModal"
			>
				<path :d="addSvg"></path>
			</svg>
		</div>
	</div>

	<dialog ref="generatorModal" class="bg-transparent">
		<div id="generatorModal" class="text-gray-300 bg-[#383838] w-72">
			<div
				class="flex justify-between p-4 border-b border-solid border-[#dee2e6]"
			>
				<h5>Add a new generator</h5>

				<svg class="h-6 cursor-pointer" viewBox="0 0 24 24" @click="closeModal">
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
