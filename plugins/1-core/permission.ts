import { Permissions as P } from "@classes/types/permission"

const NAMESPACE = "maple"

export const Permissions: P = {
	NOTIFICATION_VIEW : {
		permission: { [NAMESPACE]: "notification|view" },
		description: "can view notifications",
		access: "default"
	},
}