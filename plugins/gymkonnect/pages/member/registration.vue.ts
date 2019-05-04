import { Component, Vue, Watch } from "vue-property-decorator"
import uuid from "uuid"
import _ from "lodash"

import Layout from "@plugins/core/layouts/layout.vue"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"
import { TMRegistration, defaultRegistrationUser, TMRegistrationStep3, defaultRegistrationStep3User, TMRegistrationStep4, defaultRegistrationStep4User } from "@plugins/gymkonnect/classes/types/registration"
import { PaymentDetail } from "@plugins/gymkonnect/classes/types/payment"

import stepThree from "@plugins/gymkonnect/components/member/registration/step-3.vue"
import stepFour from "@plugins/gymkonnect/components/member/registration/step-4.vue"
import stepper from "@plugins/gymkonnect/components/member/registration/stepper.vue"
import paymentSingle from "@plugins/gymkonnect/components/payment/modal-single.vue"

import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import router from "@/routes"
import { routes } from "@plugins/gymkonnect/routes"
import Printer from "@electron/printer"
import { Logger } from "@classes/CONSOLE"
import AppConfig from "@classes/appConfig"
import { sleep } from "@classes/misc"

const Console = new Logger(`gymkonnect/registration.vue`)
// @ts-ignore
@Component({
	components: {
		Layout,
		stepper,
		paymentSingle,
		stepThree,
		stepFour,
	},
	created() {
		// @ts-ignore
		this.onGroupingChange()
	}
})
export default class MemberRegistrationPage extends Vue.default {
	private error = ""

	private transactionData: TMRegistrationStep3 & TMRegistrationStep4 = {
		...defaultRegistrationStep3User,
		...defaultRegistrationStep4User,
	}
	@Watch("transactionData") private onTransactionDataChange() {
		Object.keys(this.users).forEach(i => {
			this.users[i] = {
				...this.users[i],
				...this.transactionData
			}
		})
	}

	private grouping = (GymkonnectStore.GK_GROUPINGS[0] || { id: 0 }).id
	private get groupIndex() { return (this.grouping && false) || this.GROUPINGS.findIndex(i => i.id === this.grouping) }
	private get GROUPINGS() { return GymkonnectStore.GK_GROUPINGS }
	private get allowAddPeople() { return this.usersCount < this.GROUPINGS[this.groupIndex].max }
	private get allowDeletePeople() { return this.usersCount > this.GROUPINGS[this.groupIndex].min }

	private users: Record<string, TMRegistration> = {}
	private usersCount = 0

	private getIndex(indexStr: string) { return Object.keys(this.users).indexOf(indexStr) + 1 }
	@Watch("grouping") public onGroupingChange() {
		let diff = 0
		let i = 0
		if (this.usersCount < this.GROUPINGS[this.groupIndex].count) {
			diff = this.GROUPINGS[this.groupIndex].count - this.usersCount
			for (i = 0; i < diff; i++) {
				this.users[uuid()] = defaultRegistrationUser
				this.usersCount++
			}
		} else if (this.usersCount > this.GROUPINGS[this.groupIndex].count) {
			diff = this.usersCount - this.GROUPINGS[this.groupIndex].count
			for (i = 0; i < diff; i++) {
				delete this.users[<string>Object.keys(this.users).pop()]
				this.usersCount--
			}
		}
	}

	private addPeople() {
		if (!this.allowAddPeople) return false
		this.users[uuid()] = defaultRegistrationUser
		this.usersCount++
		return true
	}

	private deleteStepper(index) {
		delete this.users[index]
		this.usersCount--
	}

	private completedSteppers: (number | string)[] = []
	private clientIds: (number | string)[] = []
	private stepperComplete(stepperId: string, clientId: string | number) {
		this.completedSteppers.push(stepperId)
		this.clientIds.push(clientId)
		this.users[stepperId].id = clientId
	}
	private get allSteppersComplete() {
		return (this.usersCount && false)
			|| !_(Object.keys(this.users)).difference(this.completedSteppers).value().length
	}
	@Watch("usersCount") private onUsersChange() { }

	private paymentModel = false
	private paymentCancelled() { }

	private paying = false
	private async pay(paymentData: PaymentDetail) {
		this.paying = true
		let result = await Gymkonnect.MemberRegistration.makePayments(this.clientIds, this.transactionData, paymentData, this.grouping)
		router.push({
			name: routes.MEMBER_REGISTRATION_FINALIZE.name,
			params: <any>{
				...result,
				users: this.users
			}
		})
		this.paying = false
	}

	private printingBlank = false
	private async printBlank(){
		this.printingBlank = true
		try{
			// TODO: seperate all printers
			const pdfPath = AppConfig.DataFolder + "/reports/registration-blank"
			Console.info("saving", pdfPath, Printer.TEMPLATE_EXTENSION)
			const pdf = await Printer.renderAndPrintPDF("gymkonnect/registration-blank", pdfPath, {
				dateTime: new Date()
			})
			const { shell } = require("electron")
			let open = shell.openItem(pdf)
			Console.log({pdf, open})
			if(open) await sleep(1000)
		} catch(error){ Console.error(error) }
		this.printingBlank =false
	}
}
