<template>
	<v-app dark>
		<v-container class="pa-0" fill-height fluid>
			<v-layout fill-height>
				<v-card class="flex px-3">
					<v-img :src="logo" height="100%" class="white--text app-splashscreen-logo" />
				</v-card>
			</v-layout>
		</v-container>
	</v-app>
</template>

<script lang="ts">
// @ts-ignore
import logo from "@/assets/images/logo.png"
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class SplashcreenPage extends Vue{
		message: string = "welcome"
		logo = logo
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
