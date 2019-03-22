<template>
	<div id="app">
		<v-app :dark="darkTheme">
			<component :is="layout">
				<dev-resizer :show="showDevResizer" />
				<!-- <v-slide-y-transition mode="out-in">
					<loading v-if="appRouterLoading" />
				</v-slide-y-transition> -->
				<v-slide-y-transition mode="out-in">
					<router-view :key="$route.fullPath" />
				</v-slide-y-transition>
			</component>
		</v-app>
	</div>
</template>

<style>
/* @import url("assets/fonts/icons/material-icons.css"); */
/* Global CSS */
</style>
