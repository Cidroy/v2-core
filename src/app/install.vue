<template>
	<div id="app">
		<v-app dark>
			<v-content>
				<v-container column fluid fill-height class="pa-0">
					<!-- TOP TOOLBAR -->
					<v-toolbar fixed app color="transparent" class="elevation-0">
						<install-back-button v-if="backButton"/>
						<app-title-bar/>
						<install-help-button/>
						<install-exit-button/>
					</v-toolbar>
					<component :is="installerLayout">
						<v-slide-y-transition mode="out-in">
							<!-- PAGE ROUTER -->
							<router-view :key="$route.fullPath" />
						</v-slide-y-transition>
					</component>
				</v-container>
			</v-content>
		</v-app>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { InstallerStore } from "@/state/install-modules/install"

@Component({})
export default class Main extends Vue{
	private get backButton(){ return InstallerStore.REVERT_BUTTON }
	private get installerLayout(){ return InstallerStore.INSTALLER_LAYOUT }
}
</script>
