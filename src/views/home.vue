<script setup lang="ts">
import { ref } from 'vue'

const links = ref([
	{
		url: 'https://www.pcgamer.com/watch-a-man-run-jump-and-crawl-for-a-half-life-alyx-speedrun',
		text: 'PC Gamer'
	},
	{
		url: 'https://www.speedrun.com/news/653-2021-4-1-speedrunning-in-virtual-reality',
		text: 'Speedrun.com'
	},
	{
		url: 'https://kotaku.com/half-life-alyx-speedrunner-isnt-afraid-to-get-his-knee-1844825797',
		text: 'Kotaku'
	},
	{
		url: 'https://www.rockpapershotgun.com/2020/08/21/speedrunner-uses-vr-to-crawl-under-half-life-alyx-levels-in-real-life/',
		text: 'Rock Paper Shotgun'
	},
	{
		url: 'https://gamerant.com/half-life-alyx-speedrun-games-done-quick/',
		text: 'Gamerant'
	},
	{
		url: 'https://uploadvr.com/half-life-alyx-speedrun/',
		text: 'UploadVR'
	},
	{
		url: 'https://www.pcgamesn.com/half-life-alyx/speedrun-running',
		text: 'PCGamesN'
	},
	{
		url: 'https://www.1pvs2p.com/showblog/2020/8/21/half-life-alyx-speedrun-debuted-as-first-vr-game-ever-played-during-games-done-quick-stream',
		text: '1Pvs2P'
	},
	{
		url: 'https://www.usgamer.net/articles/the-half-life-alyx-speedrun-at-sgdq2020-got-real-weird',
		text: 'USGamer'
	},
	{
		url: 'https://www.gamefront.com/games/gamingtoday/article/this-half-life-alyx-speedrun-looks-exhausting',
		text: 'GameFront'
	},
	{
		url: 'https://vrscout.com/news/gdq-first-vr-speedrun-half-life-alyx/',
		text: 'VRScout'
	},
	{
		url: 'https://vrarnews.com/details/insane-40-minute-half-life-alyx-speedrun-is-games-done-quicks-first-ever-vr-title-5f3fb85b0d54446e23633cae',
		text: 'VRARNews'
	},
	{
		url: 'https://www.shacknews.com/article/119922/watch-the-full-half-life-alyx-run-from-summer-games-done-quick-2020',
		text: 'ShackNews'
	},
	{
		url: 'https://www.xrcentral.com/games-done-quick-hosts-first-vr-speedrun-featuring-half-life-alyx/',
		text: 'XRCentral'
	},
	{
		url: 'https://eloutput.com/noticias/videojuegos/half-life-alyx-speedrun-record/',
		text: 'Eloutput'
	},
	{
		url: 'https://dailygame.at/half-life-alyx-speedrun-valve-vr/',
		text: 'DailyGame'
	},
	{
		url: 'https://www.canalrcn.com/todogamers/esports/articulo-nota/este-speedrun-de-half-life-alyx-parece-una-sesion-de-ejercicios-3120',
		text: 'Canalrcn'
	},
	{
		url: 'https://distritoxr.com/half-life-alyx-se-convierte-en-el-primer-titulo-vr-en-games-done-quick/',
		text: 'Distritoxr'
	},
	{
		url: 'https://www.warlegend.net/sgdq-2020-half-life-alyx/',
		text: 'Warlegend'
	},
	{
		url: 'https://mixed.de/half-life-alyx-speedrun-konkurrenz-fuer-the-flash/',
		text: 'Mixed'
	}
])
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
					src="../assets/me.jpg"
					alt="Picture of myself"
				/>
			</div>
			<div class="col-md-8">
				<div class="card-body">
					<h5 class="card-title">Bio</h5>
					<p class="card-text">
						Hello, I'm Daniel Turcich (He/ They) and I'm a Software Engineer who
						currently works at Bank of America in Pennington, New Jersey. I
						mostly do Frontend development and really enjoy TypeScript, Vue, and
						Electron.
					</p>
					<p class="card-text">
						I'm 25, a Vegetarian, and listen to an insane amount of music (check
						the music page of this site).
					</p>
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
							Frontend ~ TypeScript/ JavaScript, Vue.js, React, Electron,
							Angular, HTML, CSS, <br />

							Middle/ Backend ~ Node & C# <br />

							Other ~ Git, Python, LUA, Android
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

	<div v-once class="card links-card">
		<h5 class="card-title">Articles I'm featured in</h5>
		<ul class="list-group list-group-horizontal">
			<a
				v-for="(link, index) in links"
				:key="index"
				class="list-group-item list-group-item-action"
				:href="link.url"
				target="_blank"
			>
				{{ link.text }}
			</a>
		</ul>
	</div>
</template>

<style scoped>
.list-group {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	border-top: transparent !important;
}
.list-group-item {
	height: 56px;
	background-color: #616161;
	color: white;
	width: 20%;
	min-width: 139px;
	text-align: center;
	align-items: center;
	justify-content: center;
}
.card-title {
	text-align: center;
}
.card {
	margin: 32px;
	margin-bottom: 0px;
}
.links-card {
	padding: 16px;
	margin-bottom: 16px;
}
.card-left {
	margin-right: 0px;
}
.card-right {
	margin-left: 0px;
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
	.card-title-1 {
		margin-left: -20px;
	}
}
</style>
