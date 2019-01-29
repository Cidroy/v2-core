<template>
	<v-app dark>
		<v-layout v-if="!x_error" align-center justify-space-between row wrap fill-height>
			<v-flex xs12> <loading style="bottom: 0px;" /> </v-flex>
			<v-flex xs12>
				<v-img :src="logo" class="white--text" contain max-height="100" />
				<h3 class="text-xs-center">GymKonnect</h3>
			</v-flex>
			<v-flex xs12>
				<label>>>> {{ message }} //</label>
				<loading style="bottom:0px" />
			</v-flex>
		</v-layout>
		<v-layout v-else align-center justify-space-between row wrap fill-height>
			<v-flex xs4 style="border-right: 3px solid white">
				<v-img :src="logo" class="white--text" contain max-height="100" />
				<h3 class="text-xs-center">GymKonnect</h3>
			</v-flex>
			<v-flex xs8 class="px-2">
				<h2 class="orange--text text-darken-2">Error: </h2>
				<label>>>> {{ message }} //</label>
				<v-btn flat block @click.native.stop="exit">Exit</v-btn>
			</v-flex>
		</v-layout>
	</v-app>
</template>

<script lang="ts">
// @ts-ignore
import logo from "@/assets/images/splash-logo.png"
import { Component, Vue } from "vue-property-decorator"
import Loading from "./Loading.vue"
import { ipcRenderer } from "electron"

@Component({
	components: { Loading, },
	created(){
		ipcRenderer.on("splash-log", (event, args)=>{
			this.x_message = args
		})
		ipcRenderer.on("splash-error", (event, args)=>{
			this.x_error = "failed"
			console.log(args)
		})
	},
})
export default class SplashcreenPage extends Vue{
		logo = logo
		x_message = "default message"
		x_error = ""
		get message(){ return this.x_message }
		get error(){ return this.x_error }

		exit(){
			ipcRenderer.send("kill-me", 0)
		}
}
</script>


<style>
body {
	overflow-x: hidden !important;
}
</style>

<style>
.app-splashscreen-logo{
	max-height: 100%;
	max-width: 100%;
}
</style>
