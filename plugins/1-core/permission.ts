const NAMESPACE = "maple"

export const Permissions = {
	NOTIFICATION_VIEW : {
		permission: { [NAMESPACE]: "notification|view" },
		description: "can view notifications",
		access: "default"
	},
	PROFILE_VIEW : {
		permission: { [NAMESPACE]: "profile|view" },
		description: "View own profile",
		access: "default"
	},
	NAVBAR_SEARCH : {
		permission: { [NAMESPACE]: "navbar-search" },
		description: "Allow to search from navbar",
		access: "default"
	},
	DASHBOARD_VIEW : {
		permission: { [NAMESPACE]: "dashboard|view" },
		description: "view dashboard",
		access: "default"
	},
	ADMIN_SETTINGS : {
		permission: { [NAMESPACE]: "settings|admin" },
		description: "view administrator settings",
		access: "default"
	},
}