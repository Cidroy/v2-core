<template>
	<v-layout column align-space-around justify-space-between fill-height>
		<v-layout class="px-5" style="overflow-y:scroll;max-height: 300px;">
			<!-- CONTENT -->
		</v-layout>
		<v-flex> <v-btn large block class="ma-0 orange darken-2" @click.native.stop="next">{{ $t('done') }}</v-btn> </v-flex>
	</v-layout>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator"
import { MAIN } from "@plugins/core/classes/setup"
import { TStageDone } from "@/classes/install-router"
import { InstallerStore } from "@/state/install-modules/install"

@Component({
	page : {
		title: "Install",
		meta: [ { name: "Install", content: "Install now", }, ],
	},
})
export default class CompletedPage extends Vue.default {
	done: boolean = true
	async next(){
		await MAIN.next({ done: this.done, })
	}
	constructor(){
		super()
		InstallerStore.setInstallPageTitle("install.steps.completed")
	}
}
</script>
