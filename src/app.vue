<template>
	<d-navbar />
	<router-view />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Navbar from './components/navbar.vue'

@Options({
	components: {
		'd-navbar': Navbar
	}
})
export default class App extends Vue {}
</script>

<style lang="scss">
// Required
@import 'node_modules/bootstrap/scss/functions';
@import 'node_modules/bootstrap/scss/variables';
@import 'node_modules/bootstrap/scss/mixins';

// optional other
@import 'node_modules/bootstrap/scss/reboot';

// optional components
@import 'node_modules/bootstrap/scss/navbar';
@import 'node_modules/bootstrap/scss/card';
@import 'node_modules/bootstrap/scss/buttons';
@import 'node_modules/bootstrap/scss/forms';
@import 'node_modules/bootstrap/scss/grid';

// latin
@font-face {
	font-display: swap;
	font-family: 'Roboto';
	font-style: normal;
	font-weight: 400;
	src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2)
		format('woff2');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
		U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
		U+FEFF, U+FFFD;
}

// latin-ext
@font-face {
	font-display: swap;
	font-family: 'Roboto';
	font-style: normal;
	font-weight: 400;
	src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7GxKOzY.woff2)
		format('woff2');
	unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
		U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

#app {
	font-family: Roboto;
	text-align: center;
	color: #fff;
}

body {
	background-color: #303030;
}

.card {
	margin: 20px;
	color: #fff;
	text-align: left;
	background-color: #424242 !important;
}

.disable-select {
	user-select: none;
}

.card-title-1 {
	margin-left: -20px;
}

.card-text {
	padding-left: 16px;
}
</style>
