<template>
	<v-card class="pa-4" color="transparent">
		<v-layout row wrap>
			<v-flex xs9>
				<v-layout row wrap>
					<v-flex xs12 class="pr-2">
						<v-text-field prepend-icon="fas fa-user" v-model="fullName" label="Full Name" readonly color="orange darken-2"/>
					</v-flex>
					

					<v-flex xs12 lg6 class="pr-2"> <v-text-field prepend-icon="fas fa-transgender-alt" :value="GENDERS[gender]" label="Gender" readonly color="orange darken-2"/> </v-flex>
					<v-flex xs12 lg6 class="pl-2"> <v-text-field v-model="dobFormattedDate" label="Date of Birth" placeholder="Date of Birth" hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" readonly color="orange darken-2"/> </v-flex>

					<v-flex xs12 lg6 class="pr-2"> <v-text-field prepend-icon="fas fa-mobile-alt" v-model="mobileNumber" label="Mobile Number" mask="##### ##### #####" readonly color="orange darken-2"/> </v-flex>
					<v-flex xs12 lg6 class="pl-2"> <v-text-field prepend-icon="fab fa-whatsapp" v-model="whatsappNumber" label="Whatsapp Number" mask="##### ##### #####" readonly color="orange darken-2" /> </v-flex>
					<v-flex xs12 class="pr-2">
						<v-text-field prepend-icon="fas fa-envelope" v-model="email" label="Email address" type="email" readonly color="orange darken-2" />
					</v-flex>
				</v-layout>
			</v-flex>
			<v-flex xs3 class="pa-4">
				<v-flex xs12 lg10 class="pl-2">
					<v-text-field v-model="badgeNumber" prepend-icon="fas fa-hashtag" label="Number" readonly color="orange darken-2"/>
				</v-flex>
				<add-user-photo v-model="photo" :Readonly="true"/>
			</v-flex>
		</v-layout>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit, Prop, } from "vue-property-decorator"
import { GENDER } from "@classes/enum/misc"
import { parseDate, formatDate } from "@/utils/misc"
import { MiscStore } from "@/state/modules/misc"
import importFromEnquiry from "@/components/enquiry/import-dialog.vue"
import { TMRegistration, defaultRegistrationUser } from "@/classes/types/registration"
import addUserPhoto from "@/components/add-user-photo.vue"

@Component({
	components: { importFromEnquiry, addUserPhoto },
	created(){
		this.onValueChange()
	}
})
export default class MRegistrationStep1 extends Vue{

	private parseDate(date){ return parseDate(date) }
	private formatDate(date){ return formatDate(date) }

	private firstName: string = ""
	private middleName: string = ""
	private lastName: string = ""
	private get fullName(){ return `${this.firstName} ${this.middleName} ${this.lastName}` }
	private dob = new Date().toISOString().substr(0, 10)
	private dobFormattedDate = this.formatDate(this.dob)
	private mobileNumber: string = ""
	private whatsappNumber: string = ""
	private photo: string = ""
	private email: string = ""
	private badgeNumber: string | number = ""

	private gender: GENDER = GENDER.MALE
	private get GENDERS(){ return GENDER }

	@Prop({
		type: Object,
		default: () => defaultRegistrationUser
	}) private value !: TMRegistration
	@Emit("input") public inputEmitter(){ return this.value }
	@Watch("value") private onValueChange(){
		this.firstName = this.value.firstName
		this.middleName = this.value.middleName
		this.lastName = this.value.lastName
		this.dob = this.value.dob
		this.gender = this.value.gender
		this.mobileNumber = this.value.mobile
		this.whatsappNumber = this.value.whatsappNumber
		this.email = this.value.email
		this.photo = this.value.photo
		this.badgeNumber = this.value.badgeNumber
	}

	@Prop({ type: Boolean, default: false }) public Readonly !: boolean
	return = {
			...this.value,			
			photo: this.photo,
			email : this.email,	
		}
	

}
</script>
