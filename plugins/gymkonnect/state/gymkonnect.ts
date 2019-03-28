import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import store from "@/state/store"
import GKHelper,
	{
		TGQLOccupations, TGQLCategories, TGQLIDProofs, TGQLGroupings, TGQLBodyTypes,
		TGQLOrganizationTypes, TGQLPackages, TGQLPurposes, TGQLMembershipTypes, TGQLPaymentModes,
		TGQLBloodGroup, TGQLTimeSlot, TGQLUTMSource, TGQLDoor, TGQLOffer,
		TGQLUserMode, TGQLSpaAmenities, TGQLSpaGroupings, TGQLPTPackages, TGQLPTPurposes,
		TGQLPTTrainerType,
	TGQLFCPurposes, TGQLFCCounsellor
	}
from "./gk-helper"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger("store/gk")

let _gk_occupations: TGQLOccupations[] = []
let _gk_categories: TGQLCategories[] = []
let _gk_idTypes: TGQLIDProofs[] = []
let _gk_groupings: TGQLGroupings[] = []
let _gk_spa_groupings: TGQLSpaGroupings[] = []
let _gk_bodyTypes: TGQLBodyTypes[] = []
let _gk_organizationTypes: TGQLOrganizationTypes[] = []
let _gk_regType = []
let _gk_packages: TGQLPackages[] = []
let _gk_pt_packages: TGQLPTPackages[] = []
let _gk_purposes: TGQLPurposes[] = []
let _gk_pt_purposes: TGQLPTPurposes[] = []
let _gk_fc_purposes: TGQLFCPurposes[] = []
let _gk_membershipTypes: TGQLMembershipTypes[] = []
let _gk_paymentModes: TGQLPaymentModes[] = []
let _gk_bloodGroups: TGQLBloodGroup[] = []
let _gk_timeSlots: TGQLTimeSlot[] = []
let _gk_utmSources: TGQLUTMSource[] = []
let _gk_doors: TGQLDoor[] = []
let _gk_offers: TGQLOffer[] = []
let _gk_userModes: TGQLUserMode[] = []
let _gk_spa_amenities: TGQLSpaAmenities[] = []
let _gk_pt_trainerType: TGQLPTTrainerType[] = []
let _gk_fc_counsellor: TGQLFCCounsellor[] = []

@Module({ dynamic: true, store, name: "Gymkonnect" })
class Gymkonnect extends VuexModule {
	private _gk_occupations = _gk_occupations

	/**
	 * Get all OCCUPATIONS
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_OCCUPATIONS() { return this._gk_occupations }

	/**
	 * Get OCCUPATION by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_OCCUPATION() { return (id: string | number) => this._gk_occupations.find(i => i.id === id) }

	private _gk_userModes = _gk_userModes

	/**
	 * Get all OCCUPATIONS
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_USER_MODES() { return this._gk_userModes }

	/**
	 * Get OCCUPATION by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_USER_MODE() { return (key: string | number, element: keyof TGQLUserMode = "id") => this._gk_userModes.find(i => i["id"] === key) }

	private _gk_categories = _gk_categories

	/**
	 * Get all CATEGORIES
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_CATEGORIES() { return this._gk_categories }

	/**
	 * Get CATEGORY by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_CATEGORY() { return (id: string | number) => this._gk_categories.find(i => i.id === id) }

	private _gk_idTypes = _gk_idTypes

	/**
	 * Get all ID_TYPES
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_ID_TYPES() { return this._gk_idTypes }

	/**
	 * Get ID_TYPE by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_ID_TYPE() { return (id: string | number) => this._gk_idTypes.find(i => i.id === id) }

	private _gk_bodyTypes = _gk_bodyTypes

	/**
	 * Get all BODY_TYPES
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_BODY_TYPES() { return this._gk_bodyTypes }

	/**
	 * Get BODY_TYPE by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_BODY_TYPE() { return (id: string | number) => this._gk_bodyTypes.find(i => i.id === id) }

	private _gk_groupings = _gk_groupings

	/**
	 * Get all GROUPINGS
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_GROUPINGS() { return this._gk_groupings }

	/**
	 * Get GROUPING by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_GROUPING() { return (id: string | number) => this._gk_groupings.find(i => i.id === id) }

	private _gk_spa_groupings = _gk_spa_groupings

	/**
	 * Get all GROUPINGS
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_SPA_GROUPINGS() { return this._gk_spa_groupings }

	/**
	 * Get GROUPING by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_SPA_GROUPING() { return (id: string | number) => this._gk_spa_groupings.find(i => i.id === id) }

	private _gk_purposes = _gk_purposes

	/**
	 * Get all PURPOSES
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_PURPOSES() { return this._gk_purposes }

	/**
	 * Get PURPOSE by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_PURPOSE() { return (id: string | number) => this._gk_purposes.find(i => i.id === id) }

	private _gk_fc_purposes = _gk_fc_purposes

	/**
	 * Get all PURPOSES
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_FC_PURPOSES() { return this._gk_fc_purposes }

	/**
	 * Get PURPOSE by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_FC_PURPOSE() { return (id: string | number) => this._gk_fc_purposes.find(i => i.id === id) }

	private _gk_pt_purposes = _gk_pt_purposes

	/**
	 * Get all PURPOSES
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_PT_PURPOSES() { return this._gk_pt_purposes }

	/**
	 * Get PURPOSE by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_PT_PURPOSE() { return (id: string | number) => this._gk_pt_purposes.find(i => i.id === id) }

	private _gk_membershipTypes = _gk_membershipTypes
	/**
	 * Get all MEMBERSHIP_TYPES
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_MEMBERSHIP_TYPES() { return this._gk_membershipTypes }

	/**
	 * Get MEMBERSHIP_TYPE by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_MEMBERSHIP_TYPE() { return (id: string | number) => this._gk_membershipTypes.find(i => i.id === id) }

	private _gk_packages = _gk_packages
	/**
	 * Get all PACKAGES
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_PACKAGES() { return this._gk_packages }

	/**
	 * Get PACKAGE by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_PACKAGE() { return (id: string | number) => this._gk_packages.find(i => i.id === id) }

	private _gk_pt_packages = _gk_pt_packages
	/**
	 * Get all PACKAGES
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_PT_PACKAGES() { return this._gk_pt_packages }

	/**
	 * Get PACKAGE by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_PT_PACKAGE() { return (id: string | number) => this._gk_pt_packages.find(i => i.id === id) }

	private _gk_pt_trainerType = _gk_pt_trainerType
	/**
	 * Get all PACKAGES
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_PT_TRAINER_TYPES() { return this._gk_pt_trainerType }

	/**
	 * Get PACKAGE by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_PT_TRAINER_TYPE() { return (id: string | number) => this._gk_pt_trainerType.find(i => i.id === id) }

	private _gk_timeSlots = _gk_timeSlots
	/**
	 * Get all TIME_SLOTS
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_TIME_SLOTS() { return this._gk_timeSlots }

	/**
	 * Get TIME_SLOT by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_TIME_SLOT() { return (id: string | number) => this._gk_timeSlots.find(i => i.id === id) }

	private _gk_doors = _gk_doors
	/**
	 * Get all DOORS
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_DOORS() { return this._gk_doors }

	/**
	 * Get DOOR by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_DOOR() { return (id: string | number) => this._gk_doors.find(i => i.id === id) }

	private _gk_utmSources = _gk_utmSources
	/**
	 * Get all UTM_SOURCES
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_UTM_SOURCES() { return this._gk_utmSources }

	/**
	 * Get UTM_SOURCE by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_UTM_SOURCE() { return (id: string | number) => this._gk_utmSources.find(i => i.id === id) }

	private _gk_organizationTypes = _gk_organizationTypes
	/**
	 * Get all ORGANIZATION_TYPES
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_ORGANIZATION_TYPES() { return this._gk_organizationTypes }

	/**
	 * Get ORGANIZATION_TYPE by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_ORGANIZATION_TYPE() { return (id: string | number) => this._gk_organizationTypes.find(i => i.id === id) }

	private _gk_paymentModes = _gk_paymentModes
	/**
	 * Get all PAYMENT_MODES
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_PAYMENT_MODES() { return this._gk_paymentModes }

	/**
	 * Get PAYMENT_MODE by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_PAYMENT_MODE() { return (id: string | number) => this._gk_paymentModes.find(i => i.id === id) }

	private _gk_bloodGroups = _gk_bloodGroups
	/**
	 * Get all BLOOD_GROUPS
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_BLOOD_GROUPS() { return this._gk_bloodGroups }

	/**
	 * Get BLOOD_GROUP by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_BLOOD_GROUP() { return (id: string | number) => this._gk_bloodGroups.find(i => i.id === id) }

	private _gk_offers = _gk_offers
	/**
	 * Get all ALL_gk_OFFERS
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_ALL_OFFERS() { return this._gk_offers }

	private _gk_fc_counsellor = _gk_fc_counsellor

	/**
	 * Get all Counsellors
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_FC_COUNSELLOR() { return this._gk_fc_counsellor }

	/**
	 * Get ALL_OFFER by ID
	 *
	 * @readonly
	 * @memberof Gymkonnect
	 */
	public get GK_ALL_OFFER() { return (id: string | number) => this._gk_offers.find(i => i.id === id) }

	private _gk_spa_amenities = _gk_spa_amenities
	public get GK_SPA_AMENITIES() { return this._gk_spa_amenities }
	public get GK_SPA_AMENITY() { return (id: string|number) => this._gk_spa_amenities.find(i => i.id===id) }

	private _gk_regType = _gk_regType
	public get GK_REGISTRATION_TYPE() { return this._gk_regType }

	@MutationAction({
		mutate: [
			"_gk_bloodGroups",
			"_gk_bodyTypes",
			"_gk_categories",
			"_gk_doors",
			"_gk_groupings",
			"_gk_idTypes",
			"_gk_membershipTypes",
			"_gk_occupations",
			"_gk_organizationTypes",
			"_gk_packages",
			"_gk_paymentModes",
			"_gk_purposes",
			"_gk_timeSlots",
			"_gk_utmSources",
			"_gk_offers",
			"_gk_userModes",
			"_gk_spa_amenities",
			"_gk_spa_groupings",
			"_gk_pt_purposes",
			"_gk_pt_packages",
			"_gk_pt_trainerType",
			"_gk_fc_purposes",
			"_gk_fc_counsellor",
		]
	})
	public async GK_Initialize() {
		Console.verbose("initializing")
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
				XuserModes,
				Xspa_amenities,
				Xspa_groupings,
				Xpt_purposes,
				Xpt_packages,
			] = await Promise.all([
				GKHelper.GetBloodGroups(),
				GKHelper.GetTimeSlots(),
				GKHelper.GetUTMSources(),
				GKHelper.GetDoors(),
				GKHelper.GetAllOffers(),
				GKHelper.GetUserModes(),
				GKHelper.GetSpaAmenities(),
				GKHelper.GetSpaGroupings(),
				GKHelper.GetPTPurposes(),
				GKHelper.GetPTPackages(),
			])
			let [
				Xpt_trainerType,
				Xfc_purposes,
				Xfc_counsellor,
			] = await Promise.all([
				GKHelper.GetPTTrainerTypes(),
				GKHelper.GetFCPurposes(),
			])
			// let [] = await Promise.all([])
			_gk_occupations = Xoccupations
			_gk_categories = Xcategories
			_gk_idTypes = XidTypes
			_gk_groupings = Xgroupings
			_gk_bodyTypes = XbodyTypes
			_gk_organizationTypes = XorganizationTypes
			_gk_packages = Xpackages
			_gk_purposes = Xpurposes
			_gk_membershipTypes = XmembershipTypes
			_gk_paymentModes = XpaymentModes
			_gk_bloodGroups = XbloodGroups
			_gk_timeSlots = XtimeSlots
			_gk_utmSources = XutmSources
			_gk_doors = Xdoors
			_gk_offers = Xoffers
			_gk_userModes = XuserModes
			_gk_spa_amenities = Xspa_amenities
			_gk_spa_groupings = Xspa_groupings
			_gk_pt_purposes = Xpt_purposes
			_gk_pt_packages = Xpt_packages
			_gk_pt_trainerType = Xpt_trainerType
			_gk_fc_purposes = Xfc_purposes
			_gk_fc_counsellor = Xfc_counsellor
			return {
				_gk_bloodGroups,
				_gk_bodyTypes,
				_gk_categories,
				_gk_doors,
				_gk_groupings,
				_gk_idTypes,
				_gk_membershipTypes,
				_gk_occupations,
				_gk_organizationTypes,
				_gk_packages,
				_gk_paymentModes,
				_gk_purposes,
				_gk_timeSlots,
				_gk_utmSources,
				_gk_offers,
				_gk_userModes,
				_gk_spa_amenities,
				_gk_spa_groupings,
				_gk_pt_purposes,
				_gk_pt_packages,
				_gk_pt_trainerType,
				_gk_fc_purposes,
				_gk_fc_counsellor
			}
		} catch (error) {
			Console.error("Gymkonnect Store failed to initialize", error)
			throw "Gymkonnect Store failed to initialize"
		}
	}
}

export const GymkonnectStore = getModule(Gymkonnect)