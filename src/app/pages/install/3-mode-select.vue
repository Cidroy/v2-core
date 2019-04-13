<template>
	<v-layout column align-space-around justify-space-between fill-height>
		<v-layout class="px-5" style="overflow-y:scroll;max-height: 300px;">
			<!-- CONTENT -->
		</v-layout>
		<v-flex> <v-btn large block class="ma-0 orange darken-2" @click.native.stop="next">{{ $t('next') }}</v-btn> </v-flex>
	</v-layout>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator"
import { MAIN } from "@/classes/setup"
import { TStageMode } from "@/classes/install-router"
import { SoftwareMode } from "@classes/enum/software-mode"
import { InstallerStore } from "@/state/install-modules/install"

@Component({
	page : {
		title: "Install Gym-Konnect",
		meta: [ { name: "Install", content: "Install Gymkonnect now", }, ],
	},
})
export default class ModeSelectPage extends Vue.default {
	mode: SoftwareMode = SoftwareMode.MASTER
	async next(){
		await MAIN.next({ mode: this.mode, })
	}
	constructor(){
		super()
		InstallerStore.setInstallPageTitle("install.steps.select_mode")
	}
}
</script>
