<script setup lang="ts">
import 'bootstrap/js/dist/modal'
import { Release } from '../../typings'
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
		class="card list-group-item release-card"
	>
		<div class="card-body release-body">
			<h5 class="card-title">
				{{ release[0] }}
			</h5>
			<h6 class="card-subtitle mb-2 text-muted">
				{{ release[1] }} ({{ release[2] }}/10)
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
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">
						{{ release[0] }} - {{ release[1] }} ( {{ release[2] }}/10 )
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
					<div class="genres-text">Genres: {{ release[5] }}</div>
					<br />
					<div v-if="release.length === 7">
						{{ release[6] }}
					</div>
					<div v-else>No comments for this release.</div>
				</div>
				<div class="modal-footer">
					<div class="footer-text">({{ release[4] }} {{ release[3] }})</div>
					<span></span>
					<button class="btn btn-secondary" @click="copyReviews">Copy</button>
					<button type="button" class="btn btn-primary" data-bs-dismiss="modal">
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal-content {
	background-color: #383838;
	color: lightgray;
}

.list-group-item {
	background-color: #616161;
	color: lightgray;
	width: 20%;
	text-align: center;
}
.release-card {
	margin: 8px;
	width: 18rem;
	cursor: pointer;
}
.release-body {
	margin: 0px;
	padding: 8px;
}

.release-close-button {
	height: 24px;
	cursor: pointer;
}

.footer-text {
	float: left;
}

.modal-footer > span {
	flex-grow: 1;
}

.genres-text {
	font-weight: bold;
	float: left;
}
</style>
