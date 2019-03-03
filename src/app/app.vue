<template>
	<div id="app">
		<v-app :dark="darkTheme">
			<component :is="layout">
				<dev-resizer :show="showDevResizer" />
				<v-content>
					<v-container class="pa-0" fluid style="overflow-y:scroll; min-height:calc(100vh - 100px); max-height:calc(100vh - 100px)">
						<v-slide-y-transition mode="out-in">
							<router-view :key="$route.fullPath" />
						</v-slide-y-transition>
					</v-container>
				</v-content>
			</component>
		</v-app>
	</div>
</template>

<style>
@import url("assets/fonts/icons/material-icons.css");
/* Global CSS */
</style>
