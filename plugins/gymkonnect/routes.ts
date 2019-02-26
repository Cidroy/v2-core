import llv from "@classes/utils/lazy-load-view"

const lazyLoadView = (file: string) => llv(
	file,
	(file: string) => import(/* webpackChunkName: "page-[name]" */`./pages${file}`)
)

export default [
	{
		path: "/gk/member-list",
		name: "gk/member-list",
		component: () => lazyLoadView("/member/list"),
		props: true,
	},
	{
		path: "/gk/member-registration",
		name: "gk/member-registration",
		component: () => lazyLoadView("/member/registration"),
		props: true,
	},
	{
		path: "/gk/member-renewal",
		name: "gk/member-renewal",
		component: () => lazyLoadView("/member/renewal"),
		props: true,
	},
	{
		path: "/gk/member-freeze",
		name: "gk/member-freeze",
		component: () => lazyLoadView("/member/freeze"),
		props: true,
	},
	{
		path: "/gk/addons-registration",
		name: "gk/addons-registration",
		component: () => lazyLoadView("/registrations"),
		props: true,
	},
	{
		path: "/gk/addons-bookings",
		name: "gk/addons-bookings",
		component: () => lazyLoadView("/bookings"),
		props: true,
	},
	{
		path: "/gk/addons-enquiry",
		name: "gk/addons-enquiry",
		component: () => lazyLoadView("/enquiry"),
		props: true,
	},
	{
		path: "/gk/user-profile",
		name: "gk/user-profile",
		component: () => lazyLoadView("/user-profile"),
		props: true,
	},
	{
		path: "/gk/hr",
		name: "gk/hr",
		component: () => lazyLoadView("/hr"),
		props: true,
	},
	{
		path: "/gk/payment",
		name: "gk/payment",
		component: () => lazyLoadView("/payment"),
		props: true,
	},
	{
		path: "/gk/settings-hardware",
		name: "gk/settings-hardware",
		component: () => lazyLoadView("/hw-settings"),
		props: true,
	},
	{
		path: "/gk/plans-offers",
		name: "gk/plans-offers",
		component: () => lazyLoadView("/plans-offers"),
		props: true,
	},
	{
		path: "/gk/sms-emails",
		name: "gk/sms-emails",
		component: () => lazyLoadView("/sms-emails"),
		props: true,
	},
	{
		path: "/gk/settings-admin",
		name: "gk/settings-admin",
		component: () => lazyLoadView("/admin-settings"),
		props: true,
	},
	{
		path: "/gk/reports",
		name: "gk/reports",
		component: () => lazyLoadView("/reports"),
		props: true,
	},
]