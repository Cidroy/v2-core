import { generateBadgenumber, existsEmail, existsMobile, Health, receiptNumber } from "./misc"
import { MemberRegistration } from "./member/registration"
import { Permissions } from "../../permission"
import { Messages } from "./messages"
import { Members } from "./members"
import { MemberGroups } from "./member-groups"
import { Renewal } from "./member/renewal"
import { Freezing } from "./member/freezing"
import { Booking } from "./bookings"
import { Enquiry } from "./member/enquiry"
import { Registrations } from "./registrations"
import { Reports } from "./reports"

const Gymkonnect = {
	receiptNumber,
	existsEmail,
	existsMobile,
	MemberRegistration,
	generateBadgenumber,
	Permissions,
	Messages,
	Members,
	Health,
	MemberGroups,
	Renewal,
	Freezing,
	Booking,
	Enquiry,
	Registrations,
	Reports,
}

export default Gymkonnect
