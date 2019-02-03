<template>
	<div>
		<v-card class="mb-2" color="transparent" height="480px">
			<v-layout row wrap>
				<v-flex xs2> <v-subheader class="subheading">Member ID</v-subheader> </v-flex>
				<v-flex xs4> <v-text-field label="Enter or Generate ID" single-line solo autofocus/> </v-flex>
				<v-flex xs2> <v-btn dark :loading="loading" :disabled="loading" color="secondary" @click="loader = 'loading'">Generate</v-btn> </v-flex>

				<!-- TODO: max 3 elements only -->
				<v-flex xs12 lg6 class="pa-1"> <v-combobox prepend-icon="fas fa-star" v-model="purposes" :items="Purposes" label="Purpose of Joining Gym" multiple chips hint="Maximum 3 choices" persistent-hint clearable deletable-chips color="orange darken-2"/> </v-flex>
				<v-spacer />
				<v-flex xs5 md5 class="pa-1 pt-3">
					<v-menu ref="dojMenu" :close-on-content-click="false" v-model="dojMenu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width>
						<v-text-field color="orange darken-2" slot="activator" v-model="dojFormatted" label="Date of Joining" prepend-icon="event" readonly persistent-hint @blur="doj = parseDate(dojFormatted)" />
						<v-date-picker v-model="doj" :min="minDoj" no-title @input="dojMenu = false"  color="orange darken-2"/>
					</v-menu>
					<v-checkbox label="Allow Back Dates" v-model="allowBackDating" color="orange"/>
				</v-flex>

				<v-flex xs12 class="pt-5 pl-2">
					<span class="title font-weight-regular">Allow Door Access</span>
					<v-layout align-start row>
						<v-switch v-model="allowedDoors" v-for="(value, name) in Doors" :key="value" :label="name" :value="value" color="orange darken-2"/>
					</v-layout>
				</v-flex>

				<v-flex xs12 class="pt-2 pl-2">
					<span class="title font-weight-regular">How did you hear of us?</span>
					<v-layout align-start row>
						<v-checkbox v-model="utmSource" v-for="(value, name) in UTM_Sources" :key="value" :label="name" :value="value" color="orange darken-2"></v-checkbox>
					</v-layout>
				</v-flex>

				<v-flex xs12 pl-2>
					<v-layout align-end justify-start reverse fill-height>
						<v-checkbox v-model="toc" color="orange darken-2">
							<div slot="label">
								I agree to Gym
								<v-tooltip bottom>
									<a slot="activator" class="blue--text text-lighten-1" @click.native.stop="showRules"> <u>Rules & Regulations</u></a>
									Show
								</v-tooltip>
								followed by
								<v-tooltip bottom>
									<a slot="activator" class="blue--text text-lighten-1" @click.native.stop="showToc"> <u>Terms & Conditions..</u></a>
									Show
								</v-tooltip>
							</div>
						</v-checkbox>
					</v-layout>
				</v-flex>
			</v-layout>
		</v-card>

		<div class="right">
			<v-btn dark>Cancel</v-btn>
			<v-dialog v-model="confirmModal" persistent max-width="400px">
				<v-btn dark slot="activator" color="orange darken-4" class="mb-2">Submit</v-btn>
				<v-card>
					<v-toolbar card dark color="orange darken-4" height="50px">
						<v-toolbar-title>Alert!</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<label class="title">Do you want to Proceed for payments?</label>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn dark color="orange darken-4" @click="confirmModal = false" to="/payment">Yes</v-btn>
						<v-btn dark @click="confirmModal = false">No</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import moment from "moment"
import { MiscStore } from "@/state/modules/misc"
import { formatDate, parseDate } from "@/utils/misc"
import { TMRegistrationStep4 } from "@/classes/types/registration"

@Component({})
export default class MRegistrationStep4 extends Vue{
	private formatDate(date){ return formatDate(date) }
	private parseDate(date){ return formatDate(date) }

	private loading = false
	private confirmModal = false
	private allowBackDating = false

	private utmSource: boolean | string | number = false
	private toc = false
	private allowedDoors: (number|string)[] = []
	private purposes: (string| number)[] = [ MiscStore.PURPOSES[0] ]
	private get Purposes(){return MiscStore.PURPOSES }

	private doj = new Date().toISOString().substr(0, 10)
	private dojFormatted = this.formatDate(this.doj)
	private dojMenu = false
	@Watch("doj") private onDateChanged() { this.dojFormatted = this.formatDate(this.doj) }
	private get minDoj(){ return moment(new Date()).add(0, "days").toISOString().substr(0, 10) }

	private get getDateFormatted() { return this.formatDate(this.doj) }
	private get Doors(){ return MiscStore.DOORS }
	private get UTM_Sources(){ return MiscStore.UTM_SOURCES }

	private get userData(){
		return {
			...this.value,
			utmSource : this.value.utmSource,
			toc : this.value.toc,
			allowedDoors : this.value.allowedDoors,
			doj : this.value.doj,
			purposes : this.value.purposes,
		}
	}
	@Prop({
		type: Object,
		default: () => {
			let def: TMRegistrationStep4 = {
				utmSource : false,
				toc : false,
				allowedDoors : [],
				doj : new Date().toISOString().substr(0, 10),
				purposes : [],
			}
			return def
		}
	}) private value !: TMRegistrationStep4
	@Emit("input") public inputEmitter(){ return this.userData }
	@Watch("value") private onValueChange(){
		this.utmSource = this.value.utmSource
		this.toc = this.value.toc
		this.allowedDoors = this.value.allowedDoors
		this.doj = this.value.doj
		this.purposes = this.value.purposes
	}

	private showToc(){}
	private showRules(){}
}
</script>