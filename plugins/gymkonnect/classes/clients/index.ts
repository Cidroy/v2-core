import { generateBadgenumber, existsEmail, existsMobile, Health } from "./misc"
import { Registration } from "./member/registration"
import { Permissions } from "../../permission"
import { Messages } from "./messages"
import { Members } from "./members"
import { MemberGroups } from "./member-groups"
import { Renewal } from "./member/renewal"

const Gymkonnect = {
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
}

export default Gymkonnect