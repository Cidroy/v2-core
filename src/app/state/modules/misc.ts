import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import store from "@/state/store"
import GKHelper, { TGQLOccupations, TGQLCategories, TGQLIDProofs, TGQLGroupings, TGQLBodyTypes, TGQLOrganizationTypes, TGQLPackages, TGQLPurposes, TGQLMembershipTypes, TGQLPaymentModes, TGQLBloodGroup, TGQLTimeSlot, TGQLUTMSource, TGQLDoor, TGQLOffer } from "./gk-helper"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger("gk-store/misc")

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
let _bloodGroups: TGQLBloodGroup[] = []
let _timeSlots: TGQLTimeSlot[] = []
let _utmSources: TGQLUTMSource[] = []
let _doors: TGQLDoor[] = []
let _offers: TGQLOffer[] = []

@Module({ dynamic: true, store, name: "Misc" })
class Misc extends VuexModule {
	private _occupations = _occupations

	/**
	 * Get all OCCUPATIONS
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get OCCUPATIONS() { return this._occupations }

	/**
	 * Get OCCUPATION by ID
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get OCCUPATION() { return id => this._occupations.find(i => i.id === id) }

	private _categories = _categories

	/**
	 * Get all CATEGORIES
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get CATEGORIES() { return this._categories }

	/**
	 * Get CATEGORY by ID
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get CATEGORY() { return id => this._categories.find(i => i.id === id) }

	private _idTypes = _idTypes

	/**
	 * Get all ID_TYPES
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get ID_TYPES() { return this._idTypes }

	/**
	 * Get ID_TYPE by ID
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get ID_TYPE() { return id => this._idTypes.find(i => i.id === id) }

	private _bodyTypes = _bodyTypes

	/**
	 * Get all BODY_TYPES
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get BODY_TYPES() { return this._bodyTypes }

	/**
	 * Get BODY_TYPE by ID
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get BODY_TYPE() { return id => this._bodyTypes.find(i => i.id === id) }

	private _groupings = _groupings

	/**
	 * Get all GROUPINGS
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get GROUPINGS() { return this._groupings }

	/**
	 * Get GROUPING by ID
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get GROUPING() { return id => this._groupings.find(i => i.id === id) }

	private _purposes = _purposes

	/**
	 * Get all PURPOSES
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get PURPOSES() { return this._purposes }

	/**
	 * Get PURPOSE by ID
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get PURPOSE() { return id => this._purposes.find(i => i.id === id) }

	private _membershipTypes = _membershipTypes
	/**
	 * Get all MEMBERSHIP_TYPES
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get MEMBERSHIP_TYPES() { return this._membershipTypes }

	/**
	 * Get MEMBERSHIP_TYPE by ID
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get MEMBERSHIP_TYPE() { return id => this._membershipTypes.find(i => i.id === id) }

	private _packages = _packages
	/**
	 * Get all PACKAGES
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get PACKAGES() { return this._packages }

	/**
	 * Get PACKAGE by ID
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get PACKAGE() { return id => this._packages.find(i => i.id === id) }

	private _timeSlots = _timeSlots
	/**
	 * Get all TIME_SLOTS
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get TIME_SLOTS() { return this._timeSlots }

	/**
	 * Get TIME_SLOT by ID
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get TIME_SLOT() { return id => this._timeSlots.find(i => i.id === id) }

	private _doors = _doors
	/**
	 * Get all DOORS
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get DOORS() { return this._doors }

	/**
	 * Get DOOR by ID
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get DOOR() { return id => this._doors.find(i => i.id === id) }

	private _utmSources = _utmSources
	/**
	 * Get all UTM_SOURCES
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get UTM_SOURCES() { return this._utmSources }

	/**
	 * Get UTM_SOURCE by ID
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get UTM_SOURCE() { return id => this._utmSources.find(i => i.id === id) }

	private _organizationTypes = _organizationTypes
	/**
	 * Get all ORGANIZATION_TYPES
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get ORGANIZATION_TYPES() { return this._organizationTypes }

	/**
	 * Get ORGANIZATION_TYPE by ID
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get ORGANIZATION_TYPE() { return id => this._organizationTypes.find(i => i.id === id) }

	private _paymentModes = _paymentModes
	/**
	 * Get all PAYMENT_MODES
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get PAYMENT_MODES() { return this._paymentModes }

	/**
	 * Get PAYMENT_MODE by ID
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get PAYMENT_MODE() { return id => this._paymentModes.find(i => i.id === id) }

	private _bloodGroups = _bloodGroups
	/**
	 * Get all BLOOD_GROUPS
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get BLOOD_GROUPS() { return this._bloodGroups }

	/**
	 * Get BLOOD_GROUP by ID
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get BLOOD_GROUP() { return id => this._bloodGroups.find(i => i.id === id) }

	private _offers = _offers
	/**
	 * Get all ALL_OFFERS
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get ALL_OFFERS() { return this._offers }

	/**
	 * Get ALL_OFFER by ID
	 *
	 * @readonly
	 * @memberof Misc
	 */
	public get ALL_OFFER() { return id => this._offers.find(i => i.id === id) }

	@MutationAction({
		mutate: [
			"_bloodGroups",
			"_bodyTypes",
			"_categories",
			"_doors",
			"_groupings",
			"_idTypes",
			"_membershipTypes",
			"_occupations",
			"_organizationTypes",
			"_packages",
			"_paymentModes",
			"_purposes",
			"_timeSlots",
			"_utmSources",
			"_offers",
		]
	})
	public async Initialize() {
		try {
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
				GKHelper.GetIdTypes(),
				GKHelper.GetGroupings(),
				GKHelper.GetBodyTypes(),
				GKHelper.GetOrganizationTypes(),
				GKHelper.GetPackages(),
				GKHelper.GetPurposes(),
				GKHelper.GetMembershipTypes(),
				GKHelper.GetPaymentModes(),
			])
			let [
				XbloodGroups,
				XtimeSlots,
				XutmSources,
				Xdoors,
				Xoffers,
			] = await Promise.all([
				GKHelper.GetBloodGroups(),
				GKHelper.GetTimeSlots(),
				GKHelper.GetUTMSources(),
				GKHelper.GetDoors(),
				GKHelper.GetAllOffers(),
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
			_bloodGroups = XbloodGroups
			_timeSlots = XtimeSlots
			_utmSources = XutmSources
			_doors = Xdoors
			_offers = Xoffers
			return {
				_bloodGroups,
				_bodyTypes,
				_categories,
				_doors,
				_groupings,
				_idTypes,
				_membershipTypes,
				_occupations,
				_organizationTypes,
				_packages,
				_paymentModes,
				_purposes,
				_timeSlots,
				_utmSources,
				_offers,
			}
		} catch (error) {
			Console.error("Misc Store failed to initialize", error)
			throw "Misc Store failed to initialize"
		}
	}
}

export const MiscStore = getModule(Misc)