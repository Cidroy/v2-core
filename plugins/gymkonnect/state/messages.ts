import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import store from "@/state/store"

let gkMessagesAlloted = 0
let gkMessagesRemaining = 0

@Module({ dynamic: true, store, name: "Messages" })
class Messages extends VuexModule {
	private gkMessagesAlloted = gkMessagesAlloted
	public get GK_MESSAGES_ALLOTED() { return this.gkMessagesAlloted }

	private gkMessagesRemaining = gkMessagesRemaining
	public get GK_MESSAGES_REMAINING() { return this.gkMessagesRemaining }
}

export const MessagesStore = getModule(Messages)