<template>
	<div>
		<!-- TODO: [Karthik] implement mini-varient with tooltip on mini mode -->
		<v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="menuDrawer" transition="slide-x-transition">
			<v-list dense>
				<template v-for="menu in menus">
					<v-layout row v-if="menu.heading" align-center :key="menu.heading" @click="$router.push({name: menu.to})" :color="$router.currentRoute.name===menu.to?'orange darken-3':''">
						<v-flex xs6>
							<v-subheader v-if="menu.heading">{{ menu.heading }}</v-subheader>
						</v-flex>
					</v-layout>
					<v-list-group v-else-if="menu.children" v-model="menu.model" :key="menu.text" :prepend-icon="menu.model ? menu.icon : menu['icon-alt']" no-action>
						<v-list-tile slot="activator">
							<v-list-tile-content>
								<v-list-tile-title>{{ menu.text }}</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
						<v-list-tile v-for="(child, i) in menu.children" :key="i" @click="$router.push({name: child.to})" :color="$router.currentRoute.name===child.to?'orange darken-3':''">
							<v-list-tile-action v-if="child.icon">
								<v-icon :color="$router.currentRoute.name===child.to?'orange darken-3':''">{{ child.icon }}</v-icon>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title>{{ child.text }}</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list-group>
					<v-list-tile v-else :key="menu.text" @click="$router.push({name: menu.to})" :color="$router.currentRoute.name===menu.to?'orange darken-3':''">
						<v-list-tile-action>
							<v-icon :color="$router.currentRoute.name===menu.to?'orange darken-3':''">{{ menu.icon }}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>{{ menu.text }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</template>
			</v-list>

			<!-- FIXME: make this dynamic and fix routes -->
			<v-bottom-nav :value="true" absolute color="transparent">
				<v-btn color="orange darken-4" flat  to="/help">
					<span>Help</span>
					<v-icon>help</v-icon>
				</v-btn>
				<v-btn color="orange darken-4" flat to="/about">
					<span>About</span>
					<v-icon>info</v-icon>
				</v-btn>
			</v-bottom-nav>
		</v-navigation-drawer>

		<v-toolbar color="orange darken-4" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed transition="slide-y-transition">
			<!-- FIXME: [Karthik] make this icon inline with title, class "app-drag" is important on title -->
			<!-- <v-img :src="logo" height="40" width="40" contain /> -->
			<span class="hidden-sm-and-down title font-weight-black app-drag" style="width: 190px">{{ appName }}</span>
			<v-toolbar-title style="width: 100px" class="ml-0 pl-3">
				<v-toolbar-side-icon @click.stop="menuDrawer = !menuDrawer" />
			</v-toolbar-title>
			<v-spacer class="app-drag" />
			<navbar-search v-if="$permission(PERMISSIONS.maple.NAVBAR_SEARCH)" />
			<v-spacer class="app-drag" />
			<notification-panel v-if="$permission(PERMISSIONS.maple.NOTIFICATION_VIEW)" />
			<profile-panel />
		</v-toolbar>
		<v-content>
			<v-container class="pa-0" fluid style="overflow-y:scroll; min-height:calc(100vh - 100px); max-height:calc(100vh - 100px)">
				<slot />
			</v-container>
		</v-content>
		<app-footer transition="slide-y-reverse-transition"/>
	</div>
</template>

<style>
.app-drag{ -webkit-app-region: drag; }
</style>