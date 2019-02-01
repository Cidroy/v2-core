<template>
	<Layout>
		<v-btn @click.native.stop="test">Test</v-btn>
		<v-layout row wrap justify-center id="wrapper">
			<v-flex xs12 md6 class="text-xs-center centered">
				<img id="logo" max-width="100%" max-height="100px" class="logo" src="~@/assets/images/logo.png" alt="Vuetifyjs">
			</v-flex>
			<v-flex xs10 class="mt-3">
				<v-card>
					<v-card-text>
						<p>Welcome to Vuetify template.</p>
						<p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications. For more information on Vuetify, check out the <a href="https://vuetifyjs.com" target="_blank">documentation</a>. If you have questions, please join the official <a href="https://chat.vuetifyjs.com/" target="_blank" title="chat">discord</a>. Find a bug? Report it on the github <a href="https://github.com/vuetifyjs/vuetify/issues" target="_blank" title="contribute">issue board</a>.</p>
						<p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
						<div class="text-xs-right">
							<em><small>&mdash; John Leider</small></em>
						</div>
					</v-card-text>
					<v-card-actions>
						<v-spacer/>
						<v-btn primary flat router to="/inspire">Continue</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
			<v-flex xs10 class="mt-4">
				<system-information />
			</v-flex>
			<v-flex xs10 class="mt-4">
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
		<v-layout row wrap justify-center id="wrapper">
			<v-flex xs12 md6 class="text-xs-center centered">
				<img id="logo" max-width="100%" max-height="100px" class="logo" src="~@/assets/images/logo.png" alt="Vuetifyjs">
			</v-flex>
			<v-flex xs10 class="mt-3">
				<v-card>
					<v-card-text>
						<p>Welcome to Vuetify template.</p>
						<p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications. For more information on Vuetify, check out the <a href="https://vuetifyjs.com" target="_blank">documentation</a>. If you have questions, please join the official <a href="https://chat.vuetifyjs.com/" target="_blank" title="chat">discord</a>. Find a bug? Report it on the github <a href="https://github.com/vuetifyjs/vuetify/issues" target="_blank" title="contribute">issue board</a>.</p>
						<p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
						<div class="text-xs-right">
							<em><small>&mdash; John Leider</small></em>
						</div>
					</v-card-text>
					<v-card-actions>
						<v-spacer/>
						<v-btn primary flat router to="/inspire">Continue</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
			<v-flex xs10 class="mt-4">
				<system-information />
			</v-flex>
			<v-flex xs10 class="mt-4">
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
		<v-layout row wrap justify-center id="wrapper">
			<v-flex xs12 md6 class="text-xs-center centered">
				<img id="logo" max-width="100%" max-height="100px" class="logo" src="~@/assets/images/logo.png" alt="Vuetifyjs">
			</v-flex>
			<v-flex xs10 class="mt-3">
				<v-card>
					<v-card-text>
						<p>Welcome to Vuetify template.</p>
						<p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications. For more information on Vuetify, check out the <a href="https://vuetifyjs.com" target="_blank">documentation</a>. If you have questions, please join the official <a href="https://chat.vuetifyjs.com/" target="_blank" title="chat">discord</a>. Find a bug? Report it on the github <a href="https://github.com/vuetifyjs/vuetify/issues" target="_blank" title="contribute">issue board</a>.</p>
						<p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
						<div class="text-xs-right">
							<em><small>&mdash; John Leider</small></em>
						</div>
					</v-card-text>
					<v-card-actions>
						<v-spacer/>
						<v-btn primary flat router to="/inspire">Continue</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
			<v-flex xs10 class="mt-4">
				<system-information />
			</v-flex>
			<v-flex xs10 class="mt-4">
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
import { Component, Vue } from "vue-property-decorator"
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import SystemInformation from "@/components/system-information.vue"
import Printer from "@electron/printer"
import AppConfig from "@classes/appConfig"

@Component({
	components: { Layout, SystemInformation, },
	page : {
		title: "Home",
		meta: [ { name: "description", content: appConfig.description, }, ],
	},
})
export default class Home extends Vue{
	async test(){
		console.log("done")
		let source  = await AppConfig.Get("__dirname", "") + "/resources/docs/typo.html"
		let destination = AppConfig.DataFolder + "/reports/typo.pdf"
		console.log(await Printer.requestPrintPDF(source, destination))
	}
}
</script>