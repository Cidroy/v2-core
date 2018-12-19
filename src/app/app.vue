<template>
	<div id="app">
		<v-app dark>
			<v-navigation-drawer fixed :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" app >
				<v-list>
					<v-list-tile router :to="item.to" :key="i" v-for="(item, i) in items" exact>
						<v-list-tile-action>
							<v-icon v-html="item.icon" />
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title v-text="item.title"></v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-navigation-drawer>
			<v-toolbar fixed app :clipped-left="clipped">
				<v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
				<v-btn  icon @click.native.stop="miniVariant = !miniVariant"> <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"/> </v-btn>
				<v-btn icon @click.native.stop="clipped = !clipped" > <v-icon v-html="'web'"/> </v-btn>
				<v-btn icon @click.native.stop="fixed = !fixed" > <v-icon v-html="'remove'"/> </v-btn>
				<v-toolbar-title v-text="title"></v-toolbar-title>
				<v-spacer />
				<v-btn icon @click.native.stop="rightDrawer = !rightDrawer" > <v-icon v-html="'menu'"/> </v-btn>
			</v-toolbar>
			<v-content>
				<v-container fluid fill-height>
					<v-slide-y-transition mode="out-in">
						<router-view :key="$route.fullPath" />
					</v-slide-y-transition>
				</v-container>
			</v-content>
			<v-navigation-drawer temporary fixed :right="right" v-model="rightDrawer" app >
				<v-list>
					<v-list-tile @click.native="right = !right">
						<v-list-tile-action>
							<v-icon light v-html="'compare_arrows'"/>
						</v-list-tile-action>
						<v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-navigation-drawer>
			<v-footer :fixed="fixed" app>
				<v-spacer />
				<span>&copy; 2018</span>
			</v-footer>
		</v-app>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import appConfig from "@/app.config"
import { Component } from "vue-property-decorator"

@Component({
	page : {
		// All subcomponent titles will be injected into this template.
		titleTemplate(title) {
			// @ts-ignore
			title = typeof title === "function" ? title(this.$store) : title
			return title ? `${title} | ${appConfig.title}` : appConfig.title
		},
	},
})
export default class Vuetify extends Vue{
	clipped: boolean = false
	drawer: boolean = true
	fixed: boolean = false
	miniVariant: boolean = false
	right: boolean = true
	rightDrawer: boolean = false
	title: string = "GymKonnect"
	items: { icon: string, title: string, to: string }[] = [
		{ icon: "apps", title: "Welcome", to: "/", },
		{ icon: "bubble_chart", title: "Inspire", to: "/inspire", },
	]
}
</script>


<style>
  @import url("assets/fonts/icons/material-icons.css");
  /* Global CSS */
</style>
