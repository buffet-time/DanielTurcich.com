<template>
	<d-navbar></d-navbar>
	<router-view />
</template>

<style src="./app.css"></style>

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
