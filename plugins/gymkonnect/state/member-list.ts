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
			{ text: "Badge", align: "left", value: "badgenumber", width: "100px", },
			{ text: "Status", value: "mode", width: "100px", },
			{ text: "Name", value: "name", width: "200px", },
			{ text: "Due Date", value: "endDate", width: "10%", },
			{ text: "Membership", value: "membership", width: "10%", },
			{ text: "Package", value: "package", width: "10%", },
			{ text: "Mobile No.", value: "mobile", width: "10%", },
			{ text: "Enrolled", value: "enrolled", width: "100px", },
		]
	}

	private _gk_m_members_loading = _gk_m_members_loading
	public get GK_M_MEMBERS_LOADING() { return this._gk_m_members_loading }
	@MutationAction({ mutate: [ "_gk_m_members_loading", ] }) private async mutateGKMMembersLoading( payload: boolean ) {
		_gk_m_members_loading = payload
		return { _gk_m_members_loading }
	}

	@Action({}) public async InitializeGKMMembers() {
		await Promise.all([
			this.mutateGKMMembersLoading(true),
			sleep(1000),
		])
		let result = await Gymkonnect.Members.getAllMembersForRegistrationList()
		await this.mutateGKMMembers(result)
		await this.mutateGKMMembersLoading(false)
		return true
	}
}

export const MembersListStore = getModule(MembersList)