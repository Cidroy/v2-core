<template>
	<div>
		<v-btn icon color="blue" flat @click.native.stop="showHelpPage = true"> <v-icon>help</v-icon> </v-btn>
		<v-bottom-sheet v-model="showHelpPage">
			<v-card>
				<v-card-title class="headline">
					<v-icon large color="blue lighten-2" class="mr-2">help</v-icon>
					Instant Help 
				</v-card-title>
				<v-card-text v-html="$t(installHelpDocument)" />
				<v-card-actions>
					<v-btn block flat @click.native.stop="showHelpPage = false"> <v-icon class="mr-2">done</v-icon> Done</v-btn>
				</v-card-actions>
			</v-card>
		</v-bottom-sheet>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import { ipcRenderer } from "electron"
import { InstallerStore } from "@/state/install-modules/install"

@Component({})
export default class InstallHelpButton extends Vue{
	showHelpPage:boolean = false
	get page(){ return InstallerStore.HELPDOC }
	get installHelpDocument(){ return `install.helpdoc.${this.page}` }
}
</script>