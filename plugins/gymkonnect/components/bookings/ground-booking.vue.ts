import { Component, Vue } from "vue-property-decorator"
import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"

// @ts-ignore
@Component({})
export default class GroundBooking extends Vue.default {
	private organizationTypes: string | number = (GymkonnectStore.GK_ORGANIZATION_TYPES[0] || { id: 0 }).id
	private get OrganizationTypes() { return GymkonnectStore.GK_ORGANIZATION_TYPES }


	firstname = ""
	nameRules = [
		(		v: any) => !!v || "Name is required",
		(		v: { length: number; }) => v.length <= 15 || "Name must be less than 15 characters",
	]
	radioGroup1 = 1
	radioGB1 = 1
	radioGB2 = 1
	radioGB3 = 1
	radioGB4 = 1
	dialogSlot = false
	toggle_none = null
	items = [
		'Programming',
		'Design',
		'Vue',
		'Vuetify'
	]
	email = ""
	emailRules = [
		(	v: any) => (v || '').match(/@/) || 'Please enter a valid email',
	]
	snackbar1 = false
		snackbar2 = false
	y = 'top'
	mode = ''
	timeout = 6000
	radioTop = 'radio-1'
	radios1 = 'radio-1'
	OrgType =[
				'Schools',
				'Grassroots',
				'Corporate',
				'Outsider Teams',
				'Professional Teams'
			]


}
