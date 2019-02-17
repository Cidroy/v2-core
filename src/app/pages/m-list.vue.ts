import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import { Component, Watch, Vue } from "vue-property-decorator"

@Component({
	// @ts-ignore
	components: {
		Layout,
	},
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},

})
// @ts-ignore
export default class Home extends Vue {
	public dropdownFont = ["All", "Recent", "Renewal", "Not Enrolled", "Gold",]
	private headers = [
		{
			text: "ID",
			align: "left",
			value: "id"
		},
		{ text: "Name", value: "name" },
		{ text: "Enorll Status", value: "enrolstat", sortable: false },
		{ text: "Membership Status", value: "mbrstat", sortable: false },
		{ text: "Mobile No.", value: "mobno", sortable: false },
		{ text: "Due Date", value: "duedat" },
	]
	private selected = []
	private search = ""
	private editedIndex = -1
	private expand: boolean = false

	private defaultItem = {
		id: 0,
		name: "",
		enrolstat: 0,
		mbrstat: 0,
		mobno: 0,
		duedat: ""
	}

	private desserts = [
		{
			id: 1,
			name: "spiderman",
			enrolstat: 6.0,
			mbrstat: 24,
			mobno: 4.0,
			duedat: "12/2/19"
		},
		{
			id: 2,
			name: "aquaman",
			enrolstat: 9.0,
			mbrstat: 37,
			mobno: 4.3,
			duedat: "12/2/19"
		},
		{
			id: 3,
			name: "superman",
			enrolstat: 16.0,
			mbrstat: 23,
			mobno: 6.0,
			duedat: "12/2/19"
		},
		{
			id: 4,
			name: "hitman",
			enrolstat: 3.7,
			mbrstat: 67,
			mobno: 4.3,
			duedat: "12/2/19"
		},
		{
			id: 5,
			name: "saktiman",
			enrolstat: 16.0,
			mbrstat: 49,
			mobno: 3.9,
			duedat: "12/2/19"
		},
		{
			id: 6,
			name: "heman",
			enrolstat: 0.0,
			mbrstat: 94,
			mobno: 0.0,
			duedat: "12/2/19"
		},
		{
			id: 7,
			name: "ironman",
			enrolstat: 0.2,
			mbrstat: 98,
			mobno: 0,
			duedat: "12/2/19"
		},
		{
			id: 8,
			name: "batman",
			enrolstat: 3.2,
			mbrstat: 87,
			mobno: 6.5,
			duedat: "12/2/19"
		},
		{
			id: 9,
			name: "wonder woman",
			enrolstat: 25.0,
			mbrstat: 51,
			mobno: 4.9,
			duedat: "12/2/19"
		},
		{
			id: 10,
			name: "SINGHAM",
			enrolstat: 26.0,
			mbrstat: 65,
			mobno: 7,
			duedat: "12/2/19"
		},
	]
}