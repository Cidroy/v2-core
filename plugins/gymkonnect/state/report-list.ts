import { VuexModule, Module, getModule, MutationAction, Action } from "vuex-module-decorators"
import store from "@/state/store"
import Gymkonnect from "../classes/clients"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`report-list/gk-store`)

let _gk_R_RENEWALS = []
let _gk_R_HEADING_RENEWALS = []
let _gk_R_loading_RENEWALS = false

@Module({ dynamic: true, store, name: "ReportsList" })
class ReportsList extends VuexModule {

	// #region RENEWALS
	private _gk_R_RENEWALS = _gk_R_RENEWALS
	public get GK_R_RENEWALS() { return this._gk_R_RENEWALS }
	@MutationAction({ mutate: ["_gk_R_RENEWALS",] }) private async mutate_GK_R_RENEWALS(payload) {
		_gk_R_RENEWALS = payload
		return { _gk_R_RENEWALS }
	}
	private _gk_R_HEADING_RENEWALS = _gk_R_HEADING_RENEWALS
	@MutationAction({ mutate: ["_gk_R_HEADING_RENEWALS",] }) private async mutate_GK_R_HEADING_RENEWALS(payload) {
		_gk_R_HEADING_RENEWALS = payload
		return { _gk_R_HEADING_RENEWALS }
	}
	public get GK_R_TABLE_HEADING_RENEWALS() {
		return [
			{ text: "Badge", value: "badgenumber", align: "left", width: "100px", },
			{ text: "Status", value: "mode", width: "100px", },
			{ text: "Name", value: "name", width: "200px", },
			{ text: "Due Date", value: "endDate", width: "10%", },
			{ text: "Membership", value: "membership", width: "10%", },
			{ text: "Package", value: "package", width: "10%", },
			{ text: "Mobile No.", value: "mobile", width: "10%", },
			{ text: "Enrolled", value: "enrolled", width: "100px", },
		]
		return this._gk_R_HEADING_RENEWALS
	}

	private _gk_R_loading_RENEWALS = _gk_R_loading_RENEWALS
	public get GK_R_LOADING_RENEWALS() { return this._gk_R_loading_RENEWALS }
	@MutationAction({ mutate: ["_gk_R_loading_RENEWALS",] }) private async mutate_GK_R_Loading_RENEWALS(payload: boolean) {
		_gk_R_loading_RENEWALS = payload
		return { _gk_R_loading_RENEWALS }
	}

	public get GK_R_contextmenu_RENEWALS() { return Gymkonnect.Reports.Renewals.CONTEXTMENU }

	@Action({}) public async Initialize_GK_R_RENEWALS(payload: {
		start?: string,
		end?: string,
	}) {
		await Promise.all([this.mutate_GK_R_Loading_RENEWALS(true),])
		let [items, heading,] = await Promise.all([
			Gymkonnect.Reports.Renewals.LIST(payload),
			Gymkonnect.Reports.Renewals.TABLE_HEADING(),
		])
		await Promise.all([
			this.mutate_GK_R_RENEWALS(items),
			this.mutate_GK_R_HEADING_RENEWALS(heading),
		])
		await this.mutate_GK_R_Loading_RENEWALS(false)
		return true
	}

	// #endregion RENEWALS

	public get GK_R_LOADING_ANY(){
		return this._gk_R_loading_RENEWALS
	}
}

export const ReportsListStore = getModule(ReportsList)