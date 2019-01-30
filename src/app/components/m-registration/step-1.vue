<template>
	<div>
		<v-card class="mb-2 px-2" color="transparent" height="500px">
			<v-layout row wrap>
				<v-flex xs9>
					<v-form lazy-validation ref="form" v-model="formValid">
						<v-layout row wrap>
							<v-flex xs12 lg4 class="px-1">
								<v-text-field prepend-icon="fas fa-user" v-model="firstName" :rules="rules.firstName" counter maxlength="15" label="First Name" required :readonly="Readonly"></v-text-field>
							</v-flex>
							<v-flex xs12 lg4 class="px-1">
								<v-text-field v-model="middleName" counter maxlength="15" label="Middle Name" :readonly="Readonly"></v-text-field>
							</v-flex>
							<v-flex xs12 lg4 class="px-1">
								<v-text-field v-model="lastName" counter maxlength="15" label="Last Name" :readonly="Readonly"></v-text-field>
							</v-flex>

							<v-flex xs12 lg6>
								<v-radio-group prepend-icon="fas fa-transgender-alt" label="Gender" v-model="gender" row>
									<v-radio v-for="(name, value) in GENDERS" :label="name" :value="value" :key="value" :readonly="Readonly"></v-radio>
								</v-radio-group>
							</v-flex>
							<v-flex xs12 lg6 class="mb-2">
								<v-menu :close-on-content-click="false" v-model="dobMenu" :nudge-right="40" lazy transition="scale-transition"
								offset-y full-width max-width="290px" min-width="290px">
									<v-text-field slot="activator" v-model="dobFormattedDate" label="Date of Birth" placeholder="Date of Birth" hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" @blur="dob = parseDate(dobFormattedDate)" readonly />
									<v-date-picker v-model="dob" no-title @input="dobMenu = false" :max=" new Date().toISOString().substr(0, 10)" />
								</v-menu>
							</v-flex>
							<v-flex xs12 lg6 class="pr-2">
								<v-combobox v-model="occupation" prepend-icon="work" :items="Occupations" label="Occupation"  :readonly="Readonly"/>
							</v-flex>
							<v-flex xs12 lg6 class="pl-2">
								<v-select v-model="category" prepend-icon="list" :items="Categories" label="Category"  :readonly="Readonly"/>
							</v-flex>
							<v-flex xs12 lg6 class="pr-2">
								<v-select v-model="idType" prepend-icon="fas fa-id-card" :items="IDProofs" label="ID Proof" :readonly="Readonly" />
							</v-flex>
							<v-flex xs12 lg6 class="pl-2">
								<v-text-field v-model="idNumber" prepend-icon="fas fa-hashtag" label="ID Number" required :rules="rules.idNumber" :readonly="Readonly" />
							</v-flex>
							<v-flex xs12 lg8 class="pr-2">
								<v-textarea prepend-icon="place" label="Residential Address" v-model="address" :rules="rules.address" :readonly="Readonly" />
							</v-flex>
							<v-flex xs12 lg4 class="pl-2">
								<v-select v-model="bodyType" prepend-icon="accessibility" :items="BodyTypes" label="Body Type" :readonly="Readonly" />
							</v-flex>

							<v-spacer></v-spacer>
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

@Component({
	components: { importFromEnquiry },
	created(){
		this.onValueChange()
	}
})
export default class MRegistrationStep1 extends Vue{

	parseDate(date){ return parseDate(date) }
	formatDate(date){ return formatDate(date) }
	
	firstName: string = ""
	middleName: string = ""
	lastName: string = ""
	
	gender: GENDER = GENDER.MALE
	get GENDERS(){ return GENDER }

	dob = new Date().toISOString().substr(0, 10)
	dobFormattedDate = this.formatDate(this.dob)
	dobMenu: boolean = false
	@Watch("dob") onDobChanged() { this.dobFormattedDate = this.formatDate(this.dob) }

	occupation = MiscStore.OCCUPATIONS[0]
	get Occupations(){ return MiscStore.OCCUPATIONS }

	category = MiscStore.CATEGORIES[0]
	get Categories(){ return MiscStore.CATEGORIES }

	idType = MiscStore.ID_PROOFS[0]
	idNumber: string = ""
	get IDProofs(){ return MiscStore.ID_PROOFS }

	address: string = ""

	bodyType = MiscStore.BODY_TYPES[0]
	get BodyTypes(){ return MiscStore.BODY_TYPES }

	get photo(){
		return "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
	}

	get rules(){
		return {
			firstName : [ v => !!v || "First Name is required"  ],
			idNumber: [ v => !!v || "ID Number is required" ],
			address: [ address => !!address || "This field is required"],
		}
	}

	formValid: boolean = true
	formReset(){ this.$refs.form.reset() }
	
	formNext(){
		if(this.$refs.form.validate()){
			this.inputEmitter()
			this.nextStep()
		}
	}

	@Emit("nextStep") nextStep(){ return true }
	@Emit("cancel") cancel(){ return true }

	async memberId(id){
		console.log("member-id", id)
	}

	get userData(){
		return {
			firstName : this.firstName,
			middleName : this.middleName,
			lastName : this.lastName,			
		}
	}
	@Prop({ type: Object, default: () => ({
		firstName : "",
		middleName : "",
		lastName : "",
	}) }) value !: object
	@Emit("input") inputEmitter(){ return this.userData }
	@Watch("value") onValueChange(){
		this.firstName = this.value.firstName
		this.middleName = this.value.middleName
		this.lastName = this.value.lastName
	}

	@Prop({ type: Boolean, default: false }) allowImportFromEnquiry !: boolean
	@Prop({ type: Boolean, default: false }) Readonly !: boolean
}
</script>
