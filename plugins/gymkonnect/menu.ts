import { routes } from "./routes"
import { TMenu } from "@classes/types/application"
import { Permissions } from "./permission"

const menu: TMenu[] = [
	{
		name: "gk/members",
		icon: "people",
		text: "Members",
		children: [
			{ icon: "view_list", text: "List", to: routes.MEMBER_LIST.name, permission: Permissions.MEMBER_LIST_VIEW },
			{ icon: "group_add", text: "Registration", to: routes.MEMBER_REGISTRATION.name, permission: Permissions.MEMBER_REGISTER },
			{ icon: "autorenew", text: "Renewal", to: routes.MEMBER_RENEWAL.name, permission: Permissions.MEMBER_RENEW },
			{ icon: "timer_off", text: "Freezing", to: routes.MEMBER_FREEZE.name, permission: Permissions.BACKUP },
		],
		"icon-alt": "people",
		model: false,
		permission: [
			Permissions.MEMBER_LIST_VIEW,
			Permissions.MEMBER_REGISTER,
			Permissions.MEMBER_RENEW,
			Permissions.BACKUP,
		],
	},
	// FIXME: [All] remove to access
	{
		name: "gk/addons",
		icon: "library_add",
		text: "Add Ons",
		children: [
			{ icon: "assignment_ind", text: "Registrations", to: routes.ADDONS_REGISTRATION.name, permission: Permissions.ADDON_REGISTRATION_ADD },
			{ icon: "event", text: "Bookings", to: routes.ADDONS_BOOKING.name, permission: Permissions.BOOKING_ADD },
			{ icon: "forum", text: "Enquiry", to: routes.ADDONS_ENQUIRY.name, permission: Permissions.ENQUIRY_ADD },
		],
		"icon-alt": "library_add",
		model: false,
		permission: [
			Permissions.ADDON_REGISTRATION_ADD,
			Permissions.BOOKING_ADD,
			Permissions.ENQUIRY_ADD,
		]
	},
	{ icon: "timeline", text: "Sales & Finance", to: routes.PAYMENT.name, permission: Permissions.PAYMENTS_VIEW },
	{ icon: "assessment", text: "Reports", to: routes.REPORTS.name, permission: Permissions.REPORTS_VIEW },
	{ icon: "bubble_chart", text: "HR", to: routes.HR.name, permission: Permissions.HR },
	{ icon: "bubble_chart", text: "Test Page", to: routes.TEST.name, permission: Permissions.TEST },
]

// ApplicationStore.addAppMenuToSettings([
// 	{ icon: "fas fa-ethernet", text: "Hardware", to: Routes.SETTINGS_HARDWARE.name, permission: Permissions.HARDWARE_SETTINGS_VIEW },
// 	{ icon: "fas fa-paper-plane", text: "Plans & Offers", to: Routes.PLANS_OFFER.name, permission: Permissions.OFFERS_ADD },
//  	{ icon: "fas fa-comments", text: "SMS & Emails", to: Routes.SMS_EMAILS.name, permission: Permissions.SMS_SETTINGS_VIEW },
// 	{ icon: "fab fa-superpowers", text: "Admin Access", to: Routes.SETTINGS_ADMIN.name, permission: Permissions.ADMIN_SETTINGS },
// ])

export default menu
