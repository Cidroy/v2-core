import { Component, Vue, Watch } from "vue-property-decorator"
import uuid from "uuid"
import _ from "lodash"

import Layout from "@/layouts/layout.vue"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"
import { TMRegistration, defaultRegistrationUser, TMRegistrationStep3, defaultRegistrationStep3User, TMRegistrationStep4, defaultRegistrationStep4User } from "@plugins/gymkonnect/classes/types/registration"

import stepThree from "@plugins/gymkonnect/components/member/registration/step-3.vue"
import stepFour from "@plugins/gymkonnect/components/member/registration/step-4.vue"
import stepper from "@plugins/gymkonnect/components/member/registration/stepper.vue"

import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import Printer from "@electron/printer"
import AppConfig from "@classes/appConfig"
import { sleep } from "@classes/misc"
import { Logger } from "@classes/CONSOLE"
import { alert } from "@/components/toast"

const Console = new Logger(`enquiry.vue/gk`)
// @ts-ignore
@Component({
	components: {
		Layout,
		stepper,
		stepThree,
		stepFour,
	},
	created() {
		this.onGroupingChange()
	}
})
export default class MemberEnquiryPage extends Vue.default {
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
	private get primaryStepperIndex(){ return Object.keys(this.users)[0] }
	private get secondaryStepperIndex(){ return Object.keys(this.users).slice(-1)[0] }

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

	private deletePeople(index: string) {
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
		return this.completedSteppers.includes(this.primaryStepperIndex)
	}
	@Watch("usersCount") private onUsersChange() { }

	private paymentModel = false
	private paymentCancelled() { }

	private saving = false
	private async save() {
		this.saving = true
		try {
			let result = await Gymkonnect.Enquiry.save(this.clientIds[0], this.transactionData)
			alert("Saved", "success")
			// TODO: [Vicky] goto enquiry page or reset this page
		} catch (error) {
			Console.error(error)
			alert(error.toString(), "error")
		}
		this.saving = false
	}

	private printingBlank = false
	private async printBlank() {
		this.printingBlank = true
		try {
			// TODO: seperate all printers
			const pdfPath = AppConfig.DataFolder + "/reports/registration-blank"
			Console.info("saving", pdfPath, Printer.TEMPLATE_EXTENSION)
			const pdf = await Printer.renderAndPrintPDF("gymkonnect/registration-blank", pdfPath, {
				dateTime: new Date()
			})
			const { shell } = require("electron")
			let open = shell.openItem(pdf)
			Console.log({ pdf, open })
			if (open) await sleep(1000)
		} catch (error) { Console.error(error) }
		this.printingBlank = false
	}
}