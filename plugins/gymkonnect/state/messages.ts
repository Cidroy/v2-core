import { VuexModule, Module, getModule, MutationAction, Action } from "vuex-module-decorators"
import store from "@plugins/core/state/store"
import { TSMSTemplates } from "../classes/types/messages"
import Gymkonnect from "../classes/clients"

let gkMessagesAlloted = 0
let gkMessagesRemaining = 0
let gkMessageMaxLength = 120
let gkMessageTemplates : TSMSTemplates[] = []
let gkMessageTemplatesLoading = false

@Module({ dynamic: true, store, name: "Messages" })
class Messages extends VuexModule {
	private gkMessagesAlloted = gkMessagesAlloted
	public get GK_MESSAGES_ALLOTED() { return this.gkMessagesAlloted }

	private gkMessagesRemaining = gkMessagesRemaining
	public get GK_MESSAGES_REMAINING() { return this.gkMessagesRemaining }

	private gkMessageMaxLength = gkMessageMaxLength
	public get GK_MESSAGES_MAX_LENGTH() { return this.gkMessageMaxLength }

	private gkMessageTemplates = gkMessageTemplates
	public get GK_MESSAGES_TEMPLATES() { return this.gkMessageTemplates }
	@MutationAction({ mutate: [ "gkMessageTemplates", ] }) private async mutateMessagesTemplate(payload: TSMSTemplates[]) {
		gkMessageTemplates = payload
		return { gkMessageTemplates }
	}

	private gkMessageTemplatesLoading = gkMessageTemplatesLoading
	public get GK_MESSAGES_TEMPLATES_LOADING() { return this.gkMessageTemplatesLoading }
	@MutationAction({ mutate: [ "gkMessageTemplatesLoading", ] }) private async mutateMessagesTemplateLoading(payload: boolean) {
		gkMessageTemplatesLoading = payload
		return { gkMessageTemplatesLoading }
	}

	@Action({}) public async InitializeMessageTemplates(){
		await this.mutateMessagesTemplateLoading(true)
		let result = await Gymkonnect.Messages.getTemplates()
		await this.mutateMessagesTemplate(result)
		await this.mutateMessagesTemplateLoading(false)
	}
}

export const MessagesStore = getModule(Messages)
