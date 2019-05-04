import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator"
import MRegistrationStepFinished from "../registration/step-finished.vue"
// @ts-ignore
@Component({
	components: {
		MRegistrationStepFinished,
	},
})
export default class ProfileModal extends Vue.default {
	// #region modal controls
	private showModal = false
	@Watch("showModal") private onShowModalChange() {
		this.inputEmitter()
	}
	@Prop({ type: Boolean, default: false }) public value!: boolean
	@Watch("value") private onValueChange() { this.showModal = this.value }
	@Emit("input") public inputEmitter() { return this.showModal }

	@Prop({ type: Number, default: 0 }) public dummy!: number
	@Watch("dummy") private onDummyChange(){
		console.log("regenerating dummy", this.dummy)
	}
	// #endregion

	// #region kundi code
	private profileList: { icon?: string, text: string }[] = [
		{ text: "Name: Kundan Singh", },
		{ text: "# Badge:", },
		{ text: "Current Stat", },
		{ text: "Phone:", },
		{ text: "Whatsapp", },
		{ text: "Email: kundan785@gmail.com", },
	]
	private cards = [
		{ src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg", flex: 6 },
	]

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
	// #endregion
}
