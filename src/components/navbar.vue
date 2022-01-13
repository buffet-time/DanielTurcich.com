<script setup lang="ts">
import router, { resume } from '../router'
import { type RouteRecordNormalized } from 'vue-router'
import { onMounted, ref } from 'vue'

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

const websiteNavigationInput = ref(false)
const socialLinksInput = ref(false)

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

onMounted(() => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const target1 = document.querySelector('#webNavModal')!
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const target2 = document.querySelector('#socialModal')!

	document.addEventListener('click', (event) => {
		if (
			!(
				event.composedPath().includes(target1) ||
				event.composedPath().includes(target2)
			)
		) {
			socialLinksInput.value = false
			websiteNavigationInput.value = false
		}
	})
})

function openLink(link: string) {
	switch (link) {
		case 'github':
			window.open('https://github.com/buffet-time', '_blank')
			break

		case 'linkedin':
			window.open('https://www.linkedin.com/in/danielturcich/', '_blank')
			break

		case 'resume':
			window.open(resume, '_blank')
			break

		case 'bandcamp':
			window.open('https://buffet-time.bandcamp.com/', '_blank')
			break

		case 'soundcloud':
			window.open('https://soundcloud.com/buffet_time', '_blank')
			break
	}
}

async function routeChange(route: string) {
	await router.push(route)
}
</script>

<template>
	<div class="bg-[#388e3c] h-16 sticky top-0 flex flex-col items-center">
		<div class="h-16 w-[100%] flex justify-center items-center gap-4">
			<div class="wrap-collabsible">
				<input
					id="website-navigation"
					v-model="websiteNavigationInput"
					class="toggle"
					type="checkbox"
				/>

				<label for="website-navigation" class="toggle-label">
					Website Navigation
				</label>

				<div class="collapsible-content ml-[-42px]">
					<div ref="webNavModal" class="tw-card p-4 mt-4">
						<button
							v-for="(route, index) in routes"
							:key="index"
							class="flex flex-col tw-nav-card"
							:disabled="router.currentRoute.value.name === route.name"
							@click="routeChange(route.path)"
						>
							<div class="w-[230px] p-4">
								{{ route.meta.buttonName }}
							</div>
						</button>
					</div>
				</div>
			</div>

			<div class="wrap-collabsible text-center">
				<input
					id="social-links"
					v-model="socialLinksInput"
					class="toggle"
					type="checkbox"
				/>

				<label for="social-links" class="toggle-label">Social Links</label>

				<div class="collapsible-content ml-[-194px]">
					<div id="collapsible2" ref="socialModal" class="tw-card p-4 mt-4">
						<div
							v-for="(link, index) in links"
							:key="index"
							class="tw-nav-card"
							@click="openLink(link.openLink)"
						>
							<div class="w-[230px] p-4 select-none">
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
		</div>
	</div>
</template>

<style scoped>
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
	overflow: hidden;
	transition: max-height 0.25s ease-in-out;
}
.toggle:checked + .toggle-label + .collapsible-content {
	max-height: 100vh;
}
</style>
