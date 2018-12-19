import { Stage } from "@/classes/install-router"

const English = {
	install: {
		helpdoc: {
			[Stage.NONE]: `Instructions and clarification will be provided on every step of the way.
					<br>
					But it seems there is no help needed for this step.`,
			[Stage.LANGUAGE]: `Please select the default language for this application and the install process.
					<br>
					You can change this setting in the app anytime.`,
			[Stage.PRODUCT_KEY]: `productKey hint`,
			[Stage.MODE_SELECT]: `modeSelect hint`,
			[Stage.SLAVE_MODE]: `slaveMode hint`,
			[Stage.HARDWARE_SELECT]: `hardwareSelect hint`,
			[Stage.HARDWARE_CONFIRM]: `hardwareConfirm hint`,
			[Stage.DONE]: `done hint`,
		},
		steps: {
			select_language: "Select Language",
			select_mode: "Select Usage Mode",
			slave_mode: "Master IP Address",
			biometric_select: "Select Biometric Device Model",
			hardware_confirm: "Confirm Devices",
			completed: "Installation Complete",
			login: "Login",
			product_key: "Product Key",
			please_wait: "Please Wait",
		}
	},
	login: {
		title: "Login",
		username: "Username",
		password: "Password",
	},
	next: "Next",
	okay: "Okay",
	done: "Done",
}
export default English