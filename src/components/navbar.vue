<script setup lang="ts">
import router, { resume } from '../router'
import { ref } from 'vue'
import type { NavLink } from '#types'

const websiteNavigationOpen = ref(false)
const socialLinksOpen = ref(false)

const links: NavLink[] = [
	{
		buttonText: 'Github',
		alt: 'github logo',
		src: '/github.png',
		link: 'https://github.com/buffet-time',
	},
	{
		buttonText: 'LinkedIn',
		alt: 'linkedin logo',
		src: '/linkedin.png',
		link: 'https://www.linkedin.com/in/danielturcich/',
	},
	{
		buttonText: 'Resume',
		alt: 'pdf logo',
		src: '/resume.png',
		link: resume,
	},
	{
		buttonText: 'Bandcamp',
		alt: 'bandcamp logo',
		src: '/bandcamp.png',
		link: 'https://buffet-time.bandcamp.com/',
	},
	{
		buttonText: 'Soundcloud',
		alt: 'soundcloud logo',
		src: '/soundcloud.png',
		link: 'https://soundcloud.com/buffet_time',
	},
]

const routes = router.getRoutes().filter((route) => route.meta.buttonName !== undefined)

function handleWebsiteNavigationOpen(event: Event) {
	event.stopPropagation()
	websiteNavigationOpen.value = !websiteNavigationOpen.value
	socialLinksOpen.value = false
	document.addEventListener('click', () => (websiteNavigationOpen.value = false))
}

function handleSocialLinksOpen(event: Event) {
	event.stopPropagation()
	socialLinksOpen.value = !socialLinksOpen.value
	websiteNavigationOpen.value = false
	document.addEventListener('click', () => (socialLinksOpen.value = false))
}

async function routeChange(route: string) {
	await router.push(route)
}
</script>

<template>
	<div class="bg-[#388e3c] h-16 sticky top-0 w-full tw-flex-center gap-2">
		<div class="wrap-collabsible h-full text-center">
			<button class="cursor-pointer text-center h-full px-2" @click="handleWebsiteNavigationOpen">
				Website Navigation
			</button>
		</div>

		<div class="wrap-collabsible h-full text-center">
			<button class="cursor-pointer text-center h-full px-2" @click="handleSocialLinksOpen">
				Social Links
			</button>
		</div>
	</div>

	<div v-if="websiteNavigationOpen || socialLinksOpen" class="w-full h-full fixed">
		<div
			v-if="websiteNavigationOpen"
			ref="webNavModal"
			class="tw-card p-4 mt-0 ml-auto mr-auto w-fit"
		>
			<button
				v-for="(route, index) in routes"
				:key="index"
				class="flex flex-col tw-nav-card"
				:class="{ hidden: router.currentRoute.value.name === route.name }"
				:disabled="router.currentRoute.value.name === route.name"
				@click="routeChange(route.path)"
			>
				<div class="w-57.5 p-4">
					{{ route.meta.buttonName }}
				</div>
			</button>
		</div>

		<div v-if="socialLinksOpen" ref="socialModal" class="tw-card mt-0 p-4 ml-auto mr-auto w-fit">
			<a
				v-for="(navLink, index) in links"
				:key="index"
				:href="navLink.link"
				target="_blank"
				rel="noopener noreferrer"
				class="hover:bg-neutral-200"
			>
				<div class="tw-nav-card w-57.5 p-4 select-none">
					<img
						class="ml-2 float-left h-8 w-8"
						:src="navLink.src"
						:alt="navLink.alt"
						loading="lazy"
					/>
					<div class="text-lg">{{ navLink.buttonText }}</div>
				</div>
			</a>
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
.toggle:checked + .toggle-label + .collapsible-content {
	max-height: 100vh;
}
</style>
