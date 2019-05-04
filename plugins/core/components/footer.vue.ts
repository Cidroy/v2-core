/**
 * FIXME: make this tsx
 * load all the footer components using vuex
 * render components in loop
 */
import { Component, Vue } from "vue-property-decorator"
import moment from "moment"
import Backup from "@plugins/gymkonnect/components/footer/backup.vue"
import Messages from "@plugins/gymkonnect/components/footer/messages.vue"
import DeviceStatus from "@plugins/gymkonnect/components/footer/device-status.vue"

import { Permissions as maple } from "../permission"
import { Permissions as gymkonnect } from "@plugins/gymkonnect/permission"

// @ts-ignore
@Component({
	components: {
		Backup,
		Messages,
		DeviceStatus,
	},
})
export default class Footer extends Vue.default {
	private get PERMISSION() {
		return {
			maple,
			gymkonnect,
		}
	}
	private get copyright() { return `&copy; GymKonnect ${moment().year()}. All rights reserved.` }
}
