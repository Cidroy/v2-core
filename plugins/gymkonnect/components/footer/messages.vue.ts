import { Component, Vue } from "vue-property-decorator"
import empty from "@/components/empty.vue"
import { MessagesStore } from "@plugins/gymkonnect/state/messages"

@Component({
	// @ts-ignore
	components: { empty, },
})
// @ts-ignore
export default class MessagesStatusButton extends Vue {
	private get remainingMessages(){ return MessagesStore.GK_MESSAGES_REMAINING }
	private get totalMessages(){ return MessagesStore.GK_MESSAGES_ALLOTED }

	private onClick(){
		// TODO: goto a seperate page to show message history, usage history and send new message
		// ref: image-01
	}
}