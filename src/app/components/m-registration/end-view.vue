<template>
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
</template>