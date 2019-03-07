import llv from "@classes/utils/lazy-load-view"

const lazyLoadView = (file: string) => llv(
	file,
	(file: string) => import(/* webpackChunkName: "page-[name]" */ `./pages${file}`)
)

export const Routes = {
	MEMBER_LIST: {
		path: "/gk/member-list",
		name: "gk/member-list",
		component: () => lazyLoadView("/member/list"),
		props: true,
	},
	MEMBER_REGISTRATION: {
		path: "/gk/member-registration",
		name: "gk/member-registration",
		component: () => lazyLoadView("/member/registration"),
		props: true,
	},
	MEMBER_REGISTRATION_FINALIZE: {
		path: "/gk/member-registration-finalize",
		name: "gk/member-registration-finalize",
		component: () => lazyLoadView("/member/registration/finalize"),
		props: true,
	},
	MEMBER_RENEWAL: {
		path: "/gk/member-renewal",
		name: "gk/member-renewal",
		component: () => lazyLoadView("/member/renewal"),
		props: true,
	},
	MEMBER_FREEZE: {
		path: "/gk/member-freeze",
		name: "gk/member-freeze",
		component: () => lazyLoadView("/member/freeze"),
		props: true,
	},
	ADDONS_REGISTRATION: {
		path: "/gk/addons-registration",
		name: "gk/addons-registration",
		component: () => lazyLoadView("/registrations"),
		props: true,
	},
	ADDONS_BOOKING: {
		path: "/gk/addons-bookings",
		name: "gk/addons-bookings",
		component: () => lazyLoadView("/bookings"),
		props: true,
	},
	ADDONS_ENQUIRY: {
		path: "/gk/addons-enquiry",
		name: "gk/addons-enquiry",
		component: () => lazyLoadView("/enquiry"),
		props: true,
	},
	USER_PROFILE: {
		path: "/gk/user-profile",
		name: "gk/user-profile",
		component: () => lazyLoadView("/user-profile"),
		props: true,
	},
	HR: {
		path: "/gk/hr",
		name: "gk/hr",
		component: () => lazyLoadView("/hr"),
		props: true,
	},
	PAYMENT: {
		path: "/gk/payment",
		name: "gk/payment",
		component: () => lazyLoadView("/payment"),
		props: true,
	},
	SETTINGS_HARDWARE: {
		path: "/gk/settings-hardware",
		name: "gk/settings-hardware",
		component: () => lazyLoadView("/hw-settings"),
		props: true,
	},
	PLANS_OFFER: {
		path: "/gk/plans-offers",
		name: "gk/plans-offers",
		component: () => lazyLoadView("/plans-offers"),
		props: true,
	},
	SMS_EMAILS: {
		path: "/gk/sms-emails",
		name: "gk/sms-emails",
		component: () => lazyLoadView("/sms-emails"),
		props: true,
	},
	SETTINGS_ADMIN: {
		path: "/gk/settings-admin",
		name: "gk/settings-admin",
		component: () => lazyLoadView("/admin-settings"),
		props: true,
	},
	REPORTS: {
		path: "/gk/reports",
		name: "gk/reports",
		component: () => lazyLoadView("/reports"),
		props: true,
	},
	TEST: {
		path: "/gk/test",
		name: "gk/test",
		component: () => lazyLoadView("/test"),
		props: true,
	}
}

export default Object.values(Routes)