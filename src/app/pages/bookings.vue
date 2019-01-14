<template>
	<Layout>
		<h1 class="text-md-center">Bookings</h1>

		<div>
			<v-tabs v-model="active" color="grey darken-4" dark slider-color="orange darken-4">
      			<v-tab v-for="(name, key) in tabsList" :key="key" ripple>{{ name }}</v-tab>
				<v-tab-item key="a">
        			<v-card flat>
						<v-layout class="pt-4" row wrap>
							<v-flex xs2>
								<v-subheader class="title">Mobile No</v-subheader>
							</v-flex>
							<v-flex xs4>
								<v-text-field label="Enter Mobile No" single-line solo></v-text-field>
							</v-flex>
						</v-layout>

						<v-layout row wrap class="pa-2">
							<v-flex xs12 lg4 class="px-1">
								<v-text-field prepend-icon="fas fa-user" v-model="firstname" :rules="nameRules" counter maxlength="15" label="First Name"
								required></v-text-field>
							</v-flex>
							<v-flex xs12 lg4 class="px-1">
								<v-text-field counter maxlength="15" label="Middle Name"></v-text-field>
							</v-flex>
							<v-flex xs12 lg4 class="px-1">
								<v-text-field counter maxlength="15" label="Last Name"></v-text-field>
							</v-flex>

							<v-flex xs12 lg6>
								<v-radio-group prepend-icon="fas fa-transgender-alt" label="Gender" v-model="radioGroup1" row>
									<v-radio label="Male" value="radio-4"></v-radio>
									<v-radio label="Female" value="radio-5"></v-radio>
									<v-radio label="Others" value="radio-6"></v-radio>
								</v-radio-group>
							</v-flex>

							<v-flex xs12 lg6 class="pr-2 pl-4">
								<v-combobox prepend-icon="work" :items="items" label="Occupation"></v-combobox>
							</v-flex>

							<v-flex xs6 lg6>
								<v-text-field prepend-icon="fas fa-envelope" v-model="email" :rules="emailRules" label="Email address" type="email"></v-text-field>
							</v-flex>

							<v-flex xs3 class="pl-4">
								<v-text-field prepend-icon="fab fa-whatsapp" label="Whatsapp Number" mask="phone"></v-text-field>
							</v-flex>
							<v-flex xs3>
								<v-checkbox label="Same As Phone Number"></v-checkbox>
							</v-flex>
							
							<v-flex xs12 lg8 class="pr-2">
								<v-textarea prepend-icon="place" name="input-7-1" label="Residential Address"></v-textarea>
							</v-flex>
						</v-layout>

						<v-card width="100%" height="50px">
							<div class="right pr-2">
								<v-btn flat>Cancel</v-btn>
								<v-btn @click="snackbar = true" color="orange darken-4" class="mb-2">Submit</v-btn>
								<v-snackbar v-model="snackbar" :bottom="y === 'bottom'">Freezing has been Initiated!
									<v-btn color="orange darken-4" flat @click="snackbar = false">Close</v-btn>
								</v-snackbar>
							</div>
						</v-card>
        			</v-card>
      			</v-tab-item>

				<v-tab-item key="b">
        			<v-card flat>
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

}
</script>