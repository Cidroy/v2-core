<template>
	<v-stepper v-model="step">
		<v-stepper-header>
			<v-stepper-step :rules="[() => true]" editable :complete="step > 1" step="1">Personal Details </v-stepper-step>
			<v-divider></v-divider>
			<v-stepper-step editable :complete="step > 2" step="2">Contact Details</v-stepper-step>
			<v-divider></v-divider>
			<v-stepper-step editable :complete="step > 3" step="3">Members Plan</v-stepper-step>
			<v-divider></v-divider>
			<v-stepper-step editable step="4">Final Step</v-stepper-step>
			<v-divider v-show="showDelete" ></v-divider>
			<v-btn v-show="showDelete" @click.native.stop="deleteStepper" flat float> <v-icon>close</v-icon> </v-btn>
		</v-stepper-header>

		<v-stepper-items>
			<v-stepper-content step="1"> <step-one v-model="userData" @nextStep="step2" allowImportFromEnquiry/> </v-stepper-content>
			<v-stepper-content step="2"> <step-two v-model="userData" @nextStep="step3"/>   </v-stepper-content>
			<v-stepper-content step="3"> <step-three v-model="userData" @nextStep="step4" /> </v-stepper-content>
			<v-stepper-content step="4"> <step-four /> </v-stepper-content>
		</v-stepper-items>
	</v-stepper>
</template>

<script lang="ts">
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator"
import { MiscStore } from "@/state/modules/misc"

import stepOne from "@/components/m-registration/step-1.vue"
import stepTwo from "@/components/m-registration/step-2.vue"
import stepThree from "@/components/m-registration/step-3.vue"
import stepFour from "@/components/m-registration/step-4.vue"


@Component({
	components: { Layout, stepOne ,stepTwo,stepThree,stepFour },
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
})
export default class Home extends Vue {
	userData = {
		firstName : "",
		middleName : "",
		lastName : "",
		phone : "",
		WhatsappNumber : "",
		HomeNumber : "",
		email : "",
	}
	@Watch("userData") onUserDataChange(newVal){ console.log(newVal) }

	step = 0
	grouping = Object.keys(this.GROUPINGS)[0]

	step2(){ this.step = 2 }
	step3(){ this.step = 3 }
	step4(){this.step = 4 }

	get GROUPINGS(){ return MiscStore.GROUPINGS }

	@Prop({ type: Boolean, default: false }) showDelete !: boolean
	@Emit("deleteStepper") deleteStepper(){ return true }
}
</script>