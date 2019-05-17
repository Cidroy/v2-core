<template>
	<v-dialog v-model="importDialog" persistent width="400px">
		<slot  name="activator" slot="activator"/>
		<v-card>
			<v-toolbar height="50px" card dark color="orange darken-4">
				<v-toolbar-title>{{ title }}</v-toolbar-title>
			</v-toolbar>
			<v-card-text>
				<label class="title">Search by Mobile No./Name</label>
				<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="transparent" @click="Cancel">Cancel</v-btn>
				<v-btn color="orange darken-4" @click="Submit">Submit</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>


<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator"

@Component({})
export default class MRegistrationStep1 extends Vue.default {
	@Prop({ type: String, default: "Import Details"}) title !: string

	importDialog: boolean = false
	search: string = ""
	memberId: string = ""

	async Submit(){
		this.importDialog = false
		this.memberId = "123"
		this.memberIdFound()
	}
	@Emit("memberId") memberIdFound(){ return this.memberId }
	@Emit("cancel") Cancel(){ this.importDialog = false }
}
</script>
