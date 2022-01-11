<script setup lang="ts">
import { ref } from 'vue'

// public refs
const discordInput = ref('')
const nitro = ref(false)
const discordText = ref('')

function discordButtonPressed() {
	const maxLength = nitro.value ? 4000 : 2000
	const input = discordInput.value.trim() + ' '

	discordText.value = ''
	if (discordInput.value.length < maxLength) {
		while (input.length < maxLength) {
			if (discordText.value.length + input.length > maxLength) {
				break
			}

			discordText.value = discordText.value + input
		}
	}
}

function copy() {
	navigator.clipboard.writeText(discordText.value)
}
</script>

<template>
	<div class="flex flex-col justify-center items-center">
		<h1 class="mt-4 mb-4 text-2xl font-semibold">
			Discord Max Message Generator
		</h1>
		<div class="flex flex-col justify-center items-center">
			<div>
				<input
					v-model="discordInput"
					class="inline-block w-64 rounded-md border text-[#212529] border-[#ced4da] border-solid py-[0.375rem] px-3"
					placeholder="Type a word here"
					@keyup.enter="discordButtonPressed"
				/>
				<input
					v-model="nitro"
					class="m-2 mr-1 w-5 h-5 align-top bg-white border border-solid border-black border-opacity-10 rounded-md br-[#0d6efd] bg-[url( data:image/svg + xml, %3csvgxmlns='http://www.w3.org/2000/svg'viewBox='0 0 20 20'%3e%3cpathfill='none'stroke='%23fff'stroke-linecap='round'stroke-linejoin='round'stroke-width='3'd='M6 10l3 3l6-6'/%3e%3c/svg%3e );]"
					type="checkbox"
				/>
				<label class="inline-block" for="flexCheckDefault"> Nitro? </label>
			</div>

			<button
				class="mt-3 tw-button"
				:disabled="discordInput.length < 1"
				@click="discordButtonPressed"
			>
				Generate
			</button>
		</div>

		<div class="flex flex-col justify-center items-center">
			<div class="m-4">{{ discordText }}</div>
			<button v-show="discordText.length > 0" class="tw-button" @click="copy">
				Copy
			</button>
		</div>
	</div>
</template>
