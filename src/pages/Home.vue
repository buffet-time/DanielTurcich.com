<script setup lang="ts">
import { ArticleLink } from '../types/Typings'
import { ref } from 'vue'

const birthdate = 820800000000
const myCurrentAge = ref(
	Math.abs(new Date(Date.now() - birthdate).getUTCFullYear() - 1970)
)

const soundcloudLink =
	'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/921189421&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'

const links = ref<ArticleLink[]>([
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
	<div class="tw-card">
		<div class="flex flex-col sm:flex-row gap-4">
			<img class="mh-[300px] h-full" src="/me.jpg" alt="Picture of myself" />
			<div class="gap-2 tw-flex-col-center">
				<h1 class="text-2xl font-semibold">Bio</h1>
				<p>
					Hello, I'm Daniel Turcich (He/ They) and I'm a Software Engineer who
					currently works at Squarespace. I mostly do Frontend development and
					really enjoy (Java/Type)Script, Vue, and Node.
				</p>
				<p>
					I'm {{ myCurrentAge }}, a Vegetarian, and listen to an insane amount
					of music (check the music page of this site).
				</p>
			</div>
		</div>
	</div>

	<div class="tw-card tw-flex-col-center sm:flex-row">
		<div
			class="gap-5 tw-flex-col-center p-4 w-full sm:w-[40%] sm:min-w-[380px]"
		>
			<h1 class="text-2xl font-semibold">Skills</h1>
			<div class="flex flex-col">
				<h5>Technical</h5>
				<div>
					<div>Frontend ~ Type/JavaScript, Vue, HTML, CSS, Electron, React</div>
					<div>Middle/ Backend ~ Node & C#</div>
					<div>Other ~ Git, LUA</div>
				</div>
			</div>
			<div>
				<h5>Creative</h5>
				Music Production, Basic Video Editing, Basic Photo Editing
			</div>
		</div>

		<div class="w-[100%] h-72">
			<iframe
				width="100%"
				height="100%"
				scrolling="no"
				frameborder="no"
				rel="noopener noreferrer"
				:src="soundcloudLink"
			></iframe>
		</div>
	</div>

	<div class="tw-card p-4 mb-4">
		<h1 class="text-2xl font-semibold mb-4">Articles I'm featured in</h1>
		<ul class="pl-0 mb-0 flex flex-wrap items-center justify-center">
			<a
				v-for="(link, index) in links"
				:key="index"
				class="flex items-center justify-center h-14 w-1/5 min-w-[139px] text-white bg-[#616161] no-underline border border-black border-opacity-10 hover:text-white"
				:href="link.url"
				target="_blank"
				rel="noopener noreferrer"
			>
				{{ link.text }}
			</a>
		</ul>
	</div>
</template>
