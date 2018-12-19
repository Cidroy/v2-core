<template>
	<v-layout max-height="100vh" align-space-around justify-space-between column fill-height>
		<v-flex> <img src="~@/assets/images/logo.png" alt="Vuetify.js" class="mb-3"/> </v-flex>
		<v-layout column align-space-around fill-height style="max-height:332px; overflow-y:scroll;">
			<v-layout class="px-5">
				<!-- CONTENT -->
			</v-layout>
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
import { MAIN } from "@/classes/setup"

@Component({
	page : {
		title: "Install Gym-Konnect",
		meta: [ { name: "Install", content: "Install Gymkonnect now", }, ],
	},
})
export default class WelcomePage extends Vue{
	async next(){
		// await MAIN.next({  })
	}
}
</script>
