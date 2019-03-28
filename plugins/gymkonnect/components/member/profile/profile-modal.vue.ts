import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator"
import empty from "@/components/empty.vue"

@Component({
	// @ts-ignore
	components: { empty, },
})
// @ts-ignore
export default class ProfileModal extends Vue {
	// #region modal controls
	private showModal = false
	@Watch("showModal") private onShowModalChange() {
		this.inputEmitter()
	}
	@Prop({ type: Boolean, default: false }) public value!: boolean
	@Watch("value") private onValueChange() { this.showModal = this.value }
	@Emit("input") public inputEmitter() { return this.showModal }
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
	// #endregion
}