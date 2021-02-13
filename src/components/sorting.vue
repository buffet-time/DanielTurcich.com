<script lang="ts" src="./sorting.ts"></script>

<template>
	<div class="sorting-wrapper">
		<div class="non-pixi-div">
			test
		</div>
		<div ref="pixi" class="pixi-div" />
	</div>
</template>

<style>
.sorting-wrapper {
	width: 100%;
}

.non-pixi-div {
	float: left;
	width: 30%;
}

.pixi-div {
	float: right;
	width: 70%;
}
</style>
