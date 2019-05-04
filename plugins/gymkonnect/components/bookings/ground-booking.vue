<template>
	<div>
		<v-card color="transparent">
			<v-layout class="pt-4" row wrap>
				<v-flex xs2>
					<v-subheader class="title">Mobile No</v-subheader>
				</v-flex>
				<v-flex xs4>
					<v-text-field color="orange darken-2" label="Enter Mobile No" single-line solo></v-text-field>
				</v-flex>
				<v-spacer />
				<v-flex xs4 class="pl-4">
					<v-dialog v-model="bookSlot" max-width="800px">
						<span slot="activator" class="title">View Previous Bookings</span>
						<v-card>
							<!-- List Start -->
							<v-data-table :headers="headers" :items="desserts" item-key="name">
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
					<v-text-field color="orange darken-2" prepend-icon="fas fa-user" counter maxlength="15"
						label="First Name" required></v-text-field>
				</v-flex>
				<v-flex lg3 class="mr-3">
					<v-text-field color="orange darken-2" counter maxlength="15" label="Middle Name"></v-text-field>
				</v-flex>
				<v-flex lg3 class="mr-3">
					<v-text-field color="orange darken-2" counter maxlength="15" label="Last Name" required>
					</v-text-field>
				</v-flex>
			</v-layout>

			<v-layout class="pl-4 pt-2" row wrap>
				<v-flex xs6 lg6>
					<v-text-field color="orange darken-2" prepend-icon="fas fa-building" label="Organization Name"
						required></v-text-field>
				</v-flex>

				<v-flex xs6>
					<v-select color="orange darken-2" prepend-icon="list" class="pr-4 pl-4" :items="organizationTypes"
						item-value="id" item-text="name" label="Organization Type"></v-select>
				</v-flex>
				<v-flex>
					<v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy
						transition="scale-transition" offset-y full-width min-width="290px">
						<v-text-field slot="activator" label="Booking Date" prepend-icon="event" readonly
							v-model="bookingDateFormatted" @blur="bookingDate = parseDate(bookingDateFormatted)">
						</v-text-field>
						<v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
					</v-menu>

				</v-flex>
			</v-layout>

			<v-card class="pa-2" color="transparent">
				<v-subheader class="title">Slot Booking</v-subheader>
				<v-layout class="pl-4" row wrap>
					<v-flex xs12>
						<v-radio-group prepend-icon="fas fa-cookie" label="Ground Booking (2 Hrs Slot)"
							v-model="radioGB1" row>
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
												<v-btn color="orange darken-4" @click="dialogSlot = false">Confirm
												</v-btn>
												<v-btn color="orange darken-4" @click="dialogSlot = false">Cancel
												</v-btn>
											</v-flex>
										</v-layout>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-radio-group>
					</v-flex>

					<v-flex xs12>
						<v-radio-group prepend-icon="fas fa-cookie" label="Futsal Court (1 Hr Slot)" v-model="radioGB2"
							row>
							<v-radio color="orange darken-2" label="Without Floodlight" value="radio-wf"></v-radio>
							<v-radio color="orange darken-2" label="With Floodlight" value="radio-f"></v-radio>
							<span class="subheading orange--text">Select Slot</span>
						</v-radio-group>
					</v-flex>

					<v-flex xs12>
						<v-radio-group prepend-icon="fas fa-cookie" label="Basketball Court (1 Hr Slot)"
							v-model="radioGB3" row>
							<v-radio color="orange darken-2" label="Without Floodlight" value="radio-wf"></v-radio>
							<v-radio color="orange darken-2" label="With Floodlight" value="radio-f"></v-radio>
							<span class="subheading orange--text">Select Slot</span>
						</v-radio-group>
					</v-flex>

					<v-flex xs12>
						<v-radio-group prepend-icon="fas fa-cookie" label="Tennis Court (1 Hr Slot)" v-model="radioGB4"
							row>
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

	</div>
</template>
