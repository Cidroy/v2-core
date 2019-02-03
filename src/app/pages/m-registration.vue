<template>
	<Layout>
		<v-layout row>
			<v-flex xs12 md7>
				<h1 class="text-md-right text-xs-center"> Member Registration </h1>
			</v-flex>
			<v-flex xs12 md5>
				<v-layout justify-end>
					<v-tooltip left>
						<v-btn outline slot="activator">
							<v-icon>print</v-icon>
						</v-btn>
						<span>Print Blank Form</span>
					</v-tooltip>

				</v-layout>
			</v-flex>
		</v-layout>
		<v-layout class="px-2">
			<v-flex xs12 md6>
				<v-radio-group prepend-icon="people" label="Registration Type" v-model="grouping" row>
					<v-radio v-for="(value, name) in GROUPINGS" :label="name" :value="name" :key="name" color="orange darken-2"/>
				</v-radio-group>
			</v-flex>
			<v-flex xs12 md6 v-if="allowAddPeople || allowDeletePeople"> {{ x_steppers }} / {{ this.GROUPINGS[this.grouping].max }} People </v-flex>
			<v-flex xs12 md6 v-else> {{ x_steppers }} People </v-flex>
		</v-layout>
		<stepper v-for="(user, index) in x_users" :key="index" :showDelete="allowDeletePeople" @deleteStepper="()=>{ deleteStepper(index) }"/>
		<v-btn v-show="allowAddPeople" @click.native.stop="addPeople" flat block large> <v-icon>add</v-icon> Add People </v-btn>
	</Layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import { MiscStore } from "@/state/modules/misc"
import { TMRegistration, defaultRegistrationUser } from "@/classes/types/registration"

import stepper from "@/components/m-registration/stepper.vue"


@Component({
	components: { Layout, stepper, },
	page: {
		title: "Home",
		meta: [ { name: "description", content: appConfig.description, }, ],
	},
	created(){ this.onGroupingChange() }
})
export default class Home extends Vue {
	private grouping = Object.keys(this.GROUPINGS)[0]
	private get GROUPINGS(){ return MiscStore.GROUPINGS }
	private get allowAddPeople(){ return this.x_steppers < this.GROUPINGS[this.grouping].max }
	private get allowDeletePeople(){ return this.x_steppers > this.GROUPINGS[this.grouping].min }

	private users: TMRegistration[] = []

	private get x_users(){ return this.users }
	private get x_steppers(){ return this.users.length }
	@Watch("grouping") private onGroupingChange(){
		let diff = 0
		let i = 0
		if(this.x_steppers < this.GROUPINGS[this.grouping].count){
			diff = this.GROUPINGS[this.grouping].count - this.x_steppers
			for(i=0; i<diff; i++) this.users.push(defaultRegistrationUser)
		} else if(this.x_steppers > this.GROUPINGS[this.grouping].count){
			diff = this.x_steppers - this.GROUPINGS[this.grouping].count
			for(i=0; i<diff; i++) this.users.pop()
		}
	}

	private addPeople(){
		if(!this.allowAddPeople) return false
		this.users.push(defaultRegistrationUser)
		return true
	}

	private deleteStepper(index){
		console.log(index, this.users[index].firstName, this.users)
		this.users.splice(index,1)
	}
}
</script>