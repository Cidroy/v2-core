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
									<v-text-field box color="orange darken-2" slot="activator" v-model="dojFormatted" label="Date of Joining" prepend-icon="event" readonly persistent-hint />
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
									<v-flex xs6 md1 class="px-2"> <v-text-field :value="transactionQty" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md2 class="px-2"> <v-text-field :value="admissionFeePrice" prefix="₹" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md3 class="px-2"> <v-text-field :value="admissionFeeAmount" prefix="₹" readonly color="orange darken-2"/> </v-flex>
								</v-layout>
								<v-layout row wrap>
									<v-flex xs12 md6 class="px-2"> <v-text-field :value="membership" label="Membership" prepend-icon="fas fa-info-circle" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md1 class="px-2">  </v-flex>
									<v-flex xs6 md2 class="px-2">  </v-flex>
									<v-flex xs6 md3 class="px-2">  </v-flex>
								</v-layout>
								<v-layout row wrap>
									<v-flex xs12 md6 class="px-2"> <v-text-field :value="packagex" label="Package" prepend-icon="fas fa-calendar-alt" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md1 class="px-2">  </v-flex>
									<v-flex xs6 md2 class="px-2">  </v-flex>
									<v-flex xs6 md3 class="px-2">  </v-flex>
								</v-layout>
								<v-layout row wrap>
									<v-flex xs12 md6 class="px-2"> <v-text-field :value="timeSlot" label="Preferred Time Slot" prepend-icon="fas fa-info-circle" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md1 class="px-2"> <v-text-field :value="transactionQty" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md2 class="px-2"> <v-text-field :value="transactionPrice" prefix="₹" readonly color="orange darken-2"/> </v-flex>
									<v-flex xs6 md3 class="px-2"> <v-text-field :value="transactionAmount" prefix="₹" readonly color="orange darken-2"/> </v-flex>
								</v-layout>
								<v-divider />
								<v-layout row wrap>
									<v-flex xs12 md7/>
									<v-flex xs12 md2 class="px-2 py-4"> <span class="title">Sub Total</span> </v-flex>
									<v-flex xs6 md3 class="px-2"> <v-text-field :value="subTotal" prefix="₹" readonly color="orange darken-2"/> </v-flex>
								</v-layout>
								<v-layout row wrap>
									<v-flex xs12 md6>
										<v-select v-model="offer" color="orange darken-2" prepend-icon="fas fa-bolt" :items="OFFERS" item-name="name" item-value="id" label="Offers" />
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
										<v-radio v-for="mode in PAYMENT_MODES" :key="mode.id" color="orange darken-2" :label="mode.name" :value="mode.id"></v-radio>
									</v-radio-group>
								</v-flex>
								<v-flex xs12 md6> <v-text-field v-model="transactionId" v-if="requireTransactionId" label="Transaction Id" box color="orange darken-2"/> </v-flex>
							</v-layout>
							<v-btn block color="orange darken-4" dark @click.native.stop="finish"> <v-icon left>done_all</v-icon> Finish </v-btn>
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
import { TMRegistrationStep3, defaultRegistrationStep3User, TMRegistrationStep4, defaultRegistrationStep4User, TMRegistration } from "@/classes/types/registration"

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

	private get primaryUser(){ return this.users[Object.keys(this.users)[0]] }

	private receipt = "1"
	private get userFullName(){ return `${this.primaryUser.firstName} ${this.primaryUser.middleName} ${this.primaryUser.lastName}` }
	private get userId(){ return this.primaryUser.id }
	private get mobileNumber(){ return this.primaryUser.mobile }
	private get whatsappNumber(){ return this.primaryUser.whatsappNumber }
	private get doj(){ return this.primaryUser.doj }
	private get dojFormatted(){ return this.formatDate(this.doj) }
	private get startDate(){ return this.formatDate(this.doj) }
	private get endDate(){ return this.formatDate(this.doj) }

	private admissionFee = "Admission Fee"
	private get admissionFeeQty(){ return this.transactionQty }
	private admissionFeePrice = 1000
	private get admissionFeeAmount(){ return this.admissionFeeQty * this.admissionFeePrice }

	private get membership(){
		let temp = MiscStore.MEMBERSHIP_TYPE(this.transaction.membershipType)
		return temp!==undefined?temp.name:"Invalid"
	}
	private get packagex(){
		let temp = MiscStore.PACKAGE(this.transaction.packageType)
		return temp!==undefined?temp.name:"Invalid"
	}
	private get timeSlot(){
		let temp = MiscStore.TIME_SLOT(this.transaction.timeSlot)
		return temp!==undefined?temp.name:"Invalid"
	}

	private get transactionQty(){ return Object.keys(this.users).length }
	private transactionPrice = 12000
	private get transactionAmount(){ return this.transactionQty * this.transactionPrice }

	private offer = false
	private get OFFERS(){ return MiscStore.ALL_OFFERS }

	private paymentMode = MiscStore.PAYMENT_MODES[0].id
	private get PAYMENT_MODES(){ return MiscStore.PAYMENT_MODES }
	private transactionId = "0000"
	private get paymentModeIndex(){ return (this.paymentMode && false) || MiscStore.PAYMENT_MODES.findIndex(i => i.id===this.paymentMode) }
	private get requireTransactionId(){ return this.PAYMENT_MODES[this.paymentModeIndex].requireTransactionId }

	private get subTotal(){
		return this.admissionFeeAmount
	}
	private discount = 0
	private get total(){
		return this.subTotal
			- this.discount
	}

	private showModal = false
	@Watch("showModal") onShowModalChange(){ this.inputEmitter() }
	@Prop({ type: Boolean, default: false }) public value!: boolean
	@Watch("value") private onValueChange(){ this.showModal = this.value }
	@Emit("input") public inputEmitter(){ return this.showModal }

	@Prop({ type: Object , default : () => ({
		...defaultRegistrationStep3User,
		...defaultRegistrationStep4User,
	}) }) transaction !: TMRegistrationStep3 & TMRegistrationStep4

	@Prop({ type: Object, default: () => ({}) }) users !: { [index: string]: TMRegistration }

	@Emit("pay") public finish(){
		this.showModal = false
		return {
			amount: this.total,
			mode: this.paymentMode,
			transactionId: this.transactionId,
			receipt: this.receipt,
			offer: this.offer,
		}
	}
}
</script>
