<template>
	<v-card>
		<v-card-title class="headline">
			Informations
		</v-card-title>
		<v-divider></v-divider>
		<v-layout row wrap class="pa-3">
			<v-flex xs12 sm6 md4 class="item">
				<div class="name">Name:</div>
				<div class="value">{{ name }}</div>
			</v-flex>
			<v-flex xs12 sm6 md4 class="item">
				<div class="name">Vue.js:</div>
				<div class="value">{{ vue }}</div>
			</v-flex>
			<v-flex xs12 sm6 md4 class="item">
				<div class="name">Platform:</div>
				<div class="value">{{ platform }}</div>
			</v-flex>
		</v-layout>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class SystemInformation extends Vue.default {
	electron = process.versions["atom-shell"]
	name = "landing-page"
	node = process.versions.node
	path = "/"
	// #!if web
	platform = "web"
	// #!else
	platform = require("os").platform()
	// #!endif
	vue = "2.X"
}
</script>

<style scoped>
	.item
	{
		text-align: center;
	}

	.name
	{
		display: inline;
		font-style: italic;
		font-weight: 300;
		font-size: 16px;
		letter-spacing: 1px;
	}

	.value
	{
		display: inline;
		font-style: italic;
		font-weight: 600;
		font-size: 18px;
		padding-left: 5px;
	}
</style>
