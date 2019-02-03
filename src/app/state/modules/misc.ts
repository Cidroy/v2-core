import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import store from "@/state/store"

let _occupations: string[] = [
	"Teacher",
	"Engineer",
	"Doctor",
	"Student",
]

let _categories: string[] = [
	"student",
	"Senior Citizen",
	"Professionals",
	"Buisness Man",
]

let _idProofs: string[] = [
	"Aadhaar Card",
	"Passport",
	"License",
	"Pan Card",
	"Voter ID",
]

let _bodyTypes: string[] = [
	"endomorph",
	"ectomorph",
	"mesomorph",
]

let _groupings = {
	Solo : {
		value:"SOLO",
		count: 1,
		min: 1,
		max: 1,
	},
	Couple : {
		value:"COUPLE",
		count: 2,
		min: 2,
		max: 2,
	},
	Group : {
		value:"GROUP",
		count: 2,
		min: 2,
		max: 8,
	},
}

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
	private _occupations: string[] = _occupations
	public get OCCUPATIONS(): string[] { return this._occupations }

	private _categories: string[] = _categories
	public get CATEGORIES(): string[] { return this._categories }

	private _idProofs: string[] = _idProofs
	public get ID_PROOFS(): string[] { return this._idProofs }

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
}

export const MiscStore = getModule(Misc)