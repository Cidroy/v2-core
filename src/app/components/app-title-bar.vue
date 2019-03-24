<template>
	<v-flex class="app-drag">
		<slot />
	</v-flex>
</template>

<style>
.app-drag{ -webkit-app-region: drag; }
</style>
