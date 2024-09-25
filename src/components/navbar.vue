<script setup lang="ts">
import router, { resume } from '../router'
import type { RouteRecordNormalized } from 'vue-router'
import { onMounted, ref } from 'vue'
import type { NavLink } from '#types'

const websiteNavigationInput = ref(false)
const socialLinksInput = ref(false)

// public
const links: NavLink[] = [
	{
		buttonText: 'Github',
		alt: 'github logo',
		src: '/github.png',
		link: 'https://github.com/buffet-time'
	},
	{
		buttonText: 'LinkedIn',
		alt: 'linkedin logo',
		src: '/linkedin.png',
		link: 'https://www.linkedin.com/in/danielturcich/'
	},
	{
		buttonText: 'Resume',
		alt: 'pdf logo',
		src: '/resume.png',
		link: resume
	},
	{
		buttonText: 'Bandcamp',
		alt: 'bandcamp logo',
		src: '/bandcamp.png',
		link: 'https://buffet-time.bandcamp.com/'
	},
	{
		buttonText: 'Soundcloud',
		alt: 'soundcloud logo',
		src: '/soundcloud.png',
		link: 'https://soundcloud.com/buffet_time'
	}
]

const routes: RouteRecordNormalized[] = router
	.getRoutes()
	.filter((route) => route.meta.buttonName !== undefined)

onMounted(() => {
	const target1 = document.querySelector('#webNavModal')!

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

async function routeChange(route: string) {
	await router.push(route)
}
</script>

<template>
	<div class="bg-[#388e3c] h-16 sticky top-0">
		<div class="h-16 w-[100%] tw-flex-center gap-4">
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
						<a
							v-for="(navLink, index) in links"
							:key="index"
							:href="navLink.link"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div class="tw-nav-card w-[230px] p-4 select-none">
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
