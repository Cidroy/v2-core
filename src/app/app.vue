<template>
<div id="app">
	<v-app :dark="darkTheme">
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
	  <!--drawer-->

		<v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
			<v-list dense>
				<template v-for="item in items">
					<v-layout row v-if="item.heading" align-center :key="item.heading" @click="$router.push({path: item.to})">
						<v-flex xs6>
							<v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
						</v-flex>
					</v-layout>
					<v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" no-action>
						<v-list-tile slot="activator">
							<v-list-tile-content>
								<v-list-tile-title>{{ item.text }}</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
						<v-list-tile v-for="(child, i) in item.children" :key="i" @click="$router.push({path: child.to})">
							<v-list-tile-action v-if="child.icon">
								<v-icon>{{ child.icon }}</v-icon>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title>{{ child.text }}</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list-group>
					<v-list-tile v-else :key="item.text" @click="$router.push({path: item.to})">
						<v-list-tile-action>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>{{ item.text }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</template>
			</v-list>
		</v-navigation-drawer>


		<!--drawer end-->
		<v-toolbar color="orange darken-4" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
			<span class="hidden-sm-and-down" style="width: 65px">GymKonnect</span>
			<v-toolbar-title style="width: 100px" class="ml-0 pl-3">
				<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-text-field flat solo-inverted prepend-icon="search" label="Search" class="hidden-sm-and-down pt-2" />
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon>apps</v-icon>
			</v-btn>
			<v-btn icon large>
				<v-badge color="indigo" overlap>
					<span slot="badge">3</span>
					<v-avatar color="orange darken-4" size="40">
						<v-icon dark>notifications</v-icon>
					</v-avatar>
				</v-badge>
			</v-btn>
			<!--profile  -->
			<div class="text-xs-center">
				<v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x> 
					<v-btn slot="activator" icon large>
						<v-avatar color="orange darken-4" size="40">
							<v-icon dark>account_circle</v-icon>
						</v-avatar>
					</v-btn>

					<v-card>
						<v-list>
							<v-list-tile avatar>
								<v-list-tile-avatar color="orange darken-4">
									<span class="white--text headline">K</span>
								</v-list-tile-avatar>

								<v-list-tile-content>
									<v-list-tile-title>K Karthik</v-list-tile-title>
									<v-list-tile-sub-title>Admin</v-list-tile-sub-title>
								</v-list-tile-content>
							</v-list-tile>
						</v-list>

						<v-divider></v-divider>

						<v-list>
							<v-list-tile  v-for="(item, index) in profileList" :key="index">
								<v-list-tile-title>{{ item.text }}</v-list-tile-title>
							</v-list-tile>

							<v-divider></v-divider>

							<v-list-tile>
								<v-list-tile-title>Dark</v-list-tile-title>
								<v-list-tile-action>
									<v-switch v-model="darkTheme" color="orange darken-4"></v-switch>
								</v-list-tile-action>
								
							</v-list-tile>
						</v-list>
					</v-card>
				</v-menu>
			</div>
			<!--profile end -->
		</v-toolbar>
		<v-content>
			<v-container fluid style="overflow-y:scroll; min-height:calc(100vh - 100px); max-height:calc(100vh - 100px)">
				<v-slide-y-transition mode="out-in">
					<router-view :key="$route.fullPath" />
				</v-slide-y-transition>
			</v-container>
		</v-content>
		<v-footer dark :fixed="fixed" app>
			<span class="pl-2"> &copy; GymKonnect 2019. All rights reserved.</span>
			<v-spacer></v-spacer>
			<v-btn outline small>
				<span>BackUp</span>
				<v-icon right>cloud_upload</v-icon>
			</v-btn>
			<span>
				<v-chip color="grey darken-4" :label="true" :disabled="true" text-color="white">Messages Left :</v-chip>
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
import { Component, Watch } from "vue-property-decorator"
import Keyboard from "mousetrap"
import devResizer from "@/components/dev-resizer.vue"
import { ThemeStore } from "@/state/theme"

@Component({
	components: { devResizer, },
	page: {
		// All subcomponent titles will be injected into this template.
		titleTemplate(title) {
			// @ts-ignore
			title = typeof title === "function" ? title(this.$store) : title
			return title ? `${title} | ${appConfig.title}` : appConfig.title
		},
	},
	created() {
		Keyboard.bind([ "command+p", "ctrl+p", ], () => {
			this.showDevResizer = !this.showDevResizer
		})
	},
})
export default class Vuetify extends Vue {
    menu: boolean = false;
    clipped: boolean = false;
    showDevResizer: boolean = false;
    drawer: boolean = false;
    fixed: boolean = false;
    miniVariant: boolean = false;
    right: boolean = true;
    rightDrawer: boolean = false;
    title: string = "GymKonnect";
    items:
        { icon: string, text: string, children: { icon: string, text: string, to: string }[], model: boolean, "icon-alt": string }[] |
        { icon: string, heading: string, to?: string }[] |
        { icon: string, text: string, to: string }[] | any
        = [
            { icon: "apps", text: "Dashboard", to: "/", },
            {
                icon: "people", text: "Members", children: [
                    { icon: "view_list", text: "List", to: "/m-list", },
                    { icon: "group_add", text: "Registration", to: "/m-registration", },
                    { icon: "autorenew", text: "Renewal", to: "/m-renewal", },
                    { icon: "timer_off", text: "Freezing", to: "/m-freeze", },
                ],
                "icon-alt": "people",
            },
            { 
				icon: "library_add", text: "Add Ons", children: [
				{ icon: "assignment_ind", text: "Registrations", to: "/inspire", },
            	{ icon: "bubble_chart", text: "Bookings", to: "/inspire", },
				{ icon: "bubble_chart", text: "Enquiry", to: "/inspire", },
				],
				"icon-alt": "library_add",
			},
			{ icon: "bubble_chart", text: "Sales & Finance", to: "/inspire", },
			{ icon: "bubble_chart", text: "Reports", to: "/inspire", },
            { icon: "bubble_chart", text: "HR", to: "/inspire", },
            { 
				 icon: "web", text: "Settings", children: [
				 { icon: "bubble_chart", text: "Edit", to: "/inspire", },
            	 { icon: "bubble_chart", text: "Profile", to: "/inspire", },
				 ],
				 "icon-alt": "web",
			}
        ];
    profileList: { icon?: string, text: string }[] = [
        { text: "My Account", },
        { text: "Dummy", },
        { text: "Logout", },
        { text: "Exit", },
    ];
    
	darkTheme:boolean = ThemeStore.DARK_THEME
	@Watch("darkTheme") toggleDarkTheme(){ ThemeStore.toggleDarkTheme() }
}
</script>


<style>
@import url("assets/fonts/icons/material-icons.css");
/* Global CSS */
</style>
