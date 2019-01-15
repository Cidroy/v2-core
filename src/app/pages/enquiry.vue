<template>
	<Layout>
		<h1 class="text-md-center">Enquiry</h1>
			<v-layout row wrap>
				<v-flex  class="px-1">
					<v-text-field prepend-icon="fas fa-user" v-model="firstname" :rules="nameRules" counter maxlength="15" label="First Name" required></v-text-field>
				</v-flex>
				<v-flex  class="px-1">
					<v-text-field counter maxlength="15" label="Middle Name"></v-text-field>
				</v-flex>
				<v-flex  class="px-1">
					<v-text-field counter maxlength="15" label="Last Name"></v-text-field>
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
export default class Home extends Vue{
	firstname = ""
	nameRules = [
		v => !!v || "Name is required",
		v => v.length <= 30 || "Name must be less than 30 characters",
	]
	
}
</script>