<template>
	<v-flex class="app-drag">
		<slot />
	</v-flex>
</template>

<style>
.app-drag{
	-webkit-app-region: drag;
	height: 100%;
}
</style>
