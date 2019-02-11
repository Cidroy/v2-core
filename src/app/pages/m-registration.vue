<template>
	<Layout>
		<v-toolbar extended>
			<v-layout row>
				<v-flex xs12 md7> <h1 class="text-md-right text-xs-center"> Member Registration </h1> </v-flex>
				<v-flex xs12 md5>
					<v-layout justify-end>
						<v-tooltip left>
							<v-btn outline slot="activator"> <v-icon>print</v-icon> </v-btn>
							<span>Print Blank Form</span>
						</v-tooltip>
					</v-layout>
				</v-flex>
			</v-layout>
			<v-layout slot="extension" class="px-2">
				<v-flex xs12 md6>
					<v-radio-group :prepend-icon="usersCount===1?'person':'people'" label="Registration Type" v-model="grouping" row>
						<v-radio v-for="(grouping, index) in GROUPINGS" :label="grouping.name" :value="index" :key="index" color="orange darken-2"/>
					</v-radio-group>
				</v-flex>
				<v-flex xs12 md6 v-if="allowAddPeople || allowDeletePeople"> <h3 class="text-xs-right py-2">{{ usersCount }} / {{ this.GROUPINGS[this.grouping].max }} People</h3> </v-flex>
				<v-flex xs12 md6 v-else> <h3 class="text-xs-right py-2">{{ usersCount }} People</h3> </v-flex>
			</v-layout>
		</v-toolbar>
		<v-layout row wrap class="pa-4">
			<v-flex xs12 v-for="(user, index) in users" :key="index" class="pb-4">
				<h2 v-if="usersCount>1" v-text="`Person #${getIndex(index)}`"/>
				<stepper class="elevation-10" :showDelete="allowDeletePeople" @deleteStepper="()=>{ deleteStepper(index) }" @finished="clientId => stepperComplete(index, clientId)"/>
			</v-flex>
			<v-flex xs12 v-show="allowAddPeople"> <v-btn @click.native.stop="addPeople" flat block large> <v-icon>add</v-icon> Add People </v-btn> </v-flex>
		</v-layout>
		<payment-single v-model="paymentModel" />
		<v-footer v-if="allSteppersComplete" height="auto" color="primary lighten-1" >
			<v-layout justify-center row justify-end align-end class="px-4 py-2">
				<v-spacer />
				<v-btn color="orange darken-4" class="white--text" @click.native.stop="paymentModel = true"> <v-icon class="fas" left>fa-cash-register</v-icon> Make Payment </v-btn>
			</v-layout>
		</v-footer>
	</Layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import uuid from "uuid"
import _ from "lodash"

import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import { MiscStore } from "@/state/modules/misc"
import { TMRegistration, defaultRegistrationUser } from "@/classes/types/registration"

import stepper from "@/components/m-registration/stepper.vue"
import paymentSingle from "@/components/payment/modal-single.vue"

@Component({
	components: { Layout, stepper, paymentSingle, },
	page: {
		title: "Home",
		meta: [ { name: "description", content: appConfig.description, }, ],
	},
	created(){ this.onGroupingChange() }
})
export default class MemberRegistrationPage extends Vue {
	private grouping = 0
	private get GROUPINGS(){ return MiscStore.GROUPINGS }
	private get allowAddPeople(){ return this.usersCount < this.GROUPINGS[this.grouping].max }
	private get allowDeletePeople(){ return this.usersCount > this.GROUPINGS[this.grouping].min }

	private users: { [index: string]: TMRegistration } = {}
	private usersCount = 0

	private getIndex(indexStr: string){ return Object.keys(this.users).indexOf(indexStr) + 1 }
	@Watch("grouping") private onGroupingChange(){
		let diff = 0
		let i = 0
		if(this.usersCount < this.GROUPINGS[this.grouping].count){
			diff = this.GROUPINGS[this.grouping].count - this.usersCount
			for(i=0; i<diff; i++){
				this.users[uuid()] = defaultRegistrationUser
				this.usersCount++
			}
		} else if(this.usersCount > this.GROUPINGS[this.grouping].count){
			diff = this.usersCount - this.GROUPINGS[this.grouping].count
			for(i=0; i<diff; i++){
				delete this.users[<string>Object.keys(this.users).pop()]
				this.usersCount--
			}
		}
	}

	private addPeople(){
		if(!this.allowAddPeople) return false
		this.users[uuid()] = defaultRegistrationUser
		this.usersCount++
		return true
	}

	private deleteStepper(index){
		delete this.users[index]
		this.usersCount--
	}

	private completedSteppers: (number|string)[] = []
	private stepperComplete(stepperId, clientId){
		this.completedSteppers.push(stepperId)
	}
	private get allSteppersComplete(){
		return	(this.usersCount && false)
				|| !_(Object.keys(this.users)).difference(this.completedSteppers).value().length
	}
	@Watch("usersCount") private onUsersChange(){ }

	private paymentModel = false
	private paymentCancelled(){}

}
</script>