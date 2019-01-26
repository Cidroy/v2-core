<template>
	<div>
		<v-btn icon flat color="red darken-3" @click.native.stop="() => { if(requireConfirmExit) confirmExit = true; else exitInstallation(); }"> <v-icon>close</v-icon> </v-btn>
		<v-dialog v-model="confirmExit" persistent max-width="300">
			<v-card>
				<v-card-title class="headline">
					<v-icon large color="orange" class="mr-2">warning</v-icon>
					Exit Software?
				</v-card-title>
				<v-card-text>
					Please select "Yes" to exit,
					<br>
					Select "Cancel" to continue working. 
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
import { ipcMain, ipcRenderer, remote } from "electron"

@Component({})
export default class InstallExitButton extends Vue{
	requireConfirmExit:boolean = true
	confirmExit:boolean = false

	exitInstallation(){
		let thisWindow = remote.getCurrentWindow()
		thisWindow.close()
	}	
	mounted(){
		ipcRenderer.on("app-require-quit-confirm", state=>{ this.requireConfirmExit = state })
	}
}
</script>