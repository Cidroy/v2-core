<template>
	<v-card class="px-2" color="transparent">
		<v-layout row wrap>
			<v-flex xs9>
				<v-form lazy-validation ref="form" v-model="formValid">
					<v-layout row wrap>
						<v-flex xs12 lg4 class="px-1">
							<v-text-field prepend-icon="fas fa-user" v-model="firstName" :rules="rules.firstName" counter maxlength="15" label="First Name" required :readonly="Readonly" color="orange darken-2" autofocus/>
						</v-flex>
						<v-flex xs12 lg4 class="px-1">
							<v-text-field v-model="middleName" counter maxlength="15" label="Middle Name" :readonly="Readonly" color="orange darken-2" />
						</v-flex>
						<v-flex xs12 lg4 class="px-1">
							<v-text-field v-model="lastName" counter maxlength="15" label="Last Name" :readonly="Readonly" color="orange darken-2" />
						</v-flex>

						<v-flex xs12 lg6>
							<v-radio-group prepend-icon="fas fa-transgender-alt" label="Gender" v-model="gender" row>
								<v-radio v-for="(value, name) in GENDERS" :label="name" :value="value" :key="value" :readonly="Readonly" color="orange darken-2"/>
							</v-radio-group>
						</v-flex>
						<v-flex xs12 lg6 class="mb-2">
							<v-menu :close-on-content-click="false" v-model="dobMenu" :nudge-right="40" lazy transition="scale-transition"
							offset-y full-width max-width="290px" min-width="290px">
								<v-text-field slot="activator" v-model="dobFormattedDate" label="Date of Birth" placeholder="Date of Birth" hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" @blur="dob = parseDate(dobFormattedDate)" readonly  color="orange darken-2"/>
								<v-date-picker v-model="dob" no-title @input="dobMenu = false" :max=" new Date().toISOString().substr(0, 10)"  color="orange darken-2"/>
							</v-menu>
						</v-flex>

						<v-flex xs12 lg6 class="pr-2">
							<v-select v-model="idType" prepend-icon="fas fa-id-card" :items="IDTypes" item-text="name" item-value="id" label="ID Proof" :readonly="Readonly"  color="orange darken-2"/>
						</v-flex>
						<v-flex xs12 lg6 class="pl-2">
							<v-text-field v-model="idNumber" prepend-icon="fas fa-hashtag" label="ID Number" required :rules="rules.idNumber" :readonly="Readonly"  color="orange darken-2"/>
						</v-flex>

						<v-flex xs12 lg6 class="pr-2">
							<v-select v-model="occupation" prepend-icon="work" :items="Occupations" item-text="name" item-value="id" label="Occupation"  :readonly="Readonly" color="orange darken-2"/>
						</v-flex>

						<v-flex xs12 class="px-2">
							<v-text-field v-model="badgenumber" label="Member ID" placeholder="Enter or Generate Member Id" prepend-icon="fas fa-hashtag">
								<v-fade-transition slot="append">
									<v-btn dark :loading="loading" :disabled="loading" color="secondary" @click.native.stop="generateMemberId">Generate</v-btn>
								</v-fade-transition>
							</v-text-field>
						</v-flex>

					</v-layout>
				</v-form>
			</v-flex>
			<v-flex xs3 class="pa-4">
				<import-from-enquiry v-show="allowImportFromEnquiry" @badgenumber="b => {badgenumber = b}" title="Import Details from Enquiry">
					<v-btn outline block slot="activator" color="orange darken-4">Import from Enquiry</v-btn>
				</import-from-enquiry>
				<add-user-photo v-model="photo" :Readonly="Readonly"/>
			</v-flex>
		</v-layout>
		<v-card-actions>
			<v-btn dark @click.native.stop="formReset"> <v-icon left>close</v-icon> Cancel</v-btn>
			<v-spacer />
			<v-btn dark color="orange darken-4" @click.native.stop="formNext"> <v-icon left>done</v-icon> NEXT </v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit, Prop, } from "vue-property-decorator"
import { GENDER } from "@classes/enum/misc"
import { parseDate, formatDate } from "@/utils/misc"
import { MiscStore } from "@/state/modules/misc"
import importFromEnquiry from "@/components/enquiry/import-dialog.vue"
import { TMRegistrationStep1, defaultRegistrationStep1User } from "@/classes/types/registration"
import addUserPhoto from "@/components/add-user-photo.vue"

import Gymkonnect from "@classes/gymkonnect"

@Component({
	components: { importFromEnquiry, addUserPhoto },
	created(){
		this.onValueChange()
	}
})
export default class MRegistrationStep1 extends Vue{

	private parseDate(date){ return parseDate(date) }
	private formatDate(date){ return formatDate(date) }

	private loading = false

	private firstName: string = ""
	private middleName: string = ""
	private lastName: string = ""
	private photo: string = ""

	private gender: GENDER = GENDER.MALE
	private get GENDERS(){ return GENDER }

	private dob = new Date().toISOString().substr(0, 10)
	private dobFormattedDate = this.formatDate(this.dob)
	private dobMenu: boolean = false
	@Watch("dob") onDobChanged() { this.dobFormattedDate = this.formatDate(this.dob) }

	private occupation: string | number = MiscStore.OCCUPATIONS[0].id
	private get Occupations(){ return MiscStore.OCCUPATIONS }

	private idType: string | number = MiscStore.ID_TYPES[0].id
	private idNumber: string = ""
	private get IDTypes(){ return MiscStore.ID_TYPES }

	private get rules(){
		return {
			firstName : [ v => !!v || "First Name is required"  ],
			idNumber: [ v => !!v || "ID Number is required" ],
		}
	}

	private formValid: boolean = true
	private formReset(){
		// @ts-ignore
		this.$refs.form.reset()
	}
	
	private formNext(){
		// @ts-ignore
		
		if(this.$refs.form.validate()){
			this.inputEmitter()
			this.nextStep()
		}
	}

	@Emit("nextStep") public nextStep(){ return true }
	@Emit("cancel") public cancel(){ return true }

	private badgenumber: string|number = 1

	private get userData(): TMRegistrationStep1{
		return {
			...this.value,
			firstName: this.firstName,
			middleName: this.middleName,
			lastName: this.lastName,
			photo: this.photo,
			gender: this.gender,
			dob: this.dob,
			occupation: this.occupation,
			idType: this.idType,
			idNumber: this.idNumber,
			address: this.address,
			bodyType: this.bodyType, 
			badgenumber: this.badgenumber,
		}
	}
	@Prop({
		type: Object,
		default: () => defaultRegistrationStep1User
	}) private value !: TMRegistrationStep1
	@Emit("input") public inputEmitter(){ return this.userData }
	@Watch("value") private onValueChange(){
		this.firstName = this.value.firstName
		this.middleName = this.value.middleName
		this.lastName = this.value.lastName
		this.gender = this.value.gender
		this.dob = this.value.dob
		this.occupation = this.value.occupation
		this.idType = this.value.idType
		this.idNumber = this.value.idNumber
		this.badgenumber = this.value.badgenumber
	}

	@Prop({ type: Boolean, default: false }) public allowImportFromEnquiry !: boolean
	@Prop({ type: Boolean, default: false }) public Readonly !: boolean

	private async generateMemberId(){
		this.loading = true
		try{
			this.badgenumber = (await Gymkonnect.generateBadgenumber())[0]
			console.log(this.badgenumber)
		} catch(e){ console.log(e) }
		this.loading = false
	}	
}
</script>
