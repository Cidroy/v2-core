<template>
	<div class="text-xs-center">
		<v-menu v-model="profileMenu" :close-on-content-click="false" :nudge-width="200" offset-y>
			<v-btn slot="activator" icon large :outline="!!iconText">
				<v-avatar color="orange darken-4" size="40" >
					<span v-if="iconText" class="white--text headline">{{ iconText }}</span>
					<v-icon v-else dark>account_circle</v-icon>
				</v-avatar>
			</v-btn>
			<v-card>
				<v-list>
					<v-list-tile avatar>
						<v-list-tile-avatar color="orange darken-4">
							<span class="white--text headline">{{ iconText }}</span>
						</v-list-tile-avatar>

						<v-list-tile-content>
							<v-list-tile-title>{{ user.name }}</v-list-tile-title>
							<v-list-tile-sub-title>{{ user.type }}</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
				<v-divider></v-divider>
				<v-list>
					<v-list-tile v-for="(item, index) in profileList" :key="index" @click="item.action()" >
						<v-list-tile-title>
							<v-icon v-if="item.icon" left :class="item.iconClass" v-text="item.icon"/>
							<v-icon v-else left class="far" v-text="'fa-circle'"/>
							{{ item.text }}
						</v-list-tile-title>
					</v-list-tile>
					<v-divider></v-divider>
					<!-- Dark Mode -->
					<v-list-tile>
						<v-list-tile-title> <v-icon class="fas" left>fa-moon</v-icon> Dark</v-list-tile-title>
						<v-list-tile-action>
							<v-switch v-model="darkTheme" color="orange darken-4" />
						</v-list-tile-action>
					</v-list-tile>
				</v-list>
			</v-card>
		</v-menu>
	</div>
</template>
