<template>
	<v-dialog v-model="showModal" fullscreen hide-overlay transition="dialog-bottom-transition">
		<v-card class="grey darken-4">
			<v-toolbar fixed color="orange darken-4">
				<v-toolbar-title class="white--text"><v-icon dark class="fas" left large>fa-cash-register</v-icon> Payment</v-toolbar-title>
				<v-spacer />
				<v-btn icon dark @click="showModal = false"> <v-icon>close</v-icon> </v-btn>
			</v-toolbar>
			<v-card-text class="mt-5 pt-4">
				<v-layout row wrap>
					<v-flex xs12 md2/>
					<v-flex xs12 md8>
						<v-card class="pa-4 my-4 elevation-10">
							<v-layout row wrap>
								<v-flex xs12 class="mb-4"> <h1 class="text-xs-center font-weight-regular"> <u>{{ billTitle }}</u> </h1> </v-flex>
								<v-flex xs12 sm6 md4 lg4>
									<v-text-field box v-model="receipt" color="orange darken-2" prepend-icon="fas fa-receipt" label="Receipt No." />
								</v-flex>
								<v-flex xs12 sm6 md8 lg8 />

								<v-flex xs12 md9 class="px-2"> <v-text-field prepend-icon="fas fa-user" :value="userFullName" label="Name" readonly tabindex="-1" color="orange darken-2"/> </v-flex>
								<v-flex xs12 md3 class="px-2"> <v-text-field prepend-icon="fas fa-hashtag" :value="badgenumber" label="Badge Number" readonly tabindex="-1" color="orange darken-2"/> </v-flex>

								<v-flex xs6 class="px-2"> <v-text-field v-model="mobileNumber" prepend-icon="fas fa-mobile-alt" label="Mobile Number" mask="##### ##### #####" readonly tabindex="-1" color="orange darken-2"/> </v-flex>
								<v-flex xs6 class="px-2"> <v-text-field v-model="whatsappNumber" prepend-icon="fab fa-whatsapp" label="Whatsapp Number" mask="##### ##### #####" readonly tabindex="-1" color="orange darken-2" /></v-flex>

							</v-layout>
							<div class="elevation-5 pt-2 px-2 mb-4">
								<v-layout row wrap class="mt-4">
									<v-flex xs12 md8 class="px-2"> <span class="title">Description</span> </v-flex>
									<v-flex xs6 md1 class="px-2" />
									<v-flex xs6 md3 class="px-2"> <span class="title">Amount</span> </v-flex>
								</v-layout>
								<v-divider />
								<v-divider />
								<v-divider />
								<v-layout row wrap>
									<v-flex xs12 md8 class="px-2">
										<v-text-field :value="AmenityNames.join(', ')" label="Amenities" readonly tabindex="-1" color="orange darken-2" />
										<v-text-field :value="`${Attendees}  ${Attendees===1?'Person': 'People'}`" label="for" readonly tabindex="-1" color="orange darken-2" />
										<v-text-field :value="AttendingDate" label="Attending on" readonly tabindex="-1" color="orange darken-2" />
									</v-flex>
									<v-flex xs6 md1 class="px-2" />
									<v-flex xs6 md3 class="px-2"> <v-text-field :value="Amount" prefix="₹" readonly tabindex="-1" color="orange darken-2"/> </v-flex>
								</v-layout>
								<v-divider />
								<v-layout row wrap>
									<v-flex xs12 md6 class="px-2" />
									<v-flex xs12 md1 class="px-2" />
									<v-flex xs12 md2 class="px-2 py-4"> <span class="title">Sub Total</span> </v-flex>
									<v-flex xs6 md3 class="px-2"> <v-text-field :value="subTotal" prefix="₹" readonly tabindex="-1" color="orange darken-2"/> </v-flex>
								</v-layout>
								<v-layout row wrap>
									<v-flex xs12 md6/>
									<v-flex xs12 md1/>
									<v-flex xs12 md2 class="px-2 py-4"> <span class="title">{{ Tax.description }}</span> </v-flex>
									<v-flex xs6 md3 class="px-2"> <v-text-field :value="Tax.amount" type="number" prefix="₹" label="Tax" box readonly tabindex="-1" color="orange darken-2"/> </v-flex>
								</v-layout>
								<v-layout row wrap>
									<v-flex xs12 md6/>
									<v-flex xs12 md1/>
									<v-flex xs12 md2 class="px-2 py-4"> <span class="title">Discount</span> </v-flex>
									<v-flex xs6 md3 class="px-2"> <v-text-field v-model="discount" type="number" :min="0" :max="Amount" prefix="₹" label="Discount Amount" box color="orange darken-2"/> </v-flex>
								</v-layout>
								<v-layout row wrap>
									<v-flex xs12 md7/>
									<v-flex xs12 md2 class="px-2 py-4"> <span class="title">Total</span> </v-flex>
									<v-flex xs6 md3 class="px-2"> <v-text-field :value="total" prefix="₹" readonly tabindex="-1" color="orange darken-2"/> </v-flex>
								</v-layout>
							</div>

							<v-layout>
								<v-flex xs12 md6>
									<v-radio-group prepend-icon="fas fa-cash-register" label="Mode of Payment" v-model="paymentMode" row>
										<v-radio v-for="mode in PAYMENT_MODES" :key="mode.id" color="orange darken-2" :label="mode.name" :value="mode.id"></v-radio>
									</v-radio-group>
								</v-flex>
								<v-flex xs12 md6> <v-text-field v-model="transactionId" v-if="requireTransactionId" label="Transaction Id" box color="orange darken-2"/> </v-flex>
							</v-layout>
							<v-btn block color="orange darken-4" dark @click.native.stop="finish"> <v-icon left>done_all</v-icon> Finish </v-btn>
						</v-card>
					</v-flex>
					<v-flex xs12 md2/>
				</v-layout>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>
