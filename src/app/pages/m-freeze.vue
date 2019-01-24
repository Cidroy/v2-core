<template>
	<Layout>
		<h1 class="text-md-center pb-2">Member Freezing</h1>
		
		<v-card color="transparent" height="600px">
			<v-layout class="pt-4" row wrap>
				<v-flex xs2>
					<v-subheader class="title">Mobile No</v-subheader>
				</v-flex>
				<v-flex xs4>
					<v-text-field label="Enter Mobile No" single-line solo></v-text-field>
				</v-flex>
				<v-spacer></v-spacer>
				<v-flex xs3 class="pr-4">
					<v-text-field prepend-icon="fas fa-id-badge" value="7384" label="Member ID" readonly ></v-text-field>
				</v-flex>
			</v-layout>
			<v-divider></v-divider>

			<v-layout class="pl-4 pt-2" row wrap>
				<v-flex xs6>
					<v-text-field prepend-icon="fas fa-user" value="John Doe" label="Name" readonly ></v-text-field>
				</v-flex>
			</v-layout>

			<h4 class="title pl-4 pt-2">Current Status</h4>
			<v-layout row wrap class="pl-4 pt-2">
				<v-flex xs3>
					<v-text-field prepend-icon="fas fa-info-circle" value="Gold Solo" label="Current Program" readonly ></v-text-field>
				</v-flex>
				<v-flex xs3 class="pl-4">
					<v-text-field prepend-icon="fas fa-calendar-alt" value="Yearly" label="Current Package" readonly ></v-text-field>
				</v-flex>
				<v-flex xs3 class="pl-4">
					<v-text-field prepend-icon="event" value="21/12/2018" label="Package Start Date" readonly ></v-text-field>
				</v-flex>
				<v-flex xs3 class="pl-4 pr-4">
					<v-text-field prepend-icon="event" value="20/12/2019" label="Package End Date" readonly ></v-text-field>
				</v-flex>
			</v-layout>
			
			<v-layout row wrap class="pl-4 pt-2">
				<v-flex xs3>
					<v-text-field prepend-icon="fas fa-hourglass-start" value="40 days" label="No. of Days Freezing Eligible" readonly ></v-text-field>
				</v-flex>
				<v-flex xs3 class="pl-4">
					<v-text-field prepend-icon="fas fa-hourglass-half" value="5 days" label="No. of Days Freezing Used" readonly ></v-text-field>
				</v-flex>
			</v-layout>
			<v-divider></v-divider>

			<h4 class="title pl-4 pt-4">Let's Freeze</h4>
			<v-layout row wrap class="pl-4 pt-2">
				<v-flex xs3 class="mb-2">
					<v-menu ref="freeze1" :close-on-content-click="false" v-model="freeze1" :nudge-right="40" lazy transition="scale-transition"
					offset-y full-width max-width="290px" min-width="290px">
						<v-text-field slot="activator" v-model="dateFormatted" label="Freezing Start Date"
						hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
						<v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
					</v-menu>
				</v-flex>
				<v-flex xs3 class="pl-4 mb-2">
					<v-menu ref="freeze2" :close-on-content-click="false" v-model="freeze2" :nudge-right="40" lazy transition="scale-transition"
						offset-y full-width>
						<v-text-field slot="activator" v-model="dateFormatted" label="Freezing End Date" hint="DD/MM/YYYY"
						persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
						<v-date-picker v-model="date" no-title @input="menu4 = false"></v-date-picker>
					</v-menu>
				</v-flex>
				<v-flex xs3 class="pl-4">
					<v-text-field prepend-icon="fas fa-calendar-minus" value="10 days" label="Freezing Period" readonly ></v-text-field>
				</v-flex>	
			</v-layout>
		</v-card>

		<v-card width="100%" height="50px" color="transparent">
			<div class="right pr-2"> 
				<v-btn flat>Cancel</v-btn>
				<v-btn @click="snackbar = true" color="orange darken-4" class="mb-2">Submit</v-btn>
				<v-snackbar v-model="snackbar" :bottom="y === 'bottom'">Freezing has been Initiated!
      				<v-btn color="orange darken-4" flat @click="snackbar = false">Close</v-btn>
    			</v-snackbar>
			</div>
		</v-card>
	</Layout>
</template>

<script lang="ts">
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import SystemInformation from "@/components/system-information.vue"
import { Component,Vue, Watch } from "vue-property-decorator"
import { watch } from 'fs';

@Component({
	components: { Layout, SystemInformation, },
	page : {
		title: "Home",
		meta: [ { name: "description", content: appConfig.description, }, ],
	},
})
export default class Home extends Vue{
	freeze1 = false
	freeze2 = false
	date = new Date().toISOString().substr(0, 10)
	dateFormatted = this.formatDate(this.date)
	snackbar= false
    y= 'top'
	mode= ''
    timeout= 6000

	@Watch("date")
	onDateChanged() {
		this.dateFormatted = this.formatDate(this.date)
	}

	get getDateFormatted() {
		return this.formatDate(this.date)
	}

	formatDate(date) {
		// if (!date) return null
		const [year, month, day,] = date.split("-")
		return `${day}/${month}/${year}`
	}
	parseDate(date) {
		if (!date) return null
		const [day, month, year,] = date.split("/")
		return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
	}
	
}
</script>