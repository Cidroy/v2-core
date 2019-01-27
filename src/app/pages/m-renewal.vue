<template>
	<Layout>
		<v-layout row>
			<v-flex xs12 md7>
				<h1 class="text-md-right text-xs-center"> Membership Renewal</h1>
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

		<v-card class="mb-2" color="transparent">
			<v-layout class="pt-4" row wrap>
				<v-flex xs2>
					<v-subheader class="title">Mobile No</v-subheader>
				</v-flex>
				<v-flex xs4>
					<v-text-field label="Enter Mobile No" v-model="phone" :rules="phoneRules"  mask="phone"></v-text-field>
				</v-flex>
				<v-spacer></v-spacer>
				<v-flex xs3 class="pr-4">
					<v-text-field prepend-icon="fas fa-id-badge" value="7384" label="Member ID" readonly ></v-text-field>
				</v-flex>
			</v-layout>
			<v-divider></v-divider>
			
			<v-expansion-panel focusable>
				<v-expansion-panel-content>
					<div slot="header" class="title">Personal Details</div>
					<v-card>
						<v-layout class="pl-4" row wrap>
							<v-flex xs12>
								<v-radio-group prepend-icon="people" label="Registration Type" v-model="radioGroup1" row>
									<v-radio label="Solo" value="radio-1"></v-radio>
									<v-radio label="Couple" value="radio-2"></v-radio>
									<v-radio label="Group" value="radio-3"></v-radio>
								</v-radio-group>
							</v-flex>	
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
								<v-card>
									<v-img :src="cards[0].src" height="200px" />
									<v-btn block>
										<v-icon>add</v-icon> Change Photo
									</v-btn>
								</v-card>
							</v-flex>
						</v-layout>
						<div class="right">
							<v-btn flat click="$refs.form.reset()">Cancel</v-btn>
							<v-btn> NEXT </v-btn>
						</div>
					</v-card>	
				</v-expansion-panel-content>

				<v-expansion-panel-content>
					<div slot="header" class="title">Contact Details</div>
					<v-card>
						<v-layout row wrap class="pl-4">
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
						<div class="right">
							<v-btn flat>Cancel</v-btn>
							<v-btn> NEXT </v-btn>
						</div>
					</v-card>
				</v-expansion-panel-content>

				<v-expansion-panel-content>
					<div slot="header" class="title">Package Details</div>
					<v-card>
						<h3 class="pl-4 pt-2">Type Of Membership</h3>
						<v-layout class="pl-4" row wrap xs6>
							<v-checkbox class="ml-4" label="Gold"></v-checkbox>
							<v-checkbox label="Platinum"></v-checkbox>
						</v-layout>
						<v-divider></v-divider>
						<h3 class="pl-4 pt-2">Membership Duration</h3>
						<v-layout class="pl-4" row wrap>
							<v-checkbox class="ml-4" label="Monthly"></v-checkbox>
							<v-checkbox label="Quaterly"></v-checkbox>
							<v-checkbox label="Half-Yearly"></v-checkbox>
							<v-checkbox label="Yearly"></v-checkbox>
						</v-layout>
						<v-divider></v-divider>
						<v-layout class="pl-4" row wrap>
							<v-flex xs6>
								<v-radio-group label="Preferable Time Slot" v-model="radios" :mandatory="false" row>
										<v-radio label="Peak Hours" value="radio-7"></v-radio>
										<v-radio label="Off-Peak Hours" value="radio-8"></v-radio>
								</v-radio-group>
							</v-flex>
						
							<v-flex xs3>
								<v-menu ref="menu4" :close-on-content-click="false" v-model="menu4" :nudge-right="40" lazy transition="scale-transition"
								 offset-y full-width>
									<v-text-field slot="activator" v-model="dateFormatted" label="Date of Joining" hint="DD/MM/YYYY"
									 persistent-hint @blur="date = parseDate(dateFormatted)"></v-text-field>
									<v-date-picker v-model="date" no-title @input="menu4 = false"></v-date-picker>
								</v-menu>
							</v-flex>
						</v-layout>
						
						<div class="right">
							<v-btn flat>Cancel</v-btn>
							<v-btn> Submit </v-btn>
						</div>
					</v-card>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-card>		
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
		v => v.length <= 10
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