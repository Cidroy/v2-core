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
				<v-stepper-content step="1">
					<v-card class="mb-2" color="transparent" height="500px">
						<v-layout row wrap>

							<v-flex xs9>
								<v-layout row wrap>
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
										<v-radio-group prepend-icon="fas fa-transgender-alt" label="Gender" v-model="radioGroup2" row>
											<v-radio label="Male" value="radio-4"></v-radio>
											<v-radio label="Female" value="radio-5"></v-radio>
											<v-radio label="Others" value="radio-6"></v-radio>
										</v-radio-group>
									</v-flex>
									<v-flex xs12 lg6 class="mb-2">
										<v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" lazy transition="scale-transition"
										 offset-y full-width max-width="290px" min-width="290px">
											<v-text-field slot="activator" v-model="dateFormatted" label="Date of Birth" placeholder="Date of Birth"
											 hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
											<v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
										</v-menu>
									</v-flex>
									<v-flex xs12 lg6 class="pr-2">
										<v-combobox prepend-icon="work" :items="items" label="Occupation"></v-combobox>
									</v-flex>
									<v-flex xs12 lg6 class="pl-2">
										<v-select prepend-icon="list" :items="Category" label="Category"></v-select>
									</v-flex>
									<v-flex xs12 lg6 class="pr-2">
										<v-select prepend-icon="fas fa-id-card" :items="idProof" label="ID Proof"></v-select>
									</v-flex>
									<v-flex xs12 lg6 class="pl-2">
										<v-text-field prepend-icon="fas fa-hashtag" counter maxlength="16" label="ID Number"></v-text-field>
									</v-flex>
									<v-flex xs12 lg8 class="pr-2">
										<v-textarea prepend-icon="place" name="input-7-1" label="Residential Address"></v-textarea>
									</v-flex>
									<v-flex xs12 lg4 class="pl-2">
										<v-select prepend-icon="accessibility" :items="bodyType" label="Body Type"></v-select>
									</v-flex>

									<v-spacer></v-spacer>
								</v-layout>
							</v-flex>
							<v-flex xs3 class="pa-4">
								<v-dialog v-model="importDialog" persistent>
									<v-btn outline block slot="activator" color="orange darken-4">Import from Enquiry</v-btn>
									<v-card>
										<v-toolbar card dark color="orange darken-4">
											<v-toolbar-title>Import Details from Enquiry</v-toolbar-title>
										</v-toolbar>
										<v-card-text>
											<label class="title">Search by Mobile No.</label>
											<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
										</v-card-text>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn color="orange darken-4" @click="importDialog = false">Cancel</v-btn>
											<v-btn color="orange darken-4" @click="importDialog = false">Submit</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
								<v-card>
									<v-img :src="cards[0].src" height="200px" />
									<v-btn block>
										<v-icon>add</v-icon> Add Photo
									</v-btn>
								</v-card>

							</v-flex>
						</v-layout>
					</v-card>
					<div class="right">
						<v-btn flat click="$refs.form.reset()">Cancel</v-btn>
						<v-btn @click="e1 = 2"> NEXT </v-btn>
					</div>
				</v-stepper-content>

				<v-stepper-content step="2">
					<v-card class="mb-2" color="transparent" height="400px">
						<v-layout row wrap>
							<v-flex xs3 lg4 class="pr-2">
								<v-text-field prepend-icon="fas fa-mobile-alt" v-model="phone" :rules="phoneRules" label="Mobile Number" mask="phone" required></v-text-field>
							</v-flex>
							<v-flex xs3 lg4 class="pl-2">
								<v-text-field prepend-icon="fab fa-whatsapp" label="Whatsapp Number" mask="phone"></v-text-field>
							</v-flex>
							<v-flex xs3 lg4>
								<v-checkbox label="Same As Phone Number"></v-checkbox>
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
						<v-btn flat>Cancel</v-btn>
						<v-btn @click="e1 = 3"> NEXT </v-btn>
					</div>

				</v-stepper-content>

				<v-stepper-content step="3">
					<v-card class="mb-2" color="transparent" height="400px">
						<h3>Type Of Membership</h3>
						<v-layout row wrap xs6>
							<v-checkbox class="ml-4" label="Gold"></v-checkbox>
							<v-checkbox label="Platinum"></v-checkbox>
						</v-layout>
						<v-divider></v-divider>
						<h3>Membership Duration</h3>
						<v-layout row wrap>
							<v-checkbox class="ml-4" label="Monthly"></v-checkbox>
							<v-checkbox label="Quaterly"></v-checkbox>
							<v-checkbox label="Half-Yearly"></v-checkbox>
							<v-checkbox label="Yearly"></v-checkbox>
						</v-layout>
						<v-divider></v-divider>
						<h3>Preferable Time Slot:</h3>
						<v-radio-group v-model="radios" :mandatory="false">
							<v-layout row wrap>
								<v-radio class="ml-4 mt-1" label="Peak Hours" value="radio-7"></v-radio>
								<v-radio class="ml-4" label="Off-Peak Hours" value="radio-8"></v-radio>
							</v-layout>
						</v-radio-group>
						<v-divider></v-divider>
						<v-checkbox class="ml-4" label="Apply for Personal Training Program" value="PT"></v-checkbox>
					</v-card>

					<div class="right">
						<v-btn flat>Cancel</v-btn>
						<v-btn @click="e1 = 4"> NEXT </v-btn>
					</div>

				</v-stepper-content>

				<v-stepper-content step="4">
					<v-card class="mb-2" color="transparent" height="400px">
						<v-layout row wrap>

							<v-flex xs1>
								<v-subheader>Member ID</v-subheader>
							</v-flex>
							<v-flex xs4>
								<v-text-field label="Enter or Generate ID" single-line solo></v-text-field>
							</v-flex>
							<v-flex xs2>
								<v-btn :loading="loading" :disabled="loading" color="secondary" @click="loader = 'loading'">Generate</v-btn>
							</v-flex>

							<v-flex xs12 lg6 class="pa-1">
								<v-combobox v-model="select" :items="purposes" label="Purpose of Joining Gym" multiple chips hint="Maximum 3 choices"
								 persistent-hint clearable deletable-chips></v-combobox>
							</v-flex>
							<v-spacer></v-spacer>
							<v-flex xs5 md5 class="pa-1 pt-3">
								<v-menu ref="menu4" :close-on-content-click="false" v-model="menu4" :nudge-right="40" lazy transition="scale-transition"
								 offset-y full-width>
									<v-text-field slot="activator" v-model="dateFormatted" label="Date of Joining" hint="DD/MM/YYYY"
									 persistent-hint @blur="date = parseDate(dateFormatted)"></v-text-field>
									<v-date-picker v-model="date" no-title @input="menu4 = false"></v-date-picker>
								</v-menu>
							</v-flex>

							<v-flex xs12 class="pt-5">
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

							<v-flex xs12>
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
						<v-btn flat>Cancel</v-btn>
						<v-dialog v-model="dialog" persistent max-width="500px">
							<v-btn slot="activator" color="orange darken-4" class="mb-2">Submit</v-btn>
							<v-card>
								<v-toolbar card dark color="orange darken-4">
									<v-toolbar-title>Choose Wisely</v-toolbar-title>
								</v-toolbar>
								<v-card-text>
									<label class="title">Do you want to Proceed for payments?</label>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="orange darken-4" @click="dialog = false" to="/payment">Yes</v-btn>
									<v-btn color="orange darken-4" @click="dialog = false">No</v-btn>
								</v-card-actions>
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
import { watch } from 'fs';

@Component({
	components: { Layout, SystemInformation, },
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
})
export default class Home extends Vue {
	valid: boolean = false
	importDialog = false
	checkbox = []
	search = ""
	selected = null
	firstname = ""
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

	items = [
		'Programming',
		'Design',
		'Vue',
		'Vuetify'
	]
	Category = [
		'student',
		'Senior Citizen',
		'Professionals',
		'Buisness Man'
	]
	idProof = [
		'Aadhaar Card',
		'Passport',
		'License',
		'Pan Card'
	]
	bodyType = [
		'endomorph',
		'ectomorph',
		'mesomorph'
	]
	cards = [
		{ src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 10 }
	]

	@Watch("date")
	onDateChanged() {
		this.dateFormatted = this.formatDate(this.date)
	}

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
}
</script>