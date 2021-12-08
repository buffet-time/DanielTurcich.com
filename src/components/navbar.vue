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
	<div toggleable="lg" type="dark" class="navbar">
		<div class="navbar-buttons">
			<a
				class="navbar-link left-link"
				data-bs-toggle="collapse"
				href="#navbarCollapse1"
				role="button"
				aria-expanded="false"
				aria-controls="navbarCollapse"
			>
				Website Navigation
			</a>
			<a
				class="navbar-link"
				data-bs-toggle="collapse"
				href="#navbarCollapse2"
				role="button"
				aria-expanded="false"
				aria-controls="navbarCollapse"
			>
				Social Links
			</a>
		</div>

		<div id="navbarCollapse1" class="collapse">
			<div id="collapsible1" class="card card-body collapsible-top-card">
				<button
					v-for="(route, index) in routes"
					:key="index"
					class="card nav-card btn btn-secondary route-button"
					:disabled="$route.name === route.name"
					@click="routeChange(route.path)"
				>
					<div class="nav-card-body card-body web-nav-text-div">
						{{ route.meta.buttonName }}
					</div>
				</button>
			</div>
		</div>

		<div id="navbarCollapse2" class="collapse">
			<div id="collapsible2" class="card card-body collapsible-top-card">
				<div
					v-for="(link, index) in links"
					:key="index"
					class="nav-card card"
					@click="openLink(link.openLink)"
				>
					<div class="nav-card-body card-body disable-select">
						<div class="nav-card-image-div">
							<img class="nav-card-image" :src="link.src" :alt="link.alt" />
						</div>
						<div class="nav-card-text">{{ link.buttonText }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.navbar {
	background-color: #388e3c;
	height: 60px;
	position: sticky;
	padding: 0px;
	top: 0;
	z-index: 1;
	justify-content: center;
}
.navbar-buttons {
	height: 60px;
	width: 100%;
	display: flex;
	justify-content: center;
}
.navbar-link {
	color: white;
	text-decoration: unset;
	padding: 5px;
	display: flex;
	align-items: center;
}
.left-link {
	margin-left: -10px;
}
.navbar-link:hover {
	color: #ddd;
}
.collapsible-top-card {
	margin-top: 8px;
}
.route-button {
	border-color: transparent !important;
	background-color: #424242;
	color: white;
	box-shadow: unset;
}
.nav-card {
	padding: 0;
	margin: 0;
	cursor: pointer;
}
.nav-card-body {
	background-color: #616161;
	width: 230px;
}
.nav-card-image-div {
	display: flex;
	height: 100%;
	float: left;
	align-items: center;
	margin-left: 8px;
}
.nav-card-image {
	height: 32px;
	width: 32px;
}
.web-nav-text-div {
	display: flex;
	justify-content: center;
	align-items: center;
}
.nav-card-text {
	display: flex;
	height: 100%;
	font-size: 18px;
	justify-content: center;
	align-items: center;
}
.nav-card .card-body {
	padding: 0;
	height: 45px;
	margin-top: 1px;
}
</style>
