<template>
	<v-card color="transparent"  class="pa-4">
		<v-form lazy-validation ref="form" v-model="formValid">
			<v-layout row wrap>
				<v-flex xs12 lg6 class="px-2">
					<v-select v-model="category" prepend-icon="list" :items="Categories" item-text="name" item-value="id" label="Category" color="orange darken-2"/>
				</v-flex>
				<v-flex xs12 lg6 class="px-2">
					<v-menu ref="dojMenu" :close-on-content-click="false" v-model="dojMenu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width>
						<v-text-field color="orange darken-2" slot="activator" v-model="dojFormatted" label="Date of Joining" prepend-icon="event" readonly persistent-hint />
						<v-date-picker v-model="doj" :min="minDoj" no-title @input="dojMenu = false"  color="orange darken-2"/>
					</v-menu>
					<v-checkbox class="ma-0" label="Allow Back Dates" v-model="allowBackDating" color="orange"/>
				</v-flex>
				<v-flex xs12>
					<h3>Type Of Membership</h3>
					<v-layout row wrap class="ml-4">
						<v-checkbox v-for="mt in MEMBERSHIP_TYPES" :key="mt.id" v-model="membershipType" :label="mt.name" :value="mt.id" color="orange darken-2"/>
					</v-layout>
					<v-divider/>
				</v-flex>
				<v-flex xs12>
					<h3 class="pt-2">Membership Duration</h3>
					<v-layout row wrap class="ml-4">
						<v-checkbox v-model="packageType" v-for="Package in PACKAGES" :key="Package.id" :label="Package.name" :value="Package.id"  color="orange darken-2"/>
					</v-layout>
					<v-divider></v-divider>
				</v-flex>
				<v-flex xs12>
					<h3 class="pt-2">Preferable Time Slot:</h3>
					<v-layout row wrap class="ml-4">
						<v-radio-group v-model="timeSlot" :mandatory="false" row color="orange darken-2">
							<v-radio v-for="(slot, index) in TIME_SLOTS" :key="index" :label="slot.name" :value="slot.id"  color="orange darken-2"/>
						</v-radio-group>
					</v-layout>
				</v-flex>
			</v-layout>
		</v-form>
		<v-card-actions>
			<v-layout row wrap>
				<v-flex xs12 lg6/>
				<v-flex xs12 lg3 class="px-2"> <v-text-field v-model="subTotal" label="SubTotal" prefix="₹" :suffix="`X ${quantity}`" readonly color="orange darken-2"/> </v-flex>
				<v-flex xs12 lg3 class="px-2"> <v-text-field v-model="total" label="Total" prefix="₹" outline readonly :loading="priceLoading" color="orange darken-2"/> </v-flex>
			</v-layout>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import moment from "moment"
import Layout from "@/layouts/main.vue"
import { MiscStore } from "@/state/modules/misc"
import { formatDate, parseDate } from "@/utils/misc"
import { TMRegistrationStep3, defaultRegistrationStep3User } from "@/classes/types/registration"

import Gymkonnect from "@classes/gymkonnect"

@Component({
	components: { Layout,  },
	created(){
		this.membershipType = this.MEMBERSHIP_TYPES[0].id
		this.packageType = this.PACKAGES[0].id
		this.timeSlot = this.TIME_SLOTS[0].id
		this.recalculateSubTotal()
	}
})
export default class MRegistrationStep3 extends Vue{
	private formatDate(date){ return formatDate(date) }
	private parseDate(date){ return formatDate(date) }

	private formValid = true

	private membershipType: number| string = ""
	private get MEMBERSHIP_TYPES(){ return MiscStore.MEMBERSHIP_TYPES }

	private packageType: number| string = ""
	private get PACKAGES(){ return MiscStore.PACKAGES }

	private timeSlot: number| string = ""
	private get TIME_SLOTS(){ return MiscStore.TIME_SLOTS }

	private category: string | number = MiscStore.CATEGORIES[0].id
	private get Categories(){ return MiscStore.CATEGORIES }

	private doj = new Date().toISOString().substr(0, 10)
	private dojFormatted = this.formatDate(this.doj)
	private dojMenu = false
	private get x_minDoj(){ return this.allowBackDating?new Date(1947, 7, 16): new Date() }
	@Watch("doj") private onDateChanged() { this.dojFormatted = this.formatDate(this.doj) }
	private get minDoj(){ return moment(this.x_minDoj).toISOString().substr(0, 10) }
	private allowBackDating = false
	private get getDateFormatted() { return this.formatDate(this.doj) }

	private get userData(){
		return {
			...this.value,
			category: this.category,
			membershipType : this.membershipType,
			packageType : this.packageType,
			timeSlot : this.timeSlot,
			doj : this.value.doj,
		}
	}
	@Prop({
		type: Object,
		default: () => defaultRegistrationStep3User
	}) public value !: TMRegistrationStep3
	@Emit("input") public inputEmitter(){ return this.userData }
	@Watch("value") private onValueChange(){
		this.membershipType = this.value.membershipType
		this.packageType = this.value.packageType
		this.timeSlot = this.value.timeSlot
		this.category = this.value.category
		this.doj = this.value.doj
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

	@Watch("membershipType")
	@Watch("packageType")
	@Watch("timeSlot")
	@Watch("category")
	@Watch("doj")
	private doInputEmit(){ this.inputEmitter() }

	@Prop({ type: Number }) public group !: number
	@Prop({ type: Number, default: 1 }) public quantity !: number
	private subTotal = 0
	private get total(){ return this.subTotal * this.quantity }
	private priceLoading = false

	@Watch("membershipType")
	@Watch("packageType")
	@Watch("timeSlot")
	@Watch("category")
	@Watch("group")
	@Watch("quantity")
	private async recalculateSubTotal(){
		this.priceLoading = true
		this.subTotal = await Gymkonnect.Registration.getAmount({
			membershipType: this.membershipType,
			packageType: this.packageType,
			timeSlot: this.timeSlot,
			category: this.category,
			group: this.group
		})
		this.priceLoading = false
	}
}
</script>