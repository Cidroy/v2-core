<template>
	<v-card color="transparent">
		<v-layout row wrap>
			<v-form lazy-validation ref="form" v-model="formValid">
				<v-layout row wrap>
					<v-flex xs12 lg6 class="px-2">
						<v-text-field prepend-icon="fas fa-mobile-alt" v-model="mobile" :rules="rules.mobile" label="Mobile Number" :mask="mask.mobile" :prefix="mobilePrefix" required ref="autofocus" color="orange darken-2" autofocus v-observe-visibility="focus">
							<v-fade-transition slot="append" leave-absolute >
								<v-progress-circular v-if="validatingMobile" size="15" color="orange darken-2" indeterminate />
							</v-fade-transition>
						</v-text-field>
					</v-flex>
					<v-flex xs12 lg6 class="px-2">
						<v-text-field prepend-icon="fab fa-whatsapp" label="Whatsapp Number" v-model="whatsappNumber" :mask="mask.mobile" :prefix="mobilePrefix" :rules="rules.whatsappNumber" required color="orange darken-2" />
						<v-checkbox v-model="sameAsPhone" label="Same As Mobile Number" color="orange darken-2" />
					</v-flex>

					<v-divider />

					<v-flex xs12 class="px-2"> <v-textarea v-model="address.house" label="Residential Address" prepend-icon="place" :rules="rules.address.house" color="orange darken-2"/> </v-flex>
					<v-flex xs12 lg6 class="px-2"> <v-text-field v-model="address.locality" label="Locality" prepend-icon="fas fa-phone" color="orange darken-2" /> </v-flex>
					<v-flex xs12 lg6 class="px-2"> <v-text-field v-model="address.landmark" label="Landmark" prepend-icon="fas fa-phone" color="orange darken-2" /> </v-flex>
					<v-flex xs12 lg6 class="px-2"> <v-autocomplete :items="COUNTRIES" item-text="name" item-value="shortName" v-model="address.country" label="Country" prepend-icon="fas fa-phone" auto-select-first color="orange darken-2" /> </v-flex>
					<v-flex xs12 lg6 class="px-2"> <v-autocomplete :items="STATES" v-model="address.state" label="State" prepend-icon="fas fa-phone" color="orange darken-2" auto-select-first /> </v-flex>
					<v-flex xs12 lg6 class="px-2"> <v-autocomplete :items="CITIES" v-model="address.city" label="City" prepend-icon="fas fa-phone" color="orange darken-2" auto-select-first /> </v-flex>
					<v-flex xs12 lg6 class="px-2"> <v-text-field v-model="address.pincode" label="Pincode" mask="###-###" prepend-icon="fas fa-phone" color="orange darken-2" auto-select-first /> </v-flex>

					<v-flex xs12 lg6 class="px-2">
						<v-text-field prepend-icon="fas fa-phone" label="Home Number" v-model="homeNumber" :mask="mask.mobile" :prefix="mobilePrefix" :rules="rules.homeNumber" color="orange darken-2" />
						<v-checkbox v-model="homeSameAsPhone" label="Same As Mobile Number" color="orange darken-2" />
					</v-flex>
					<v-flex xs12 lg6 class="px-2"> <v-text-field v-model="officeNumber" prepend-icon="fas fa-building" label="Office Number" :mask="mask.mobile" :prefix="mobilePrefix" color="orange darken-2" /> </v-flex>

					<v-flex xs12 class="px-2">
						<v-text-field prepend-icon="fas fa-envelope" v-model="email" :rules="rules.emailRules" label="Email address" type="email" color="orange darken-2" >
							<v-fade-transition slot="append" leave-absolute >
								<v-progress-circular v-if="validatingEmail" size="15" color="orange darken-2" indeterminate />
							</v-fade-transition>
						</v-text-field>
					</v-flex>

					<v-flex xs12> <v-divider/> </v-flex>
					<v-flex xs12 lg12 class="pt-2">
						<h3 class="pl-4">Incase Of Emergency</h3>
						<v-layout row wrap class="pl-4">
							<v-flex xs12 lg5 class="px-2">
								<v-text-field prepend-icon="fas fa-user" v-model="emergencyContactName" label="Contact Name" color="orange darken-2" />
							</v-flex>
							<v-flex xs12 lg5 class="px-2">
								<v-text-field prepend-icon="fas fa-phone" v-model="emergencyContactNumber" label="Contact Number" :mask="mask.mobile" :prefix="mobilePrefix" color="orange darken-2" />
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-form>
		</v-layout>
		<v-card-actions>
			<v-btn dark @click.native.stop="formReset" tabindex="-1"> <v-icon left>close</v-icon> Cancel</v-btn>
			<v-spacer />
			<v-btn dark color="orange darken-4" @click.native.stop="formNext" :loading="saving" :disabled="saving"> <v-icon left>done</v-icon> Save </v-btn>
		</v-card-actions>
	</v-card>
</template>