import { Component, Vue, Watch } from "vue-property-decorator"
import appConfig from "@/app.config"
import Layout from "@/layouts/layout.vue"
import systemInformation from "@/components/system-information.vue"
import { NotificationStore } from "@plugins/core/state/notifications"
import uuid from "uuid"
import AppConfig from "@classes/appConfig"
import Printer from "@electron/printer"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`core/home.vue`)
@Component({
	// @ts-ignore
	components: {
		Layout,
		systemInformation,
	},
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
})
// @ts-ignore
export default class HomePage extends Vue {
	private async test() {
		const pdfPath = AppConfig.DataFolder + "/reports/registration-blank"
		Console.info("saving", pdfPath, Printer.TEMPLATE_EXTENSION)
		const pdf = await Printer.renderAndPrintPDF("gymkonnect/registration-blank", pdfPath, {
			dateTime: new Date()
		})
		const { shell } = require("electron")
		Console.log({pdf, open: shell.openItem(pdf)})
	}
	private test_1() { NotificationStore.newNotification({
		time: new Date(),
		seen: false,
		title: uuid(),
		subtitle: "octavious"
	}) }
	private test_2() {
		// DeviceStore.gkFPSync()
		// @ts-ignore
		this.$refs.focusMe.focus()
		// @ts-ignore
		console.log(this.$refs)
	}
}
