import { BiometricDevicesController } from "@neutron/controllers/biometric-devices"
import DefaultController from "@neutron/controllers/default"
import { BiometricDeviceController } from "@neutron/controllers/biometric-device"

export default {
	"/": [
		DefaultController,
		/**
		 * FIXME: UNKOWN ISSUE
		 * removing the ``BiometricDeviesController`` causes the build to fail
		 * last seen error was as follows
		 * ```
			addons/neutron/src/biometric-devices/zkteco/K40-WDMS.ts:16
			checkType: BIOMETRIC_DEVICE_CHECK_TYPE.CHECK_IN,
                                          ^
			TypeError: Cannot read property 'Zones' of undefined
				at Object.<anonymous> (addons/neutron/src/biometric-devices/zkteco/K40-WDMS.ts:16:43)
				at Module._compile (internal/modules/cjs/loader.js:688:30)
				at Module.m._compile (node_modules/ts-node/src/index.ts:439:23)
				at Module._extensions..js (internal/modules/cjs/loader.js:699:10)
				at Object.require.extensions.(anonymous function) [as .ts] (node_modules/ts-node/src/index.ts:442:12)
				at Module.load (internal/modules/cjs/loader.js:598:32)
				at tryModuleLoad (internal/modules/cjs/loader.js:537:12)
				at Function.Module._load (internal/modules/cjs/loader.js:529:3)
				at Module.require (internal/modules/cjs/loader.js:636:17)
				at require (internal/modules/cjs/helpers.js:20:18)
		 ```
		 */
		BiometricDevicesController,
		BiometricDeviceController,
	]
}