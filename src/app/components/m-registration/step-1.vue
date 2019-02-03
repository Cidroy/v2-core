<template>
	<div>
		<v-card class="mb-2 px-2" color="transparent" height="500px">
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
								<v-combobox v-model="occupation" prepend-icon="work" :items="Occupations" label="Occupation"  :readonly="Readonly" color="orange darken-2"/>
							</v-flex>
							<v-flex xs12 lg6 class="pl-2">
								<v-select v-model="category" prepend-icon="list" :items="Categories" label="Category"  :readonly="Readonly" color="orange darken-2"/>
							</v-flex>
							<v-flex xs12 lg6 class="pr-2">
								<v-select v-model="idType" prepend-icon="fas fa-id-card" :items="IDProofs" label="ID Proof" :readonly="Readonly"  color="orange darken-2"/>
							</v-flex>
							<v-flex xs12 lg6 class="pl-2">
								<v-text-field v-model="idNumber" prepend-icon="fas fa-hashtag" label="ID Number" required :rules="rules.idNumber" :readonly="Readonly"  color="orange darken-2"/>
							</v-flex>
							<v-flex xs12 lg8 class="pr-2">
								<v-textarea prepend-icon="place" label="Residential Address" v-model="address" :rules="rules.address" :readonly="Readonly"  color="orange darken-2"/>
							</v-flex>
							<v-flex xs12 lg4 class="pl-2">
								<v-select v-model="bodyType" prepend-icon="accessibility" :items="BodyTypes" label="Body Type" :readonly="Readonly"  color="orange darken-2"/>
							</v-flex>
							<v-spacer />
						</v-layout>
					</v-form>
				</v-flex>
				<v-flex xs3 class="pa-4">
					<import-from-enquiry v-show="allowImportFromEnquiry" @memberId="memberId" title="Import Details from Enquiry">
						<v-btn outline block slot="activator" color="orange darken-4">Import from Enquiry</v-btn>
					</import-from-enquiry>
					<v-card>
						<v-img :src="photo" height="200px" />
						<v-btn v-show="!Readonly" block dark color="orange darken-4">
							<v-icon>add</v-icon> Add Photo
						</v-btn>
					</v-card>

				</v-flex>
			</v-layout>
		</v-card>
		<div class="right">
			<v-btn dark @click.native.stop="formReset">Cancel</v-btn>
			<v-btn dark color="orange darken-4" @click.native.stop="formNext"> NEXT </v-btn>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import { GENDER } from "@classes/enum/misc"
import { parseDate, formatDate } from "@/utils/misc"
import { MiscStore } from "@/state/modules/misc"
import importFromEnquiry from "@/components/enquiry/import-dialog.vue"
import { TMRegistrationStep1 } from "@/classes/types/registration"

@Component({
	components: { importFromEnquiry },
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

	private gender: GENDER = GENDER.MALE
	private get GENDERS(){ return GENDER }

	private dob = new Date().toISOString().substr(0, 10)
	private dobFormattedDate = this.formatDate(this.dob)
	private dobMenu: boolean = false
	@Watch("dob") onDobChanged() { this.dobFormattedDate = this.formatDate(this.dob) }

	private occupation: string | number = MiscStore.OCCUPATIONS[0]
	private get Occupations(){ return MiscStore.OCCUPATIONS }

	private category: string | number = MiscStore.CATEGORIES[0]
	private get Categories(){ return MiscStore.CATEGORIES }

	private idType: string | number = MiscStore.ID_PROOFS[0]
	private idNumber: string = ""
	private get IDProofs(){ return MiscStore.ID_PROOFS }

	private address: string = ""

	private bodyType: string | number = MiscStore.BODY_TYPES[0]
	private get BodyTypes(){ return MiscStore.BODY_TYPES }

	private get photo(){
		return "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
	}

	private get rules(){
		return {
			firstName : [ v => !!v || "First Name is required"  ],
			idNumber: [ v => !!v || "ID Number is required" ],
			address: [ address => !!address || "This field is required"],
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

	private async memberId(id){
		console.log("member-id", id)
	}

	private get userData(): TMRegistrationStep1{
		return {
			...this.value,
			firstName: this.firstName,
			middleName: this.middleName,
			lastName: this.lastName,
			gender: this.gender,
			dob: this.dob,
			occupation: this.occupation,
			category: this.category,
			idType: this.idType,
			idNumber: this.idNumber,
			address: this.address,
			bodyType: this.bodyType,
		}
	}
	@Prop({
		type: Object,
		default: () => {
			let def: TMRegistrationStep1 = {
				firstName: "",
				middleName: "",
				lastName: "",
				gender: GENDER.MALE,
				dob: new Date().toISOString().substr(0, 10),
				occupation: MiscStore.OCCUPATIONS[0],
				category: MiscStore.CATEGORIES[0],
				idType: MiscStore.ID_PROOFS[0],
				idNumber: "",
				address: "",
				bodyType: MiscStore.BODY_TYPES[0],
			}
			return def
		}
	}) private value !: TMRegistrationStep1
	@Emit("input") public inputEmitter(){ return this.userData }
	@Watch("value") private onValueChange(){
		this.firstName = this.value.firstName
		this.middleName = this.value.middleName
		this.lastName = this.value.lastName
		this.gender = this.value.gender
		this.dob = this.value.dob
		this.occupation = this.value.occupation
		this.category = this.value.category
		this.idType = this.value.idType
		this.idNumber = this.value.idNumber
		this.address = this.value.address
		this.bodyType = this.value.bodyType
	}

	@Prop({ type: Boolean, default: false }) public allowImportFromEnquiry !: boolean
	@Prop({ type: Boolean, default: false }) public Readonly !: boolean
}
</script>
