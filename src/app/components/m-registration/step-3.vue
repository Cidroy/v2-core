<template>
	<div>
	<v-card class="mb-2" color="transparent" height="320px">
						<h3>Type Of Membership</h3>
						<v-form lazy-validation ref="form" v-model="formValid">
						<v-layout row wrap xs6>
							<v-checkbox v-model="CBTypeMem" class="ml-4" label="Gold" value="Gold"></v-checkbox>
							<v-checkbox v-model="CBTypeMem" label="Platinum" value="Platinum"></v-checkbox>
						</v-layout>
						<v-divider></v-divider>
						<h3 class="pt-2">Membership Duration</h3>
						<v-layout row wrap>
							<v-checkbox v-model="CBMemDuration" class="ml-4" label="Monthly" value="Monthly"></v-checkbox>
							<v-checkbox v-model="CBMemDuration" label="Quaterly" value="Quaterly"></v-checkbox>
							<v-checkbox v-model="CBMemDuration" label="Half-Yearly" value="Half-Yearly"></v-checkbox>
							<v-checkbox v-model="CBMemDuration" label="Yearly" value="Yearly"></v-checkbox>
						</v-layout>
						<v-divider></v-divider>
						<h3 class="pt-2">Preferable Time Slot:</h3>
						<v-radio-group v-model="radios" :mandatory="false">
							<v-layout row wrap>
								<v-radio class="ml-4 mt-1" label="Peak Hours" value="radio-7"></v-radio>
								<v-radio class="ml-4" label="Off-Peak Hours" value="radio-8"></v-radio>
							</v-layout>
						</v-radio-group>
						<!--v-divider></v-divider>
						<v-checkbox class="ml-4" label="Apply for Personal Training Program" value="PT"></v-checkbox-->
						</v-form>
					</v-card>

					<div class="right">
						<v-btn dark @click.native.stop="formReset">Cancel</v-btn>
						<v-btn dark color="orange darken-4" @click.native.stop="formNext"> NEXT </v-btn>
					</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import { parseDate, formatDate } from "@/utils/misc"
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import SystemInformation from "@/components/system-information.vue"
import { watch } from 'fs';

@Component({
	components: {Layout,  },
	created(){
	}
})
export default class MRegistrationStep3 extends Vue{
	formValid = true
	selected = null
	checkbox = []
	CBMemDuration = null
	CBTypeMem = null
	radios = 'radio-7'

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
	@Emit("input") inputEmitter(){ return this.userData }


}


</script>