<template>
	<div>
		<v-btn icon flat @click.native.stop="back"> <v-icon>arrow_back</v-icon> </v-btn>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import { ipcMain, ipcRenderer, remote } from "electron"
import { MAIN } from "@/classes/setup"

@Component({})
export default class InstallExitButton extends Vue{
	back(){
		MAIN.previous()
	}
}
</script>