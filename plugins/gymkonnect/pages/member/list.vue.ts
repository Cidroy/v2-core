import appConfig from "@/app.config"
import Layout from "@/layouts/layout.vue"
import { Component, Vue } from "vue-property-decorator"
import SendMessageFab from "@plugins/gymkonnect/components/send-message/fab.vue"
import { Permissions as gymkonnect } from "@plugins/gymkonnect/permission"
import { MembersListStore } from "@plugins/gymkonnect/state/member-list"
import { USER_MODE } from "@classes/enum/user-mode"
import { GymkonnectStore } from "@plugins/gymkonnect/state/misc"
import { TGQLUserMode } from "@plugins/gymkonnect/state/gk-helper"
import { gotoProfile, enroll, freezeUnfreeze, renew, preebookEnroll, blockUnblock } from "@plugins/gymkonnect/classes/actions"

@Component({
	// @ts-ignore
	components: {
		Layout,
		SendMessageFab,
	},
	page: {
		title: "Members List",
		meta: [{ name: "List All Members", content: appConfig.description, },],
	},
	created() {
		this.refresh()
	}
})
// @ts-ignore
export default class Home extends Vue {
	
	private get PERMISSIONS() { return { gymkonnect } }

	// FIXME: dynamic list
	private get FILTERS() { return ["All", "Recent", "Renewal", "Not Enrolled", "Gold",] }
	private get FILTER_DEFAULT() { return this.FILTERS[0] }
	private filter = this.FILTER_DEFAULT

	private sendMessageFAB = false
	private members: (string | number)[] = []
	private search = ""
	private expand = false

	private async refresh() {
		await MembersListStore.InitializeGKMMembers()
	}

	private showMemberContextMenu = false
	private memberContextMenuSelection: string | number = -1
	private memberContextMenuPoint: Point = { x: 0, y: 0 }
	private get memberContextMenu() {
		let index = this.tableItems.findIndex(m => m.id === this.memberContextMenuSelection)
		if (!~index) return [{ icon: "warning", name: "No Action", action: () => { } },]
		let clientId = this.memberContextMenuSelection
		return [
			// FIXME: add actions
			true ? { icon: "person", name: "Profile", action: () => { gotoProfile(clientId) } } : false,
			!this.tableItems[index].enrolled ? { icon: "border_horizontal", name: "Enroll", action: () => { enroll(clientId) } } : false,
			[USER_MODE.FREEZE, USER_MODE.ACTIVE,].includes(this.tableItems[index].mode) ? { iconClass: "far", icon: "fa-snowflake", name: this.tableItems[index].mode === USER_MODE.FREEZE ? "Unfreeze" : "Freeze", action: () => { freezeUnfreeze(clientId) } } : false,
			![USER_MODE.BANNED, USER_MODE.ENQUIRY, USER_MODE.TEMPORARY,].includes(this.tableItems[index].mode) ? { iconClass: "far", icon: "autorenew", name: "Renew", action: () => { renew(clientId) } } : false,
			this.tableItems[index].mode === USER_MODE.PREBOOK ? { icon: "alarm_on", name: "Prebook Enroll", action: () => { preebookEnroll(clientId) } } : false,
			true ? { icon: "block", name: this.tableItems[index].mode === USER_MODE.BANNED ? "Unblock" : "Block", action: () => { blockUnblock(clientId) } } : false,
		].filter(i => !!i)
	}
	private memberContextMenuClicked(e: MouseEvent, id: string | number) {
		e.preventDefault()
		this.showMemberContextMenu = false
		this.memberContextMenuSelection = id
		this.memberContextMenuPoint.x = e.clientX
		this.memberContextMenuPoint.y = e.clientY
		// @ts-ignore
		this.$nextTick(() => { this.showMemberContextMenu = true })
	}

	private get tableHeaders() { return MembersListStore.GK_M_MEMBERS_TABLE_HEADING }
	private get tableItems() { return MembersListStore.GK_M_MEMBERS }
	private get refreshing() { return MembersListStore.GK_M_MEMBERS_LOADING }

	private UserMode(name: string | number) {
		return (<TGQLUserMode>GymkonnectStore.GK_USER_MODES.find(i => i.name === name)).description
	}

}