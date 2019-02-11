import { MiscStore } from "@/state/modules/misc"
import { GENDER } from "@classes/enum/misc"

export type TMRegistrationStep1 = {
	id: number| string
	firstName: string
	middleName: string
	lastName: string
	photo: string
	gender: GENDER
	dob: string
	occupation: string| number
	category: string| number
	idType: string| number
	idNumber: string
	address: string
	bodyType: string| number
}

export const defaultRegistrationStep1User: TMRegistrationStep1 = {
	id: 0,
	firstName: "",
	middleName: "",
	lastName: "",
	photo: "",
	gender: GENDER.MALE,
	dob: new Date().toISOString().substr(0, 10),
	occupation: MiscStore.OCCUPATIONS[0].id,
	category: MiscStore.CATEGORIES[0].id,
	idType: MiscStore.ID_TYPES[0].id,
	idNumber: "",
	address: "",
	bodyType: MiscStore.BODY_TYPES[0].id,
}

export type TMRegistrationStep2 = {
	mobile: string
	whatsappNumber: string
	homeNumber: string
	officeNumber: string
	emergencyContactName: string
	emergencyContactNumber: string
	email: string
}

export const defaultRegistrationStep2User: TMRegistrationStep2 =  {
	mobile: "",
	whatsappNumber: "",
	homeNumber: "",
	officeNumber: "",
	emergencyContactName: "",
	emergencyContactNumber: "",
	email: "",
}

export type TMRegistrationStep3 = {
	membershipType: string| number,
	packageType: string| number,
	timeSlot: string| number,
}

export const defaultRegistrationStep3User: TMRegistrationStep3 = {
	membershipType: MiscStore.MEMBERSHIP_TYPES[0].id,
	packageType: MiscStore.PACKAGES[0].id,
	timeSlot: Object.values(MiscStore.TIME_SLOTS)[0],
}

export type TMRegistrationStep4 = {
	utmSource : string| number | boolean,
	toc : boolean,
	allowedDoors : (string| number)[],
	doj : string,
	purposes : (string| number)[],
}
export const defaultRegistrationStep4User: TMRegistrationStep4 = {
	utmSource: false,
	toc: false,
	allowedDoors: [],
	doj: new Date().toISOString().substr(0, 10),
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
	reciept: string
	amount: number
	adjustment: number
}

export const defaultPaymentData: PaymentData = {
	mode: 1,
	reciept: "0",
	amount: 0,
	adjustment: 0,
}