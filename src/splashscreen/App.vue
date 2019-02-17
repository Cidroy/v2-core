<template>
	<v-app dark>
		<v-layout v-if="!error" align-center justify-space-between row wrap fill-height>
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
