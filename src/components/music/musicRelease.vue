<script setup lang="ts">
import 'bootstrap/js/dist/modal'
import { Release } from '../../enums'
import { closeSvg } from '../../svgs'

const props = defineProps<{
	index: number
	release: string[]
}>()

function copyReviews() {
	navigator.clipboard.writeText(
		` ${props.release[Release.artist]} - ${props.release[Release.name]}: ${
			props.release[Release.score]
		}`
	)
}
</script>

<template v-once>
	<div
		data-bs-toggle="modal"
		:data-bs-target="`#index` + index"
		class="tw-card bg-gray-500 text-center m-2 cursor-pointer w-80 h-24 rounded"
	>
		<div
			class="tw-card m-0 p-2 h-full bg-transparent flex flex-col items-center justify-center"
		>
			<h5 class="overflow-hidden text-ellipsis max-w-full whitespace-nowrap">
				{{ release[Release.artist] }}
			</h5>
			<!-- TODO: have score always visible and have just the releas name overflow -->
			<h6 class="overflow-hidden text-ellipsis max-w-full whitespace-nowrap">
				{{ release[Release.name] }} ({{ release[Release.score] }}/10)
			</h6>
		</div>
	</div>

	<div
		:id="'index' + index"
		class="modal fade"
		tabindex="-1"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<!-- comments -->
		<div class="modal-dialog flex items-center h-[93vh]">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">
						{{ release[Release.artist] }} - {{ release[Release.name] }}
						<span class="nowrap">( {{ release[Release.score] }}/10 )</span>
					</h5>
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
					<div class="genres-text">Genres: {{ release[Release.genre] }}</div>
					<br /><br />
					<div v-if="release.length === 7">
						{{ release[Release.comments] }}
					</div>
					<div v-else>No comments for this release.</div>
				</div>

				<div class="modal-footer">
					<div class="footer-text">
						({{ release[Release.year] }} {{ release[Release.type] }})
					</div>
					<span></span>
					<button class="tw-button" @click="copyReviews">Copy</button>
					<button type="button" class="tw-button" data-bs-dismiss="modal">
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal-dialog {
	padding: 4%;
	max-width: 600px;
}
.modal-content {
	background-color: #383838;
	color: lightgray;
}
.release-close-button {
	height: 24px;
	cursor: pointer;
	width: 8%;
	position: absolute;
	top: 8%;
	left: 90%;
}
.footer-text {
	float: left;
}
.modal-footer > span {
	flex-grow: 1;
}
.genres-text {
	font-weight: normal;
	float: left;
	font-size: large;
}
.modal-title {
	width: 92%;
}
.nowrap {
	white-space: nowrap;
}
</style>
