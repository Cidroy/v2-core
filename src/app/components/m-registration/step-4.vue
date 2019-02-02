<template>
	<div>
		<v-card class="mb-2" color="transparent" height="480px">
						<v-layout row wrap>

							<v-flex xs2>
								<v-subheader class="subheading">Member ID</v-subheader>
							</v-flex>
							<v-flex xs4>
								<v-text-field label="Enter or Generate ID" single-line solo></v-text-field>
							</v-flex>
							<v-flex xs2>
								<v-btn dark :loading="loading" :disabled="loading" color="secondary" @click="loader = 'loading'">Generate</v-btn>
							</v-flex>

							<v-flex xs12 lg6 class="pa-1">
								<v-combobox prepend-icon="fas fa-star" v-model="select" :items="purposes" label="Purpose of Joining Gym" multiple chips hint="Maximum 3 choices"
								 persistent-hint clearable deletable-chips></v-combobox>
							</v-flex>
							<v-spacer></v-spacer>
							<v-flex xs5 md5 class="pa-1 pt-3">
								<v-menu ref="menu4" :close-on-content-click="false" v-model="menu4" :nudge-right="40" lazy transition="scale-transition"
								 offset-y full-width>
									<v-text-field slot="activator" v-model="dateFormatted" label="Date of Joining" prepend-icon="event" hint="DD/MM/YYYY"
									 persistent-hint @blur="date = parseDate(dateFormatted)"></v-text-field>
									<v-date-picker v-model="date" no-title @input="menu4 = false"></v-date-picker>
								</v-menu>
							</v-flex>

							<v-flex xs12 class="pt-5 pl-2">
								<span class="title font-weight-regular">Allow Door Access</span>
								<v-layout align-start row>
									<v-checkbox label="Gym Mens Section" value="Gym Mens Section"></v-checkbox>
									<v-checkbox label="Gym Ladies Section" value="Gym Ladies Section"></v-checkbox>
									<v-checkbox label="Full Gym Section" value="Full Gym Section"></v-checkbox>
									<v-checkbox label="SPA" value="SPA"></v-checkbox>
								</v-layout>
							</v-flex>

							<v-flex xs12 class="pt-2 pl-2">
								<span class="title font-weight-regular">How did you hear of us?</span>
								<v-layout align-start row>
									<v-checkbox v-model="selected" label="Family/Friends" value="Family/Friends"></v-checkbox>
									<v-checkbox v-model="selected" label="Advertisement" value="Advertisement"></v-checkbox>
									<v-checkbox v-model="selected" label="Walk-In" value="Walk-In"></v-checkbox>
									<v-checkbox v-model="selected" label="Internet" value="Internet"></v-checkbox>
									<v-checkbox v-model="selected" label="Recommendation" value="Recommendation"></v-checkbox>
									<v-checkbox v-model="selected" label="Telephonic" value="Telephonic"></v-checkbox>
								</v-layout>
							</v-flex>

							<v-flex xs12 pl-2>
								<v-layout align-end justify-start reverse fill-height>
									<v-checkbox v-model="checkbox">
										<div slot="label">
											I agree to Gym
											<v-tooltip bottom>
												<a slot="activator" @click.stop>Rules & Regulations</a>
												Opens in new window
											</v-tooltip>
											followed by
											<v-tooltip bottom>
												<a slot="activator" @click.stop>Terms & Conditions.</a>
												Opens in new window
											</v-tooltip>
										</div>
									</v-checkbox>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-card>

					<div class="right">
						<v-btn dark>Cancel</v-btn>
						<v-dialog v-model="dialog" persistent max-width="400px">
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
									<v-btn dark color="orange darken-4" @click="dialog = false" to="/payment">Yes</v-btn>
									<v-btn dark @click="dialog = false">No</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import { GENDER } from "@classes/enum/misc"
import { MiscStore } from "@/state/modules/misc"

export default class MRegistrationStep4 extends Vue{
	selected = null
	checkbox = []
	loading = false
	date = new Date().toISOString().substr(0, 10)
	dateFormatted = this.formatDate(this.date)
	dialog = false
	select = MiscStore.PURPOSES[0]
	get Purposes(){return MiscStore.PURPOSES }
	menu4 = false 

	@Watch("date")
	onDateChanged() {
		this.dateFormatted = this.formatDate(this.date)
	}
	get getDateFormatted() {
		return this.formatDate(this.date)
	}
	formatDate(date) {
		// if (!date) return null
		const [year, month, day,] = date.split("-")
		return `${day}/${month}/${year}`
	}
}
</script>