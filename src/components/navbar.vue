<script lang="ts" src="./navbar.ts"></script>

<template>
	<div>
		<div toggleable="lg" type="dark" class="navbar">
			<div class="navbar-brand" v-once>
				<button class="hamburger-button btn btn-secondary" @click="openNav()">
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
				<div class="sidenav-top" v-once>
					<div class="sidenav-top-text">Websites</div>

					<svg
						class="sidenav-close-button"
						@click="closeNav()"
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
						/>
					</svg>
				</div>

				<div class="sidenav-card card" @click="openLink('github')" v-once>
					<div class="sidenav-card-body card-body">
						<img
							class="sidenav-card-image"
							src="../assets/github.png"
							alt="github logo"
						/>
						<div class="sidenav-card-text">Github</div>
					</div>
				</div>

				<div class="sidenav-card card" @click="openLink('linkedin')" v-once>
					<div class="sidenav-card-body card-body">
						<img
							class="sidenav-card-image"
							src="../assets/linkedin.png"
							alt="linkedin logo"
						/>
						<div class="sidenav-card-text">LinkedIn</div>
					</div>
				</div>

				<div class="sidenav-card card" @click="openLink('resume')" v-once>
					<div class="sidenav-card-body card-body">
						<img
							class="sidenav-card-image"
							src="../assets/resume.png"
							alt="pdf logo"
						/>
						<div class="sidenav-card-text">Resume</div>
					</div>
				</div>

				<div class="sidenav-card card" @click="openLink('bandcamp')" v-once>
					<div class="sidenav-card-body card-body">
						<img
							class="sidenav-card-image"
							src="../assets/bandcamp.png"
							alt="bandcamp logo"
						/>
						<div class="sidenav-card-text">Bandcamp</div>
					</div>
				</div>

				<div class="sidenav-card card" @click="openLink('soundcloud')" v-once>
					<div class="sidenav-card-body card-body">
						<img
							class="sidenav-card-image"
							src="../assets/soundcloud.png"
							alt="soundcloud logo"
						/>
						<div class="sidenav-card-text">Soundcloud</div>
					</div>
				</div>
				<template v-if="currentRoute !== 'Home'">
					<div class="sidenav-card card" @click="routeChange('/')">
						<div class="sidenav-card-body card-body">
							<img
								class="sidenav-card-image"
								src="../assets/cardano.png"
								alt="cardano logo"
							/>
							<div class="sidenav-card-text">Home</div>
						</div>
					</div>
				</template>
				<template v-if="currentRoute !== 'Password'">
					<div class="sidenav-card card" @click="routeChange('password')">
						<div class="sidenav-card-body card-body">
							<img
								class="sidenav-card-image"
								src="../assets/cardano.png"
								alt="cardano logo"
							/>
							<div class="sidenav-card-text">Password Generator</div>
						</div>
					</div>
				</template>
				<template v-if="currentRoute !== 'Acronym'">
					<div class="sidenav-card card" @click="routeChange('acronym')">
						<div class="sidenav-card-body card-body">
							<img
								class="sidenav-card-image"
								src="../assets/cardano.png"
								alt="cardano logo"
							/>
							<div class="sidenav-card-text">Acronym Generator</div>
						</div>
					</div>
				</template>
				<template v-if="currentRoute !== 'Discord'">
					<div class="sidenav-card card" @click="routeChange('discord')">
						<div class="sidenav-card-body card-body">
							<img
								class="sidenav-card-image"
								src="../assets/cardano.png"
								alt="cardano logo"
							/>
							<div class="sidenav-card-text">Discord Generator</div>
						</div>
					</div>
				</template>
			</div>
		</div>
		<div ref="overlay" @click="closeNav()" class="sidenav-overlay" v-once></div>
	</div>
</template>

<style>
.hamburger-menu {
	width: 24px;
	height: 24px;
	cursor: pointer;
}

.hamburger-button {
	background-color: #388e3c;
	border-color: #388e3c;
	margin-top: -2px;
	margin-left: 10px;
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
	margin-bottom: 4px;
}

.sidenav a {
	padding: 8px 8px 8px 32px;
	text-decoration: none;
	font-size: 25px;
	color: #818181;
	display: block;
	transition: 0.25s;
}

.sidenav a:hover {
	color: #f1f1f1;
}

.sidenav .sidenav-close-button {
	position: relative;
	float: right;
	color: #fff;
	width: 24px;
	height: 24px;
	margin-top: 18px;
	margin-right: 16px;
	cursor: pointer;
}

.sidenav-top-text {
	font-family: Roboto, 'Helvetica Neue', sans-serif;
	font-size: 20px;
	position: relative;
	float: left;
	padding-top: 14px;
	padding-left: 16px;
	user-select: none;
}

.sidenav-top {
	position: relative;
	margin-top: -60px;
	height: 60px;
	width: 230px;
	background-color: #398e3d;
}

.sidenav-card {
	margin: 0 !important;
	cursor: pointer;
}

.sidenav-card-body {
	background-color: #616161;
	margin-top: 0;
	margin-left: 0;
	padding-left: 0;
	padding-top: 0;
	height: 45px;
	width: 230px;
}

.sidenav-card-image {
	position: relative;
	float: left;
	padding-left: 8px;
	padding-top: 5px;
}

.sidenav-card-text {
	font-family: Roboto, 'Helvetica Neue', sans-serif;
	font-size: 18px;
	padding-top: 8px;
	margin-left: -8px;
	text-align: center;
	user-select: none;
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
}

.navbar-brand {
	user-select: none;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: 700;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}

@media screen and (max-height: 450px) {
	.sidenav {
		padding-top: 15px;
	}

	.sidenav a {
		font-size: 18px;
	}
}
</style>
