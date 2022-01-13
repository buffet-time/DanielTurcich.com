<script setup lang="ts">
import { Release } from '../../types/enums'
import { closeSvg } from '../../assets/svgs'
import { onMounted, ref } from 'vue'
import dialogPolyfill from 'dialog-polyfill'

const props = defineProps<{
	index: number
	release: string[]
}>()

let target1: Element
const releaseModal = ref()

onMounted(() => {
	// Because Firefox still doesn't have HTMLDialogElement support...
	dialogPolyfill.registerDialog(releaseModal.value)
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	target1 = document.querySelector('#releaseModal')!
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
	setTimeout(() => {
		document.addEventListener('click', clickHandler)
	}, 0)
}

function closeModal() {
	document.removeEventListener('click', clickHandler)
	releaseModal.value.close()
}

function clickHandler(event: any) {
	if (!event.composedPath().includes(target1)) {
		closeModal()
	}
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
			<h5 class="overflow-hidden text-ellipsis max-w-full whitespace-nowrap">
				{{ release[Release.artist] }}
			</h5>
			<h6 class="overflow-hidden text-ellipsis max-w-full whitespace-nowrap">
				{{ release[Release.name] }} ({{ release[Release.score] }}/10)
			</h6>
		</div>
	</div>

	<!-- TODO: pull out Modal here and everywhere into a generic component -->
	<dialog ref="releaseModal" class="bg-transparent">
		<div id="releaseModal" class="text-neutral-300 bg-[#383838] w-96">
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
