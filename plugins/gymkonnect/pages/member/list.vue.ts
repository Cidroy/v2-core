import appConfig from "@/app.config"
import Layout from "@/layouts/layout.vue"
import { Component, Vue } from "vue-property-decorator"
import SendMessageFab from "@plugins/gymkonnect/components/send-message/fab.vue"
import { Permissions as gymkonnect } from "@plugins/gymkonnect/permission"
import { TMemberListTableHeader } from "@plugins/gymkonnect/classes/types/member-list"
import { MembersListStore } from "@plugins/gymkonnect/state/member-list"

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

	private get FILTERS() { return ["All", "Recent", "Renewal", "Not Enrolled", "Gold",] }
	private get FILTER_DEFAULT() { return this.FILTERS[0] }
	private filter = this.FILTER_DEFAULT

	private sendMessageFAB = false
	private members: (string | number)[] = []
	private search = ""
	private expand = false

	private async refresh() {
		MembersListStore.InitializeGKMMembers()
	}

	private showMemberContextMenu = false
	private memberContextMenuSelection: string | number = -1
	private memberContextMenuPoint: Point = { x: 0, y: 0 }
	private get memberContextMenu() {
		let index = this.tableItems.findIndex(m => m.id === this.memberContextMenuSelection)
		if (!~index) return [ { icon: "warning", name: "No Action", action: () => { } }, ]
		return [
			// FIXME: add actions
			true ? { icon: "person", name: "Profile", action: () => { } } : false,
			!this.tableItems[index].enrolled ? { icon: "border_horizontal", name: "Enroll", action: () => { } } : false,
			["FREEZED", "ACTIVE",].includes(this.tableItems[index].mode) ? { iconClass: "far", icon: "fa-snowflake", name: this.tableItems[index].mode === "FREEZED" ? "Unfreeze" : "Freeze", action: () => { } } : false,
			this.tableItems[index].mode === "PREBOOKED" ? { icon: "alarm_on", name: "Prebook Enroll", action: () => { } } : false,
			true ? { icon: "block", name: this.tableItems[index].mode === "BLOCKED"?"Unblock":"Block", action: () => { } } : false,
		].filter( i => !!i )
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
}