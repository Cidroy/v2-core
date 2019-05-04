import { Component, Watch, Vue } from "vue-property-decorator"
import appConfig from "@/app.config"
import Layout from "@plugins/core/layouts/layout.vue"
import MRegistrationStepFinished from "@plugins/gymkonnect/components/member/registration/step-finished.vue"

@Component({
	// @ts-ignore
	components: {
		MRegistrationStepFinished,
		Layout,
	},
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
})
export default class testuserprofile extends Vue.default {
	private active = 0
	private tabsList = {
		e: "Overview",
		a: "Activities",
		b: "Transaction",
		c: "Membership",
		d: "Details",
	}

	private headers = [

		{ text: "MembersShip Type", value: "name" },
		{ text: "Package", value: "package", sortable: false },
		{ text: "Start Date", value: "startDate", sortable: false },
		{ text: "End Date", value: "endDate" },
	]

	private desserts = [
		{

			name: "Master",
			package: "$100",
			startDate: "12/2/18",
			endDate: "12/2/19"
		},
		{

			name: "Noob",
			package: "$100",
			startDate: "12/2/18",
			endDate: "12/2/19"
		},
		{

			name: "standard",
			package: "$100",
			startDate: "12/2/18",
			endDate: "12/2/19"
		},
		{

			name: "standard",
			package: "$100",
			startDate: "12/2/18",
			endDate: "12/2/19"
		},
	]

	private headers2 = [

		{ text: "Start Date", value: "name2" },
		{ text: "End Date", value: "endDate" },
		{ text: "Days", value: "days" },
	]

	private desserts2 = [
		{
			name2: "12/2/18",
			endDate: "12/2/19",
			days: 1
		},
		{
			name2: "17/2/18",
			endDate: "12/2/19",
			days: 4
		},
		{
			name2: "19/2/18",
			endDate: "02/2/19",
			days: 6
		},
		{
			name2: "10/2/18",
			endDate: "23/2/19",
			days: 9
		},
	]
}
