import { MiscStore } from "@/state/modules/misc"
import { GENDER, ADDRESS_TYPE } from "@classes/enum/misc"
import IAddress from "@classes/interface/IAddress"
import AddressStore from "@/state/modules/addresses"

export type TMRegistrationStep1 = {
	id: number| string
	badgenumber: number| string
	firstName: string
	middleName: string
	lastName: string
	photo: string
	gender: GENDER
	dob: string
	occupation: string| number
	idType: string| number
	idNumber: string
}

export const defaultRegistrationStep1User: TMRegistrationStep1 = {
	id: 0,
	badgenumber: 0,
	firstName: "",
	middleName: "",
	lastName: "",
	photo: "",
	gender: GENDER.MALE,
	dob: new Date().toISOString().substr(0, 10),
	occupation: MiscStore.OCCUPATIONS[0].id,
	idType: MiscStore.ID_TYPES[0].id,
	idNumber: "",
}

export type TMRegistrationStep2 = {
	mobile: string
	whatsappNumber: string
	homeNumber: string
	officeNumber: string
	address: Partial<IAddress>
	emergencyContactName: string
	emergencyContactNumber: string
	email: string
}

export const defaultRegistrationStep2User: TMRegistrationStep2 =  {
	mobile: "",
	whatsappNumber: "",
	homeNumber: "",
	officeNumber: "",
	address: {
		city: AddressStore.DEFAULT_CITY,
		contact: "",
		country: AddressStore.DEFAULT_COUNTRY_SHORT,
		house: "",
		landmark: "",
		locality: "",
		pincode: "",
		receiver: "",
		state: AddressStore.DEFAULT_STATE_SHORT,
		type: ADDRESS_TYPE.HOME,
	},
	emergencyContactName: "",
	emergencyContactNumber: "",
	email: "",
}

export type TMRegistrationStep3 = {
	category: string| number
	doj : string,
	membershipType: string| number,
	packageType: string| number,
	timeSlot: string| number,
}

export const defaultRegistrationStep3User: TMRegistrationStep3 = {
	category: MiscStore.CATEGORIES[0].id,
	doj: new Date().toISOString().substr(0, 10),
	membershipType: MiscStore.MEMBERSHIP_TYPES[0].id,
	packageType: MiscStore.PACKAGES[0].id,
	timeSlot: MiscStore.TIME_SLOTS[0].id,
}

export type TMRegistrationStep4 = {
	utmSource : string| number | boolean,
	toc : boolean,
	allowedDoors : (string| number)[],
	purposes : (string| number)[],
}
export const defaultRegistrationStep4User: TMRegistrationStep4 = {
	utmSource: false,
	toc: false,
	allowedDoors: [],
	purposes: [],
}

export type TMRegistration = TMRegistrationStep1 & TMRegistrationStep2 & TMRegistrationStep3 & TMRegistrationStep4

export const defaultRegistrationUser: TMRegistration = {
	...defaultRegistrationStep1User,
	...defaultRegistrationStep2User,
	...defaultRegistrationStep3User,
	...defaultRegistrationStep4User,
}

export type PaymentData = {
	mode: number
	receipt: string
	amount: number
	adjustment: number
}

export const defaultPaymentData: PaymentData = {
	mode: 1,
	receipt: "0",
	amount: 0,
	adjustment: 0,
}