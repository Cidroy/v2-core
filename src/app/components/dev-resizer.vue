<template>
    <v-dialog v-model="modal" max-width="300">
        <v-card>
            <v-card-text>
	            <v-card-title class="headline">Developer Options</v-card-title>
				<v-subheader>Resize</v-subheader>
				<v-layout row wrap>
					<v-flex xs6 class="px-1"><v-btn block @click.native.stop="mobile"> <v-icon left>smartphone</v-icon> Mobile</v-btn></v-flex>
					<v-flex xs6 class="px-1"><v-btn block @click.native.stop="fullScreen"><v-icon left>fullscreen</v-icon> Full</v-btn></v-flex>
				</v-layout>
				<v-subheader>Advanced</v-subheader>
				<v-btn block @click.native.stop="showTaskManager"> <v-icon left>dvr</v-icon> Task Manager</v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import ResizeWindow from "@@/electron/window-resizer"

// @ts-ignore
@Component({})
export default class DevResizer extends Vue.default {
	@Prop({ type: Boolean, default: false }) private show!: boolean
	private modal: boolean = false

	@Watch("show") private onShowChanged(){ this.modal = this.show }
	private mobile(){ ResizeWindow.mobileSize() }
	private fullScreen(){ ResizeWindow.fullSize() }

	private async showTaskManager(){
		// #!if electron
		/**
		 * BUG: import is not working as expected
		 * expected import to be a function got an empty object
		 */
		const openProcessManager = await import("electron-process-manager")
		console.log(openProcessManager)
		// #!else
		alert("this is only available on Desktop version")
		// #!endif
	}
}
</script>
