<script setup lang="ts">
import router, { resume } from '../router'
import { SidenavLink } from '../typings'
import { RouteRecordNormalized } from 'vue-router'
import githubSrc from '../assets/github.png'
import linkedinSrc from '../assets/linkedin.png'
import resumeSrc from '../assets/resume.png'
import bandcampSrc from '../assets/bandcamp.png'
import soundcloudSrc from '../assets/soundcloud.png'
import { ref, onMounted } from 'vue'

// refs
const sidenav = ref(null)
const overlay = ref(null)

// public
const links: SidenavLink[] = [
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

// private
let sidenavElement: HTMLDivElement
let overlayElement: HTMLDivElement

onMounted(() => {
	sidenavElement = sidenav.value as unknown as HTMLDivElement
	overlayElement = overlay.value as unknown as HTMLDivElement

	closeNav()

	// close the sidenav if click outside
	document.addEventListener('mouseup', (event) => {
		if (overlayElement.style.zIndex === '1' && event.x > 230) closeNav()
	})
})

const open = (link: string) => window.open(link, '_blank')
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

async function routeChange(route: string) {
	await router.push(route)
}

function openNav() {
	sidenavElement.style.width = '230px'
	Object.assign(overlayElement.style, {
		opacity: '15%',
		width: 'calc(100% - 230px)',
		marginLeft: '230px',
		zIndex: '1'
	})
}

function closeNav() {
	sidenavElement.style.width = '0'
	Object.assign(overlayElement.style, {
		opacity: '0',
		width: '100%',
		marginLeft: '0',
		zIndex: '-1'
	})
}
</script>

<template>
	<div toggleable="lg" type="dark" class="navbar">
		<div v-once class="disable-select">
			<button class="btn btn-secondary hamburger-button" @click="openNav">
				<svg class="hamburger-menu" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
					/>
				</svg>
			</button>
			Daniel Turcich
		</div>

		<div ref="sidenav" class="sidenav">
			<div v-once class="sidenav-top">
				<div class="sidenav-top-text disable-select">Websites</div>

				<svg class="sidenav-close-button" viewBox="0 0 24 24" @click="closeNav">
					<path
						fill="currentColor"
						d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
					/>
				</svg>
			</div>
			<div
				v-for="(link, index) in links"
				:key="index"
				class="sidenav-card card"
				@click="openLink(link.openLink)"
			>
				<div class="sidenav-card-body card-body disable-select">
					<img class="sidenav-card-image" :src="link.src" :alt="link.alt" />
					<div class="sidenav-card-text">{{ link.buttonText }}</div>
				</div>
			</div>

			<button
				v-for="(route, index) in routes"
				:key="index"
				class="card sidenav-card btn btn-secondary route-button"
				:disabled="$route.name === route.name"
				@click="routeChange(route.path)"
			>
				<div class="sidenav-card-body card-body">
					<img
						v-once
						class="sidenav-card-image"
						src="../assets/cardano.png"
						alt="cardano logo"
					/>
					<div class="sidenav-card-text">{{ route.meta.buttonName }}</div>
				</div>
			</button>
		</div>
	</div>
	<div v-once ref="overlay" class="sidenav-overlay"></div>
</template>

<style scoped>
.hamburger-menu {
	width: 24px;
}

.hamburger-button {
	background-color: transparent !important;
	border-color: transparent !important;
	margin-top: -2px;
	margin-left: 10px;
}

.hamburger-button:hover {
	background-color: #6c757d !important;
	border-color: #6c757d !important;
}

.route-button {
	border-color: transparent !important;
	background-color: #424242 !important;
	color: white !important;
	box-shadow: unset !important;
}

.sidenav {
	height: 100%;
	width: 0;
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	background-color: #424242;
	overflow-x: hidden;
	transition: 0.25s;
	padding-top: 60px;
}

.sidenav .sidenav-close-button {
	float: right;
	height: 24px;
	margin-top: 18px;
	margin-right: 16px;
	cursor: pointer;
}

.sidenav-top-text {
	font-size: 20px;
	float: left;
	padding-top: 14px;
	padding-left: 16px;
}

.sidenav-top {
	/* position: fixed; */
	z-index: 1;
	margin-top: -60px;
	height: 60px;
	width: 230px;
	background-color: #398e3d;
}

.sidenav-card {
	padding: 0 !important;
	margin: 0 !important;
	cursor: pointer;
}

.sidenav-card-body {
	background-color: #616161;
	width: 230px;
}

.sidenav-card-image {
	float: left;
	padding-left: 8px;
	padding-top: 5px;
}

.sidenav-card-text {
	display: flex;
	height: 100%;
	font-size: 18px;
	justify-content: center;
	align-items: center;
}

.sidenav-overlay {
	opacity: 0;
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: #111;
	z-index: 1;
	transition: 0.25s;
}

.sidenav-card .card-body {
	padding: 0;
	height: 45px;
	margin-top: 1px;
}

.navbar {
	background-color: #388e3c;
	height: 60px;
	position: sticky !important;
	top: 0;
	z-index: 1;
}
</style>
