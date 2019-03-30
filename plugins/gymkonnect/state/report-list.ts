import { VuexModule, Module, getModule, MutationAction, Action } from "vuex-module-decorators"
import store from "@/state/store"
import Gymkonnect from "../classes/clients"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`report-list/gk-store`)

let _gk_R_RENEWALS = []
let _gk_R_HEADING_RENEWALS = []
let _gk_R_loading_RENEWALS = false

let _gk_R_FREEZINGS = []
let _gk_R_HEADING_FREEZINGS = []
let _gk_R_loading_FREEZINGS = false

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
	public get GK_R_TABLE_HEADING_RENEWALS() { return this._gk_R_HEADING_RENEWALS }

	private _gk_R_loading_RENEWALS = _gk_R_loading_RENEWALS
	public get GK_R_LOADING_RENEWALS() { return this._gk_R_loading_RENEWALS }
	@MutationAction({ mutate: ["_gk_R_loading_RENEWALS",] }) private async mutate_GK_R_Loading_RENEWALS(payload: boolean) {
		_gk_R_loading_RENEWALS = payload
		return { _gk_R_loading_RENEWALS }
	}

	public get GK_R_contextmenu_RENEWALS() { return Gymkonnect.Reports.RENEWALS.CONTEXTMENU }

	@Action({}) public async Initialize_GK_R_RENEWALS(payload: {
		start?: string,
		end?: string,
	}) {
		await Promise.all([this.mutate_GK_R_Loading_RENEWALS(true),])
		let [items, heading,] = await Promise.all([
			Gymkonnect.Reports.RENEWALS.LIST(payload),
			Gymkonnect.Reports.RENEWALS.TABLE_HEADING(),
		])
		await Promise.all([
			this.mutate_GK_R_RENEWALS(items),
			this.mutate_GK_R_HEADING_RENEWALS(heading),
		])
		await this.mutate_GK_R_Loading_RENEWALS(false)
		return true
	}
	// #endregion RENEWALS

	// #region FREEZINGS
	private _gk_R_FREEZINGS = _gk_R_FREEZINGS
	public get GK_R_FREEZINGS() { return this._gk_R_FREEZINGS }
	@MutationAction({ mutate: ["_gk_R_FREEZINGS",] }) private async mutate_GK_R_FREEZINGS(payload) {
		_gk_R_FREEZINGS = payload
		return { _gk_R_FREEZINGS }
	}
	private _gk_R_HEADING_FREEZINGS = _gk_R_HEADING_FREEZINGS
	@MutationAction({ mutate: ["_gk_R_HEADING_FREEZINGS",] }) private async mutate_GK_R_HEADING_FREEZINGS(payload) {
		_gk_R_HEADING_FREEZINGS = payload
		return { _gk_R_HEADING_FREEZINGS }
	}
	public get GK_R_TABLE_HEADING_FREEZINGS() { return this._gk_R_HEADING_FREEZINGS }

	private _gk_R_loading_FREEZINGS = _gk_R_loading_FREEZINGS
	public get GK_R_LOADING_FREEZINGS() { return this._gk_R_loading_FREEZINGS }
	@MutationAction({ mutate: ["_gk_R_loading_FREEZINGS",] }) private async mutate_GK_R_Loading_FREEZINGS(payload: boolean) {
		_gk_R_loading_FREEZINGS = payload
		return { _gk_R_loading_FREEZINGS }
	}

	public get GK_R_contextmenu_FREEZINGS() { return Gymkonnect.Reports.FREEZINGS.CONTEXTMENU }

	@Action({}) public async Initialize_GK_R_FREEZINGS(payload: {
		start?: string,
		end?: string,
	}) {
		await Promise.all([this.mutate_GK_R_Loading_FREEZINGS(true),])
		let [items, heading,] = await Promise.all([
			Gymkonnect.Reports.FREEZINGS.LIST(payload),
			Gymkonnect.Reports.FREEZINGS.TABLE_HEADING(),
		])
		await Promise.all([
			this.mutate_GK_R_FREEZINGS(items),
			this.mutate_GK_R_HEADING_FREEZINGS(heading),
		])
		await this.mutate_GK_R_Loading_FREEZINGS(false)
		return true
	}
	// #endregion FREEZINGS

	public get GK_R_LOADING_ANY(){
		return this._gk_R_loading_RENEWALS
	}
}

export const ReportsListStore = getModule(ReportsList)