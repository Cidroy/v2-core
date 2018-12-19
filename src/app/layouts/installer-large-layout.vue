<template>
	<v-layout max-height="100vh" align-space-around justify-space-between column fill-height>
		<v-flex class="mb-3"> 
			<img src="~@/assets/images/logo.png" alt="Vuetify.js" class="mb-3"/> 
			<v-fade-transition>
				<h2 class="text-xs-center">  {{ $t(pageTitle) }}</h2>
			</v-fade-transition>
		</v-flex>
		<slot />
	</v-layout>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator"
import { InstallerStore } from "@/state/install-modules/install"

@Component({})
export default class LanguagePage extends Vue{
	get pageTitle(){ return InstallerStore.INSTALL_PAGE_TITLE }
}
</script>

<style scoped>
	img {
		margin-left: auto;
		margin-right: auto;
		display: block;
	}
</style>