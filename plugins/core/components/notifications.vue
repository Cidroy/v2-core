<template>
	<div>
		<!-- TODO: customize snackbar to handle toasts -->
		<!-- <v-snackbar v-model="showPopupNotification" top right multi-line vertical :timeout="popupNotificationTimeout">
			<div> as{{ popupNotification.icon }} </div>
			<v-btn @click="showPopupNotification = false" flat v-text="'Close'" />
		</v-snackbar> -->
		<v-menu v-model="showNotifications" :close-on-content-click="true" :nudge-width="200" offset-y scrollable class="ma-0" >
			<v-btn icon large slot="activator" dark >
				<v-badge color="indigo" overlap>
					<span slot="badge" v-if="unseenNotificationsCount!==0">{{ unseenNotificationsCount }}</span>
					<v-avatar color="orange darken-4" size="40" >
						<v-icon dark>notifications</v-icon>
					</v-avatar>
				</v-badge>
			</v-btn>
			<v-card style="max-height: 90vh">
				<!-- FIXME: make sure this does not scroll -->
				<v-subheader class="font-weight-bold ma-0">
					NOTIFICATIONS
					<v-spacer/>
					<v-btn small icon @click="clearNotification"> <v-icon>clear_all</v-icon> </v-btn>
				</v-subheader>
				<v-card>
					<v-list three-line>
						<v-list-tile-sub-title v-if="!notifications.length" class="pa-3">
							<v-icon left>done_all</v-icon> No New Notification
						</v-list-tile-sub-title>
						<template v-else v-for="(notification, index) in notifications">
							<v-subheader v-if="notification.header" :key="`${index}-header`" >
								<v-icon v-if="notification.icon" :class="notification.iconClass" left>{{ notification.icon }}</v-icon>
								<p class="ma-0 pa-0">
									<span class="font-weight-bold" v-text="notification.header" />
									<br />
									<span class="font-italic" v-text="moments(notification.time)"/>
								</p>
							</v-subheader>
							<v-list-tile v-else :key="`${index}-title`" avatar >
								<v-list-tile-avatar>
									<img v-if="notification.avatar" :src="notification.avatar">
									<v-icon v-else-if="notification.icon" :class="notification.iconClass">{{ notification.icon }}</v-icon>
									<v-icon v-else class="fal grey lighten-2" light>fa-bell</v-icon>
								</v-list-tile-avatar>
								<v-list-tile-content>
									<v-list-tile-title v-html="notification.title" />
									<v-list-tile-sub-title v-html="notification.subtitle" />
									<v-list-tile-sub-title class="font-italic" v-text="moments(notification.time)" />
								</v-list-tile-content>
							</v-list-tile>
							<v-divider :key="`${index}-divider`" />
						</template>
					</v-list>
				</v-card>
			</v-card>
		</v-menu>
	</div>
</template>