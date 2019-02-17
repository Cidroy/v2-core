<template>
	<div>
		<v-card color="transparent" height="710px">
			<v-layout row wrap>
				<v-flex class="pl-2 ml-2" xs12>
					<v-radio-group row label="One-Day Type: " v-model="radioTop2" :mandatory="false">
						<v-layout row align-start>
							<v-radio color="orange darken-2" label="Solo" value="radio-1"></v-radio>
							<v-radio color="orange darken-2" label="Couple" value="radio-2"></v-radio>
							<v-radio color="orange darken-2" label="Group" value="radio-3"></v-radio>
						</v-layout>
					</v-radio-group>
				</v-flex>
				<v-flex xs2>
					<v-subheader class="title">Mobile No</v-subheader>
				</v-flex>
				<v-flex xs4>
					<v-text-field label="Enter Mobile No" single-line solo color="orange darken-2"></v-text-field>
				</v-flex>
			</v-layout>
			<v-divider></v-divider>

			<v-layout class="pl-4 pt-2" row wrap>
				<v-flex lg3 class="mr-3">
					<v-text-field prepend-icon="fas fa-user" counter maxlength="15" label="First Name" required
						color="orange darken-2"></v-text-field>
				</v-flex>
				<v-flex lg3 class="mr-3">
					<v-text-field counter maxlength="15" label="Middle Name" color="orange darken-2"></v-text-field>
				</v-flex>
				<v-flex lg3 class="mr-3">
					<v-text-field counter maxlength="15" label="Last Name" color="orange darken-2"></v-text-field>
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
					<v-combobox prepend-icon="work" :items="items" label="Occupation" color="orange darken-2">
					</v-combobox>
				</v-flex>

				<v-flex xs6 lg6 class="pr-4">
					<v-text-field prepend-icon="fas fa-envelope" v-model="email" :rules="emailRules"
						label="Email address" type="email" color="orange darken-2"></v-text-field>
				</v-flex>

				<v-flex xs3>
					<v-text-field prepend-icon="fab fa-whatsapp" label="Whatsapp Number" mask="phone"
						color="orange darken-2"></v-text-field>
				</v-flex>
				<v-flex xs3>
					<v-checkbox label="Not Same As Phone Number" color="orange darken-2"></v-checkbox>
				</v-flex>

				<v-flex xs6 class="pr-4">
					<v-textarea prepend-icon="place" name="input-7-1" label="Residential Address"
						color="orange darken-2"></v-textarea>
				</v-flex>
			</v-layout>
			<v-divider></v-divider>

			<v-layout row wrap class="pl-4">
				<v-flex xs12 class="pt-4">
					<h4 class="title">Available Plans</h4>
				</v-flex>

				<v-flex>
					<v-radio-group v-model="radioOneDay" row>
						<v-radio color="orange darken-2" label="1 Day" value="radio-1"></v-radio>
						<v-radio color="orange darken-2" label="6 Days" value="radio-2"></v-radio>
						<v-radio color="orange darken-2" label="12 Days" value="radio-3"></v-radio>
					</v-radio-group>
				</v-flex>
				<!-- <v-flex xs3 class="pt-2">
								<v-menu ref="ODstart" :close-on-content-click="false" v-model="ODstart" :nudge-right="40" lazy transition="scale-transition"
								offset-y full-width max-width="290px" min-width="290px">
									<v-text-field slot="activator" v-model="dateFormatted" label="Start Date"
									hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
									<v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex xs3 class="pl-4 pt-2">
								<v-menu ref="ODend" :close-on-content-click="false" v-model="ODend" :nudge-right="40" lazy transition="scale-transition"
									offset-y full-width>
									<v-text-field slot="activator" v-model="dateFormatted" label="End Date" hint="DD/MM/YYYY"
									persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
									<v-date-picker v-model="date" no-title @input="menu4 = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex xs3 class="pl-4 pt-2">
								<v-text-field prepend-icon="fas fa-calendar-minus" value="10 days" label="Total No. of Days" readonly ></v-text-field>
							</v-flex> -->

				<v-flex xs12 class="pt-2">
					<h4 class="title">Preferable Time Slot</h4>
				</v-flex>

				<v-flex xs12>
					<v-radio-group v-model="radioTime" :mandatory="false">
						<v-layout row align-start>
							<v-radio color="orange darken-2" label="Peak Hours" value="radio-1"></v-radio>
							<v-radio color="orange darken-2" label="Off-peak Hours" value="radio-2"></v-radio>
						</v-layout>
					</v-radio-group>
				</v-flex>
			</v-layout>

			<v-card width="100%" height="50px" color="transparent">
				<div class="right pr-2">
					<v-btn dark>Cancel</v-btn>
					<v-btn dark @click="snackbar2 = true" color="orange darken-4" class="mb-2">Submit</v-btn>
					<v-snackbar v-model="snackbar2" :bottom="y === 'bottom'">One-Day Registration Done!
						<v-btn color="orange darken-4" flat @click="snackbar2 = false">Close</v-btn>
					</v-snackbar>
				</div>
			</v-card>
		</v-card>
	</div>
</template>