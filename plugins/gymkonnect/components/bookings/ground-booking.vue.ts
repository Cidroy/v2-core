import { Component, Vue } from "vue-property-decorator"
import { GymkonnectStore } from "@plugins/gymkonnect/state/misc"

// @ts-ignore
@Component({})
// @ts-ignore
export default class GroundBookinf extends Vue {
	private organizationTypes: string | number = GymkonnectStore.GK_ORGANIZATION_TYPES[0].id
	private get OrganizationTypes() { return GymkonnectStore.GK_ORGANIZATION_TYPES }
}
