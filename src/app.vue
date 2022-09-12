<script setup lang="ts">
import Navbar from './components/navbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
	<Navbar />
	<RouterView />
</template>

<style>
body {
	background-color: #303030;
	font-family: Roboto, Helvetica, Arial, sans-serif;
	color: white;
	text-align: center;
}
</style>
