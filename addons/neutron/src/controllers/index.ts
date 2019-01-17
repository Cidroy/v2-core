import { BiometricDevicesController } from "@neutron/controllers/biometric-devices"
import DefaultController from "@neutron/controllers/default"
import { BiometricDeviceController } from "@neutron/controllers/biometric-device"

export default {
	"/": [
		DefaultController,
		BiometricDevicesController,
		BiometricDeviceController,
	]
}