import { Component, Vue, Prop } from "vue-property-decorator"
import { Permissions as gymkonnect } from "@plugins/gymkonnect/permission"
import SmsSheet from "./sms-sheet.vue"
import EmailSheet from "./email-sheet.vue"

// @ts-ignore
@Component({
	components: {
		SmsSheet,
		EmailSheet,
	},
})
export default class SendMessageFab extends Vue.default {
	private get PERMISSION(){ return { gymkonnect, } }
	private get permissions(){ return [ gymkonnect.SMS_SEND, gymkonnect.EMAIL_SEND, ] }
	private sendMessageFAB = false

	@Prop({ type: Array, default: () => ([]) }) public members !: string[]
}