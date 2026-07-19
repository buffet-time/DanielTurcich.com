<script setup lang="ts">
import { ref } from 'vue'

interface ArticleLink {
	url?: string
	text: string
}

const birthdate = 820800000000
const myCurrentAge = ref(Math.abs(new Date(Date.now() - birthdate).getUTCFullYear() - 1970))

const soundcloudLink =
	'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1359507268&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'

const articlesIveWritten = ref<ArticleLink[]>([
	{
		url: 'https://medium.com/@buffet_time/why-you-should-move-to-pnpm-82962f332418',
		text: 'Why you should move to PNPM',
	},
	{
		text: 'Another one coming soon!',
	},
])

const articlesAboutMeLinks = ref<ArticleLink[]>([
	{
		url: 'https://www.pcgamer.com/watch-a-man-run-jump-and-crawl-for-a-half-life-alyx-speedrun',
		text: 'PC Gamer',
	},
	{
		url: 'https://www.speedrun.com/news/gq80q507-speedrunning-in-virtual-reality',
		text: 'Speedrun.com',
	},
	{
		url: 'https://kotaku.com/half-life-alyx-speedrunner-isnt-afraid-to-get-his-knee-1844825797',
		text: 'Kotaku',
	},
	{
		url: 'https://www.rockpapershotgun.com/2020/08/21/speedrunner-uses-vr-to-crawl-under-half-life-alyx-levels-in-real-life/',
		text: 'Rock Paper Shotgun',
	},
	{
		url: 'https://gamerant.com/half-life-alyx-speedrun-games-done-quick/',
		text: 'Gamerant',
	},
	{
		url: 'https://uploadvr.com/half-life-alyx-speedrun/',
		text: 'UploadVR',
	},
	{
		url: 'https://www.pcgamesn.com/half-life-alyx/speedrun-running',
		text: 'PCGamesN',
	},
])
</script>

<template>
	<div class="flex tw-flex-col-center">
		<div class="tw-card tw-home-card">
			<div class="flex flex-col sm:flex-row gap-4 justify-center items-center p-2">
				<img
					class="max-h-[300px] max-w-[300px]"
					src="https://avatars.githubusercontent.com/u/11199709?v=4g"
					alt="Picture of myself"
					loading="lazy"
				/>
				<div class="gap-2 tw-flex-col-center min-w-64 max-w-[700px]">
					<h1 class="text-4xl font-semibold">Bio</h1>
					<p>
						Hello, I'm Daniel Turčić (He/ They) and I'm a Software Engineer who currently works at
						Squarespace. I mostly do Frontend development and really enjoy (Java/Type)Script.
					</p>
					<p>
						I'm {{ myCurrentAge }}, a Vegetarian, and listen to an insane amount of music (check the
						music page of this site).
					</p>
					<p>
						I hate Generative AI, not a single thing on this website has ever been written w/ any
						AI. LLMs do not exist in any form without theft of all media ever produced without
						consent.
					</p>
				</div>
			</div>
		</div>

		<div class="tw-card tw-home-card tw-flex-col-center sm:flex-row">
			<div class="gap-5 tw-flex-col-center p-4 w-full sm:w-[40%] sm:min-w-[512px]">
				<h1 class="text-4xl font-semibold">Skills</h1>
				<div class="flex flex-col">
					<label class="mb-4">
						Sorta like a Junior engineers list, but where I actually am good enough at the things
						listed to consider myself, quite good at them :)
					</label>

					<div class="mt-2">
						<h1 class="text-3xl mb-4 text-[#68b05c]">Technical (Job)</h1>

						<ul>
							<div class="mb-4">
								<h2 class="text-2xl mb-2 text-[#af71ba]">Expert level expterise</h2>
								<ul>
									<li>Languages: TypeScript, JavaScript, HTML, CSS, Jsonnet</li>
									<li>Frameworks: React, Vue</li>
									<li>Build tools: Webpack, Vite</li>
									<li>Toolings: PNPM, ESLint</li>
									<li>Testing Tools: Jest, Vitest, Cypress, Testing Library</li>
								</ul>
							</div>
						</ul>
					</div>
				</div>

				<div>
					<h2 class="text-2xl text-[#68b05c] mb-4 mt-2">Creative (Life)</h2>
					Music Production, Percussion, Photography
				</div>
			</div>
		</div>

		<div class="tw-card tw-home-card p-4 mb-4">
			<h1 class="pb-4 text-4xl text-[#FFF]">A song I made</h1>

			<iframe
				width="100%"
				height="800px"
				scrolling="no"
				frameborder="no"
				rel="noopener noreferrer"
				:src="soundcloudLink"
			/>
		</div>

		<div class="tw-card tw-home-card p-4 mb-4">
			<h1 class="text-2xl font-semibold mb-4">Some articles I've written</h1>
			<ul class="pl-0 mb-0 flex flex-wrap items-center justify-center">
				<template v-for="(link, index) in articlesIveWritten">
					<a
						v-if="link.url"
						:key="index"
						class="flex items-center m-[2px] justify-center h-14 w-1/4 min-w-[139px] text-white bg-[#616161] no-underline border border-black border-opacity-10 hover:text-white"
						:href="link.url"
						target="_blank"
						rel="noopener noreferrer"
					>
						{{ link.text }}
					</a>
					<p
						v-else
						:key="`${index}-2`"
						class="flex items-center m-[2px] justify-center h-14 w-1/4 min-w-[139px] text-white bg-[#616161] no-underline border border-black border-opacity-10 hover:text-white"
						:href="link.url"
						target="_blank"
						rel="noopener noreferrer"
					>
						{{ link.text }}
					</p>
				</template>
			</ul>
		</div>

		<div class="tw-card tw-home-card p-4 mb-4">
			<h1 class="text-2xl font-semibold mb-4">Some articles I'm featured in</h1>
			<ul class="pl-0 mb-0 flex flex-wrap items-center justify-center">
				<a
					v-for="(link, index) in articlesAboutMeLinks"
					:key="index"
					class="flex items-center m-[2px] justify-center h-14 w-1/4 min-w-[139px] text-white bg-[#616161] no-underline border border-black border-opacity-10 hover:text-white"
					:href="link.url"
					target="_blank"
					rel="noopener noreferrer"
				>
					{{ link.text }}
				</a>
			</ul>
		</div>
	</div>
</template>
