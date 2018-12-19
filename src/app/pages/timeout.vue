<template>
	<v-container>
		<v-layout>
			<v-spacer />
			<h1 v-html="'The page timed out while loading'" />
			<v-spacer />
		</v-layout>
	</v-container>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"

@Component({
	page : {		
		title: "Page timeout",
		meta: [ { name: "description", content: "The page timed out while loading.", }, ],
	},
})
export default class Timedout extends Vue{}
</script>