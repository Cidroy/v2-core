<template>
	<Layout>
		<h1 class="text-md-center">Bookings</h1>

		<div>
			<v-tabs v-model="active" color="grey darken-4" dark slider-color="orange darken-4">
      			<v-tab v-for="(name, key) in tabsList" :key="key" ripple>{{ name }}</v-tab>
				
				<v-tab-item key="a">
        			<v-card color="#303030">
						<v-layout row wrap>
							<v-flex class="pl-2 ml-2" xs12>
								<v-radio-group row label="SPA Booking Type: " v-model="radioTop" :mandatory="false">
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
								<v-checkbox label="Same As Phone Number"></v-checkbox>
							</v-flex>
							
							<v-flex xs6 class="pr-4">
								<v-textarea prepend-icon="place" name="input-7-1" label="Residential Address"></v-textarea>
							</v-flex>
						</v-layout>
						<v-divider></v-divider>

						<v-layout row wrap class="pt-4 pl-4">
							<v-flex xs12>
								<h4 class="title">Select SPA Plan</h4>
							</v-flex>

							<v-flex xs12>
								<v-radio-group v-model="radios1" :mandatory="false">
									<v-layout row align-start>
										<v-radio class="" label="Steam Usage" value="radio-1"></v-radio>
										<v-radio class="" label="Jacuzzi Usage" value="radio-2"></v-radio>
										<v-radio class="" label="Steam & Jacuzzi" value="radio-3"></v-radio>
									</v-layout>
								</v-radio-group>
							</v-flex>	
						</v-layout>

						<v-card width="100%" height="50px" color="#303030">
							<div class="right pr-2">
								<v-btn flat>Cancel</v-btn>
								<v-btn @click="snackbar1 = true" color="orange darken-4" class="mb-2">Submit</v-btn>
								<v-snackbar v-model="snackbar1" :bottom="y === 'bottom'">SPA Booking Done!
									<v-btn color="orange darken-4" flat @click="snackbar1 = false">Close</v-btn>
								</v-snackbar>
							</div>
						</v-card>
        			</v-card>
      			</v-tab-item>

				<v-tab-item key="b">
        			<v-card flat color="#303030">
						<span>ground booking coming soon</span>
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
	active: number = 0
	tabsList = {
		a: "SPA Booking",
		b: "Ground Booking",
	}
	firstname = ""
	nameRules = [
		v => !!v || "Name is required",
		v => v.length <= 15 || "Name must be less than 15 characters",
	]
	radioGroup1 = 1
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
    y= 'top'
	mode= ''
	timeout= 6000
	radioTop = 'radio-1'
	radios1 = 'radio-1'

}
</script>