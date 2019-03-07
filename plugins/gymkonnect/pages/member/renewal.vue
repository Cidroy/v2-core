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
			<v-layout class="pt-2" row wrap>
				<v-flex xs12 pl-4>
					<v-radio-group prepend-icon="people" label="Registration Type" v-model="radioGroup1" row>
						<v-radio label="Solo" value="radio-1"></v-radio>
						<v-radio label="Couple" value="radio-2"></v-radio>
						<v-radio label="Group" value="radio-3"></v-radio>
					</v-radio-group>
				</v-flex>	
				<v-flex xs2>
					<v-subheader class="title">Mobile No</v-subheader>
				</v-flex>
				<v-flex xs4>
					<v-text-field label="Enter Mobile No" v-model="phone" :rules="phoneRules" single-line solo color="orange darken-2" mask="##########"></v-text-field>
				</v-flex>
				<v-spacer></v-spacer>
				<v-flex xs3 class="pr-4">
					<v-text-field box prepend-icon="fas fa-id-badge" value="7384" label="Member ID" readonly ></v-text-field>
				</v-flex>
			</v-layout>
			<v-divider></v-divider>
			
			<v-expansion-panel focusable>
				<v-expansion-panel-content>
					<div slot="header" class="title">Personal Details</div>
					<v-card class="px-2">
						<step-one v-model="userData" Readonly/>
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
								<v-card class="mb-2 mt-4 pa-2 pr-4" height="100px" elevation="0">
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
							<v-btn dark>Cancel</v-btn>
							<v-btn dark color="orange darken-4"> NEXT </v-btn>
						</div>
					</v-card>
				</v-expansion-panel-content>

				<v-expansion-panel-content>
					<div slot="header" class="title">Package Details</div>
					<v-card height="370px">
						<h3 class="pl-4 pt-2">Type Of Membership</h3>
						<v-layout class="pl-4" row wrap xs6>
							<v-checkbox v-model="CBTypeMem" class="ml-4" label="Gold" value="Gold"></v-checkbox>
							<v-checkbox v-model="CBTypeMem" label="Platinum" value="Platinum"></v-checkbox>
						</v-layout>
						<v-divider></v-divider>
						<h3 class="pl-4 pt-2">Membership Duration</h3>
						<v-layout class="pl-4" row wrap>
							<v-checkbox v-model="CBMemDuration" class="ml-4" label="Monthly" value="Monthly"></v-checkbox>
							<v-checkbox v-model="CBMemDuration" label="Quaterly" value="Quaterly"></v-checkbox>
							<v-checkbox v-model="CBMemDuration" label="Half-Yearly" value="Half-Yearly"></v-checkbox>
							<v-checkbox v-model="CBMemDuration" label="Yearly" value="Yearly"></v-checkbox>
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
									 persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
									<v-date-picker v-model="date" no-title @input="menu4 = false"></v-date-picker>
								</v-menu>
							</v-flex>

							<v-flex xs12 class="pt-2 pl-2">
								<span class="title font-weight-regular">Change Door Access</span>
								<v-layout align-start row>
									<v-checkbox label="Gym Mens Section" value="Gym Mens Section"></v-checkbox>
									<v-checkbox label="Gym Ladies Section" value="Gym Ladies Section"></v-checkbox>
									<v-checkbox label="Full Gym Section" value="Full Gym Section"></v-checkbox>
									<v-checkbox label="SPA" value="SPA"></v-checkbox>
								</v-layout>
							</v-flex>
						</v-layout>
						
						<div class="right">
							<v-btn dark>Cancel</v-btn>
							<v-dialog v-model="dialog" persistent max-width="400px">
								<v-btn dark slot="activator" color="orange darken-4" class="mb-2">Submit</v-btn>
								<v-card>
									<v-toolbar card dark color="orange darken-4" height="50px">
										<v-toolbar-title>Alert!</v-toolbar-title>
									</v-toolbar>
									<v-card-text>
										<label class="title">Do you want to Proceed for payments?</label>
									</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn dark color="orange darken-4" @click="dialog = false" to="/payment">Yes</v-btn>
										<v-btn dark @click="dialog = false">No</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</div>
					</v-card>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-card>		
	</Layout>
</template>