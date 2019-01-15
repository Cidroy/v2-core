import { BiometricDeviceController } from "@neutron/controllers/biometric-devices"
import DefaultController from "@neutron/controllers/default"

export default {
	"/": [
		DefaultController,
		BiometricDeviceController,
	]
}