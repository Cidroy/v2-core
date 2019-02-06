import { MiscStore } from "@/state/modules/misc"
import { GENDER } from "@classes/enum/misc"

export type TMRegistrationStep1 = {
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

export type TMRegistrationStep2 = {
	mobile: string
	whatsappNumber: string
	homeNumber: string
	officeNumber: string
	emergencyContactName: string
	emergencyContactNumber: string
	email: string
}

export type TMRegistrationStep3 = {
	membershipType: string| number,
	packageType: string| number,
	timeSlot: string| number,
}

export type TMRegistrationStep4 = {
	utmSource : string| number | boolean,
	toc : boolean,
	allowedDoors : (string| number)[],
	doj : string,
	purposes : (string| number)[],
}

export type TMRegistration = TMRegistrationStep1 & TMRegistrationStep2 & TMRegistrationStep3 & TMRegistrationStep4

export const defaultRegistrationUser: TMRegistration = {
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
	bodyType: MiscStore.BODY_TYPES[0],
	mobile: "",
	whatsappNumber: "",
	homeNumber: "",
	officeNumber: "",
	emergencyContactName: "",
	emergencyContactNumber: "",
	email: "",
	membershipType: Object.values(MiscStore.MEMBERSHIP_TYPES)[0],
	packageType: Object.values(MiscStore.PACKAGES)[0],
	timeSlot: Object.values(MiscStore.TIME_SLOTS)[0],
	utmSource: false,
	toc: false,
	allowedDoors: [],
	doj: new Date().toISOString().substr(0, 10),
	purposes: [],
}
