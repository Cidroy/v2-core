<template>
	<Layout>
		<h1 class="text-md-center">Registrations</h1>
		
		<div>
    		<v-tabs v-model="active" color="grey darken-4" dark slider-color="orange darken-4">
      			<v-tab v-for="(name, key) in tabsList" :key="key" ripple>{{ name }}</v-tab>
      	
				<v-tab-item key="a">
        			<v-card height="780px" color="transparent">
						<v-layout class="pt-2" row wrap>
							<v-flex class="pl-2 ml-2" xs12>
								<v-radio-group row label="Personal Traning Type: " v-model="radioTop1" :mandatory="false">
									<v-layout row align-start>
										<v-radio class="" label="Solo" value="radio-1"></v-radio>
										<v-radio class="" label="Group" value="radio-2"></v-radio>
									</v-layout>
								</v-radio-group>
							</v-flex>	
							<v-flex xs2>
								<v-subheader class="title">Mobile No</v-subheader>
							</v-flex>
							<v-flex xs4>
								<v-text-field label="Enter Mobile No" single-line solo></v-text-field>
							</v-flex>
							<v-spacer></v-spacer>
							<v-flex xs3 class="pr-4">
								<v-text-field box prepend-icon="fas fa-id-badge" value="4656" label="Member ID" readonly ></v-text-field>
							</v-flex>
						</v-layout>
						<v-divider></v-divider>
						
						<v-layout class="pl-4 pt-2" row wrap>
							<v-flex xs6>
								<v-text-field box prepend-icon="fas fa-user" value="John Doe" label="Name" readonly ></v-text-field>
							</v-flex>
						</v-layout>
						
						<v-layout class="pl-4" row wrap>
							<v-flex class="pr-4" xs3>
								<v-text-field box prepend-icon="fas fa-info-circle" value="xxxx" label="Current Program" readonly ></v-text-field>
							</v-flex>
							<v-flex xs3>
								<v-text-field box prepend-icon="fas fa-calendar-alt" value="YYYY" label="Current Package" readonly ></v-text-field>
							</v-flex>
						</v-layout>
						<v-divider></v-divider>

						<h4 class="pl-4 pt-2 title">Purpose of taking Personal Training:</h4>
			
						<v-layout class="pl-4" align-start row>
							<v-checkbox class="" label="General Fitness"></v-checkbox>
							<v-checkbox class="" label="Fat Loss"></v-checkbox>
							<v-checkbox class="" label="Muscle Toning"></v-checkbox>
							<v-checkbox class="" label="Sports Oriented"></v-checkbox>
							<v-checkbox class="" label="Physical"></v-checkbox>
						</v-layout>
						<v-layout class="pl-4" align-start row>
							<v-checkbox class="" label="Specialised"></v-checkbox>
							<v-checkbox class="" label="Build muscel"></v-checkbox>
							<v-checkbox class="" label="Random"></v-checkbox>
							<v-checkbox class="" label="Random"></v-checkbox>
							<v-checkbox class="" label="Random"></v-checkbox>
						</v-layout>	
						
						<h4 class="pl-4 title">Preffered Workout Time:</h4>
						<v-layout class="pl-4" row wrap>
							<v-flex xs2 class="">
								<v-menu ref="menu4" v-model="modal4" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time4"
									lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
									<v-text-field slot="activator" v-model="time4" label="Time From" prepend-icon="access_time" readonly></v-text-field>
									<v-time-picker v-if="modal4" v-model="time4" full-width @change="$refs.menu4.save(time4)"></v-time-picker>
								</v-menu>
							</v-flex>
							<v-flex xs2 class="">
								<v-menu ref="menu5" v-model="modal2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="timme"
									lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
									<v-text-field slot="activator" v-model="timme" label="Time To" prepend-icon="access_time" readonly></v-text-field>
									<v-time-picker v-if="modal2" v-model="timme" full-width @change="$refs.menu5.save(timme)"></v-time-picker>
								</v-menu>
							</v-flex>

							<v-flex xs12>
								<h4 class="title">Select The Personal Training Program:</h4>
							</v-flex>
							<v-flex xs12>
								<v-radio-group v-model="radios1" :mandatory="false">
									<v-layout row align-start>
										<v-radio class="" label="1 Month" value="radio-1"></v-radio>
										<v-radio class="" label="3 Months" value="radio-2"></v-radio>
										<v-radio class="" label="3 Times a Week" value="radio-3"></v-radio>
										<v-radio class="" label="Consultation with Trainers" value="radio-4"></v-radio>
									</v-layout>
								</v-radio-group>
							</v-flex>

							<v-flex xs12>
								<h4 class="title">Select Trainer Type:</h4>
							</v-flex>
							<v-flex xs12>
								<v-radio-group v-model="radios2" :mandatory="false">
									<v-layout row align-start>
										<v-radio class="" label="Standard" value="radio-1"></v-radio>
										<v-radio class="" label="Master" value="radio-2"></v-radio>
										<v-radio class="" label="Master" value="radio-3"></v-radio>
										<v-radio class="" label="Coach" value="radio-4"></v-radio>
									</v-layout>
								</v-radio-group>
							</v-flex>
						</v-layout>

						<v-card width="100%" height="50px" color="transparent">
							<div class="right pr-2"> 
								<v-btn dark>Cancel</v-btn>
								<v-btn dark @click="snackbar1 = true" color="orange darken-4" class="mb-2" to="/payment">Submit</v-btn>
								<v-snackbar v-model="snackbar1" :bottom="y === 'bottom'">Personal Traning Initiated!
									<v-btn color="orange darken-4" flat @click="snackbar1 = false">Close</v-btn>
								</v-snackbar>
							</div>
						</v-card>
					</v-card>
				</v-tab-item>
      
				<v-tab-item key="b">
					<v-card color="transparent" height="710px">
						<v-layout row wrap>
							<v-flex class="pl-2 ml-2" xs12>
								<v-radio-group row label="One-Day Type: " v-model="radioTop2" :mandatory="false">
									<v-layout row align-start>
										<v-radio class="" label="Solo" value="radio-1"></v-radio>
										<v-radio class="" label="Couple" value="radio-2"></v-radio>
										<v-radio class="" label="Group" value="radio-3"></v-radio>
									</v-layout>
								</v-radio-group>
							</v-flex>
							<v-flex xs2>
								<v-subheader class="title">Mobile No</v-subheader>
							</v-flex>
							<v-flex xs4>
								<v-text-field label="Enter Mobile No" single-line solo></v-text-field>
							</v-flex>
						</v-layout>
						<v-divider></v-divider>

						<v-layout class="pl-4 pt-2" row wrap>
							<v-flex lg3 class="mr-3">
								<v-text-field prepend-icon="fas fa-user" counter maxlength="15" label="First Name" required></v-text-field>
							</v-flex>
							<v-flex lg3 class="mr-3">
								<v-text-field counter maxlength="15" label="Middle Name"></v-text-field>
							</v-flex>
							<v-flex lg3 class="mr-3">
								<v-text-field counter maxlength="15" label="Last Name"></v-text-field>
							</v-flex>
						</v-layout>

						<v-layout row wrap class="pl-4">
							<v-flex xs6>
								<v-radio-group prepend-icon="fas fa-transgender-alt" label="Gender" v-model="radioGroup1" row>
									<v-radio label="Male" value="radio-4"></v-radio>
									<v-radio label="Female" value="radio-5"></v-radio>
									<v-radio label="Others" value="radio-6"></v-radio>
								</v-radio-group>
							</v-flex>

							<v-flex xs4>
								<v-combobox prepend-icon="work" :items="items" label="Occupation"></v-combobox>
							</v-flex>

							<v-flex xs6 lg6 class="pr-4">
								<v-text-field prepend-icon="fas fa-envelope" v-model="email" :rules="emailRules" label="Email address" type="email"></v-text-field>
							</v-flex>

							<v-flex xs3>
								<v-text-field prepend-icon="fab fa-whatsapp" label="Whatsapp Number" mask="phone"></v-text-field>
							</v-flex>
							<v-flex xs3>
								<v-checkbox label="Not Same As Phone Number"></v-checkbox>
							</v-flex>
							
							<v-flex xs6 class="pr-4">
								<v-textarea prepend-icon="place" name="input-7-1" label="Residential Address"></v-textarea>
							</v-flex>
						</v-layout>
						<v-divider></v-divider>

						<v-layout row wrap class="pl-4">
							<v-flex xs12 class="pt-4">
								<h4 class="title">Available Plans</h4>
							</v-flex>

							<v-flex>
								<v-radio-group v-model="radioOneDay" row>
									<v-radio label="1 Day" value="radio-1"></v-radio>
									<v-radio label="6 Days" value="radio-2"></v-radio>
									<v-radio label="12 Days" value="radio-3"></v-radio>
								</v-radio-group>
							</v-flex>		
							<!-- <v-flex xs3 class="pt-2">
								<v-menu ref="ODstart" :close-on-content-click="false" v-model="ODstart" :nudge-right="40" lazy transition="scale-transition"
								offset-y full-width max-width="290px" min-width="290px">
									<v-text-field slot="activator" v-model="dateFormatted" label="Start Date"
									hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
									<v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex xs3 class="pl-4 pt-2">
								<v-menu ref="ODend" :close-on-content-click="false" v-model="ODend" :nudge-right="40" lazy transition="scale-transition"
									offset-y full-width>
									<v-text-field slot="activator" v-model="dateFormatted" label="End Date" hint="DD/MM/YYYY"
									persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
									<v-date-picker v-model="date" no-title @input="menu4 = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex xs3 class="pl-4 pt-2">
								<v-text-field prepend-icon="fas fa-calendar-minus" value="10 days" label="Total No. of Days" readonly ></v-text-field>
							</v-flex> -->

							<v-flex xs12 class="pt-2">
								<h4 class="title">Preferable Time Slot</h4>
							</v-flex>

							<v-flex xs12>
								<v-radio-group v-model="radioTime" :mandatory="false">
									<v-layout row align-start>
										<v-radio class="" label="Peak Hours" value="radio-1"></v-radio>
										<v-radio class="" label="Off-peak Hours" value="radio-2"></v-radio>
									</v-layout>
								</v-radio-group>
							</v-flex>	
						</v-layout>	

						<v-card width="100%" height="50px" color="transparent">
							<div class="right pr-2">
								<v-btn dark>Cancel</v-btn>
								<v-btn dark @click="snackbar2 = true" color="orange darken-4" class="mb-2">Submit</v-btn>
								<v-snackbar v-model="snackbar2" :bottom="y === 'bottom'">One-Day Registration Done!
									<v-btn color="orange darken-4" flat @click="snackbar2 = false">Close</v-btn>
								</v-snackbar>
							</div>
						</v-card>
        			</v-card>
				</v-tab-item>
      
	  			<v-tab-item key="c">
        			<v-card height="440px" color="transparent">
						<v-layout class="pt-4" row wrap>
							<v-flex xs2>
								<v-subheader class="title">Mobile No</v-subheader>
							</v-flex>
							<v-flex xs4>
								<v-text-field mask="phone" label="Enter Mobile No" single-line solo></v-text-field>
							</v-flex>
						</v-layout>
						<v-divider></v-divider>

						<v-layout class="pl-4 pt-2" row wrap>
							<v-flex lg3 class="mr-3">
								<v-text-field prepend-icon="fas fa-user" counter maxlength="15" label="First Name" required></v-text-field>
							</v-flex>
							<v-flex lg3 class="mr-3">
								<v-text-field counter maxlength="15" label="Middle Name"></v-text-field>
							</v-flex>
							<v-flex lg3 class="mr-3">
								<v-text-field counter maxlength="15" label="Last Name"></v-text-field>
							</v-flex>
						</v-layout>
			
						<v-layout class="pl-4" row wrap>
							<v-flex class="pt-4" xs4>
								<h4 class="title">Purpose of taking counselling:</h4>
							</v-flex>

							<v-flex xs12>
								<v-layout row align-start>
									<v-checkbox class="" label="General Fitness"></v-checkbox>
									<v-checkbox class="" label="Fat Loss"></v-checkbox>
									<v-checkbox class="" label="Muscle Toning"></v-checkbox>
									<v-checkbox class="" label="Sports Oriented"></v-checkbox>
									<v-checkbox class="" label="Physical"></v-checkbox>
								</v-layout>
								<v-layout>
									<v-checkbox class="" label="Specialised"></v-checkbox>
									<v-checkbox class="" label="Build muscel"></v-checkbox>
									<v-checkbox class="" label="Random"></v-checkbox>
									<v-checkbox class="" label="Random"></v-checkbox>
									<v-checkbox class="" label="Random"></v-checkbox>
								</v-layout>	
							</v-flex>
							
							<v-flex xs3>
								<v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" lazy transition="scale-transition"
								offset-y full-width max-width="290px" min-width="290px">
									<v-text-field slot="activator" v-model="dateFormatted" label="Counseling Date" placeholder="Counseling Date"
									hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
									<v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
								</v-menu>
							</v-flex>

							<v-flex xs3 class="pl-4">
								<v-menu ref="menu1" v-model="menu2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time"
								lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
									<v-text-field slot="activator" v-model="time" label="Counseling Time" prepend-icon="access_time" readonly></v-text-field>
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

@Component({
	components: { Layout, SystemInformation, },
	page : {
		title: "Home",
		meta: [ { name: "description", content: appConfig.description, }, ],
	},
})
export default class Home extends Vue{
	date = new Date().toISOString().substr(0, 10)
	dateFormatted = this.formatDate(this.date)
	time4 = null
	time5 = null
	time = null
	timme = null
	modal4 = false 
	modal5 = false
    menu2 = false
	modal2 = false
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
	radioGroup1 = 1
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
	email = ""
	emailRules = [
		v => (v || '').match(/@/) || 'Please enter a valid email',
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

	parseDate(date) {
		if (!date) return null
		const [day, month, year,] = date.split("/")
		return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
	}
	
}
</script>