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
					<v-radio v-for="(value, name) in GROUPINGS" :label="name" :value="name" :key="name"/>
				</v-radio-group>
			</v-flex>
			<v-flex xs12 md6 v-if="allowAddPeople || allowDeletePeople"> {{ x_steppers }} / {{ this.GROUPINGS[this.grouping].max }} People </v-flex>
			<v-flex xs12 md6 v-else> {{ x_steppers }} People </v-flex>
		</v-layout>
		<stepper v-for="count in x_steppers" :key="count" :showDelete="allowDeletePeople" @deleteStepper="()=>{ deleteStepper(count) }" />
		<v-btn v-show="allowAddPeople" @click.native.stop="addPeople" flat block large> <v-icon>add</v-icon> Add People </v-btn>
	</Layout>
</template>

<script lang="ts">
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import { Component, Vue, Watch } from "vue-property-decorator"
import { MiscStore } from "@/state/modules/misc"

import stepper from "@/components/m-registration/stepper.vue"


@Component({
	components: { Layout, stepper, },
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
})
export default class Home extends Vue {
	grouping = Object.keys(this.GROUPINGS)[0]
	get GROUPINGS(){ return MiscStore.GROUPINGS }
	get allowAddPeople(){
		if(this.x_steppers < this.GROUPINGS[this.grouping].max) return true
		else{
			if(this.x_steppers > this.GROUPINGS[this.grouping].max) this.x_steppers = this.GROUPINGS[this.grouping].max
			return false
		}
	}

	get allowDeletePeople(){
		if(this.x_steppers > this.GROUPINGS[this.grouping].min) return true
		else{
			if(this.x_steppers < this.GROUPINGS[this.grouping].min) this.x_steppers = this.GROUPINGS[this.grouping].min
			return false
		}
	}

	x_steppers = this.GROUPINGS[this.grouping].count
	@Watch("grouping") onGroupingChange(){ this.x_steppers = this.GROUPINGS[this.grouping].count }

	addPeople(){
		if(!this.allowAddPeople) return false
		this.x_steppers++
		return true
	}

	deleteStepper(index){
		console.log(index)
		this.x_steppers--
	}
}
</script>