import { TMRegistrationStep1, TMRegistrationStep3, TMRegistrationStep2 } from "./registration"

export type TMemberInfo = {
	transaction: {
		id: string | number,
		start: string,
		end: string,
	} & TMRegistrationStep3
} & TMRegistrationStep1 & TMRegistrationStep2

export const defaultMemberInfo = (): TMemberInfo => {
	const {
		defaultRegistrationStep1User,
		defaultRegistrationStep2User,
		defaultRegistrationStep3User,
	} = require("./registration")
	return {
		...defaultRegistrationStep1User,
		...defaultRegistrationStep2User,
		transaction: {
			id: 0,
			start: new Date().toISOString().substr(0,10),
			end: new Date().toISOString().substr(0,10),
			...defaultRegistrationStep3User
		}
	}
}
