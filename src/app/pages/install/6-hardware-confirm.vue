<template>
	<v-layout column align-space-around justify-space-between fill-height>
		<v-layout class="px-5" style="overflow-y:scroll;max-height: 300px;">
			<!-- CONTENT -->
		</v-layout>
		<v-flex> <v-btn large block class="ma-0 orange darken-2" @click.native.stop="next">{{ $t('next') }}</v-btn> </v-flex>
	</v-layout>
</template>

<script lang="ts">
import { Component, Watch, Vue, Prop } from "vue-property-decorator"
import { MAIN } from "@/classes/setup"
import { TStageHardware, IDevice } from "@/classes/install-router"
import { InstallerStore } from "@/state/install-modules/install"

@Component({
	page : {
		title: "Install Gym-Konnect",
		meta: [ { name: "Install", content: "Install Gymkonnect now", }, ],
	},
	created(){
		this.biometric = this.input
	},
})
export default class HardwareConfirmPage extends Vue{
	// @ts-ignore
	@Prop(Array) value: IDevice[]
	biometric: IDevice[] = []
	async next(){
		await MAIN.next({ biometric: this.biometric, })
	}
	constructor(){
		super()
		InstallerStore.setInstallPageTitle("install.steps.hardware_confirm")
	}
}
</script>
