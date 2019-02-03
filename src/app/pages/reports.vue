<template>
	<Layout>
		<h1 class="text-md-center pb-2">Reports</h1>
		<v-card height="210px" color="transparent">
				<h3 class="title pl-3 pt-3">Generate Report</h3>
				<v-layout row wrap>
					<v-flex xs12>
						<v-layout row wrap class="pt-2 pb-2">
							<v-flex xs12 lg4 class="pl-4">
								<v-select color="orange darken-2" v-model="Type" prepend-icon="fas fa-id-card" :items="ReportType" label="Report Types"/>
							</v-flex>

							<v-flex xs12 lg4 class="pl-4">
								<v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
								<v-text-field color="orange darken-2" slot="activator" v-model="dateFormatted" label="From" hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
								<v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
								</v-menu>
							</v-flex>

							<v-flex xs12 lg4 class="pl-4">
								<v-menu ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
								<v-text-field color="orange darken-2" slot="activator" v-model="dateFormatted" label="To" hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
								<v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
								</v-menu>
							</v-flex>
						</v-layout>
						<v-divider></v-divider>
						<v-layout class="pt-2 pl-4">	
							<v-btn dark color="orange darken-4">Show</v-btn>
							<v-btn dark color="orange darken-4">Print</v-btn>
						</v-layout>
					</v-flex>
				</v-layout>
		</v-card>
	</Layout>
</template>

<script lang="ts">
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import SystemInformation from "@/components/system-information.vue"
import { parseDate, formatDate } from "@/utils/misc"
import { Component, Watch, Vue } from "vue-property-decorator"
import { watch } from 'fs';

@Component({
	components: { Layout, SystemInformation, },
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
	
})
export default class Home extends Vue {
	parseDate(date){ return parseDate(date) }
	formatDate(date){ return formatDate(date) }

	date = new Date().toISOString().substr(0, 10)
	dateFormatted = this.formatDate(this.date)

	@Watch("date")
	onDateChanged() {
		this.dateFormatted = this.formatDate(this.date)
	}

	get getDateFormatted() {
		return this.formatDate(this.date)
	}

	menu1= false
	menu= false
	Type = ""
	ReportType = [
		'abcd',
		'asdf',
		'qwerty',
		'zxcvb',
		'fghjhj'
	]
	
}
</script>