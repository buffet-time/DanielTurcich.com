<script lang="ts">
import { Options, Vue } from 'vue-class-component'

class Props {
	release!: string[]
}

@Options({
	props: {
		release: Array
	}
})
export default class MusicRelease extends Vue.with(Props) {}
</script>

<template>
	<div class="card list-group-item release-card">
		<div class="card-body release-body">
			<h5 class="card-title">
				{{ release[0] }}
			</h5>
			<h6 class="card-subtitle mb-2 text-muted">
				{{ release[1] }} {{ release[2] }}/10
			</h6>
		</div>
	</div>
</template>

<style>
.list-group-item {
	background-color: #616161;
	color: white;
	width: 20%;
	min-width: 180px;
	text-align: center;
}
.release-card {
	margin: 8px;
	width: 18rem;
}
.release-body {
	margin: 0px;
	padding: 8px;
}
</style>
