const NAMESPACE = "gymkonnect"

export const Permissions = {
	MEMBER_REGISTER : {
		permission: { [NAMESPACE]: "member|register" },
		description: "Allow to Register a member",
		access: "default"
	},
	BACKUP : {
		permission: { [NAMESPACE]: "backup" },
		description: "Backup system data",
		access: "default"
	},
	MESSAGES_STATUS_VIEW : {
		permission: { [NAMESPACE]: "messages|view-status" },
		description: "view messages status",
		access: "default"
	},
	DEVICE_STATUS_VIEW : {
		permission: { [NAMESPACE]: "device|view-status" },
		description: "View status of device",
		access: "default"
	},
}