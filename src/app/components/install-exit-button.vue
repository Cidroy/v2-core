<template>
	<div>
		<v-btn icon flat color="red darken-3" @click.native.stop="() => { if(requireConfirmExit) confirmExit = true; else exitInstallation(); }"> <v-icon>close</v-icon> </v-btn>
		<v-dialog v-model="confirmExit" persistent max-width="300">
			<v-card>
				<v-card-title class="headline">
					<v-icon large color="orange" class="mr-2">warning</v-icon>
					Exit Installation?
				</v-card-title>
				<v-card-text>
					No changes will be saved to your system if you exit now.
					<br>
					Please select "Yes" to exit,
					<br>
					Select "Cancel" to continue with the Installation.
				</v-card-text>
				<v-card-actions>
					<v-btn flat @click.native.stop="confirmExit = false">Cancel</v-btn>
					<v-spacer></v-spacer>
					<v-btn color="green" flat @click.native.stop="exitInstallation">Yes</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { ipcRenderer, remote } from "electron"

// @ts-ignore
@Component({})
export default class InstallExitButton extends Vue.default {
	private requireConfirmExit:boolean = true
	private confirmExit:boolean = false

	private exitInstallation(){
		let thisWindow = remote.getCurrentWindow()
		thisWindow.close()
	}
	private mounted(){
		ipcRenderer.on("app-require-quit-confirm", state=>{ this.requireConfirmExit = state })
	}
}
</script>
