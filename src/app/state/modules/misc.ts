import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import store from "@/state/store"
import GKHelper, { TGQLOccupations, TGQLCategories, TGQLIDProofs, TGQLGroupings, TGQLBodyTypes, TGQLOrganizationTypes, TGQLPackages, TGQLPurposes, TGQLMembershipTypes, TGQLPaymentModes } from "./gk-helper"

let _occupations: TGQLOccupations[] = []
let _categories: TGQLCategories[] = []
let _idTypes: TGQLIDProofs[] = []
let _groupings: TGQLGroupings[] = []
let _bodyTypes: TGQLBodyTypes[] = []
let _organizationTypes: TGQLOrganizationTypes[] = []
let _packages: TGQLPackages[] = []
let _purposes: TGQLPurposes[] = []
let _membershipTypes: TGQLMembershipTypes[] = []
let _paymentModes: TGQLPaymentModes[] = []

let _timeSlots = {
	"Peak Hours": 1,
	"Off-Peak Hours": 2,
}

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

	private _bodyTypes = _bodyTypes
	public get BODY_TYPES() { return this._bodyTypes }

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

	private _organizationTypes = _organizationTypes
	public get ORGANIZATION_TYPES() { return this._organizationTypes}

	private _paymentModes = _paymentModes
	public get PAYMENT_MODES() { return this._paymentModes}

	@MutationAction({ mutate: [
		"_occupations",
		"_categories",
		"_idTypes",
		"_groupings",
		"_bodyTypes",
		"_organizationTypes",
		"_packages",
		"_purposes",
		"_membershipTypes",
		"_paymentModes",
	] })
	public async Initialize(){
		let [
			Xoccupations,
			Xcategories,
			XidTypes,
			Xgroupings,
			XbodyTypes,
			XorganizationTypes,
			Xpackages,
			Xpurposes,
			XmembershipTypes,
			XpaymentModes,
		] = await Promise.all([
			GKHelper.GetOccupations(),
			GKHelper.GetCategories(),
			GKHelper.GetIdProofs(),
			GKHelper.GetGroupings(),
			GKHelper.GetBodyTypes(),
			GKHelper.GetOrganizationTypes(),
			GKHelper.GetPackages(),
			GKHelper.GetPurposes(),
			GKHelper.GetMembershipTypes(),
			GKHelper.GetPaymentModes(),
		])
		_occupations = Xoccupations
		_categories = Xcategories
		_idTypes = XidTypes
		_groupings = Xgroupings
		_bodyTypes = XbodyTypes
		_organizationTypes = XorganizationTypes
		_packages = Xpackages
		_purposes = Xpurposes
		_membershipTypes = XmembershipTypes
		_paymentModes = XpaymentModes
		return {
			_occupations,
			_categories,
			_idTypes,
			_groupings,
			_bodyTypes,
			_organizationTypes,
			_packages,
			_purposes,
			_membershipTypes,
			_paymentModes,
		}
	}
}

export const MiscStore = getModule(Misc)