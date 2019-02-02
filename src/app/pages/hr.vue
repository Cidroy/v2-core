<template>
	<Layout>
		<h1 class="text-md-center pb-2">Human Resource</h1>
		
		<div>
			<v-tabs v-model="active" color="grey darken-4" dark slider-color="orange darken-4">
      			<v-tab v-for="(tabName, key) in tabsList" :key="key" ripple>{{ tabName }}</v-tab>
				
				<!-- Tab 1 -->
				<v-tab-item key="a">
					<v-card color="transparent">
						<div>
    						<v-toolbar flat color="transparent">
								<v-layout justify-end>
									<!-- Add Trainer Start -->
									<v-dialog v-model="dialogAT" fullscreen hide-overlay transition="dialog-bottom-transition">
										<v-btn slot="activator" color="orange darken-4" dark>Add Trainer</v-btn>
										<v-card>
											<v-toolbar dark color="primary">
												<v-btn icon dark @click="dialogAT = false">
													<v-icon>close</v-icon>
												</v-btn>
												<v-toolbar-title>Trainer Registration</v-toolbar-title>
												<v-spacer></v-spacer>
											</v-toolbar>

											<v-card>
												<v-layout row wrap>
													<v-flex xs8>
														<v-layout row wrap class="pt-2">
															<v-flex xs12 lg4 class="px-4">
																<v-text-field prepend-icon="fas fa-user" v-model="firstname" :rules="nameRules" counter maxlength="15" label="First Name"
																required></v-text-field>
															</v-flex>
															<v-flex xs12 lg4 class="pr-4">
																<v-text-field counter maxlength="15" label="Middle Name"></v-text-field>
															</v-flex>
															<v-flex xs12 lg4 class="pr-4">
																<v-text-field counter maxlength="15" label="Last Name" required :rules="LastnameRules"></v-text-field>
															</v-flex>

															<v-flex class="pl-4" xs12 lg6>
																<v-radio-group prepend-icon="fas fa-transgender-alt" label="Gender" v-model="radioGroup2" row>
																	<v-radio label="Male" value="radio-4"></v-radio>
																	<v-radio label="Female" value="radio-5"></v-radio>
																	<v-radio label="Others" value="radio-6"></v-radio>
																</v-radio-group>
															</v-flex>	

															<v-flex xs12 lg6 class="mb-2">
																<v-menu :close-on-content-click="false" v-model="dobMenu" :nudge-right="40" lazy transition="scale-transition"
																offset-y full-width max-width="290px" min-width="290px">
																	<v-text-field slot="activator" v-model="dobFormattedDate" label="Date of Birth" placeholder="Date of Birth" hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" @blur="dob = parseDate(dobFormattedDate)"/>
																	<v-date-picker v-model="dob" no-title @input="dobMenu = false" :max=" new Date().toISOString().substr(0, 10)" />
																</v-menu>
															</v-flex>

															<v-flex xs3 lg4 class="pl-4">
																<v-text-field prepend-icon="fas fa-mobile-alt" v-model="phone" :rules="phoneRules" label="Mobile Number" mask="phone" required></v-text-field>
															</v-flex>
															<v-flex xs3 lg4 class="pl-2">
																<v-text-field prepend-icon="fab fa-whatsapp" label="Whatsapp Number" mask="phone"></v-text-field>
															</v-flex>
															<v-flex xs3 lg4>
																<v-checkbox label="Not Same As Phone Number"></v-checkbox>
															</v-flex>
															<v-flex xs3 lg6 class="pl-4">
																<v-text-field prepend-icon="fas fa-phone" label="Home Number" mask="phone"></v-text-field>
															</v-flex>
															<v-flex xs6 lg6 class="pl-2">
																<v-text-field prepend-icon="fas fa-envelope" v-model="email" :rules="emailRules" label="Email address" type="email"></v-text-field>
															</v-flex>
															<v-flex xs12 lg6 class="pl-4">
																<v-select v-model="idType" prepend-icon="fas fa-id-card" :items="IDProofs" label="ID Proof"/>
															</v-flex>
															<v-flex xs12 lg6 class="pl-2">
																<v-text-field v-model="idNumber" prepend-icon="fas fa-hashtag" label="ID Number" required/>
															</v-flex>
															<v-flex xs12 lg6 class="pl-4">
																<v-textarea prepend-icon="place" name="input-7-1" label="Residential Address"></v-textarea>
															</v-flex>
															<v-flex xs12 lg6>
																<v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
																<v-text-field slot="activator" v-model="dateFormatted" label="Date" hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
																<v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
																</v-menu>
															</v-flex>
															<v-flex xs2 lg2 class="pl-4">
																<v-subheader class="subheading">Trainer ID</v-subheader>
															</v-flex>
															<v-flex xs4 lg5>
																<v-text-field label="Enter or Generate ID" single-line solo></v-text-field>
															</v-flex>
															<v-flex xs2>
																<v-btn dark color="orange darken-4">Generate</v-btn>
															</v-flex>

														</v-layout>
													</v-flex>

													<v-flex xs4>
														<v-layout class="justify-center" row wrap>
															<v-flex xs8 mt-4>
																<v-card>
																	<v-img :src="photo" height="200px" />
																	<v-btn block dark color="orange darken-4">
																		<v-icon>add</v-icon> Add Photo
																	</v-btn>

																	<v-btn block dark color="orange darken-4">
																		<v-icon>fingerprint</v-icon> Enroll Now
																	</v-btn>
																</v-card>
															</v-flex>
											
														</v-layout>
													</v-flex>	
												</v-layout>	
											</v-card>	
											<v-layout class="right">	
												<v-btn dark>Cancel</v-btn>
												<v-btn dark color="orange darken-4">Submit</v-btn>
											</v-layout>	
										</v-card>	
									</v-dialog>
									<!-- Add Trainer End -->
								</v-layout>	
							</v-toolbar>
							
							<!-- Trainer List Start -->
							<v-data-table :headers="headers" :items="desserts" :expand="expand" item-key="name">
								<template slot="items" slot-scope="props">
									<tr @click="props.expanded = !props.expanded">
										<td>{{ props.item.id }}</td>
										<td>{{ props.item.name }}</td>
										<td>{{ props.item.trainerType }}</td>
										<td>{{ props.item.mobno }}</td>
										<td>{{ props.item.joinDate }}</td>
									</tr>
								</template>
								
								<template slot="expand" slot-scope="props">
									<v-card flat>
										<v-layout row wrap>
											<v-spacer :data="props"/>
											<v-btn dark color="deep-purple darken-4" to="/" >View Profile</v-btn>
											<v-btn dark>Block</v-btn>
											<v-btn dark>Enroll</v-btn>
											<v-btn dark>Remove</v-btn>
										</v-layout>
									</v-card>
								</template>
							</v-data-table>
							<!-- Trainer List End -->
  						</div>
					</v-card>	
				</v-tab-item>

				<!-- Tab 2 -->
				<v-tab-item key="b">
					<v-card color="transparent">
						<v-card color="transparent">
						<div>
    						<v-toolbar flat color="transparent">
								<v-spacer></v-spacer>
								<v-btn color="orange darken-4" dark>Add Consultant</v-btn>
							</v-toolbar>
							
							<!-- FC List Start -->
							<v-data-table :headers="headers2" :items="desserts2" :expand="expand" item-key="name2">
								<template slot="items" slot-scope="props">
									<tr @click="props.expanded = !props.expanded">
										<td>{{ props.item.id2 }}</td>
										<td>{{ props.item.name2 }}</td>
										<td>{{ props.item.spcl }}</td>
										<td>{{ props.item.mobno2 }}</td>
										<td>{{ props.item.joinDate2 }}</td>
									</tr>
								</template>
								
								<template slot="expand" slot-scope="props">
									<v-card flat>
										<v-layout row wrap>
											<v-spacer :data="props"/>
											<v-btn dark color="deep-purple darken-4" to="/" >View Profile</v-btn>
											<v-btn dark>Block</v-btn>
											<v-btn dark>Enroll</v-btn>
											<v-btn dark>Remove</v-btn>
										</v-layout>
									</v-card>
								</template>
							</v-data-table>
							<!-- FC List End -->
  						</div>
					</v-card>
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
import { parseDate, formatDate } from "@/utils/misc"
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
	get photo(){
		return "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
	}
	parseDate(date){ return parseDate(date) }
	formatDate(date){ return formatDate(date) }

	dob = new Date().toISOString().substr(0, 10)
	dobFormattedDate = this.formatDate(this.dob)
	dobMenu: boolean = false
	@Watch("dob") onDobChanged() { this.dobFormattedDate = this.formatDate(this.dob) }

	active: number = 0
	menu1= false
	email = ""
	idType = ""
	idNumber = ""
	emailRules = [
		v => (v || '').match(/@/) || 'Please enter a valid email',
	]
	tabsList = {
		a: "Trainers",
		b: "Fitness Consultant",
	}
	phone = ""
	IDProofs = [
		'Aadhaar Card',
		'Passport',
		'License',
		'Pan Card',
		'Voter ID'
	]
	phoneRules = [
		v => !!v || "Number is required",
	]

	date = new Date().toISOString().substr(0, 10)
	dateFormatted = this.formatDate(this.date)

	@Watch("date")
	onDateChanged() {
		this.dateFormatted = this.formatDate(this.date)
	}

	get getDateFormatted() {
		return this.formatDate(this.date)
	}

	dialogAT = false
	firstname = ""
	nameRules = [
		v => !!v || "Name is required",
		v => v.length <= 30 || "Name must be less than 30 characters",
	]
	LastnameRules = [
		v => !!v || "Name is required"
	]
	radioGroup2 = "radio-4"

	headers = [
		{
			text: 'ID',
			align: 'left',
			value: 'id',
		},
		{ text: 'Name', value: 'name' },
		{ text: 'Trainer Type', value: 'trainerType', sortable: false },
		{ text: 'Mobile No.', value: 'mobno', sortable: false },
		{ text: 'Joined Date', value: 'joinDate'}
	]
	expand: boolean = false
	
	defaultItem = {
		id: 0,
		name: '',
		trainerType: '',
		mobno: 0,
		joinDate: ''
	}
	desserts = [
		{
			id: 1,
			name: 'spiderman',
			trainerType: 'Master',
			mobno: 12333,
			joinDate: '12/2/19'
		},
		{
			id: 2,
			name: 'aquaman',
			trainerType: 'Noob',
			mobno: 44543,
			joinDate: '12/2/19'
		},
		{
			id: 3,
			name: 'superman',
			trainerType: 'standard',
			mobno: 63330,
			joinDate: '12/2/19'
		},
		{
			id: 4,
			name: 'hitman',
			trainerType: 'standard',
			mobno: 42223,
			joinDate: '12/2/19'
		},
	]

	headers2 = [
		{
			text: 'ID',
			align: 'left',
			value: 'id2'
		},
		{ text: 'Name', value: 'name2' },
		{ text: 'Speciality', value: 'spcl', sortable: false },
		{ text: 'Mobile No.', value: 'mobno2', sortable: false },
		{ text: 'Joined Date', value: 'joinDate2'}
	]
	

	defaultItem2 = {
		id2: 0,
		name2: '',
		spcl: '',
		mobno2: 0,
		joinDate2: ''
	}
	desserts2 = [
		{
			id2: 1,
			name2: 'MC',
			spcl: 'Master',
			mobno2: 12333,
			joinDate2: '12/2/19'
		},
		{
			id2: 2,
			name2: 'aquaman',
			spcl: 'Noob',
			mobno2: 44543,
			joinDate2: '12/2/19'
		},
		{
			id2: 3,
			name2: 'superman',
			spcl: 'standard',
			mobno2: 63330,
			joinDate2: '12/2/19'
		},
		{
			id2: 4,
			name2: 'hitman',
			spcl: 'standard',
			mobno2: 42223,
			joinDate2: '12/2/19'
		},
	]

}
</script>