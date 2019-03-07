import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import store from "@/state/store"
import { TNotification } from "../classes/types/misc"

let notifications: TNotification[] = []
let popupNotification: { title: string, icon: string, iconClass: string, time: string|Date }| null = null

@Module({ dynamic: true, store, name: "Notification" })
class Notification extends VuexModule {
	private notifications: TNotification[] = []
	public get ALL_NOTIFICATIONS() { return this.notifications }
	public get UNSEEN_NOTIFICATION_COUNT() { return this.notifications.filter(n => n.seen === false).length }

	@MutationAction({ mutate: [ "notifications", ] }) public async syncNotifications() {
		// TODO: get notifications from server
		return { notifications }
	}

	@MutationAction({ mutate: [ "notifications", ] }) public async newNotification(notification: TNotification) {
		notifications = [ notification, ...notifications, ]
		return { notifications }
	}

	@MutationAction({ mutate: ["notifications",] }) public async markAllNotificationSeen() {
		notifications = notifications.map(notification => ({ ...notification, seen: true }))
		return { notifications }
	}

	// TODO: add listner from server for new notification
	private popupNotification = popupNotification
	public get POPUP_NOTIFICATION(){ return this.popupNotification }
}

export const NotificationStore = getModule(Notification)