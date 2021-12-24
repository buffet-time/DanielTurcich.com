<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Collapse from 'bootstrap/js/dist/collapse'
import router, { resume } from '../router'
import { type RouteRecordNormalized } from 'vue-router'
import { onMounted } from 'vue'

// Images
import githubSrc from '../assets/github.png'
import linkedinSrc from '../assets/linkedin.png'
import resumeSrc from '../assets/resume.png'
import bandcampSrc from '../assets/bandcamp.png'
import soundcloudSrc from '../assets/soundcloud.png'

interface navLink {
	openLink: string
	src: string
	alt: string
	buttonText: string
}

// public
const links: navLink[] = [
	{
		openLink: 'github',
		buttonText: 'Github',
		alt: 'github logo',
		src: githubSrc
	},
	{
		openLink: 'linkedin',
		buttonText: 'LinkedIn',
		alt: 'linkedin logo',
		src: linkedinSrc
	},
	{
		openLink: 'resume',
		buttonText: 'Resume',
		alt: 'pdf logo',
		src: resumeSrc
	},
	{
		openLink: 'bandcamp',
		buttonText: 'Bandcamp',
		alt: 'bandcamp logo',
		src: bandcampSrc
	},
	{
		openLink: 'soundcloud',
		buttonText: 'Soundcloud',
		alt: 'soundcloud logo',
		src: soundcloudSrc
	}
]
const routes: RouteRecordNormalized[] = router
	.getRoutes()
	.filter((route) => route.meta['buttonName'] !== undefined)

function openLink(link: string) {
	switch (link) {
		case 'github':
			open('https://github.com/buffet-time')
			break

		case 'linkedin':
			open('https://www.linkedin.com/in/danielturcich/')
			break

		case 'resume':
			open(resume)
			break

		case 'bandcamp':
			open('https://buffet-time.bandcamp.com/')
			break

		case 'soundcloud':
			open('https://soundcloud.com/buffet_time')
			break
	}
}

onMounted(() => {
	const target1 = document.querySelector('#collapsible1')!
	const target2 = document.querySelector('#collapsible2')!

	const navbarCollapse1 = new Collapse(
		document.getElementById('navbarCollapse1')!,
		{
			toggle: false
		}
	)
	const navbarCollapse2 = new Collapse(
		document.getElementById('navbarCollapse2')!,
		{
			toggle: false
		}
	)

	document.addEventListener('click', (event) => {
		if (
			!(
				event.composedPath().includes(target1) ||
				event.composedPath().includes(target2)
			)
		) {
			navbarCollapse1.hide()
			navbarCollapse2.hide()
		}
	})
})

async function routeChange(route: string) {
	await router.push(route)
}

function open(link: string) {
	window.open(link, '_blank')
}
</script>

<template>
	<div class="bg-[#388e3c] h-16 sticky top-0 flex flex-col items-center">
		<div class="h-16 w-[100%] flex justify-center items-center gap-4">
			<!--  -->
			<div class="wrap-collabsible">
				<input id="website-navigation" class="toggle" type="checkbox" />

				<label for="website-navigation" class="toggle-label">
					Website Navigation
				</label>

				<div class="collapsible-content">
					<div class="tw-card p-4 mt-4">
						<button
							v-for="(route, index) in routes"
							:key="index"
							class="flex flex-col tw-nav-card"
							:disabled="$route.name === route.name"
							@click="routeChange(route.path)"
						>
							<div class="bg-[#616161] w-[230px] p-4">
								{{ route.meta.buttonName }}
							</div>
						</button>
					</div>
				</div>
			</div>
			<!--  -->
			<div class="wrap-collabsible">
				<input id="social-links" class="toggle" type="checkbox" />

				<label for="social-links" class="toggle-label">Social Links</label>

				<div class="collapsible-content">
					<div id="collapsible2" class="tw-card p-4 mt-4">
						<div
							v-for="(link, index) in links"
							:key="index"
							class="tw-nav-card"
							@click="openLink(link.openLink)"
						>
							<div class="bg-[#616161] w-[230px] p-4 select-none">
								<img
									class="ml-2 float-left h-8 w-8"
									:src="link.src"
									:alt="link.alt"
								/>
								<div class="text-lg">{{ link.buttonText }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--  -->
		</div>
	</div>
</template>

<style scoped>
/* prevents display of the checkbox to allow more pure CSS collapsible */
input[type='checkbox'] {
	display: none;
}

.toggle-label {
	cursor: pointer;
	user-select: none;
}

.collapsible-content {
	position: absolute;
	top: 4rem;
	max-height: 0px;
	margin-left: 0px;
	overflow: hidden;
	transition: max-height 0.25s ease-in-out;
}

.toggle:checked + .toggle-label + .collapsible-content {
	max-height: 100vh;
}
</style>
