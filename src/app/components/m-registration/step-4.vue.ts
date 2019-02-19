import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import { MiscStore } from "@/state/modules/misc"
import { TMRegistrationStep4, defaultRegistrationStep4User } from "@/classes/types/registration"
import empty from "@/components/empty.vue"

@Component({
	// @ts-ignore
	components: { empty, },
	created() {
		this.allowedDoors = [this.DOORS[0].id,]
		this.utmSource = this.UTM_SOURCES[0].id
	}
})
// @ts-ignore
export default class MRegistrationStep4 extends Vue {
	private confirmModal = false

	private utmSource: boolean | string | number = false
	private toc = true
	private allowedDoors: (number | string)[] = []
	private purposes: (string | number)[] = []
	private get Purposes() { return MiscStore.PURPOSES }

	private get DOORS() { return MiscStore.DOORS }
	private get UTM_SOURCES() { return MiscStore.UTM_SOURCES }

	private get userData() {
		return {
			...this.value,
			utmSource: this.value.utmSource,
			toc: this.value.toc,
			allowedDoors: this.value.allowedDoors,
			purposes: this.value.purposes,
		}
	}
	@Prop({
		type: Object,
		default: () => defaultRegistrationStep4User
	}) private value !: TMRegistrationStep4
	@Emit("input") public inputEmitter() { return this.userData }
	@Emit("nextStep") public nextStep() { return true }
	@Watch("value") private onValueChange() {
		this.utmSource = this.value.utmSource
		this.toc = this.value.toc
		this.allowedDoors = this.value.allowedDoors
		this.purposes = this.value.purposes
	}

	private showToc() { }
	private showRules() { }
	private formNext() {
		this.inputEmitter()
		this.nextStep()
	}
	private formReset() { }

	@Watch("utmSource")
	@Watch("toc")
	@Watch("allowedDoors")
	@Watch("purposes")
	private doInputEmit() { this.inputEmitter() }
}