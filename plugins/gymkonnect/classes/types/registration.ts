import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"
import { GENDER, ADDRESS_TYPE } from "@plugins/core/enum/misc"
import IAddress from "@plugins/core/interfaces/IAddress"
import AddressStore from "@plugins/gymkonnect/state/addresses"

export type TMRegistrationStep1 = {
	id: number| string
	badgenumber?: number| string
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
	occupation: (GymkonnectStore.GK_OCCUPATIONS[0] || { id: 0 }).id,
	idType: (GymkonnectStore.GK_ID_TYPES[0] || { id: 0 }).id,
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
	packageMagnitude: number,
}

export const defaultRegistrationStep3User: TMRegistrationStep3 = {
	category: (GymkonnectStore.GK_CATEGORIES[0] || { id: 0 }).id,
	doj: new Date().toISOString().substr(0, 10),
	membershipType: (GymkonnectStore.GK_MEMBERSHIP_TYPES[0] || { id: 0 }).id,
	packageType: (GymkonnectStore.GK_PACKAGES[0] || { id: 0 }).id,
	timeSlot: (GymkonnectStore.GK_TIME_SLOTS[0] || { id: 0 }).id,
	packageMagnitude: 1,
}

export type TMRegistrationStep4 = {
	utmSource : string | false,
	toc : boolean,
	purposes : (string| number)[],
}
export const defaultRegistrationStep4User: TMRegistrationStep4 = {
	utmSource: false,
	toc: true,
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

export type TMRegistrationHealth = {
	height: number,
	weight: number,
	bodyType: string | number,
	bloodGroup: string | number,
}

export const defaultRegistrationUserHealth: TMRegistrationHealth = {
	height: 180,
	weight: 70,
	bodyType: 1,
	bloodGroup: 1,
}