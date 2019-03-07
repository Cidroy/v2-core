import { generateBadgenumber, existsEmail, existsMobile, Health } from "./misc"
import { Registration } from "./member/registration"
import { Permissions } from "../../permission"
import { Messages } from "./messages"
import { Members } from "./members"

const Gymkonnect = {
	existsEmail,
	existsMobile,
	Registration,
	generateBadgenumber,
	Permissions,
	Messages,
	Members,
	Health,
}

export default Gymkonnect