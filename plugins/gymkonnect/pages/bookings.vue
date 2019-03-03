<template>
	<Layout>
		<h1 class="text-md-center">Bookings</h1>

		<div>
			<v-tabs v-model="active" color="grey darken-4" dark slider-color="orange darken-4">
      			<v-tab v-for="(name, key) in tabsList" :key="key" ripple>{{ name }}</v-tab>

				<v-tab-item key="a">
        			<v-card color="transparent" height="610px">
						<v-layout row wrap>
							<v-flex class="pl-2 ml-2" xs12>
								<v-radio-group row label="SPA Booking Type: " v-model="radioTop">
									<v-layout row align-start>
										<v-radio color="orange darken-2" label="Solo" value="radio-1"></v-radio>
							 			<v-radio color="orange darken-2" label="Group" value="radio-2"></v-radio>
									</v-layout>
								</v-radio-group>
							</v-flex>
							<v-flex xs2>
								<v-subheader class="title">Mobile No</v-subheader>
							</v-flex>
							<v-flex xs4>
								<v-text-field color="orange darken-2" label="Enter Mobile No" single-line solo></v-text-field>
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

						<v-layout row wrap class="pl-4">
							<v-flex xs6>
								<v-radio-group prepend-icon="fas fa-transgender-alt" label="Gender" v-model="radioGroup1" row>
									<v-radio color="orange darken-2" label="Male" value="radio-4"></v-radio>
									<v-radio color="orange darken-2" label="Female" value="radio-5"></v-radio>
									<v-radio color="orange darken-2" label="Others" value="radio-6"></v-radio>
								</v-radio-group>
							</v-flex>

							<v-flex xs4>
								<v-combobox color="orange darken-2" prepend-icon="work" :items="items" label="Occupation"></v-combobox>
							</v-flex>

							<v-flex xs6 lg6 class="pr-4">
								<v-text-field color="orange darken-2" prepend-icon="fas fa-envelope" v-model="email" :rules="emailRules" label="Email address" type="email"></v-text-field>
							</v-flex>

							<v-flex xs3>
								<v-text-field color="orange darken-2" prepend-icon="fab fa-whatsapp" label="Whatsapp Number" mask="phone"></v-text-field>
							</v-flex>
							<v-flex xs3>
								<v-checkbox color="orange darken-2" label="Same As Phone Number"></v-checkbox>
							</v-flex>

							<v-flex xs6 class="pr-4">
								<v-textarea color="orange darken-2" prepend-icon="place" name="input-7-1" label="Residential Address"></v-textarea>
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
										<v-radio color="orange darken-2" label="Steam Usage" value="radio-1"></v-radio>
										<v-radio color="orange darken-2" label="Jacuzzi Usage" value="radio-2"></v-radio>
										<v-radio color="orange darken-2" label="Steam & Jacuzzi" value="radio-3"></v-radio>
									</v-layout>
								</v-radio-group>
							</v-flex>
						</v-layout>

						<v-card width="100%" height="50px" color="transparent">
							<div class="right pr-2">
								<v-btn dark>Cancel</v-btn>
								<v-btn dark color="orange darken-4" class="mb-2">Submit</v-btn>
							</div>
						</v-card>
        			</v-card>
      			</v-tab-item>

				<v-tab-item key="b">
        			<v-card color="transparent">
						<v-layout class="pt-4" row wrap>
							<v-flex xs2>
								<v-subheader class="title">Mobile No</v-subheader>
							</v-flex>
							<v-flex xs4>
								<v-text-field color="orange darken-2" label="Enter Mobile No" single-line solo></v-text-field>
							</v-flex>
							<v-spacer/>
							<v-flex xs4 class="pl-4">
								<v-dialog v-model="bookSlot" max-width="800px">
									<span slot="activator" class="title">View Previous Bookings</span>
									<v-card>
									<!-- List Start -->
										<v-data-table :headers="headers" :items="desserts"  item-key="name">
											<template slot="items" slot-scope="props">

													<td>{{ props.item.name }}</td>
													<td>{{ props.item.mobno }}</td>
													<td>{{ props.item.orgname }}</td>
													<td>{{ props.item.orgtype }}</td>
													<td>{{ props.item.slotbooked }}</td>
													<td>{{ props.item.status }}</td>

											</template>
										</v-data-table>
							<!-- List End -->
									</v-card>
								</v-dialog>

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
								<v-text-field color="orange darken-2" counter maxlength="15" label="Last Name" required></v-text-field>
							</v-flex>
						</v-layout>

						<v-layout class="pl-4 pt-2" row wrap>
							<v-flex xs6 lg6>
								<v-text-field color="orange darken-2" prepend-icon="fas fa-building" label="Organization Name" required></v-text-field>
							</v-flex>

							<v-flex xs6>
								<v-select color="orange darken-2" prepend-icon="list" class="pr-4 pl-4" :items="organizationTypes" item-value="id" item-text="name" label="Organization Type"></v-select>
							</v-flex>
							<v-flex>
								    <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
        							offset-y
        							full-width
        							min-width="290px"
                                    >
        <v-text-field
          slot="activator"
          label="Booking Date"
          prepend-icon="event"
          readonly
		  v-model="bookingDateFormatted"
@blur="bookingDate = parseDate(bookingDateFormatted)"
        ></v-text-field>
        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
      </v-menu>

							</v-flex>
						</v-layout>

						<v-card class="pa-2" color="transparent">
							<v-subheader class="title">Slot Booking</v-subheader>
							<v-layout class="pl-4" row wrap>
								<v-flex xs12>
									<v-radio-group prepend-icon="fas fa-cookie" label="Ground Booking (2 Hrs Slot)" v-model="radioGB1" row>
										<v-radio color="orange darken-2" label="Without Floodlight" value="radio-wf"></v-radio>
										<v-radio color="orange darken-2" label="With Floodlight" value="radio-f"></v-radio>
										<v-dialog v-model="dialogSlot" persistent max-width="600px">
											<span slot="activator" class="subheading orange--text">Select Slot</span>
											<v-card>
												<v-toolbar card dark color="orange darken-4">
													<v-toolbar-title>Select the Time Slot</v-toolbar-title>
												</v-toolbar>
												<v-card-actions>
													<v-layout row wrap>
														<v-flex xs12 class="py-2">
															<p>
																<span class="green--text pl-4">Available</span>
																<span class="red--text pl-4">Booked</span>
																<span class="yellow--text pl-4">Reserved</span>
															</p>
															<v-btn-toggle v-model="toggle_none">
																<v-btn color="green">6am-8am</v-btn>
																<v-btn color="red">8am-10am</v-btn>
																<v-btn color="green">10am-12pm</v-btn>
																<v-btn color="green">12pm-2pm</v-btn>
																<v-btn color="green">2pm-4pm</v-btn>
																<v-btn color="yellow">4pm-6pm</v-btn>
															</v-btn-toggle>
														</v-flex>

														<v-flex xs12>
															<v-spacer></v-spacer>
															<v-btn color="orange darken-4" @click="dialogSlot = false">Confirm</v-btn>
															<v-btn color="orange darken-4" @click="dialogSlot = false">Cancel</v-btn>
														</v-flex>
													</v-layout>
												</v-card-actions>
											</v-card>
										</v-dialog>
									</v-radio-group>
								</v-flex>

								<v-flex xs12>
									<v-radio-group prepend-icon="fas fa-cookie" label="Futsal Court (1 Hr Slot)" v-model="radioGB2" row>
										<v-radio color="orange darken-2" label="Without Floodlight" value="radio-wf"></v-radio>
										<v-radio color="orange darken-2" label="With Floodlight" value="radio-f"></v-radio>
										<span class="subheading orange--text">Select Slot</span>
									</v-radio-group>
								</v-flex>

								<v-flex xs12>
									<v-radio-group prepend-icon="fas fa-cookie" label="Basketball Court (1 Hr Slot)" v-model="radioGB3" row>
										<v-radio color="orange darken-2" label="Without Floodlight" value="radio-wf"></v-radio>
										<v-radio color="orange darken-2" label="With Floodlight" value="radio-f"></v-radio>
										<span class="subheading orange--text">Select Slot</span>
									</v-radio-group>
								</v-flex>

								<v-flex xs12>
									<v-radio-group prepend-icon="fas fa-cookie" label="Tennis Court (1 Hr Slot)" v-model="radioGB4" row>
										<v-radio color="orange darken-2" label="Without Floodlight" value="radio-wf"></v-radio>
										<v-radio color="orange darken-2" label="With Floodlight" value="radio-f"></v-radio>
										<span class="subheading orange--text">Select Slot</span>
									</v-radio-group>
								</v-flex>

								<v-flex xs3>
									<v-checkbox color="orange darken-2" label="Cricket Nets (1 Hr)"></v-checkbox>
								</v-flex>
								<v-flex xs3>
									<v-checkbox color="orange darken-2" label="Wooden Floor"></v-checkbox>
								</v-flex>
							</v-layout>
						</v-card>

						<v-card width="100%" height="50px" color="transparent">
							<div class="right pr-2">
								<v-btn dark>Cancel</v-btn>
								<v-btn dark @click="snackbar2 = true" color="orange darken-4" class="mb-2">Submit</v-btn>
								<v-snackbar v-model="snackbar2" :bottom="y === 'bottom'">Ground Booking Done!
									<v-btn color="orange darken-4" flat @click="snackbar2 = false">Close</v-btn>
								</v-snackbar>
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
import { Component, Vue, Watch } from "vue-property-decorator"
import { watch } from 'fs';
import {GymkonnectStore} from "@plugins/gymkonnect/state/misc"

@Component({
	components: { Layout },
	page : {
		title: "Home",
		meta: [ { name: "description", content: appConfig.description, }, ],
	},
})
export default class Home extends Vue{
    date= new Date().toISOString().substr(0, 10)
	menu2 = false
	bookingDateFormatted = this.formatDate(this.date)
	formatDate(date) {
		// if (!date) return null
		const [year, month, day,] = date.split("-")
		return `${day}/${month}/${year}`
	}
	parseDate(date) {
		if (!this.date ) return null
		const [day, month, year,] = this.date.split("/")
		return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
	}

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
	radioGB1 = 1
	radioGB2 = 1
	radioGB3 = 1
	radioGB4 = 1
	dialogSlot = false
	bookSlot = false
	toggle_none = null
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
    y= 'top'
	mode= ''
	timeout= 6000
	radioTop = 'radio-1'
	radios1 = 'radio-1'
	private organizationTypes: string | number = GymkonnectStore.ORGANIZATION_TYPES[0].id
	private get OrganizationTypes(){ return GymkonnectStore.ORGANIZATION_TYPES }
	headers = [
		{
			text: 'Name',
			align: 'left',
			value: 'name',
		},
		{ text: 'Mobile No.', value: 'mobno', sortable: false },
		{ text: 'Organization Name', value: 'orgname', },
		{ text: 'Organization Type', value: 'orgtype', },
		{ text: 'Slots Booked', value: 'slotbooked', sortable: false},
		{ text: 'Status', value: 'status'}

	]

	defaultItem = {
		name: '',
		mobno: 0,
		orgname: '',
		orgtype: '',
		slotbooked: '',
		status: ''
	}
	desserts = [
		{
			name: 'copper',
			mobno: 821546878,
			orgname: 'Gec',
			orgtype: 'college',
			slotbooked: 'askKarthik',
			status: 'booked'
		},
		{
			name: 'luffy',
			mobno: 321546878,
			orgname: 'Gec',
			orgtype: 'college',
			slotbooked: 'askKarthik',
			status: 'NOT booked'
		},
		{
			name: 'zoro',
			mobno: 621546878,
			orgname: 'Gec',
			orgtype: 'college',
			slotbooked: 'askKarthik',
			status: 'booked'
		},
		{
			name: 'sanji',
			mobno: 821546878,
			orgname: 'Gec',
			orgtype: 'college',
			slotbooked: 'askKarthik',
			status: 'NOT booked'
		},
	]


}
</script>