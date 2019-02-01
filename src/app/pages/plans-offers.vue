<template>
	<Layout>
		<h1 class="text-md-center">Plans &amp; Offers settings</h1>
		
		<v-card class="pa-5" color="grey darken-4" flat>
			<v-card class="d-inline-block elevation-12">
				<v-navigation-drawer floating permanent stateless value="true" >
					<v-list dense>
						<v-list-tile v-for="item in items" :key="item.title">
							<v-list-tile-action>
								<v-icon>{{ item.icon }}</v-icon>
							</v-list-tile-action>

							<v-list-tile-content>
								<v-list-tile-title>{{ item.title }}</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</v-navigation-drawer>
			</v-card>	
		</v-card>	
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
	items = [
          { title: 'Packages', icon: 'dashboard' },
		  { title: 'Offers', icon: 'question_answer' },
		  { title: 'Timings', icon: 'question_answer' }
        ]
    right = null
}
</script>