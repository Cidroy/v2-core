<template>
	<div>
		<v-card color="transparent">
			<h3>Type Of Membership</h3>
			<v-form lazy-validation ref="form" v-model="formValid">
				<v-layout row wrap class="ml-4">
					<v-checkbox v-for="mt in MEMBERSHIP_TYPES" :key="mt.id" v-model="membershipType" :label="mt.name" :value="mt.id" color="orange darken-2" autofocus/>
				</v-layout>
				<v-divider/>
				<h3 class="pt-2">Membership Duration</h3>
				<v-layout row wrap class="ml-4">
					<v-checkbox v-model="packageType" v-for="Package in PACKAGES" :key="Package.id" :label="Package.name" :value="Package.id"  color="orange darken-2"/>
				</v-layout>
				<v-divider></v-divider>
				<h3 class="pt-2">Preferable Time Slot:</h3>
				<v-layout row wrap class="ml-4">
					<v-radio-group v-model="timeSlot" :mandatory="false" row color="orange darken-2">
						<v-radio v-for="(value, name) in TIME_SLOTS" :key="value" :label="name" :value="value"  color="orange darken-2"/>
					</v-radio-group>
				</v-layout>
			</v-form>
			<v-card-actions>
				<v-btn dark @click.native.stop="formReset"> <v-icon left>close</v-icon> Cancel</v-btn>
				<v-spacer />
				<v-btn dark color="orange darken-4" @click.native.stop="formNext"> <v-icon left>done</v-icon> NEXT </v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import Layout from "@/layouts/main.vue"
import { MiscStore } from "@/state/modules/misc"
import { TMRegistrationStep3 } from "@/classes/types/registration"

@Component({
	components: { Layout,  },
	created(){
		this.membershipType = this.MEMBERSHIP_TYPES[0].id
		this.packageType = this.PACKAGES[0].id
		this.timeSlot = Object.values(this.TIME_SLOTS)[0]
	}
})
export default class MRegistrationStep3 extends Vue{
	private formValid = true
	private membershipType: number| string = ""
	private packageType: number| string = ""
	private timeSlot: number| string = ""

	private get userData(){
		return {
			...this.value,
			membershipType : this.membershipType,
			packageType : this.packageType,
			timeSlot : this.timeSlot,
		}
	}
	@Prop({
		type: Object,
		default: () => {
			let def: TMRegistrationStep3 = {
				membershipType: Object.values(MiscStore.MEMBERSHIP_TYPES)[0].id,
				packageType: Object.values(MiscStore.PACKAGES)[0].id,
				timeSlot: Object.values(MiscStore.TIME_SLOTS)[0],
			}
			return def
		}
	}) public value !: TMRegistrationStep3
	@Emit("input") public inputEmitter(){ return this.userData }
	@Watch("value") private onValueChange(){
		this.membershipType = this.value.membershipType
		this.packageType = this.value.packageType
		this.timeSlot = this.value.timeSlot
	}

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
	@Emit("cancel") public  cancel(){ return true }

	private get MEMBERSHIP_TYPES(){ return MiscStore.MEMBERSHIP_TYPES }
	private get PACKAGES(){ return MiscStore.PACKAGES }
	private get TIME_SLOTS(){ return MiscStore.TIME_SLOTS }
}
</script>