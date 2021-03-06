<template>
	<div v-once>
		<div bg-variant="secondary" class="card">
			<div class="card-body">
				<h5 class="card-title">Bio</h5>
				<p class="card-text">
					I'm Daniel James Turcich I currently work as a Software Engineer at
					Bank of America. I graduated with a Bachelors of Science in Computer
					Science from Montclair State University in May 2018.
				</p>
			</div>
		</div>

		<div class="card">
			<div class="card-body">
				<h5 class="card-title">Skills</h5>
				<div class="card-text">
					<div class="card-body">
						<h5 class="card-title-1">Technical</h5>
						<b>Advanced - </b> TypeScript, Vue.js, Electron, C#, HTML, Git,
						JavaScript <br />

						<b>Medium - </b> Angular, Java, CSS, Bootstrap, Angular Material,
						Python, Android, SQL Server<br />

						<b>Beginner - </b> XML, LUA, MySQL, Database Design
					</div>
					<div class="card-body">
						<h5 class="card-title-1">Creative</h5>
						Music Production, Song Writing, Basic Video Editing, Basic Photo
						Editing
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class Home extends Vue {}
</script>
