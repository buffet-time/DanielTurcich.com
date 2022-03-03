<script setup lang="ts">
import { Release } from '../../types/Typings'
import { closeSvg } from '../../assets/svgs'
import { onMounted, ref } from 'vue'
import dialogPolyfill from 'dialog-polyfill'

const props = defineProps<{
	index: number
	release: string[]
}>()

const releaseModal = ref()

onMounted(() => {
	// Because Firefox still doesn't have HTMLDialogElement support...
	// TODO: only do this when in a browser that doesnt support Dialog Element
	dialogPolyfill.registerDialog(releaseModal.value)
})

function copyReviews() {
	navigator.clipboard.writeText(
		` ${props.release[Release.artist]} - ${props.release[Release.name]}: ${
			props.release[Release.score]
		}`
	)
}

function openModal() {
	releaseModal.value.showModal()
}

function closeModal() {
	releaseModal.value.close()
}
</script>

<template>
	<div
		class="tw-card bg-neutral-500 text-center m-2 cursor-pointer w-80 h-24 rounded"
		@click="openModal"
	>
		<div
			class="tw-card m-0 p-2 h-full bg-transparent flex flex-col items-center justify-center"
		>
			<div class="overflow-hidden text-ellipsis max-w-full whitespace-nowrap">
				{{ release[Release.artist] }}
			</div>
			<div class="flex max-w-full gap-1">
				<div class="flex-auto overflow-hidden whitespace-nowrap text-ellipsis">
					{{ release[Release.name] }}
				</div>
				<div class="flex-none">({{ release[Release.score] }}/10)</div>
			</div>
		</div>
	</div>

	<!-- TODO: pull out Modal here and everywhere into a generic component -->
	<dialog ref="releaseModal" class="bg-transparent p-0 w-[88vw]">
		<div id="releaseModal" class="text-neutral-300 bg-[#383838]">
			<div
				class="flex items-center justify-between p-4 border-b border-solid border-[#dee2e6]"
			>
				<h5>
					{{ release[Release.artist] }} - {{ release[Release.name] }}
					<span class="whitespace-nowrap">
						( {{ release[Release.score] }}/10 )
					</span>
				</h5>
				<svg
					class="w-6 min-w-[24px] cursor-pointer"
					viewBox="0 0 24 24"
					@click="closeModal"
				>
					<path fill="currentColor" :d="closeSvg" />
				</svg>
			</div>

			<div
				class="flex flex-col items-center justify-center p-4 border-b border-solid border-[#dee2e6]"
			>
				<div class="mb-4">Genres: {{ release[Release.genre] }}</div>

				<template v-if="release.length === 7">
					{{ release[Release.comments] }}
				</template>
				<template v-else>No comments for this release.</template>
			</div>

			<div class="flex justify-between p-4 items-center">
				({{ release[Release.year] }} {{ release[Release.type] }})

				<div>
					<button class="tw-button mr-2" @click="copyReviews">Copy</button>
					<button type="button" class="tw-button" @click="closeModal">
						Close
					</button>
				</div>
			</div>
		</div>
	</dialog>
</template>
