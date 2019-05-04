// FIXME: Proxy sweetalert with vuetify CSS alert, confirm, loading as Mixins
import sweetalert from "sweetalert2"
import { UserClient } from "@/classes/clients/user"

export const exit = async () => {
	let result = await sweetalert.fire({
		title: "Exit Application?",
		type: "warning",
		showCancelButton: true,
		confirmButtonText: "Yes",
		cancelButtonText: "No",
		confirmButtonClass: "v-btn theme--dark orange darken-2",
	})
	if(!result.value) return
	const remote = require("electron").remote
	let thisWindow = remote.getCurrentWindow()
	thisWindow.close()
}

export const logout = async () => {
	let result = await sweetalert.fire({
		title: "Logout?",
		type: "warning",
		showCancelButton: true,
		confirmButtonText: "Yes",
		cancelButtonText: "No",
		confirmButtonClass: "v-btn theme--dark orange darken-2",
	})
	if(!result.value) return
	let loggingOutPrompt = sweetalert.fire({
		title: "Logging Out ...",
		onBeforeOpen(){ sweetalert.showLoading() },
		allowOutsideClick: false,
		allowEscapeKey: false,
	})
	await UserClient.Logout()
	// @ts-ignore
	loggingOutPrompt.close && loggingOutPrompt.close()
}
