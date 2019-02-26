import { generateBadgenumber, existsEmail, existsMobile } from "./misc"
import { Registration } from "./member/registration"
import { Permission } from "../../permission"

const Gymkonnect = {
	existsEmail,
	existsMobile,
	Registration,
	generateBadgenumber,
	Permission,
}

export default Gymkonnect