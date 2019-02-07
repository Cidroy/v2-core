<template>
	<v-stepper v-model="step">
		<v-stepper-header>
			<v-stepper-step :rules="[() => true]" editable :complete="step > 1" step="1">Personal Details </v-stepper-step>
			<v-divider />
			<v-stepper-step editable :complete="step > 2" step="2">Contact Details</v-stepper-step>
			<v-divider />
			<v-stepper-step editable :complete="step > 3" step="3">Members Plan</v-stepper-step>
			<v-divider />
			<v-stepper-step editable step="4">Final Step</v-stepper-step>
			<v-divider v-show="showDelete" />
			<v-btn v-show="showDelete" @click.native.stop="deleteStepper" flat float> <v-icon>close</v-icon> </v-btn>
		</v-stepper-header>

		<v-stepper-items>
			<v-stepper-content step="1"> <step-one v-model="userData" @nextStep="step2" allowImportFromEnquiry/> </v-stepper-content>
			<v-stepper-content step="2"> <step-two v-model="userData" @nextStep="step3"/>   </v-stepper-content>
			<v-stepper-content step="3"> <step-three v-model="userData" @nextStep="step4" /> </v-stepper-content>
			<v-stepper-content step="4"> <step-four v-model="userData" @nextStep="finish" /> </v-stepper-content>
			<payment-prompt v-model="paymentModel" @submit="gotoPayment" @cancelled="paymentCancelled" />
		</v-stepper-items>
	</v-stepper>
</template>

<script lang="ts">
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator"
import { MiscStore } from "@/state/modules/misc"
import { TMRegistration, defaultRegistrationUser } from "@/classes/types/registration"
import { GENDER } from "@classes/enum/misc"

import stepOne from "@/components/m-registration/step-1.vue"
import stepTwo from "@/components/m-registration/step-2.vue"
import stepThree from "@/components/m-registration/step-3.vue"
import stepFour from "@/components/m-registration/step-4.vue"
import paymentPrompt from "@/components/m-registration/payment-prompt.vue"

import ClientRegisteration from "@/classes/registration.ts"


@Component({
	components: { Layout, stepOne ,stepTwo,stepThree,stepFour,paymentPrompt, },
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
})
export default class Home extends Vue {
	private userData: TMRegistration = defaultRegistrationUser
	private get userDataComputed(){
		return {
			...this.value,
			...this.userData,
		}
	}
	@Prop({ type: Object, default: () => defaultRegistrationUser, }) private value !: TMRegistration
	@Emit("input") public inputEmitter(){ return this.userDataComputed }
	@Watch("value") private onValueChange(){
		this.userData = { ...this.userData, ...this.value }
	}
	@Watch("userData") private onUserDataChange(newVal){
		console.log(this.userData, this.userDataComputed)
		this.inputEmitter()
	}

	private step = 0
	private grouping = Object.keys(this.GROUPINGS)[0]
	private saving = false
	private error = ""
	private paymentModel = false

	private step2(){ this.step = 2 }
	private step3(){ this.step = 3 }
	private step4(){ this.step = 4 }
	private async finish(){
		this.saving = true
		try{
			await ClientRegisteration.register(this.userDataComputed)
			this.paymentModel = true
		}catch(error){
			this.error = error.toString()
		}
		this.saving = false
	}
	private gotoPayment(){}
	private paymentCancelled(){}

	private get GROUPINGS(){ return MiscStore.GROUPINGS }

	@Prop({ type: Boolean, default: false }) private showDelete !: boolean
	@Emit("deleteStepper") public deleteStepper(){ return true }
}
</script>