<template>
	<div>
		<v-card class="mb-2" color="transparent" height="380px">
			<v-layout row wrap>
				<v-form lazy-validation ref="form" v-model="formValid">
					<v-layout row wrap>
						<v-flex xs3 lg4 class="pr-2">
							<v-text-field prepend-icon="fas fa-mobile-alt" v-model="mobile" :rules="rules.mobile" label="Mobile Number" mask="##### ##### #####" required ref="autofocus" color="orange darken-2" autofocus v-observe-visibility="{
								once: true,
								callback: focus,
								throttle: 300,
							}"/>
						</v-flex>
						<v-flex xs3 lg4 class="pl-2">
							<v-text-field prepend-icon="fab fa-whatsapp" label="Whatsapp Number" v-model="whatsappNumber" mask="##### ##### #####" :rules="rules.whatsappNumber" required color="orange darken-2" />
						</v-flex>
						<v-flex xs3 lg4>
							<v-checkbox v-model="sameAsPhone" :rules="rules.checkbox" label="Same As Phone Number" color="orange darken-2" />
						</v-flex>

						<v-flex xs3 lg4 class="pr-2">
							<v-text-field prepend-icon="fas fa-phone" label="Home Number" v-model="homeNumber" mask="##### ##### #####" :rules="rules.homeNumber" color="orange darken-2" />
						</v-flex>
						<v-flex xs3 lg4 class="pl-2">
							<v-text-field v-model="officeNumber" prepend-icon="fas fa-building" label="Office Number" mask="##### ##### #####" color="orange darken-2" />
						</v-flex>

						<v-flex xs6 lg6>
							<v-text-field prepend-icon="fas fa-envelope" v-model="email" :rules="rules.emailRules" label="Email address" type="email" color="orange darken-2" />
						</v-flex>

						<v-flex xs12 lg12>
							<v-card class="mb-2 mt-4 pa-2" height="100px" elevation="0">
								<h3 class="pl-4">Incase Of Emergency</h3>
								<v-layout row wrap class="pl-4">
									<v-flex xs12 lg5 class="pr-2">
										<v-text-field prepend-icon="fas fa-user" v-model="emergencyContactName" label="Contact Name" color="orange darken-2" />
									</v-flex>
									<v-flex xs12 lg5 class="pl-2">
										<v-text-field prepend-icon="fas fa-phone" v-model="emergencyContactNumber" label="Contact Number" mask="##### ##### #####" color="orange darken-2" />
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
import { MiscStore } from "@/state/modules/misc"
import { TMRegistrationStep2 } from "@/classes/types/registration"

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

	@Watch("mobile")
	@Watch("sameAsPhone")
	private onSameAsPhoneChange(){ if(this.sameAsPhone) this.whatsappNumber = this.mobile }

	private get rules(){
			return {
				mobile: [ v => !!v || "Number is required"  ],
				whatsappNumber: [ v => !!v || " Number is required" ],
				homeNumber: [v => !!v || "Required"],
				emailRules: [ v => !!v || 'E-mail is required',v => /.+@.+/.test(v) || 'E-mail must be valid'],
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
		}
	}
	@Prop({
		type: Object,
		default: () => {
			let def: TMRegistrationStep2 = {
				mobile: "",
				whatsappNumber: "",
				homeNumber: "",
				officeNumber: "",
				emergencyContactName: "",
				emergencyContactNumber: "",
				email: "",
			}
			return def
		}
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

	private focus(){
		// @ts-ignore
		this.$refs.autofocus.$el.focus()
	}

}
</script>