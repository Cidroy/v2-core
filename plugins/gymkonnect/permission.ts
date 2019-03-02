import { Permissions as P } from "@classes/types/permission"

const NAMESPACE = "gymkonnect"

export const Permissions: P = {
	MEMBER_REGISTER : {
		permission: { [NAMESPACE]: "member|register" },
		description: "Allow to Register a member",
		access: "default"
	}
}