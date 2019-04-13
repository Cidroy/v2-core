import { Component, Vue } from "vue-property-decorator"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"

// @ts-ignore
@Component({})
export default class GroundBookinf extends Vue.default {
	private organizationTypes: string | number = (GymkonnectStore.GK_ORGANIZATION_TYPES[0] || { id: 0 }).id
	private get OrganizationTypes() { return GymkonnectStore.GK_ORGANIZATION_TYPES }
}
