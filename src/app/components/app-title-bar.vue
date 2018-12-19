<template>
	<v-flex class="app-drag">
		<slot />
	</v-flex>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"

@Component({
	name: "app-title-bar",
})
export default class AppTitleBar extends Vue{}
</script>

<style>
.app-drag{
	-webkit-app-region: drag;
	height: 100%;
}
</style>
