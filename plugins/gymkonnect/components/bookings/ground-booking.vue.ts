import { Component, Vue } from "vue-property-decorator"
import { MiscStore } from "@plugins/gymkonnect/state/misc"

// @ts-ignore
@Component({})
// @ts-ignore
export default class GroundBookinf extends Vue {
	private organizationTypes: string | number = MiscStore.ORGANIZATION_TYPES[0].id
	private get OrganizationTypes() { return MiscStore.ORGANIZATION_TYPES }
}
