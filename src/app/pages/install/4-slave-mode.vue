<template>
	<v-layout column align-space-around justify-space-between fill-height>
		<v-layout class="px-5" style="overflow-y:scroll;max-height: 300px;">
			<!-- CONTENT -->
		</v-layout>
		<v-flex> <v-btn large block class="ma-0 orange darken-2" @click.native.stop="next">{{ $t('next') }}</v-btn> </v-flex>
	</v-layout>
</template>

<style scoped>
	img {
		margin-left: auto;
		margin-right: auto;
		display: block;
	}
</style>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator"
import { MAIN } from "@plugins/core/classes/setup"
import { TStageSlave } from "@/classes/install-router"
import { InstallerStore } from "@/state/install-modules/install"

@Component({
	page : {
		title: "Install Gym-Konnect",
		meta: [ { name: "Install", content: "Install Gymkonnect now", }, ],
	},
})
export default class SlaveModePage extends Vue.default {
	ip: string = "0.0.0.0"
	async next(){
		await MAIN.next({ ip: this.ip, })
	}
	constructor(){
		super()
		InstallerStore.setInstallPageTitle("install.steps.slave_mode")
	}
}
</script>
