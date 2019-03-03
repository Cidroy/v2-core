<template>
	<v-menu v-model="showDevicesMenu" :close-on-content-click="true" top offset-y :nudge-width="150" scrollable class="ma-0" >
		<v-btn outline small slot="activator">
			<v-icon left :color="iconColor" small>fingerprint</v-icon>
			Device Status : {{ activeDevice }}/{{ allDevice }}
		</v-btn>
		<v-card style="max-height: 50vh">
			<!-- FIXME: make sure this does not scroll -->
			<v-subheader class="font-weight-bold ma-0"> BIOMETRIC DEVICES </v-subheader>
			<v-progress-linear v-if="loading" :indeterminate="true" color="orange darken-2" />
			<v-divider v-else/>
			<v-card>
				<v-list three-line>
					<v-list-tile-sub-title v-if="!devices.length" class="pa-3">
						<v-icon>priority_high</v-icon> No Biometric Devices Connected
					</v-list-tile-sub-title>
					<template v-else v-for="(device, index) in devices">
						<v-list-tile :key="index">
							<v-list-tile-avatar>
								<v-icon :color="device.state==='ONLINE'?'green':'red'" large>fingerprint</v-icon>
							</v-list-tile-avatar>
							<v-list-tile-content>
								<v-list-tile-title>
									{{ device.name }}
									<span v-if="device.state!=='ONLINE'" v-text="device.state" class="grey--text text--lighten-1 font-italic" />
								</v-list-tile-title>
								<v-list-tile-sub-title v-text="`ip: ${device.ip}`" />
								<v-list-tile-sub-title class="font-italic" v-text="`serial: ${device.serial}`" />
							</v-list-tile-content>
						</v-list-tile>
						<v-divider :key="index"/>
					</template>
				</v-list>
			</v-card>
		</v-card>
	</v-menu>
</template>
