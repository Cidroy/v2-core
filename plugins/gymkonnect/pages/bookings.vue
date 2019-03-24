<template>
	<Layout>
		<v-toolbar extended>
			<v-layout row>
				<v-flex xs12 md7> <h1 class="text-md-right text-xs-center"> <v-icon left>event</v-icon> Bookings </h1> </v-flex>
				<v-flex xs12 md5>
					<v-layout justify-end>
						<v-tooltip left>
							<v-btn outline slot="activator" :disabled="printingBlank" :loading="printingBlank" @click.native.stop="printBlank"> <v-icon>print</v-icon> </v-btn>
							<span>Print Blank Form</span>
						</v-tooltip>
					</v-layout>
				</v-flex>
			</v-layout>
			<v-layout slot="extension" class="px-2">
				<v-tabs v-model="bookingTab" grow color="transparent" slider-color="orange darken-2">
					<v-tab v-for="booking in BookingTypes" :key="booking.slug" :href="`#${booking.slug}`">
						<v-icon v-if="booking.icon" left>{{ booking.icon }}</v-icon>
						{{ booking.name }}
					</v-tab>
				</v-tabs>
			</v-layout>
		</v-toolbar>
		<v-tabs-items v-model="bookingTab">
			<v-tab-item :value="BookingTypes.SPA.slug"> <spa-booking /> </v-tab-item>
			<v-tab-item :value="BookingTypes.GROUND.slug"> </v-tab-item>
		</v-tabs-items>
	</Layout>

</template>
