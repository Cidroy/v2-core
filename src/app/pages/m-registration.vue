<template>
	<Layout>
		<v-layout row>
			<v-flex xs12 md7>
				<h1 class="text-md-right text-xs-center"> Member Registration </h1>
				<v-radio-group prepend-icon="people" label="Registration Type" v-model="radioGroup1" row>
					<v-radio label="Solo" value="radio-1"></v-radio>
					<v-radio label="Couple" value="radio-2"></v-radio>
					<v-radio label="Group" value="radio-3"></v-radio>
				</v-radio-group>
			</v-flex>
			<v-flex xs12 md5>
				<v-layout justify-end>
					<v-tooltip left>
						<v-btn outline slot="activator">
							<v-icon>print</v-icon>
						</v-btn>
						<span>Print Blank Form</span>
					</v-tooltip>

				</v-layout>
			</v-flex>
		</v-layout>
		<v-stepper v-model="e1">
			<v-stepper-header>
				<v-stepper-step :rules="[() => true]" editable :complete="e1 > 1" step="1">Personal Details </v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step editable :complete="e1 > 2" step="2">Contact Details</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step editable :complete="e1 > 3" step="3">Members Plan</v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step editable step="4">Final Step</v-stepper-step>
			</v-stepper-header>

			<v-stepper-items>
				<v-stepper-content step="1"> <step-one v-model="userData" @nextStep="step2" allowImportFromEnquiry/> </v-stepper-content>

				<v-stepper-content step="2">
					<v-card class="mb-2" color="transparent" height="380px">
						<v-layout row wrap>
							<v-flex xs3 lg4 class="pr-2">
								<v-text-field prepend-icon="fas fa-mobile-alt" v-model="phone" :rules="phoneRules" label="Mobile Number" mask="phone" required></v-text-field>
							</v-flex>
							<v-flex xs3 lg4 class="pl-2">
								<v-text-field prepend-icon="fab fa-whatsapp" label="Whatsapp Number" mask="phone"></v-text-field>
							</v-flex>
							<v-flex xs3 lg4>
								<v-checkbox label="Not Same As Phone Number"></v-checkbox>
							</v-flex>

							<v-flex xs3 lg4 class="pr-2">
								<v-text-field prepend-icon="fas fa-phone" label="Home Number" mask="phone"></v-text-field>
							</v-flex>
							<v-flex xs3 lg4 class="pl-2">
								<v-text-field prepend-icon="fas fa-building" label="Office Number" mask="phone"></v-text-field>
							</v-flex>

							<v-flex xs6 lg6>
								<v-text-field prepend-icon="fas fa-envelope" v-model="email" :rules="emailRules" label="Email address" type="email"></v-text-field>
							</v-flex>

							<v-flex xs12 lg12>
								<v-card class="mb-2 mt-4 pa-2" height="100px" elevation="0">
									<h3 class="pl-4">Incase Of Emergency</h3>
									<v-layout row wrap class="pl-4">
										<v-flex xs12 lg5 class="pr-2">
											<v-text-field label="Contact Name"></v-text-field>
										</v-flex>
										<v-flex xs12 lg5 class="pl-2">
											<v-text-field label="Contact Number" mask="phone"></v-text-field>
										</v-flex>
									</v-layout>
								</v-card>
							</v-flex>
						</v-layout>
					</v-card>

					<div class="right">
						<v-btn dark>Cancel</v-btn>
						<v-btn dark color="orange darken-4" @click="e1 = 3"> NEXT </v-btn>
					</div>

				</v-stepper-content>

				<v-stepper-content step="3">
					<v-card class="mb-2" color="transparent" height="320px">
						<h3>Type Of Membership</h3>
						<v-layout row wrap xs6>
							<v-checkbox v-model="CBTypeMem" class="ml-4" label="Gold" value="Gold"></v-checkbox>
							<v-checkbox v-model="CBTypeMem" label="Platinum" value="Platinum"></v-checkbox>
						</v-layout>
						<v-divider></v-divider>
						<h3 class="pt-2">Membership Duration</h3>
						<v-layout row wrap>
							<v-checkbox v-model="CBMemDuration" class="ml-4" label="Monthly" value="Monthly"></v-checkbox>
							<v-checkbox v-model="CBMemDuration" label="Quaterly" value="Quaterly"></v-checkbox>
							<v-checkbox v-model="CBMemDuration" label="Half-Yearly" value="Half-Yearly"></v-checkbox>
							<v-checkbox v-model="CBMemDuration" label="Yearly" value="Yearly"></v-checkbox>
						</v-layout>
						<v-divider></v-divider>
						<h3 class="pt-2">Preferable Time Slot:</h3>
						<v-radio-group v-model="radios" :mandatory="false">
							<v-layout row wrap>
								<v-radio class="ml-4 mt-1" label="Peak Hours" value="radio-7"></v-radio>
								<v-radio class="ml-4" label="Off-Peak Hours" value="radio-8"></v-radio>
							</v-layout>
						</v-radio-group>
						<!--v-divider></v-divider>
						<v-checkbox class="ml-4" label="Apply for Personal Training Program" value="PT"></v-checkbox-->
					</v-card>

					<div class="right">
						<v-btn dark>Cancel</v-btn>
						<v-btn dark color="orange darken-4" @click="e1 = 4"> NEXT </v-btn>
					</div>

				</v-stepper-content>

				<v-stepper-content step="4">
					<v-card class="mb-2" color="transparent" height="480px">
						<v-layout row wrap>

							<v-flex xs2>
								<v-subheader class="subheading">Member ID</v-subheader>
							</v-flex>
							<v-flex xs4>
								<v-text-field label="Enter or Generate ID" single-line solo></v-text-field>
							</v-flex>
							<v-flex xs2>
								<v-btn dark :loading="loading" :disabled="loading" color="secondary" @click="loader = 'loading'">Generate</v-btn>
							</v-flex>

							<v-flex xs12 lg6 class="pa-1">
								<v-combobox prepend-icon="fas fa-star" v-model="select" :items="purposes" label="Purpose of Joining Gym" multiple chips hint="Maximum 3 choices"
								 persistent-hint clearable deletable-chips></v-combobox>
							</v-flex>
							<v-spacer></v-spacer>
							<v-flex xs5 md5 class="pa-1 pt-3">
								<v-menu ref="menu4" :close-on-content-click="false" v-model="menu4" :nudge-right="40" lazy transition="scale-transition"
								 offset-y full-width>
									<v-text-field slot="activator" v-model="dateFormatted" label="Date of Joining" prepend-icon="event" hint="DD/MM/YYYY"
									 persistent-hint @blur="date = parseDate(dateFormatted)"></v-text-field>
									<v-date-picker v-model="date" no-title @input="menu4 = false"></v-date-picker>
								</v-menu>
							</v-flex>

							<v-flex xs12 class="pt-5 pl-2">
								<span class="title font-weight-regular">Allow Door Access</span>
								<v-layout align-start row>
									<v-checkbox label="Gym Mens Section" value="Gym Mens Section"></v-checkbox>
									<v-checkbox label="Gym Ladies Section" value="Gym Ladies Section"></v-checkbox>
									<v-checkbox label="Full Gym Section" value="Full Gym Section"></v-checkbox>
									<v-checkbox label="SPA" value="SPA"></v-checkbox>
								</v-layout>
							</v-flex>

							<v-flex xs12 class="pt-2 pl-2">
								<span class="title font-weight-regular">How did you hear of us?</span>
								<v-layout align-start row>
									<v-checkbox v-model="selected" label="Family/Friends" value="Family/Friends"></v-checkbox>
									<v-checkbox v-model="selected" label="Advertisement" value="Advertisement"></v-checkbox>
									<v-checkbox v-model="selected" label="Walk-In" value="Walk-In"></v-checkbox>
									<v-checkbox v-model="selected" label="Internet" value="Internet"></v-checkbox>
									<v-checkbox v-model="selected" label="Recommendation" value="Recommendation"></v-checkbox>
									<v-checkbox v-model="selected" label="Telephonic" value="Telephonic"></v-checkbox>
								</v-layout>
							</v-flex>

							<v-flex xs12 pl-2>
								<v-layout align-end justify-start reverse fill-height>
									<v-checkbox v-model="checkbox">
										<div slot="label">
											I agree to Gym
											<v-tooltip bottom>
												<a slot="activator" @click.stop>Rules & Regulations</a>
												Opens in new window
											</v-tooltip>
											followed by
											<v-tooltip bottom>
												<a slot="activator" @click.stop>Terms & Conditions.</a>
												Opens in new window
											</v-tooltip>
										</div>
									</v-checkbox>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-card>

					<div class="right">
						<v-btn dark>Cancel</v-btn>
						<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
							<v-btn dark slot="activator" color="orange darken-4" class="mb-2">Submit</v-btn>
							<v-card>
								<v-toolbar dark color="primary">
									<v-btn icon dark @click="dialog = false">
										<v-icon>close</v-icon>
									</v-btn>
									<v-toolbar-title>Verify The Details</v-toolbar-title>
									<v-spacer></v-spacer>
								</v-toolbar>
								<v-card>
									<v-layout row wrap>
										<v-flex xs9>
										<h2 class="title pt-2 pl-4">Personal Details:-</h2>
											
											<v-layout row wrap>
												<v-icon class="pt-3 pl-4">fas fa-user</v-icon>
												<v-flex xs2 class="pt-2">
													<v-subheader class="title">Full Name:</v-subheader>
												</v-flex>
												<v-flex xs9>
													<v-text-field value="Tony Stark" readonly></v-text-field>
												</v-flex>
												
												<v-icon class="pt-3 pl-4">fas fa-transgender-alt</v-icon>
												 <v-flex xs2 class="pt-2">
													<v-subheader class="title">Gender:</v-subheader>
												</v-flex>
												<v-flex xs3>
													<v-text-field value="Male" readonly></v-text-field>
												</v-flex>

												<v-icon class="pt-3 pl-3">fas fa-birthday-cake</v-icon>
												 <v-flex xs2 class="pt-2">
													<v-subheader class="title">DOB:</v-subheader>
												</v-flex>
												<v-flex xs4>
													<v-text-field value="02/11/1996" readonly></v-text-field>
												</v-flex>

												<v-icon class="pt-3 pl-4">work</v-icon>
												 <v-flex xs2 class="pt-2">
													<v-subheader class="title">Occupation:</v-subheader>
												</v-flex>
												<v-flex xs3>
													<v-text-field value="Teacher" readonly></v-text-field>
												</v-flex>

												<v-icon class="pt-3 pl-2">list</v-icon>
												 <v-flex xs2 class="pt-2">
													<v-subheader class="title">Category:</v-subheader>
												</v-flex>
												<v-flex xs4>
													<v-text-field value="General" readonly></v-text-field>
												</v-flex>

												<v-icon class="pt-3 pl-4">fas fa-id-card</v-icon>
												 <v-flex xs2 class="pt-2">
													<v-subheader class="title">ID Proof:</v-subheader>
												</v-flex>
												<v-flex xs3>
													<v-text-field value="Aadhaar Card" readonly></v-text-field>
												</v-flex>

												<v-icon class="pt-3 pl-2">fas fa-hashtag</v-icon>
												 <v-flex xs2 class="pt-2">
													<v-subheader class="title">ID Number:</v-subheader>
												</v-flex>
												<v-flex xs4>
													<v-text-field value="12345" readonly></v-text-field>
												</v-flex>

												<v-icon class="pt-3 pl-4">place</v-icon>
												 <v-flex xs2 class="pt-2">
													<v-subheader class="title">Residential Address:</v-subheader>
												</v-flex>
												<v-flex xs3>
													<v-text-field value="farmagudi, ponda, goa" readonly></v-text-field>
												</v-flex>

												<v-icon class="pt-3 pl-2">accessibility</v-icon>
												 <v-flex xs2 class="pt-2">
													<v-subheader class="title">Body Type:</v-subheader>
												</v-flex>
												<v-flex xs4>
													<v-text-field value="Endomorph" readonly></v-text-field>
												</v-flex>

												
											</v-layout>
										</v-flex>
										<v-flex xs3>
											<v-layout class="justify-center">
												<v-flex xs8 mt-4>
													<v-card>
														<v-img :src="photo" height="200px" />				
													</v-card>
												</v-flex>
											</v-layout>
										</v-flex>
									</v-layout>

										<v-divider></v-divider>

									<v-layout row wrap>
											<h2 class="title pt-2 pl-4">Contact Details:-</h2>
												<v-flex>
													<v-layout row wrap>
														<v-icon class="pt-3 pl-4">fas fa-mobile-alt</v-icon>
														<v-flex xs2 class="pt-2">
															<v-subheader class="title">Mobile Number:</v-subheader>
														</v-flex>
														<v-flex xs3>
															<v-text-field value="8215859002" readonly></v-text-field>
														</v-flex>

														<v-icon class="pt-3 pl-3">fab fa-whatsapp</v-icon>
														<v-flex xs2 class="pt-2">
															<v-subheader class="title">Whatsapp Number:</v-subheader>
														</v-flex>
														<v-flex xs4>
															<v-text-field value="8215859001" readonly></v-text-field>
														</v-flex>

														<v-icon class="pt-3 pl-4">fas fa-phone</v-icon>
														<v-flex xs2 class="pt-2">
															<v-subheader class="title">Home Number:</v-subheader>
														</v-flex>
														<v-flex xs3>
															<v-text-field value="0832859001" readonly></v-text-field>
														</v-flex>

														<v-icon class="pt-3 pl-3">fas fa-building</v-icon>
														<v-flex xs2 class="pt-2">
															<v-subheader class="title">Office Number:</v-subheader>
														</v-flex>
														<v-flex xs4>
															<v-text-field value="8215859001" readonly></v-text-field>
														</v-flex>

														<v-icon class="pt-3 pl-4">fas fa-envelope</v-icon>
														<v-flex xs2 class="pt-2">
															<v-subheader class="title">Email address:</v-subheader>
														</v-flex>
														<v-flex xs9>
															<v-text-field value="tonystark@gmail.com" readonly></v-text-field>
														</v-flex>

														<v-flex xs12>
														<h4 class="pl-4">Incase Of Emergency:-</h4>
														</v-flex>

														<v-icon class="pt-3 pl-4">fas fa-user</v-icon>
														<v-flex xs2 class="pt-2">
															<v-subheader class="title">Contact Name:</v-subheader>
														</v-flex>
														<v-flex xs3>
															<v-text-field value="0832859001" readonly></v-text-field>
														</v-flex>

														<v-icon class="pt-3 pl-3">fas fa-mobile-alt</v-icon>
														<v-flex xs2 class="pt-2">
															<v-subheader class="title">Contact Number:</v-subheader>
														</v-flex>
														<v-flex xs4>
															<v-text-field value="8215859001" readonly></v-text-field>
														</v-flex>
													</v-layout>
												</v-flex>
									</v-layout>

										<v-divider></v-divider>
									
									<v-layout row wrap>
										<v-flex xs12>
											<h2 class="title pt-2 pl-4">Member Plans:-</h2>
										</v-flex>
											<v-flex>
												<v-layout row wrap>
													<v-icon class="pt-3 pl-4">fas fa-user</v-icon>
														<v-flex xs1 class="pt-2">
															<v-subheader class="title">Type:</v-subheader>
														</v-flex>
														<v-flex xs2>
															<v-text-field value="Gold" readonly></v-text-field>
														</v-flex>

														<v-icon class="pt-3 pl-3">fas fa-mobile-alt</v-icon>
														<v-flex xs1 class="pt-2">
															<v-subheader class="title">Duration:</v-subheader>
														</v-flex>
														<v-flex xs2>
															<v-text-field value="Monthly" readonly></v-text-field>
														</v-flex>

														<v-icon class="pt-3 pl-3">fas fa-mobile-alt</v-icon>
														<v-flex xs2 class="pt-2">
															<v-subheader class="title">Time Slot:</v-subheader>
														</v-flex>
														<v-flex xs2>
															<v-text-field value="Peak Hours" readonly></v-text-field>
														</v-flex>
												</v-layout>
											</v-flex>
									</v-layout>

										<v-divider></v-divider>

									<v-layout row wrap>
										<v-flex xs12>
											<h2 class="title pt-2 pl-4">Final Step:-</h2>
										</v-flex>
											<v-flex>
												<v-layout row wrap>
														<v-icon class="pt-3 pl-4">fas fa-user</v-icon>
														<v-flex xs2 class="pt-2">
															<v-subheader class="title">Member ID:</v-subheader>
														</v-flex>
														<v-flex xs3>
															<v-text-field value="12545555" readonly></v-text-field>
														</v-flex>

														<v-icon class="pt-3 pl-3">fas fa-mobile-alt</v-icon>
														<v-flex xs2 class="pt-2">
															<v-subheader class="title">Purpose Of Joining:</v-subheader>
														</v-flex>
														<v-flex xs4>
															<v-text-field value="Fat loss, Lifestyle, Tone Up" readonly></v-text-field>
														</v-flex>

														<v-icon class="pt-3 pl-4">fas fa-user</v-icon>
														<v-flex xs2 class="pt-2">
															<v-subheader class="title">Date Of Joining:</v-subheader>
														</v-flex>
														<v-flex xs3>
															<v-text-field value="02/02/2019" readonly></v-text-field>
														</v-flex>

														<v-icon class="pt-3 pl-3">fas fa-mobile-alt</v-icon>
														<v-flex xs2 class="pt-2">
															<v-subheader class="title">Door Access:</v-subheader>
														</v-flex>
														<v-flex xs4>
															<v-text-field value="Full Gym Section" readonly></v-text-field>
														</v-flex>
												</v-layout>

											<v-divider></v-divider>
											</v-flex>
												<div class="right">
													<v-btn dark color="orange darken-4" class="mb-2" to="/payment">Proceed To Pay</v-btn>
												</div>
									</v-layout>

									
								</v-card>
							</v-card>
						</v-dialog>
					</div>

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

import stepOne from "@/components/m-registration/step-1.vue"

@Component({
	components: { Layout, SystemInformation, stepOne },
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
})
export default class Home extends Vue {
	get photo(){
		return "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
	}
	userData = {
		firstName : "",
		middleName : "",
		lastName : "",
	}
	@Watch("userData") onUserDataChange(newVal){ console.log(newVal) }

	firstname =""
	formHasErrors: boolean = false
	valid: boolean = false
	importDialog = false
	checkbox = []
	search = ""
	selected = null
	CBTypeMem = null
	CBMemDuration = null
	residential = ""
	email = ""
	phone = ""
	phoneRules = [
		v => !!v || "Number is required",
	]
	emailRules = [
		v => (v || '').match(/@/) || 'Please enter a valid email',
	]
	nameRules = [
		v => !!v || "Name is required",
		v => v.length <= 30 || "Name must be less than 30 characters",
	]
	LastnameRules = [
		v => !!v || "Name is required"
	]

	row = null
	e1 = 0
	date = new Date().toISOString().substr(0, 10)
	dateFormatted = this.formatDate(this.date)
	radioGroup1 = 'radio-1'
	radioGroup2 = "radio-4"
	menu1 = false
	menu4 = false
	select = []
	purposes = [
		'General Fitness',
		'Lose Fat',
		'Gain Muscle',
		'Tone Up',
		'Sports Oriented',
		'Lifestyle',
		'Transform',
		'Specialized Training'
	]
	loader = null
	radios = 'radio-7'
	test = 'Monthly'
	loading = false
	dialog = false

	@Watch("select")
	onSelectMax(val) {
		if (val.length > 3) {
			this.$nextTick(() => this.select.pop())
		}
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

	step2(){
		this.e1 = 2
	}
}
</script>