<script lang="ts" src="./navbar.ts"></script>

<template>
	<div toggleable="lg" type="dark" class="navbar">
		<div v-once class="disable-select">
			<button class="btn btn-secondary hamburger-button" @click="openNav()">
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
				v-for="link in links"
				:key="link"
				class="sidenav-card card"
				@click="openLink(link.openLink)"
			>
				<div class="sidenav-card-body card-body disable-select">
					<img
						class="sidenav-card-image"
						:src="require(`../assets/${link.src}`)"
						:alt="link.alt"
					/>
					<div class="sidenav-card-text">{{ link.buttonText }}</div>
				</div>
			</div>

			<button
				v-for="route in routes"
				:key="route"
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

<style>
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
	font-size: 18px;
	padding-top: 8px;
	text-align: center;
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
