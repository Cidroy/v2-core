<template>
	<Layout>
		<h1 class="text-md-center">Member Registration</h1>

		<v-stepper v-model="e1">
			<v-stepper-header>
				<v-stepper-step :rules="[() => true]" editable :complete="e1 > 1" step="1">Personal Details </v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step editable :complete="e1 > 2" step="2">Contact Details</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step editable :complete="e1 > 3" step="3">Members Plan</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step editable step="4">Members Plan</v-stepper-step>
			</v-stepper-header>

			<v-stepper-items>
				<v-stepper-content step="1">
					<v-card class="mb-5" color="transparent" height="400px">
							<v-radio-group label="Registration Type" v-model="row" row>
      							<v-radio label="Solo" value="radio-1"></v-radio>
     							<v-radio label="Couple" value="radio-2"></v-radio>
								<v-radio label="Group" value="radio-3"></v-radio>
    						</v-radio-group>
						<v-layout row wrap>
							<v-flex xs9>
								<v-layout row wrap>
									<v-flex xs12 lg4 class="px-1">
										<v-text-field v-model="firstname" :rules="nameRules" :counter="15" placeholder="First Name" required></v-text-field>
									</v-flex>
									<v-flex xs12 lg4 class="px-1">
										<v-text-field  :counter="15" placeholder="Middle Name"></v-text-field>
									</v-flex>
									<v-flex xs12 lg4 class="px-1">
										<v-text-field  :counter="15" placeholder="Last Name"></v-text-field>
									</v-flex>

									<v-flex xs12 lg6>
										<v-radio-group label="Gender" v-model="row" row>
      										<v-radio label="Male" value="radio-4"></v-radio>
     										<v-radio label="Female" value="radio-5"></v-radio>
											<v-radio label="Others" value="radio-6"></v-radio>
    									</v-radio-group>
									</v-flex>
									<v-flex xs12 lg6>
										<v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
											<v-text-field slot="activator" v-model="dateFormatted" placeholder="Date of Birth" hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
											<v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
										</v-menu>
									</v-flex>
 
									<v-spacer></v-spacer>
								</v-layout>
							</v-flex>
							<v-flex xs3></v-flex>
						</v-layout>


					</v-card>
					<v-btn @click="e1 = 2">
						NEXT
					</v-btn>
					<v-btn flat>Cancel</v-btn>
				</v-stepper-content>

				<v-stepper-content step="2">
					<v-card class="mb-5" color="transparent" height="400px"></v-card>

					<v-btn @click="e1 = 3">
						NEXT
					</v-btn>

					<v-btn flat>Cancel</v-btn>
				</v-stepper-content>

				<v-stepper-content step="3">
					<v-card class="mb-5" color="transparent" height="400px"></v-card>

					<v-btn @click="e1 = 4">
						NEXT
					</v-btn>

					<v-btn flat>Cancel</v-btn>
				</v-stepper-content>

				<v-stepper-content step="4">
					<v-card class="mb-5" color="transparent" height="400px"></v-card>

					<v-btn @click="e1 = 1">
						NEXT
					</v-btn>

					<v-btn flat>Cancel</v-btn>
				</v-stepper-content>
			</v-stepper-items>
		</v-stepper>
	</Layout>
</template>

<script lang="ts">
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import SystemInformation from "@/components/system-information.vue"
import { Component, Vue, Watch } from "vue-property-decorator"

@Component({
	components: { Layout, SystemInformation, },
	page : {
		title: "Home",
		meta: [ { name: "description", content: appConfig.description, }, ],
	},
})
export default class Home extends Vue{
	valid: boolean = false
	firstname= ""
	nameRules= [
		v => !!v || "Name is required",
		v => v.length <= 30 || "Name must be less than 30 characters",
	]
	row = null
	e1= 0
	date= new Date().toISOString().substr(0, 10)
	dateFormatted= this.formatDate(this.date)
	menu1= false
	
	@Watch("date")
	onDateChanged(){
		this.dateFormatted = this.formatDate(this.date)
	}

	get getDateFormatted(){
		return this.formatDate(this.date)
	}

	formatDate (date) {
		// if (!date) return null
		const [ year, month, day, ] = date.split("-")
		return `${day}/${month}/${year}`
	}
	parseDate (date) {
		if (!date) return null
		const [ day, month, year, ] = date.split("/")
		return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
	}
}
</script>