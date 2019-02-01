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
}

export const MiscStore = getModule(Misc)