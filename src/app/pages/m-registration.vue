<template>
	<Layout>
		<v-layout row wrap justify-center id="wrapper">
			<v-flex xs12 md6 class="text-xs-center centered">
				<img id="logo" max-width="100%" max-height="100px" class="logo" src="~@/assets/images/logo.png" alt="Vuetifyjs">
			</v-flex>
			<v-flex xs12 class="mt-4">
				<system-information />
			</v-flex>
			<v-flex xs12 class="mt-4">
				<v-card>
					<v-card-title class="headline">Docs</v-card-title>
					<v-divider />
					<v-card-actions class="pt-3 pb-3">
						<v-spacer/>
						<v-btn class="link-btn" @click="open('https://vuejs.org/v2/guide/')">Vue</v-btn>
						<v-spacer/>
						<v-btn class="link-btn" @click="open('https://vuetifyjs.com')">Vuetify</v-btn>
						<v-spacer/>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</Layout>
</template>

<script lang="ts">
import Vue from "vue"
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import SystemInformation from "@/components/system-information.vue"
import { Component } from "vue-property-decorator"

@Component({
	components: { Layout, SystemInformation, },
	page : {
		title: "Home",
		meta: [ { name: "description", content: appConfig.description, }, ],
	},
})
export default class Home extends Vue{}
</script>