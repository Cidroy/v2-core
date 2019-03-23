import { generateBadgenumber, existsEmail, existsMobile, Health, receiptNumber } from "./misc"
import { Registration } from "./member/registration"
import { Permissions } from "../../permission"
import { Messages } from "./messages"
import { Members } from "./members"
import { MemberGroups } from "./member-groups"
import { Renewal } from "./member/renewal"
import { Freezing } from "./member/freezing"
import { Booking } from "./bookings"

const Gymkonnect = {
	receiptNumber,
	existsEmail,
	existsMobile,
	Registration,
	generateBadgenumber,
	Permissions,
	Messages,
	Members,
	Health,
	MemberGroups,
	Renewal,
	Freezing,
	Booking,
}

export default Gymkonnect