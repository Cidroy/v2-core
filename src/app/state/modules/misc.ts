import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import store from "@/state/store"
import GKHelper, { TGQLOccupations, TGQLCategories, TGQLIDProofs, TGQLGroupings } from "./gk-helper"

let _occupations: TGQLOccupations[] = []
let _categories: TGQLCategories[] = []
let _idTypes: TGQLIDProofs[] = []
let _groupings: TGQLGroupings[] = []

let _bodyTypes: string[] = [
	"endomorph",
	"ectomorph",
	"mesomorph",
]

let _membershipTypes = {
	Gold: "GOLD",
	Platinum: "PLATINUM",
}

let _packages = {
	Monthly: 1,
	Quaterly: 2,
	"Half-Yearly": 3,
	Yearly: 4,
}

let _timeSlots = {
	"Peak Hours": 1,
	"Off-Peak Hours": 2,
}

let _purposes: string[] = [
	"General Fitness",
	"Lose Fat",
	"Gain Muscle",
	"Tone Up",
	"Sports Oriented",
	"Lifestyle",
	"Transform",
	"Specialized Training",
]

let _doors = {
	"Gym Mens Section": "gym-men",
	"Gym Ladies Section": "gym-women",
	SPA: "spa",
}

let _utmSources = {
	"Family/Friends": "family-friends",
	Advertisement: "Advertisement",
	"Walk-In": "Walk-In",
	Internet: "Internet",
	Recommendation: "Recommendation",
	Telephonic: "Telephonic",
}

@Module({ dynamic: true, store, name: "Misc" })
class Misc extends VuexModule {
	private _occupations = _occupations
	public get OCCUPATIONS() { return this._occupations }

	private _categories = _categories
	public get CATEGORIES() { return this._categories }

	private _idTypes = _idTypes
	public get ID_TYPES() { return this._idTypes }

	private _bodyTypes: string[] = _bodyTypes
	public get BODY_TYPES(): string[] { return this._bodyTypes }

	private _groupings = _groupings
	public get GROUPINGS() { return this._groupings }

	private _purposes = _purposes
	public get PURPOSES() {return this._purposes}

	private _membershipTypes = _membershipTypes
	public get MEMBERSHIP_TYPES() {return this._membershipTypes}

	private _packages = _packages
	public get PACKAGES() {return this._packages}

	private _timeSlots = _timeSlots
	public get TIME_SLOTS() {return this._timeSlots}

	private _doors = _doors
	public get DOORS() {return this._doors}

	private _utmSources = _utmSources
	public get UTM_SOURCES() {return this._utmSources}

	@MutationAction({ mutate: [
		"_occupations",
		"_categories",
		"_idTypes",
		"_groupings",
	] })
	public async Initialize(){
		let [
			Xoccupations,
			Xcategories,
			XidTypes,
			Xgroupings,
		] = await Promise.all([
			GKHelper.GetOccupations(),
			GKHelper.GetCategories(),
			GKHelper.GetIdProofs(),
			GKHelper.GetGroupings(),
		])
		_occupations = Xoccupations
		_categories = Xcategories
		_idTypes = XidTypes
		_groupings = Xgroupings
		return {
			_occupations,
			_categories,
			_idTypes,
			_groupings,
		}
	}
}

export const MiscStore = getModule(Misc)