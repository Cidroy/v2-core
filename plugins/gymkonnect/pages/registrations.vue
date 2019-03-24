<template>
	<Layout>
		<v-toolbar extended>
			<v-layout row>
				<v-flex xs12 md7> <h1 class="text-md-right text-xs-center"> <v-icon left>assignment_ind</v-icon> Registration </h1> </v-flex>
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
					<v-tab v-for="booking in RegistrationTypes" :key="booking.slug" :href="`#${booking.slug}`">
						<v-icon v-if="booking.icon" left>{{ booking.icon }}</v-icon>
						{{ booking.name }}
					</v-tab>
				</v-tabs>
			</v-layout>
		</v-toolbar>
		<v-tabs-items v-model="bookingTab">
			<v-tab-item :value="RegistrationTypes.PERSONAL_TRAINING.slug"> <personal-training-registration /> </v-tab-item>
			<v-tab-item :value="RegistrationTypes.ONE_DAY.slug"> <one-day-registration /> </v-tab-item>
			<v-tab-item :value="RegistrationTypes.FITNESS_COUNSELING.slug"> <fitness-counseling-registration /> </v-tab-item>
		</v-tabs-items>
	</Layout>

</template>
