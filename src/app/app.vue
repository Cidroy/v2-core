<template>
<div id="app">
	<v-app :dark="darkTheme">
		<dev-resizer :show="showDevResizer" />
		<v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
			<v-list dense>
				<template v-for="item in items">
					<v-layout row v-if="item.heading" align-center :key="item.heading" @click="$router.push({name: item.to})" :color="$router.currentRoute.name===item.to?'orange darken-3':''">
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
						<v-list-tile v-for="(child, i) in item.children" :key="i" @click="$router.push({name: child.to})" :color="$router.currentRoute.name===child.to?'orange darken-3':''">
							<v-list-tile-action v-if="child.icon">
								<v-icon :color="$router.currentRoute.name===child.to?'orange darken-3':''">{{ child.icon }}</v-icon>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title>{{ child.text }}</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list-group>
					<v-list-tile v-else :key="item.text" @click="$router.push({name: item.to})" :color="$router.currentRoute.name===item.to?'orange darken-3':''">
						<v-list-tile-action>
							<v-icon :color="$router.currentRoute.name===item.to?'orange darken-3':''">{{ item.icon }}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>{{ item.text }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</template>
			</v-list>

			<v-bottom-nav :value="true" absolute color="transparent">
      			<v-btn color="orange darken-4" flat  to="/help">
					<span>Help</span>
					<v-icon>help</v-icon>
      			</v-btn>

      			<v-btn color="orange darken-4" flat to="/about">
					<span>About</span>
        			<v-icon>info</v-icon>
      			</v-btn>

				<v-btn color="orange darken-4" flat to="/">
					<span>Settings</span>
					<v-icon>settings_applications</v-icon>
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

			<notification-panel v-if="$permission(PERMISSIONS.maple.NOTIFICATION_VIEW)" />
			<!--profile  -->
			<div class="text-xs-center">
				<v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
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
									<v-list-tile-title>Kundan Singh</v-list-tile-title>
									<v-list-tile-sub-title>Admin</v-list-tile-sub-title>
								</v-list-tile-content>
							</v-list-tile>
						</v-list>

						<v-divider></v-divider>

						<v-list>
							<v-list-tile  v-for="(item, index) in profileList" :key="index"  @click="$router.push({name: item.to})">
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
			<v-container class="pa-0" fluid style="overflow-y:scroll; min-height:calc(100vh - 100px); max-height:calc(100vh - 100px)">
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

<style>
@import url("assets/fonts/icons/material-icons.css");
/* Global CSS */
</style>
