<script lang="ts" src="./frequency.ts"></script>

<template>
	<h1 v-once class="app-title disable-select">Frequency Generator (wip)</h1>

	<d-sound-gen
		v-for="(generator, index) in generators"
		:key="generator.id"
		:generator-settings="generator.settings"
		@deleteGenerator="generators.splice(index, 1)"
	/>

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

<style>
.card {
	margin: 32px;
	margin-bottom: 0px;
}

.frequency-ranges {
	width: 90%;
	margin: 0 auto;
}

.form-select {
	margin: 0 auto;
	width: 125px;
	margin-bottom: 8px;
}

.button-container {
	display: flex;
	justify-content: center;
}

.add-generator {
	width: 50px;
	cursor: pointer;
	fill: white;
	background-color: #424242 !important;
	margin-top: 16px;
	border-radius: 10px;
	padding: 3px;
}

.modal-footer > span {
	flex-grow: 1;
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
