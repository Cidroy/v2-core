<template>
	<div>
		<!-- <v-tab-item key="a">
        			<v-card color="transparent" height="610px">
						<v-layout row wrap>
							<v-flex class="pl-2 ml-2" xs12>
								<v-radio-group row label="SPA Booking Type: " v-model="grouping">
									<v-layout row align-start>
										<v-radio v-for="(value, name) in GROUPINGS" :label="name" :value="name" :key="name"/>
									</v-layout>
								</v-radio-group>
							</v-flex>
							<v-flex xs12 v-if="allowAddPeople || allowDeletePeople"> {{ x_layouts }} / {{ this.GROUPINGS[this.grouping].max }} People </v-flex>
			<v-flex xs12  v-else> {{ x_layouts }} People </v-flex>
			<layout v-for="count in x_layouts" :key="count" :showDelete="allowDeletePeople" @deleteLayout="()=>{ deleteLayout(count) }" />
		<v-btn v-show="allowAddPeople" @click.native.stop="addPeople" flat block large> <v-icon>add</v-icon> Add People </v-btn>
							<v-flex xs2>
								<v-subheader class="title">Mobile No</v-subheader>
							</v-flex>
							<v-flex xs4>
								<v-text-field label="Enter Mobile No" single-line solo></v-text-field>
							</v-flex>
						</v-layout>
						<v-divider></v-divider>

			</v-card>
      	</v-tab-item> -->
				  
	</div>
</template>

// <script lang="ts">
// import appConfig from "@/app.config"
// import Layout from "@/layouts/main.vue"
// import { Component, Vue, Watch } from "vue-property-decorator"
// import { watch } from 'fs';
// import { MiscStore } from "@/state/modules/misc"
// import layout from "@/components/m-registration/layout.vue"
// @Component({
// 	components: { Layout, layout,  },
// 	page : {
// 		title: "Home",
// 		meta: [ { name: "description", content: appConfig.description, }, ],
// 	},
// })

// export default class Spa extends Vue{
	
// 	grouping = Object.keys(this.GROUPINGS)[0]
// 	get GROUPINGS(){ return MiscStore.GROUPINGS }
// 	get allowAddPeople(){
// 		if(this.x_layouts < this.GROUPINGS[this.grouping].max) return true
// 		else{
// 			if(this.x_layouts > this.GROUPINGS[this.grouping].max) this.x_layouts = this.GROUPINGS[this.grouping].max
// 			return false
// 		}
// 	}

// 	get allowDeletePeople(){
// 		if(this.x_layouts > this.GROUPINGS[this.grouping].min) return true
// 		else{
// 			if(this.x_layouts < this.GROUPINGS[this.grouping].min) this.x_layouts = this.GROUPINGS[this.grouping].min
// 			return false
// 		}
// 	}

// 	x_layouts = this.GROUPINGS[this.grouping].count
// 	@Watch("grouping") onGroupingChange(){ this.x_layouts = this.GROUPINGS[this.grouping].count }

// 	addPeople(){
// 		if(!this.allowAddPeople) return false
// 		this.x_layouts++
// 	}

// 	deleteStepper(index){
// 		console.log(index)
// 		this.x_layouts--
// 	}

// }