import { generateBadgenumber, existsEmail, existsMobile } from "./misc"
import { Registration } from "./member/registration"
import { Permissions } from "../../permission"

const Gymkonnect = {
	existsEmail,
	existsMobile,
	Registration,
	generateBadgenumber,
	Permissions,
}

export default Gymkonnect