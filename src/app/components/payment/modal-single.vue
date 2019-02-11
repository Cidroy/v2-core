<template>
	<v-dialog v-model="showModal" fullscreen hide-overlay transition="dialog-bottom-transition">
		<v-card>
			<v-toolbar fixed color="orange darken-2">
				<v-toolbar-title class="white--text"><v-icon dark class="fas" left large>fa-cash-register</v-icon> Payment</v-toolbar-title>
				<v-spacer />
				<v-btn icon dark @click="showModal = false"> <v-icon>close</v-icon> </v-btn>
			</v-toolbar>
			<v-card-text class="mt-4 pt-4">
				<v-layout row wrap>
					<v-flex xs12 md2/>
					<v-flex xs12 md8>
						<v-card class="pa-4 my-4 elevation-10">
							<v-layout row wrap>
								<v-flex xs12 sm6 md4 lg4>
									<v-text-field box v-model="receipt" color="orange darken-2" prepend-icon="fas fa-receipt" label="Receipt No." />
								</v-flex>
								<v-flex xs12 sm6 md4 lg4 />
								<v-flex xs12 sm6 md4 lg4>
									<v-checkbox class="ma-0" no-message label="Allow Back Dates" v-model="allowBackDating" color="orange"/>
									<v-menu ref="dojMenu" :close-on-content-click="false" v-model="dojMenu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width>
										<v-text-field box color="orange darken-2" slot="activator" v-model="dojFormatted" label="Date of Joining" prepend-icon="event" readonly persistent-hint />
										<v-date-picker v-model="doj" :min="minDoj" no-title @input="dojMenu = false"  color="orange darken-2"/>
									</v-menu>
								</v-flex>

								<v-flex xs12 md9 class="px-2"> <v-text-field prepend-icon="fas fa-user" :value="userFullName" label="Name" readonly color="orange darken-2"/> </v-flex>
								<v-flex xs12 md3 class="px-2"> <v-text-field prepend-icon="fas fa-hashtag" :value="userId" label="Member Id" readonly color="orange darken-2"/> </v-flex>

								<v-flex xs6 class="px-2"> <v-text-field v-model="mobileNumber" prepend-icon="fas fa-mobile-alt" label="Mobile Number" mask="##### ##### #####" readonly color="orange darken-2"/> </v-flex>
								<v-flex xs6 class="px-2"> <v-text-field v-model="whatsappNumber" prepend-icon="fab fa-whatsapp" label="Whatsapp Number" mask="##### ##### #####" readonly color="orange darken-2" /></v-flex>
								
								<v-flex xs6 class="px-2"> <v-text-field v-model="startDate" prepend-icon="event" label="Start Date" readonly color="orange darken-2" /></v-flex>
								<v-flex xs6 class="px-2"> <v-text-field v-model="startDate" prepend-icon="event" label="End Date" readonly color="orange darken-2" /></v-flex>
							</v-layout>
							<div class="elevation-5 pt-2 px-2 mb-4">
								<v-layout row wrap class="mt-4">
									<v-flex xs12 md6 class="px-2"> <span class="title">Description</span> </v-flex>
									<v-flex xs6 md1 class="px-2"> <span class="title">Qty.</span> </v-flex>
									<v-flex xs6 md2 class="px-2"> <span class="title">Price</span> </v-flex>
									<v-flex xs6 md3 class="px-2"> <span class="title">Amount</span> </v-flex>
								</v-layout>
								<v-divider />
								<v-divider />
								<v-divider />
								<v-layout row wrap>
									<v-flex xs12 md6 class="px-2"> <v-text-field :value="admissionFee" prepend-icon="fas fa-info-circle" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md1 class="px-2"> <v-text-field :value="admissionFeeQty" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md2 class="px-2"> <v-text-field :value="admissionFeePrice" prefix="₹" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md3 class="px-2"> <v-text-field :value="admissionFeeAmount" prefix="₹" readonly color="orange darken-2"/> </v-flex>
								</v-layout>
								<v-layout row wrap>
									<v-flex xs12 md6 class="px-2"> <v-text-field :value="membership" label="Membership" prepend-icon="fas fa-info-circle" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md1 class="px-2"> <v-text-field :value="membershipQty" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md2 class="px-2"> <v-text-field :value="membershipPrice" prefix="₹" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md3 class="px-2"> <v-text-field :value="membershipAmount" prefix="₹" readonly color="orange darken-2"/> </v-flex>
								</v-layout>
								<v-layout row wrap>
									<v-flex xs12 md6 class="px-2"> <v-text-field :value="packagex" label="Package" prepend-icon="fas fa-calendar-alt" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md1 class="px-2"> <v-text-field :value="packagexQty" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md2 class="px-2"> <v-text-field :value="packagexPrice" prefix="₹" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md3 class="px-2"> <v-text-field :value="packagexAmount" prefix="₹" readonly color="orange darken-2"/> </v-flex>
								</v-layout>
								<v-layout row wrap>
									<v-flex xs12 md6 class="px-2"> <v-text-field :value="timeSlot" label="Preferred Time Slot" prepend-icon="fas fa-info-circle" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md1 class="px-2"> <v-text-field :value="timeSlotQty" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md2 class="px-2"> <v-text-field :value="timeSlotPrice" prefix="₹" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md3 class="px-2"> <v-text-field :value="timeSlotAmount" prefix="₹" readonly color="orange darken-2"/> </v-flex>
								</v-layout>
								<v-divider />
								<v-layout row wrap>
									<v-flex xs12 md7/>
									<v-flex xs12 md2 class="px-2 py-4"> <span class="title">Sub Total</span> </v-flex>
									<v-flex xs6 md3 class="px-2"> <v-text-field :value="subTotal" prefix="₹" readonly color="orange darken-2"/> </v-flex>
								</v-layout>
								<v-layout row wrap>
									<v-flex xs12 md6>
										<v-select color="orange darken-2" prepend-icon="fas fa-bolt" :items="offers" label="Offers" />
									</v-flex>
									<v-flex xs12 md1/>
									<v-flex xs12 md2 class="px-2 py-4"> <span class="title">Discount</span> </v-flex>
									<v-flex xs6 md3 class="px-2"> <v-text-field v-model="discount" type="number" :min="0" prefix="₹-" label="Discount Amount" box color="orange darken-2"/> </v-flex>
								</v-layout>
								<v-layout row wrap>
									<v-flex xs12 md7/>
									<v-flex xs12 md2 class="px-2 py-4"> <span class="title">Total</span> </v-flex>
									<v-flex xs6 md3 class="px-2"> <v-text-field :value="total" prefix="₹" readonly color="orange darken-2"/> </v-flex>
								</v-layout>
							</div>

							<v-layout>
								<v-flex xs12 md6>
									<v-radio-group prepend-icon="fas fa-cash-register" label="Mode of Payment" v-model="paymentMode" row>
										<v-radio v-for="(mode, key) in PAYMENT_MODES" :key="mode.id" color="orange darken-2" :label="mode.name" :value="key"></v-radio>
									</v-radio-group>
								</v-flex>
								<v-flex xs12 md6> <v-text-field v-model="transactionId" v-if="requireTransactionId" label="Transaction Id" box color="orange darken-2"/> </v-flex>
							</v-layout>
							<v-btn block color="orange darken-4" dark> <v-icon left>done_all</v-icon> Finish </v-btn>
						</v-card>
					</v-flex>
					<v-flex xs12 md2/>
				</v-layout>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator"
import moment from "moment"
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import { formatDate, parseDate } from "@/utils/misc"
import { MiscStore } from "@/state/modules/misc"

@Component({
	components: { Layout, },
	page : {
		title: "Home",
		meta: [ { name: "description", content: appConfig.description, }, ],
	},
})
export default class SinglePaymentModal extends Vue{
	private formatDate(date){ return formatDate(date) }
	private parseDate(date){ return formatDate(date) }

	private doj = new Date().toISOString().substr(0, 10)
	private dojFormatted = this.formatDate(this.doj)
	private dojMenu = false
	private get x_minDoj(){ return this.allowBackDating?new Date(1947, 7, 16): new Date() }
	@Watch("doj") private onDateChanged() { this.dojFormatted = this.formatDate(this.doj) }
	private get minDoj(){ return moment(this.x_minDoj).toISOString().substr(0, 10) }
	private allowBackDating = false

	private receipt = "1"
	private userFullName = "John Doe"
	private userId = "00001212"
	private mobileNumber = "0000000000"
	private whatsappNumber = "0000000000"
	private startDate = this.formatDate(this.doj)
	private endDate = this.formatDate(this.doj)

	private admissionFee = "Admission Fee"
	private admissionFeeQty = 1
	private admissionFeePrice = 1000
	private get admissionFeeAmount(){ return this.admissionFeeQty * this.admissionFeePrice }

	private membership = "Gold"
	private membershipQty = 1
	private membershipPrice = 5000
	private get membershipAmount(){ return this.membershipQty * this.membershipPrice }

	private packagex = "Monthly"
	private packagexQty = 1
	private packagexPrice = 5000
	private get packagexAmount(){ return this.packagexQty * this.packagexPrice }
	private startDate = this.formatDate(new Date().toISOString().substr(0, 10))
	private endDate = this.formatDate(new Date().toISOString().substr(0, 10))

	private timeSlot = "Peak Hours"
	private timeSlotQty = 1
	private timeSlotPrice = 500
	private get timeSlotAmount(){ return this.packagexQty * this.packagexPrice }

	private get subTotal(){
		return this.admissionFeeAmount
			+ this.membershipAmount
			+ this.packagexAmount
			+ this.timeSlotAmount
	}
	private discount = 0
	private get total(){
		return this.subTotal
			- this.discount
	}

	private transactionId = "0000"

	private paymentMode = 0
	private get PAYMENT_MODES(){ return MiscStore.PAYMENT_MODES }
	private get requireTransactionId(){ return this.PAYMENT_MODES[this.paymentMode].requireTransactionId }

	offers = [
		'Custom',
		'Couple',
		'New year',
		'Student',
	]

	@Prop({ type: Object }) public userData !: {}
	@Watch("userData") private onUserData(){ }

	private showModal = false
	@Watch("showModal") onShowModalChange(){ this.inputEmitter() }
	@Prop({ type: Boolean, default: false }) public value!: boolean
	@Watch("value") private onValueChange(){ this.showModal = this.value }
	@Emit("input") public inputEmitter(){ return this.showModal }
}
</script>
