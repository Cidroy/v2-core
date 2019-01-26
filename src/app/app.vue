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

			<v-bottom-nav :value="true" absolute color="transparent">
      			<v-btn color="orange darken-4" flat>
					<span>Help</span>
					<v-icon>help</v-icon>
      			</v-btn>

      			<v-btn color="orange darken-4" flat>
					<span>About</span>
        			<v-icon>info</v-icon>
      			</v-btn>

      			<v-btn color="orange darken-4" flat>
					<span>Check Update</span>
					<v-icon>update</v-icon>
				</v-btn>
    		</v-bottom-nav>	
		</v-navigation-drawer>


		<!--drawer end-->
		<v-toolbar color="orange darken-4" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
			<span class="hidden-sm-and-down title font-weight-black" style="width: 190px">GYM KONNECT</span>
			<v-toolbar-title style="width: 100px" class="ml-0 pl-3">
				<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-text-field flat solo-inverted prepend-icon="search" label="Search" class="hidden-sm-and-down pt-2" />
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon>apps</v-icon>
			</v-btn>
			<v-menu v-model="menuNotify" :close-on-content-click="true" offset-y>
				<v-btn icon large slot="activator" dark>
					<v-badge color="indigo" overlap>
						<span slot="badge">3</span>
						<v-avatar color="orange darken-4" size="40">
							<v-icon dark>notifications</v-icon>
						</v-avatar>
					</v-badge>
				</v-btn>
				<v-list three-line>
					<template v-for="(noti, index) in notis">
						<v-subheader v-if="noti.header" :key="noti.header"> {{ noti.header }} </v-subheader>
						<v-divider v-else-if="noti.divider" :inset="noti.inset" :key="index" ></v-divider>
     					<v-list-tile v-else :key="noti.title" avatar>
							<v-list-tile-avatar><img :src="noti.avatar"></v-list-tile-avatar>

								<v-list-tile-content>
									<v-list-tile-title v-html="noti.title"></v-list-tile-title>
									<v-list-tile-sub-title v-html="noti.subtitle"></v-list-tile-sub-title>
								</v-list-tile-content>
						</v-list-tile>
					</template>
				</v-list>
			</v-menu>
			
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
					<v-icon color="red" right>fingerprint</v-icon>
				</v-chip>
			</span>
		</v-footer>
	</v-app>
</div>
</template>

<script lang="ts">
import appConfig from "@/app.config"
import { Component, Watch, Vue } from "vue-property-decorator"
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
	menuNotify: boolean = false;
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
            { icon: "dashboard", text: "Dashboard", to: "/", },
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
				{ icon: "assignment_ind", text: "Registrations", to: "/registrations", },
            	{ icon: "event", text: "Bookings", to: "/bookings", },
				{ icon: "forum", text: "Enquiry", to: "/enquiry", },
				],
				"icon-alt": "library_add",
			},
			{ icon: "timeline", text: "Sales & Finance", to: "/inspire", },
			{ icon: "assessment", text: "Reports", to: "/inspire", },
            { icon: "bubble_chart", text: "HR", to: "/payment", },
            { 
				icon: "settings", text: "Settings", children: [
				{ icon: "bubble_chart", text: "Edit", to: "/inspire", },
            	{ icon: "bubble_chart", text: "Profile", to: "/inspire", },
				],
				"icon-alt": "settings",
			}
        ];
    profileList: { icon?: string, text: string }[] = [
        { text: "My Account", },
        { text: "Dummy", },
        { text: "Logout", },
        { text: "Exit", },
    ];
    
	notis: ({ avatar?: string, title?: string, subtitle?: string } | { divider: boolean, inset: boolean }) [] =[
          
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            title: 'Birthday gift',
            subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            title: 'Recipe to try',
            subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
          }
	];
		
	darkTheme:boolean = ThemeStore.DARK_THEME
	@Watch("darkTheme") toggleDarkTheme(){ ThemeStore.toggleDarkTheme() }
}
</script>


<style>
@import url("assets/fonts/icons/material-icons.css");
/* Global CSS */
</style>
