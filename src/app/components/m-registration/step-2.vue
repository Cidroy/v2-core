<template>
	<v-card color="transparent">
		<v-layout row wrap>
			<v-form lazy-validation ref="form" v-model="formValid">
				<v-layout row wrap>
					<v-flex xs12 lg6 class="px-2">
						<v-text-field prepend-icon="fas fa-mobile-alt" v-model="mobile" :rules="rules.mobile" label="Mobile Number" mask="##### ##### #####" required ref="autofocus" color="orange darken-2" autofocus v-observe-visibility="focus"/>
					</v-flex>
					<v-flex xs12 lg6 class="px-2">
						<v-text-field prepend-icon="fab fa-whatsapp" label="Whatsapp Number" v-model="whatsappNumber" mask="##### ##### #####" :rules="rules.whatsappNumber" required color="orange darken-2" />
						<v-checkbox v-model="sameAsPhone" label="Same As Mobile Number" color="orange darken-2" />
					</v-flex>

					<v-divider />

					<v-flex xs12 class="px-2"> <v-textarea v-model="address.house" label="Residential Address" prepend-icon="place" :rules="rules.address.house" color="orange darken-2"/> </v-flex>
					<v-flex xs12 lg6 class="px-2"> <v-text-field v-model="address.locality" label="Locality" prepend-icon="fas fa-phone" color="orange darken-2" /> </v-flex>
					<v-flex xs12 lg6 class="px-2"> <v-text-field v-model="address.landmark" label="Landmark" prepend-icon="fas fa-phone" color="orange darken-2" /> </v-flex>
					<v-flex xs12 lg6 class="px-2"> <v-autocomplete :items="COUNTRIES" item-text="name" item-value="shortName" v-model="address.country" label="Country" prepend-icon="fas fa-phone" auto-select-first color="orange darken-2" /> </v-flex>
					<v-flex xs12 lg6 class="px-2"> <v-autocomplete :items="STATES" v-model="address.state" label="State" prepend-icon="fas fa-phone" color="orange darken-2" /> </v-flex>
					<v-flex xs12 lg6 class="px-2"> <v-autocomplete :items="CITIES" v-model="address.city" label="City" prepend-icon="fas fa-phone" color="orange darken-2" /> </v-flex>
					<v-flex xs12 lg6 class="px-2"> <v-text-field v-model="address.pincode" label="Pincode" mask="###-###" prepend-icon="fas fa-phone" color="orange darken-2" /> </v-flex>

					<v-flex xs12 lg6 class="px-2">
						<v-text-field prepend-icon="fas fa-phone" label="Home Number" v-model="homeNumber" mask="##### ##### #####" :rules="rules.homeNumber" color="orange darken-2" />
						<v-checkbox v-model="homeSameAsPhone" label="Same As Mobile Number" color="orange darken-2" />
					</v-flex>
					<v-flex xs12 lg6 class="px-2"> <v-text-field v-model="officeNumber" prepend-icon="fas fa-building" label="Office Number" mask="##### ##### #####" color="orange darken-2" /> </v-flex>

					<v-flex xs12 class="px-2"> <v-text-field prepend-icon="fas fa-envelope" v-model="email" :rules="rules.emailRules" label="Email address" type="email" color="orange darken-2" /> </v-flex>
					
					<v-flex xs12> <v-divider/> </v-flex>
					<v-flex xs12 lg12 class="pt-2">
						<h3 class="pl-4">Incase Of Emergency</h3>
						<v-layout row wrap class="pl-4">
							<v-flex xs12 lg5 class="px-2">
								<v-text-field prepend-icon="fas fa-user" v-model="emergencyContactName" label="Contact Name" color="orange darken-2" />
							</v-flex>
							<v-flex xs12 lg5 class="px-2">
								<v-text-field prepend-icon="fas fa-phone" v-model="emergencyContactNumber" label="Contact Number" mask="##### ##### #####" color="orange darken-2" />
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-form>
		</v-layout>
		<v-card-actions>
			<v-btn dark @click.native.stop="formReset"> <v-icon left>close</v-icon> Cancel</v-btn>
			<v-spacer />
			<v-btn dark color="orange darken-4" @click.native.stop="formNext"> <v-icon left>done</v-icon> Save </v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import { MiscStore } from "@/state/modules/misc"
import { TMRegistrationStep2, defaultRegistrationStep2User } from "@/classes/types/registration"
import IAddress from "@classes/interface/IAddress"
import AddressStore from "@/state/modules/addresses"

@Component({
	created(){
		this.onValueChange()
	},
})

export default class MRegistrationStep2 extends Vue{
	private mobile: string = ""
	private whatsappNumber: string = ""
	private homeNumber: string = ""
	private officeNumber: string = ""
	private emergencyContactName: string = ""
	private emergencyContactNumber: string = ""
	private email: string = ""
	private sameAsPhone: boolean = true
	private homeSameAsPhone: boolean = true
	private address: Partial<IAddress> = {
		house: "",
		locality: "",
		landmark: "",
		city: "",
		state: "",
		country: "",
		pincode: "",
	}

	private get COUNTRIES(){ return AddressStore.COUNTRIES() }
	private get STATES(){ return AddressStore.STATES(this.address.country) }
	private get CITIES(){ return AddressStore.CITIES(this.address.country, this.address.state) }

	@Watch("mobile")
	@Watch("sameAsPhone")
	@Watch("homeSameAsPhone")
	private onSameAsPhoneChange(){
		if(this.sameAsPhone) this.whatsappNumber = this.mobile
		if(this.homeSameAsPhone) this.homeNumber = this.mobile
	}

	private get rules(){
			return {
				mobile: [ v => !!v || "Number is required"  ],
				whatsappNumber: [ v => !!v || " Number is required" ],
				homeNumber: [v => !!v || "Required"],
				emailRules: [ v => !!v || 'E-mail is required',v => /.+@.+/.test(v) || 'E-mail must be valid'],
				address: {
					house: [ house => !!house || "House Address is required"],
					city: [ city => !!city || "City is required"],
					state: [ state => !!state || "State is required"],
					pincode: [ pincode => !!pincode || "Pincode is required"],
					country: [ country => !!country || "country is required"],
				}
			}
	}
	private get userData(){
		return {
			...this.value,
			mobile : this.mobile,
			whatsappNumber : this.whatsappNumber,
			homeNumber : this.homeNumber,
			officeNumber : this.officeNumber,
			emergencyContactName : this.emergencyContactName,
			emergencyContactNumber : this.emergencyContactNumber,
			email : this.email,
			address: this.address,
		}
	}
	@Prop({
		type: Object,
		default: () => defaultRegistrationStep2User
	}) private value !: TMRegistrationStep2
	@Emit("input") public inputEmitter(){ return this.userData }
	@Watch("value") private onValueChange(){
		this.mobile = this.value.mobile
		this.whatsappNumber = this.value.whatsappNumber
		this.homeNumber = this.value.homeNumber
		this.officeNumber = this.value.officeNumber
		this.emergencyContactName = this.value.emergencyContactName
		this.emergencyContactNumber = this.value.emergencyContactNumber
		this.email = this.value.email
		this.address = this.value.address
	}

	private formValid: boolean = true
	private formReset(){
		// @ts-ignore
		this.$refs.form.reset()
	}
	private formNext(){
		// @ts-ignore
		if(this.$refs.form.validate()){
			this.inputEmitter()
			this.nextStep()
		}
	}
	@Emit("nextStep") public nextStep(){ return true }
	@Emit("cancel") public cancel(){ return true }

	private autofocus = false
	private focus(isVisible){
		// @ts-ignore
		this.autofocus = isVisible
	}
}
</script>