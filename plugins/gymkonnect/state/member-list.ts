import { VuexModule, Module, getModule, MutationAction, Action } from "vuex-module-decorators"
import store from "@/state/store"
import { TMemberListTableItems } from "../classes/types/member-list"
import Gymkonnect from "../classes/clients"
import { sleep } from "@classes/misc"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`member-list/gk-store`)
let _gk_m_members: TMemberListTableItems[] = []
let _gk_m_members_loading = false

@Module({ dynamic: true, store, name: "MembersList" })
class MembersList extends VuexModule {
	private _gk_m_members = _gk_m_members
	public get GK_M_MEMBERS() { return this._gk_m_members }
	@MutationAction({ mutate: ["_gk_m_members",] }) private async mutateGKMMembers(payload: TMemberListTableItems[]) {
		_gk_m_members = payload
		return { _gk_m_members }
	}
	public get GK_M_MEMBERS_TABLE_HEADING() {
		return [
			{ text: "BadgeNumber", align: "left", value: "badgenumber" },
			{ text: "Status", value: "mode" },
			{ text: "Name", value: "name" },
			{ text: "Due Date", value: "endDate", },
			{ text: "Membership", value: "membership" },
			{ text: "Package", value: "package" },
			{ text: "Mobile No.", value: "mobile" },
			{ text: "Enorll Status", value: "enrolled" },
		]
	}

	private _gk_m_members_loading = _gk_m_members_loading
	public get GK_M_MEMBERS_LOADING() { return this._gk_m_members_loading }
	@MutationAction({ mutate: [ "_gk_m_members_loading", ] }) private async mutateGKMMembersLoading( payload: boolean ) {
		_gk_m_members_loading = payload
		return { _gk_m_members_loading }
	}

	@Action({}) public async InitializeGKMMembers() {
		await this.mutateGKMMembersLoading(true)
		await sleep(2000)
		let result = await Gymkonnect.Members.getAllMembersForRegistrationList()
		Console.okay("B")
		await this.mutateGKMMembers(result),
		Console.okay("D")
		await this.mutateGKMMembersLoading(false),
		Console.okay("E")
		return true
	}
}

export const MembersListStore = getModule(MembersList)