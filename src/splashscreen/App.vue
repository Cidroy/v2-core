<template>
	<v-app dark>
		<v-layout align-center justify-space-between row wrap fill-height>
			<v-flex xs12> <loading style="bottom: 0px;" /> </v-flex>
			<v-flex xs12>
				<v-img :src="logo" class="white--text" contain max-height="100" />
				<h3 class="text-xs-center">GymKonnect</h3>
			</v-flex>
			<v-flex xs12> <loading style="bottom:0px" /> </v-flex>
		</v-layout>
	</v-app>
</template>

<script lang="ts">
// @ts-ignore
import logo from "@/assets/images/splash-logo.png"
import { Component, Vue } from "vue-property-decorator"
import Loading from "./Loading.vue"

@Component({
	components: { Loading, },
})
export default class SplashcreenPage extends Vue{
		logo = logo
		get message(){
			return "Welcome"
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
