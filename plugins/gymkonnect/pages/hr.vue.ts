import { Component, Vue, Watch } from "vue-property-decorator"
import appConfig from "@/app.config"
import Layout from "@/layouts/layout.vue"
import { parseDate, formatDate } from "@/utils/misc"

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
	private get photo() {
		return "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
	}
	private parseDate(date: string) { return parseDate(date) }
	private formatDate(date: string) { return formatDate(date) }

	private dob = new Date().toISOString().substr(0, 10)
	private dobFormattedDate = this.formatDate(this.dob)
	private dobMenu: boolean = false
	@Watch("dob") private onDobChanged() { this.dobFormattedDate = this.formatDate(this.dob) }

	private active: number = 0
	private menu1 = false
	private email = ""
	private idType = ""
	private idNumber = ""
	private emailRules = [
		(v: string) => (v || "").match(/@/) || "Please enter a valid email",
	]
	private tabsList = {
		a: "Trainers",
		b: "Fitness Consultant",
	}

	private phone = ""
	private IDProofs = [
		"Aadhaar Card",
		"Passport",
		"License",
		"Pan Card",
		"Voter ID",
	]
	private phoneRules = [
		(v: string) => !!v || "Number is required",
	]

	private date = new Date().toISOString().substr(0, 10)
	private dateFormatted = this.formatDate(this.date)

	@Watch("date")
	private onDateChanged() {
		this.dateFormatted = this.formatDate(this.date)
	}

	private get getDateFormatted() {
		return this.formatDate(this.date)
	}

	private dialogAT = false
	private firstname = ""
	private nameRules = [
		(v: string) => !!v || "Name is required",
		(v: string) => v.length <= 30 || "Name must be less than 30 characters",
	]
	private LastnameRules = [
		(v: string) => !!v || "Name is required",
	]
	private radioGroup2 = "radio-4"

	private perpage = [
		10,
		20,
		30,
		40,
	]
	private headers = [
		{
			text: "ID",
			align: "left",
			value: "id",
		},
		{ text: "Name", value: "name" },
		{ text: "Trainer Type", value: "trainerType", sortable: false },
		{ text: "Mobile No.", value: "mobno", sortable: false },
		{ text: "Joined Date", value: "joinDate" },
	]
	private expand: boolean = false

	private defaultItem = {
		id: 0,
		name: "",
		trainerType: "",
		mobno: 0,
		joinDate: ""
	}
	private desserts = [
		{
			id: 1,
			name: "spiderman",
			trainerType: "Master",
			mobno: 12333,
			joinDate: "12/2/19"
		},
		{
			id: 2,
			name: "aquaman",
			trainerType: "Noob",
			mobno: 44543,
			joinDate: "12/2/19"
		},
		{
			id: 3,
			name: "superman",
			trainerType: "standard",
			mobno: 63330,
			joinDate: "12/2/19"
		},
		{
			id: 4,
			name: "hitman",
			trainerType: "standard",
			mobno: 42223,
			joinDate: "12/2/19"
		},
		{
			id: 5,
			name: "man",
			trainerType: "standard",
			mobno: 42223,
			joinDate: "12/2/19"
		},
		{
			id: 6,
			name: "sinman",
			trainerType: "standard",
			mobno: 42223,
			joinDate: "12/2/19"
		},
		{
			id: 7,
			name: "sinan",
			trainerType: "standard",
			mobno: 42223,
			joinDate: "12/2/19"
		},
	]

	private headers2 = [
		{
			text: "ID",
			align: "left",
			value: "id2"
		},
		{ text: "Name", value: "name2" },
		{ text: "Speciality", value: "spcl", sortable: false },
		{ text: "Mobile No.", value: "mobno2", sortable: false },
		{ text: "Joined Date", value: "joinDate2" },
	]

	private defaultItem2 = {
		id2: 0,
		name2: "",
		spcl: "",
		mobno2: 0,
		joinDate2: ""
	}
	private desserts2 = [
		{
			id2: 1,
			name2: "MC",
			spcl: "Master",
			mobno2: 12333,
			joinDate2: "12/2/19"
		},
		{
			id2: 2,
			name2: "aquaman",
			spcl: "Noob",
			mobno2: 44543,
			joinDate2: "12/2/19"
		},
		{
			id2: 3,
			name2: "superman",
			spcl: "standard",
			mobno2: 63330,
			joinDate2: "12/2/19"
		},
		{
			id2: 4,
			name2: "hitman",
			spcl: "standard",
			mobno2: 42223,
			joinDate2: "12/2/19"
		},
	]

}
