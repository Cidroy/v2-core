<template>
	<v-layout column align-space-around justify-space-between fill-height>
		<v-flex class="pa-5" style="overflow-y:scroll;">
			<template v-for="(key,item) in i18n.list">
				<v-divider :key="`${key}-divider`"></v-divider>
				<v-list-tile :key="`${key}-${item}`" :class=" key===language?'orange--text':'' " @click.native.stop="language=key">
					<v-list-tile-action> <div slot="label" class="ml-3" v-text="item" ></div> </v-list-tile-action>
					<v-spacer/>
					<v-scroll-x-transition>
						<v-icon v-if="key===language" color="orange" v-html="'check'" />
					</v-scroll-x-transition>
				</v-list-tile>
			</template>
		</v-flex>
		<v-btn large block class="ma-0 orange darken-2" @click.native.stop="next">{{ $t('next') }}</v-btn> 
	</v-layout>
</template>

<script lang="ts">
import { i18n, ILanguage } from "@/i18n"
import { Component, Watch, Vue } from "vue-property-decorator"
import { InstallerStore } from "@/state/install-modules/install"
import { MAIN } from "@/classes/setup"
import { TStageProductKey, TStageLanguage } from "@/classes/install-router"

@Component({
	page : {
		title: "Install Gym-Konnect",
		meta: [ { name: "Install", content: "Install Gymkonnect now", }, ],
	},
})
export default class LanguagePage extends Vue{
	i18n = i18n
	language: ILanguage = i18n.default
	@Watch("language")
	onLanguageChange(){
		InstallerStore.setLanguage(this.language)
	}
	next(){
		MAIN.next({ language: this.language, })
	}
	constructor(){
		super()
		InstallerStore.setInstallPageTitle("install.steps.select_language")
	}
}
</script>
