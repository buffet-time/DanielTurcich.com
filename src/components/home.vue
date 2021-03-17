<script lang="ts">
import { Vue } from 'vue-class-component'

export default class Home extends Vue {}
</script>

<template>
	<div v-once bg-variant="secondary" class="card">
		<div class="row g-0">
			<div class="col-md-4">
				<img
					v-once
					height="300"
					width="300"
					class="picture"
					src="../assets/me.png"
					alt="Picture of myself"
				/>
			</div>
			<div class="col-md-8">
				<div class="card-body">
					<h5 class="card-title">Bio</h5>
					<p class="card-text">
						Hello, I'm Daniel Turcich and I'm a Software Engineer who currently
						works at Bank of America in Pennington, New Jersey.

						<!-- I'm Daniel James Turcich I currently work as a Software Engineer at
						Bank of America. I graduated with a Bachelors of Science in Computer
						Science from Montclair State University in May 2018. -->
					</p>
					<p class="card-text">blah</p>
				</div>
			</div>
		</div>
	</div>

	<div v-once class="row bottom-card">
		<div class="col-sm-6 col-left">
			<div class="card card-left">
				<div class="card-body">
					<h5 class="card-title">Skills</h5>
					<div class="card-text">
						<div class="card-body card-left">
							<h5 class="card-title-1">Technical</h5>
							<b>Frontend - </b> TypeScript/ JavaScript, Vue.js, Electron,
							Angular, HTML, CSS <br />

							<b>Middle/ Backend - </b> C#, SQL Server, MySQL<br />

							<b>Other - </b> Git, Python, Java, LUA, Android, XML
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

		<div class="col-sm-6 col-right">
			<div class="card card-right">
				<iframe
					width="100%"
					height="100%"
					scrolling="no"
					frameborder="no"
					allow="autoplay"
					src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/921189421&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
				></iframe>
			</div>
		</div>
	</div>
</template>

<style>
.card {
	margin: 32px;
	margin-bottom: 0px;
}
.card-left {
	margin-top: 32px;
	margin-right: 0px;
	padding-right: 0px;
}
.card-right {
	margin-top: 32px;
	margin-left: 0px;
	padding-left: 0px;
	height: calc(100% - 32px);
}
.col-sm-6 {
	padding-right: 0px;
}
.col-right {
	padding-left: 0px;
}
.col-left {
	padding-right: 0px;
}
.row {
	margin-right: 0px;
}
.col-md-4 {
	width: 300px;
	margin-right: 16px;
}
.bottom-card {
	margin-bottom: 16px;
}

@media screen and (max-width: 1000px) {
	.card {
		margin: 16px;
	}
	.card-left {
		margin-right: 0px;
	}
	.card-right {
		margin-left: 0px;
	}
	.col-md-4 {
		margin-left: calc(100% / 2 - 150px);
	}
	.col-md-8 {
		width: 100%;
	}
}
@media screen and (max-width: 576px) {
	.card {
		margin: 8px;
	}
	.row {
		margin: 0px;
	}
	.col-left {
		padding: 0px;
	}
	.card-right {
		margin-top: 0px;
		height: 300px;
	}
	.card-left {
		margin-bottom: 0px;
	}
}
</style>
