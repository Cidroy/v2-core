<template>
	<div>
		<v-card height="780px" color="transparent">
			<v-layout class="pt-2" row wrap>
				<v-flex class="pl-2 ml-2" xs12>
					<v-radio-group row label="Personal Traning Type: " v-model="radioTop1" :mandatory="false">
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
					<v-text-field label="Enter Mobile No" single-line solo color="orange darken-2"></v-text-field>
				</v-flex>
				<v-spacer></v-spacer>
				<v-flex xs3 class="pr-4">
					<v-text-field box prepend-icon="fas fa-id-badge" value="4656" label="Member ID" readonly>
					</v-text-field>
				</v-flex>
			</v-layout>
			<v-divider></v-divider>

			<v-layout class="pl-4 pt-2" row wrap>
				<v-flex xs6>
					<v-text-field box prepend-icon="fas fa-user" value="John Doe" label="Name" readonly></v-text-field>
				</v-flex>
			</v-layout>

			<v-layout class="pl-4" row wrap>
				<v-flex class="pr-4" xs3>
					<v-text-field box prepend-icon="fas fa-info-circle" value="xxxx" label="Current Program" readonly>
					</v-text-field>
				</v-flex>
				<v-flex xs3>
					<v-text-field box prepend-icon="fas fa-calendar-alt" value="YYYY" label="Current Package" readonly>
					</v-text-field>
				</v-flex>
			</v-layout>
			<v-divider></v-divider>

			<h4 class="pl-4 pt-2 title">Purpose of taking Personal Training:</h4>

			<v-layout class="pl-4" align-start row>
				<v-checkbox color="orange darken-2" label="General Fitness"></v-checkbox>
				<v-checkbox color="orange darken-2" label="Fat Loss"></v-checkbox>
				<v-checkbox color="orange darken-2" label="muscle Toning"></v-checkbox>
				<v-checkbox color="orange darken-2" label="Sports Oriented"></v-checkbox>
				<v-checkbox color="orange darken-2" label="Physical"></v-checkbox>
			</v-layout>
			<v-layout class="pl-4" align-start row>
				<v-checkbox color="orange darken-2" label="Specialised"></v-checkbox>
				<v-checkbox color="orange darken-2" label="Build muscle"></v-checkbox>
				<v-checkbox color="orange darken-2" label="Random"></v-checkbox>
				<v-checkbox color="orange darken-2" label="Random"></v-checkbox>
				<v-checkbox color="orange darken-2" label="Random"></v-checkbox>
			</v-layout>

			<h4 class="pl-4 title">Preffered Workout Time:</h4>
			<v-layout class="pl-4" row wrap>
				<v-flex xs2 class="">
					<v-menu ref="menu4" v-model="modal4" :close-on-content-click="false" :nudge-right="40"
						:return-value.sync="time4" lazy transition="scale-transition" offset-y full-width
						max-width="290px" min-width="290px">
						<v-text-field color="orange darken-2" slot="activator" v-model="time4" label="Time From"
							prepend-icon="access_time" readonly></v-text-field>
						<v-time-picker v-if="modal4" v-model="time4" full-width @change="$refs.menu4.save(time4)">
						</v-time-picker>
					</v-menu>
				</v-flex>
				<v-flex xs2 class="">
					<v-menu ref="menu5" v-model="modal2" :close-on-content-click="false" :nudge-right="40"
						:return-value.sync="timme" lazy transition="scale-transition" offset-y full-width
						max-width="290px" min-width="290px">
						<v-text-field color="orange darken-2" slot="activator" v-model="timme" label="Time To"
							prepend-icon="access_time" readonly></v-text-field>
						<v-time-picker v-if="modal2" v-model="timme" full-width @change="$refs.menu5.save(timme)">
						</v-time-picker>
					</v-menu>
				</v-flex>

				<v-flex xs12>
					<h4 class="title">Select The Personal Training Program:</h4>
				</v-flex>
				<v-flex xs12>
					<v-radio-group v-model="radios1" :mandatory="false">
						<v-layout row align-start>
							<v-radio color="orange darken-2" label="1 Month" value="radio-1"></v-radio>
							<v-radio color="orange darken-2" label="3 Months" value="radio-2"></v-radio>
							<v-radio color="orange darken-2" label="3 Times a Week" value="radio-3"></v-radio>
							<v-radio color="orange darken-2" label="Consultation with Trainers" value="radio-4">
							</v-radio>
						</v-layout>
					</v-radio-group>
				</v-flex>

				<v-flex xs12>
					<h4 class="title">Select Trainer Type:</h4>
				</v-flex>
				<v-flex xs12>
					<v-radio-group v-model="radios2" :mandatory="false">
						<v-layout row align-start>
							<v-radio color="orange darken-2" label="Standard" value="radio-1"></v-radio>
							<v-radio color="orange darken-2" label="Master" value="radio-2"></v-radio>
							<v-radio color="orange darken-2" label="Master" value="radio-3"></v-radio>
							<v-radio color="orange darken-2" label="Coach" value="radio-4"></v-radio>
						</v-layout>
					</v-radio-group>
				</v-flex>
			</v-layout>

			<v-card width="100%" height="50px" color="transparent">
				<div class="right pr-2">
					<v-btn dark>Cancel</v-btn>
					<v-btn dark @click="snackbar1 = true" color="orange darken-4" class="mb-2" to="/payment">Submit
					</v-btn>
					<v-snackbar v-model="snackbar1" :bottom="y === 'bottom'">Personal Traning Initiated!
						<v-btn color="orange darken-4" flat @click="snackbar1 = false">Close</v-btn>
					</v-snackbar>
				</div>
			</v-card>
		</v-card>
	</div>
</template>