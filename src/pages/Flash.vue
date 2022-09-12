<script setup lang="ts">
import { onMounted, ref } from 'vue'

const renderSwf = ref(false)
// const swfFile = ref('')
const volume = ref(0.1)

onMounted(async () => {
	const script = document.createElement('script')
	script.setAttribute('src', 'https://unpkg.com/@ruffle-rs/ruffle')
	document.head.appendChild(script)
})

function blahButton() {
	const audioContext = new AudioContext()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const gainNode = new GainNode(audioContext, {
		gain: volume.value
	})

	renderSwf.value = true
}

function toPercent(value: number) {
	return parseFloat((value * 2 * 100).toFixed(1))
}
</script>

<template>
	<div class="flex-col p-4 pt-2">
		<p>Work in Progress</p>

		<button class="tw-button" @click="blahButton">Blah blah blaH</button>

		<div>
			Volume: {{ toPercent(volume) }}%
			<input
				v-model="volume"
				class="w-full h-6 bg-transparent"
				type="range"
				min="0"
				max="1"
				step="0.0005"
			/>
		</div>
	</div>

	<embed
		v-if="renderSwf"
		src="../assets/pandemic2.swf"
		width="550"
		height="400"
	/>
</template>
