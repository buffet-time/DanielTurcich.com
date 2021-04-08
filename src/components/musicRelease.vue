<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import 'bootstrap/js/dist/modal'

class Props {
	release!: string[]
	index!: number
}

@Options({
	props: {
		release: Array,
		index: Number
	}
})
export default class MusicRelease extends Vue.with(Props) {}
</script>

<template>
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
						<path
							fill="currentColor"
							d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
						/>
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
					<button type="button" class="btn btn-primary" data-bs-dismiss="modal">
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.modal {
	color: black;
}

.list-group-item {
	background-color: #616161;
	color: white;
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
