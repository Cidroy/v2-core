const NAMESPACE = "gymkonnect"

export const Permissions = {
	MEMBER_LIST_VIEW : {
		permission: { [NAMESPACE]: "member-list|view" },
		description: "Allow to Register a member",
		access: "default"
	},
	MEMBER_REGISTER : {
		permission: { [NAMESPACE]: "member|register" },
		description: "Allow to Register a member",
		access: "default"
	},
	MEMBER_RENEW : {
		permission: { [NAMESPACE]: "member|renew" },
		description: "Allow to renew a member",
		access: "default"
	},
	MEMBER_FREEZE : {
		permission: { [NAMESPACE]: "member|freeze" },
		description: "Allow to renew a member",
		access: "default"
	},
	BACKUP : {
		permission: { [NAMESPACE]: "BACKUP" },
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
	ENQUIRY_ADD : {
		permission: { [NAMESPACE]: "enquiry|add" },
		description: "description",
		access: "default"
	},
	BOOKING_ADD : {
		permission: { [NAMESPACE]: "booking|add" },
		description: "Add booking",
		access: "default"
	},
	ADDON_REGISTRATION_ADD : {
		permission: { [NAMESPACE]: "addon-registration|add" },
		description: "Add Registration in addons",
		access: "default"
	},
	REPORTS_VIEW : {
		permission: { [NAMESPACE]: "reports|view" },
		description: "View some report",
		access: "default"
	},
	PAYMENTS_VIEW : {
		permission: { [NAMESPACE]: "payments|view" },
		description: "view payments",
		access: "default"
	},
	HR : {
		permission: { [NAMESPACE]: "hr" },
		description: "description",
		access: "default"
	},
	HARDWARE_SETTINGS_VIEW : {
		permission: { [NAMESPACE]: "hardware-settings|view" },
		description: "description",
		access: "default"
	},
	OFFERS_ADD : {
		permission: { [NAMESPACE]: "offers|add" },
		description: "description",
		access: "default"
	},
	SMS_SETTINGS_VIEW : {
		permission: { [NAMESPACE]: "sms-settings|view" },
		description: "description",
		access: "default"
	},
	ADMIN_SETTINGS : {
		permission: { [NAMESPACE]: "admin-settings" },
		description: "description",
		access: "default"
	},
}