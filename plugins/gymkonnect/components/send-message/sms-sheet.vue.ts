import { Component, Vue, Prop, Emit } from "vue-property-decorator"
import { Permissions as gymkonnect } from "@plugins/gymkonnect/permission"
import empty from "@/components/empty.vue"
import { MessagesStore } from "@plugins/gymkonnect/state/messages"
import { IUser } from "@plugins/core/interfaces/IUser"
import Gymkonnect from "@plugins/gymkonnect/classes/clients"
import { alert } from "@/components/toast"

@Component({
	// @ts-ignore
	components: { empty, },
	created(){
		this.Initialize()
	}
})
export default class SmsSheet extends Vue.default {
	private get PERMISSION() { return { gymkonnect, } }
	private get permissions() { return gymkonnect.SMS_SEND }
	private showSheet = false

	private async Initialize(){
		await Promise.all([
			MessagesStore.InitializeMessageTemplates(),
			this.loadMembers(),
		])
	}

	private get SMSTemplates(){ return MessagesStore.GK_MESSAGES_TEMPLATES }
	private get loadingTemplate(){ return MessagesStore.GK_MESSAGES_TEMPLATES_LOADING }
	private Members: Partial<IUser>[] = []
	private loadingMembers = false
	private async loadMembers(){
		this.loadingMembers = true
		try { this.Members = await Gymkonnect.Messages.getMemberDetails(this.members) }
		catch (error) { alert(error.toString(), "error") }
		this.loadingMembers = false
	}
	private async removeMember(id: string|number){ delete this.Members[ this.Members.findIndex(m => m.id===id) ] }

	private message = ""
	private get messageMaxLength(){ return MessagesStore.GK_MESSAGES_MAX_LENGTH }
	private get smsBalance(){ return MessagesStore.GK_MESSAGES_REMAINING }
	private get smsAlloted(){ return MessagesStore.GK_MESSAGES_ALLOTED }
	private smsSending = false
	private async smsSend(){
		this.smsSending = true
		try {
			let result = await Gymkonnect.Messages.sendSms(this.message, this.Members.map(m => <string|number>m.id))
		}
		catch (error) { alert(error.toString(), "error") }
		this.smsSending = false
	}

	@Prop({ type: Array, default: () => ([]) }) public members !: string[]
}