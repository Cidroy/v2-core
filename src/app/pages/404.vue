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
import { Component, Prop, Inject, Vue } from "vue-property-decorator"
import Layout from "@plugins/core/layouts/layout.vue"

@Component({
	components : { Layout, },
	page: {
		title: "404",
		meta: [ { name: "description", content: "404", }, ],
	},
})
export default class E404Page extends Vue.default {
	@Prop({ default: "", type: String, }) resource!: string
}
</script>
