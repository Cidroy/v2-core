<template>
<div>
<v-card class="mb-2" color="transparent" height="380px">
						<v-layout row wrap>
							<v-form lazy-validation ref="form" v-model="formValid">
							<v-layout row wrap>
							<v-flex xs3 lg4 class="pr-2">
								<v-text-field prepend-icon="fas fa-mobile-alt" v-model="phone" :rules="rules.phone" label="Mobile Number" mask="##### ##### " required></v-text-field>
							</v-flex>
							<v-flex xs3 lg4 class="pl-2">
								<v-text-field prepend-icon="fab fa-whatsapp" label="Whatsapp Number"
								v-model="WhatsappNumber"  mask="##### ##### " :rules="rules.Whatsapp" required></v-text-field>
							</v-flex>
							<v-flex xs3 lg4>
								<v-checkbox v-model="sameAsPhone" :rules="rules.checkbox" label="Same As Phone Number"></v-checkbox>
							</v-flex>

							<v-flex xs3 lg4 class="pr-2">
								<v-text-field prepend-icon="fas fa-phone" label="Home Number" v-model="HomeNumber" mask="phone" :rules="rules.HomeNumber"></v-text-field>
							</v-flex>
							<v-flex xs3 lg4 class="pl-2">
								<v-text-field prepend-icon="fas fa-building" label="Office Number" mask="phone"></v-text-field>
							</v-flex>

							<v-flex xs6 lg6>
								<v-text-field prepend-icon="fas fa-envelope" v-model="email" :rules="rules.emailRules" label="Email address" type="email"></v-text-field>
							</v-flex>

							<v-flex xs12 lg12>
								<v-card class="mb-2 mt-4 pa-2" height="100px" elevation="0">
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
							</v-form>
						</v-layout>
					</v-card>

					<div class="right">
						<v-btn dark @click.native.stop="formReset">Cancel</v-btn>
						<v-btn dark color="orange darken-4" @click.native.stop="formNext"> NEXT </v-btn>
					</div>	
</div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import { GENDER } from "@classes/enum/misc"
import { MiscStore } from "@/state/modules/misc"

@Component({
	created(){
		this.onValueChange()
	}
})

export default class MRegistrationStep2 extends Vue{
	phone: string = ""
	WhatsappNumber: string = ""
	HomeNumber: string = ""
	email: string = ""
	sameAsPhone: boolean = true

	@Watch("phone")
	@Watch("sameAsPhone")
	onSameAsPhoneChange(){ if(this.sameAsPhone) this.WhatsappNumber = this.phone }

	get rules(){
			return {
				phone: [ v => !!v || "Number is required"  ],
				Whatsapp: [ v => !!v || " Number is required" ],
				HomeNumber: [v => !!v || "Required"],
				emailRules: [ v => !!v || 'E-mail is required',v => /.+@.+/.test(v) || 'E-mail must be valid'],
				checkbox: [
					
				]
			}
	}
	get userData(){
		return {
			...this.value,
			phone : this.phone,
			WhatsappNumber : this.WhatsappNumber,
			HomeNumber : this.HomeNumber,
			email : this.email,			
		}
	}
	@Prop({ type: Object, default: () => ({
		phone : "",
		WhatsappNumber : "",
		HomeNumber : "",
		email : "",
	}) }) value !: {
		phone : string,
		WhatsappNumber : string,
		HomeNumber : string,
		email : string,
	}	
	@Emit("input") inputEmitter(){ return this.userData }
	formValid: boolean = true

	@Watch("value") onValueChange(){
			this.phone = this.value.phone
			this.WhatsappNumber = this.value.WhatsappNumber
			this.HomeNumber = this.value.HomeNumber
			this.email = this.value.email
	}
	formReset(){
			// @ts-ignore
		this.$refs.form.reset()
	}
	formNext(){
		// @ts-ignore
		if(this.$refs.form.validate()){
			this.inputEmitter()
			this.nextStep()
		}
	}
	@Emit("nextStep") nextStep(){ return true }
	@Emit("cancel") cancel(){ return true }

}
</script>