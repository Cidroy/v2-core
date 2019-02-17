<template>
	<Layout>
		<h1 class="text-md-center">Registrations</h1>
		
		<div>
    		<v-tabs v-model="active" color="grey darken-4" dark slider-color="orange darken-4">
      			<v-tab v-for="(name, key) in tabsList" :key="key" ripple>{{ name }}</v-tab>
      	
				<v-tab-item key="a"> 
        		<personalTraining>
					</personalTraining>	
				</v-tab-item>
      
				<v-tab-item key="b">
					<oneDay>
					</oneDay>
				</v-tab-item>
      1
	  			<v-tab-item key="c">
        			<v-card height="565px" color="transparent">
						<v-layout class="pt-4" row wrap>
							<v-flex xs2>
								<v-subheader class="title">Mobile No</v-subheader>
							</v-flex>
							<v-flex xs4>
								<v-text-field mask="phone" label="Enter Mobile No" single-line solo color="orange darken-2"></v-text-field>
							</v-flex>
						</v-layout>
						<v-divider></v-divider>

						<v-layout class="pl-4 pt-2" row wrap>
							<v-flex lg3 class="mr-3">
								<v-text-field color="orange darken-2" prepend-icon="fas fa-user" counter maxlength="15" label="First Name" required></v-text-field>
							</v-flex>
							<v-flex lg3 class="mr-3">
								<v-text-field color="orange darken-2" counter maxlength="15" label="Middle Name"></v-text-field>
							</v-flex>
							<v-flex lg3 class="mr-3">
								<v-text-field color="orange darken-2" counter maxlength="15" label="Last Name"></v-text-field>
							</v-flex>
						</v-layout>
			
						<v-layout class="pl-4" row wrap>
							<v-flex class="pt-4" xs4>
								<h4 class="title">Purpose of taking counselling:</h4>
							</v-flex>

							<v-flex xs12>
								<v-layout row align-start>
									<v-checkbox color="orange darken-2" label="General Fitness"></v-checkbox>
									<v-checkbox color="orange darken-2" label="Fat Loss"></v-checkbox>
									<v-checkbox color="orange darken-2" label="Muscle Toning"></v-checkbox>
									<v-checkbox color="orange darken-2" label="Sports Oriented"></v-checkbox>
									<v-checkbox color="orange darken-2" label="Physical"></v-checkbox>
								</v-layout>
								<v-layout>
									<v-checkbox color="orange darken-2" label="Specialised"></v-checkbox>
									<v-checkbox color="orange darken-2" label="Build muscle"></v-checkbox>
									<v-checkbox color="orange darken-2" label="Random"></v-checkbox>
									<v-checkbox color="orange darken-2" label="Random"></v-checkbox>
									<v-checkbox color="orange darken-2" label="Random"></v-checkbox>
								</v-layout>	
							</v-flex>

							<v-flex lg12>
								<v-radio-group label="Type of Counsellor: " v-model="Counsellor" row>
									<v-radio color="orange darken-2" label="X" value="radio-1"></v-radio>
									<v-radio color="orange darken-2" label="Y" value="radio-2"></v-radio>
									<v-radio color="orange darken-2" label="Z" value="radio-3"></v-radio>
									<v-radio color="orange darken-2" label="A" value="radio-4"></v-radio>
									<v-radio color="orange darken-2" label="B" value="radio-5"></v-radio>
								</v-radio-group>
							</v-flex>

							<v-flex lg4>
								<v-text-field color="orange darken-2" placeholder="No.of session"></v-text-field>	
							</v-flex>

							<v-flex lg4>
								
								<v-menu :close-on-content-click="false" v-model="menu3" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
         						 <v-text-field color="orange darken-2"	slot="activator" v-model="computedDateFormatted" label="Pick a Date"
									hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" readonly></v-text-field>
          							<v-date-picker v-model="dates"  multiple no-title @input="menu3 = false"></v-date-picker>
       							 </v-menu>
								
							</v-flex>
							
							<v-flex xs3 lg5>
								<v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" lazy transition="scale-transition"
								offset-y full-width max-width="290px" min-width="290px">
									<v-text-field color="orange darken-2" slot="activator" v-model="dateFormatted" label="Counseling Date" placeholder="Counseling Date"
									hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
									<v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
								</v-menu>
							</v-flex>

							<v-flex xs3 class="pl-4">
								<v-menu ref="menu1" v-model="menu2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time"
								lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
									<v-text-field color="orange darken-2" slot="activator" v-model="time" label="Counseling Time" prepend-icon="access_time" readonly></v-text-field>
									<v-time-picker v-if="menu2" v-model="time" full-width @change="$refs.menu1.save(time)"></v-time-picker>
								</v-menu>
							</v-flex>
						</v-layout>
					</v-card>

					<v-card width="100%" height="50px" color="transparent">
						<div class="right pr-2"> 
							<v-btn dark>Cancel</v-btn>
							<v-btn dark @click="snackbar3 = true" color="orange darken-4" class="mb-2">Submit</v-btn>
							<v-snackbar v-model="snackbar3" :bottom="y === 'bottom'">Fitness Counseling Booked!
								<v-btn color="orange darken-4" flat @click="snackbar3 = false">Close</v-btn>
							</v-snackbar>
						</div>
					</v-card>
      			</v-tab-item>
    		</v-tabs>
  		</div>
			
	</Layout>
</template>

<script lang="ts">
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import SystemInformation from "@/components/system-information.vue"
import { Component, Vue, Watch } from "vue-property-decorator"
import { watch } from 'fs';
import personalTraining from "@/components/registration/personalTraining.vue"
import oneDay from "@/components/registration/oneDay.vue"

@Component({
	components: { Layout, SystemInformation,personalTraining,oneDay },
	page : {
		title: "Home",
		meta: [ { name: "description", content: appConfig.description, }, ],
	},
})
export default class Home extends Vue{
	date = new Date().toISOString().substr(0, 10)
	dateFormatted = this.formatDate(this.date)
	time5 = null
	time = null
	modal5 = false
	menu2 = false
	menu3 = false
	menu1 = false
	ODstart = false
	ODend = false
	active: number = 0
	radioTop1 = 'radio-1'
	radioTop2 = 'radio-1'
	radios1 = 'radio-1'
	radios2 = 'radio-1'
	radioTime = 'radio-1'
	radioOneDay = 'radio-1'
	Counsellor = 'radio-1'
	radioGroup1 = 'radio-4'
	firstname = ""
	nameRules = [
		v => !!v || "Name is required",
		v => v.length <= 15 || "Name must be less than 15 characters",
	]
	items = [
		'Programming',
		'Design',
		'Vue',
		'Vuetify'
	]
	dates = ['2018-09-15', '2018-09-20']
	email = ""
	emailRules = [
		v => (v || '').match(/@/) || 'Please enter a valid email',email = ""
	emailRules = [
		v => (v || '').match(/@/) || 'Please enter a valid email',
	]
	]
	snackbar1 = false
	snackbar2 = false
	snackbar3 = false
    y= 'top'
	mode= ''
    timeout= 6000
	tabsList = {
		a: "Personal Training",
		b: "One Day",
		c: "Fitness conseling",
	}
	 next() {
        const active = parseInt(this.active.toString())
        this.active = (active < 2 ? active + 1 : 0)
	  }

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

	get computedDateFormatted() {
		return this.formatDate(this.date)
	}

	parseDate(date) {
		if (!date) return null
		const [day, month, year,] = date.split("/")
		return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
	}
	
}
</script>