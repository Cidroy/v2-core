<template>
	<div id="app">
		<v-app dark>
			<dev-resizer :show="showDevResizer" />
			<!--v-navigation-drawer fixed :mini-variant="miniVariant" :clipped="true" v-model="drawer" app >
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
				<v-toolbar-side-icon @click.native.stop="miniVariant = !miniVariant"></v-toolbar-side-icon>
				<v-toolbar-title v-text="title"></v-toolbar-title>
				<v-spacer />
				<app-exit-button />
			</v-toolbar-->
			<v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
      			<v-list dense>
        			<template v-for="item in items">
          				<v-layout row v-if="item.heading" align-center :key="item.heading">
            				<v-flex xs6>
              					<v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            				</v-flex>
            				<v-flex xs6 class="text-xs-center">
              					<a href="#!" class="body-2 black--text">EDIT</a>
            				</v-flex>
          				</v-layout>
          			<v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
            			<v-list-tile slot="activator">
              				<v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="orange darken-4" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
			<span class="hidden-sm-and-down" style="width: 65px" >GymKonnect</span>
      <v-toolbar-title style="width: 100px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-toolbar-title>
			<v-spacer></v-spacer>
      <v-text-field flat solo-inverted prepend-icon="search" label="Search" class="hidden-sm-and-down pt-2" />
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
       <v-avatar color="orange darken-4" size="40">
      <v-icon dark>account_circle</v-icon>
    </v-avatar>
      </v-btn>
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
			<v-footer dark :fixed="fixed" app>
				<v-btn round>
					<span>BackUp</span>
				</v-btn>
				<v-spacer></v-spacer>
				<span> 
					<v-chip color="grey darken-4" :label="true" :disabled="true" text-color="white">Messages Left :
      					
    				</v-chip>
				</span>
				<span>
					<v-chip color="grey darken-4" :label="true" :disabled="true" text-color="white">Device Status
      					<v-icon right>fingerprint</v-icon>
    				</v-chip>
				</span>
			</v-footer>
		</v-app>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import appConfig from "@/app.config"
import { Component } from "vue-property-decorator"
import Keyboard from "mousetrap"
import devResizer from "@/components/dev-resizer.vue"

@Component({
	components: { devResizer, },
	page : {
		// All subcomponent titles will be injected into this template.
		titleTemplate(title) {
			// @ts-ignore
			title = typeof title === "function" ? title(this.$store) : title
			return title ? `${title} | ${appConfig.title}` : appConfig.title
		},
	},
	created(){
		Keyboard.bind([ "command+p", "ctrl+p", ], () => {
			this.showDevResizer = !this.showDevResizer
		})
	},
})
export default class Vuetify extends Vue{
	clipped: boolean = false
	showDevResizer: boolean = false
	drawer: boolean = false
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
