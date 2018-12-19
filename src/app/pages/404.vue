<template>
	<v-container>
		<v-layout>
			<v-spacer />
			<h1>
				404
				<span v-if="resource">
					{{ resource }}
				</span>
				Not Found
			</h1>
			<v-spacer />
		</v-layout>
	</v-container>
</template>

<script lang="ts">
import Vue from "vue"
import Layout from "@/layouts/main.vue"
import { Component, Prop, Inject } from "vue-property-decorator"

@Component({
	components : { Layout, },
	page: {
		title: "404",
		meta: [ { name: "description", content: "404", }, ],
	},
})
export default class E404Page extends Vue{
	@Prop({ default: "", type: String, }) resource: string

	constructor(){
		super()
		this.resource = ""
	}
}
</script>
