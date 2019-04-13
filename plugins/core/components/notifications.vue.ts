import { Component, Vue, Watch } from "vue-property-decorator"
import empty from "@/components/empty.vue"
import { NotificationStore } from "../state/notifications"
import moment from "moment"

@Component({
	// @ts-ignore
	components: { empty, },
	created(){
		NotificationStore.syncNotifications()
	}
})
export default class NotificationPanel extends Vue.default {
	private showNotifications = false
	private get unseenNotificationsCount(){ return NotificationStore.UNSEEN_NOTIFICATION_COUNT }
	private get notifications(){ return NotificationStore.ALL_NOTIFICATIONS }

	@Watch("showNotifications") private onShowingNotifcation(){
		if(this.showNotifications) NotificationStore.markAllNotificationSeen()
	}

	private popupNotificationTimeout = 1000000
	private showPopupNotification = true
	private popupNotification() { return NotificationStore.POPUP_NOTIFICATION }
	@Watch("popupNotification") private onPopupNotificationUpdated(){
		this.showPopupNotification = true
	}

	private moments(time: string| Date){
		return moment(time).fromNow()
	}
}