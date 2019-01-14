<template>
	<Layout>
		<h1 class="text-md-center">Registrations</h1>
		<div>
    <v-tabs v-model="active" color="cyan  darken-4" dark slider-color="yellow">
      <v-tab v-for="(name, key) in tabsList" :key="key" ripple>
        {{ name }}
      </v-tab>
      <v-tab-item key="a">
        <v-card height="720px">
			<v-layout class="pt-4" row wrap>
				<v-flex xs2>
					<v-subheader class="title">Mobile No</v-subheader>
				</v-flex>
				<v-flex xs4>
					<v-text-field  label="Enter Mobile No" single-line solo></v-text-field>
				</v-flex>
				<v-spacer></v-spacer>
				<v-flex xs3 class="pr-4">
					<v-text-field value="4656" label="Member ID" readonly ></v-text-field>
				</v-flex>
			</v-layout>
			<v-divider></v-divider>
				<v-flex class="pl-4 pt-2" xs6>
					<v-text-field value="John Doe" label="Name" readonly ></v-text-field>
				</v-flex>

			<v-layout class="pl-4" row wrap>
				<v-flex class="pr-4" xs4>
					<v-text-field value="xxxx" label="Current Program" readonly ></v-text-field>
				</v-flex>
				<v-flex xs4>
					<v-text-field value="YYYY" label="Current Package" readonly ></v-text-field>
				</v-flex>
			</v-layout>
			<v-flex xs4>
				<v-subheader class="title">Purpose of taking Personal Training:</v-subheader>
			</v-flex>
			<v-layout class="pr-2" row wrap>
				<v-checkbox class="ml-4" label="General Fitness"></v-checkbox>
				<v-checkbox class="pl-5" label="Fat Loss"></v-checkbox>
				<v-checkbox class="pl-5" label="Muscle Toning"></v-checkbox>
				<v-checkbox class="pl-5" label="Sports Oriented"></v-checkbox>
				<v-checkbox class="pl-5" label="Physical"></v-checkbox>
				<v-checkbox class="pl-5" label="Specialised"></v-checkbox>
				<v-checkbox class="pl-5" label="Build muscel"></v-checkbox>
				<v-checkbox class="pl-5" label="Random"></v-checkbox>
				<v-checkbox class="pl-5" label="Random"></v-checkbox>
				<v-checkbox class="pl-5" label="Random"></v-checkbox>
				<v-checkbox class="pl-5" label="Random"></v-checkbox>
			</v-layout>
			<v-layout class="pl-2" row wrap>
				<v-subheader class="title">Preffered Workout Time:</v-subheader>
				<v-flex xs2 class="mr-4 mt-3">
					<v-menu ref="menu4" v-model="modal4" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time4"
						lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
						<v-text-field slot="activator" v-model="time4" label="Time From" prepend-icon="access_time" readonly></v-text-field>
						<v-time-picker v-if="modal4" v-model="time4" full-width @change="$refs.menu4.save(time4)"></v-time-picker>
					</v-menu>
    			</v-flex>
				<v-flex xs2 class="mr-4 mt-3">
					<v-menu ref="menu5" v-model="modal2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="timme"
						lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
						<v-text-field slot="activator" v-model="timme" label="Time To" prepend-icon="access_time" readonly></v-text-field>
						<v-time-picker v-if="modal2" v-model="timme" full-width @change="$refs.menu5.save(timme)"></v-time-picker>
					</v-menu>
    			</v-flex>
			</v-layout>
			<v-flex xs4>
				<v-subheader class="title">Select The Personal Training Program:</v-subheader>
			</v-flex>
			<v-radio-group v-model="radios" :mandatory="false">
				<v-layout row wrap>
					<v-radio class="ml-4 mt-1" label="Peak Hours" value="radio-1"></v-radio>
					<v-radio class="ml-4" label="Off-Peak Hours" value="radio-2"></v-radio>
					<v-radio class="ml-4" label="Off-Peak Hours" value="radio-3"></v-radio>
					<v-radio class="ml-4" label="Off-Peak Hours" value="radio-4"></v-radio>
					<v-radio class="ml-4" label="Off-Peak Hours" value="radio-5"></v-radio>
					<v-radio class="ml-4" label="Off-Peak Hours" value="radio-6"></v-radio>
					<v-radio class="ml-4" label="Off-Peak Hours" value="radio-7"></v-radio>
				</v-layout>
			</v-radio-group>
			<v-btn class="right mb-3" right>Submit</v-btn>
			<v-btn class="right mb-3" flat right>Cancel</v-btn>
        </v-card>
      </v-tab-item>
      <v-tab-item key="b">
        <v-card flat>
          <span>yeah b</span>
        </v-card>
      </v-tab-item>
      <v-tab-item key="c">
        <v-card height="500px">
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
			<v-flex xs4>
				<v-subheader class="title">Purpose of taking counselling:</v-subheader>
			</v-flex>
			<v-layout class="pr-2" row wrap>
				<v-checkbox class="ml-4" label="General Fitness"></v-checkbox>
				<v-checkbox class="pl-5" label="Fat Loss"></v-checkbox>
				<v-checkbox class="pl-5" label="Muscle Toning"></v-checkbox>
				<v-checkbox class="pl-5" label="Sports Oriented"></v-checkbox>
				<v-checkbox class="pl-5" label="Physical"></v-checkbox>
				<v-checkbox class="pl-5" label="Specialised"></v-checkbox>
				<v-checkbox class="pl-5" label="Build muscel"></v-checkbox>
				<v-checkbox class="pl-5" label="Random"></v-checkbox>
				<v-checkbox class="pl-5" label="Random"></v-checkbox>
				<v-checkbox class="pl-5" label="Random"></v-checkbox>
				<v-checkbox class="pl-5" label="Random"></v-checkbox>
			</v-layout>
			<v-divider></v-divider>
			<v-layout class="pr-2" row wrap>
				<v-flex xs5 class="ml-4 mt-3">
					<v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" lazy transition="scale-transition"
						offset-y full-width max-width="290px" min-width="290px">
					<v-text-field slot="activator" v-model="dateFormatted" label="Date of Birth" placeholder="Date of Birth"
						hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
					<v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
					</v-menu>
				</v-flex>
				<v-spacer></v-spacer>

				<v-flex xs2 class="mr-4 mt-3">
					<v-menu ref="menu1" v-model="menu2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time"
						lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
						<v-text-field slot="activator" v-model="time" label="Time From" prepend-icon="access_time" readonly></v-text-field>
						<v-time-picker v-if="menu2" v-model="time" full-width @change="$refs.menu1.save(time)"></v-time-picker>
					</v-menu>
    			</v-flex>
				<v-flex xs2 class="mr-4 mt-3">
					<v-menu ref="menu3" v-model="modal5" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time5"
						lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
						<v-text-field slot="activator" v-model="time5" label="Time To" prepend-icon="access_time" readonly></v-text-field>
						<v-time-picker v-if="modal5" v-model="time5" full-width @change="$refs.menu3.save(time5)"></v-time-picker>
					</v-menu>
    			</v-flex>
			</v-layout>
			<v-btn class="right mt-2" right>Submit</v-btn>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <div class="text-xs-center mt-3">
      <v-btn @click="next">
        next tab
      </v-btn>
    </div>
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
	active: number = 0
	radios = 'radio-7'
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